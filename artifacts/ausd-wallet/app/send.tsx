import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  PanResponder,
  useWindowDimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { isAddress } from 'viem';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { getTokenBalance } from '@/services/passkey';
import { loadContacts, type WalletContact } from '@/services/contacts';
import { simulateTokenSwap, type SettlementQuote } from '@/services/settlement';
import { TRANSFER_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
import { PrimaryButton } from '@/components/Primitives';

const money = (amount: number) =>
  amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

const SETTLEMENT_OUTPUTS: WalletToken[] = ['CTK', 'USDC'];

function trimToDecimals(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return String(Math.floor(value * factor) / factor);
}

export default function SendDrawer() {
  const params = useLocalSearchParams<{ recipient?: string; recipientName?: string; token?: string; amount?: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { profile, balance: demoBalance } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [balances, setBalances] = useState<Partial<Record<WalletToken, number | null>>>({});
  const [balanceError, setBalanceError] = useState('');
  const [error, setError] = useState('');
  const [sendMode, setSendMode] = useState<'direct' | 'settlement'>('direct');
  const [token, setToken] = useState<WalletToken>('AUSD');
  const [settlementOutput, setSettlementOutput] = useState<WalletToken>('CTK');
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [contacts, setContacts] = useState<WalletContact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState('');
  const [quote, setQuote] = useState<SettlementQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState('');
  const [drawerOffset, setDrawerOffset] = useState(0);
  const parsedAmount = Number(amount);
  const drawerPan = PanResponder.create({
    onMoveShouldSetPanResponder: (_event, gesture) => gesture.dy > 5,
    onPanResponderMove: (_event, gesture) => setDrawerOffset(Math.max(0, gesture.dy)),
    onPanResponderRelease: (_event, gesture) => {
      if (gesture.dy > 90 || gesture.vy > 0.8) router.back();
      setDrawerOffset(0);
    },
  });

  const account = useMemo(() => profile?.mode === 'mera' && profile.address && profile.signerAddress && profile.passkey
    ? { address: profile.address, signerAddress: profile.signerAddress, credential: profile.passkey.credential, rpId: profile.passkey.rpId }
    : null, [profile]);

  const activeInputToken: WalletToken = sendMode === 'settlement' ? 'AUSD' : token;
  const activeDecimals = WALLET_TOKENS[activeInputToken].decimals;
  const showDollar = activeInputToken === 'AUSD' || activeInputToken === 'USDC';

  useEffect(() => {
    if (params.recipient) {
      setRecipient(params.recipient);
      setRecipientName(params.recipientName ?? '');
    }
  }, [params.recipient, params.recipientName]);

  useEffect(() => {
    if (params.amount && /^\d+(\.\d+)?$/.test(params.amount)) setAmount(params.amount);
  }, [params.amount]);

  useEffect(() => {
    if (params.token === 'AUSD' || params.token === 'USDC' || params.token === 'CTK') setToken(params.token);
  }, [params.token]);

  useEffect(() => {
    if (profile?.mode !== 'mera' || !profile.address) {
      setBalances({});
      return;
    }
    let active = true;
    setBalanceError('');
    Promise.allSettled(TRANSFER_TOKENS.map((t) => getTokenBalance(profile.address!, t)))
      .then((results) => {
        if (!active) return;
        const next: Partial<Record<WalletToken, number | null>> = {};
        results.forEach((result, index) => {
          next[TRANSFER_TOKENS[index]] = result.status === 'fulfilled' ? Number(result.value) : null;
        });
        setBalances(next);
        if (results.some((r) => r.status === 'rejected')) {
          setBalanceError('Some balances are unavailable');
        }
      })
      .catch((caught: unknown) => {
        if (active) setBalanceError(caught instanceof Error ? caught.message : 'Balance unavailable');
      });
    return () => { active = false; };
  }, [profile?.address, profile?.mode]);

  const availableBalance = profile?.mode === 'mera' ? balances[activeInputToken] ?? null : demoBalance;
  const balance = profile?.mode === 'mera' ? availableBalance : demoBalance;

  const recipientError = useMemo(() => {
    const trimmed = recipient.trim();
    if (!trimmed) return '';
    if (!isAddress(trimmed, { strict: false })) return 'Enter a valid wallet address.';
    if (profile?.address && trimmed.toLowerCase() === profile.address.toLowerCase()) return 'This is your own wallet. Choose a different recipient.';
    return '';
  }, [recipient, profile?.address]);

  useEffect(() => {
    setQuote(null);
    setQuoteError('');
    if (sendMode !== 'settlement' || profile?.mode !== 'mera' || !profile.address || !new RegExp(`^\\d+(\\.\\d{1,${activeDecimals}})?$`).test(amount) || Number(amount) <= 0) {
      setQuoteLoading(false);
      return;
    }
    let active = true;
    const timer = setTimeout(() => {
      setQuoteLoading(true);
      simulateTokenSwap('AUSD', settlementOutput, amount, profile.address!, 'exact-input')
        .then((result) => { if (active) setQuote(result); })
        .catch((caught: unknown) => {
          if (active) setQuoteError(caught instanceof Error ? caught.message : 'Agora quote unavailable.');
        })
        .finally(() => { if (active) setQuoteLoading(false); });
    }, 350);
    return () => { active = false; clearTimeout(timer); };
  }, [amount, sendMode, settlementOutput, activeDecimals, profile?.address, profile?.mode]);

  async function openContacts() {
    setContactsError('');
    setContactsOpen(true);
    if (!account) {
      setContactsError('Unlock a Mera passkey wallet to read encrypted contacts.');
      return;
    }
    setContactsLoading(true);
    try {
      setContacts(await loadContacts(account));
    } catch (caught) {
      setContactsError(caught instanceof Error ? caught.message : 'Could not unlock contacts. You can still paste an address.');
    } finally {
      setContactsLoading(false);
    }
  }

  async function pasteRecipient() {
    try {
      const text = (await Clipboard.getStringAsync()).trim();
      if (text) {
        setRecipient(text);
        setRecipientName('');
      }
    } catch {
      setError('Could not read the clipboard.');
    }
  }

  function applyQuickAmount(fraction: number) {
    if (balance === null || !Number.isFinite(balance)) return;
    if (fraction >= 1) {
      setAmount(String(balance));
    } else {
      setAmount(trimToDecimals(balance * fraction, activeDecimals));
    }
    setError('');
  }

  function chooseToken(next: WalletToken) {
    setToken(next);
    setAmount('');
    setError('');
    setTokenModalOpen(false);
  }

  async function continueToReview() {
    setError('');
    if (profile?.mode !== 'mera') {
      setError(`Create a Mera passkey wallet to send testnet ${sendMode === 'settlement' ? 'AUSD' : token}.`);
      return;
    }
    if (!profile.address || !profile.signerAddress || !profile.passkey) {
      setError('This passkey wallet needs to be set up again before it can send.');
      return;
    }
    if (!isAddress(recipient.trim(), { strict: false })) {
      setError('Enter a valid wallet address.');
      return;
    }
    if (recipient.trim().toLowerCase() === profile.address.toLowerCase() && sendMode === 'direct') {
      setError('Choose a recipient other than your own wallet.');
      return;
    }
    if (!new RegExp(`^\\d+(\\.\\d{1,${activeDecimals}})?$`).test(amount) || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError(`Enter an amount with up to ${activeDecimals} decimal places.`);
      return;
    }
    if (balance === null) {
      setError(balanceError || 'Loading your testnet balance…');
      return;
    }
    if (parsedAmount > balance) {
      setError(`Available: ${money(balance)} ${sendMode === 'settlement' ? 'AUSD' : token}.`);
      return;
    }
    if (sendMode === 'settlement') {
      try {
        const freshQuote = await simulateTokenSwap('AUSD', settlementOutput, amount, profile.address, 'exact-input');
        router.push({
          pathname: '/review',
          params: {
            mode: 'settlement', recipient: recipient.trim(), recipientName, amount, token: 'AUSD',
            inputToken: 'AUSD', outputToken: settlementOutput,
            quoteOutput: freshQuote.amountOut,
            quoteOutputRaw: freshQuote.amountOutRaw,
            quoteCheckedAt: freshQuote.checkedAt,
            pairAddress: freshQuote.pairAddress,
            purchaseFeeRate: freshQuote.purchaseFeeRate,
          },
        });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Agora quote unavailable.');
      }
      return;
    }
    router.push({ pathname: '/review', params: { mode: 'direct', recipient: recipient.trim(), recipientName, amount, token } });
  }

  return (
    <View style={styles.overlay}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close send sheet"
        style={[StyleSheet.absoluteFill, styles.backdrop]}
        onPress={() => router.back()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardLayer}
        pointerEvents="box-none"
      >
        <View
          style={[
            styles.sheet,
            {
              height: windowHeight * 0.82,
              backgroundColor: colors.background,
              paddingBottom: Math.max(insets.bottom, 18) + 14,
            },
          ]}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <View {...drawerPan.panHandlers} style={styles.handleRow}>
              <View style={[styles.handle, { backgroundColor: colors.border }]} />
            </View>
            <View style={styles.heading}>
              <View>
                <Text style={[styles.title, { color: colors.foreground }]}>{sendMode === 'direct' ? `Send ${token}` : 'Cross-border'}</Text>
                <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{sendMode === 'direct' ? 'Direct wallet transfer' : 'Agora instant settlement · testnet'}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close send sheet"
                onPress={() => router.back()}
                style={[styles.close, { backgroundColor: colors.secondary }]}
              >
                <Feather name="x" size={19} color={colors.foreground} />
              </Pressable>
            </View>

            <View style={[styles.modeSwitch, { backgroundColor: colors.secondary }]}>
              <Pressable onPress={() => { setSendMode('direct'); setError(''); }} style={[styles.modeOption, sendMode === 'direct' && { backgroundColor: colors.background }]}>
                <Text style={[styles.modeText, { color: sendMode === 'direct' ? colors.foreground : colors.mutedForeground }]}>Token transfer</Text>
              </Pressable>
              <Pressable onPress={() => { setSendMode('settlement'); setError(''); }} style={[styles.modeOption, sendMode === 'settlement' && { backgroundColor: colors.background }]}>
                <Text style={[styles.modeText, { color: sendMode === 'settlement' ? colors.foreground : colors.mutedForeground }]}>Cross-border</Text>
              </Pressable>
            </View>

            {sendMode === 'direct' ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Choose token to send"
                onPress={() => setTokenModalOpen(true)}
                style={[styles.tokenPicker, { backgroundColor: colors.secondary }]}
              >
                <View style={[styles.tokenBadge, { backgroundColor: colors.background }]}>
                  <Text style={[styles.tokenBadgeText, { color: colors.foreground }]}>{token.slice(0, 1)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tokenPickerTitle, { color: colors.foreground }]}>{token} · {WALLET_TOKENS[token].name}</Text>
                  <Text style={[styles.tokenPickerSub, { color: colors.mutedForeground }]}>
                    {profile?.mode === 'mera'
                      ? balances[token] === undefined ? 'Loading…' : balances[token] === null ? balanceError || 'Balance unavailable' : `Available ${money(balances[token]!)}`
                      : `Demo ${money(demoBalance)}`}
                  </Text>
                </View>
                <Feather name="chevron-down" size={18} color={colors.mutedForeground} />
              </Pressable>
            ) : (
              <View style={[styles.settleRow, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.settleLabel, { color: colors.mutedForeground }]}>YOU SEND AUSD · THEY RECEIVE</Text>
                <View style={styles.settleOptions}>
                  {SETTLEMENT_OUTPUTS.map((option) => (
                    <Pressable key={option} onPress={() => { setSettlementOutput(option); setQuote(null); setQuoteError(''); }} style={[styles.tokenOption, { backgroundColor: settlementOutput === option ? colors.primary : colors.background }]}>
                      <Text style={[styles.modeText, { color: settlementOutput === option ? colors.primaryForeground : colors.foreground }]}>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            <View style={[styles.amountPanel, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT · {activeInputToken}</Text>
              <View style={styles.amountRow}>
                {showDollar ? <Text style={[styles.dollar, { color: colors.foreground }]}>$</Text> : null}
                <TextInput
                  accessibilityLabel={`${activeInputToken} amount`}
                  value={amount}
                  onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
                  placeholder="0"
                  placeholderTextColor={colors.mutedForeground}
                  keyboardType="decimal-pad"
                  selectionColor={colors.primary}
                  style={[styles.amountInput, { color: colors.foreground }]}
                  autoFocus
                />
                <Text style={[styles.currency, { color: colors.mutedForeground }]}>{activeInputToken}</Text>
              </View>
              <View style={styles.balanceRow}>
                <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>
                  {profile?.mode === 'mera'
                    ? availableBalance === null ? balanceError || 'Loading balance…' : `Available ${money(availableBalance)} ${activeInputToken}`
                    : `Demo balance ${money(demoBalance)} ${activeInputToken}`}
                </Text>
              </View>
              <View style={styles.quickRow}>
                {[0.25, 0.5, 1].map((fraction) => (
                  <Pressable
                    key={fraction}
                    disabled={balance === null}
                    onPress={() => applyQuickAmount(fraction)}
                    style={[styles.quickChip, { backgroundColor: colors.background, opacity: balance === null ? 0.5 : 1 }]}
                  >
                    <Text style={[styles.quickText, { color: colors.foreground }]}>{fraction === 1 ? 'MAX' : `${Math.round(fraction * 100)}%`}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {sendMode === 'settlement' ? (
              <View style={[styles.quotePanel, { backgroundColor: colors.secondary }]}>
                <View style={styles.quoteLine}>
                  <Text style={[styles.quoteLabel, { color: colors.mutedForeground }]}>Recipient receives (min)</Text>
                  <Text style={[styles.quoteValue, { color: colors.foreground }]}>
                    {quoteLoading ? 'Updating…' : quote ? `${Number(quote.amountOut).toLocaleString('en-US', { maximumFractionDigits: quote.outputDecimals })} ${settlementOutput}` : `— ${settlementOutput}`}
                  </Text>
                </View>
                <Text style={[styles.quoteCaption, { color: colors.mutedForeground }]}>
                  {quoteError || (quote ? `Agora fixed-price pair · ${settlementOutput} minimum locked at review` : 'Enter an amount to get an Agora testnet quote.')}
                </Text>
              </View>
            ) : null}

            <View style={styles.recipientBlock}>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>TO</Text>
              {recipientName ? (
                <View style={[styles.contactChip, { backgroundColor: colors.secondary }]}>
                  <View style={[styles.contactAvatar, { backgroundColor: colors.background }]}>
                    <Feather name="user" size={14} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.contactName, { color: colors.foreground }]}>{recipientName}</Text>
                    <Text numberOfLines={1} style={[styles.contactAddress, { color: colors.mutedForeground }]}>
                      {recipient.length > 14 ? `${recipient.slice(0, 6)}…${recipient.slice(-4)}` : recipient}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Clear selected contact"
                    onPress={() => { setRecipient(''); setRecipientName(''); }}
                    style={styles.contactClear}
                  >
                    <Feather name="x" size={15} color={colors.mutedForeground} />
                  </Pressable>
                </View>
              ) : null}
              <TextInput
                accessibilityLabel="Recipient wallet address"
                value={recipient}
                onChangeText={(value) => {
                  setRecipient(value);
                  if (value.toLowerCase() !== params.recipient?.toLowerCase()) setRecipientName('');
                }}
                placeholder="Wallet address"
                placeholderTextColor={colors.mutedForeground}
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor={colors.primary}
                style={[styles.recipientInput, { color: colors.foreground, backgroundColor: colors.secondary, borderColor: recipientError ? colors.destructive : 'transparent', borderWidth: recipientError ? 1 : 0 }]}
              />
              {recipientError ? <Text style={[styles.fieldError, { color: colors.destructive }]}>{recipientError}</Text> : null}
              <View style={styles.recipientActions}>
                <Pressable onPress={() => void pasteRecipient()} style={[styles.actionChip, { backgroundColor: colors.secondary }]}>
                  <Feather name="clipboard" size={14} color={colors.foreground} />
                  <Text style={[styles.actionText, { color: colors.foreground }]}>Paste</Text>
                </Pressable>
                <Pressable onPress={() => router.push('/scan')} style={[styles.actionChip, { backgroundColor: colors.secondary }]}>
                  <Feather name="camera" size={14} color={colors.foreground} />
                  <Text style={[styles.actionText, { color: colors.foreground }]}>Scan</Text>
                </Pressable>
                <Pressable onPress={() => void openContacts()} style={[styles.actionChip, { backgroundColor: colors.secondary }]}>
                  <Feather name="users" size={14} color={colors.foreground} />
                  <Text style={[styles.actionText, { color: colors.foreground }]}>Contacts</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.sponsorRow}>
              <Feather name="zap" size={15} color={colors.primary} />
              <Text style={[styles.sponsorText, { color: colors.mutedForeground }]}>{sendMode === 'settlement' ? 'Agora swap · Pimlico gas sponsorship requested' : 'Pimlico gas sponsorship requested'}</Text>
            </View>
            {sendMode === 'settlement' ? <Text style={[styles.firstTimeNote, { color: colors.mutedForeground }]}>First swap may include one-time testnet access and token approval.</Text> : null}
            {error ? <Text style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
            <PrimaryButton label={sendMode === 'direct' ? 'Review transfer' : 'Review settlement'} icon="arrow-right" onPress={continueToReview} disabled={sendMode === 'settlement' && (!quote || quoteLoading || !!quoteError)} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={tokenModalOpen} transparent animationType="fade" onRequestClose={() => setTokenModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setTokenModalOpen(false)} accessibilityLabel="Close token picker" />
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Choose token</Text>
            {TRANSFER_TOKENS.map((option) => {
              const optionBalance = profile?.mode === 'mera' ? balances[option] : option === 'AUSD' ? demoBalance : 0;
              const selected = token === option;
              return (
                <Pressable key={option} onPress={() => chooseToken(option)} style={[styles.tokenRow, { backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <View style={[styles.tokenBadge, { backgroundColor: selected ? colors.background : colors.secondary }]}>
                    <Text style={[styles.tokenBadgeText, { color: colors.foreground }]}>{option.slice(0, 1)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.tokenPickerTitle, { color: colors.foreground }]}>{option}</Text>
                    <Text style={[styles.tokenPickerSub, { color: colors.mutedForeground }]}>{WALLET_TOKENS[option].name} · {WALLET_TOKENS[option].decimals} decimals</Text>
                  </View>
                  <Text style={[styles.tokenPickerSub, { color: colors.foreground }]}>
                    {optionBalance === undefined ? '…' : optionBalance === null ? '—' : money(optionBalance)}
                  </Text>
                  {selected ? <Feather name="check" size={17} color={colors.primary} /> : null}
                </Pressable>
              );
            })}
            <Text style={[styles.tokenPickerSub, { color: colors.mutedForeground }]}>Custom Home-tracked assets stay display-only until custom sends are verified.</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={contactsOpen} transparent animationType="fade" onRequestClose={() => setContactsOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setContactsOpen(false)} accessibilityLabel="Close contacts" />
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Choose contact</Text>
            {contactsLoading ? <Text style={[styles.tokenPickerSub, { color: colors.mutedForeground }]}>Unlocking encrypted contacts…</Text> : null}
            {contactsError ? <Text style={[styles.fieldError, { color: colors.destructive }]}>{contactsError}</Text> : null}
            {!contactsLoading && !contactsError && contacts.length === 0 ? (
              <Text style={[styles.tokenPickerSub, { color: colors.mutedForeground }]}>No contacts yet. Save one in Contacts first.</Text>
            ) : null}
            {contacts.map((contact) => (
              <Pressable
                key={contact.id}
                onPress={() => { setRecipient(contact.address); setRecipientName(contact.name); setContactsOpen(false); }}
                style={[styles.tokenRow, { backgroundColor: 'transparent' }]}
              >
                <View style={[styles.tokenBadge, { backgroundColor: colors.secondary }]}>
                  <Text style={[styles.tokenBadgeText, { color: colors.foreground }]}>{contact.name.slice(0, 1).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tokenPickerTitle, { color: colors.foreground }]}>{contact.name}</Text>
                  <Text numberOfLines={1} style={[styles.tokenPickerSub, { color: colors.mutedForeground }]}>{contact.address}</Text>
                </View>
                <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
              </Pressable>
            ))}
            <PrimaryButton label="Manage contacts" secondary onPress={() => { setContactsOpen(false); router.push('/contacts'); }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  keyboardLayer: { flex: 1, justifyContent: 'flex-end' },
  sheet: { maxHeight: '82%', borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden' },
  content: { paddingHorizontal: 22, paddingTop: 9, gap: 14, paddingBottom: 8 },
  modeSwitch: { borderRadius: 14, padding: 4, flexDirection: 'row', gap: 4 },
  modeOption: { flex: 1, minHeight: 39, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  modeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  tokenPicker: { borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  tokenBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tokenBadgeText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  tokenPickerTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  tokenPickerSub: { fontSize: 11, marginTop: 2, fontFamily: 'Inter_400Regular' },
  settleRow: { borderRadius: 16, padding: 12, gap: 10 },
  settleLabel: { fontSize: 10, letterSpacing: 0.7, fontFamily: 'Inter_600SemiBold' },
  settleOptions: { flexDirection: 'row', gap: 8 },
  tokenOption: { flex: 1, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  handleRow: { alignItems: 'center', height: 12 },
  handle: { width: 38, height: 4, borderRadius: 3 },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 22, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
  subtitle: { marginTop: 4, fontSize: 12, fontFamily: 'Inter_400Regular' },
  close: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  amountPanel: { borderRadius: 18, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 12, gap: 8 },
  label: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_600SemiBold' },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dollar: { fontSize: 22, fontFamily: 'Inter_500Medium' },
  amountInput: { minWidth: 50, flex: 1, padding: 0, fontSize: 34, lineHeight: 42, letterSpacing: -1, fontFamily: 'Inter_600SemiBold' },
  currency: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceText: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  quickRow: { flexDirection: 'row', gap: 8, marginTop: 2 },
  quickChip: { minHeight: 32, paddingHorizontal: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  quickText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  recipientBlock: { gap: 8 },
  contactChip: { borderRadius: 14, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  contactAvatar: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  contactName: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  contactAddress: { fontSize: 11, marginTop: 1, fontFamily: 'Inter_400Regular' },
  contactClear: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  quotePanel: { borderRadius: 16, padding: 14, gap: 6 },
  quoteLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  quoteLabel: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  quoteValue: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  quoteCaption: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
  recipientInput: { minHeight: 52, borderRadius: 14, paddingHorizontal: 15, fontSize: 13, fontFamily: 'Inter_500Medium' },
  fieldError: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_500Medium' },
  recipientActions: { flexDirection: 'row', gap: 8 },
  actionChip: { flex: 1, minHeight: 38, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  actionText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  sponsorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: -4 },
  sponsorText: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  firstTimeNote: { marginTop: -10, fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
  error: { fontSize: 12, lineHeight: 17, fontFamily: 'Inter_500Medium' },
  modalOverlay: { flex: 1, justifyContent: 'center', padding: 22, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  modalCard: { borderRadius: 20, padding: 16, gap: 8, maxHeight: '70%' },
  modalTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  tokenRow: { borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
});
