import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { getErc20Balance, getErc20TokenInfo, type Erc20TokenInfo } from '@/services/passkey';
import { formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
import { WALLET_TOKENS } from '@/services/tokens';
import { Card, Divider, Eyebrow, Page, PrimaryButton } from '@/components/Primitives';

const TRACKED_ASSETS_STORAGE_KEY = 'ausd-wallet-tracked-assets-v1';
const defaultAssets: Erc20TokenInfo[] = [WALLET_TOKENS.AUSD, WALLET_TOKENS.USDC];

const money = (amount: number) =>
  amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function WalletHome() {
  const colors = useColors();
  const { height: windowHeight } = useWindowDimensions();
  const { profile, balance, transfers } = useWallet();
  const { transfers: indexedTransfers, error: activityError, configured, refresh: refreshActivity } = useIndexedActivity(profile?.address);
  const [trackedAssets, setTrackedAssets] = useState<Erc20TokenInfo[]>([]);
  const [assetBalances, setAssetBalances] = useState<Record<string, number | null>>({});
  const [chainBalanceError, setChainBalanceError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [assetAddress, setAssetAddress] = useState('');
  const [assetError, setAssetError] = useState('');
  const [addingAsset, setAddingAsset] = useState(false);
  const [openAction, setOpenAction] = useState<'deposit' | 'swap' | null>(null);
  const [drawerOffset, setDrawerOffset] = useState(0);
  const isMeraWallet = profile?.mode === 'mera';
  const assets = useMemo(() => [
    ...defaultAssets,
    ...trackedAssets.filter((asset) => !defaultAssets.some((defaultAsset) => defaultAsset.address.toLowerCase() === asset.address.toLowerCase())),
  ], [trackedAssets]);

  useEffect(() => {
    AsyncStorage.getItem(TRACKED_ASSETS_STORAGE_KEY)
      .then((value) => {
        if (!value) return;
        const stored = JSON.parse(value) as Erc20TokenInfo[];
        if (Array.isArray(stored)) setTrackedAssets(stored);
      })
      .catch(() => setChainBalanceError('Saved assets could not be loaded.'));
  }, []);

  const refreshBalances = useCallback(async () => {
    if (!isMeraWallet || !profile?.address) return;
    const results = await Promise.allSettled(assets.map((asset) => getErc20Balance(profile.address!, asset)));
    setAssetBalances(Object.fromEntries(results.map((result, index) => [
      assets[index].address.toLowerCase(),
      result.status === 'fulfilled' ? Number(result.value) : null,
    ])));
    setChainBalanceError(results.some((result) => result.status === 'rejected') ? 'Some balances are unavailable' : '');
  }, [assets, isMeraWallet, profile?.address]);

  useEffect(() => {
    void refreshBalances();
  }, [refreshBalances]);

  async function refreshHome() {
    setRefreshing(true);
    refreshActivity();
    await refreshBalances();
    setRefreshing(false);
  }

  async function addAsset() {
    setAssetError('');
    setAddingAsset(true);
    try {
      const asset = await getErc20TokenInfo(assetAddress.trim());
      if (assets.some((item) => item.address.toLowerCase() === asset.address.toLowerCase())) {
        throw new Error(`${asset.symbol} is already in your assets.`);
      }
      const next = [...trackedAssets, asset];
      await AsyncStorage.setItem(TRACKED_ASSETS_STORAGE_KEY, JSON.stringify(next));
      setTrackedAssets(next);
      setAssetAddress('');
      setAssetModalOpen(false);
    } catch (caught) {
      setAssetError(caught instanceof Error ? caught.message : 'This token could not be added.');
    } finally {
      setAddingAsset(false);
    }
  }
  const indexedHashes = new Set(indexedTransfers.map((item) => item.transactionHash.toLowerCase()));
  const recent = configured && !activityError
    ? [
        ...indexedTransfers.map((item) => ({ indexed: formatIndexedTransfer(item, profile?.address ?? '') })),
        ...transfers
          .filter((item) => !item.transactionHash || !indexedHashes.has(item.transactionHash.toLowerCase()))
          .map((item) => ({ local: item })),
      ].sort((left, right) => {
        const leftDate = 'indexed' in left ? left.indexed.createdAt : left.local.createdAt;
        const rightDate = 'indexed' in right ? right.indexed.createdAt : right.local.createdAt;
        return new Date(rightDate).getTime() - new Date(leftDate).getTime();
      }).slice(0, 3)
    : transfers.slice(0, 3).map((item) => ({ local: item }));
  const ausd = isMeraWallet ? assetBalances[WALLET_TOKENS.AUSD.address.toLowerCase()] ?? null : balance;
  const usdc = isMeraWallet ? assetBalances[WALLET_TOKENS.USDC.address.toLowerCase()] ?? null : 0;
  const totalBalance = ausd === null || usdc === null ? null : ausd + usdc;
  const drawerPan = PanResponder.create({
    onMoveShouldSetPanResponder: (_event, gesture) => gesture.dy > 5,
    onPanResponderMove: (_event, gesture) => setDrawerOffset(Math.max(0, gesture.dy)),
    onPanResponderRelease: (_event, gesture) => {
      if (gesture.dy > 90 || gesture.vy > 0.8) setOpenAction(null);
      setDrawerOffset(0);
    },
  });

  return (
    <Page contentStyle={styles.page} refreshing={refreshing} onRefresh={() => { void refreshHome(); }}>
      <View style={styles.header}>
        <View>
          <Eyebrow>MONAD WALLET</Eyebrow>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>Your money</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open profile and username settings"
          onPress={() => router.push('/(tabs)/profile')}
          style={[styles.profileButton, { backgroundColor: colors.secondary }]}
        >
          <Feather name="user" size={19} color={colors.foreground} />
        </Pressable>
      </View>

      <Card style={styles.balanceCard}>
        <View style={styles.balanceTop}>
          <Text style={[styles.balanceLabel, { color: colors.mutedForeground }]}>TOTAL BALANCE</Text>
          <View style={[styles.networkPill, { backgroundColor: colors.secondary }]}>
            <View style={[styles.balanceDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.networkText, { color: colors.foreground }]}>{isMeraWallet ? 'TESTNET' : 'DEMO'}</Text>
          </View>
        </View>
        <Text style={[styles.balanceAmount, { color: colors.foreground }]}>${totalBalance === null ? '—' : money(totalBalance)}</Text>
        <Text style={[styles.balanceFoot, { color: colors.mutedForeground }]}>
          {chainBalanceError || (isMeraWallet ? 'AUSD + USDC on Monad' : 'Demo balance · AUSD')}
        </Text>
      </Card>

      <View style={styles.quickActions}>
        <QuickAction
          icon="download"
          label="Receive"
          onPress={() => { setDrawerOffset(0); setOpenAction('deposit'); }}
        />
        <QuickAction
          icon="send"
          label="Transfer"
          onPress={() => router.push('/send')}
          primary
        />
        <QuickAction
          icon="repeat"
          label="Swap"
          onPress={() => { setDrawerOffset(0); setOpenAction('swap'); }}
        />
      </View>

      <Modal
        visible={openAction !== null}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setOpenAction(null)}
      >
        <View style={styles.drawerOverlay}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close action drawer" style={styles.drawerBackdrop} onPress={() => setOpenAction(null)} />
          <View style={[styles.actionDrawer, { height: windowHeight * 0.75, backgroundColor: colors.background, transform: [{ translateY: drawerOffset }] }]}>
            <View {...drawerPan.panHandlers} style={styles.drawerHandleArea}>
              <View style={[styles.drawerHandle, { backgroundColor: colors.border }]} />
            </View>
            <View style={styles.drawerHeading}>
              <View>
                <Eyebrow>{openAction === 'deposit' ? 'RECEIVE' : 'MONAD TESTNET'}</Eyebrow>
                <Text style={[styles.drawerTitle, { color: colors.foreground }]}>{openAction === 'deposit' ? 'Receive money' : 'Swap tokens'}</Text>
                <Text style={[styles.drawerSubtitle, { color: colors.mutedForeground }]}>
                  {openAction === 'deposit' ? 'Share your Monad wallet address or bridge funds from another network.' : 'Swap AUSD to CTK on Monad testnet.'}
                </Text>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel="Close action drawer" onPress={() => setOpenAction(null)} style={[styles.drawerClose, { backgroundColor: colors.secondary }]}>
                <Feather name="x" size={19} color={colors.foreground} />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.drawerBody}>
              {openAction === 'deposit' ? (
                <>
                  <View style={[styles.swapNotice, { backgroundColor: colors.secondary }]}>
                    <Feather name="info" size={16} color={colors.primary} />
                    <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>Receive directly to your Monad address, or bridge from another supported network with Aurora Intents.</Text>
                  </View>
                  <PrimaryButton label="Receive to wallet address" icon="copy" onPress={() => { setOpenAction(null); router.push('/receive'); }} />
                  <PrimaryButton label="Deposit with Aurora Intents" icon="repeat" secondary onPress={() => { setOpenAction(null); router.push('/aurora-deposit'); }} />
                </>
              ) : (
                <>
                  <View style={[styles.swapNotice, { backgroundColor: colors.secondary }]}>
                    <Feather name="info" size={16} color={colors.primary} />
                    <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>AUSD → CTK on Monad testnet via Agora. CTK is a test token, not a stablecoin or fiat payout.</Text>
                  </View>
                  <PrimaryButton label="Get a swap quote" icon="arrow-right" onPress={() => { setOpenAction(null); router.push('/swap'); }} />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.sectionHead}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Savings goals</Text>
        <Pressable onPress={() => router.push('/savings-goals')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Start a savings goal"
        onPress={() => router.push('/savings-goals')}
        style={({ pressed }) => [styles.goalCard, { borderColor: colors.border, backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 }]}
      >
        <View style={[styles.goalIcon, { backgroundColor: colors.secondary }]}>
          <Feather name="target" size={19} color={colors.foreground} />
        </View>
        <View style={styles.goalCopy}>
          <Text style={[styles.goalTitle, { color: colors.foreground }]}>Create a savings goal</Text>
          <Text style={[styles.goalSubtitle, { color: colors.mutedForeground }]}>Plan privately with your Mera passkey</Text>
        </View>
        <Feather name="plus-circle" size={20} color={colors.primary} />
      </Pressable>

      <View style={styles.sectionHead}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Assets</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Add an asset" onPress={() => { setAssetError(''); setAssetModalOpen(true); }}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>Add asset</Text>
        </Pressable>
      </View>
      <Card style={styles.assetCard}>
        {assets.map((asset, index) => (
          <React.Fragment key={asset.address}>
            {index > 0 ? <Divider /> : null}
            <AssetRow symbol={asset.symbol.slice(0, 1)} name={asset.name} ticker={asset.symbol} amount={isMeraWallet ? assetBalances[asset.address.toLowerCase()] ?? null : asset.symbol === 'AUSD' ? balance : 0} />
          </React.Fragment>
        ))}
      </Card>

      <Modal visible={assetModalOpen} transparent animationType="fade" onRequestClose={() => setAssetModalOpen(false)}>
        <View style={styles.assetModalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setAssetModalOpen(false)} accessibilityLabel="Close add asset" />
          <View style={[styles.assetModal, { backgroundColor: colors.background }]}>
            <Text style={[styles.assetModalTitle, { color: colors.foreground }]}>Add asset</Text>
            <Text style={[styles.assetModalCopy, { color: colors.mutedForeground }]}>Enter an ERC-20 contract address on Monad testnet. Assets added here are tracked on this device.</Text>
            <TextInput
              accessibilityLabel="Token contract address"
              value={assetAddress}
              onChangeText={setAssetAddress}
              placeholder="0x…"
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor={colors.primary}
              style={[styles.assetInput, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.secondary }]}
            />
            {assetError ? <Text style={[styles.assetError, { color: colors.destructive }]}>{assetError}</Text> : null}
            <View style={styles.assetModalActions}>
              <PrimaryButton label="Cancel" secondary onPress={() => setAssetModalOpen(false)} />
              <PrimaryButton label="Add asset" icon="plus" loading={addingAsset} onPress={() => { void addAsset(); }} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.sectionHead}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent activity</Text>
        <Pressable onPress={() => router.push('/(tabs)/activity')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
        </Pressable>
      </View>
      <Card style={styles.activityCard}>
        {recent.length ? (
          recent.map((entry, index) => {
            const indexed = 'indexed' in entry ? entry.indexed : undefined;
            const transfer = 'local' in entry ? entry.local : undefined;
            const title = indexed
              ? `${indexed.token} ${indexed.outgoing ? 'sent' : 'received'}`
              : transfer?.recipient ?? 'Token movement';
            const amount = indexed
              ? `${indexed.outgoing ? '−' : '+'}${money(indexed.amount)} ${indexed.token}`
              : `−${money(transfer?.amount ?? 0)} AUSD`;
            const date = indexed ? indexed.createdAt : transfer?.createdAt;
            const confirmed = indexed ? 'Confirmed on-chain' : transfer?.transactionHash ? 'Confirmed on-chain' : 'Saved on this device';
            return (
            <React.Fragment key={indexed?.id ?? transfer?.id ?? index}>
              {index > 0 ? <Divider /> : null}
              <View style={styles.activityRow}>
                <View style={[styles.activityIcon, { backgroundColor: colors.secondary }]}>
                  <Feather name={indexed && !indexed.outgoing ? 'arrow-down-left' : 'arrow-up-right'} size={16} color={colors.foreground} />
                </View>
                <View style={styles.activityInfo}>
                  <Text numberOfLines={1} style={[styles.activityName, { color: colors.foreground }]}>
                    {title}
                  </Text>
                  <Text style={[styles.activityMeta, { color: colors.mutedForeground }]}>
                    {date ? new Date(date).toLocaleDateString() : 'Date unavailable'} · {confirmed}
                  </Text>
                </View>
                <Text style={[styles.activityAmount, { color: colors.foreground }]}>
                  {amount}
                </Text>
              </View>
            </React.Fragment>
            );
          })
        ) : (
          <View style={styles.emptyActivity}>
            <Feather name="clock" size={18} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nothing sent yet</Text>
            <Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>
              Your transfers will appear here.
            </Text>
          </View>
        )}
      </Card>

    </Page>
  );
}

function AssetRow({ symbol, name, ticker, amount }: { symbol: string; name: string; ticker: string; amount: number | null }) {
  const colors = useColors();
  return (
    <View style={styles.assetRow}>
      <View style={[styles.assetIcon, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.assetSymbol, { color: colors.foreground }]}>{symbol}</Text>
      </View>
      <View style={styles.assetInfo}>
        <Text style={[styles.assetName, { color: colors.foreground }]}>{name}</Text>
        <Text style={[styles.assetTicker, { color: colors.mutedForeground }]}>{ticker}</Text>
      </View>
      <View style={styles.assetValue}>
        <Text style={[styles.assetAmount, { color: colors.foreground }]}>{amount === null ? '—' : money(amount)}</Text>
        <Text style={[styles.assetUsd, { color: colors.mutedForeground }]}>{ticker === 'AUSD' || ticker === 'USDC' ? `$${amount === null ? '—' : money(amount)}` : ticker}</Text>
      </View>
    </View>
  );
}

function QuickAction({
  icon,
  label,
  onPress,
  primary = false,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  onPress: () => void;
  primary?: boolean;
}) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickAction, { opacity: pressed ? 0.6 : 1 }]}>
      <View style={[styles.quickIcon, { backgroundColor: primary ? colors.primary : colors.secondary }]}>
        <Feather
          name={icon}
          size={19}
          color={primary ? colors.primaryForeground : colors.foreground}
        />
      </View>
      <Text style={[styles.quickLabel, { color: colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { gap: 17, paddingTop: 12, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pageTitle: { fontSize: 25, lineHeight: 32, letterSpacing: -0.8, fontFamily: 'Inter_600SemiBold', marginTop: 3 },
  profileButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  balanceCard: { minHeight: 142, justifyContent: 'space-between', padding: 18 },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_600SemiBold' },
  networkPill: { height: 25, borderRadius: 13, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9 },
  balanceDot: { width: 6, height: 6, borderRadius: 3 },
  networkText: { fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_600SemiBold' },
  balanceAmount: { fontSize: 36, lineHeight: 44, letterSpacing: -1.5, fontFamily: 'Inter_600SemiBold' },
  balanceFoot: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  quickActions: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 5, paddingTop: 1 },
  quickAction: { alignItems: 'center', gap: 7, minWidth: 78 },
  quickIcon: { width: 49, height: 49, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  drawerOverlay: { flex: 1, justifyContent: 'flex-end' },
  drawerBackdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  actionDrawer: { borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 22, paddingBottom: 28, overflow: 'hidden' },
  drawerHandleArea: { height: 38, alignItems: 'center', justifyContent: 'center' },
  drawerHandle: { width: 38, height: 4, borderRadius: 3 },
  drawerHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  drawerTitle: { fontSize: 25, lineHeight: 32, letterSpacing: -0.6, fontFamily: 'Inter_600SemiBold', marginTop: 3 },
  drawerSubtitle: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 3 },
  drawerClose: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  drawerBody: { gap: 14, paddingBottom: 16 },
  actionMethodCopy: { fontSize: 11, marginTop: 4, fontFamily: 'Inter_400Regular', lineHeight: 16 },
  swapNotice: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderRadius: 14, padding: 14, marginTop: 6 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 },
  sectionTitle: { fontSize: 17, letterSpacing: -0.35, fontFamily: 'Inter_600SemiBold' },
  seeAll: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  goalCard: { minHeight: 74, borderWidth: 1, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  goalIcon: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  goalCopy: { flex: 1, gap: 3 },
  goalTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  goalSubtitle: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  assetCard: { paddingHorizontal: 14, paddingVertical: 3, gap: 0 },
  assetRow: { minHeight: 65, flexDirection: 'row', alignItems: 'center', gap: 11 },
  assetIcon: { width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  assetSymbol: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  assetInfo: { flex: 1, gap: 3 },
  assetName: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  assetTicker: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  assetValue: { alignItems: 'flex-end', gap: 3 },
  assetAmount: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  assetUsd: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  activityCard: { paddingHorizontal: 14, paddingVertical: 5, gap: 0 },
  activityRow: { minHeight: 65, flexDirection: 'row', alignItems: 'center', gap: 10 },
  activityIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activityInfo: { flex: 1, gap: 3 },
  activityName: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  activityMeta: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  activityAmount: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  emptyActivity: { alignItems: 'center', paddingVertical: 21, gap: 6 },
  emptyTitle: { marginTop: 3, fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  emptyCopy: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  assetModalOverlay: { flex: 1, justifyContent: 'center', padding: 22, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  assetModal: { borderRadius: 20, padding: 20, gap: 13 },
  assetModalTitle: { fontSize: 21, fontFamily: 'Inter_600SemiBold' },
  assetModalCopy: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
  assetInput: { minHeight: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, fontSize: 13, fontFamily: 'Inter_400Regular' },
  assetError: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
  assetModalActions: { flexDirection: 'row', gap: 10 },
});
