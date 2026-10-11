import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { isAddress } from 'viem';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { MONAD_TESTNET } from '@/services/settlement';
import { AuroraAsset, AuroraQuote, AuroraTransaction, getAuroraApiKeyConfigured, getAuroraAssets, getAuroraDepositStatus, requestAuroraDepositQuote } from '@/services/aurora-intents';
import { BackButton, Card, InlineNotice, Page, PrimaryButton } from '@/components/Primitives';

const EVM_ORIGINS = new Set(['eth', 'ethereum', 'aurora', 'avax', 'avalanche', 'base', 'bera', 'bsc', 'gnosis', 'arbitrum', 'arb', 'op', 'optimism', 'pol', 'polygon', 'scroll', 'xlayer', 'monad']);

const CHAIN_NAMES: Record<string, string> = { eth: 'Ethereum', arb: 'Arbitrum', op: 'Optimism', pol: 'Polygon', avax: 'Avalanche', bsc: 'BNB Chain', gnosis: 'Gnosis' };
const ACTIVE_DEPOSIT_STORAGE_KEY = 'ausd-wallet-active-aurora-deposit-v1';
const chainName = (chain: string) => CHAIN_NAMES[chain.toLowerCase()] ?? chain.charAt(0).toUpperCase() + chain.slice(1);
type DepositStep = 'form' | 'review' | 'instructions' | 'tracking';
interface ActiveDeposit {
  quote: AuroraQuote;
  sourceAsset: AuroraAsset;
  amount: string;
  refundAddress: string;
}
const formatUnits = (raw: string | undefined, decimals: number) => {
  if (!raw) return '—';
  const integer = BigInt(raw);
  const scale = 10n ** BigInt(decimals);
  const whole = integer / scale;
  const fraction = (integer % scale).toString().padStart(decimals, '0').replace(/0+$/, '');
  return fraction ? `${whole.toLocaleString('en-US')}.${fraction}` : whole.toLocaleString('en-US');
};

export default function AuroraDepositScreen() {
  const colors = useColors();
  const { profile } = useWallet();
  const [assets, setAssets] = useState<AuroraAsset[]>([]);
  const [assetLoading, setAssetLoading] = useState(true);
  const [assetError, setAssetError] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [selectedChain, setSelectedChain] = useState('');
  const [amount, setAmount] = useState('');
  const [refundAddress, setRefundAddress] = useState('');
  const [quote, setQuote] = useState<AuroraQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<AuroraTransaction | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState('');
  const [step, setStep] = useState<DepositStep>('form');
  const [showRefundAddress, setShowRefundAddress] = useState(false);
  const [resumedDeposit, setResumedDeposit] = useState<ActiveDeposit | null>(null);

  const loadAssets = useCallback(async () => {
    setAssetLoading(true);
    setAssetError('');
    try {
      const supported = await getAuroraAssets();
      setAssets(supported);
      const current = supported.find((asset) => asset.blockchain.toLowerCase() === 'monad' &&
        asset.symbol.toUpperCase() === 'AUSD' &&
        asset.contractAddress?.toLowerCase() === MONAD_TESTNET.ausdAddress.toLowerCase());
      if (!current) throw new Error('Aurora does not currently list this wallet’s Monad AUSD token as a destination asset.');
      const source = supported.find((asset) => EVM_ORIGINS.has(asset.blockchain.toLowerCase()) && asset.blockchain.toLowerCase() !== 'monad');
      setSelectedAssetId((previous) => previous || source?.assetId || '');
      setSelectedChain((previous) => previous || source?.blockchain || '');
    } catch (caught) {
      setAssetError(caught instanceof Error ? caught.message : 'Could not load Aurora supported tokens.');
    } finally {
      setAssetLoading(false);
    }
  }, []);

  useEffect(() => { void loadAssets(); }, [loadAssets]);
  useEffect(() => { if (profile?.address) setRefundAddress(profile.address); }, [profile?.address]);
  useEffect(() => {
    AsyncStorage.getItem(ACTIVE_DEPOSIT_STORAGE_KEY)
      .then((value) => {
        if (!value) return;
        const stored = JSON.parse(value) as ActiveDeposit;
        if (stored?.quote?.quote?.depositAddress && stored.sourceAsset?.assetId) {
          setResumedDeposit(stored);
        }
      })
      .catch(() => undefined);
  }, []);

  const destination = useMemo(() => assets.find((asset) => asset.blockchain.toLowerCase() === 'monad' &&
    asset.symbol.toUpperCase() === 'AUSD' &&
    asset.contractAddress?.toLowerCase() === MONAD_TESTNET.ausdAddress.toLowerCase()), [assets]);
  const origins = useMemo(() => assets
    .filter((asset) => EVM_ORIGINS.has(asset.blockchain.toLowerCase()) && asset.blockchain.toLowerCase() !== 'monad')
    .sort((left, right) => chainName(left.blockchain).localeCompare(chainName(right.blockchain)) || left.symbol.localeCompare(right.symbol)), [assets]);
  const sourceChains = useMemo(() => [...new Set(origins.map((asset) => asset.blockchain))], [origins]);
  const visibleOrigins = useMemo(() => origins.filter((asset) => !selectedChain || asset.blockchain === selectedChain), [origins, selectedChain]);
  const selectedAsset = origins.find((asset) => asset.assetId === selectedAssetId);
  const amountValid = Boolean(selectedAsset && /^\d+(\.\d+)?$/.test(amount) && Number(amount) > 0 && (amount.split('.')[1]?.length ?? 0) <= selectedAsset.decimals);

  async function createQuote() {
    setQuoteError('');
    setStatus(null);
    if (!profile?.address || profile.mode !== 'mera') return setQuoteError('Set up a Mera passkey wallet before creating a cross-chain deposit.');
    if (!selectedAsset || !destination) return setQuoteError('A supported source token and Monad AUSD destination are required.');
    if (!amountValid) return setQuoteError(`Enter an amount greater than zero with up to ${selectedAsset.decimals} decimals.`);
    if (!isAddress(refundAddress.trim(), { strict: false })) return setQuoteError('Enter a valid EVM address for refunds on the source network.');
    setQuoteLoading(true);
    try {
      const result = await requestAuroraDepositQuote({ sourceAsset: selectedAsset, destinationAsset: destination, amount, recipient: profile.address, refundTo: refundAddress.trim() });
      setQuote(result);
      setStep('review');
    } catch (caught) {
      setQuoteError(caught instanceof Error ? caught.message : 'Could not create an Aurora deposit quote.');
    } finally {
      setQuoteLoading(false);
    }
  }

  async function copyDepositAddress() {
    if (!quote?.quote.depositAddress) return;
    await Clipboard.setStringAsync(quote.quote.depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function checkStatus() {
    if (!quote || !profile?.address) return;
    setStatusLoading(true);
    setStatusError('');
    try {
      setStatus(await getAuroraDepositStatus(profile.address, quote.quote.depositAddress));
    } catch (caught) {
      setStatusError(caught instanceof Error ? caught.message : 'Could not retrieve deposit status.');
    } finally {
      setStatusLoading(false);
    }
  }

  async function beginTracking() {
    if (!quote || !selectedAsset) return;
    const active: ActiveDeposit = { quote, sourceAsset: selectedAsset, amount, refundAddress };
    await AsyncStorage.setItem(ACTIVE_DEPOSIT_STORAGE_KEY, JSON.stringify(active));
    setResumedDeposit(active);
    setStep('tracking');
    void checkStatus();
  }

  function resumeTracking() {
    if (!resumedDeposit) return;
    setQuote(resumedDeposit.quote);
    setSelectedAssetId(resumedDeposit.sourceAsset.assetId);
    setSelectedChain(resumedDeposit.sourceAsset.blockchain);
    setAmount(resumedDeposit.amount);
    setRefundAddress(resumedDeposit.refundAddress);
    setStep('tracking');
  }

  useEffect(() => {
    if (step !== 'tracking' || !quote || !profile?.address || ['SUCCESS', 'REFUNDED', 'FAILED'].includes(status?.status ?? '')) return;
    void checkStatus();
    const timer = setInterval(() => { void checkStatus(); }, 12_000);
    return () => clearInterval(timer);
  }, [profile?.address, quote?.quote.depositAddress, status?.status, step]);

  const statusDescription = status ? ({
    KNOWN_DEPOSIT_TX: 'Deposit transaction detected; waiting for source-chain confirmation.',
    PENDING_DEPOSIT: 'Waiting for your deposit to arrive.',
    INCOMPLETE_DEPOSIT: 'The received amount is below the quoted amount. Check Aurora status before sending more.',
    PROCESSING: 'Deposit received. Aurora is processing the route.',
    SUCCESS: 'AUSD was delivered to your Monad wallet.',
    REFUNDED: 'The deposit was refunded to the refund address.',
    FAILED: 'The route failed. Check Aurora status and refund details.',
  } as const)[status.status] : '';

  return (
    <Page contentStyle={styles.page}>
      <BackButton onPress={() => router.back()} />
      <View style={styles.heading}>
        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>AURORA INTENTS</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{step === 'form' ? 'Deposit to AUSD' : step === 'review' ? 'Review your quote' : step === 'instructions' ? 'Send your deposit' : 'Track your deposit'}</Text>
      </View>

      {profile?.mode !== 'mera' ? <InlineNotice icon="info">Set up a Mera wallet to receive AUSD on Monad.</InlineNotice> : null}
      {!getAuroraApiKeyConfigured() ? (
        <InlineNotice icon="alert-circle">Aurora Intents is not configured yet. Add EXPO_PUBLIC_AURORA_INTENTS_API_KEY from Aurora Intents Studio, then restart or rebuild the app.</InlineNotice>
      ) : null}

      {step === 'form' ? <>
        {resumedDeposit ? <Pressable onPress={resumeTracking} style={[styles.resumeCard, { backgroundColor: colors.secondary }]}><Feather name="clock" size={16} color={colors.primary} /><View style={{ flex: 1 }}><Text style={[styles.resumeTitle, { color: colors.foreground }]}>Resume active deposit</Text><Text style={[styles.help, { color: colors.mutedForeground }]}>{resumedDeposit.amount} {resumedDeposit.sourceAsset.symbol} from {chainName(resumedDeposit.sourceAsset.blockchain)}</Text></View><Feather name="arrow-right" size={16} color={colors.foreground} /></Pressable> : null}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>From</Text>
          {assetLoading ? <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={[styles.help, { color: colors.mutedForeground }]}>Loading supported assets…</Text></View> : null}
          {assetError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{assetError}</Text> : null}
          {!assetLoading && sourceChains.length ? <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tokenList}>{sourceChains.map((chain) => <Pressable key={chain} onPress={() => { setSelectedChain(chain); const first = origins.find((asset) => asset.blockchain === chain); setSelectedAssetId(first?.assetId ?? ''); setQuote(null); }} style={[styles.chainChoice, { backgroundColor: selectedChain === chain ? colors.primary : colors.secondary }]}><Text style={[styles.tokenText, { color: selectedChain === chain ? colors.primaryForeground : colors.foreground }]}>{chainName(chain)}</Text></Pressable>)}</ScrollView> : null}
          {!assetLoading && visibleOrigins.length ? <View style={styles.assetOptions}>{visibleOrigins.map((asset) => { const active = asset.assetId === selectedAssetId; return <Pressable key={asset.assetId} onPress={() => { setSelectedAssetId(asset.assetId); setQuote(null); }} style={[styles.assetChoice, { backgroundColor: active ? colors.primary : colors.secondary }]}><Text style={[styles.tokenText, { color: active ? colors.primaryForeground : colors.foreground }]}>{asset.symbol}</Text></Pressable>; })}</View> : null}
        </View>
        <Card style={styles.amountCard}><Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT{selectedAsset ? ` · ${selectedAsset.symbol}` : ''}</Text><TextInput accessibilityLabel="Source token amount" value={amount} onChangeText={(value) => { setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); setQuote(null); }} placeholder="0.00" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.foreground }]} /></Card>
        <Card style={styles.destinationCard}><View style={styles.destinationIcon}><Feather name="arrow-down" size={16} color={colors.primary} /></View><View style={styles.destinationText}><Text style={[styles.label, { color: colors.mutedForeground }]}>TO</Text><Text style={[styles.destinationName, { color: colors.foreground }]}>Agora AUSD · Monad</Text><Text style={[styles.help, { color: colors.mutedForeground }]} numberOfLines={1}>{profile?.address ?? 'Wallet address unavailable'}</Text></View></Card>
        <PrimaryButton label="Review quote" icon="arrow-right" onPress={() => void createQuote()} loading={quoteLoading} disabled={quoteLoading || !getAuroraApiKeyConfigured() || !destination || !selectedAsset || !amountValid || profile?.mode !== 'mera'} />
        {quoteError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{quoteError}</Text> : null}
      </> : null}

      {step === 'review' && quote && selectedAsset ? <>
        <Card style={styles.quoteCard}><Text style={[styles.label, { color: colors.mutedForeground }]}>ESTIMATED RECEIVE</Text><Text style={[styles.quoteAmount, { color: colors.foreground }]}>{quote.quote.amountOutFormatted ?? '—'} AUSD</Text><View style={styles.summaryRow}><Text style={[styles.help, { color: colors.mutedForeground }]}>You send</Text><Text style={[styles.summaryValue, { color: colors.foreground }]}>{amount} {selectedAsset.symbol} · {chainName(selectedAsset.blockchain)}</Text></View><View style={styles.summaryRow}><Text style={[styles.help, { color: colors.mutedForeground }]}>Minimum receive</Text><Text style={[styles.summaryValue, { color: colors.foreground }]}>{formatUnits(quote.quote.minAmountOut, destination?.decimals ?? 6)} AUSD</Text></View>{quote.quote.timeEstimate ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Estimated processing time: {quote.quote.timeEstimate} seconds</Text> : null}</Card>
        <Pressable onPress={() => setShowRefundAddress((visible) => !visible)} style={[styles.refundToggle, { backgroundColor: colors.secondary }]}><View><Text style={[styles.summaryValue, { color: colors.foreground }]}>Refund address</Text><Text numberOfLines={1} style={[styles.help, { color: colors.mutedForeground }]}>{refundAddress}</Text></View><Feather name={showRefundAddress ? 'chevron-up' : 'chevron-down'} size={17} color={colors.foreground} /></Pressable>
        {showRefundAddress ? <TextInput accessibilityLabel="Aurora source network refund address" value={refundAddress} onChangeText={setRefundAddress} placeholder="0x…" placeholderTextColor={colors.mutedForeground} autoCapitalize="none" autoCorrect={false} style={[styles.refundInput, { color: colors.foreground, backgroundColor: colors.secondary }]} /> : null}
        <PrimaryButton label="Get deposit address" icon="arrow-right" onPress={() => setStep('instructions')} />
        <PrimaryButton label="Edit deposit" secondary onPress={() => setStep('form')} />
      </> : null}

      {step === 'instructions' && quote && selectedAsset ? <>
        <Card style={styles.instructionsCard}><Text style={[styles.instructionTitle, { color: colors.foreground }]}>Send exactly {amount} {selectedAsset.symbol}</Text><Text style={[styles.help, { color: colors.mutedForeground }]}>Use {chainName(selectedAsset.blockchain)} and this temporary deposit address.</Text><View style={[styles.qrFrame, { backgroundColor: '#fff' }]}><QRCode value={quote.quote.depositAddress} size={180} color="#111111" backgroundColor="#ffffff" quietZone={10} ecl="M" /></View><Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositAddress}</Text><PrimaryButton label={copied ? 'Deposit address copied' : 'Copy deposit address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyDepositAddress()} secondary />{quote.quote.depositMemo ? <View style={[styles.memoBox, { backgroundColor: colors.secondary }]}><Text style={[styles.label, { color: colors.mutedForeground }]}>REQUIRED MEMO</Text><Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositMemo}</Text></View> : null}{quote.quote.timeWhenInactive ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Address expires {new Date(quote.quote.timeWhenInactive).toLocaleString()}.</Text> : null}</Card>
        <InlineNotice icon="alert-circle">Only send the quoted token on the quoted network. This address is temporary.</InlineNotice>
        <PrimaryButton label="I've sent it" icon="check" onPress={() => void beginTracking()} />
        <PrimaryButton label="Back to quote" secondary onPress={() => setStep('review')} />
      </> : null}

      {step === 'tracking' && quote ? <>
        <Card style={styles.statusCard}><View style={styles.statusHeader}><View style={[styles.statusDot, { backgroundColor: status?.status === 'SUCCESS' ? colors.primary : colors.mutedForeground }]} /><Text style={[styles.statusLabel, { color: colors.foreground }]}>{status ? status.status.replaceAll('_', ' ') : 'WAITING FOR DEPOSIT'}</Text></View><Text style={[styles.statusDescription, { color: colors.foreground }]}>{status ? statusDescription : 'Send the quoted funds from your external wallet. We’ll check Aurora automatically.'}</Text><Text style={[styles.help, { color: colors.mutedForeground }]}>{amount} {selectedAsset?.symbol ?? resumedDeposit?.sourceAsset.symbol} → AUSD on Monad</Text>{status?.originChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Source transaction: {hash}</Text>)}{status?.destinationChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Monad transaction: {hash}</Text>)}{status?.refundReason ? <Text style={[styles.help, { color: colors.destructive }]}>Refund detail: {status.refundReason}</Text> : null}</Card>
        <PrimaryButton label={statusLoading ? 'Checking status…' : 'Refresh status'} icon="refresh-cw" onPress={() => void checkStatus()} loading={statusLoading} />
        {statusError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{statusError}</Text> : null}
      </> : null}
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14, paddingTop: 8, paddingBottom: 28 },
  heading: { gap: 3, marginBottom: 2 },
  eyebrow: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
  title: { fontSize: 23, lineHeight: 29, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
  section: { gap: 10 },
  sectionTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  tokenList: { gap: 8, paddingRight: 4 },
  chainChoice: { minHeight: 38, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  assetOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  assetChoice: { minHeight: 38, minWidth: 70, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  tokenText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  help: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
  error: { fontSize: 12, lineHeight: 17, fontFamily: 'Inter_500Medium' },
  loading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  amountCard: { gap: 10, padding: 16 },
  label: { fontSize: 10, letterSpacing: 0.7, fontFamily: 'Inter_600SemiBold' },
  amountInput: { fontSize: 30, lineHeight: 39, padding: 0, fontFamily: 'Inter_600SemiBold' },
  destinationCard: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 14 },
  destinationIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000010' },
  destinationText: { flex: 1, gap: 3 },
  destinationName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  refundInput: { minHeight: 48, borderRadius: 14, paddingHorizontal: 13, fontSize: 12, fontFamily: 'Inter_500Medium' },
  quoteCard: { gap: 12, padding: 16 },
  quoteAmount: { fontSize: 23, fontFamily: 'Inter_600SemiBold' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  summaryValue: { fontSize: 12, fontFamily: 'Inter_600SemiBold', flexShrink: 1, textAlign: 'right' },
  refundToggle: { minHeight: 58, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  instructionsCard: { alignItems: 'center', gap: 12, padding: 16 },
  instructionTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  qrFrame: { padding: 10, borderRadius: 12 },
  depositAddress: { alignSelf: 'stretch', fontSize: 10, lineHeight: 16, fontFamily: 'Inter_500Medium', textAlign: 'center' },
  memoBox: { alignSelf: 'stretch', gap: 6, borderRadius: 12, padding: 12 },
  statusCard: { gap: 10, padding: 16 },
  statusHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusLabel: { fontSize: 10, letterSpacing: 0.7, fontFamily: 'Inter_700Bold' },
  statusDescription: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_500Medium' },
  resumeCard: { minHeight: 64, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  resumeTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});
