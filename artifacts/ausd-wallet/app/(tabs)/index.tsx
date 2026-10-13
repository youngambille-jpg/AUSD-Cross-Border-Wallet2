import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking, Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { claimFaucetTokens, getErc20Balance, getErc20TokenInfo, type Erc20TokenInfo } from '@/services/passkey';
import { formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
import { WALLET_TOKENS } from '@/services/tokens';
import { Card, Divider, Eyebrow, Page, PrimaryButton } from '@/components/Primitives';

const TRACKED_ASSETS_STORAGE_KEY = 'ausd-wallet-tracked-assets-v1';
const HIDE_ZERO_STORAGE_KEY = 'ausd-wallet-hide-zero-v1';
const MONAD_FAUCET_URL = process.env.EXPO_PUBLIC_MONAD_FAUCET_URL?.trim() || 'https://faucet.monad.xyz';
const SPONSORSHIP_CONFIGURED = (process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL ?? '').trim().length > 0;
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
  const [hideZero, setHideZero] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [faucetError, setFaucetError] = useState('');
  const [faucetDone, setFaucetDone] = useState('');
  const [openAction, setOpenAction] = useState<'deposit' | null>(null);
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
    AsyncStorage.getItem(HIDE_ZERO_STORAGE_KEY)
      .then((value) => {
        if (value === '1') setHideZero(true);
      })
      .catch(() => undefined);
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

  async function removeAsset(address: string) {
    const next = trackedAssets.filter((item) => item.address.toLowerCase() !== address.toLowerCase());
    await AsyncStorage.setItem(TRACKED_ASSETS_STORAGE_KEY, JSON.stringify(next));
    setTrackedAssets(next);
    setAssetBalances((current) => {
      const copy = { ...current };
      delete copy[address.toLowerCase()];
      return copy;
    });
  }

  function toggleHideZero() {
    const next = !hideZero;
    setHideZero(next);
    void AsyncStorage.setItem(HIDE_ZERO_STORAGE_KEY, next ? '1' : '0');
  }

  async function claimTestTokens() {
    setFaucetError('');
    setFaucetDone('');
    if (profile?.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
      setFaucetError('Set up a Mera passkey wallet before claiming test tokens.');
      return;
    }
    setClaiming(true);
    try {
      const result = await claimFaucetTokens({
        address: profile.address,
        signerAddress: profile.signerAddress,
        credential: profile.passkey.credential,
        rpId: profile.passkey.rpId,
      });
      setFaucetDone(`${Number(result.amount).toLocaleString('en-US')} AUSD claimed. It may take a moment to appear — pull to refresh.`);
      await refreshBalances();
    } catch (caught) {
      setFaucetError(caught instanceof Error ? caught.message : 'The faucet claim did not complete.');
    } finally {
      setClaiming(false);
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
  const totalBalance = useMemo(() => {
    let total = 0;
    for (const asset of assets) {
      const amount = isMeraWallet
        ? assetBalances[asset.address.toLowerCase()]
        : asset.symbol === 'AUSD' ? balance : 0;
      if (amount === null || amount === undefined) return null;
      total += amount;
    }
    return total;
  }, [assets, assetBalances, balance, isMeraWallet]);
  const visibleAssets = useMemo(() => {
    if (!isMeraWallet || !hideZero) return assets;
    return assets.filter((asset) => {
      const amount = assetBalances[asset.address.toLowerCase()];
      return amount === undefined || amount === null || amount !== 0;
    });
  }, [assets, assetBalances, hideZero, isMeraWallet]);
  // The Agora faucet caps holdings at 100,000 AUSD — offer a claim whenever a
  // top-up could succeed, not only when the wallet is empty. Demo wallets see
  // it too; claiming prompts passkey setup.
  const showFaucet = !isMeraWallet || ausd === null || ausd < 100_000;
  const firstName = profile?.displayName?.trim().split(/\s+/)[0] ?? '';
  const hour = new Date().getHours();
  const daypart = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const greeting = firstName ? `Good ${daypart}, ${firstName}` : 'Your money';
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
        <View style={styles.headerCopy}>
          <Eyebrow>MONAD WALLET</Eyebrow>
          <Text numberOfLines={2} style={[styles.pageTitle, { color: colors.foreground }]}>{greeting}</Text>
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

      <Card style={[styles.balanceCard, { backgroundColor: colors.foreground, borderWidth: 0 }]}>
        <View style={styles.balanceTop}>
          <Text style={[styles.balanceLabel, { color: 'rgba(255,255,255,0.65)' }]}>TOTAL BALANCE</Text>
          <View style={[styles.networkPill, { backgroundColor: 'rgba(255,255,255,0.14)' }]}>
            <View style={[styles.balanceDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.networkText, { color: '#ffffff' }]}>{isMeraWallet ? 'TESTNET' : 'DEMO'}</Text>
          </View>
        </View>
        <Text style={[styles.balanceAmount, { color: '#ffffff' }]}>${totalBalance === null ? '—' : money(totalBalance)}</Text>
        <Text style={[styles.balanceFoot, { color: 'rgba(255,255,255,0.65)' }]}>
          {chainBalanceError || (isMeraWallet ? `${assets.length} token${assets.length === 1 ? '' : 's'} on Monad` : 'Balance · AUSD')}
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
              <View style={styles.drawerTitleWrap}>
                <Eyebrow>MONEY IN</Eyebrow>
                <Text style={[styles.drawerTitle, { color: colors.foreground }]}>Receive money</Text>
                <Text style={[styles.drawerSubtitle, { color: colors.mutedForeground }]}>
                  Share your Monad wallet address or bridge funds from another network.
                </Text>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel="Close action drawer" onPress={() => setOpenAction(null)} style={[styles.drawerClose, { backgroundColor: colors.secondary }]}>
                <Feather name="x" size={18} color={colors.foreground} />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.drawerBody}>
              <View style={[styles.swapNotice, { backgroundColor: colors.secondary }]}>
                <View style={[styles.noticeIcon, { backgroundColor: colors.background }]}>
                  <Feather name="info" size={15} color={colors.primary} />
                </View>
                <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>Receive directly to your Monad address, or bridge from another supported network with Aurora Intents.</Text>
              </View>
              <PrimaryButton label="Receive to wallet address" icon="copy" onPress={() => { setOpenAction(null); router.push('/receive'); }} />
              <PrimaryButton label="Deposit with Aurora Intents" icon="repeat" secondary onPress={() => { setOpenAction(null); router.push('/aurora-deposit'); }} />
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
        style={({ pressed }) => [styles.goalCard, { backgroundColor: colors.secondary, borderWidth: 0, opacity: pressed ? 0.7 : 1 }]}
      >
        <View style={[styles.goalIcon, { backgroundColor: colors.primarySoft }]}>
          <Feather name="target" size={18} color={colors.primary} />
        </View>
        <View style={styles.goalCopy}>
          <Text style={[styles.goalTitle, { color: colors.foreground }]}>Create a savings goal</Text>
          <Text style={[styles.goalSubtitle, { color: colors.mutedForeground }]}>Plan privately with your Mera passkey</Text>
        </View>
        <Feather name="plus-circle" size={20} color={colors.primary} />
      </Pressable>

      {!SPONSORSHIP_CONFIGURED ? (
        <Card style={[styles.sponsorBanner, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
          <View style={[styles.sponsorIcon, { backgroundColor: colors.background }]}>
            <Feather name="zap" size={15} color={colors.destructive} />
          </View>
          <View style={styles.sponsorCopy}>
            <Text style={[styles.sponsorTitle, { color: colors.foreground }]}>Gas sponsorship not configured</Text>
            <Text style={[styles.sponsorSub, { color: colors.mutedForeground }]}>Sends and swaps will fail until EXPO_PUBLIC_PIMLICO_BUNDLER_URL is set. Balances and activity still work.</Text>
          </View>
        </Card>
      ) : (
        <View style={styles.sponsorOk}>
          <Feather name="zap" size={13} color={colors.primary} />
          <Text style={[styles.sponsorOkText, { color: colors.mutedForeground }]}>Gas sponsored · Pimlico</Text>
        </View>
      )}

      <View style={styles.sectionHead}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Assets</Text>
        <View style={styles.assetHeadActions}>
          <Pressable accessibilityRole="button" accessibilityLabel="Toggle hiding zero balances" onPress={toggleHideZero}>
            <Text style={[styles.seeAll, { color: hideZero ? colors.foreground : colors.primary }]}>{hideZero ? 'Show zeros' : 'Hide zeros'}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Add an asset" onPress={() => { setAssetError(''); setAssetModalOpen(true); }}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>Add asset</Text>
          </Pressable>
        </View>
      </View>
      {showFaucet ? (
        <View style={styles.faucetWrap}>
          <Card style={[styles.faucetCard, { backgroundColor: colors.primarySoft, borderWidth: 0 }]}>
            <View style={[styles.sponsorIcon, { backgroundColor: colors.background }]}>
              <Feather name="droplet" size={15} color={colors.primary} />
            </View>
            <View style={styles.sponsorCopy}>
              <Text style={[styles.sponsorTitle, { color: colors.foreground }]}>Need test tokens?</Text>
              <Text style={[styles.sponsorSub, { color: colors.mutedForeground }]}>Claim 10,000 AUSD from Agora's faucet — gas sponsored, one passkey approval.</Text>
            </View>
            {SPONSORSHIP_CONFIGURED ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Claim 10,000 test AUSD"
                disabled={claiming}
                onPress={() => void claimTestTokens()}
                style={[styles.faucetButton, { backgroundColor: colors.primary, opacity: claiming ? 0.6 : 1 }]}
              >
                <Text style={[styles.faucetText, { color: colors.primaryForeground }]}>{claiming ? 'Claiming…' : 'Claim'}</Text>
                <Feather name={claiming ? 'loader' : 'droplet'} size={13} color={colors.primaryForeground} />
              </Pressable>
            ) : (
              <Pressable accessibilityRole="link" accessibilityLabel="Open Monad testnet faucet" onPress={() => void Linking.openURL(MONAD_FAUCET_URL)} style={[styles.faucetButton, { backgroundColor: colors.primary }]}>
                <Text style={[styles.faucetText, { color: colors.primaryForeground }]}>Faucet</Text>
                <Feather name="external-link" size={13} color={colors.primaryForeground} />
              </Pressable>
            )}
          </Card>
          {faucetError ? <Text accessibilityRole="alert" style={[styles.assetError, { color: colors.destructive }]}>{faucetError}</Text> : null}
          {faucetDone ? <Text style={[styles.faucetDone, { color: colors.primary }]}>{faucetDone}</Text> : null}
        </View>
      ) : null}
      <Card style={[styles.assetCard, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
        {visibleAssets.map((asset, index) => {
          const isCustom = trackedAssets.some((item) => item.address.toLowerCase() === asset.address.toLowerCase());
          return (
            <React.Fragment key={asset.address}>
              {index > 0 ? <Divider /> : null}
              <AssetRow
                symbol={asset.symbol.slice(0, 1)}
                name={asset.name}
                ticker={asset.symbol}
                amount={isMeraWallet ? assetBalances[asset.address.toLowerCase()] ?? null : asset.symbol === 'AUSD' ? balance : 0}
                custom={isCustom}
                onRemove={isCustom ? () => void removeAsset(asset.address) : undefined}
              />
            </React.Fragment>
          );
        })}
        {!visibleAssets.length ? (
          <View style={styles.emptyActivity}>
            <Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>All balances are zero. Turn off “Hide zeros” or get test tokens from the faucet.</Text>
          </View>
        ) : null}
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
              style={[styles.assetInput, { color: colors.foreground, backgroundColor: colors.secondary }]}
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
      <Card style={[styles.activityCard, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
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
                <View style={[styles.activityIcon, { backgroundColor: colors.background }]}>
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

function AssetRow({ symbol, name, ticker, amount, custom, onRemove }: { symbol: string; name: string; ticker: string; amount: number | null; custom?: boolean; onRemove?: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.assetRow}>
      <View style={[styles.assetIcon, { backgroundColor: colors.background }]}>
        <Text style={[styles.assetSymbol, { color: colors.foreground }]}>{symbol}</Text>
      </View>
      <View style={styles.assetInfo}>
        <Text style={[styles.assetName, { color: colors.foreground }]}>{name}</Text>
        <Text style={[styles.assetTicker, { color: colors.mutedForeground }]}>{ticker}{custom ? ' · custom' : ''}</Text>
      </View>
      <View style={styles.assetValue}>
        <Text style={[styles.assetAmount, { color: colors.foreground }]}>{amount === null ? '—' : money(amount)}</Text>
        <Text style={[styles.assetUsd, { color: colors.mutedForeground }]}>{ticker === 'AUSD' || ticker === 'USDC' ? `$${amount === null ? '—' : money(amount)}` : ticker}</Text>
      </View>
      {custom && onRemove ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${ticker}`} onPress={onRemove} style={styles.removeButton}>
          <Feather name="x" size={15} color={colors.mutedForeground} />
        </Pressable>
      ) : null}
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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickAction,
        { backgroundColor: primary ? colors.primary : colors.secondary, opacity: pressed ? 0.75 : 1 },
      ]}
    >
      <Feather
        name={icon}
        size={17}
        color={primary ? colors.primaryForeground : colors.foreground}
      />
      <Text style={[styles.quickLabel, { color: primary ? colors.primaryForeground : colors.foreground }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14, paddingTop: 12, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  headerCopy: { flex: 1 },
  pageTitle: { fontSize: 22, lineHeight: 28, letterSpacing: -0.6, fontFamily: 'Inter_600SemiBold', marginTop: 2 },
  profileButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  balanceCard: { minHeight: 138, justifyContent: 'space-between', padding: 16, borderRadius: 20 },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_600SemiBold' },
  networkPill: { height: 25, borderRadius: 13, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9 },
  balanceDot: { width: 6, height: 6, borderRadius: 3 },
  networkText: { fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_600SemiBold' },
  balanceAmount: { fontSize: 32, lineHeight: 38, letterSpacing: -1.2, fontFamily: 'Inter_600SemiBold' },
  balanceFoot: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  quickActions: { flexDirection: 'row', gap: 10 },
  quickAction: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 52, borderRadius: 16 },
  quickLabel: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  drawerOverlay: { flex: 1, justifyContent: 'flex-end' },
  drawerBackdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  actionDrawer: { borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 22, paddingBottom: 28, overflow: 'hidden' },
  drawerHandleArea: { height: 38, alignItems: 'center', justifyContent: 'center' },
  drawerHandle: { width: 38, height: 4, borderRadius: 3 },
  drawerHeading: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 },
  drawerTitleWrap: { flex: 1, gap: 2 },
  drawerTitle: { fontSize: 22, lineHeight: 28, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold', marginTop: 3 },
  drawerSubtitle: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 3 },
  drawerClose: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  drawerBody: { gap: 12, paddingBottom: 16 },
  noticeIcon: { width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  actionMethodCopy: { fontSize: 11, marginTop: 4, fontFamily: 'Inter_400Regular', lineHeight: 16 },
  swapNotice: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderRadius: 14, padding: 14, marginTop: 6 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  sectionTitle: { fontSize: 16, letterSpacing: -0.3, fontFamily: 'Inter_600SemiBold' },
  seeAll: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  goalCard: { minHeight: 70, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  goalIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  goalCopy: { flex: 1, gap: 3 },
  goalTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  goalSubtitle: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  assetCard: { paddingHorizontal: 14, paddingVertical: 3, gap: 0, borderRadius: 16 },
  assetRow: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: 11 },
  assetIcon: { width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  assetSymbol: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  assetInfo: { flex: 1, gap: 3 },
  assetName: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  assetTicker: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  assetValue: { alignItems: 'flex-end', gap: 3 },
  assetAmount: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  assetUsd: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  activityCard: { paddingHorizontal: 14, paddingVertical: 5, gap: 0, borderRadius: 16 },
  activityRow: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: 10 },
  activityIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activityInfo: { flex: 1, gap: 3 },
  activityName: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  activityMeta: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  activityAmount: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  emptyActivity: { alignItems: 'center', paddingVertical: 21, gap: 6 },
  emptyTitle: { marginTop: 3, fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  emptyCopy: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  assetModalOverlay: { flex: 1, justifyContent: 'center', padding: 22, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  assetModal: { borderRadius: 20, padding: 18, gap: 12 },
  assetModalTitle: { fontSize: 19, fontFamily: 'Inter_600SemiBold' },
  assetModalCopy: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
  assetInput: { minHeight: 48, borderRadius: 12, paddingHorizontal: 13, fontSize: 13, fontFamily: 'Inter_400Regular' },
  assetError: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
  assetModalActions: { flexDirection: 'row', gap: 10 },
  sponsorBanner: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14, borderRadius: 16 },
  sponsorIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sponsorCopy: { flex: 1, gap: 3 },
  sponsorTitle: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  sponsorSub: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
  sponsorOk: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: -6 },
  sponsorOkText: { fontSize: 10, fontFamily: 'Inter_500Medium' },
  assetHeadActions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  faucetCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 16 },
  faucetWrap: { gap: 8 },
  faucetDone: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_500Medium' },
  faucetButton: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 11, paddingHorizontal: 12, paddingVertical: 9 },
  faucetText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  removeButton: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});
