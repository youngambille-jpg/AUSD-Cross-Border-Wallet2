import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { formatUnits } from 'viem';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { getTokenBalance } from '@/services/passkey';
import { simulateTokenSwap, listFactoryPairs, type SettlementQuote } from '@/services/settlement';
import { STABLECOIN_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
import { BackButton, Body, Card, Eyebrow, InlineNotice, Page, PrimaryButton, Title } from '@/components/Primitives';

const fmt = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: 6 });
const SLIPPAGE_OPTIONS = [50, 100, 200];

function applySlippage(quote: SettlementQuote, slippageBps: number) {
  if (quote.quoteMode === 'exact-input') {
    const minRaw = (BigInt(quote.amountOutRaw) * BigInt(10000 - slippageBps)) / 10000n;
    return {
      minRaw: minRaw.toString(),
      minHuman: formatUnits(minRaw, quote.outputDecimals),
    };
  }
  const inputDecimals = WALLET_TOKENS[quote.inputSymbol].decimals;
  const maxRaw = (BigInt(quote.amountInRaw) * BigInt(10000 + slippageBps)) / 10000n;
  return {
    minRaw: quote.amountOutRaw,
    minHuman: quote.amountOut,
    maxRaw: maxRaw.toString(),
    maxHuman: formatUnits(maxRaw, inputDecimals),
  };
}

export default function SwapScreen() {
  const colors = useColors();
  const { profile, balance: demoBalance } = useWallet();
  const [route, setRoute] = useState<'instant-settlement' | 'stablecoin'>('instant-settlement');
  const [inputToken, setInputToken] = useState<WalletToken>('AUSD');
  const [outputToken, setOutputToken] = useState<WalletToken>('CTK');
  const [amount, setAmount] = useState('');
  const [quoteMode, setQuoteMode] = useState<'exact-input' | 'exact-output'>('exact-input');
  const [balances, setBalances] = useState<Partial<Record<WalletToken, number | null>>>({});
  const [pickerFor, setPickerFor] = useState<'input' | 'output' | null>(null);
  const [slippageBps, setSlippageBps] = useState(100);
  const [quote, setQuote] = useState<SettlementQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [balanceError, setBalanceError] = useState('');
  const [stablePairReady, setStablePairReady] = useState<boolean | null>(null);
  const [pairsChecking, setPairsChecking] = useState(false);
  const [pairsError, setPairsError] = useState('');
  const [pairsNonce, setPairsNonce] = useState(0);

  const routeTokens: WalletToken[] = route === 'stablecoin' ? [...STABLECOIN_TOKENS] : ['AUSD', 'CTK'];
  const enteredToken = quoteMode === 'exact-input' ? inputToken : outputToken;
  const receivedToken = quoteMode === 'exact-input' ? outputToken : inputToken;
  const enteredDecimals = WALLET_TOKENS[enteredToken].decimals;
  const balance = profile?.mode === 'mera' ? balances[enteredToken] ?? null : demoBalance;

  useEffect(() => {
    if (profile?.mode !== 'mera' || !profile.address) {
      setBalances({});
      return;
    }
    let active = true;
    Promise.allSettled(routeTokens.map((t) => getTokenBalance(profile.address!, t)))
      .then((results) => {
        if (!active) return;
        const next: Partial<Record<WalletToken, number | null>> = {};
        results.forEach((result, index) => {
          next[routeTokens[index]] = result.status === 'fulfilled' ? Number(result.value) : null;
        });
        setBalances(next);
        setBalanceError(results.some((r) => r.status === 'rejected') ? 'Some balances are unavailable' : '');
      })
      .catch((caught: unknown) => { if (active) setBalanceError(caught instanceof Error ? caught.message : 'Balance unavailable'); });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputToken, outputToken, route, profile?.address, profile?.mode]);

  useEffect(() => {
    if (route !== 'stablecoin') return;
    let active = true;
    setPairsChecking(true);
    setPairsError('');
    listFactoryPairs()
      .then((pairs) => {
        if (!active) return;
        const stableAddresses = new Set(STABLECOIN_TOKENS.map((t) => WALLET_TOKENS[t].address.toLowerCase()));
        const found = pairs.some(
          (pair) => stableAddresses.has(pair.token0.address.toLowerCase()) && stableAddresses.has(pair.token1.address.toLowerCase()),
        );
        setStablePairReady(found);
      })
      .catch((caught: unknown) => {
        if (active) {
          setStablePairReady(null);
          setPairsError(caught instanceof Error ? caught.message : 'Could not list factory pairs.');
        }
      })
      .finally(() => { if (active) setPairsChecking(false); });
    return () => { active = false; };
  }, [route, pairsNonce]);

  useEffect(() => {
    setQuote(null);
    setError('');
    setLoading(false);
    const decimals = enteredDecimals;
    if (!profile?.address || profile.mode !== 'mera' || !new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`).test(amount) || Number(amount) <= 0) return;
    if (inputToken === outputToken) {
      setError('Choose two different tokens to swap.');
      return;
    }
    if (route === 'stablecoin' && !stablePairReady) return;
    let active = true;
    const timer = setTimeout(() => {
      setLoading(true);
      simulateTokenSwap(inputToken, outputToken, amount, profile.address!, quoteMode)
        .then((result) => { if (active) setQuote(result); })
        .catch((caught: unknown) => { if (active) setError(caught instanceof Error ? caught.message : 'Could not get a Monad testnet quote.'); })
        .finally(() => { if (active) setLoading(false); });
    }, 300);
    return () => { active = false; clearTimeout(timer); };
  }, [amount, enteredDecimals, inputToken, outputToken, quoteMode, route, stablePairReady, profile?.address, profile?.mode]);

  const parsed = Number(amount);
  const amountIn = quote ? Number(quote.amountIn) : quoteMode === 'exact-input' ? parsed : 0;
  const inputAmountValid = new RegExp(`^\\d+(\\.\\d{1,${enteredDecimals}})?$`).test(amount) && parsed > 0;
  const pairGateOk = route === 'stablecoin' ? stablePairReady === true : true;
  const showForm = route === 'instant-settlement' || stablePairReady === true;
  const canReview = profile?.mode === 'mera' && Boolean(profile.address && profile.signerAddress && profile.passkey) && Boolean(quote) && !loading && balance !== null && inputAmountValid && inputToken !== outputToken && pairGateOk && amountIn <= balance;
  const slippage = useMemo(() => (quote ? applySlippage(quote, slippageBps) : null), [quote, slippageBps]);

  function reviewSwap() {
    if (!profile?.address || !quote || !slippage) return;
    if (route === 'stablecoin' && !stablePairReady) return setError('No stablecoin pool is deployed on Monad testnet yet. Try Agora settlement instead.');
    if (balance === null) return setError(balanceError || `Wait for your ${enteredToken} balance to load.`);
    if (!inputAmountValid) return setError(`Enter a valid ${enteredToken} amount.`);
    if (amountIn > balance) return setError(`Available balance: ${fmt(balance)} ${enteredToken}.`);
    const quoteOutputRaw = quote.quoteMode === 'exact-input' ? slippage.minRaw : quote.amountOutRaw;
    let quoteInputRaw = quote.amountInRaw;
    if (quote.quoteMode === 'exact-output' && slippage.maxRaw) quoteInputRaw = slippage.maxRaw;
    router.push({
      pathname: '/review',
      params: {
        mode: 'token-swap', recipient: profile.address, amount: quote.amountIn, swapAmount: amount,
        inputToken, outputToken, quoteMode,
        quoteInputRaw, quoteOutput: quote.amountOut, quoteOutputRaw,
        quotedOutput: quote.amountOut, slippageBps: String(slippageBps),
        quoteCheckedAt: quote.checkedAt, pairAddress: quote.pairAddress, purchaseFeeRate: quote.purchaseFeeRate,
      },
    });
  }

  function chooseInput(next: WalletToken) {
    if (next === outputToken) setOutputToken(inputToken);
    setInputToken(next);
    setAmount(''); setError(''); setPickerFor(null);
  }

  function chooseOutput(next: WalletToken) {
    if (next === inputToken) setInputToken(outputToken);
    setOutputToken(next);
    setAmount(''); setError(''); setPickerFor(null);
  }

  function invert() {
    setInputToken(outputToken);
    setOutputToken(inputToken);
    setAmount(''); setError(''); setQuote(null);
  }

  function chooseRoute(next: 'instant-settlement' | 'stablecoin') {
    setRoute(next);
    setAmount(''); setError(''); setQuote(null);
    if (next === 'instant-settlement') {
      setInputToken('AUSD'); setOutputToken('CTK');
    } else {
      setInputToken('AUSD'); setOutputToken('USDC');
    }
  }

  function pickerOptions(forSide: 'input' | 'output') {
    if (route === 'stablecoin') return [...STABLECOIN_TOKENS];
    return forSide === 'input' ? ['AUSD' as WalletToken] : ['CTK' as WalletToken];
  }

  return (
    <Page contentStyle={styles.page}>
      <BackButton onPress={() => router.back()} />
      <View style={styles.heading}>
        <Eyebrow>AGORA INSTANT SETTLEMENT · MONAD TESTNET</Eyebrow>
        <Title>Swap tokens</Title>
        <Body>{route === 'stablecoin' ? 'Trade the live AUSD/USDC pair with slippage protection.' : 'Trade the live AUSD/CTK pair. Your passkey approves the swap on Monad testnet.'}</Body>
      </View>
      <View style={[styles.routeSwitch, { backgroundColor: colors.secondary }]}>
        <Pressable onPress={() => chooseRoute('instant-settlement')} style={[styles.routeOption, route === 'instant-settlement' && { backgroundColor: colors.background }]}><Text style={[styles.modeText, { color: route === 'instant-settlement' ? colors.foreground : colors.mutedForeground }]}>Agora settlement</Text></Pressable>
        <Pressable onPress={() => chooseRoute('stablecoin')} style={[styles.routeOption, route === 'stablecoin' && { backgroundColor: colors.background }]}><Text style={[styles.modeText, { color: route === 'stablecoin' ? colors.foreground : colors.mutedForeground }]}>Stablecoin swap</Text></Pressable>
      </View>
      {route === 'stablecoin' && (pairsChecking || stablePairReady !== true) ? (
        <Card style={[styles.pairCard, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
          <View style={[styles.pairIcon, { backgroundColor: colors.background }]}>
            <Feather name={pairsChecking ? 'loader' : 'info'} size={16} color={colors.primary} />
          </View>
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={[styles.receiverTitle, { color: colors.foreground }]}>
              {pairsChecking ? 'Checking factory pools…' : pairsError ? 'Could not list factory pools' : 'No AUSD/USDC pool yet'}
            </Text>
            <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>
              {pairsChecking
                ? 'Reading live pools from the Agora factory.'
                : pairsError || 'The factory currently lists only the AUSD/CTK test pair. Agora settlement works now; stablecoin swaps unlock when Agora deploys the pool.'}
            </Text>
          </View>
          {!pairsChecking ? <PrimaryButton label="Check again" secondary onPress={() => setPairsNonce((n) => n + 1)} /> : null}
        </Card>
      ) : null}
      {showForm ? (
      <>
      <TokenPickerButton label="FROM" value={inputToken} balance={profile?.mode === 'mera' ? balances[inputToken] : inputToken === 'AUSD' ? demoBalance : 0} onPress={() => setPickerFor('input')} colors={colors} />
      <View style={[styles.modeSwitch, { backgroundColor: colors.secondary }]}>
        <Pressable onPress={() => { setQuoteMode('exact-input'); setAmount(''); setError(''); }} style={[styles.modeOption, quoteMode === 'exact-input' && { backgroundColor: colors.background }]}>
          <Text style={[styles.modeText, { color: quoteMode === 'exact-input' ? colors.foreground : colors.mutedForeground }]}>You pay</Text>
        </Pressable>
        <Pressable onPress={() => { setQuoteMode('exact-output'); setAmount(''); setError(''); }} style={[styles.modeOption, quoteMode === 'exact-output' && { backgroundColor: colors.background }]}>
          <Text style={[styles.modeText, { color: quoteMode === 'exact-output' ? colors.foreground : colors.mutedForeground }]}>You receive</Text>
        </Pressable>
      </View>
      <Card style={styles.amountCard}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>{quoteMode === 'exact-input' ? 'YOU PAY' : 'YOU RECEIVE'}</Text>
        <View style={styles.amountRow}>
          <TextInput accessibilityLabel={`${enteredToken} amount`} value={amount} onChangeText={(value) => { setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); setError(''); }} placeholder="0" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.foreground }]} />
          <Text style={[styles.token, { color: colors.foreground }]}>{enteredToken}</Text>
        </View>
        <View style={styles.balanceRow}>
          <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>{balance === null ? balanceError || 'Loading balance…' : `Available ${fmt(balance)} ${enteredToken}`}</Text>
          {balance !== null && profile?.mode === 'mera' && quoteMode === 'exact-input' ? <Text onPress={() => setAmount(String(balance))} style={[styles.max, { color: colors.primary }]}>MAX</Text> : null}
        </View>
      </Card>
      {amount.length > 0 && !inputAmountValid ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>Enter up to {enteredDecimals} decimal places for {enteredToken}.</Text> : null}
      <Pressable accessibilityRole="button" accessibilityLabel="Swap direction" onPress={invert} style={styles.arrow}><Feather name="arrow-up" size={14} color={colors.primary} /><Feather name="arrow-down" size={14} color={colors.primary} /></Pressable>
      <TokenPickerButton label="TO" value={outputToken} balance={profile?.mode === 'mera' ? balances[outputToken] : outputToken === 'AUSD' ? demoBalance : 0} onPress={() => setPickerFor('output')} colors={colors} />
      <View style={styles.slippageRow}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>SLIPPAGE</Text>
        <View style={styles.slippageOptions}>
          {SLIPPAGE_OPTIONS.map((bps) => (
            <Pressable key={bps} onPress={() => setSlippageBps(bps)} style={[styles.slippageChip, { backgroundColor: slippageBps === bps ? colors.primary : colors.secondary }]}>
              <Text style={[styles.modeText, { color: slippageBps === bps ? colors.primaryForeground : colors.foreground }]}>{bps / 100}%</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Card style={styles.outputCard}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>{quoteMode === 'exact-input' ? 'ESTIMATED RECEIVE' : 'MAXIMUM YOU PAY'}</Text>
        <View style={styles.amountRow}>
          <Text style={[styles.output, { color: colors.foreground }]}>{loading ? '…' : quote ? fmt(Number(quoteMode === 'exact-input' ? quote.amountOut : quote.amountIn)) : '—'}</Text>
          <Text style={[styles.token, { color: colors.foreground }]}>{receivedToken}</Text>
        </View>
        {quote && slippage ? (
          <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>
            {quote.quoteMode === 'exact-input'
              ? `Min after ${slippageBps / 100}% slippage: ${fmt(Number(slippage.minHuman))} ${quote.outputSymbol} (enforced on-chain)`
              : `Max after ${slippageBps / 100}% slippage: ${fmt(Number((slippage as { maxHuman: string }).maxHuman))} ${quote.inputSymbol} (enforced on-chain)`}
          </Text>
        ) : null}
        <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>{error || (quote ? `Quote updated ${new Date(quote.checkedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} · expires in 5 min` : 'Enter an amount to request a live quote.')}</Text>
        {quote ? <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>Pair fixed price: 1 {quote.inputSymbol} ≈ {quote.fixedPriceHuman} {quote.outputSymbol} · pool holds {fmt(Number(quote.outputReserve))} {quote.outputSymbol}</Text> : null}
        {quote ? <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>Agora purchase fee: {(Number(quote.purchaseFeeRate) * 100).toLocaleString('en-US', { maximumFractionDigits: 4 })}% · included in quote</Text> : null}
      </Card>
      <Card style={styles.receiverCard}>
        <View style={[styles.receiverIcon, { backgroundColor: colors.secondary }]}><Feather name="corner-down-left" size={16} color={colors.foreground} /></View>
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={[styles.receiverTitle, { color: colors.foreground }]}>Receive in this wallet</Text>
          <Text numberOfLines={1} style={[styles.balanceText, { color: colors.mutedForeground }]}>{profile?.address ?? 'Wallet address unavailable'}</Text>
        </View>
      </Card>
      {quote && balance !== null && amountIn > balance ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>This swap needs {fmt(amountIn)} {enteredToken}, but you have {fmt(balance)} {enteredToken}.</Text> : null}
      {profile?.mode !== 'mera' ? <InlineNotice icon="info">Create a Mera passkey wallet to request and approve an on-chain swap. Demo wallets cannot submit transactions.</InlineNotice> : null}
      <InlineNotice icon={route === 'instant-settlement' ? 'zap' : 'info'}>{route === 'instant-settlement' ? 'Agora Instant Settlement uses the AUSD/CTK Monad testnet pair required for the hackathon.' : 'The stablecoin route uses a live AUSD/USDC pair when the Monad factory has liquidity for it.'}</InlineNotice>
      {error && !quote ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
      <PrimaryButton label={loading ? 'Getting quote…' : 'Review swap'} icon="arrow-right" onPress={reviewSwap} disabled={!canReview} />
      </>
      ) : null}

      <Modal visible={pickerFor !== null} transparent animationType="fade" onRequestClose={() => setPickerFor(null)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPickerFor(null)} accessibilityLabel="Close token picker" />
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>{pickerFor === 'input' ? 'Pay with' : 'Receive'}</Text>
            {pickerFor && pickerOptions(pickerFor).map((option) => {
              const optionBalance = profile?.mode === 'mera' ? balances[option] : option === 'AUSD' ? demoBalance : 0;
              return (
                <Pressable key={option} onPress={() => (pickerFor === 'input' ? chooseInput(option) : chooseOutput(option))} style={styles.modalRow}>
                  <View style={[styles.modalBadge, { backgroundColor: colors.secondary }]}>
                    <Text style={[styles.modalBadgeText, { color: colors.foreground }]}>{option.slice(0, 1)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.modalToken, { color: colors.foreground }]}>{option}</Text>
                    <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>{WALLET_TOKENS[option].name}</Text>
                  </View>
                  <Text style={[styles.modalToken, { color: colors.foreground }]}>
                    {optionBalance === undefined ? '…' : optionBalance === null ? '—' : fmt(optionBalance)}
                  </Text>
                </Pressable>
              );
            })}
            {route === 'instant-settlement' ? <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>Agora settlement is fixed to AUSD → CTK on testnet.</Text> : null}
          </View>
        </View>
      </Modal>
    </Page>
  );
}

function TokenPickerButton({ label, value, balance, onPress, colors }: { label: string; value: WalletToken; balance: number | null | undefined; onPress: () => void; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={styles.selector}>
      <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>
      <Pressable onPress={onPress} style={[styles.pickerButton, { backgroundColor: colors.secondary }]}>
        <View style={[styles.pickerBadge, { backgroundColor: colors.background }]}>
          <Text style={[styles.pickerBadgeText, { color: colors.foreground }]}>{value.slice(0, 1)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.pickerToken, { color: colors.foreground }]}>{value} · {WALLET_TOKENS[value].name}</Text>
          <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>{balance === undefined ? 'Loading…' : balance === null ? 'Balance unavailable' : `Available ${fmt(balance)}`}</Text>
        </View>
        <Feather name="chevron-down" size={18} color={colors.mutedForeground} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14, paddingTop: 8, paddingBottom: 24 },
  heading: { gap: 7, marginBottom: 3 },
  selector: { gap: 8 },
  pickerButton: { borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  pickerBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  pickerBadgeText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  pickerToken: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  routeSwitch: { flexDirection: 'row', borderRadius: 14, padding: 4, gap: 4 },
  routeOption: { flex: 1, minHeight: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 11 },
  amountCard: { gap: 12, padding: 17 },
  outputCard: { gap: 8, padding: 17 },
  modeSwitch: { flexDirection: 'row', borderRadius: 14, padding: 4, gap: 4 },
  modeOption: { flex: 1, minHeight: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 11 },
  modeText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  label: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_600SemiBold' },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  amountInput: { flex: 1, fontSize: 32, lineHeight: 40, padding: 0, fontFamily: 'Inter_600SemiBold' },
  output: { flex: 1, fontSize: 30, fontFamily: 'Inter_600SemiBold' },
  token: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceText: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
  max: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  receiverCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 13 },
  receiverIcon: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  pairCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14, borderRadius: 16 },
  pairIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  receiverTitle: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  arrow: { alignSelf: 'center', minWidth: 56, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 0, backgroundColor: '#00000010', marginVertical: -4, paddingHorizontal: 10 },
  slippageRow: { gap: 8 },
  slippageOptions: { flexDirection: 'row', gap: 8 },
  slippageChip: { minHeight: 36, paddingHorizontal: 16, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  error: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  modalOverlay: { flex: 1, justifyContent: 'center', padding: 22, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  modalCard: { borderRadius: 20, padding: 18, gap: 10 },
  modalTitle: { fontSize: 17, fontFamily: 'Inter_600SemiBold' },
  modalRow: { borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  modalBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  modalBadgeText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  modalToken: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});
