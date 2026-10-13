# Comeback Plan — features that bring people back

Companion to `task.md`. Items 3–6 from the retention review. All reuse the
existing Mera passkey + sponsored-UserOp + SavingsPockets rails. No contract
changes except where noted.

---

## 3. Round-ups (spare-change saving) — DONE

Save the round-up of every payment: pay 9.20 AUSD → 0.80 auto-saved.
Implemented via Off/%/Round-up segmented control in the send sheet,
`calculateRoundUpBreakdown` + `payWithRoundUpSponsored` (transfer + deposit
batched in one sponsored UserOp — no contract change), and
`mode: 'autosave-roundup'` in review. Whole amounts fall back with a hint.

### UI
- Send sheet (`app/send.tsx`): third save option next to the pocket toggle —
  segmented control `Off | % | Round-up` in the save block. When Round-up is
  on, the split panel shows RECIPIENT / ROUND-UP / TOTAL DEBIT.
- Savings goal sheet: per-goal toggle "accept round-ups" (default on).
- Review (`app/review.tsx`, `mode: 'autosave'`): unchanged layout, numbers
  come from the round-up math.

### Logic
- New helper `calculateRoundUpBreakdown(payment, ceilTo = 1)` in
  `services/savings-pockets.ts`: `saved = ceil(payment) - payment`
  (skip when payment is already whole). Reuse `payWithAutoSaveSponsored` —
  the contract only sees payment + saved amounts, so **no contract change**.
- Review path already validates pocket rate/balance/total; round-up rides it.
- Edge: dust < 0.01 rounds to 0 → fall back to plain direct transfer.

---

## 4. Streaks, milestones, shareable goal cards — DONE

Implemented in `services/streaks.ts` (ISO week keys, consecutive-week count,
persisted deposit weeks + one-time milestone flags) and
`app/savings-goals.tsx` (streak row on goal cards, milestone celebration
modal at 25/50/75/100% with share-progress, deposit recording on pocket
deposits and gift allocations). Fully client-side, no contract change.

### UI
- Savings home (`app/savings-goals.tsx`): streak flame + count on each goal
  card ("6 weeks"), milestone banner at 25/50/75/100% with haptics.
- Celebration modal on crossing a milestone (confetti-lite: animated hero
  card, no new deps — Reanimated is already installed).
- Share button → `Share.share` a text + art card ("I'm 50% to Laptop on
  AUSD Wallet") with a receive-link deep link.

### Logic
- New `services/streaks.ts`: streak = consecutive calendar weeks with
  ≥1 pocket deposit (read from existing pocket reads + `Deposited` indexer
  events already in `services/indexed-activity.ts`). Persist
  `ausd-wallet-streaks-v1` in AsyncStorage; recompute on Savings refresh.
- Milestones derived from `saved/target` — already rendered, just add
  threshold detection + one-time flags so celebrations fire once.
- Share card reuses the receive-link builder from `app/receive.tsx`.

---

## 5. Scheduled saves (weekly auto-deposit) — DONE (Phase 1)

Implemented in `services/schedules.ts` (weekly/monthly cadence, due-date
roll-forward, pause/resume/remove, AsyncStorage persistence) and
`app/savings-goals.tsx` (Schedule sheet per goal, due banner with one-tap
deposit prefill, auto roll-forward after each deposit). In-app remindersonly — push notifications and true automation (Phase 2) stay parked.

### UI
- Goal sheet: "Schedule" section — amount + weekly/monthly picker + start
  date. Schedule list per goal with pause/cancel.
- Home: "Upcoming" row under Savings goals (next scheduled save + date).
- System notification on due date with one-tap approve (see logic).

### Logic — two phases
- **Phase 1 (no new infra):** local schedule in
  `ausd-wallet-schedules-v1` + `expo-notifications` reminder → deep link
  into the existing deposit sheet. User still approves each time (passkey
  can't pre-sign non-interactively). Shippable now.
- **Phase 2 (true automation):** EIP-7715-style session key or a relayer
  holding a limited approval (exact amount, exact pocket, expiry). Needs
  contract support (spending caps) + backend — mainnet scope, not hackathon.
- Recommend Phase 1 for the demo; Phase 2 specced but parked.

---

## 6. Gift claim links (viral growth) — DONE (address-bound v1)

Implemented: `app/gift/claim.tsx` (public route — deliberately outside the
auth guard) verifies the linked address's `unallocatedGiftBalance` on-chain
and offers one-tap withdraw; "Copy link" banner after each gift
(`services/gift-links.ts` builder); Scan parses gift links and routes to
claim. Stranger claims (recipient has no wallet yet) still need the
secret-escrow contract change — parked as Phase 2.

### UI
- New `app/gift/[code].tsx` route: gift art card (amount, donor name),
  "Claim" button → passkey onboarding (reuse `create-account` flow) →
  success state. Expired/claimed codes show a graceful dead state.
- Send-gift sheet: after `giftToPersonSponsored` confirms, show "Copy claim
  link" alongside the tx hash.

### Logic
- Link encodes `{ donor, txHash, amount, token }` — claim is verified by
  reading the donor's `PersonGifted` event / recipient's
  `unallocatedGiftBalance` on-chain, then `withdrawGiftSponsored` to the new
  wallet. No escrow contract change: `giftToPerson` already credits
  `unallocatedGiftBalance[recipientOwner]`; the link just needs the
  recipient address resolvable at claim time.
- Hard part: link must bind to a recipient the donor names *before* they
  have a wallet. Approach: link carries a claim secret; donor funds a
  one-time claim pocket (`giftToPocketSponsored` to a fresh pocketId whose
  id derives from the secret); claim reveals secret → app withdraws to the
  new wallet. Requires small contract addition (`claimWithSecret`) —
  only contract change in this whole plan.
- Anti-abuse: single-use enforced on-chain by nulling the pocket/secret.

---

## Build order

1. Round-ups (smallest, rides autosave rails, demo-visible in send flow).
2. Streaks + milestones (client-only, makes Savings feel alive).
3. Scheduled saves Phase 1 (notifications + deep link).
4. Gift claim links (needs contract change — last).
