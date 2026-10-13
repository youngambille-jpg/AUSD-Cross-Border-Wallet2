import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { Card, Eyebrow, Field, InlineNotice, Page, PrimaryButton, Title } from '@/components/Primitives';
import { useColors } from '@/hooks/useColors';
import { getAUSDBalance } from '@/services/passkey';
import { exportSavingsVault, importSavingsVault, loadSavingsGoals, saveSavingsGoals, type SavingsGoal } from '@/services/savings-goals';
import {
  createSavingsPocketId,
  createSponsoredSavingsPocket,
  depositToSavingsPocket,
  withdrawFromSavingsPocketSponsored,
  updateSavingsAutoSaveRateSponsored,
  allocateGiftToSavingsPocketSponsored,
  giftToPersonSponsored,
  giftToPocketSponsored,
  getSavingsPocket,
  getUnallocatedGiftBalance,
  withdrawGiftSponsored,
  type SavingsPocketState,
} from '@/services/savings-pockets';
import { loadContacts, type WalletContact } from '@/services/contacts';
import {
  createSharedPocketCode,
  loadSharedPockets,
  parseSharedPocketCode,
  saveSharedPockets,
  type SharedPocket,
} from '@/services/shared-pockets';
import { useWallet } from '@/state/wallet-context';
import { buildGiftLink } from '@/services/gift-links';
import {
  MILESTONES,
  countStreak,
  loadCelebrated,
  loadDepositWeeks,
  markCelebrated,
  recordDepositWeek,
} from '@/services/streaks';
import {
  addSchedule,
  advanceSchedule,
  describeSchedule,
  firstDueDate,
  isDue,
  loadSchedules,
  removeSchedule,
  saveSchedules,
  updateSchedule,
  type SaveSchedule,
  type ScheduleFrequency,
} from '@/services/schedules';

const money = (amount: number) => amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function SavingsGoalsScreen() {
  const colors = useColors();
  const { profile } = useWallet();
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [pocketStates, setPocketStates] = useState<Record<string, SavingsPocketState>>({});
  const [sharedPocketStates, setSharedPocketStates] = useState<Record<string, SavingsPocketState>>({});
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [contribution, setContribution] = useState('');
  const [autoSaveRate, setAutoSaveRate] = useState('10');
  const [activeGoal, setActiveGoal] = useState<string | null>(null);
  const [goalSheetMode, setGoalSheetMode] = useState<'menu' | 'deposit' | 'rate' | 'withdraw' | 'schedule'>('menu');
  const [utilityAmount, setUtilityAmount] = useState('');
  const [schedules, setSchedules] = useState<SaveSchedule[]>([]);
  const [scheduleAmount, setScheduleAmount] = useState('');
  const [scheduleFrequency, setScheduleFrequency] = useState<ScheduleFrequency>('weekly');
  const [selectedGiftGoal, setSelectedGiftGoal] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [backupText, setBackupText] = useState('');
  const [sharedPockets, setSharedPockets] = useState<SharedPocket[]>([]);
  const [contacts, setContacts] = useState<WalletContact[]>([]);
  const [giftBalance, setGiftBalance] = useState<string | null>(null);
  const [giftAmount, setGiftAmount] = useState('');
  const [giftRecipient, setGiftRecipient] = useState('');
  const [giftPocket, setGiftPocket] = useState('');
  const [lastGiftLink, setLastGiftLink] = useState('');
  const [giftCopied, setGiftCopied] = useState(false);
  const [pocketCode, setPocketCode] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [activeSheet, setActiveSheet] = useState<'gift' | 'more' | 'shared' | 'restore' | 'gifts' | 'allocate' | null>(null);
  const [depositWeeks, setDepositWeeks] = useState<Record<string, string[]>>({});
  const [celebrated, setCelebrated] = useState<Record<string, number[]>>({});
  const [celebration, setCelebration] = useState<{ goalId: string; name: string; pct: number } | null>(null);
  const account = profile?.mode === 'mera' && profile.address && profile.signerAddress && profile.passkey
    ? { address: profile.address, signerAddress: profile.signerAddress, credential: profile.passkey.credential, rpId: profile.passkey.rpId }
    : null;
  const onChainTotal = useMemo(
    () => goals.reduce((sum, goal) => {
      const pocket = pocketStates[goal.id];
      return sum + (pocket?.exists ? Number(pocket.balance) : 0);
    }, 0),
    [goals, pocketStates],
  );
  const localTrackedTotal = useMemo(
    () => goals.reduce((sum, goal) => sum + (goal.localTracked ?? (goal.pocketId ? 0 : goal.saved)), 0),
    [goals],
  );
  const focusedGoal = goals.find((goal) => goal.id === activeGoal) ?? null;

  const refresh = useCallback(async () => {
    if (!account) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const [savedGoals, walletBalance, savedSharedPockets, savedContacts, receivedGifts] = await Promise.all([
        loadSavingsGoals(account),
        getAUSDBalance(account.address),
        loadSharedPockets(account),
        loadContacts(account),
        getUnallocatedGiftBalance(account.address),
      ]);
      const pocketEntries = await Promise.all(savedGoals.flatMap((goal) =>
        goal.pocketId
          ? [getSavingsPocket(account.address, goal.pocketId).then((pocket) => [goal.id, pocket] as const)]
          : [],
      ));
      const sharedEntries = await Promise.all(savedSharedPockets.map((pocket) =>
        getSavingsPocket(pocket.owner, pocket.pocketId).then((state) => [pocket.id, state] as const),
      ));
      setGoals(savedGoals);
      setBalance(Number(walletBalance));
      setPocketStates(Object.fromEntries(pocketEntries));
      setSharedPocketStates(Object.fromEntries(sharedEntries));
      setSharedPockets(savedSharedPockets);
      setContacts(savedContacts);
      setGiftBalance(receivedGifts);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not open your savings plan.');
    } finally {
      setLoading(false);
    }
  }, [account?.address, account?.signerAddress, account?.rpId, account?.credential.credentialId]);

  useEffect(() => { void refresh(); }, [refresh]);

  useEffect(() => {
    if (!account) return;
    void loadDepositWeeks().then(setDepositWeeks).catch(() => undefined);
    void loadCelebrated().then(setCelebrated).catch(() => undefined);
    void loadSchedules().then(setSchedules).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address]);

  useEffect(() => {
    if (loading || celebration) return;
    for (const goal of goals) {
      const pocket = pocketStates[goal.id];
      const savedAmount = pocket?.exists ? Number(pocket.balance) : goal.saved;
      if (!Number.isFinite(savedAmount) || goal.target <= 0) continue;
      const pct = Math.min(1, savedAmount / goal.target);
      const crossed = MILESTONES.filter((mark) => pct * 100 >= mark && !(celebrated[goal.id] ?? []).includes(mark));
      if (crossed.length) {
        const highest = Math.max(...crossed);
        setCelebration({ goalId: goal.id, name: goal.name, pct: highest });
        void markCelebrated(goal.id, highest).then(setCelebrated).catch(() => undefined);
        break;
      }
    }
  }, [goals, pocketStates, celebrated, loading, celebration]);

  async function importSharedPocket() {
    if (!account) return setError('Unlock your Mera wallet before tracking a shared pocket.');
    try {
      const parsed = parseSharedPocketCode(pocketCode.trim());
      const next: SharedPocket = {
        ...parsed,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      if (sharedPockets.some((item) => item.owner.toLowerCase() === next.owner.toLowerCase() && item.pocketId.toLowerCase() === next.pocketId.toLowerCase())) {
        throw new Error('This pocket is already in your tracked list.');
      }
      const nextPockets = [...sharedPockets, next];
      await saveSharedPockets(account, nextPockets);
      setSharedPockets(nextPockets);
      setPocketCode('');
      setActiveSheet(null);
      Alert.alert('Pocket tracked', `${next.name} was added to your Savings tab.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not import this pocket code.');
    }
  }

  async function removeSharedPocket(id: string) {
    if (!account) return;
    const next = sharedPockets.filter((item) => item.id !== id);
    await saveSharedPockets(account, next);
    setSharedPockets(next);
  }

  async function sendGift() {
    if (!account) return setError('Unlock your Mera wallet before sending a gift.');
    const contact = contacts.find((item) => item.id === giftRecipient);
    if (!contact) return setError('Choose a saved contact.');
    if (!giftAmount.trim()) return setError('Enter an amount to gift.');
    const tracked = sharedPockets.find((item) => item.id === giftPocket);
    const confirmed = await new Promise<boolean>((resolve) => {
      Alert.alert(
        'Review gift',
        `${giftAmount} AUSD to ${contact.name}${tracked ? `\nFund pocket: ${tracked.name}` : '\nSend to their received gifts'}`,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
          { text: 'Confirm with passkey', onPress: () => resolve(true) },
        ],
      );
    });
    if (!confirmed) return;
    setSaving(true);
    setError('');
    try {
      const recipient = tracked?.owner ?? contact.address;
      const result = tracked
        ? await giftToPocketSponsored(account, recipient, tracked.pocketId, giftAmount)
        : await giftToPersonSponsored(account, recipient, giftAmount);
      setLastGiftLink(buildGiftLink({
        recipient: contact.address,
        amount: result.amount,
        txHash: result.transactionHash,
        ...(profile?.displayName ? { donor: profile.displayName } : {}),
      }));
      setGiftCopied(false);
      setGiftAmount('');
      setGiftRecipient('');
      setGiftPocket('');
      setActiveSheet(null);
      Alert.alert('Gift sent', `${result.amount} AUSD was confirmed on Monad testnet.\n\n${result.transactionHash}`);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The sponsored gift did not complete.');
    } finally {
      setSaving(false);
    }
  }

  async function sharePocket(goal: SavingsGoal) {
    if (!account || !goal.pocketId) return setError('This goal does not have an active pocket to share.');
    try {
      const code = createSharedPocketCode({ owner: account.address as `0x${string}`, pocketId: goal.pocketId, name: goal.name });
      await Share.share({ title: `${goal.name} AUSD pocket`, message: `Track or fund my AUSD savings pocket: ${code}` });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not share this pocket.');
    }
  }

  async function withdrawReceivedGifts(amount: string) {
    if (!account || !giftBalance || Number(giftBalance) <= 0) return;
    setSaving(true);
    setError('');
    try {
      const result = await withdrawGiftSponsored(account, amount);
      setActiveSheet(null);
      Alert.alert('Gift received', `${result.amount} AUSD was sent to your wallet.\n\n${result.transactionHash}`);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The received gift could not be withdrawn.');
    } finally {
      setSaving(false);
    }
  }

  const createGoal = async () => {
    const parsedTarget = Number(target);
    const parsedRate = Number(autoSaveRate);
    if (!name.trim()) return setError('Give your goal a name.');
    if (!Number.isFinite(parsedTarget) || parsedTarget <= 0) return setError('Enter a target greater than zero.');
    if (!/^\d+(\.\d{1,2})?$/.test(autoSaveRate) || !Number.isFinite(parsedRate) || parsedRate <= 0 || parsedRate > 100) {
      return setError('Choose an auto-save rate greater than 0% and no higher than 100%, with up to two decimals.');
    }
    if (!account) return setError('Unlock your Mera wallet before creating a pocket.');
    setSaving(true);
    setError('');
    try {
      const id = `${Date.now()}`;
      const autoSaveBps = Math.round(parsedRate * 100);
      const pocketId = createSavingsPocketId(account.address, id);
      const nextGoal: SavingsGoal = {
        id,
        name: name.trim(),
        target: parsedTarget,
        saved: 0,
        createdAt: new Date().toISOString(),
        pocketId,
        autoSaveBps,
      };
      const nextGoals = [...goals, nextGoal];
      // Persist the stable pocket ID first so a cancelled or interrupted chain
      // operation can be retried without creating a second pocket.
      await saveSavingsGoals(account, nextGoals);
      setGoals(nextGoals);
      setPocketStates((current) => ({
        ...current,
        [id]: { pocketId, balance: '0', autoSaveBps, exists: false },
      }));
      setName('');
      setTarget('');
      setShowCreate(false);
      const result = await createSponsoredSavingsPocket(account, pocketId, autoSaveBps);
      setPocketStates((current) => ({
        ...current,
        [id]: { pocketId, balance: '0', autoSaveBps, exists: true },
      }));
      const txNote = result.alreadyCreated ? 'The existing on-chain pocket was matched.' : 'The pocket was created on Monad testnet.';
      Alert.alert('Savings pocket ready', `${txNote} No AUSD moved. Your plan is encrypted with your Mera passkey.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not create the sponsored savings pocket.');
    } finally {
      setSaving(false);
    }
  };

  const activateGoal = async (goal: SavingsGoal) => {
    if (!account) return setError('Unlock your Mera wallet before activating a pocket.');
    const parsedRate = Number(autoSaveRate);
    if (goal.autoSaveBps === undefined && (
      !/^\d+(\.\d{1,2})?$/.test(autoSaveRate) || !Number.isFinite(parsedRate) || parsedRate <= 0 || parsedRate > 100
    )) {
      return setError('Choose an auto-save rate greater than 0% and no higher than 100%.');
    }
    setSaving(true);
    setError('');
    try {
      const autoSaveBps = goal.autoSaveBps ?? Math.round(parsedRate * 100);
      const pocketId = goal.pocketId ?? createSavingsPocketId(account.address, goal.id);
      await createSponsoredSavingsPocket(account, pocketId, autoSaveBps);
      const activated = {
        ...goal,
        saved: 0,
        localTracked: goal.localTracked ?? goal.saved,
        pocketId,
        autoSaveBps,
      };
      const nextGoals = goals.map((item) => item.id === goal.id ? activated : item);
      await saveSavingsGoals(account, nextGoals);
      setGoals(nextGoals);
      setPocketStates((current) => ({
        ...current,
        [goal.id]: { pocketId, balance: '0', autoSaveBps, exists: true },
      }));
      Alert.alert(
        'Pocket activated',
        `Your goal is now registered on Monad with a ${autoSaveBps / 100}% auto-save rate. Previous progress stays labeled as local tracking; no tokens moved.`,
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not activate this goal on Monad.');
    } finally {
      setSaving(false);
    }
  };

  async function updateGoalRate() {
    if (!account || !focusedGoal?.pocketId) return setError('Activate this goal before changing its auto-save rate.');
    if (!/^\d+(\.\d{1,2})?$/.test(utilityAmount) || Number(utilityAmount) > 100) {
      return setError('Enter a rate from 0% to 100%, with up to two decimal places.');
    }
    setSaving(true);
    setError('');
    try {
      const bps = Math.round(Number(utilityAmount) * 100);
      const result = await updateSavingsAutoSaveRateSponsored(account, focusedGoal.pocketId, bps);
      const nextGoals = goals.map((goal) => goal.id === focusedGoal.id ? { ...goal, autoSaveBps: bps } : goal);
      setGoals(nextGoals);
      setPocketStates((current) => ({ ...current, [focusedGoal.id]: { ...current[focusedGoal.id], pocketId: focusedGoal.pocketId!, autoSaveBps: bps, exists: true } }));
      try {
        await saveSavingsGoals(account, nextGoals);
      } catch {
        setError('The rate changed on Monad, but the encrypted plan could not be updated. The on-chain rate will be used.');
      }
      setActiveGoal(null);
      Alert.alert('Auto-save updated', `${Number(utilityAmount)}% will be saved from future payments.\n\n${result.transactionHash}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not update this goal’s auto-save rate.');
    } finally {
      setSaving(false);
    }
  }

  async function withdrawFromGoal() {
    if (!account || !focusedGoal?.pocketId) return setError('This goal does not have an active pocket.');
    setSaving(true);
    setError('');
    try {
      const result = await withdrawFromSavingsPocketSponsored(account, focusedGoal.pocketId, utilityAmount);
      setPocketStates((current) => ({ ...current, [focusedGoal.id]: result.pocket }));
      setActiveGoal(null);
      Alert.alert('AUSD withdrawn', `${result.amount} AUSD was sent to your wallet.\n\n${result.transactionHash}`);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not withdraw from this savings pocket.');
    } finally {
      setSaving(false);
    }
  }

  async function allocateReceivedGifts() {
    if (!account) return setError('Unlock your Mera wallet before allocating gifts.');
    const goal = goals.find((item) => item.id === selectedGiftGoal);
    if (!goal?.pocketId || !pocketStates[goal.id]?.exists) return setError('Choose an active on-chain savings goal.');
    setSaving(true);
    setError('');
    try {
      const result = await allocateGiftToSavingsPocketSponsored(account, goal.pocketId, utilityAmount);
      setPocketStates((current) => ({ ...current, [goal.id]: result.pocket }));
      setGiftBalance(result.giftBalance);
      setActiveSheet(null);
      void recordDepositWeek(goal.id).then(setDepositWeeks).catch(() => undefined);
      Alert.alert('Gift added to goal', `${result.amount} AUSD was added to ${goal.name}.\n\n${result.transactionHash}`);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not allocate this gift.');
    } finally {
      setSaving(false);
    }
  }

  const addSavings = async (goal: SavingsGoal) => {
    const amount = Number(contribution);
    if (!Number.isFinite(amount) || amount <= 0) return setError('Enter an amount greater than zero.');
    if (!goal.pocketId || !pocketStates[goal.id]?.exists) return setError('Activate this goal as an on-chain pocket before depositing.');
    if (balance === null || amount > balance) return setError('That is more than your available wallet AUSD balance.');
    if (!account) return setError('Unlock your Mera wallet before depositing.');
    setSaving(true);
    setError('');
    try {
      const result = await depositToSavingsPocket(account, goal.pocketId, contribution);
      setPocketStates((current) => ({ ...current, [goal.id]: result.pocket }));
      setBalance((current) => current === null ? null : Math.max(0, current - Number(result.amount)));
      setContribution('');
      setActiveGoal(null);
      void recordDepositWeek(goal.id).then(setDepositWeeks).catch(() => undefined);
      void (async () => {
        try {
          const current = await loadSchedules();
          const advanced = current.map((item) => item.goalId === goal.id && isDue(item) ? advanceSchedule(item) : item);
          await saveSchedules(advanced);
          setSchedules(advanced);
        } catch {
          // Schedule roll-forward is best-effort; the deposit already succeeded.
        }
      })();
      Alert.alert('AUSD deposited', `${money(Number(result.amount))} AUSD was deposited into ${goal.name} on Monad testnet. Gas sponsorship was requested.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The sponsored pocket deposit did not complete.');
    } finally {
      setSaving(false);
    }
  };

  const createSchedule = async () => {
    if (!focusedGoal) return setError('Select a goal first.');
    if (!/^\d+(\.\d{1,2})?$/.test(scheduleAmount) || Number(scheduleAmount) <= 0) {
      return setError('Enter a schedule amount greater than zero, with up to two decimals.');
    }
    setSaving(true);
    setError('');
    try {
      const updated = await addSchedule({
        goalId: focusedGoal.id,
        amount: scheduleAmount,
        frequency: scheduleFrequency,
        nextDue: firstDueDate(scheduleFrequency).toISOString(),
        active: true,
      });
      setSchedules(updated);
      setScheduleAmount('');
      setGoalSheetMode('menu');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save this schedule.');
    } finally {
      setSaving(false);
    }
  };

  function openDepositFor(goalId: string, amount?: string) {
    setError('');
    setActiveGoal(goalId);
    setGoalSheetMode('deposit');
    setContribution(amount ?? '');
  }

  const dueSchedules = schedules.filter((item) => isDue(item));
  const focusedSchedules = focusedGoal ? schedules.filter((item) => item.goalId === focusedGoal.id) : [];

  const shareBackup = async () => {
    const backup = await exportSavingsVault();
    if (!backup) return setError('Create a savings goal first to make an encrypted backup.');
    await Share.share({ message: backup, title: 'Encrypted Mera savings plan backup' });
  };

  async function shareGoalMilestone() {
    const note = celebration;
    setCelebration(null);
    if (!note) return;
    const goal = goals.find((item) => item.id === note.goalId);
    const saved = goal
      ? (() => {
        const pocket = pocketStates[goal.id];
        return pocket?.exists ? Number(pocket.balance) : goal.saved;
      })()
      : null;
    const message = saved !== null && Number.isFinite(saved)
      ? `I'm ${note.pct}% of the way to my "${note.name}" goal (${money(saved)} AUSD saved) on AUSD Wallet.`
      : `I'm ${note.pct}% of the way to my "${note.name}" goal on AUSD Wallet.`;
    try {
      await Share.share({ title: `${note.name} savings milestone`, message });
    } catch {
      // Sharing is optional; dismiss silently.
    }
  }

  const restoreBackup = async () => {
    if (!account || !backupText.trim()) return setError('Paste an encrypted savings plan backup first.');
    setSaving(true);
    setError('');
    try {
      const restored = await importSavingsVault(account, backupText.trim());
      setGoals(restored);
      setBackupText('');
      setActiveSheet(null);
      Alert.alert('Plan restored', 'Your encrypted savings plan was opened with your Mera passkey.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not restore this encrypted backup.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Page contentStyle={styles.page}>
      <View style={styles.topBar}>
        <View>
          <Eyebrow>YOUR MONEY, SET ASIDE</Eyebrow>
          <Title>Save for what matters</Title>
        </View>
        <Pressable onPress={() => router.back()} style={[styles.back, { backgroundColor: colors.secondary }]} accessibilityRole="button" accessibilityLabel="Go back">
          <Feather name="arrow-left" size={18} color={colors.foreground} />
        </Pressable>
      </View>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>AUSD goals, in one place.</Text>

      {!account ? (
        <InlineNotice icon="key">Savings plans are protected by Mera. Create or unlock a Mera passkey wallet to get started.</InlineNotice>
      ) : (
        <>
          <Card style={[styles.summary, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
            <View style={styles.summaryTop}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.secondary }]}><Feather name="target" size={19} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>IN ON-CHAIN POCKETS</Text>
                <Text style={[styles.summaryAmount, { color: colors.foreground }]}>{money(onChainTotal)} AUSD</Text>
              </View>
            </View>
            <View style={styles.summaryBottom}>
              <Text style={[styles.summaryMeta, { color: colors.mutedForeground }]}>Wallet available</Text>
              <Text style={[styles.walletAmount, { color: colors.foreground }]}>{balance === null ? '—' : `${money(balance)} AUSD`}</Text>
            </View>
          </Card>

          <View style={styles.actionRow}>
            <ActionTile icon="plus" label="New goal" color={colors} onPress={() => { setError(''); setShowCreate(true); }} />
            <ActionTile icon="gift" label="Gift" color={colors} onPress={() => { setError(''); setActiveSheet('gift'); }} />
            <ActionTile icon="more-horizontal" label="More" color={colors} onPress={() => setActiveSheet('more')} />
          </View>

          {localTrackedTotal > 0 ? <Text style={[styles.localNote, { color: colors.mutedForeground }]}>{money(localTrackedTotal)} AUSD of older progress is tracked on this device.</Text> : null}
          {dueSchedules.length > 0 ? (
            <Pressable
              onPress={() => {
                const first = dueSchedules[0];
                const goal = goals.find((item) => item.id === first.goalId);
                if (goal) openDepositFor(goal.id, first.amount);
              }}
              style={[styles.dueBanner, { backgroundColor: colors.primarySoft }]}
            >
              <View style={[styles.summaryIcon, { backgroundColor: colors.background }]}><Feather name="calendar" size={18} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.goalName, { color: colors.foreground }]}>
                  {dueSchedules.length === 1 ? 'A scheduled save is due' : `${dueSchedules.length} scheduled saves are due`}
                </Text>
                <Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>
                  {(() => {
                    const first = dueSchedules[0];
                    const goal = goals.find((item) => item.id === first.goalId);
                    return `${first.amount} AUSD${goal ? ` → ${goal.name}` : ''} · tap to deposit`;
                  })()}
                </Text>
              </View>
              <Feather name="arrow-right" size={16} color={colors.primary} />
            </Pressable>
          ) : null}
          {lastGiftLink ? (
            <View style={[styles.dueBanner, { backgroundColor: colors.primarySoft }]}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.background }]}><Feather name="link" size={18} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.goalName, { color: colors.foreground }]}>Gift link ready</Text>
                <Text numberOfLines={1} style={[styles.pocketMeta, { color: colors.mutedForeground }]}>Share it anywhere — opens the claim screen</Text>
              </View>
              <Pressable
                onPress={() => { void Clipboard.setStringAsync(lastGiftLink).then(() => { setGiftCopied(true); setTimeout(() => setGiftCopied(false), 1600); }); }}
                style={[styles.maxButton, { backgroundColor: colors.primary }]}
              >
                <Text style={[styles.addText, { color: colors.primaryForeground }]}>{giftCopied ? 'Copied' : 'Copy link'}</Text>
              </Pressable>
              <Pressable onPress={() => setLastGiftLink('')}>
                <Feather name="x" size={15} color={colors.mutedForeground} />
              </Pressable>
            </View>
          ) : null}
          {giftBalance !== null && Number(giftBalance) > 0 ? (
            <Pressable onPress={() => { setUtilityAmount(giftBalance); setActiveSheet('gifts'); }} style={[styles.giftBanner, { backgroundColor: colors.secondary }]}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.background }]}><Feather name="gift" size={18} color={colors.primary} /></View>
              <View style={{ flex: 1 }}><Text style={[styles.goalName, { color: colors.foreground }]}>You received AUSD</Text><Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>Choose a goal or move it to your wallet</Text></View>
              <Text style={[styles.giftAmount, { color: colors.primary }]}>{money(Number(giftBalance))}</Text>
            </Pressable>
          ) : null}

          {error ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
          {loading ? <Text style={[styles.empty, { color: colors.mutedForeground }]}>Unlocking your private savings plan…</Text> : null}
          {!loading && goals.map((goal) => {
            const pocket = pocketStates[goal.id];
            const savedAmount = pocket?.exists ? Number(pocket.balance) : goal.saved;
            const progress = Math.min(1, savedAmount / goal.target);
            return (
              <Card key={goal.id} style={[styles.goalCard, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
                <View style={styles.goalHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.goalName, { color: colors.foreground }]}>{goal.name}</Text>
                     <Text style={[styles.goalTarget, { color: colors.mutedForeground }]}>{money(savedAmount)} of {money(goal.target)} AUSD</Text>
                  </View>
                  <Text style={[styles.percent, { color: colors.primary }]}>{Math.round(progress * 100)}%</Text>
                </View>
                <View style={[styles.track, { backgroundColor: colors.secondary }]}><View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: colors.primary }]} /></View>
                {(() => {
                  const streak = countStreak(depositWeeks[goal.id] ?? []);
                  if (streak < 1) return null;
                  return (
                    <View style={styles.streakRow}>
                      <Feather name="zap" size={13} color={colors.primary} />
                      <Text style={[styles.streakText, { color: colors.mutedForeground }]}>
                        {streak === 1 ? 'Saved this week — keep it going' : `${streak}-week saving streak`}
                      </Text>
                    </View>
                  );
                })()}
                {goal.pocketId && pocket?.exists ? (
                  <View style={styles.contribution}>
                    {goal.localTracked ? (
                      <Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>
                        Previous local-only tracking: {money(goal.localTracked)} AUSD
                      </Text>
                    ) : null}
                    <Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>
                      On-chain pocket · {((goal.autoSaveBps ?? pocket.autoSaveBps) / 100).toFixed(2).replace(/\.?0+$/, '')}% auto-save
                    </Text>
                    <View style={styles.goalMetaRow}>
                      <Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>{((pocket.autoSaveBps) / 100).toFixed(2).replace(/\.?0+$/, '')}% auto-save</Text>
                      <Pressable style={[styles.manageButton, { backgroundColor: colors.background }]} onPress={() => { setError(''); setActiveGoal(goal.id); setGoalSheetMode('menu'); }}>
                        <Text style={[styles.addText, { color: colors.primary }]}>Manage</Text><Feather name="chevron-right" size={15} color={colors.primary} />
                      </Pressable>
                    </View>
                  </View>
                ) : (
                  <View style={styles.contribution}>
                    <Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>
                      {goal.pocketId ? 'Pocket not found on Monad. Try activating it again.' : `${money(goal.saved)} AUSD is older local-only tracking; it has not moved on-chain.`}
                    </Text>
                    <PrimaryButton
                      label={`Activate on Monad · ${autoSaveRate}%`}
                      icon="zap"
                      loading={saving}
                      onPress={() => void activateGoal(goal)}
                    />
                  </View>
                )}
              </Card>
            );
          })}

          {!loading && goals.length > 0 ? <Pressable onPress={() => setShowCreate(true)} style={[styles.addGoalButton, { backgroundColor: colors.secondary }]}><Feather name="plus" size={17} color={colors.primary} /><Text style={[styles.addText, { color: colors.foreground }]}>Create another goal</Text></Pressable> : null}
          <Text style={[styles.privacy, { color: colors.mutedForeground }]}>Pocket balances and transactions are read from Monad testnet. Your plan is protected by your passkey.</Text>
        </>
      )}
      <Modal visible={showCreate || activeGoal !== null} transparent animationType="slide" statusBarTranslucent onRequestClose={() => { setShowCreate(false); setActiveGoal(null); }}>
        <View style={styles.sheetBackdrop}>
          <Pressable style={styles.sheetDismiss} onPress={() => { setShowCreate(false); setActiveGoal(null); }} accessibilityRole="button" accessibilityLabel="Close sheet" />
          <View style={[styles.sheet, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.sheetContent}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>{activeGoal ? (goalSheetMode === 'menu' ? focusedGoal?.name ?? 'Manage goal' : goalSheetMode === 'deposit' ? 'Add to your goal' : goalSheetMode === 'rate' ? 'Auto-save rate' : goalSheetMode === 'schedule' ? 'Scheduled saves' : 'Withdraw AUSD') : 'Create a savings goal'}</Text>
            <Text style={[styles.sheetHint, { color: colors.mutedForeground }]}>{activeGoal ? (goalSheetMode === 'menu' ? 'Manage this goal and its AUSD pocket.' : goalSheetMode === 'deposit' ? 'Move AUSD from your wallet into this pocket.' : goalSheetMode === 'rate' ? 'Choose the share of each payment to save.' : goalSheetMode === 'schedule' ? 'Set an amount and cadence. We remind you here when one is due.' : `Available in pocket: ${focusedGoal ? money(Number(pocketStates[focusedGoal.id]?.balance ?? 0)) : '0.00'} AUSD`) : 'Set a target and choose how payments can grow it.'}</Text>
            {activeGoal && goalSheetMode === 'menu' ? <View style={styles.sheetActions}>
              <SheetAction icon="plus" title="Deposit AUSD" detail="Move AUSD into this goal" color={colors} onPress={() => { setContribution(''); setGoalSheetMode('deposit'); }} />
              <SheetAction icon="arrow-up-right" title="Pay + auto-save" detail="Send AUSD and save a percentage" color={colors} onPress={() => { if (!focusedGoal?.pocketId) return; setActiveGoal(null); router.push({ pathname: '/(tabs)/send', params: { pocketId: focusedGoal.pocketId, autoSaveBps: String(pocketStates[focusedGoal.id]?.autoSaveBps ?? focusedGoal.autoSaveBps ?? 0), goalName: focusedGoal.name } }); }} />
              <SheetAction icon="percent" title="Change auto-save" detail={`${((pocketStates[focusedGoal?.id ?? '']?.autoSaveBps ?? focusedGoal?.autoSaveBps ?? 0) / 100).toFixed(2).replace(/\.?0+$/, '')}% currently`} color={colors} onPress={() => { setUtilityAmount(String((pocketStates[focusedGoal?.id ?? '']?.autoSaveBps ?? focusedGoal?.autoSaveBps ?? 0) / 100)); setGoalSheetMode('rate'); }} />
              <SheetAction icon="download" title="Withdraw" detail="Send pocket AUSD back to your wallet" color={colors} onPress={() => { setUtilityAmount(''); setGoalSheetMode('withdraw'); }} />
              <SheetAction icon="calendar" title="Schedule saves" detail={focusedGoal && schedules.some((item) => item.goalId === focusedGoal.id && item.active) ? `${schedules.filter((item) => item.goalId === focusedGoal?.id && item.active).length} active` : 'Weekly or monthly deposits'} color={colors} onPress={() => { setScheduleAmount(''); setGoalSheetMode('schedule'); }} />
              <SheetAction icon="share-2" title="Share pocket" detail="Let someone track or fund this goal" color={colors} onPress={() => { if (focusedGoal) void sharePocket(focusedGoal); setActiveGoal(null); }} />
            </View> : null}
            {activeGoal && goalSheetMode === 'deposit' ? <>
              <Field label="Amount · AUSD" value={contribution} onChangeText={setContribution} placeholder="0.00" keyboardType="decimal-pad" />
              <PrimaryButton label="Deposit AUSD" icon="lock" loading={saving} onPress={() => { const goal = goals.find((item) => item.id === activeGoal); if (goal) void addSavings(goal); }} />
            </> : null}
            {activeGoal && goalSheetMode === 'rate' ? <>
              <Field label="Auto-save rate · %" value={utilityAmount} onChangeText={setUtilityAmount} placeholder="10" keyboardType="decimal-pad" />
              <Text style={[styles.sheetHint, { color: colors.mutedForeground }]}>On a 100 AUSD payment, {(Number.isFinite(Number(utilityAmount)) ? Number(utilityAmount) : 0).toLocaleString('en-US', { maximumFractionDigits: 2 })} AUSD would go to this goal.</Text>
              <PrimaryButton label="Update rate" icon="percent" loading={saving} onPress={() => void updateGoalRate()} />
            </> : null}
            {activeGoal && goalSheetMode === 'withdraw' ? <>
              <View style={styles.amountRow}><View style={styles.amountField}><Field label="Amount · AUSD" value={utilityAmount} onChangeText={setUtilityAmount} placeholder="0.00" keyboardType="decimal-pad" /></View><Pressable onPress={() => setUtilityAmount(String(pocketStates[focusedGoal?.id ?? '']?.balance ?? '0'))} style={[styles.maxButton, { backgroundColor: colors.secondary }]}><Text style={[styles.addText, { color: colors.primary }]}>Max</Text></Pressable></View>
              <PrimaryButton label="Review withdrawal" icon="download" loading={saving} onPress={() => Alert.alert('Review withdrawal', `${utilityAmount || '0.00'} AUSD will be sent to your wallet:\n${account?.address ?? ''}`, [{ text: 'Cancel', style: 'cancel' }, { text: 'Confirm with passkey', onPress: () => void withdrawFromGoal() }])} />
            </> : null}
            {activeGoal && goalSheetMode === 'schedule' ? <>
              <Field label="Amount · AUSD" value={scheduleAmount} onChangeText={setScheduleAmount} placeholder="5.00" keyboardType="decimal-pad" />
              <View style={styles.choiceList}>
                {(['weekly', 'monthly'] as ScheduleFrequency[]).map((option) => (
                  <Pressable key={option} onPress={() => setScheduleFrequency(option)} style={[styles.choice, { borderWidth: 0, backgroundColor: scheduleFrequency === option ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.addText, { color: scheduleFrequency === option ? colors.primaryForeground : colors.foreground }]}>{option === 'weekly' ? 'Weekly' : 'Monthly'}</Text>
                  </Pressable>
                ))}
              </View>
              <PrimaryButton label="Save schedule" icon="calendar" loading={saving} onPress={() => void createSchedule()} />
              {focusedSchedules.length ? focusedSchedules.map((item) => (
                <View key={item.id} style={styles.sharedUtilityRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.goalName, { color: colors.foreground }]}>{item.amount} AUSD · {item.frequency}</Text>
                    <Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>{describeSchedule(item)}</Text>
                  </View>
                  <Pressable onPress={() => void updateSchedule(item.id, { active: !item.active }).then(setSchedules)}>
                    <Text style={[styles.addText, { color: colors.primary }]}>{item.active ? 'Pause' : 'Resume'}</Text>
                  </Pressable>
                  <Pressable onPress={() => void removeSchedule(item.id).then(setSchedules)}>
                    <Text style={[styles.addText, { color: colors.destructive }]}>Remove</Text>
                  </Pressable>
                </View>
              )) : <Text style={[styles.empty, { color: colors.mutedForeground }]}>No schedules for this goal yet.</Text>}
            </> : null}
            {!activeGoal ? <>
              <Field label="Goal name" value={name} onChangeText={setName} placeholder="A new laptop" autoCapitalize="sentences" />
              <Field label="Target · AUSD" value={target} onChangeText={setTarget} placeholder="500.00" keyboardType="decimal-pad" />
              <Field label="Auto-save rate · %" value={autoSaveRate} onChangeText={setAutoSaveRate} placeholder="10" keyboardType="decimal-pad" />
              <PrimaryButton label="Create goal" icon="shield" loading={saving} onPress={() => void createGoal()} />
            </> : null}
            {error ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
            <Pressable onPress={() => { setShowCreate(false); setActiveGoal(null); }} style={styles.sheetCancel}><Text style={[styles.addText, { color: colors.mutedForeground }]}>Cancel</Text></Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal visible={activeSheet !== null} transparent animationType="slide" statusBarTranslucent onRequestClose={() => setActiveSheet(null)}>
        <View style={styles.sheetBackdrop}>
          <Pressable style={styles.sheetDismiss} onPress={() => setActiveSheet(null)} accessibilityRole="button" accessibilityLabel="Close sheet" />
          <View style={[styles.sheet, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.sheetContent}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>{activeSheet === 'gift' ? 'Send an AUSD gift' : activeSheet === 'shared' ? 'Track a shared pocket' : activeSheet === 'restore' ? 'Restore your plan' : activeSheet === 'gifts' ? 'Received AUSD' : activeSheet === 'allocate' ? 'Add gifts to a goal' : 'More savings tools'}</Text>
            <Text style={[styles.sheetHint, { color: colors.mutedForeground }]}>{activeSheet === 'gift' ? 'Choose a private contact, then send from your wallet.' : activeSheet === 'shared' ? 'Paste a pocket code to follow or fund someone’s goal.' : activeSheet === 'restore' ? 'Use an encrypted backup made with this passkey.' : activeSheet === 'gifts' ? `${giftBalance ? money(Number(giftBalance)) : '0.00'} AUSD is ready to use.` : activeSheet === 'allocate' ? 'Choose an active goal and the amount to move into it.' : 'Backup, shared pockets, and activity.'}</Text>
            {activeSheet === 'gift' ? <>
              {contacts.length ? <View style={styles.choiceList}>{contacts.map((contact) => <Pressable key={contact.id} onPress={() => setGiftRecipient(contact.id)} style={[styles.choice, { borderWidth: 0, backgroundColor: giftRecipient === contact.id ? colors.primary : colors.secondary }]}><Text style={[styles.addText, { color: giftRecipient === contact.id ? colors.primaryForeground : colors.foreground }]}>{contact.name}</Text></Pressable>)}</View> : <Text style={[styles.empty, { color: colors.mutedForeground }]}>Add a contact in Settings to send a gift.</Text>}
              <TextInput value={giftAmount} onChangeText={setGiftAmount} placeholder="Amount in AUSD" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.input, { color: colors.foreground, backgroundColor: colors.secondary, borderWidth: 0 }]} />
              {sharedPockets.length ? <View style={styles.choiceList}><Pressable onPress={() => setGiftPocket('')} style={[styles.choice, { borderWidth: 0, backgroundColor: !giftPocket ? colors.primary : colors.secondary }]}><Text style={[styles.addText, { color: !giftPocket ? colors.primaryForeground : colors.foreground }]}>Gift person</Text></Pressable>{sharedPockets.map((item) => <Pressable key={item.id} onPress={() => setGiftPocket(item.id)} style={[styles.choice, { borderWidth: 0, backgroundColor: giftPocket === item.id ? colors.primary : colors.secondary }]}><Text style={[styles.addText, { color: giftPocket === item.id ? colors.primaryForeground : colors.foreground }]}>{item.name}</Text></Pressable>)}</View> : null}
              <PrimaryButton label="Review and send" icon="lock" loading={saving} onPress={() => void sendGift()} />
            </> : activeSheet === 'shared' ? <>
              <TextInput value={pocketCode} onChangeText={setPocketCode} placeholder="Shared pocket code" placeholderTextColor={colors.mutedForeground} autoCapitalize="none" autoCorrect={false} style={[styles.input, { color: colors.foreground, backgroundColor: colors.secondary, borderWidth: 0 }]} />
              <PrimaryButton label="Track pocket" icon="link" loading={saving} onPress={() => void importSharedPocket()} />
            </> : activeSheet === 'gifts' ? <>
              {goals.some((goal) => Boolean(goal.pocketId && pocketStates[goal.id]?.exists)) ? <PrimaryButton label="Allocate to a goal" icon="target" secondary onPress={() => { setSelectedGiftGoal(goals.find((goal) => goal.pocketId && pocketStates[goal.id]?.exists)?.id ?? ''); setUtilityAmount(giftBalance ?? ''); setActiveSheet('allocate'); }} /> : <Text style={[styles.empty, { color: colors.mutedForeground }]}>Create and activate a savings goal to allocate gifts, or withdraw them below.</Text>}
              <View style={styles.amountRow}><View style={styles.amountField}><Field label="Withdraw amount · AUSD" value={utilityAmount} onChangeText={setUtilityAmount} placeholder="0.00" keyboardType="decimal-pad" /></View><Pressable onPress={() => setUtilityAmount(giftBalance ?? '0')} style={[styles.maxButton, { backgroundColor: colors.secondary }]}><Text style={[styles.addText, { color: colors.primary }]}>Max</Text></Pressable></View>
              <PrimaryButton label="Review withdrawal" icon="download" loading={saving} onPress={() => Alert.alert('Review gift withdrawal', `${utilityAmount || '0.00'} AUSD will be sent to your wallet:\n${account?.address ?? ''}`, [{ text: 'Cancel', style: 'cancel' }, { text: 'Confirm with passkey', onPress: () => void withdrawReceivedGifts(utilityAmount) }])} />
            </> : activeSheet === 'allocate' ? <>
              {goals.filter((goal) => goal.pocketId && pocketStates[goal.id]?.exists).length ? <View style={styles.choiceList}>{goals.filter((goal) => goal.pocketId && pocketStates[goal.id]?.exists).map((goal) => <Pressable key={goal.id} onPress={() => setSelectedGiftGoal(goal.id)} style={[styles.choice, { backgroundColor: selectedGiftGoal === goal.id ? colors.primary : colors.secondary }]}><Text style={[styles.addText, { color: selectedGiftGoal === goal.id ? colors.primaryForeground : colors.foreground }]}>{goal.name}</Text></Pressable>)}</View> : <Text style={[styles.empty, { color: colors.mutedForeground }]}>No active goal pockets are available. Activate a goal first.</Text>}
              <View style={styles.amountRow}><View style={styles.amountField}><Field label="Amount · AUSD" value={utilityAmount} onChangeText={setUtilityAmount} placeholder="0.00" keyboardType="decimal-pad" /></View><Pressable onPress={() => setUtilityAmount(giftBalance ?? '0')} style={[styles.maxButton, { backgroundColor: colors.secondary }]}><Text style={[styles.addText, { color: colors.primary }]}>Max</Text></Pressable></View>
              <PrimaryButton label="Review allocation" icon="target" loading={saving} disabled={!goals.some((goal) => goal.id === selectedGiftGoal && goal.pocketId && pocketStates[goal.id]?.exists)} onPress={() => { const goal = goals.find((item) => item.id === selectedGiftGoal); Alert.alert('Review gift allocation', `${utilityAmount || '0.00'} AUSD will be added to ${goal?.name ?? 'your goal'}.`, [{ text: 'Cancel', style: 'cancel' }, { text: 'Confirm with passkey', onPress: () => void allocateReceivedGifts() }]); }} />
            </> : activeSheet === 'restore' ? <>
              <TextInput value={backupText} onChangeText={setBackupText} multiline autoCapitalize="none" autoCorrect={false} placeholder="Paste encrypted backup JSON" placeholderTextColor={colors.mutedForeground} selectionColor={colors.primary} style={[styles.backupInput, { color: colors.foreground, backgroundColor: colors.secondary, borderWidth: 0 }]} />
              <PrimaryButton label="Restore with passkey" icon="key" loading={saving} onPress={() => void restoreBackup()} />
            </> : <>
              <PrimaryButton label="Track shared pocket" icon="users" secondary onPress={() => setActiveSheet('shared')} />
              <PrimaryButton label="Share encrypted backup" icon="share" secondary onPress={() => { setActiveSheet(null); void shareBackup(); }} />
              <PrimaryButton label="Restore from backup" icon="key" secondary onPress={() => setActiveSheet('restore')} />
              {sharedPockets.map((shared) => <View key={shared.id} style={styles.sharedUtilityRow}><View style={{ flex: 1 }}><Text style={[styles.goalName, { color: colors.foreground }]}>{shared.name}</Text><Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>{sharedPocketStates[shared.id]?.exists ? `${money(Number(sharedPocketStates[shared.id].balance))} AUSD` : 'Pocket unavailable'}</Text></View><Pressable onPress={() => void removeSharedPocket(shared.id)}><Text style={[styles.addText, { color: colors.destructive }]}>Remove</Text></Pressable></View>)}
              <PrimaryButton label="View savings activity" icon="activity" secondary onPress={() => { setActiveSheet(null); router.push('/(tabs)/activity'); }} />
            </>}
            {error ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
            <Pressable onPress={() => setActiveSheet(null)} style={styles.sheetCancel}><Text style={[styles.addText, { color: colors.mutedForeground }]}>Close</Text></Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal visible={celebration !== null} transparent animationType="fade" onRequestClose={() => setCelebration(null)}>
        <View style={styles.celebrateBackdrop}>
          <View style={[styles.celebrateCard, { backgroundColor: colors.background }]}>
            <View style={[styles.celebrateIcon, { backgroundColor: colors.primarySoft }]}>
              <Feather name="award" size={26} color={colors.primary} />
            </View>
            <Text style={[styles.celebratePct, { color: colors.primary }]}>{celebration?.pct}%</Text>
            <Text style={[styles.sheetTitle, { color: colors.foreground, textAlign: 'center' }]}>{celebration?.name} is taking shape</Text>
            <Text style={[styles.sheetHint, { color: colors.mutedForeground, textAlign: 'center' }]}>You saved your way to {celebration?.pct}% of this goal. Keep the streak alive.</Text>
            <PrimaryButton label="Share progress" icon="share-2" onPress={() => void shareGoalMilestone()} />
            <Pressable onPress={() => setCelebration(null)} style={styles.sheetCancel}><Text style={[styles.addText, { color: colors.mutedForeground }]}>Keep saving</Text></Pressable>
          </View>
        </View>
      </Modal>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14, paddingBottom: 38 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: -5 },
  back: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  subtitle: { fontSize: 13, lineHeight: 19, marginTop: -7, marginBottom: 4 },
  summary: { gap: 14, padding: 18, borderRadius: 20 },
  summaryTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  summaryLabel: { fontSize: 10, letterSpacing: 0.7, fontFamily: 'Inter_600SemiBold' },
  summaryAmount: { fontSize: 24, fontFamily: 'Inter_700Bold', marginTop: 2 },
  summaryMeta: { fontSize: 11 },
  summaryBottom: { paddingTop: 11, borderTopWidth: 1, borderTopColor: 'rgba(90,95,105,0.12)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  walletAmount: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  actionRow: { flexDirection: 'row', gap: 9 },
  actionTile: { flex: 1, minHeight: 72, alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 16 },
  actionLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
  localNote: { fontSize: 11, lineHeight: 16, paddingHorizontal: 3 },
  giftBanner: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 14, borderRadius: 18 },
  dueBanner: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 14, borderRadius: 18 },
  giftAmount: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  sharedCard: { gap: 13, padding: 16 },
  sharedRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  choiceList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  receivedGift: { gap: 10 },
  input: { minHeight: 48, borderRadius: 14, paddingHorizontal: 14, fontSize: 14 },
  goalCard: { gap: 13, padding: 17, borderRadius: 20 },
  goalHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  goalName: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  goalTarget: { fontSize: 12, marginTop: 4 },
  percent: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  goalMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  manageButton: { minHeight: 34, flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 11, paddingHorizontal: 10 },
  track: { height: 8, borderRadius: 8, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 8 },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  streakText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  celebrateBackdrop: { flex: 1, justifyContent: 'center', padding: 32, backgroundColor: 'rgba(12,15,20,0.5)' },
  celebrateCard: { borderRadius: 24, padding: 26, gap: 12, alignItems: 'center' },
  celebrateIcon: { width: 64, height: 64, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  celebratePct: { fontSize: 34, fontFamily: 'Inter_700Bold' },
  addButton: { alignSelf: 'flex-start', minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionChip: { minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 11, borderRadius: 12 },
  addText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  contribution: { gap: 11 },
  pocketMeta: { fontSize: 11, lineHeight: 17, fontFamily: 'Inter_400Regular' },
  pocketActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 },
  sheetActions: { gap: 8 },
  sheetAction: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, borderRadius: 14 },
  sheetActionIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sheetActionTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  sheetActionDetail: { fontSize: 11, marginTop: 2 },
  amountRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  amountField: { flex: 1 },
  maxButton: { marginBottom: 5, minHeight: 43, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 13 },
  sharedUtilityRow: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backupInput: { minHeight: 104, borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 12, textAlignVertical: 'top' },
  createTitle: { fontSize: 17, fontFamily: 'Inter_600SemiBold', marginBottom: 2 },
  empty: { fontSize: 13, paddingVertical: 12 },
  error: { fontSize: 13, lineHeight: 19 },
  privacy: { textAlign: 'center', fontSize: 11, lineHeight: 17, paddingHorizontal: 10 },
  addGoalButton: { minHeight: 48, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  sheetBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(12,15,20,0.42)' },
  sheetDismiss: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  sheet: { borderTopLeftRadius: 26, borderTopRightRadius: 26, maxHeight: '88%', padding: 0 },
  sheetContent: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 34, gap: 14 },
  sheetHandle: { width: 38, height: 4, borderRadius: 4, alignSelf: 'center', marginBottom: 3 },
  sheetTitle: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  sheetHint: { fontSize: 12, lineHeight: 18, marginTop: -9 },
  sheetCancel: { minHeight: 36, alignItems: 'center', justifyContent: 'center' },
});

type Palette = ReturnType<typeof useColors>;
function ActionTile({ icon, label, color, onPress }: { icon: React.ComponentProps<typeof Feather>['name']; label: string; color: Palette; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.actionTile, { backgroundColor: color.secondary, opacity: pressed ? 0.75 : 1 }]}>
    <Feather name={icon} size={18} color={color.primary} />
    <Text style={[styles.actionLabel, { color: color.foreground }]}>{label}</Text>
  </Pressable>;
}

function SheetAction({ icon, title, detail, color, onPress }: { icon: React.ComponentProps<typeof Feather>['name']; title: string; detail: string; color: Palette; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.sheetAction, { backgroundColor: color.secondary, opacity: pressed ? 0.72 : 1 }]}>
    <View style={[styles.sheetActionIcon, { backgroundColor: color.background }]}><Feather name={icon} size={16} color={color.primary} /></View>
    <View style={{ flex: 1 }}><Text style={[styles.sheetActionTitle, { color: color.foreground }]}>{title}</Text><Text style={[styles.sheetActionDetail, { color: color.mutedForeground }]}>{detail}</Text></View>
    <Feather name="chevron-right" size={16} color={color.mutedForeground} />
  </Pressable>;
}
