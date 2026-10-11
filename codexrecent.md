# Codex conversation

## User

help me analyse artifacts/ausd-wallet, i want us to fix this product small by small, first look at home tab, no way to refresh , 2 assets only allow ausd and usdc , users should be allowed to add other assets, 3. recent activity is not working i just sent 20 usdc to my waallet but it didnt show, , after we fix this we will fix send and recieve screens

## Assistant

I’ll inspect the wallet’s home tab, asset list, and activity data flow first, then make the smallest focused changes for refresh, adding assets, and showing the recent USDC transfer. I’ll keep send and receive screens out of scope.

## Activity

    $ rg --files artifacts/ausd-wallet
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Activity

    $ pwd
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Activity

    $ rg --files artifacts/ausd-wallet
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Assistant

I couldn’t inspect the wallet files because the workspace command runner failed to start (`bwrap: Unexpected capabilities but not setuid`). I haven’t changed anything.

Please restart or repair the workspace runner, then I can trace the home tab’s refresh, asset, and activity flows and make the focused fixes. I’ll leave send and receive screens for the next step.

## User

analyse

## Assistant

I’ll retry the repository inspection and trace the home tab’s UI and data sources.

## Activity

    $ rg --files artifacts/ausd-wallet
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Activity

    $ rg --files artifacts/ausd-wallet
    artifacts/ausd-wallet/app.json
    artifacts/ausd-wallet/app.config.ts
    artifacts/ausd-wallet/README.md
    artifacts/ausd-wallet/package.json
    artifacts/ausd-wallet/eas.json
    artifacts/ausd-wallet/tsconfig.json
    artifacts/ausd-wallet/metro.config.js
    artifacts/ausd-wallet/state/wallet-context.tsx
    artifacts/ausd-wallet/services/tokens.ts
    artifacts/ausd-wallet/services/shared-pockets.ts
    artifacts/ausd-wallet/services/savings-goals.ts
    artifacts/ausd-wallet/services/savings-pockets.ts
    artifacts/ausd-wallet/services/passkey.ts
    artifacts/ausd-wallet/services/contacts.ts
    artifacts/ausd-wallet/services/aurora-intents.ts
    artifacts/ausd-wallet/services/indexed-activity.ts
    artifacts/ausd-wallet/services/settlement.ts
    artifacts/ausd-wallet/services/agora.ts
    artifacts/ausd-wallet/src/polyfills.ts
    artifacts/ausd-wallet/server/templates/landing-page.html
    artifacts/ausd-wallet/server/serve.js
    artifacts/ausd-wallet/scripts/build.js
    artifacts/ausd-wallet/hooks/useColors.ts
    artifacts/ausd-wallet/constants/colors.ts
    artifacts/ausd-wallet/components/Primitives.tsx
    artifacts/ausd-wallet/components/KeyboardAwareScrollViewCompat.tsx
    artifacts/ausd-wallet/components/ErrorFallback.tsx
    artifacts/ausd-wallet/components/ErrorBoundary.tsx
    artifacts/ausd-wallet/assets/images/icon.png
    artifacts/ausd-wallet/assets/images/icon4.png
    artifacts/ausd-wallet/app/create-account.tsx
    artifacts/ausd-wallet/app/savings-goals.tsx
    artifacts/ausd-wallet/app/review.tsx
    artifacts/ausd-wallet/app/success.tsx
    artifacts/ausd-wallet/app/contacts.tsx
    artifacts/ausd-wallet/app/aurora-deposit.tsx
    artifacts/ausd-wallet/app/swap.tsx
    artifacts/ausd-wallet/app/scan.tsx
    artifacts/ausd-wallet/app/receive.tsx
    artifacts/ausd-wallet/app/index.tsx
    artifacts/ausd-wallet/app/send.tsx
    artifacts/ausd-wallet/app/_layout.tsx
    artifacts/ausd-wallet/app/+not-found.tsx
    artifacts/ausd-wallet/app/(tabs)/swap.tsx
    artifacts/ausd-wallet/app/(tabs)/settings.tsx
    artifacts/ausd-wallet/app/(tabs)/yield.tsx
    artifacts/ausd-wallet/app/(tabs)/savings.tsx
    artifacts/ausd-wallet/app/(tabs)/activity.tsx
    artifacts/ausd-wallet/app/(tabs)/send.tsx
    artifacts/ausd-wallet/app/(tabs)/_layout.tsx
    artifacts/ausd-wallet/app/(tabs)/index.tsx
    artifacts/ausd-wallet/app/(tabs)/offramp.tsx
    artifacts/ausd-wallet/app/(tabs)/onramp.tsx
    artifacts/ausd-wallet/app/(tabs)/profile.tsx
    ✓ • 0ms

## Activity

    $ sed -n '1,320p' artifacts/ausd-wallet/state/wallet-context.tsx
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import * as SecureStore from 'expo-secure-store';
    import { Platform } from 'react-native';
    import React, {
      createContext,
      useCallback,
      useContext,
      useEffect,
      useMemo,
      useState,
    } from 'react';
    import type { PasskeyCredentialMetadata } from '@category-labs/mera';
    
    const LEGACY_STORAGE_KEY = 'ausd-wallet-state-v1';
    const PROFILE_STORAGE_KEY = 'ausd-wallet-profile-v2';
    const TRANSFERS_STORAGE_KEY = 'ausd-wallet-transfers-v2';
    const INTRO_STORAGE_KEY = 'ausd-wallet-intro-complete-v1';
    const DEMO_BALANCE = 1248.5;
    
    export type WalletMode = 'demo' | 'mera';
    
    export interface WalletProfile {
      displayName: string;
      email: string;
      address?: string;
      signerAddress?: string;
      mode: WalletMode;
      passkey?: {
        credential: PasskeyCredentialMetadata;
        rpId: string;
      };
    }
    
    export interface Transfer {
      id: string;
      recipient: string;
      amount: number;
      paymentAmount?: number;
      savedAmount?: number;
      totalDebited?: number;
      savingsPocketId?: string;
      savingsGoalName?: string;
      currency: string;
      receivedAmount: number;
      createdAt: string;
      mode: WalletMode;
      contractPresent?: boolean;
      pairAddress?: string;
      quoteOutput?: string;
      quoteSymbol?: string;
      transactionHash?: string;
      sponsored?: boolean;
      settlementKind?: 'direct' | 'agora-instant-settlement' | 'savings-auto-save';
      receivedCurrency?: string;
    }
    
    interface WalletState {
      profile: WalletProfile | null;
      transfers: Transfer[];
    }
    
    interface WalletContextValue extends WalletState {
      ready: boolean;
      authenticated: boolean;
      introComplete: boolean;
      storageError: string;
      balance: number;
      completeIntro: () => Promise<void>;
      completeOnboarding: (profile: WalletProfile) => Promise<void>;
      addTransfer: (transfer: Transfer) => Promise<void>;
      unlockWallet: () => void;
      lockWallet: () => void;
      resetWallet: () => Promise<void>;
    }
    
    const WalletContext = createContext<WalletContextValue | null>(null);
    
    export function WalletProvider({ children }: { children: React.ReactNode }) {
      const [state, setState] = useState<WalletState>({ profile: null, transfers: [] });
      const [ready, setReady] = useState(false);
      const [authenticated, setAuthenticated] = useState(false);
      const [introComplete, setIntroComplete] = useState(false);
      const [storageError, setStorageError] = useState('');
    
      useEffect(() => {
        let active = true;
        async function hydrate() {
          try {
            const [legacyValue, transfersValue, profileValue, introValue] = await Promise.all([
              AsyncStorage.getItem(LEGACY_STORAGE_KEY),
              AsyncStorage.getItem(TRANSFERS_STORAGE_KEY),
              Platform.OS === 'web'
                ? AsyncStorage.getItem(PROFILE_STORAGE_KEY)
                : SecureStore.getItemAsync(PROFILE_STORAGE_KEY),
              AsyncStorage.getItem(INTRO_STORAGE_KEY),
            ]);
            const legacy = legacyValue ? JSON.parse(legacyValue) as WalletState : null;
            const legacyProfile = legacy?.profile?.mode === 'mera' ? legacy.profile : null;
            const profile = profileValue
              ? JSON.parse(profileValue) as WalletProfile
              : legacyProfile;
            const transfers = transfersValue
              ? JSON.parse(transfersValue) as Transfer[]
              : Array.isArray(legacy?.transfers) ? legacy.transfers : [];
    
            // Migrate each value first. Keep the original combined record until both
            // destination writes have succeeded so a failed migration is recoverable.
            if (!profileValue && legacyProfile) {
              const serializedProfile = JSON.stringify(legacyProfile);
              if (Platform.OS === 'web') await AsyncStorage.setItem(PROFILE_STORAGE_KEY, serializedProfile);
              else await SecureStore.setItemAsync(PROFILE_STORAGE_KEY, serializedProfile);
            }
            if (!transfersValue && legacy?.transfers) {
              await AsyncStorage.setItem(TRANSFERS_STORAGE_KEY, JSON.stringify(transfers));
            }
            if (legacyValue) await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
    
            if (!active) return;
            setState({ profile: profile?.mode === 'mera' ? profile : null, transfers });
            setIntroComplete(introValue === '1');
          } catch (caught) {
            if (!active) return;
            setState({ profile: null, transfers: [] });
            setStorageError(caught instanceof Error
              ? `Wallet data could not be opened. Your saved data was preserved. ${caught.message}`
              : 'Wallet data could not be opened. Your saved data was preserved.');
          }
        }
        void hydrate()
          .finally(() => {
            if (active) setReady(true);
          });
        return () => {
          active = false;
        };
      }, []);
    
      const persist = useCallback(async (next: WalletState) => {
        if (next.profile?.mode === 'mera') {
          const value = JSON.stringify(next.profile);
          if (Platform.OS === 'web') await AsyncStorage.setItem(PROFILE_STORAGE_KEY, value);
          else await SecureStore.setItemAsync(PROFILE_STORAGE_KEY, value);
        } else if (Platform.OS === 'web') {
          await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
        } else {
          await SecureStore.deleteItemAsync(PROFILE_STORAGE_KEY);
        }
        await AsyncStorage.setItem(TRANSFERS_STORAGE_KEY, JSON.stringify(next.transfers));
        setState(next);
      }, []);
    
      const completeIntro = useCallback(async () => {
        await AsyncStorage.setItem(INTRO_STORAGE_KEY, '1');
        setIntroComplete(true);
      }, []);
    
      const completeOnboarding = useCallback(
        async (profile: WalletProfile) => {
          if (profile.mode !== 'mera') throw new Error('A Mera passkey account is required.');
          await persist({ profile, transfers: state.transfers });
          setAuthenticated(true);
        },
        [persist, state.transfers],
      );
    
      const addTransfer = useCallback(
        async (transfer: Transfer) => {
          if (!state.profile) throw new Error('Set up a wallet before sending.');
          await persist({
            profile: state.profile,
            transfers: [transfer, ...state.transfers],
          });
        },
        [persist, state.profile, state.transfers],
      );
    
      const resetWallet = useCallback(async () => {
        if (Platform.OS === 'web') await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
        else await SecureStore.deleteItemAsync(PROFILE_STORAGE_KEY);
        await AsyncStorage.removeItem(TRANSFERS_STORAGE_KEY);
        await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
        setState({ profile: null, transfers: [] });
        setAuthenticated(false);
      }, []);
    
      const unlockWallet = useCallback(() => setAuthenticated(true), []);
      const lockWallet = useCallback(() => setAuthenticated(false), []);
    
      const value = useMemo(
        () => ({
          ...state,
          ready,
          authenticated,
          introComplete,
          storageError,
          balance: DEMO_BALANCE,
          completeIntro,
          completeOnboarding,
          addTransfer,
          unlockWallet,
          lockWallet,
          resetWallet,
        }),
        [state, ready, authenticated, introComplete, storageError, completeIntro, completeOnboarding, addTransfer, unlockWallet, lockWallet, resetWallet],
      );
    
      return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
    }
    
    export function useWallet() {
      const value = useContext(WalletContext);
      if (!value) throw new Error('useWallet must be used inside WalletProvider.');
      return value;
    }
    ✓ • 3.46s

## Activity

    $ sed -n '1,260p' 'artifacts/ausd-wallet/app/(tabs)/index.tsx'
    import React, { useEffect, useState } from 'react';
    import { Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { router } from 'expo-router';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { getAUSDBalance, getUSDCBalance } from '@/services/passkey';
    import { formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
    import { Card, Divider, Eyebrow, Page, PrimaryButton } from '@/components/Primitives';
    
    const money = (amount: number) =>
      amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    export default function WalletHome() {
      const colors = useColors();
      const { height: windowHeight } = useWindowDimensions();
      const { profile, balance, transfers } = useWallet();
      const { transfers: indexedTransfers, error: activityError, configured } = useIndexedActivity(profile?.address);
      const [chainBalance, setChainBalance] = useState<string | null>(null);
      const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
      const [chainBalanceError, setChainBalanceError] = useState('');
      const [openAction, setOpenAction] = useState<'deposit' | 'swap' | null>(null);
      const [drawerOffset, setDrawerOffset] = useState(0);
      const isMeraWallet = profile?.mode === 'mera';
    
      useEffect(() => {
        if (!isMeraWallet || !profile?.address) return;
        let active = true;
        Promise.allSettled([getAUSDBalance(profile.address), getUSDCBalance(profile.address)])
          .then(([ausdResult, usdcResult]) => {
            if (!active) return;
            if (ausdResult.status === 'fulfilled') setChainBalance(ausdResult.value);
            if (usdcResult.status === 'fulfilled') setUsdcBalance(usdcResult.value);
            setChainBalanceError(ausdResult.status === 'rejected' || usdcResult.status === 'rejected'
              ? 'Some balances are unavailable'
              : '');
          });
        return () => { active = false; };
      }, [isMeraWallet, profile?.address]);
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
      const ausd = isMeraWallet ? (chainBalance === null ? null : Number(chainBalance)) : balance;
      const usdc = isMeraWallet ? (usdcBalance === null ? null : Number(usdcBalance)) : 0;
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
        <Page contentStyle={styles.page}>
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
              label="Deposit"
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
                    <Eyebrow>{openAction === 'deposit' ? 'MONEY IN' : 'MONAD TESTNET'}</Eyebrow>
                    <Text style={[styles.drawerTitle, { color: colors.foreground }]}>{openAction === 'deposit' ? 'Add money' : 'Swap tokens'}</Text>
                    <Text style={[styles.drawerSubtitle, { color: colors.mutedForeground }]}>
                      {openAction === 'deposit' ? 'Get AUSD into your wallet.' : 'Swap AUSD to CTK on Monad testnet.'}
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
                        <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>Choose a direct Monad deposit address or bridge from another supported network with Aurora Intents.</Text>
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
          </View>
          <Card style={styles.assetCard}>
            <AssetRow symbol="A" name="Agora AUSD" amount={ausd} />
            <Divider />
            <AssetRow symbol="$" name="USD Coin" amount={usdc} />
          </Card>
    
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
    
    function AssetRow({ symbol, name, amount }: { symbol: string; name: string; amount: number | null }) {
      const colors = useColors();
      return (
        <View style={styles.assetRow}>
          <View style={[styles.assetIcon, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.assetSymbol, { color: colors.foreground }]}>{symbol}</Text>
          </View>
          <View style={styles.assetInfo}>
            <Text style={[styles.assetName, { color: colors.foreground }]}>{name}</Text>
            <Text style={[styles.assetTicker, { color: colors.mutedForeground }]}>{symbol === 'A' ? 'AUSD' : 'USDC'}</Text>
    ✓ • 2.37s

## Activity

    $ sed -n '1,260p' 'artifacts/ausd-wallet/app/(tabs)/activity.tsx'
    import React from 'react';
    import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { Card, Eyebrow, InlineNotice, Page, Title } from '@/components/Primitives';
    import { formatIndexedSavings, formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
    
    const amountText = (amount: number) =>
      amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
    
    export default function ActivityScreen() {
      const colors = useColors();
      const { profile, transfers: localTransfers } = useWallet();
      const { transfers: indexedTransfers, savings: indexedSavings, loading, error, configured } = useIndexedActivity(profile?.address);
      const useIndexed = configured && !error;
      const indexedHashes = new Set(indexedTransfers.map((item) => item.transactionHash.toLowerCase()));
      const transfers = useIndexed
        ? [
            ...indexedTransfers.map((item) => ({ indexed: formatIndexedTransfer(item, profile?.address ?? '') })),
            ...localTransfers
              .filter((item) => !item.transactionHash || !indexedHashes.has(item.transactionHash.toLowerCase()))
              .map((item) => ({ local: item })),
          ].sort((left, right) => {
            const leftDate = 'indexed' in left ? left.indexed.createdAt : left.local.createdAt;
            const rightDate = 'indexed' in right ? right.indexed.createdAt : right.local.createdAt;
            return new Date(rightDate).getTime() - new Date(leftDate).getTime();
          })
        : localTransfers.map((item) => ({ local: item }));
      return (
        <Page contentStyle={styles.page}>
          <Eyebrow>PAYMENTS</Eyebrow>
          <Title>Activity</Title>
          <Text style={[styles.intro, { color: colors.mutedForeground }]}>
            Confirmed AUSD and settlement-token movements on Monad testnet.
          </Text>
          <View style={[styles.sourceBanner, { backgroundColor: colors.secondary }]}>
            {loading ? <ActivityIndicator size="small" color={colors.foreground} /> : <View style={[styles.sourceDot, { backgroundColor: useIndexed ? colors.primary : colors.mutedForeground }]} />}
            <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>
              {loading ? 'Syncing on-chain activity' : useIndexed ? 'Live activity · Envio indexer' : error ? 'Showing saved activity · indexer unavailable' : 'Saved on this device'}
            </Text>
          </View>
          {indexedSavings.length ? (
            <View style={styles.list}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Savings activity</Text>
              {indexedSavings.map((item) => {
                const activity = formatIndexedSavings(item, profile?.address ?? '');
                return (
                  <Card key={activity.id} style={styles.transferCard}>
                    <View style={styles.cardTop}>
                      <View style={styles.transferType}>
                        <View style={[styles.icon, { backgroundColor: colors.secondary }]}><Feather name="target" size={16} color={colors.foreground} /></View>
                        <View style={styles.typeCopy}><Text style={[styles.name, { color: colors.foreground }]}>{activity.title}</Text><Text style={[styles.meta, { color: colors.mutedForeground }]}>{new Date(activity.createdAt).toLocaleString()} · confirmed on-chain</Text></View>
                      </View>
                      {activity.amount > 0 ? <Text style={[styles.indexedAmount, { color: colors.foreground }]}>{activity.outgoing ? '−' : '+'}{amountText(activity.amount)} AUSD</Text> : null}
                    </View>
                    {activity.counterparty ? <Text selectable style={[styles.recipient, { color: colors.mutedForeground }]}>{activity.counterparty}</Text> : null}
                    <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(`https://testnet.monadvision.com/tx/${activity.transactionHash}`)}><Text style={[styles.explorerText, { color: colors.primary }]}>View on MonadVision</Text></Pressable>
                  </Card>
                );
              })}
            </View>
          ) : null}
          {transfers.length ? (
            <View style={styles.list}>
              {transfers.map((entry) => {
                if ('indexed' in entry) {
                  const transfer = entry.indexed;
                  const date = new Date(transfer.createdAt);
                  const dateLabel = Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString([], {
                    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
                  });
                  return (
                    <Card key={transfer.id} style={styles.transferCard}>
                      <View style={styles.cardTop}>
                        <View style={styles.transferType}>
                          <View style={[styles.icon, { backgroundColor: colors.secondary }]}>
                            <Feather name={transfer.outgoing ? 'arrow-up-right' : 'arrow-down-left'} size={16} color={colors.foreground} />
                          </View>
                          <View style={styles.typeCopy}>
                            <Text style={[styles.name, { color: colors.foreground }]}>{transfer.outgoing ? `${transfer.token} sent` : `${transfer.token} received`}</Text>
                            <Text style={[styles.meta, { color: colors.mutedForeground }]}>{dateLabel} · confirmed on-chain</Text>
                          </View>
                        </View>
                        <Text style={[styles.indexedAmount, { color: colors.foreground }]}>{transfer.outgoing ? '−' : '+'}{amountText(transfer.amount)} {transfer.token}</Text>
                      </View>
                      <View style={styles.recipientBlock}>
                        <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>{transfer.outgoing ? 'TO' : 'FROM'}</Text>
                        <Text selectable style={[styles.recipient, { color: colors.foreground }]}>{transfer.counterparty}</Text>
                      </View>
                      <View style={styles.transactionRef}>
                        <Text selectable style={[styles.hash, { color: colors.mutedForeground }]}>{transfer.transactionHash}</Text>
                        <Pressable
                          accessibilityRole="link"
                          accessibilityLabel="View confirmed transaction on MonadVision"
                          onPress={() => void Linking.openURL(`https://testnet.monadvision.com/tx/${transfer.transactionHash}`)}
                          style={({ pressed }) => [styles.explorerLink, { opacity: pressed ? 0.65 : 1 }]}
                        >
                          <Text style={[styles.explorerText, { color: colors.primary }]}>View on MonadVision</Text>
                          <Feather name="external-link" size={13} color={colors.primary} />
                        </Pressable>
                      </View>
                    </Card>
                  );
                }
                const transfer = entry.local;
                const confirmed = Boolean(transfer.transactionHash);
                const settlement = transfer.settlementKind === 'agora-instant-settlement';
                const autoSave = transfer.settlementKind === 'savings-auto-save';
                const receivedAmount = transfer.receivedAmount ?? transfer.amount;
                const receivedCurrency = transfer.receivedCurrency ?? (settlement ? transfer.quoteSymbol ?? 'CTK' : transfer.currency);
                const date = new Date(transfer.createdAt);
                const dateLabel = Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString([], {
                  month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
                });
    
                return (
                  <Card key={transfer.id} style={styles.transferCard}>
                    <View style={styles.cardTop}>
                      <View style={styles.transferType}>
                        <View style={[styles.icon, { backgroundColor: colors.secondary }]}>
                          <Feather name={settlement ? 'repeat' : autoSave ? 'target' : 'arrow-up-right'} size={16} color={colors.foreground} />
                        </View>
                        <View style={styles.typeCopy}>
                          <Text style={[styles.name, { color: colors.foreground }]}>{settlement ? 'Cross-border settlement' : autoSave ? 'Payment + auto-save' : 'AUSD transfer'}</Text>
                          <Text style={[styles.meta, { color: colors.mutedForeground }]}>{dateLabel}</Text>
                        </View>
                      </View>
                      <View style={[styles.status, { backgroundColor: confirmed ? colors.secondary : colors.background }]}>
                        <View style={[styles.statusDot, { backgroundColor: confirmed ? colors.primary : colors.mutedForeground }]} />
                        <Text style={[styles.statusText, { color: confirmed ? colors.foreground : colors.mutedForeground }]}>
                          {confirmed ? 'CONFIRMED' : 'LOCAL PREVIEW'}
                        </Text>
                      </View>
                    </View>
    
                    <View style={[styles.amountPanel, { backgroundColor: colors.secondary }]}>
                      <View style={styles.amountLine}>
                        <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>{autoSave ? 'TOTAL WALLET DEBIT' : 'SENT'}</Text>
                        <Text style={[styles.sentAmount, { color: colors.foreground }]}>−{amountText(transfer.amount)} {transfer.currency}</Text>
                      </View>
                      {autoSave && transfer.paymentAmount !== undefined && transfer.savedAmount !== undefined ? (
                        <>
                          <View style={[styles.divider, { backgroundColor: colors.border }]} />
                          <View style={styles.amountLine}>
                            <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>RECIPIENT PAYMENT</Text>
                            <Text style={[styles.receivedAmount, { color: colors.foreground }]}>{amountText(transfer.paymentAmount)} {transfer.currency}</Text>
                          </View>
                          <View style={[styles.divider, { backgroundColor: colors.border }]} />
                          <View style={styles.amountLine}>
                            <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>AUTO-SAVED{transfer.savingsGoalName ? ` · ${transfer.savingsGoalName}` : ''}</Text>
                            <Text style={[styles.receivedAmount, { color: colors.foreground }]}>{amountText(transfer.savedAmount)} {transfer.currency}</Text>
                          </View>
                        </>
                      ) : null}
                      <View style={[styles.divider, { backgroundColor: colors.border }]} />
                      <View style={styles.amountLine}>
                        <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>{settlement ? 'TESTNET OUTPUT' : 'RECIPIENT RECEIVES'}</Text>
                        <Text style={[styles.receivedAmount, { color: colors.foreground }]}>{amountText(receivedAmount)} {receivedCurrency}</Text>
                      </View>
                    </View>
    
                    <View style={styles.recipientBlock}>
                      <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>RECIPIENT</Text>
                      <Text selectable style={[styles.recipient, { color: colors.foreground }]}>{transfer.recipient}</Text>
                    </View>
    
                    {confirmed && transfer.transactionHash ? (
                      <View style={styles.transactionRef}>
                        <Text selectable style={[styles.hash, { color: colors.mutedForeground }]}>{transfer.transactionHash}</Text>
                        <Pressable
                          accessibilityRole="link"
                          accessibilityLabel="View confirmed transaction on MonadVision"
                          onPress={() => void Linking.openURL(`https://testnet.monadvision.com/tx/${transfer.transactionHash}`)}
                          style={({ pressed }) => [styles.explorerLink, { opacity: pressed ? 0.65 : 1 }]}
                        >
                          <Text style={[styles.explorerText, { color: colors.primary }]}>View on MonadVision</Text>
                          <Feather name="external-link" size={13} color={colors.primary} />
                        </Pressable>
                      </View>
                    ) : null}
                  </Card>
                );
              })}
            </View>
          ) : (
            <Card style={styles.empty}>
              <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
                <Feather name="clock" size={19} color={colors.foreground} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No activity yet</Text>
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                Confirmed token movements and saved transfers will appear here.
              </Text>
            </Card>
          )}
          <InlineNotice icon="shield">
            {useIndexed ? 'Confirmed token movements are read from Monad testnet logs indexed by Envio. Saved items outside the indexer history remain visible; local previews are not on-chain transactions.' : 'Saved entries come from this device. Local previews are not on-chain transactions.'}
          </InlineNotice>
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { gap: 13, paddingTop: 10 },
      intro: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_400Regular', marginBottom: 3 },
      list: { gap: 12 },
      sectionTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
      sourceBanner: { minHeight: 36, borderRadius: 10, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 8 },
      sourceDot: { width: 7, height: 7, borderRadius: 4 },
      sourceText: { fontSize: 10, fontFamily: 'Inter_500Medium' },
      transferCard: { gap: 13, padding: 15 },
      cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
      transferType: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
      icon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
      typeCopy: { flex: 1, gap: 3 },
      name: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
      meta: { fontSize: 9, fontFamily: 'Inter_400Regular' },
      status: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 7, paddingHorizontal: 7, paddingVertical: 6 },
      statusDot: { width: 6, height: 6, borderRadius: 3 },
      statusText: { fontSize: 8, letterSpacing: 0.35, fontFamily: 'Inter_700Bold' },
      amountPanel: { borderRadius: 12, paddingHorizontal: 11, paddingVertical: 10, gap: 8 },
      amountLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
      divider: { height: StyleSheet.hairlineWidth },
      amountLabel: { fontSize: 9, letterSpacing: 0.55, fontFamily: 'Inter_600SemiBold' },
      sentAmount: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
      receivedAmount: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
      indexedAmount: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
      recipientBlock: { gap: 4 },
      recipient: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_500Medium' },
      transactionRef: { gap: 3 },
      hash: { fontSize: 8, lineHeight: 13, fontFamily: 'Inter_400Regular' },
      explorerLink: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 2 },
      explorerText: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
      empty: { alignItems: 'center', paddingHorizontal: 27, paddingVertical: 28 },
      emptyIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
      emptyTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
      emptyText: { textAlign: 'center', fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
    });
    ✓ • 723ms

## Activity

    $ sed -n '1,320p' artifacts/ausd-wallet/services/indexed-activity.ts
    import { useEffect, useState } from 'react';
    import { formatUnits } from 'viem';
    
    const GRAPHQL_URL = process.env.EXPO_PUBLIC_ENVIO_GRAPHQL_URL?.trim();
    const AUSD_ADDRESS = '0xa9012a055bd4e0eDfF8Ce09f960291C09D5322dC'.toLowerCase();
    const CTK_ADDRESS = '0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D'.toLowerCase();
    const USDC_ADDRESS = '0x534b2f3A21130d7a60830c2Df862319e593943A3'.toLowerCase();
    
    export interface IndexedTransfer {
      id: string;
      token: string;
      from: string;
      to: string;
      value: string;
      transactionHash: string;
      blockNumber: string;
      timestamp: string;
    }
    
    export interface IndexedSavingsActivity {
      id: string;
      kind: string;
      owner: string;
      pocketId?: string | null;
      counterparty?: string | null;
      amount?: string | null;
      paymentAmount?: string | null;
      savedAmount?: string | null;
      autoSaveBps?: number | null;
      transactionHash: string;
      blockNumber: string;
      timestamp: string;
    }
    
    interface GraphQLResponse {
      data?: { TokenTransfer?: IndexedTransfer[]; SavingsActivity?: IndexedSavingsActivity[] };
      errors?: Array<{ message: string }>;
    }
    
    const transfersQuery = `query WalletTransfers($account: String!) {
      TokenTransfer(where: { from: { _eq: $account } }, order_by: { blockNumber: desc }, limit: 50) {
        id token from to value transactionHash blockNumber timestamp
      }
    }`;
    
    const receivedQuery = `query WalletReceipts($account: String!) {
      TokenTransfer(where: { to: { _eq: $account } }, order_by: { blockNumber: desc }, limit: 50) {
        id token from to value transactionHash blockNumber timestamp
      }
    }`;
    
    const savingsQuery = `query WalletSavingsActivity($account: String!) {
      SavingsActivity(where: { _or: [{ owner: { _eq: $account } }, { counterparty: { _eq: $account } }] }, order_by: { blockNumber: desc }, limit: 100) {
        id kind owner pocketId counterparty amount paymentAmount savedAmount autoSaveBps transactionHash blockNumber timestamp
      }
    }`;
    
    async function fetchGraphql<T>(account: string, query: string, field: 'TokenTransfer' | 'SavingsActivity'): Promise<T[]> {
      if (!GRAPHQL_URL) return [];
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { account: account.toLowerCase() } }),
      });
      if (!response.ok) throw new Error(`Activity service returned ${response.status}.`);
      const result = await response.json() as GraphQLResponse;
      if (result.errors?.length) throw new Error(result.errors[0]?.message ?? 'Activity query failed.');
      return (result.data?.[field] ?? []) as T[];
    }
    
    export function useIndexedActivity(account?: string) {
      const [transfers, setTransfers] = useState<IndexedTransfer[]>([]);
      const [savings, setSavings] = useState<IndexedSavingsActivity[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
    
      useEffect(() => {
        if (!GRAPHQL_URL || !account) {
        setTransfers([]); setSavings([]);
          setLoading(false);
          setError('');
          return;
        }
        let active = true;
        setLoading(true);
        setError('');
        Promise.all([
          fetchGraphql<IndexedTransfer>(account, transfersQuery, 'TokenTransfer'),
          fetchGraphql<IndexedTransfer>(account, receivedQuery, 'TokenTransfer'),
          fetchGraphql<IndexedSavingsActivity>(account, savingsQuery, 'SavingsActivity'),
        ])
          .then(([sent, received, savingsEvents]) => {
            if (!active) return;
            const unique = new Map([...sent, ...received].map((transfer) => [transfer.id, transfer]));
            setTransfers([...unique.values()].sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber)));
            setSavings(savingsEvents.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber)));
          })
          .catch((caught: unknown) => {
            if (active) setError(caught instanceof Error ? caught.message : 'Could not load on-chain activity.');
          })
          .finally(() => {
            if (active) setLoading(false);
          });
        return () => { active = false; };
      }, [account]);
    
      return { transfers, savings, loading, error, configured: Boolean(GRAPHQL_URL) };
    }
    
    export function formatIndexedTransfer(transfer: IndexedTransfer, account: string) {
      const outgoing = transfer.from.toLowerCase() === account.toLowerCase();
      const token = transfer.token.toLowerCase() === AUSD_ADDRESS ? 'AUSD'
        : transfer.token.toLowerCase() === USDC_ADDRESS ? 'USDC'
        : transfer.token.toLowerCase() === CTK_ADDRESS ? 'CTK' : 'Token';
      const decimals = token === 'CTK' ? 18 : 6;
      const amount = Number(formatUnits(BigInt(transfer.value), decimals));
      const counterparty = outgoing ? transfer.to : transfer.from;
      const timestamp = Number(transfer.timestamp) * 1000;
      return {
        id: transfer.id,
        outgoing,
        token,
        amount,
        counterparty,
        transactionHash: transfer.transactionHash,
        createdAt: new Date(timestamp).toISOString(),
      };
    }
    
    export function formatIndexedSavings(activity: IndexedSavingsActivity, account: string) {
      const outgoing = activity.owner.toLowerCase() === account.toLowerCase();
      const rawAmount = activity.amount ?? activity.paymentAmount ?? activity.savedAmount ?? '0';
      const amount = Number(formatUnits(BigInt(rawAmount), 6));
      const labels: Record<string, string> = {
        'pocket-created': 'Pocket created', 'autosave-rate-updated': 'Auto-save updated', deposited: 'Pocket deposit',
        withdrawn: 'Pocket withdrawal', 'payment-autosave': 'Payment + auto-save', 'pocket-gift': 'Pocket gift',
        'person-gift': 'Gift sent', 'gift-allocated': 'Gift allocated', 'gift-withdrawn': 'Gift withdrawal',
      };
      return {
        id: activity.id, title: labels[activity.kind] ?? 'Savings activity', outgoing, amount,
        counterparty: activity.counterparty ?? '', transactionHash: activity.transactionHash,
        createdAt: new Date(Number(activity.timestamp) * 1000).toISOString(), kind: activity.kind,
      };
    }
    ✓ • 0ms

## Activity

    $ rg -n "addTransfer|currency:|getUSDCBalance|useIndexedActivity|TokenTransfer|GRAPHQL" artifacts/ausd-wallet/app artifacts/ausd-wallet/services artifacts/ausd-wallet/state
    artifacts/ausd-wallet/state/wallet-context.tsx:43:  currency: string;
    artifacts/ausd-wallet/state/wallet-context.tsx:70:  addTransfer: (transfer: Transfer) => Promise<void>;
    artifacts/ausd-wallet/state/wallet-context.tsx:166:  const addTransfer = useCallback(
    artifacts/ausd-wallet/state/wallet-context.tsx:199:      addTransfer,
    artifacts/ausd-wallet/state/wallet-context.tsx:204:    [state, ready, authenticated, introComplete, storageError, completeIntro, completeOnboarding, addTransfer, unlockWallet, lockWallet, resetWallet],
    artifacts/ausd-wallet/services/indexed-activity.ts:4:const GRAPHQL_URL = process.env.EXPO_PUBLIC_ENVIO_GRAPHQL_URL?.trim();
    artifacts/ausd-wallet/services/indexed-activity.ts:36:  data?: { TokenTransfer?: IndexedTransfer[]; SavingsActivity?: IndexedSavingsActivity[] };
    artifacts/ausd-wallet/services/indexed-activity.ts:41:  TokenTransfer(where: { from: { _eq: $account } }, order_by: { blockNumber: desc }, limit: 50) {
    artifacts/ausd-wallet/services/indexed-activity.ts:47:  TokenTransfer(where: { to: { _eq: $account } }, order_by: { blockNumber: desc }, limit: 50) {
    artifacts/ausd-wallet/services/indexed-activity.ts:58:async function fetchGraphql<T>(account: string, query: string, field: 'TokenTransfer' | 'SavingsActivity'): Promise<T[]> {
    artifacts/ausd-wallet/services/indexed-activity.ts:59:  if (!GRAPHQL_URL) return [];
    artifacts/ausd-wallet/services/indexed-activity.ts:60:  const response = await fetch(GRAPHQL_URL, {
    artifacts/ausd-wallet/services/indexed-activity.ts:71:export function useIndexedActivity(account?: string) {
    artifacts/ausd-wallet/services/indexed-activity.ts:78:    if (!GRAPHQL_URL || !account) {
    artifacts/ausd-wallet/services/indexed-activity.ts:88:      fetchGraphql<IndexedTransfer>(account, transfersQuery, 'TokenTransfer'),
    artifacts/ausd-wallet/services/indexed-activity.ts:89:      fetchGraphql<IndexedTransfer>(account, receivedQuery, 'TokenTransfer'),
    artifacts/ausd-wallet/services/indexed-activity.ts:107:  return { transfers, savings, loading, error, configured: Boolean(GRAPHQL_URL) };
    artifacts/ausd-wallet/app/savings-goals.tsx:29:import { formatIndexedSavings, useIndexedActivity } from '@/services/indexed-activity';
    artifacts/ausd-wallet/app/savings-goals.tsx:61:  const { savings: indexedSavings } = useIndexedActivity(account?.address);
    artifacts/ausd-wallet/app/review.tsx:9:  sendSponsoredTokenTransfer,
    artifacts/ausd-wallet/app/review.tsx:36:  const { profile, addTransfer } = useWallet();
    artifacts/ausd-wallet/app/review.tsx:106:          : await sendSponsoredTokenTransfer(account, recipient, String(params.amount), getWalletToken(params.token, 'AUSD'));
    artifacts/ausd-wallet/app/review.tsx:119:        currency: sentCurrency,
    artifacts/ausd-wallet/app/review.tsx:140:        await addTransfer(transfer);
    artifacts/ausd-wallet/app/review.tsx:151:          currency: sentCurrency,
    artifacts/ausd-wallet/services/passkey.ts:396:export async function getUSDCBalance(account: string) {
    artifacts/ausd-wallet/services/passkey.ts:486:  return sendSponsoredTokenTransfer(account, recipient, amount, 'AUSD');
    artifacts/ausd-wallet/services/passkey.ts:489:export async function sendSponsoredTokenTransfer(
    artifacts/ausd-wallet/app/send.tsx:312:  currency: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:7:import { formatIndexedSavings, formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:15:  const { transfers: indexedTransfers, savings: indexedSavings, loading, error, configured } = useIndexedActivity(profile?.address);
    artifacts/ausd-wallet/app/(tabs)/index.tsx:7:import { getAUSDBalance, getUSDCBalance } from '@/services/passkey';
    artifacts/ausd-wallet/app/(tabs)/index.tsx:8:import { formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
    artifacts/ausd-wallet/app/(tabs)/index.tsx:18:  const { transfers: indexedTransfers, error: activityError, configured } = useIndexedActivity(profile?.address);
    artifacts/ausd-wallet/app/(tabs)/index.tsx:29:    Promise.allSettled([getAUSDBalance(profile.address), getUSDCBalance(profile.address)])
    ✓ • 55ms

## Activity

    $ sed -n '1,260p' artifacts/ausd-wallet/services/tokens.ts && sed -n '1,260p' artifacts/ausd-wallet/services/passkey.ts
    import type { Address } from 'viem';
    
    export type WalletToken = 'AUSD' | 'USDC' | 'CTK';
    
    export interface WalletTokenInfo {
      symbol: WalletToken;
      name: string;
      address: Address;
      decimals: number;
    }
    
    export const WALLET_TOKENS: Record<WalletToken, WalletTokenInfo> = {
      AUSD: {
        symbol: 'AUSD',
        name: 'Agora AUSD',
        address: '0xa9012a055bd4e0eDfF8Ce09f960291C09D5322dC',
        decimals: 6,
      },
      USDC: {
        symbol: 'USDC',
        name: 'USD Coin',
        address: '0x534b2f3A21130d7a60830c2Df862319e593943A3',
        decimals: 6,
      },
      CTK: {
        symbol: 'CTK',
        name: 'Testnet payout token',
        address: '0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D',
        decimals: 18,
      },
    };
    
    export const TRANSFER_TOKENS: WalletToken[] = ['AUSD', 'USDC'];
    export const STABLECOIN_TOKENS: WalletToken[] = ['AUSD', 'USDC'];
    
    export function getWalletToken(symbol: string | undefined, fallback: WalletToken = 'AUSD') {
      const normalized = symbol?.toUpperCase() as WalletToken | undefined;
      return normalized && WALLET_TOKENS[normalized] ? normalized : fallback;
    }
    
    import { Platform } from 'react-native';
    import Constants, { AppOwnership } from 'expo-constants';
    import { HDKey } from '@scure/bip32';
    import { entropyToMnemonic, mnemonicToSeedSync } from '@scure/bip39';
    import { wordlist } from '@scure/bip39/wordlists/english.js';
    import { toViemAccount } from '@category-labs/mera/viem';
    import { toKernelSmartAccount } from 'permissionless/accounts';
    import { createSmartAccountClient } from 'permissionless';
    import {
      createPublicClient,
      decodeEventLog,
      defineChain,
      encodeFunctionData,
      formatUnits,
      http,
      isAddress,
      parseUnits,
      type Address,
      type Hex,
    } from 'viem';
    import { entryPoint07Address } from 'viem/account-abstraction';
    import { createPaymasterClient } from 'viem/account-abstraction';
    import type { PasskeyCredentialMetadata } from '@category-labs/mera';
    import {
      AGORA_TESTNET_WHITELISTER,
      MONAD_TESTNET,
      pairAbi,
      simulateTokenSwap,
      whitelisterAbi,
    } from '@/services/settlement';
    import { WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    
    export interface MeraAccount {
      address: string;
      signerAddress: string;
      credential: PasskeyCredentialMetadata;
      rpId: string;
    }
    
    export interface MeraPasskeyProfile {
      address: string;
      signerAddress: string;
      credential: PasskeyCredentialMetadata;
      rpId: string;
    }
    
    export const MONAD_CHAIN = defineChain({
      id: 10143,
      name: 'Monad Testnet',
      nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
      rpcUrls: { default: { http: [MONAD_TESTNET.rpcUrl] } },
    });
    
    const publicClient = createPublicClient({ chain: MONAD_CHAIN, transport: http(MONAD_TESTNET.rpcUrl) });
    const entryPoint = { address: entryPoint07Address, version: '0.7' as const };
    const ausdAbi = [
      { type: 'function', name: 'decimals', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint8' }] },
      { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }] },
      { type: 'function', name: 'allowance', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }] },
      { type: 'function', name: 'approve', stateMutability: 'nonpayable', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }] },
      { type: 'function', name: 'transfer', stateMutability: 'nonpayable', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }] },
    ] as const;
    const balanceAbi = [
      { type: 'function', name: 'decimals', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint8' }] },
      { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }] },
    ] as const;
    
    export function getPasskeyErrorMessage(error: unknown) {
      if (!(error instanceof Error)) return 'Passkey authentication did not complete. Please try again.';
      const shaped = error as Error & { code?: string; cause?: unknown };
      const nativeDetails = getNativePasskeyErrorDetails(shaped.cause);
      const causeText = nativeDetails.toLowerCase();
    
      if (shaped.code === 'PRF_UNAVAILABLE') {
        return 'The passkey was created, but this authenticator did not provide Mera’s secure account key. Try a device passkey provider that supports WebAuthn PRF, such as Google Password Manager or iCloud Keychain.';
      }
      if (shaped.code === 'CRYPTO_UNAVAILABLE') {
        return 'Secure cryptography is unavailable in this app runtime. Update the app and try again.';
      }
      if (shaped.code === 'PASSKEY_OPERATION_FAILED') {
        return nativeDetails
          ? `The passkey ceremony failed. Native error: ${nativeDetails}`
          : 'The passkey ceremony failed, but the native platform did not provide additional error details.';
      }
      if (causeText.includes('cancel')) {
        return 'Passkey prompt cancelled. You can try again when you’re ready.';
      }
      const message = error.message || 'Passkey authentication did not complete. Please try again.';
      return nativeDetails && !message.includes(nativeDetails)
        ? `${message} Native error: ${nativeDetails}`
        : message;
    }
    
    function getNativePasskeyErrorDetails(error: unknown): string {
      const details: string[] = [];
      let current = error;
    
      for (let depth = 0; depth < 4 && current; depth += 1) {
        if (current instanceof Error) {
          const shaped = current as Error & { code?: unknown; error?: unknown; cause?: unknown };
          const code = [shaped.code, shaped.error].find((part): part is string => typeof part === 'string');
          const message = shaped.message.trim();
          const name = shaped.name && shaped.name !== 'Error' ? shaped.name : undefined;
          const detail = [name, code, message && message !== code ? message : undefined]
            .filter((part): part is string => Boolean(part))
            .join(': ');
          if (detail && !details.includes(detail)) details.push(detail);
          current = shaped.cause;
          continue;
        }
    
        if (typeof current === 'object') {
          const shaped = current as { code?: unknown; error?: unknown; message?: unknown; cause?: unknown };
          const code = [shaped.code, shaped.error].find((part): part is string => typeof part === 'string');
          const message = typeof shaped.message === 'string' ? shaped.message.trim() : undefined;
          const detail = [code, message && message !== code ? message : undefined]
            .filter((part): part is string => Boolean(part))
            .join(': ');
          if (detail && !details.includes(detail)) details.push(detail);
          current = shaped.cause;
          continue;
        }
    
        if (typeof current === 'string' && current.trim()) details.push(current.trim());
        break;
      }
    
      return details.join(' → ');
    }
    
    async function assertNativeRpAssociation(rpId: string) {
      if (Platform.OS === 'web') return;
      const isAndroid = Platform.OS === 'android';
      const associationPath = isAndroid
        ? '/.well-known/assetlinks.json'
        : '/.well-known/apple-app-site-association';
      let response: Response;
      try {
        response = await fetch(`https://${rpId}${associationPath}`, { redirect: 'manual' });
      } catch {
        throw new Error(`Could not reach https://${rpId}${associationPath}. Publish the native passkey association file on the RP domain, then retry.`);
      }
      if (!response.ok || response.redirected) {
        throw new Error(`The passkey association file at https://${rpId}${associationPath} must return JSON directly with HTTP 200. Check the RP domain’s association configuration.`);
      }
    
      let association: unknown;
      try {
        association = await response.json();
      } catch {
        throw new Error(`The passkey association file at https://${rpId}${associationPath} did not return valid JSON.`);
      }
    
      if (isAndroid) {
        const packageName = Constants.expoConfig?.android?.package ?? 'com.ausd.wallet';
        const entries = Array.isArray(association) ? association : [];
        const appIsAssociated = entries.some((entry) => {
          if (!entry || typeof entry !== 'object') return false;
          const typedEntry = entry as {
            relation?: unknown;
            target?: { namespace?: string; package_name?: string; sha256_cert_fingerprints?: unknown };
          };
          const relations = Array.isArray(typedEntry.relation) ? typedEntry.relation : [];
          const target = typedEntry.target;
          return relations.includes('delegate_permission/common.get_login_creds')
            && target?.namespace === 'android_app'
            && target.package_name === packageName
            && Array.isArray(target.sha256_cert_fingerprints)
            && target.sha256_cert_fingerprints.length > 0;
        });
        if (!appIsAssociated) {
          throw new Error(`Android passkeys are not associated with ${packageName}. Add the installed APK’s signing-certificate SHA-256 fingerprint to the RP domain’s assetlinks.json, then rebuild and retry.`);
        }
        return;
      }
    
      const iosBundleId = Constants.expoConfig?.ios?.bundleIdentifier;
      const webcredentials = (association as { webcredentials?: { apps?: unknown } } | null)?.webcredentials;
      const apps = Array.isArray(webcredentials?.apps) ? webcredentials.apps : [];
      if (iosBundleId && !apps.some((app) => typeof app === 'string' && app.endsWith(`.${iosBundleId}`))) {
        throw new Error(`iOS passkeys are not associated with ${iosBundleId}. Add the Apple team and bundle ID to the RP domain’s apple-app-site-association file, then rebuild and retry.`);
      }
    }
    
    function getRelyingPartyId() {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        return window.location.hostname;
      }
      const configured = process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN;
      if (!configured) return undefined;
      try {
        return new URL(configured.includes('://') ? configured : `https://${configured}`).hostname;
      } catch {
        return undefined;
      }
    }
    
    async function assertPlatformSupport() {
      if (Platform.OS !== 'web' && Constants.appOwnership === AppOwnership.Expo) {
        throw new Error(
          'Expo Go does not include Mera’s native passkey module. Install the AUSD development build, then open this project with the dev:client command.',
        );
      }
      if (Platform.OS === 'ios' && Number(Platform.Version) < 18) {
        throw new Error('Mera passkey accounts require iOS 18 or later.');
      }
      if (Platform.OS === 'android' && Number(Platform.Version) < 28) {
        throw new Error('Mera passkey accounts require Android 9 or later.');
      }
      if (Platform.OS !== 'web') {
        const { Passkey } = await import('react-native-passkey');
        if (!Passkey.isSupported()) {
          throw new Error('Passkeys are not available on this device. Try a supported device with a screen lock enabled.');
        }
      }
      if (Platform.OS === 'web' && typeof window !== 'undefined' && !window.PublicKeyCredential) {
        throw new Error('This browser does not support passkeys. Try a supported browser.');
      }
    }
    
    async function getNativeWebAuthnClient() {
      return Platform.OS === 'web'
        ? undefined
        : (await import('@category-labs/mera/react-native-webauthn-client'))
            .reactNativeWebAuthnClient;
    }
    
    function signerFromPrf(mera: typeof import('@category-labs/mera'), prfOutput: Uint8Array) {
      let session: ReturnType<typeof mera.createSecp256k1SigningSession> | undefined;
      let seed: Uint8Array | undefined;
      let privateKey: Uint8Array | undefined;
      try {
        const mnemonic = entropyToMnemonic(prfOutput, wordlist);
        seed = mnemonicToSeedSync(mnemonic);
        const node = HDKey.fromMasterSeed(seed).derive("m/44'/60'/0'/0/0");
        if (!node.privateKey) throw new Error('Mera could not derive the EVM account key.');
        privateKey = node.privateKey;
        session = mera.createSecp256k1SigningSession({ privateKey });
        return { session, owner: toViemAccount(session) };
      } catch (error) {
        session?.end();
        throw error;
      } finally {
        privateKey?.fill(0);
        seed?.fill(0);
        prfOutput.fill(0);
      }
    }
    
    async function createKernelAccount(owner: ReturnType<typeof toViemAccount>) {
      return toKernelSmartAccount({
        client: publicClient,
        entryPoint,
        owners: [owner],
        version: '0.3.1',
      });
    }
    
    export async function createMeraPasskey(name: string, email: string): Promise<MeraAccount> {
      await assertPlatformSupport();
    ✓ • 707ms

## Activity

    $ sed -n '1,240p' artifacts/ausd-wallet/services/indexed-activity.ts
    import { useEffect, useState } from 'react';
    import { formatUnits } from 'viem';
    
    const GRAPHQL_URL = process.env.EXPO_PUBLIC_ENVIO_GRAPHQL_URL?.trim();
    const AUSD_ADDRESS = '0xa9012a055bd4e0eDfF8Ce09f960291C09D5322dC'.toLowerCase();
    const CTK_ADDRESS = '0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D'.toLowerCase();
    const USDC_ADDRESS = '0x534b2f3A21130d7a60830c2Df862319e593943A3'.toLowerCase();
    
    export interface IndexedTransfer {
      id: string;
      token: string;
      from: string;
      to: string;
      value: string;
      transactionHash: string;
      blockNumber: string;
      timestamp: string;
    }
    
    export interface IndexedSavingsActivity {
      id: string;
      kind: string;
      owner: string;
      pocketId?: string | null;
      counterparty?: string | null;
      amount?: string | null;
      paymentAmount?: string | null;
      savedAmount?: string | null;
      autoSaveBps?: number | null;
      transactionHash: string;
      blockNumber: string;
      timestamp: string;
    }
    
    interface GraphQLResponse {
      data?: { TokenTransfer?: IndexedTransfer[]; SavingsActivity?: IndexedSavingsActivity[] };
      errors?: Array<{ message: string }>;
    }
    
    const transfersQuery = `query WalletTransfers($account: String!) {
      TokenTransfer(where: { from: { _eq: $account } }, order_by: { blockNumber: desc }, limit: 50) {
        id token from to value transactionHash blockNumber timestamp
      }
    }`;
    
    const receivedQuery = `query WalletReceipts($account: String!) {
      TokenTransfer(where: { to: { _eq: $account } }, order_by: { blockNumber: desc }, limit: 50) {
        id token from to value transactionHash blockNumber timestamp
      }
    }`;
    
    const savingsQuery = `query WalletSavingsActivity($account: String!) {
      SavingsActivity(where: { _or: [{ owner: { _eq: $account } }, { counterparty: { _eq: $account } }] }, order_by: { blockNumber: desc }, limit: 100) {
        id kind owner pocketId counterparty amount paymentAmount savedAmount autoSaveBps transactionHash blockNumber timestamp
      }
    }`;
    
    async function fetchGraphql<T>(account: string, query: string, field: 'TokenTransfer' | 'SavingsActivity'): Promise<T[]> {
      if (!GRAPHQL_URL) return [];
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { account: account.toLowerCase() } }),
      });
      if (!response.ok) throw new Error(`Activity service returned ${response.status}.`);
      const result = await response.json() as GraphQLResponse;
      if (result.errors?.length) throw new Error(result.errors[0]?.message ?? 'Activity query failed.');
      return (result.data?.[field] ?? []) as T[];
    }
    
    export function useIndexedActivity(account?: string) {
      const [transfers, setTransfers] = useState<IndexedTransfer[]>([]);
      const [savings, setSavings] = useState<IndexedSavingsActivity[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
    
      useEffect(() => {
        if (!GRAPHQL_URL || !account) {
        setTransfers([]); setSavings([]);
          setLoading(false);
          setError('');
          return;
        }
        let active = true;
        setLoading(true);
        setError('');
        Promise.all([
          fetchGraphql<IndexedTransfer>(account, transfersQuery, 'TokenTransfer'),
          fetchGraphql<IndexedTransfer>(account, receivedQuery, 'TokenTransfer'),
          fetchGraphql<IndexedSavingsActivity>(account, savingsQuery, 'SavingsActivity'),
        ])
          .then(([sent, received, savingsEvents]) => {
            if (!active) return;
            const unique = new Map([...sent, ...received].map((transfer) => [transfer.id, transfer]));
            setTransfers([...unique.values()].sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber)));
            setSavings(savingsEvents.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber)));
          })
          .catch((caught: unknown) => {
            if (active) setError(caught instanceof Error ? caught.message : 'Could not load on-chain activity.');
          })
          .finally(() => {
            if (active) setLoading(false);
          });
        return () => { active = false; };
      }, [account]);
    
      return { transfers, savings, loading, error, configured: Boolean(GRAPHQL_URL) };
    }
    
    export function formatIndexedTransfer(transfer: IndexedTransfer, account: string) {
      const outgoing = transfer.from.toLowerCase() === account.toLowerCase();
      const token = transfer.token.toLowerCase() === AUSD_ADDRESS ? 'AUSD'
        : transfer.token.toLowerCase() === USDC_ADDRESS ? 'USDC'
        : transfer.token.toLowerCase() === CTK_ADDRESS ? 'CTK' : 'Token';
      const decimals = token === 'CTK' ? 18 : 6;
      const amount = Number(formatUnits(BigInt(transfer.value), decimals));
      const counterparty = outgoing ? transfer.to : transfer.from;
      const timestamp = Number(transfer.timestamp) * 1000;
      return {
        id: transfer.id,
        outgoing,
        token,
        amount,
        counterparty,
        transactionHash: transfer.transactionHash,
        createdAt: new Date(timestamp).toISOString(),
      };
    }
    
    export function formatIndexedSavings(activity: IndexedSavingsActivity, account: string) {
      const outgoing = activity.owner.toLowerCase() === account.toLowerCase();
      const rawAmount = activity.amount ?? activity.paymentAmount ?? activity.savedAmount ?? '0';
      const amount = Number(formatUnits(BigInt(rawAmount), 6));
      const labels: Record<string, string> = {
        'pocket-created': 'Pocket created', 'autosave-rate-updated': 'Auto-save updated', deposited: 'Pocket deposit',
        withdrawn: 'Pocket withdrawal', 'payment-autosave': 'Payment + auto-save', 'pocket-gift': 'Pocket gift',
        'person-gift': 'Gift sent', 'gift-allocated': 'Gift allocated', 'gift-withdrawn': 'Gift withdrawal',
      };
      return {
        id: activity.id, title: labels[activity.kind] ?? 'Savings activity', outgoing, amount,
        counterparty: activity.counterparty ?? '', transactionHash: activity.transactionHash,
        createdAt: new Date(Number(activity.timestamp) * 1000).toISOString(), kind: activity.kind,
      };
    }
    ✓ • 2.23s

## Activity

    $ sed -n '240,520p' 'artifacts/ausd-wallet/app/(tabs)/index.tsx'
                <Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>
                  Your transfers will appear here.
                </Text>
              </View>
            )}
          </Card>
    
        </Page>
      );
    }
    
    function AssetRow({ symbol, name, amount }: { symbol: string; name: string; amount: number | null }) {
      const colors = useColors();
      return (
        <View style={styles.assetRow}>
          <View style={[styles.assetIcon, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.assetSymbol, { color: colors.foreground }]}>{symbol}</Text>
          </View>
          <View style={styles.assetInfo}>
            <Text style={[styles.assetName, { color: colors.foreground }]}>{name}</Text>
            <Text style={[styles.assetTicker, { color: colors.mutedForeground }]}>{symbol === 'A' ? 'AUSD' : 'USDC'}</Text>
          </View>
          <View style={styles.assetValue}>
            <Text style={[styles.assetAmount, { color: colors.foreground }]}>{amount === null ? '—' : money(amount)}</Text>
            <Text style={[styles.assetUsd, { color: colors.mutedForeground }]}>${amount === null ? '—' : money(amount)}</Text>
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
    });
    ✓ • 0ms

## Assistant

The home tab is entirely static after first mount: balances and indexer data have no user-triggered reload. The asset list is hard-coded to AUSD and USDC, even though the code already defines CTK. I’m checking whether the reported USDC transfer is excluded by configuration or by the indexing path.

## Activity

    $ rg -n --hidden --glob '!node_modules' 'EXPO_PUBLIC_ENVIO|ENVIO|WALLET_TOKENS|TRANSFER_TOKENS|CTK' artifacts/ausd-wallet .env*
    rg: .env*: No such file or directory (os error 2)
    artifacts/ausd-wallet/README.md:3:Expo mobile wallet prototype for AUSD payments. New users move through a three-screen swipe introduction, then create a Mera passkey account. Mera authenticates wallet actions, direct AUSD transfers and Agora Instant Settlement swaps can submit sponsored transactions on Monad testnet, and CTK is used as a mock payout token. Aurora Intents can quote cross-chain deposits into Monad AUSD and provide a temporary source-chain deposit address.
    artifacts/ausd-wallet/README.md:22:The Mera PRF derives a standard EVM BIP-44 owner and a Kernel v0.3.1 smart account (EntryPoint v0.7). Direct sends authenticate with Mera and submit an AUSD transfer through a sponsored UserOperation. Agora settlement re-reads its AUSD→CTK quote, checks it has not changed, then submits the approved testnet settlement flow through a sponsored UserOperation. CTK is a test token, not a fiat payout. These actions can move test tokens on Monad testnet; do not use mainnet funds.
    artifacts/ausd-wallet/README.md:67:The Envio indexer is in `artifacts/wallet-indexer`. In Envio Cloud, set **Root Directory** to `artifacts/wallet-indexer` and **Config File** to `config.yaml`; that directory contains the exact Envio version pin Cloud checks. The indexer pins Envio `3.14.0`, pnpm `10.32.0`, and Node 24+. Deploy it, then set its public GraphQL URL as the GitHub Actions repository variable `EXPO_PUBLIC_ENVIO_GRAPHQL_URL`. Set the same variable in the local wallet environment to use indexed activity during development. It indexes Monad testnet AUSD and CTK `Transfer` events starting from the configured latest block. If the URL is missing or unavailable, the activity screen falls back to transfers saved on the device.
    artifacts/ausd-wallet/services/tokens.ts:3:export type WalletToken = 'AUSD' | 'USDC' | 'CTK';
    artifacts/ausd-wallet/services/tokens.ts:12:export const WALLET_TOKENS: Record<WalletToken, WalletTokenInfo> = {
    artifacts/ausd-wallet/services/tokens.ts:25:  CTK: {
    artifacts/ausd-wallet/services/tokens.ts:26:    symbol: 'CTK',
    artifacts/ausd-wallet/services/tokens.ts:33:export const TRANSFER_TOKENS: WalletToken[] = ['AUSD', 'USDC'];
    artifacts/ausd-wallet/services/tokens.ts:38:  return normalized && WALLET_TOKENS[normalized] ? normalized : fallback;
    artifacts/ausd-wallet/services/passkey.ts:31:import { WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/services/passkey.ts:402:  const info = WALLET_TOKENS[token];
    artifacts/ausd-wallet/services/passkey.ts:503:    amountIn = parseUnits(amount, WALLET_TOKENS[token].decimals);
    artifacts/ausd-wallet/services/passkey.ts:505:    throw new Error(`Enter a valid ${token} amount with at most ${WALLET_TOKENS[token].decimals} decimal places.`);
    artifacts/ausd-wallet/services/passkey.ts:516:      publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'decimals' }),
    artifacts/ausd-wallet/services/passkey.ts:517:      publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'balanceOf', args: [kernelAccount.address] }),
    artifacts/ausd-wallet/services/passkey.ts:519:    if (decimals !== WALLET_TOKENS[token].decimals) throw new Error(`Monad ${token} reports ${decimals} decimals; expected ${WALLET_TOKENS[token].decimals}.`);
    artifacts/ausd-wallet/services/passkey.ts:534:      to: WALLET_TOKENS[token].address,
    artifacts/ausd-wallet/services/passkey.ts:558:  outputSymbol: WalletToken = 'CTK',
    artifacts/ausd-wallet/services/passkey.ts:579:  try { requestedAmount = parseUnits(amount, quoteMode === 'exact-input' ? WALLET_TOKENS[inputSymbol].decimals : WALLET_TOKENS[outputSymbol].decimals); }
    artifacts/ausd-wallet/services/passkey.ts:605:      publicClient.readContract({ address: WALLET_TOKENS[inputSymbol].address, abi: balanceAbi, functionName: 'decimals' }),
    artifacts/ausd-wallet/services/passkey.ts:606:      publicClient.readContract({ address: WALLET_TOKENS[inputSymbol].address, abi: balanceAbi, functionName: 'balanceOf', args: [kernelAccount.address] }),
    artifacts/ausd-wallet/services/passkey.ts:608:      publicClient.readContract({ address: WALLET_TOKENS[inputSymbol].address, abi: ausdAbi, functionName: 'allowance', args: [kernelAccount.address, pairAddress] }),
    artifacts/ausd-wallet/services/passkey.ts:613:    if (decimals !== WALLET_TOKENS[inputSymbol].decimals) throw new Error(`Monad ${inputSymbol} reports ${decimals} decimals; expected ${WALLET_TOKENS[inputSymbol].decimals}.`);
    artifacts/ausd-wallet/services/passkey.ts:616:    if (![token0.toLowerCase(), token1.toLowerCase()].includes(WALLET_TOKENS[inputSymbol].address.toLowerCase()) ||
    artifacts/ausd-wallet/services/passkey.ts:617:        ![token0.toLowerCase(), token1.toLowerCase()].includes(WALLET_TOKENS[outputSymbol].address.toLowerCase())) {
    artifacts/ausd-wallet/services/passkey.ts:631:        to: WALLET_TOKENS[inputSymbol].address,
    artifacts/ausd-wallet/services/passkey.ts:641:          args: [requestedAmount, BigInt(acceptedQuote.amountOutRaw), [WALLET_TOKENS[inputSymbol].address, WALLET_TOKENS[outputSymbol].address], recipient as Address, swapDeadline],
    artifacts/ausd-wallet/services/passkey.ts:646:          args: [requestedAmount, amountInMax, [WALLET_TOKENS[inputSymbol].address, WALLET_TOKENS[outputSymbol].address], recipient as Address, swapDeadline],
    artifacts/ausd-wallet/services/passkey.ts:674:        const inputIsToken0 = token0.toLowerCase() === WALLET_TOKENS[inputSymbol].address.toLowerCase();
    artifacts/ausd-wallet/services/passkey.ts:690:      amountIn: formatUnits(actualAmountIn, WALLET_TOKENS[inputSymbol].decimals),
    artifacts/ausd-wallet/services/indexed-activity.ts:4:const GRAPHQL_URL = process.env.EXPO_PUBLIC_ENVIO_GRAPHQL_URL?.trim();
    artifacts/ausd-wallet/services/indexed-activity.ts:6:const CTK_ADDRESS = '0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D'.toLowerCase();
    artifacts/ausd-wallet/services/indexed-activity.ts:114:    : transfer.token.toLowerCase() === CTK_ADDRESS ? 'CTK' : 'Token';
    artifacts/ausd-wallet/services/indexed-activity.ts:115:  const decimals = token === 'CTK' ? 18 : 6;
    artifacts/ausd-wallet/services/settlement.ts:10:import { WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/services/settlement.ts:208:  const input = WALLET_TOKENS[inputSymbol];
    artifacts/ausd-wallet/services/settlement.ts:209:  const output = WALLET_TOKENS[outputSymbol];
    artifacts/ausd-wallet/services/settlement.ts:267: * live AUSD→CTK quote. This does not call a state-changing swap function.
    artifacts/ausd-wallet/services/settlement.ts:274:  return simulateTokenSwap('AUSD', 'CTK', amount, senderAddress, quoteMode);
    artifacts/ausd-wallet/app/review.tsx:18:import { getWalletToken, WALLET_TOKENS } from '@/services/tokens';
    artifacts/ausd-wallet/app/review.tsx:46:  const outputToken = getWalletToken(params.outputToken, tokenSwap ? 'USDC' : 'CTK');
    artifacts/ausd-wallet/app/review.tsx:189:            {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} <Text style={[styles.amountUnit, { color: colors.mutedForeground }]}>{sendToken}</Text>
    artifacts/ausd-wallet/app/review.tsx:215:              ? quoteOutput ? `${Number(quoteOutput).toLocaleString('en-US', { maximumFractionDigits: WALLET_TOKENS[outputToken].decimals })} ${outputToken}` : 'Quote unavailable'
    artifacts/ausd-wallet/app/review.tsx:216:              : `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} ${sendToken}`}
    artifacts/ausd-wallet/app/review.tsx:221:            {quoteTime ? `Quote from ${quoteTime} · ` : ''}{purchaseFeeRate > 0 ? `Pair fee ${(purchaseFeeRate * 100).toLocaleString('en-US', { maximumFractionDigits: 4 })}% is included. ` : 'The quoted output is protected by the reviewed minimum. '}{tokenSwap ? `${inputToken} to ${outputToken}` : 'CTK is the testnet settlement token.'}
    artifacts/ausd-wallet/app/success.tsx:60:          ? 'The Agora AUSD-to-CTK swap was included in a confirmed sponsored transaction.'
    artifacts/ausd-wallet/app/success.tsx:115:          ? 'CTK is a testnet mock payout token. This confirms the on-chain swap only; it is not a fiat payout. Receipt saved to Activity on this device.'
    artifacts/ausd-wallet/app/swap.tsx:9:import { STABLECOIN_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/app/swap.tsx:19:  const [outputToken, setOutputToken] = useState<WalletToken>('CTK');
    artifacts/ausd-wallet/app/swap.tsx:40:  const enteredDecimals = WALLET_TOKENS[enteredToken].decimals;
    artifacts/ausd-wallet/app/swap.tsx:90:      setInputToken('AUSD'); setOutputToken('CTK');
    artifacts/ausd-wallet/app/swap.tsx:102:        <Body>Trade the live AUSD/CTK pair. Your passkey approves the swap on Monad testnet.</Body>
    artifacts/ausd-wallet/app/swap.tsx:130:      <TokenSelector label="TO" value={outputToken} options={route === 'stablecoin' ? STABLECOIN_TOKENS : ['CTK']} onChange={chooseOutput} colors={colors} />
    artifacts/ausd-wallet/app/swap.tsx:149:      <InlineNotice icon={route === 'instant-settlement' ? 'zap' : 'info'}>{route === 'instant-settlement' ? 'Agora Instant Settlement uses the AUSD/CTK Monad testnet pair required for the hackathon.' : 'The stablecoin route uses a live AUSD/USDC pair when the Monad factory has liquidity for it.'}</InlineNotice>
    artifacts/ausd-wallet/app/receive.tsx:9:import { TRANSFER_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/app/receive.tsx:86:            {TRANSFER_TOKENS.map((option) => (
    artifacts/ausd-wallet/app/send.tsx:22:import { TRANSFER_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/app/send.tsx:115:      setError(`Enter an amount with up to ${WALLET_TOKENS[sendMode === 'settlement' ? 'AUSD' : token].decimals} decimal places.`);
    artifacts/ausd-wallet/app/send.tsx:196:                {TRANSFER_TOKENS.map((option) => (
    artifacts/ausd-wallet/app/send.tsx:249:                    {quoteLoading ? 'Updating…' : quote ? `${Number(quote.amountOut).toLocaleString('en-US', { maximumFractionDigits: quote.outputDecimals })} CTK` : '— CTK'}
    artifacts/ausd-wallet/app/send.tsx:253:                  {quoteError || (quote ? 'Agora fixed-price pair · CTK is a testnet mock payout token' : 'Enter an amount to get an Agora testnet quote.')}
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:111:            const receivedCurrency = transfer.receivedCurrency ?? (settlement ? transfer.quoteSymbol ?? 'CTK' : transfer.currency);
    artifacts/ausd-wallet/app/(tabs)/index.tsx:133:                  {openAction === 'deposit' ? 'Get AUSD into your wallet.' : 'Swap AUSD to CTK on Monad testnet.'}
    artifacts/ausd-wallet/app/(tabs)/index.tsx:154:                    <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>AUSD → CTK on Monad testnet via Agora. CTK is a test token, not a stablecoin or fiat payout.</Text>
    ✗ (2) • 39ms

## Activity

    $ sed -n '360,430p' artifacts/ausd-wallet/services/passkey.ts && sed -n '470,560p' artifacts/ausd-wallet/services/passkey.ts
      }
    }
    
    /** Opens Mera-encrypted app state without exposing or persisting PRF output. */
    export async function decryptWithMeraPasskey(account: MeraPasskeyProfile, vault: unknown) {
      const mera = await import('@category-labs/mera');
      const webAuthnClient = await getNativeWebAuthnClient();
      const plaintext = await mera.decryptSecretVaultWithPasskey({
        rpId: account.rpId,
        vault: mera.parseSecretVault(vault),
        ...(webAuthnClient ? { webAuthnClient } : {}),
      });
      try {
        return new TextDecoder().decode(plaintext);
      } finally {
        plaintext.fill(0);
      }
    }
    
    export async function authenticateMeraPasskey(account: MeraPasskeyProfile): Promise<string> {
      const signer = await getMeraViemSigner(account);
      try {
        const kernelAccount = await createKernelAccount(signer.owner);
        if (kernelAccount.address.toLowerCase() !== account.address.toLowerCase()) {
          throw new Error('This passkey smart account does not match the wallet saved on this device.');
        }
        return signer.owner.address;
      } finally {
        signer.session.end();
      }
    }
    
    export async function getAUSDBalance(account: string) {
      return getTokenBalance(account, 'AUSD');
    }
    
    export async function getUSDCBalance(account: string) {
      return getTokenBalance(account, 'USDC');
    }
    
    export async function getTokenBalance(account: string, token: WalletToken) {
      if (!isAddress(account, { strict: false })) throw new Error('Invalid Monad wallet address.');
      const info = WALLET_TOKENS[token];
      const [decimals, rawBalance] = await Promise.all([
        publicClient.readContract({ address: info.address, abi: balanceAbi, functionName: 'decimals' }),
        publicClient.readContract({ address: info.address, abi: balanceAbi, functionName: 'balanceOf', args: [account as Address] }),
      ]);
      if (decimals !== info.decimals) throw new Error(`Monad ${token} reports ${decimals} decimals; expected ${info.decimals}.`);
      return formatUnits(rawBalance, decimals);
    }
    
    export interface SponsoredTransferResult {
      transactionHash: `0x${string}`;
      accountAddress: Address;
      blockNumber: bigint;
    }
    
    export interface SponsoredSettlementResult extends SponsoredTransferResult {
      pairAddress: Address;
      amountIn: string;
      amountOut: string;
      inputSymbol: WalletToken;
      outputSymbol: WalletToken;
    }
    
    export interface SponsoredCall {
      to: Address;
      data: Hex;
    }
    
    /**
        return {
          transactionHash,
          accountAddress: kernelAccount.address,
          blockNumber: receipt.blockNumber,
          logs: receipt.logs,
        };
      } finally {
        signer.session.end();
      }
    }
    
    export async function sendSponsoredAUSDTransfer(
      account: MeraPasskeyProfile,
      recipient: string,
      amount: string,
    ): Promise<SponsoredTransferResult> {
      return sendSponsoredTokenTransfer(account, recipient, amount, 'AUSD');
    }
    
    export async function sendSponsoredTokenTransfer(
      account: MeraPasskeyProfile,
      recipient: string,
      amount: string,
      token: WalletToken,
    ): Promise<SponsoredTransferResult> {
      if (!isAddress(recipient, { strict: false })) throw new Error('Enter a valid recipient wallet address.');
      if (recipient.toLowerCase() === account.address.toLowerCase()) throw new Error('Choose a recipient other than your own wallet.');
      const bundlerUrl = process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL?.trim();
      if (!bundlerUrl) throw new Error('Pimlico is not configured. Set EXPO_PUBLIC_PIMLICO_BUNDLER_URL and rebuild or restart the app.');
      if (!/^https:\/\//i.test(bundlerUrl)) throw new Error('The Pimlico bundler URL must use HTTPS.');
    
      let amountIn: bigint;
      try {
        amountIn = parseUnits(amount, WALLET_TOKENS[token].decimals);
      } catch {
        throw new Error(`Enter a valid ${token} amount with at most ${WALLET_TOKENS[token].decimals} decimal places.`);
      }
      if (amountIn <= 0n) throw new Error(`Enter a ${token} amount greater than zero.`);
    
      const signer = await getMeraViemSigner(account);
      try {
        const kernelAccount = await createKernelAccount(signer.owner);
        if (kernelAccount.address.toLowerCase() !== account.address.toLowerCase()) {
          throw new Error('The passkey-derived smart account changed. Stop and restore the matching wallet before sending.');
        }
        const [decimals, balance] = await Promise.all([
          publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'decimals' }),
          publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'balanceOf', args: [kernelAccount.address] }),
        ]);
        if (decimals !== WALLET_TOKENS[token].decimals) throw new Error(`Monad ${token} reports ${decimals} decimals; expected ${WALLET_TOKENS[token].decimals}.`);
        if (balance < amountIn) throw new Error(`Insufficient ${token} balance. This smart account holds ${formatUnits(balance, decimals)} ${token}.`);
    
        const pimlicoClient = createPaymasterClient({ transport: http(bundlerUrl) });
        const sponsorshipPolicyId = process.env.EXPO_PUBLIC_PIMLICO_POLICY_ID?.trim();
        const smartAccountClient = createSmartAccountClient({
          account: kernelAccount,
          chain: MONAD_CHAIN,
          client: publicClient,
          bundlerTransport: http(bundlerUrl),
          paymaster: pimlicoClient,
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
    
        const transactionHash = await smartAccountClient.sendTransaction({
          to: WALLET_TOKENS[token].address,
          data: encodeFunctionData({
            abi: ausdAbi,
            functionName: 'transfer',
            args: [recipient as Address, amountIn],
          }),
          value: 0n,
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: transactionHash, timeout: 120_000 });
        if (receipt.status !== 'success') throw new Error(`The sponsored ${token} transfer reverted on Monad testnet.`);
        return { transactionHash, accountAddress: kernelAccount.address, blockNumber: receipt.blockNumber };
      } finally {
        signer.session.end();
      }
    }
    
    export async function sendSponsoredInstantSettlementSwap(
      account: MeraPasskeyProfile,
      recipient: string,
      amount: string,
      acceptedQuote: { pairAddress: string; amountInRaw?: string; amountOutRaw: string; checkedAt: string; quoteMode?: 'exact-input' | 'exact-output' },
      allowSelfRecipient = false,
      inputSymbol: WalletToken = 'AUSD',
      outputSymbol: WalletToken = 'CTK',
    ): Promise<SponsoredSettlementResult> {
      if (!isAddress(recipient, { strict: false })) throw new Error('Enter a valid recipient wallet address.');
    ✓ • 15.14s

## Activity

    $ sed -n '1,240p' artifacts/ausd-wallet/README.md && sed -n '1,200p' artifacts/ausd-wallet/app.config.ts
    # AUSD Wallet
    
    Expo mobile wallet prototype for AUSD payments. New users move through a three-screen swipe introduction, then create a Mera passkey account. Mera authenticates wallet actions, direct AUSD transfers and Agora Instant Settlement swaps can submit sponsored transactions on Monad testnet, and CTK is used as a mock payout token. Aurora Intents can quote cross-chain deposits into Monad AUSD and provide a temporary source-chain deposit address.
    
    ## Passkey setup
    
    Mera uses WebAuthn PRF support. It is supported in React Native on iOS 18+ and Android 9+; native builds need `react-native-passkey` autolinked into the app (use a development or production build, not Expo Go).
    
    Set `EXPO_PUBLIC_RP_ID` to the hostname that will own the passkey. It must be a verified HTTPS domain and match the app’s native domain associations. If omitted, the Expo development domain is used when available. Native builds also accept:
    
    - `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    - `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
    - `AUSD_ANDROID_PACKAGE` (defaults to `com.ausd.wallet`)
    - `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
    
    The Expo config adds iOS Associated Domains and the Android verified web link when an RP ID is set. The app server serves `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json` from the variables above. Publish the server on the same HTTPS hostname as the RP ID. The association endpoints respond with a configuration error until the platform signing values are provided.
    
    Mera credential IDs and transports are stored locally so the user can authenticate again. The PRF output is converted into the standard EVM BIP-44 account key at `m/44'/60'/0'/0/0`; the PRF output, derived key, seed, and signing session are cleared after deriving the address and are not persisted.
    
    ## Monad testnet transfers and settlement
    
    The Mera PRF derives a standard EVM BIP-44 owner and a Kernel v0.3.1 smart account (EntryPoint v0.7). Direct sends authenticate with Mera and submit an AUSD transfer through a sponsored UserOperation. Agora settlement re-reads its AUSD→CTK quote, checks it has not changed, then submits the approved testnet settlement flow through a sponsored UserOperation. CTK is a test token, not a fiat payout. These actions can move test tokens on Monad testnet; do not use mainnet funds.
    
    Savings goals create pockets in the deployed Monad testnet `SavingsPockets` contract. Deposits batch an exact-amount AUSD approval with the pocket deposit; payments with auto-save batch an exact-amount approval when needed with the recipient payment and pocket allocation. The send review shows the recipient payment, auto-save amount, and total AUSD debit before Mera passkey approval. Pocket creation does not move AUSD. Legacy goals without a pocket remain labeled as local-only tracking. Confirm each transaction only after checking the recipient and total debit; sponsorship is requested, not guaranteed.
    
    Set `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` to an Alchemy Monad testnet RPC URL to route balance and Agora quote reads through Alchemy. The app falls back to Monad's public testnet RPC when this variable is absent. `EXPO_PUBLIC_*` values are embedded in the app bundle; use a dedicated testnet key with appropriate limits and keep local environment files out of version control.
    
    Aurora Intents deposits require `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`, created in [Aurora Intents Studio](https://studio.aurora.dev/). Add it to local environment as shown in `.env.example`. For GitHub Actions builds, set it as the repository variable `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`; for Codemagic, add it to the `ausd_wallet` variable group. Restart or rebuild after configuring. The key is public and embedded in the app bundle. The app loads supported assets, selects the configured Monad AUSD contract, requests a quote, shows the generated deposit address and any required memo, and can query transaction status. The user sends the source token from an external wallet; the app does not sign or submit that source-chain transfer. Always follow the quoted source chain, token, amount, address, memo, and expiry.
    
    Agora's unauthenticated public metrics endpoint appears on Profile. Add and Cash out tabs describe a planned Alchemy Pay connection; they do not launch checkout or submit a payout. Card issuing is not enabled. Agora's testnet swap is enabled through the existing send/review flow.
    
    ## Android demo APK on Codemagic
    
    The repository-root `codemagic.yaml` generates the Android native project with Expo prebuild, builds the bundled `assembleRelease` app, and archives `artifacts/ausd-wallet/android/app/build/outputs/apk/release/*.apk`. The workflow installs the pnpm workspace lockfile and runs on pushes to `main`.
    
    Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    
    ## Android APK on GitHub Actions
    
    The `.github/workflows/build-android-apk.yml` workflow builds the bundled app APK on every push and can also be started from the repository's **Actions** tab with **Run workflow**. After a successful run, download `ausd-wallet-android-<commit>` from that run's artifacts. Artifacts are retained for 14 days. This is a release-variant APK for demo installation, not a Play Store-signed production release.
    
    To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    
    ## Commands
    
    - `pnpm --filter @workspace/ausd-wallet run dev` — start the Expo app
    - `pnpm --filter @workspace/ausd-wallet run dev:client` — start Metro for an installed native development build
    - `pnpm --filter @workspace/ausd-wallet run typecheck` — typecheck the app
    - `pnpm --filter @workspace/ausd-wallet run build` — create its static Expo build
    
    ## Install an Android passkey build
    
    Expo Go cannot load Mera’s native passkey module. Build and install the Android development APK once, then use `dev:client` for JavaScript iteration:
    
    1. Set `EXPO_PUBLIC_RP_ID` to the public HTTPS hostname configured for passkeys, and publish the Android asset links file with the package name and signing certificate SHA-256 fingerprint.
    2. Run `eas build --platform android --profile development` to produce an installable APK.
    3. Install that APK on an Android 9+ device, then run `pnpm --filter @workspace/ausd-wallet run dev:client` and open the app.
    
    The current Expo Go preview remains useful for the UI, but passkey creation and authentication only work in the native development build (or supported web browser).
    
    ## Payment requests and indexed activity
    
    Receive creates an AUSD payment-request QR code and share link. Send can scan the request and prefill its recipient and optional amount for review; the sender must still approve with their passkey. Camera permission is requested only when scanning.
    
    The private contacts book stores user-chosen names with confirmed smart-account addresses in a Mera-encrypted vault on device. Contacts can be exported and restored as encrypted data with the same passkey and RP domain. Selecting a contact pre-fills Send and shows the saved name during transaction review; there is no global username directory.
    
    The Envio indexer is in `artifacts/wallet-indexer`. In Envio Cloud, set **Root Directory** to `artifacts/wallet-indexer` and **Config File** to `config.yaml`; that directory contains the exact Envio version pin Cloud checks. The indexer pins Envio `3.14.0`, pnpm `10.32.0`, and Node 24+. Deploy it, then set its public GraphQL URL as the GitHub Actions repository variable `EXPO_PUBLIC_ENVIO_GRAPHQL_URL`. Set the same variable in the local wallet environment to use indexed activity during development. It indexes Monad testnet AUSD and CTK `Transfer` events starting from the configured latest block. If the URL is missing or unavailable, the activity screen falls back to transfers saved on the device.
    import type { ConfigContext } from 'expo/config';
    import { withAndroidManifest, withStringsXml, type ConfigPlugin } from 'expo/config-plugins';
    
    function domainHost(value?: string) {
      if (!value) return undefined;
      try {
        return new URL(value.includes('://') ? value : `https://${value}`).hostname;
      } catch {
        return undefined;
      }
    }
    
    const withPasskeyAssetStatements = (rpId: string): ConfigPlugin => (config) => {
      const statement = `[{\"include\":\"https://${rpId}/.well-known/assetlinks.json\"}]`;
    
      config = withStringsXml(config, (config) => {
        const strings = config.modResults.resources.string ?? [];
        const existing = strings.find((item) => item.$.name === 'asset_statements');
        if (existing) {
          existing._ = statement;
          existing.$.translatable = 'false';
        } else {
          strings.push({
            $: { name: 'asset_statements', translatable: 'false' },
            _: statement,
          });
        }
        config.modResults.resources.string = strings;
        return config;
      });
    
      return withAndroidManifest(config, (config) => {
        const application = config.modResults.manifest.application?.[0];
        if (!application) return config;
        const metadata = application['meta-data'] ?? [];
        const existing = metadata.find((item) => item.$['android:name'] === 'asset_statements');
        if (existing) {
          existing.$['android:resource'] = '@string/asset_statements';
          delete existing.$['android:value'];
        } else {
          metadata.push({
            $: {
              'android:name': 'asset_statements',
              'android:resource': '@string/asset_statements',
            },
          });
        }
        application['meta-data'] = metadata;
        return config;
      });
    };
    
    export default ({ config }: ConfigContext) => {
      const rpId = domainHost(process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN || "auth.vic-ezealor.workers.dev");
      const bundleIdentifier = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
      const androidPackage = process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet';
    
      const appConfig = {
        ...config,
        name: config.name ?? 'AUSD Wallet',
        slug: config.slug ?? 'ausd-wallet',
        version: config.version ?? '0.1.0',
        ios: {
          ...config.ios,
          bundleIdentifier,
          supportsTablet: false,
          ...(rpId ? { associatedDomains: [`webcredentials:${rpId}`] } : {}),
        },
        android: {
          ...config.android,
          package: androidPackage,
          ...(rpId
            ? {
                intentFilters: [
                  {
                    action: 'VIEW',
                    autoVerify: true,
                    data: [{ scheme: 'https', host: rpId }],
                    category: ['BROWSABLE', 'DEFAULT'],
                  },
                ],
              }
            : {}),
        },
      };
    
      return rpId ? withPasskeyAssetStatements(rpId)(appConfig) : appConfig;
    };
    ✓ • 1.70s

## Activity

    $ sed -n '70,175p' artifacts/ausd-wallet/app/review.tsx && sed -n '1,120p' artifacts/ausd-wallet/app/send.tsx
          return;
        }
        if (profile.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
          setError('A Mera passkey wallet is required to send AUSD. Demo wallets cannot submit transactions.');
          return;
        }
        if (!isAddress(recipient, { strict: false })) {
          setError('Enter a valid Monad-compatible wallet address for the recipient.');
          return;
        }
        if (!Number.isFinite(amount) || amount <= 0) {
          setError('Enter a valid amount before reviewing the transfer.');
          return;
        }
        setError('');
        setBusy(true);
        try {
          const account = {
            address: profile.address,
            signerAddress: profile.signerAddress,
            credential: profile.passkey.credential,
            rpId: profile.passkey.rpId,
          };
          if (autoSave && (!pocketId || !goalName || !autoSaveBreakdown)) {
            throw new Error('The reviewed savings pocket details are missing or invalid. Return to the send form and review again.');
          }
          const result = autoSave
            ? await payWithAutoSaveSponsored(account, recipient, pocketId, autoSaveBps, String(params.amount))
            : settlement
              ? await sendSponsoredInstantSettlementSwap(account, recipient, swapOnly ? String(params.swapAmount ?? params.amount) : String(params.amount), {
                pairAddress: typeof params.pairAddress === 'string' ? params.pairAddress : '',
                amountInRaw: typeof params.quoteInputRaw === 'string' ? params.quoteInputRaw : undefined,
                amountOutRaw: typeof params.quoteOutputRaw === 'string' ? params.quoteOutputRaw : '',
                checkedAt: typeof params.quoteCheckedAt === 'string' ? params.quoteCheckedAt : '',
                quoteMode: params.quoteMode === 'exact-output' ? 'exact-output' : 'exact-input',
              }, swapOnly, inputToken, outputToken)
              : await sendSponsoredTokenTransfer(account, recipient, String(params.amount), getWalletToken(params.token, 'AUSD'));
          const settlementResult = settlement ? result as SponsoredSettlementResult : null;
          const autoSaveResult = autoSave ? result as Awaited<ReturnType<typeof payWithAutoSaveSponsored>> : null;
          const sentAmount = autoSaveResult
            ? Number(autoSaveResult.totalDebit)
            : settlementResult ? Number(settlementResult.amountIn) : amount;
          const receivedAmount = settlementResult ? Number(settlementResult.amountOut) : amount;
          const sentCurrency = autoSaveResult ? 'AUSD' : settlementResult?.inputSymbol ?? getWalletToken(params.token, 'AUSD');
          const receivedCurrency = settlementResult?.outputSymbol ?? sentCurrency;
          const transfer = {
            id: result.transactionHash,
            recipient,
            amount: sentAmount,
            currency: sentCurrency,
            receivedAmount,
            receivedCurrency,
            settlementKind: settlement
              ? 'agora-instant-settlement' as const
              : autoSaveResult ? 'savings-auto-save' as const : 'direct' as const,
            ...(autoSaveResult ? {
              savedAmount: Number(autoSaveResult.savedAmount),
              totalDebited: Number(autoSaveResult.totalDebit),
              paymentAmount: Number(autoSaveResult.paymentAmount),
              savingsPocketId: pocketId,
              savingsGoalName: goalName,
            } : {}),
            createdAt: new Date().toISOString(),
            mode: profile.mode,
            transactionHash: result.transactionHash,
            sponsored: true,
            ...(settlementResult ? { pairAddress: settlementResult.pairAddress, quoteOutput: settlementResult.amountOut, quoteSymbol: settlementResult.outputSymbol } : {}),
          };
          let historyWarning = '';
          try {
            await addTransfer(transfer);
          } catch {
            // The chain receipt is already confirmed. Never present this as a
            // failed payment or encourage a retry that could send funds twice.
            historyWarning = 'The transaction is confirmed, but Activity could not save its local receipt. Keep the transaction hash below and do not resubmit.';
          }
          router.replace({
            pathname: '/success',
            params: {
              recipient: transfer.recipient,
              amount: autoSaveResult?.paymentAmount ?? String(sentAmount),
              currency: sentCurrency,
              receiveAmount: String(receivedAmount),
              receiveCurrency: receivedCurrency,
              settlement: settlement ? 'agora' : 'direct',
              autoSave: autoSaveResult ? 'true' : 'false',
              goalName,
              paymentAmount: autoSaveResult?.paymentAmount ?? '',
              autoSavedAmount: autoSaveResult?.savedAmount ?? '',
              totalDebit: autoSaveResult?.totalDebit ?? '',
              historyWarning,
              id: transfer.id,
              transactionHash: result.transactionHash,
              accountAddress: result.accountAddress,
              blockNumber: result.blockNumber.toString(),
            },
          });
        } catch (caught) {
          setError(
            caught instanceof Error
              ? caught.message
              : 'The sponsored transfer failed. No receipt was recorded.',
          );
        } finally {
          setBusy(false);
        }
    import React, { useEffect, useState } from 'react';
    import {
      KeyboardAvoidingView,
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
    import { isAddress } from 'viem';
    import { Feather } from '@expo/vector-icons';
    import { useSafeAreaInsets } from 'react-native-safe-area-context';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { getTokenBalance } from '@/services/passkey';
    import { simulateSettlementSwap, type SettlementQuote } from '@/services/settlement';
    import { TRANSFER_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    import { PrimaryButton } from '@/components/Primitives';
    
    const money = (amount: number) =>
      amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
    
    export default function SendDrawer() {
      const params = useLocalSearchParams<{ recipient?: string; recipientName?: string; token?: string }>();
      const colors = useColors();
      const insets = useSafeAreaInsets();
      const { height: windowHeight } = useWindowDimensions();
      const { profile, balance: demoBalance } = useWallet();
      const [recipient, setRecipient] = useState('');
      const [recipientName, setRecipientName] = useState('');
      const [amount, setAmount] = useState('');
      const [availableBalance, setAvailableBalance] = useState<number | null>(null);
      const [balanceError, setBalanceError] = useState('');
      const [error, setError] = useState('');
      const [sendMode, setSendMode] = useState<'direct' | 'settlement'>('direct');
      const [token, setToken] = useState<WalletToken>('AUSD');
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
    
      useEffect(() => {
        if (params.recipient) {
          setRecipient(params.recipient);
          setRecipientName(params.recipientName ?? '');
        }
      }, [params.recipient, params.recipientName]);
    
      useEffect(() => {
        if (params.token === 'AUSD' || params.token === 'USDC') setToken(params.token);
      }, [params.token]);
    
      useEffect(() => {
        if (profile?.mode !== 'mera' || !profile.address) return;
        let active = true;
        getTokenBalance(profile.address, sendMode === 'settlement' ? 'AUSD' : token)
          .then((value) => { if (active) setAvailableBalance(Number(value)); })
          .catch((caught: unknown) => {
            if (active) setBalanceError(caught instanceof Error ? caught.message : 'Balance unavailable');
          });
        return () => { active = false; };
      }, [sendMode, token, profile?.address, profile?.mode]);
    
      const balance = profile?.mode === 'mera' ? availableBalance : demoBalance;
    
      useEffect(() => {
        setQuote(null);
        setQuoteError('');
        if (sendMode !== 'settlement' || profile?.mode !== 'mera' || !profile.address || !/^\d+(\.\d{1,6})?$/.test(amount) || Number(amount) <= 0) {
          setQuoteLoading(false);
          return;
        }
        let active = true;
        const timer = setTimeout(() => {
          setQuoteLoading(true);
          simulateSettlementSwap(amount, profile.address!)
            .then((result) => { if (active) setQuote(result); })
            .catch((caught: unknown) => {
              if (active) setQuoteError(caught instanceof Error ? caught.message : 'Agora quote unavailable.');
            })
            .finally(() => { if (active) setQuoteLoading(false); });
        }, 350);
        return () => { active = false; clearTimeout(timer); };
      }, [amount, sendMode, profile?.address, profile?.mode]);
    
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
        if (!/^\d+(\.\d{1,6})?$/.test(amount) || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
          setError(`Enter an amount with up to ${WALLET_TOKENS[sendMode === 'settlement' ? 'AUSD' : token].decimals} decimal places.`);
          return;
        }
        if (balance === null) {
          setError(balanceError || 'Loading your testnet balance…');
          return;
    ✓ • 0ms

## Activity

    $ rg -n "AUSD|USDC|CTK|Transfer" artifacts/wallet-indexer
    artifacts/wallet-indexer/src/handlers.ts:6:    event: "Transfer",
    artifacts/wallet-indexer/src/handlers.ts:10:    context.TokenTransfer.set({
    artifacts/wallet-indexer/schema.graphql:1:type TokenTransfer {
    artifacts/wallet-indexer/config.yaml:3:description: AUSD, CTK, and savings pocket activity on Monad testnet
    artifacts/wallet-indexer/config.yaml:7:      - event: "Transfer(address indexed from, address indexed to, uint256 value)"
    ✓ • 1.17s

## Activity

    $ git status --short && git log -1 --oneline
    ?? codex-session-assetstatement.md
    6312de7 chandef app config
    ✓ • 0ms

## Activity

    $ sed -n '1,180p' artifacts/wallet-indexer/config.yaml && sed -n '1,120p' artifacts/wallet-indexer/src/handlers.ts && sed -n '1,100p' artifacts/wallet-indexer/schema.graphql
    # yaml-language-server: $schema=./node_modules/envio/evm.schema.json
    name: ausd-wallet-activity
    description: AUSD, CTK, and savings pocket activity on Monad testnet
    contracts:
      - name: WalletToken
        events:
          - event: "Transfer(address indexed from, address indexed to, uint256 value)"
      - name: SavingsPockets
        events:
          - event: "PocketCreated(address indexed owner, bytes32 indexed pocketId)"
          - event: "AutoSaveRateUpdated(address indexed owner, bytes32 indexed pocketId, uint16 bps)"
          - event: "Deposited(address indexed owner, bytes32 indexed pocketId, uint256 amount)"
          - event: "Withdrawn(address indexed owner, bytes32 indexed pocketId, address indexed recipient, uint256 amount)"
          - event: "PaymentSent(address indexed owner, bytes32 indexed pocketId, address indexed recipient, uint256 paymentAmount, uint256 savedAmount)"
          - event: "Gifted(address indexed donor, address indexed recipientOwner, bytes32 indexed pocketId, uint256 amount)"
          - event: "PersonGifted(address indexed donor, address indexed recipientOwner, uint256 amount)"
          - event: "GiftAllocated(address indexed recipientOwner, bytes32 indexed pocketId, uint256 amount)"
          - event: "GiftWithdrawn(address indexed recipientOwner, address indexed recipient, uint256 amount)"
    chains:
      - id: 10143
        start_block: 69501034
        rpc:
          - url: https://testnet-rpc.monad.xyz
        contracts:
          - name: WalletToken
            address:
              - "0xa9012a055bd4e0eDfF8Ce09f960291C09D5322dC"
              - "0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D"
          - name: SavingsPockets
            address:
              - "0xff17b04d8d71698295586678f6a6b7452587cf14"
    import { indexer } from "envio";
    
    indexer.onEvent(
      {
        contract: "WalletToken",
        event: "Transfer",
        fields: { transaction: ["hash"], block: ["timestamp"] },
      },
      async ({ event, context }) => {
        context.TokenTransfer.set({
          id: `${event.chainId}-${event.transaction.hash}-${event.logIndex}`,
          token: event.srcAddress.toLowerCase(),
          from: event.params.from.toLowerCase(),
          to: event.params.to.toLowerCase(),
          value: event.params.value,
          transactionHash: event.transaction.hash,
          blockNumber: BigInt(event.block.number),
          timestamp: BigInt(event.block.timestamp),
        });
      },
    );
    
    const SAVINGS_CONTRACT = "SavingsPockets" as const;
    
    function saveSavingsActivity(context: any, event: any, values: Record<string, unknown>) {
      context.SavingsActivity.set({
        id: `${event.chainId}-${event.transaction.hash}-${event.logIndex}`,
        transactionHash: event.transaction.hash,
        blockNumber: BigInt(event.block.number),
        timestamp: BigInt(event.block.timestamp),
        ...values,
      });
    }
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "PocketCreated", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "pocket-created", owner: event.params.owner.toLowerCase(), pocketId: event.params.pocketId });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "AutoSaveRateUpdated", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "autosave-rate-updated", owner: event.params.owner.toLowerCase(), pocketId: event.params.pocketId, autoSaveBps: Number(event.params.bps) });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "Deposited", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "deposited", owner: event.params.owner.toLowerCase(), pocketId: event.params.pocketId, amount: event.params.amount });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "Withdrawn", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "withdrawn", owner: event.params.owner.toLowerCase(), pocketId: event.params.pocketId, counterparty: event.params.recipient.toLowerCase(), amount: event.params.amount });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "PaymentSent", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "payment-autosave", owner: event.params.owner.toLowerCase(), pocketId: event.params.pocketId, counterparty: event.params.recipient.toLowerCase(), paymentAmount: event.params.paymentAmount, savedAmount: event.params.savedAmount });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "Gifted", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "pocket-gift", owner: event.params.donor.toLowerCase(), pocketId: event.params.pocketId, counterparty: event.params.recipientOwner.toLowerCase(), amount: event.params.amount });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "PersonGifted", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "person-gift", owner: event.params.donor.toLowerCase(), counterparty: event.params.recipientOwner.toLowerCase(), amount: event.params.amount });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "GiftAllocated", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "gift-allocated", owner: event.params.recipientOwner.toLowerCase(), pocketId: event.params.pocketId, amount: event.params.amount });
    });
    
    indexer.onEvent({ contract: SAVINGS_CONTRACT, event: "GiftWithdrawn", fields: { transaction: ["hash"], block: ["timestamp"] } }, async ({ event, context }) => {
      saveSavingsActivity(context, event, { kind: "gift-withdrawn", owner: event.params.recipientOwner.toLowerCase(), counterparty: event.params.recipient.toLowerCase(), amount: event.params.amount });
    });
    type TokenTransfer {
      id: ID!
      token: String! @index
      from: String! @index
      to: String! @index
      value: BigInt!
      transactionHash: String!
      blockNumber: BigInt!
      timestamp: BigInt!
    }
    
    type SavingsActivity {
      id: ID!
      kind: String! @index
      owner: String! @index
      pocketId: String @index
      counterparty: String
      amount: BigInt
      paymentAmount: BigInt
      savedAmount: BigInt
      autoSaveBps: Int
      transactionHash: String!
      blockNumber: BigInt!
      timestamp: BigInt!
    }
    ✓ • 0ms

## Assistant

I found the three home-tab issues. No code changed.

1. Refresh is missing  
   Home fetches AUSD, USDC, and indexed activity only once when the screen mounts. There is no pull-to-refresh, refresh button, or refetch function. See [home tab](/home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx:18) and [activity hook](/home/runner/workspace/artifacts/ausd-wallet/services/indexed-activity.ts:71).

2. Assets are hard-coded  
   The home UI always renders exactly AUSD and USDC in [home tab](/home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx:174). The wallet already has CTK token metadata, but it is excluded from the visible asset list by design in [tokens.ts](/home/runner/workspace/artifacts/ausd-wallet/services/tokens.ts:3). Supporting user-added assets needs a persisted token registry and generic ERC-20 metadata/balance reads; we can initially limit this to displaying tracked assets on Home.

3. The missing 20 USDC activity has a concrete root cause  
   The app asks Envio for USDC transfers, but the deployed indexer configuration only watches AUSD and CTK addresses. USDC’s contract address is absent from [wallet-indexer config](/home/runner/workspace/artifacts/wallet-indexer/config.yaml:22). An externally sent USDC transfer therefore cannot enter Recent activity. The fallback only shows transfers created inside this app, so it cannot recover an external receipt.

Recommended small sequence:

1. Add a single Home refresh action that reloads balances and indexed activity.
2. Add USDC to the indexer, deploy it, and ensure the wallet build has `EXPO_PUBLIC_ENVIO_GRAPHQL_URL`.
3. Make Home’s asset list data-driven, then add an “Add asset” flow that saves validated ERC-20 token contracts locally.

There is also an existing untracked file, `codex-session-assetstatement.md`; I did not touch it.

## User

alright do that and downgrade the envio sdk in indexer to 3.10.0 so it can deploy well

## Assistant

I’ll implement the Home refresh, a locally saved “add asset” list for ERC-20 balances, and the USDC indexer contract entry. I’ll also pin the indexer’s Envio SDK to 3.10.0 and update its lockfile so the deployment uses that version.

## Activity

    $ sed -n '1,260p' artifacts/ausd-wallet/state/wallet-context.tsx && sed -n '1,160p' artifacts/ausd-wallet/package.json
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import * as SecureStore from 'expo-secure-store';
    import { Platform } from 'react-native';
    import React, {
      createContext,
      useCallback,
      useContext,
      useEffect,
      useMemo,
      useState,
    } from 'react';
    import type { PasskeyCredentialMetadata } from '@category-labs/mera';
    
    const LEGACY_STORAGE_KEY = 'ausd-wallet-state-v1';
    const PROFILE_STORAGE_KEY = 'ausd-wallet-profile-v2';
    const TRANSFERS_STORAGE_KEY = 'ausd-wallet-transfers-v2';
    const INTRO_STORAGE_KEY = 'ausd-wallet-intro-complete-v1';
    const DEMO_BALANCE = 1248.5;
    
    export type WalletMode = 'demo' | 'mera';
    
    export interface WalletProfile {
      displayName: string;
      email: string;
      address?: string;
      signerAddress?: string;
      mode: WalletMode;
      passkey?: {
        credential: PasskeyCredentialMetadata;
        rpId: string;
      };
    }
    
    export interface Transfer {
      id: string;
      recipient: string;
      amount: number;
      paymentAmount?: number;
      savedAmount?: number;
      totalDebited?: number;
      savingsPocketId?: string;
      savingsGoalName?: string;
      currency: string;
      receivedAmount: number;
      createdAt: string;
      mode: WalletMode;
      contractPresent?: boolean;
      pairAddress?: string;
      quoteOutput?: string;
      quoteSymbol?: string;
      transactionHash?: string;
      sponsored?: boolean;
      settlementKind?: 'direct' | 'agora-instant-settlement' | 'savings-auto-save';
      receivedCurrency?: string;
    }
    
    interface WalletState {
      profile: WalletProfile | null;
      transfers: Transfer[];
    }
    
    interface WalletContextValue extends WalletState {
      ready: boolean;
      authenticated: boolean;
      introComplete: boolean;
      storageError: string;
      balance: number;
      completeIntro: () => Promise<void>;
      completeOnboarding: (profile: WalletProfile) => Promise<void>;
      addTransfer: (transfer: Transfer) => Promise<void>;
      unlockWallet: () => void;
      lockWallet: () => void;
      resetWallet: () => Promise<void>;
    }
    
    const WalletContext = createContext<WalletContextValue | null>(null);
    
    export function WalletProvider({ children }: { children: React.ReactNode }) {
      const [state, setState] = useState<WalletState>({ profile: null, transfers: [] });
      const [ready, setReady] = useState(false);
      const [authenticated, setAuthenticated] = useState(false);
      const [introComplete, setIntroComplete] = useState(false);
      const [storageError, setStorageError] = useState('');
    
      useEffect(() => {
        let active = true;
        async function hydrate() {
          try {
            const [legacyValue, transfersValue, profileValue, introValue] = await Promise.all([
              AsyncStorage.getItem(LEGACY_STORAGE_KEY),
              AsyncStorage.getItem(TRANSFERS_STORAGE_KEY),
              Platform.OS === 'web'
                ? AsyncStorage.getItem(PROFILE_STORAGE_KEY)
                : SecureStore.getItemAsync(PROFILE_STORAGE_KEY),
              AsyncStorage.getItem(INTRO_STORAGE_KEY),
            ]);
            const legacy = legacyValue ? JSON.parse(legacyValue) as WalletState : null;
            const legacyProfile = legacy?.profile?.mode === 'mera' ? legacy.profile : null;
            const profile = profileValue
              ? JSON.parse(profileValue) as WalletProfile
              : legacyProfile;
            const transfers = transfersValue
              ? JSON.parse(transfersValue) as Transfer[]
              : Array.isArray(legacy?.transfers) ? legacy.transfers : [];
    
            // Migrate each value first. Keep the original combined record until both
            // destination writes have succeeded so a failed migration is recoverable.
            if (!profileValue && legacyProfile) {
              const serializedProfile = JSON.stringify(legacyProfile);
              if (Platform.OS === 'web') await AsyncStorage.setItem(PROFILE_STORAGE_KEY, serializedProfile);
              else await SecureStore.setItemAsync(PROFILE_STORAGE_KEY, serializedProfile);
            }
            if (!transfersValue && legacy?.transfers) {
              await AsyncStorage.setItem(TRANSFERS_STORAGE_KEY, JSON.stringify(transfers));
            }
            if (legacyValue) await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
    
            if (!active) return;
            setState({ profile: profile?.mode === 'mera' ? profile : null, transfers });
            setIntroComplete(introValue === '1');
          } catch (caught) {
            if (!active) return;
            setState({ profile: null, transfers: [] });
            setStorageError(caught instanceof Error
              ? `Wallet data could not be opened. Your saved data was preserved. ${caught.message}`
              : 'Wallet data could not be opened. Your saved data was preserved.');
          }
        }
        void hydrate()
          .finally(() => {
            if (active) setReady(true);
          });
        return () => {
          active = false;
        };
      }, []);
    
      const persist = useCallback(async (next: WalletState) => {
        if (next.profile?.mode === 'mera') {
          const value = JSON.stringify(next.profile);
          if (Platform.OS === 'web') await AsyncStorage.setItem(PROFILE_STORAGE_KEY, value);
          else await SecureStore.setItemAsync(PROFILE_STORAGE_KEY, value);
        } else if (Platform.OS === 'web') {
          await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
        } else {
          await SecureStore.deleteItemAsync(PROFILE_STORAGE_KEY);
        }
        await AsyncStorage.setItem(TRANSFERS_STORAGE_KEY, JSON.stringify(next.transfers));
        setState(next);
      }, []);
    
      const completeIntro = useCallback(async () => {
        await AsyncStorage.setItem(INTRO_STORAGE_KEY, '1');
        setIntroComplete(true);
      }, []);
    
      const completeOnboarding = useCallback(
        async (profile: WalletProfile) => {
          if (profile.mode !== 'mera') throw new Error('A Mera passkey account is required.');
          await persist({ profile, transfers: state.transfers });
          setAuthenticated(true);
        },
        [persist, state.transfers],
      );
    
      const addTransfer = useCallback(
        async (transfer: Transfer) => {
          if (!state.profile) throw new Error('Set up a wallet before sending.');
          await persist({
            profile: state.profile,
            transfers: [transfer, ...state.transfers],
          });
        },
        [persist, state.profile, state.transfers],
      );
    
      const resetWallet = useCallback(async () => {
        if (Platform.OS === 'web') await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
        else await SecureStore.deleteItemAsync(PROFILE_STORAGE_KEY);
        await AsyncStorage.removeItem(TRANSFERS_STORAGE_KEY);
        await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
        setState({ profile: null, transfers: [] });
        setAuthenticated(false);
      }, []);
    
      const unlockWallet = useCallback(() => setAuthenticated(true), []);
      const lockWallet = useCallback(() => setAuthenticated(false), []);
    
      const value = useMemo(
        () => ({
          ...state,
          ready,
          authenticated,
          introComplete,
          storageError,
          balance: DEMO_BALANCE,
          completeIntro,
          completeOnboarding,
          addTransfer,
          unlockWallet,
          lockWallet,
          resetWallet,
        }),
        [state, ready, authenticated, introComplete, storageError, completeIntro, completeOnboarding, addTransfer, unlockWallet, lockWallet, resetWallet],
      );
    
      return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
    }
    
    export function useWallet() {
      const value = useContext(WalletContext);
      if (!value) throw new Error('useWallet must be used inside WalletProvider.');
      return value;
    }
    {
      "name": "@workspace/ausd-wallet",
      "version": "0.0.0",
      "private": true,
      "main": "expo-router/entry",
      "scripts": {
        "dev": "sh -c 'if [ -n \"$REPLIT_EXPO_SESSION_SECRET\" ]; then pnpm exec create-launch login --session \"$REPLIT_EXPO_SESSION_SECRET\" || true; fi' && EXPO_PACKAGER_PROXY_URL=https://$REPLIT_EXPO_DEV_DOMAIN EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN EXPO_PUBLIC_REPL_ID=$REPL_ID REACT_NATIVE_PACKAGER_HOSTNAME=$REPLIT_DEV_DOMAIN pnpm exec expo start --localhost --port $PORT",
        "dev:client": "expo start --dev-client",
        "build": "node scripts/build.js",
        "serve": "node server/serve.js",
        "typecheck": "tsc -p tsconfig.json --noEmit"
      },
      "devDependencies": {
        "@babel/core": "^7.25.2",
        "@expo-google-fonts/inter": "^0.4.0",
        "@expo/vector-icons": "^15.0.2",
        "@react-native-async-storage/async-storage": "2.2.0",
        "@stardazed/streams-text-encoding": "^1.0.2",
        "@tanstack/react-query": "catalog:",
        "@types/react": "~19.2.2",
        "@types/react-dom": "~19.2.2",
        "@ungap/structured-clone": "^1.3.0",
        "@workspace/api-client-react": "workspace:*",
        "babel-plugin-react-compiler": "^19.0.0-beta-e993439-20250117",
        "create-launch": "0.3.6",
        "expo-blur": "~57.0.2",
        "expo-constants": "~57.0.6",
        "expo-font": "~57.0.1",
        "expo-glass-effect": "~57.0.1",
        "expo-haptics": "~57.0.1",
        "expo-image": "~57.0.1",
        "expo-image-picker": "~57.0.5",
        "expo-linear-gradient": "~57.0.1",
        "expo-linking": "~57.0.3",
        "expo-location": "~57.0.5",
        "expo-router": "~57.0.7",
        "expo-splash-screen": "~57.0.4",
        "expo-status-bar": "~57.0.1",
        "expo-symbols": "~57.0.1",
        "expo-system-ui": "~57.0.1",
        "expo-web-browser": "~57.0.1",
        "react-dom": "19.2.3",
        "react-native-gesture-handler": "~2.32.0",
        "react-native-keyboard-controller": "1.21.9",
        "react-native-reanimated": "4.5.1",
        "react-native-safe-area-context": "~5.7.0",
        "react-native-screens": "~4.26.0",
        "react-native-svg": "15.15.4",
        "react-native-web": "~0.21.0",
        "react-native-worklets": "0.10.1",
        "typescript": "~6.0.3",
        "zod": "catalog:",
        "zod-validation-error": "^3.4.0"
      },
      "dependencies": {
        "@category-labs/mera": "^0.2.0",
        "@scure/bip32": "^2.4.0",
        "@scure/bip39": "^2.4.0",
        "expo": "~57.0.27",
        "expo-camera": "~57.0.6",
        "expo-clipboard": "~57.0.2",
        "expo-crypto": "~57.0.3",
        "expo-dev-client": "~57.0.19",
        "expo-secure-store": "~57.0.4",
        "permissionless": "^0.4.1",
        "react": "19.2.3",
        "react-native": "0.86.3",
        "react-native-passkey": "^3.6.2",
        "react-native-qrcode-svg": "^6.3.26",
        "viem": "^2.57.3"
      }
    }
    ✓ • 167ms

## Activity

    $ rg --files artifacts/wallet-indexer && sed -n '1,200p' artifacts/wallet-indexer/package.json && sed -n '1,120p' artifacts/wallet-indexer/pnpm-lock.yaml 2>/dev/null || true
    artifacts/wallet-indexer/package.json
    artifacts/wallet-indexer/tsconfig.json
    artifacts/wallet-indexer/envio-env.d.ts
    artifacts/wallet-indexer/src/handlers.ts
    artifacts/wallet-indexer/schema.graphql
    artifacts/wallet-indexer/config.yaml
    {
      "name": "@workspace/wallet-indexer",
      "version": "0.1.0",
      "private": true,
      "type": "module",
      "packageManager": "pnpm@10.32.0",
      "engines": {
        "node": ">=24"
      },
      "scripts": {
        "codegen": "envio codegen",
        "dev": "envio dev",
        "start": "envio start",
        "typecheck": "tsc --noEmit"
      },
      "dependencies": {
        "envio": "3.14.0"
      },
      "devDependencies": {
        "@types/node": "catalog:",
        "typescript": "~6.0.3"
      }
    }
    ✓ • 689ms

## Activity

    $ sed -n '1,180p' artifacts/ausd-wallet/components/Primitives.tsx && sed -n '150,300p' artifacts/ausd-wallet/app/send.tsx
    import React from 'react';
    import {
      ActivityIndicator,
      Image,
      Platform,
      Pressable,
      ScrollView,
      StyleSheet,
      Text,
      TextInput,
      View,
      type TextInputProps,
      type ViewStyle,
    } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
    import * as Haptics from 'expo-haptics';
    import { useColors } from '@/hooks/useColors';
    
    export function Page({
      children,
      scroll = true,
      contentStyle,
    }: {
      children: React.ReactNode;
      scroll?: boolean;
      contentStyle?: ViewStyle;
    }) {
      const colors = useColors();
      const insets = useSafeAreaInsets();
      const webInsets = Platform.OS === 'web';
      const body = (
        <View
          style={[
            styles.pageContent,
            contentStyle,
            webInsets && {
              paddingTop: Math.max(67, insets.top),
              paddingBottom: Math.max(34, insets.bottom) + 24,
            },
          ]}
        >
          {children}
        </View>
      );
      return (
        <SafeAreaView
          edges={['top']}
          style={[styles.page, { backgroundColor: colors.background }]}
        >
          {scroll ? (
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {body}
            </ScrollView>
          ) : (
            body
          )}
        </SafeAreaView>
      );
    }
    
    export function BrandMark({ size = 38 }: { size?: number }) {
      return (
        <Image
          source={require('@/assets/images/icon.png')}
          resizeMode="contain"
          style={{ width: size, height: size }}
          accessibilityLabel="AUSD Wallet"
        />
      );
    }
    
    export function BrandHeader({ compact = false }: { compact?: boolean }) {
      const colors = useColors();
      return (
        <View>
          {/* <View style={styles.brandHeader}> */}
          {/* <View style={styles.brandRow}>
            <BrandMark size={compact ? 34 : 40} />
            <Text style={[styles.brandName, { color: colors.foreground }]}>AUSD</Text>
          </View>
          <View style={[styles.testnetChip, { backgroundColor: colors.secondary }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.chipText, { color: colors.mutedForeground }]}>TESTNET</Text>
          </View> */}
        </View>
      );
    }
    
    export function Eyebrow({ children }: { children: React.ReactNode }) {
      const colors = useColors();
      return (
        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>
          {children}
        </Text>
      );
    }
    
    export function Title({
      children,
      size = 30,
    }: {
      children: React.ReactNode;
      size?: number;
    }) {
      const colors = useColors();
      return (
        <Text style={[styles.title, { color: colors.foreground, fontSize: size }]}>
          {children}
        </Text>
      );
    }
    
    export function Body({ children }: { children: React.ReactNode }) {
      const colors = useColors();
      return <Text style={[styles.body, { color: colors.mutedForeground }]}>{children}</Text>;
    }
    
    export function PrimaryButton({
      label,
      onPress,
      disabled = false,
      loading = false,
      icon,
      secondary = false,
      testID,
    }: {
      label: string;
      onPress: () => void;
      disabled?: boolean;
      loading?: boolean;
      icon?: React.ComponentProps<typeof Feather>['name'];
      secondary?: boolean;
      testID?: string;
    }) {
      const colors = useColors();
      return (
        <Pressable
          testID={testID}
          disabled={disabled || loading}
          onPress={() => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress();
          }}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: secondary ? colors.secondary : colors.primary,
              opacity: disabled ? 0.44 : pressed ? 0.84 : 1,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={secondary ? colors.foreground : colors.primaryForeground} />
          ) : (
            <>
              {icon ? (
                <Feather
                  name={icon}
                  size={17}
                  color={secondary ? colors.foreground : colors.primaryForeground}
                />
              ) : null}
              <Text
                style={[
                  styles.buttonText,
                  { color: secondary ? colors.foreground : colors.primaryForeground },
                ]}
              >
                {label}
              </Text>
            </>
          )}
        </Pressable>
      );
    }
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
                  height: windowHeight * 0.75,
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
    
                {sendMode === 'direct' ? (
                  <View style={styles.tokenRow}>
                    {TRANSFER_TOKENS.map((option) => (
                      <Pressable key={option} onPress={() => { setToken(option); setAmount(''); setError(''); }} style={[styles.tokenOption, { backgroundColor: token === option ? colors.primary : colors.secondary }]}>
                        <Text style={[styles.modeText, { color: token === option ? colors.primaryForeground : colors.foreground }]}>{option}</Text>
                      </Pressable>
                    ))}
                  </View>
                ) : null}
    
                <View style={[styles.modeSwitch, { backgroundColor: colors.secondary }]}>
                  <Pressable onPress={() => { setSendMode('direct'); setError(''); }} style={[styles.modeOption, sendMode === 'direct' && { backgroundColor: colors.background }]}>
                    <Text style={[styles.modeText, { color: sendMode === 'direct' ? colors.foreground : colors.mutedForeground }]}>AUSD transfer</Text>
                  </Pressable>
                  <Pressable onPress={() => { setSendMode('settlement'); setError(''); }} style={[styles.modeOption, sendMode === 'settlement' && { backgroundColor: colors.background }]}>
                    <Text style={[styles.modeText, { color: sendMode === 'settlement' ? colors.foreground : colors.mutedForeground }]}>Cross-border</Text>
                  </Pressable>
                </View>
    
                <View style={[styles.amountPanel, { backgroundColor: colors.secondary }]}>
                  <Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT</Text>
                  <View style={styles.amountRow}>
                    <Text style={[styles.dollar, { color: colors.foreground }]}>$</Text>
                    <TextInput
                      accessibilityLabel={`${sendMode === 'settlement' ? 'AUSD' : token} amount`}
                      value={amount}
                      onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
                      placeholder="0"
                      placeholderTextColor={colors.mutedForeground}
                      keyboardType="decimal-pad"
                      selectionColor={colors.primary}
                      style={[styles.amountInput, { color: colors.foreground }]}
                      autoFocus
                    />
                    <Text style={[styles.currency, { color: colors.mutedForeground }]}>{sendMode === 'settlement' ? 'AUSD' : token}</Text>
                  </View>
                  <View style={styles.balanceRow}>
                    <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>
                      {profile?.mode === 'mera'
                        ? availableBalance === null ? balanceError || 'Loading balance…' : `Available ${money(availableBalance)} ${sendMode === 'settlement' ? 'AUSD' : token}`
                        : `Demo balance ${money(demoBalance)} ${sendMode === 'settlement' ? 'AUSD' : token}`}
                    </Text>
                    {profile?.mode === 'mera' && availableBalance !== null ? (
                      <Pressable onPress={() => setAmount(String(availableBalance))}>
                        <Text style={[styles.maxText, { color: colors.primary }]}>MAX</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
    
                {sendMode === 'settlement' ? (
                  <View style={[styles.quotePanel, { backgroundColor: colors.secondary }]}>
                    <View style={styles.quoteLine}>
                      <Text style={[styles.quoteLabel, { color: colors.mutedForeground }]}>Recipient receives</Text>
                      <Text style={[styles.quoteValue, { color: colors.foreground }]}>
                        {quoteLoading ? 'Updating…' : quote ? `${Number(quote.amountOut).toLocaleString('en-US', { maximumFractionDigits: quote.outputDecimals })} CTK` : '— CTK'}
                      </Text>
                    </View>
                    <Text style={[styles.quoteCaption, { color: colors.mutedForeground }]}>
                      {quoteError || (quote ? 'Agora fixed-price pair · CTK is a testnet mock payout token' : 'Enter an amount to get an Agora testnet quote.')}
                    </Text>
                  </View>
                ) : null}
    
                <View style={styles.recipientBlock}>
                  <Text style={[styles.label, { color: colors.mutedForeground }]}>{recipientName ? `TO · ${recipientName}` : 'TO'}</Text>
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
                    style={[styles.recipientInput, { color: colors.foreground, backgroundColor: colors.secondary }]}
                  />
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
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      overlay: { flex: 1, justifyContent: 'flex-end' },
      backdrop: { backgroundColor: 'rgba(16, 18, 24, 0.48)' },
      keyboardLayer: { flex: 1, justifyContent: 'flex-end' },
      sheet: { maxHeight: '75%', borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden' },
      content: { paddingHorizontal: 22, paddingTop: 9, gap: 20 },
      modeSwitch: { borderRadius: 14, padding: 4, flexDirection: 'row', gap: 4 },
      tokenRow: { flexDirection: 'row', gap: 8 },
      tokenOption: { minHeight: 36, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
      modeOption: { flex: 1, minHeight: 39, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
      modeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
    ✓ • 0ms

## Activity

    $ rg -n 'wallet-indexer|envio@|envio:' pnpm-lock.yaml pnpm-workspace.yaml
    pnpm-lock.yaml:582:  artifacts/wallet-indexer:
    pnpm-lock.yaml:584:      envio:
    pnpm-lock.yaml:3272:  envio@3.14.0:
    pnpm-lock.yaml:8956:  envio@3.14.0(typescript@6.0.3)(zod@3.25.76):
    ✓ • 73ms

## Activity

    $ sed -n '570,600p' pnpm-lock.yaml && sed -n '3258,3290p' pnpm-lock.yaml && sed -n '8940,8980p' pnpm-lock.yaml
            specifier: ^1.4.0
            version: 1.4.0
          vaul:
            specifier: ^1.1.2
            version: 1.1.2(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.1.0(react@19.1.0))(react@19.1.0)
          vite:
            specifier: 'catalog:'
            version: 7.3.6(@types/node@25.9.6)(jiti@2.7.0)(lightningcss@1.32.0)(terser@5.51.2)(tsx@4.23.13)(yaml@2.9.0)
          zod:
            specifier: 'catalog:'
            version: 3.25.76
    
      artifacts/wallet-indexer:
        dependencies:
          envio:
            specifier: 3.14.0
            version: 3.14.0(typescript@6.0.3)(zod@3.25.76)
        devDependencies:
          '@types/node':
            specifier: 'catalog:'
            version: 25.9.6
          typescript:
            specifier: ~6.0.3
            version: 6.0.3
    
      lib/api-client-react:
        dependencies:
          '@tanstack/react-query':
            specifier: 'catalog:'
            version: 5.102.8(react@19.2.3)
    
        libc: [glibc]
    
      envio-linux-x64-musl@3.14.0:
        resolution: {integrity: sha512-dwGE8AF3spKLpGthJm0NW11XYt0X2QyjBfOeC9BpcCgetALV0nfQUyUhNdQol9eIfseEjwM2sM+bbLCWGAOMag==}
        cpu: [x64]
        os: [linux]
        libc: [musl]
    
      envio-linux-x64@3.14.0:
        resolution: {integrity: sha512-l0F0sNPtw4y1HGn3VXpZZlojqk0yCUDUET4mthLbcM0KH6zKWUlve1bTRcBicQYVrqa/jH09Taw7kcg+401FOw==}
        cpu: [x64]
        os: [linux]
        libc: [glibc]
    
      envio@3.14.0:
        resolution: {integrity: sha512-p76wRZYM56Fe5h+Uwy438U9eOYde1Dz8KxTwpXWtILN9DoCqLRPdwPJG3ulE4hPPmgNNAFixaIN83Mf9WTV5Mw==}
        engines: {node: '>=22.15.0'}
        hasBin: true
    
      error-stack-parser@2.1.4:
        resolution: {integrity: sha512-Sk5V6wVazPhq5MhpO+AUxJn5x7XSXGl1R93Vn7i+zS15KDVxQijejNCrz8340/2bgLBjR9GtEG8ZVKONDjcqGQ==}
    
      es-define-property@1.0.1:
        resolution: {integrity: sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==}
        engines: {node: '>= 0.4'}
    
      es-errors@1.3.0:
        resolution: {integrity: sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==}
        engines: {node: '>= 0.4'}
    
      es-object-atoms@1.1.2:
        resolution: {integrity: sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==}
        engines: {node: '>= 0.4'}
    
      envio-darwin-arm64@3.14.0:
        optional: true
    
      envio-darwin-x64@3.14.0:
        optional: true
    
      envio-linux-arm64@3.14.0:
        optional: true
    
      envio-linux-x64-musl@3.14.0:
        optional: true
    
      envio-linux-x64@3.14.0:
        optional: true
    
      envio@3.14.0(typescript@6.0.3)(zod@3.25.76):
        dependencies:
          '@elastic/ecs-pino-format': 1.4.0
          '@rescript/runtime': 12.2.0
          bignumber.js: 9.3.1
          dotenv: 16.4.5
          eventsource: 4.1.0
          express: 4.19.2
          pino: 10.3.1
          pino-pretty: 13.1.3
          postgres: 3.4.8
          rescript-schema: 9.5.1
          viem: 2.54.0(typescript@6.0.3)(zod@3.25.76)
        optionalDependencies:
          envio-darwin-arm64: 3.14.0
          envio-darwin-x64: 3.14.0
          envio-linux-arm64: 3.14.0
          envio-linux-x64: 3.14.0
          envio-linux-x64-musl: 3.14.0
        transitivePeerDependencies:
          - bufferutil
          - rescript
          - supports-color
          - typescript
          - utf-8-validate
    ✓ • 0ms

## Activity

    file changes: Completed · 5 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/components/Primitives.tsx
    @@ -6,2 +6,3 @@
       Pressable,
    +  RefreshControl,
       ScrollView,
    @@ -23,2 +24,4 @@
       contentStyle,
    +  refreshing = false,
    +  onRefresh,
     }: {
    @@ -27,2 +30,4 @@
       contentStyle?: ViewStyle;
    +  refreshing?: boolean;
    +  onRefresh?: () => void;
     }) {
    @@ -55,2 +60,3 @@
               showsVerticalScrollIndicator={false}
    +          refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
             >
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/services/indexed-activity.ts
    @@ -75,2 +75,3 @@
       const [error, setError] = useState('');
    +  const [refreshKey, setRefreshKey] = useState(0);
     
    @@ -104,5 +105,5 @@
         return () => { active = false; };
    -  }, [account]);
    +  }, [account, refreshKey]);
     
    -  return { transfers, savings, loading, error, configured: Boolean(GRAPHQL_URL) };
    +  return { transfers, savings, loading, error, configured: Boolean(GRAPHQL_URL), refresh: () => setRefreshKey((value) => value + 1) };
     }
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts
    @@ -63,2 +63,4 @@
     const balanceAbi = [
    +  { type: 'function', name: 'name', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
    +  { type: 'function', name: 'symbol', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
       { type: 'function', name: 'decimals', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint8' }] },
    @@ -400,10 +402,28 @@
     export async function getTokenBalance(account: string, token: WalletToken) {
    -  if (!isAddress(account, { strict: false })) throw new Error('Invalid Monad wallet address.');
    -  const info = WALLET_TOKENS[token];
    -  const [decimals, rawBalance] = await Promise.all([
    -    publicClient.readContract({ address: info.address, abi: balanceAbi, functionName: 'decimals' }),
    -    publicClient.readContract({ address: info.address, abi: balanceAbi, functionName: 'balanceOf', args: [account as Address] }),
    +  return getErc20Balance(account, WALLET_TOKENS[token]);
    +}
    +
    +export interface Erc20TokenInfo {
    +  address: Address;
    +  name: string;
    +  symbol: string;
    +  decimals: number;
    +}
    +
    +export async function getErc20TokenInfo(address: string): Promise<Erc20TokenInfo> {
    +  if (!isAddress(address, { strict: false })) throw new Error('Enter a valid token contract address.');
    +  const tokenAddress = address as Address;
    +  const [name, symbol, decimals] = await Promise.all([
    +    publicClient.readContract({ address: tokenAddress, abi: balanceAbi, functionName: 'name' }),
    +    publicClient.readContract({ address: tokenAddress, abi: balanceAbi, functionName: 'symbol' }),
    +    publicClient.readContract({ address: tokenAddress, abi: balanceAbi, functionName: 'decimals' }),
       ]);
    -  if (decimals !== info.decimals) throw new Error(`Monad ${token} reports ${decimals} decimals; expected ${info.decimals}.`);
    -  return formatUnits(rawBalance, decimals);
    +  if (!name.trim() || !symbol.trim() || decimals > 255) throw new Error('This contract does not expose a supported ERC-20 token.');
    +  return { address: tokenAddress, name: name.trim(), symbol: symbol.trim(), decimals };
    +}
    +
    +export async function getErc20Balance(account: string, token: Pick<Erc20TokenInfo, 'address' | 'decimals'>) {
    +  if (!isAddress(account, { strict: false })) throw new Error('Invalid Monad wallet address.');
    +  const rawBalance = await publicClient.readContract({ address: token.address, abi: balanceAbi, functionName: 'balanceOf', args: [account as Address] });
    +  return formatUnits(rawBalance, token.decimals);
     }
    Update { move_path: None }: /home/runner/workspace/artifacts/wallet-indexer/config.yaml
    @@ -2,3 +2,3 @@
     name: ausd-wallet-activity
    -description: AUSD, CTK, and savings pocket activity on Monad testnet
    +description: AUSD, USDC, CTK, and savings pocket activity on Monad testnet
     contracts:
    @@ -27,2 +27,3 @@
               - "0xa9012a055bd4e0eDfF8Ce09f960291C09D5322dC"
    +          - "0x534b2f3A21130d7a60830c2Df862319e593943A3"
               - "0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D"
    Update { move_path: None }: /home/runner/workspace/artifacts/wallet-indexer/package.json
    @@ -16,3 +16,3 @@
       "dependencies": {
    -    "envio": "3.14.0"
    +    "envio": "3.10.0"
       },

## Assistant

The indexer change is now scoped to the actual gap: it will watch the configured USDC contract alongside AUSD and CTK. On Home, I’m keeping added assets display-only for this pass, so users can track any valid ERC-20 without expanding the send or receive workflows yet.

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx
    @@ -1,3 +1,4 @@
    -import React, { useEffect, useState } from 'react';
    -import { Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
    +import AsyncStorage from '@react-native-async-storage/async-storage';
    +import React, { useCallback, useEffect, useMemo, useState } from 'react';
    +import { Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
     import { Feather } from '@expo/vector-icons';
    @@ -6,6 +7,10 @@
     import { useWallet } from '@/state/wallet-context';
    -import { getAUSDBalance, getUSDCBalance } from '@/services/passkey';
    +import { getErc20Balance, getErc20TokenInfo, type Erc20TokenInfo } from '@/services/passkey';
     import { formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
    +import { WALLET_TOKENS } from '@/services/tokens';
     import { Card, Divider, Eyebrow, Page, PrimaryButton } from '@/components/Primitives';
     
    +const TRACKED_ASSETS_STORAGE_KEY = 'ausd-wallet-tracked-assets-v1';
    +const defaultAssets: Erc20TokenInfo[] = [WALLET_TOKENS.AUSD, WALLET_TOKENS.USDC];
    +
     const money = (amount: number) =>
    @@ -17,6 +22,11 @@
       const { profile, balance, transfers } = useWallet();
    -  const { transfers: indexedTransfers, error: activityError, configured } = useIndexedActivity(profile?.address);
    -  const [chainBalance, setChainBalance] = useState<string | null>(null);
    -  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
    +  const { transfers: indexedTransfers, error: activityError, configured, refresh: refreshActivity } = useIndexedActivity(profile?.address);
    +  const [trackedAssets, setTrackedAssets] = useState<Erc20TokenInfo[]>([]);
    +  const [assetBalances, setAssetBalances] = useState<Record<string, number | null>>({});
       const [chainBalanceError, setChainBalanceError] = useState('');
    +  const [refreshing, setRefreshing] = useState(false);
    +  const [assetModalOpen, setAssetModalOpen] = useState(false);
    +  const [assetAddress, setAssetAddress] = useState('');
    +  const [assetError, setAssetError] = useState('');
    +  const [addingAsset, setAddingAsset] = useState(false);
       const [openAction, setOpenAction] = useState<'deposit' | 'swap' | null>(null);
    @@ -24,17 +34,60 @@
       const isMeraWallet = profile?.mode === 'mera';
    +  const assets = useMemo(() => [
    +    ...defaultAssets,
    +    ...trackedAssets.filter((asset) => !defaultAssets.some((defaultAsset) => defaultAsset.address.toLowerCase() === asset.address.toLowerCase())),
    +  ], [trackedAssets]);
     
       useEffect(() => {
    +    AsyncStorage.getItem(TRACKED_ASSETS_STORAGE_KEY)
    +      .then((value) => {
    +        if (!value) return;
    +        const stored = JSON.parse(value) as Erc20TokenInfo[];
    +        if (Array.isArray(stored)) setTrackedAssets(stored);
    +      })
    +      .catch(() => setChainBalanceError('Saved assets could not be loaded.'));
    +  }, []);
    +
    +  const refreshBalances = useCallback(async () => {
         if (!isMeraWallet || !profile?.address) return;
         let active = true;
    -    Promise.allSettled([getAUSDBalance(profile.address), getUSDCBalance(profile.address)])
    -      .then(([ausdResult, usdcResult]) => {
    -        if (!active) return;
    -        if (ausdResult.status === 'fulfilled') setChainBalance(ausdResult.value);
    -        if (usdcResult.status === 'fulfilled') setUsdcBalance(usdcResult.value);
    -        setChainBalanceError(ausdResult.status === 'rejected' || usdcResult.status === 'rejected'
    -          ? 'Some balances are unavailable'
    -          : '');
    -      });
    -    return () => { active = false; };
    -  }, [isMeraWallet, profile?.address]);
    +    const results = await Promise.allSettled(assets.map((asset) => getErc20Balance(profile.address!, asset)));
    +    if (!active) return;
    +    setAssetBalances(Object.fromEntries(results.map((result, index) => [
    +      assets[index].address.toLowerCase(),
    +      result.status === 'fulfilled' ? Number(result.value) : null,
    +    ])));
    +    setChainBalanceError(results.some((result) => result.status === 'rejected') ? 'Some balances are unavailable' : '');
    +    active = false;
    +  }, [assets, isMeraWallet, profile?.address]);
    +
    +  useEffect(() => {
    +    void refreshBalances();
    +  }, [refreshBalances]);
    +
    +  async function refreshHome() {
    +    setRefreshing(true);
    +    refreshActivity();
    +    await refreshBalances();
    +    setRefreshing(false);
    +  }
    +
    +  async function addAsset() {
    +    setAssetError('');
    +    setAddingAsset(true);
    +    try {
    +      const asset = await getErc20TokenInfo(assetAddress.trim());
    +      if (assets.some((item) => item.address.toLowerCase() === asset.address.toLowerCase())) {
    +        throw new Error(`${asset.symbol} is already in your assets.`);
    +      }
    +      const next = [...trackedAssets, asset];
    +      await AsyncStorage.setItem(TRACKED_ASSETS_STORAGE_KEY, JSON.stringify(next));
    +      setTrackedAssets(next);
    +      setAssetAddress('');
    +      setAssetModalOpen(false);
    +    } catch (caught) {
    +      setAssetError(caught instanceof Error ? caught.message : 'This token could not be added.');
    +    } finally {
    +      setAddingAsset(false);
    +    }
    +  }
       const indexedHashes = new Set(indexedTransfers.map((item) => item.transactionHash.toLowerCase()));
    @@ -52,5 +105,8 @@
         : transfers.slice(0, 3).map((item) => ({ local: item }));
    -  const ausd = isMeraWallet ? (chainBalance === null ? null : Number(chainBalance)) : balance;
    -  const usdc = isMeraWallet ? (usdcBalance === null ? null : Number(usdcBalance)) : 0;
    -  const totalBalance = ausd === null || usdc === null ? null : ausd + usdc;
    +  const ausd = isMeraWallet ? assetBalances[WALLET_TOKENS.AUSD.address.toLowerCase()] ?? null : balance;
    +  const usdc = isMeraWallet ? assetBalances[WALLET_TOKENS.USDC.address.toLowerCase()] ?? null : 0;
    +  const totalBalance = assets.reduce<number | null>((total, asset) => {
    +    const amount = isMeraWallet ? assetBalances[asset.address.toLowerCase()] : asset.symbol === 'AUSD' ? balance : 0;
    +    return total === null || amount === null ? null : total + amount;
    +  }, 0);
       const drawerPan = PanResponder.create({
    @@ -65,3 +121,3 @@
       return (
    -    <Page contentStyle={styles.page}>
    +    <Page contentStyle={styles.page} refreshing={refreshing} onRefresh={() => { void refreshHome(); }}>
           <View style={styles.header}>
    @@ -187,9 +243,41 @@
             <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Assets</Text>
    +        <Pressable accessibilityRole="button" accessibilityLabel="Add an asset" onPress={() => { setAssetError(''); setAssetModalOpen(true); }}>
    +          <Text style={[styles.seeAll, { color: colors.primary }]}>Add asset</Text>
    +        </Pressable>
           </View>
           <Card style={styles.assetCard}>
    -        <AssetRow symbol="A" name="Agora AUSD" amount={ausd} />
    -        <Divider />
    -        <AssetRow symbol="$" name="USD Coin" amount={usdc} />
    +        {assets.map((asset, index) => (
    +          <React.Fragment key={asset.address}>
    +            {index > 0 ? <Divider /> : null}
    +            <AssetRow symbol={asset.symbol.slice(0, 1)} name={asset.name} ticker={asset.symbol} amount={isMeraWallet ? assetBalances[asset.address.toLowerCase()] ?? null : asset.symbol === 'AUSD' ? balance : 0} />
    +          </React.Fragment>
    +        ))}
           </Card>
     
    +      <Modal visible={assetModalOpen} transparent animationType="fade" onRequestClose={() => setAssetModalOpen(false)}>
    +        <View style={styles.assetModalOverlay}>
    +          <Pressable style={StyleSheet.absoluteFill} onPress={() => setAssetModalOpen(false)} accessibilityLabel="Close add asset" />
    +          <View style={[styles.assetModal, { backgroundColor: colors.background }]}> 
    +            <Text style={[styles.assetModalTitle, { color: colors.foreground }]}>Add asset</Text>
    +            <Text style={[styles.assetModalCopy, { color: colors.mutedForeground }]}>Enter an ERC-20 contract address on Monad testnet. Assets added here are tracked on this device.</Text>
    +            <TextInput
    +              accessibilityLabel="Token contract address"
    +              value={assetAddress}
    +              onChangeText={setAssetAddress}
    +              placeholder="0x…"
    +              placeholderTextColor={colors.mutedForeground}
    +              autoCapitalize="none"
    +              autoCorrect={false}
    +              selectionColor={colors.primary}
    +              style={[styles.assetInput, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.secondary }]}
    +            />
    +            {assetError ? <Text style={[styles.assetError, { color: colors.destructive }]}>{assetError}</Text> : null}
    +            <View style={styles.assetModalActions}>
    +              <PrimaryButton label="Cancel" secondary onPress={() => setAssetModalOpen(false)} />
    +              <PrimaryButton label="Add asset" icon="plus" loading={addingAsset} onPress={() => { void addAsset(); }} />
    +            </View>
    +          </View>
    +        </View>
    +      </Modal>
    +
           <View style={styles.sectionHead}>
    @@ -250,3 +338,3 @@
     
    -function AssetRow({ symbol, name, amount }: { symbol: string; name: string; amount: number | null }) {
    +function AssetRow({ symbol, name, ticker, amount }: { symbol: string; name: string; ticker: string; amount: number | null }) {
       const colors = useColors();
    @@ -259,3 +347,3 @@
             <Text style={[styles.assetName, { color: colors.foreground }]}>{name}</Text>
    -        <Text style={[styles.assetTicker, { color: colors.mutedForeground }]}>{symbol === 'A' ? 'AUSD' : 'USDC'}</Text>
    +        <Text style={[styles.assetTicker, { color: colors.mutedForeground }]}>{ticker}</Text>
           </View>
    @@ -352,2 +440,9 @@
       emptyCopy: { fontSize: 11, fontFamily: 'Inter_400Regular' },
    +  assetModalOverlay: { flex: 1, justifyContent: 'center', padding: 22, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
    +  assetModal: { borderRadius: 20, padding: 20, gap: 13 },
    +  assetModalTitle: { fontSize: 21, fontFamily: 'Inter_600SemiBold' },
    +  assetModalCopy: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
    +  assetInput: { minHeight: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, fontSize: 13, fontFamily: 'Inter_400Regular' },
    +  assetError: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
    +  assetModalActions: { flexDirection: 'row', gap: 10 },
     });

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx
    @@ -107,6 +107,3 @@
       const usdc = isMeraWallet ? assetBalances[WALLET_TOKENS.USDC.address.toLowerCase()] ?? null : 0;
    -  const totalBalance = assets.reduce<number | null>((total, asset) => {
    -    const amount = isMeraWallet ? assetBalances[asset.address.toLowerCase()] : asset.symbol === 'AUSD' ? balance : 0;
    -    return total === null || amount === null ? null : total + amount;
    -  }, 0);
    +  const totalBalance = ausd === null || usdc === null ? null : ausd + usdc;
       const drawerPan = PanResponder.create({
    @@ -351,3 +348,3 @@
             <Text style={[styles.assetAmount, { color: colors.foreground }]}>{amount === null ? '—' : money(amount)}</Text>
    -        <Text style={[styles.assetUsd, { color: colors.mutedForeground }]}>${amount === null ? '—' : money(amount)}</Text>
    +        <Text style={[styles.assetUsd, { color: colors.mutedForeground }]}>{ticker === 'AUSD' || ticker === 'USDC' ? `$${amount === null ? '—' : money(amount)}` : ticker}</Text>
           </View>

## Activity

    $ pnpm install --lockfile-only --filter @workspace/wallet-indexer
    
       ╭──────────────────────────────────────────╮
       │                                          │
       │   Update available! 10.26.1 → 12.11.2.   │
       │   Changelog: https://pnpm.io/v/12.11.2   │
       │     To update, run: pnpm add -g pnpm     │
       │                                          │
       ╰──────────────────────────────────────────╯
    
    Progress: resolved 1, reused 0, downloaded 0, added 0
    Progress: resolved 30, reused 0, downloaded 0, added 0
    artifacts/mockup-sandbox                 |  WARN  deprecated recharts@2.15.4
    Progress: resolved 80, reused 0, downloaded 0, added 0
    Progress: resolved 114, reused 0, downloaded 0, added 0
    Progress: resolved 141, reused 0, downloaded 0, added 0
    Progress: resolved 211, reused 0, downloaded 0, added 0
    Progress: resolved 401, reused 0, downloaded 0, added 0
    Progress: resolved 566, reused 0, downloaded 0, added 0
    Progress: resolved 721, reused 0, downloaded 0, added 0
    Progress: resolved 876, reused 0, downloaded 0, added 0
    Progress: resolved 1005, reused 0, downloaded 0, added 0
    Progress: resolved 1115, reused 0, downloaded 0, added 0
     WARN  4 deprecated subdependencies found: @fuel-ts/interfaces@0.96.1, string-similarity@4.0.4, text-encoding@0.7.0, uuid@7.0.3
    Progress: resolved 1128, reused 0, downloaded 0, added 0, done
     WARN  Issues with peer dependencies found
    artifacts/ausd-wallet
    ├─┬ react-native-worklets 0.10.1
    │ └── ✕ missing peer @react-native/metro-config@"*"
    ├─┬ react-native 0.86.3
    │ └─┬ @react-native/community-cli-plugin 0.86.3
    │   └── ✕ missing peer @react-native/metro-config@0.86.3
    └─┬ @category-labs/mera 0.2.0
      └── ✕ unmet peer react-native-passkey@3.6.1: found 3.6.2
    Peer dependencies that should be installed:
      @react-native/metro-config@0.86.3
    .                                        |  +66   -2 +++++++-
    Done in 21.7s using pnpm v10.26.1
    ✓ • 22.10s

## Assistant

The implementation is in place and the lockfile now resolves Envio 3.10.0. I’m typechecking the wallet and indexer next; the lock update reported existing React Native peer warnings, unrelated to these changes.

## Activity

    $ pnpm --filter @workspace/wallet-indexer run typecheck
    
    > @workspace/wallet-indexer@0.1.0 typecheck /home/runner/workspace/artifacts/wallet-indexer
    > tsc --noEmit
    
    ✓ • 3.09s

## Activity

    $ pnpm --filter @workspace/ausd-wallet run typecheck
    
    > @workspace/ausd-wallet@0.0.0 typecheck /home/runner/workspace/artifacts/ausd-wallet
    > tsc -p tsconfig.json --noEmit
    
    ✓ • 15.65s

## Activity

    $ git diff --check && git diff --stat && git diff -- artifacts/wallet-indexer/package.json artifacts/wallet-indexer/config.yaml artifacts/ausd-wallet/app/'(tabs)'/index.tsx artifacts/ausd-wallet/services/passkey.ts artifacts/ausd-wallet/services/indexed-activity.ts artifacts/ausd-wallet/components/Primitives.tsx
    artifacts/ausd-wallet/app/(tabs)/index.tsx:257: trailing whitespace.
    +          <View style={[styles.assetModal, { backgroundColor: colors.background }]}>
    ✗ (2) • 498ms

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx
    @@ -256,3 +256,3 @@
               <Pressable style={StyleSheet.absoluteFill} onPress={() => setAssetModalOpen(false)} accessibilityLabel="Close add asset" />
    -          <View style={[styles.assetModal, { backgroundColor: colors.background }]}> 
    +          <View style={[styles.assetModal, { backgroundColor: colors.background }]}>
                 <Text style={[styles.assetModalTitle, { color: colors.foreground }]}>Add asset</Text>

## Activity

    $ git diff --check && git diff --stat
     artifacts/ausd-wallet/app/(tabs)/index.tsx         | 144 ++++-
     artifacts/ausd-wallet/components/Primitives.tsx    |   6 +
     artifacts/ausd-wallet/services/indexed-activity.ts |   5 +-
     artifacts/ausd-wallet/services/passkey.ts          |  34 +-
     artifacts/wallet-indexer/config.yaml               |   3 +-
     artifacts/wallet-indexer/package.json              |   2 +-
     pnpm-lock.yaml                                     | 624 ++++++++++++++++++++-
     7 files changed, 754 insertions(+), 64 deletions(-)
    ✓ • 4.20s

## Activity

    $ rg -n 'envio@3\.10\.0|specifier: 3\.10\.0|version: 3\.10\.0' pnpm-lock.yaml artifacts/wallet-indexer/package.json
    pnpm-lock.yaml:403:        version: 3.10.0(react-hook-form@7.87.0(react@19.1.0))
    pnpm-lock.yaml:585:        specifier: 3.10.0
    pnpm-lock.yaml:586:        version: 3.10.0(@types/react@19.3.0)(react-devtools-core@6.1.5)(react-dom@19.2.3(react@19.2.5))(typescript@6.0.3)(zod@3.25.76)
    pnpm-lock.yaml:3381:  envio@3.10.0:
    pnpm-lock.yaml:9333:  envio@3.10.0(@types/react@19.3.0)(react-devtools-core@6.1.5)(react-dom@19.2.3(react@19.2.5))(typescript@6.0.3)(zod@3.25.76):
    ✓ • 1.90s

## Activity

    $ git status --short
     M artifacts/ausd-wallet/app/(tabs)/index.tsx
     M artifacts/ausd-wallet/components/Primitives.tsx
     M artifacts/ausd-wallet/services/indexed-activity.ts
     M artifacts/ausd-wallet/services/passkey.ts
     M artifacts/wallet-indexer/config.yaml
     M artifacts/wallet-indexer/package.json
     M pnpm-lock.yaml
    ?? codex-session-assetstatement.md
    ✓ • 0ms

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/README.md
    @@ -66,2 +66,2 @@
     
    -The Envio indexer is in `artifacts/wallet-indexer`. In Envio Cloud, set **Root Directory** to `artifacts/wallet-indexer` and **Config File** to `config.yaml`; that directory contains the exact Envio version pin Cloud checks. The indexer pins Envio `3.14.0`, pnpm `10.32.0`, and Node 24+. Deploy it, then set its public GraphQL URL as the GitHub Actions repository variable `EXPO_PUBLIC_ENVIO_GRAPHQL_URL`. Set the same variable in the local wallet environment to use indexed activity during development. It indexes Monad testnet AUSD and CTK `Transfer` events starting from the configured latest block. If the URL is missing or unavailable, the activity screen falls back to transfers saved on the device.
    +The Envio indexer is in `artifacts/wallet-indexer`. In Envio Cloud, set **Root Directory** to `artifacts/wallet-indexer` and **Config File** to `config.yaml`; that directory contains the exact Envio version pin Cloud checks. The indexer pins Envio `3.10.0`, pnpm `10.32.0`, and Node 24+. Deploy it, then set its public GraphQL URL as the GitHub Actions repository variable `EXPO_PUBLIC_ENVIO_GRAPHQL_URL`. Set the same variable in the local wallet environment to use indexed activity during development. It indexes Monad testnet AUSD, USDC, and CTK `Transfer` events from block `69501034`. If the URL is missing or unavailable, the activity screen falls back to transfers saved on the device.

## Assistant

Both TypeScript checks pass. The remaining operational step is redeploying the Envio project, because the currently deployed indexer cannot begin indexing USDC until it uses the updated contract configuration.

## Activity

    $ nl -ba 'artifacts/ausd-wallet/app/(tabs)/index.tsx' | sed -n '1,290p' && nl -ba artifacts/wallet-indexer/config.yaml | sed -n '1,45p' && nl -ba artifacts/wallet-indexer/package.json | sed -n '1,35p'
         1    import AsyncStorage from '@react-native-async-storage/async-storage';
         2    import React, { useCallback, useEffect, useMemo, useState } from 'react';
         3    import { Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
         4    import { Feather } from '@expo/vector-icons';
         5    import { router } from 'expo-router';
         6    import { useColors } from '@/hooks/useColors';
         7    import { useWallet } from '@/state/wallet-context';
         8    import { getErc20Balance, getErc20TokenInfo, type Erc20TokenInfo } from '@/services/passkey';
         9    import { formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
        10    import { WALLET_TOKENS } from '@/services/tokens';
        11    import { Card, Divider, Eyebrow, Page, PrimaryButton } from '@/components/Primitives';
        12
        13    const TRACKED_ASSETS_STORAGE_KEY = 'ausd-wallet-tracked-assets-v1';
        14    const defaultAssets: Erc20TokenInfo[] = [WALLET_TOKENS.AUSD, WALLET_TOKENS.USDC];
        15
        16    const money = (amount: number) =>
        17      amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        18
        19    export default function WalletHome() {
        20      const colors = useColors();
        21      const { height: windowHeight } = useWindowDimensions();
        22      const { profile, balance, transfers } = useWallet();
        23      const { transfers: indexedTransfers, error: activityError, configured, refresh: refreshActivity } = useIndexedActivity(profile?.address);
        24      const [trackedAssets, setTrackedAssets] = useState<Erc20TokenInfo[]>([]);
        25      const [assetBalances, setAssetBalances] = useState<Record<string, number | null>>({});
        26      const [chainBalanceError, setChainBalanceError] = useState('');
        27      const [refreshing, setRefreshing] = useState(false);
        28      const [assetModalOpen, setAssetModalOpen] = useState(false);
        29      const [assetAddress, setAssetAddress] = useState('');
        30      const [assetError, setAssetError] = useState('');
        31      const [addingAsset, setAddingAsset] = useState(false);
        32      const [openAction, setOpenAction] = useState<'deposit' | 'swap' | null>(null);
        33      const [drawerOffset, setDrawerOffset] = useState(0);
        34      const isMeraWallet = profile?.mode === 'mera';
        35      const assets = useMemo(() => [
        36        ...defaultAssets,
        37        ...trackedAssets.filter((asset) => !defaultAssets.some((defaultAsset) => defaultAsset.address.toLowerCase() === asset.address.toLowerCase())),
        38      ], [trackedAssets]);
        39
        40      useEffect(() => {
        41        AsyncStorage.getItem(TRACKED_ASSETS_STORAGE_KEY)
        42          .then((value) => {
        43            if (!value) return;
        44            const stored = JSON.parse(value) as Erc20TokenInfo[];
        45            if (Array.isArray(stored)) setTrackedAssets(stored);
        46          })
        47          .catch(() => setChainBalanceError('Saved assets could not be loaded.'));
        48      }, []);
        49
        50      const refreshBalances = useCallback(async () => {
        51        if (!isMeraWallet || !profile?.address) return;
        52        let active = true;
        53        const results = await Promise.allSettled(assets.map((asset) => getErc20Balance(profile.address!, asset)));
        54        if (!active) return;
        55        setAssetBalances(Object.fromEntries(results.map((result, index) => [
        56          assets[index].address.toLowerCase(),
        57          result.status === 'fulfilled' ? Number(result.value) : null,
        58        ])));
        59        setChainBalanceError(results.some((result) => result.status === 'rejected') ? 'Some balances are unavailable' : '');
        60        active = false;
        61      }, [assets, isMeraWallet, profile?.address]);
        62
        63      useEffect(() => {
        64        void refreshBalances();
        65      }, [refreshBalances]);
        66
        67      async function refreshHome() {
        68        setRefreshing(true);
        69        refreshActivity();
        70        await refreshBalances();
        71        setRefreshing(false);
        72      }
        73
        74      async function addAsset() {
        75        setAssetError('');
        76        setAddingAsset(true);
        77        try {
        78          const asset = await getErc20TokenInfo(assetAddress.trim());
        79          if (assets.some((item) => item.address.toLowerCase() === asset.address.toLowerCase())) {
        80            throw new Error(`${asset.symbol} is already in your assets.`);
        81          }
        82          const next = [...trackedAssets, asset];
        83          await AsyncStorage.setItem(TRACKED_ASSETS_STORAGE_KEY, JSON.stringify(next));
        84          setTrackedAssets(next);
        85          setAssetAddress('');
        86          setAssetModalOpen(false);
        87        } catch (caught) {
        88          setAssetError(caught instanceof Error ? caught.message : 'This token could not be added.');
        89        } finally {
        90          setAddingAsset(false);
        91        }
        92      }
        93      const indexedHashes = new Set(indexedTransfers.map((item) => item.transactionHash.toLowerCase()));
        94      const recent = configured && !activityError
        95        ? [
        96            ...indexedTransfers.map((item) => ({ indexed: formatIndexedTransfer(item, profile?.address ?? '') })),
        97            ...transfers
        98              .filter((item) => !item.transactionHash || !indexedHashes.has(item.transactionHash.toLowerCase()))
        99              .map((item) => ({ local: item })),
       100          ].sort((left, right) => {
       101            const leftDate = 'indexed' in left ? left.indexed.createdAt : left.local.createdAt;
       102            const rightDate = 'indexed' in right ? right.indexed.createdAt : right.local.createdAt;
       103            return new Date(rightDate).getTime() - new Date(leftDate).getTime();
       104          }).slice(0, 3)
       105        : transfers.slice(0, 3).map((item) => ({ local: item }));
       106      const ausd = isMeraWallet ? assetBalances[WALLET_TOKENS.AUSD.address.toLowerCase()] ?? null : balance;
       107      const usdc = isMeraWallet ? assetBalances[WALLET_TOKENS.USDC.address.toLowerCase()] ?? null : 0;
       108      const totalBalance = ausd === null || usdc === null ? null : ausd + usdc;
       109      const drawerPan = PanResponder.create({
       110        onMoveShouldSetPanResponder: (_event, gesture) => gesture.dy > 5,
       111        onPanResponderMove: (_event, gesture) => setDrawerOffset(Math.max(0, gesture.dy)),
       112        onPanResponderRelease: (_event, gesture) => {
       113          if (gesture.dy > 90 || gesture.vy > 0.8) setOpenAction(null);
       114          setDrawerOffset(0);
       115        },
       116      });
       117
       118      return (
       119        <Page contentStyle={styles.page} refreshing={refreshing} onRefresh={() => { void refreshHome(); }}>
       120          <View style={styles.header}>
       121            <View>
       122              <Eyebrow>MONAD WALLET</Eyebrow>
       123              <Text style={[styles.pageTitle, { color: colors.foreground }]}>Your money</Text>
       124            </View>
       125            <Pressable
       126              accessibilityRole="button"
       127              accessibilityLabel="Open profile and username settings"
       128              onPress={() => router.push('/(tabs)/profile')}
       129              style={[styles.profileButton, { backgroundColor: colors.secondary }]}
       130            >
       131              <Feather name="user" size={19} color={colors.foreground} />
       132            </Pressable>
       133          </View>
       134
       135          <Card style={styles.balanceCard}>
       136            <View style={styles.balanceTop}>
       137              <Text style={[styles.balanceLabel, { color: colors.mutedForeground }]}>TOTAL BALANCE</Text>
       138              <View style={[styles.networkPill, { backgroundColor: colors.secondary }]}>
       139                <View style={[styles.balanceDot, { backgroundColor: colors.primary }]} />
       140                <Text style={[styles.networkText, { color: colors.foreground }]}>{isMeraWallet ? 'TESTNET' : 'DEMO'}</Text>
       141              </View>
       142            </View>
       143            <Text style={[styles.balanceAmount, { color: colors.foreground }]}>${totalBalance === null ? '—' : money(totalBalance)}</Text>
       144            <Text style={[styles.balanceFoot, { color: colors.mutedForeground }]}>
       145              {chainBalanceError || (isMeraWallet ? 'AUSD + USDC on Monad' : 'Demo balance · AUSD')}
       146            </Text>
       147          </Card>
       148
       149          <View style={styles.quickActions}>
       150            <QuickAction
       151              icon="download"
       152              label="Deposit"
       153              onPress={() => { setDrawerOffset(0); setOpenAction('deposit'); }}
       154            />
       155            <QuickAction
       156              icon="send"
       157              label="Transfer"
       158              onPress={() => router.push('/send')}
       159              primary
       160            />
       161            <QuickAction
       162              icon="repeat"
       163              label="Swap"
       164              onPress={() => { setDrawerOffset(0); setOpenAction('swap'); }}
       165            />
       166          </View>
       167
       168          <Modal
       169            visible={openAction !== null}
       170            transparent
       171            animationType="slide"
       172            statusBarTranslucent
       173            onRequestClose={() => setOpenAction(null)}
       174          >
       175            <View style={styles.drawerOverlay}>
       176              <Pressable accessibilityRole="button" accessibilityLabel="Close action drawer" style={styles.drawerBackdrop} onPress={() => setOpenAction(null)} />
       177              <View style={[styles.actionDrawer, { height: windowHeight * 0.75, backgroundColor: colors.background, transform: [{ translateY: drawerOffset }] }]}>
       178                <View {...drawerPan.panHandlers} style={styles.drawerHandleArea}>
       179                  <View style={[styles.drawerHandle, { backgroundColor: colors.border }]} />
       180                </View>
       181                <View style={styles.drawerHeading}>
       182                  <View>
       183                    <Eyebrow>{openAction === 'deposit' ? 'MONEY IN' : 'MONAD TESTNET'}</Eyebrow>
       184                    <Text style={[styles.drawerTitle, { color: colors.foreground }]}>{openAction === 'deposit' ? 'Add money' : 'Swap tokens'}</Text>
       185                    <Text style={[styles.drawerSubtitle, { color: colors.mutedForeground }]}>
       186                      {openAction === 'deposit' ? 'Get AUSD into your wallet.' : 'Swap AUSD to CTK on Monad testnet.'}
       187                    </Text>
       188                  </View>
       189                  <Pressable accessibilityRole="button" accessibilityLabel="Close action drawer" onPress={() => setOpenAction(null)} style={[styles.drawerClose, { backgroundColor: colors.secondary }]}>
       190                    <Feather name="x" size={19} color={colors.foreground} />
       191                  </Pressable>
       192                </View>
       193                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.drawerBody}>
       194                  {openAction === 'deposit' ? (
       195                    <>
       196                      <View style={[styles.swapNotice, { backgroundColor: colors.secondary }]}>
       197                        <Feather name="info" size={16} color={colors.primary} />
       198                        <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>Choose a direct Monad deposit address or bridge from another supported network with Aurora Intents.</Text>
       199                      </View>
       200                      <PrimaryButton label="Receive to wallet address" icon="copy" onPress={() => { setOpenAction(null); router.push('/receive'); }} />
       201                      <PrimaryButton label="Deposit with Aurora Intents" icon="repeat" secondary onPress={() => { setOpenAction(null); router.push('/aurora-deposit'); }} />
       202                    </>
       203                  ) : (
       204                    <>
       205                      <View style={[styles.swapNotice, { backgroundColor: colors.secondary }]}>
       206                        <Feather name="info" size={16} color={colors.primary} />
       207                        <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>AUSD → CTK on Monad testnet via Agora. CTK is a test token, not a stablecoin or fiat payout.</Text>
       208                      </View>
       209                      <PrimaryButton label="Get a swap quote" icon="arrow-right" onPress={() => { setOpenAction(null); router.push('/swap'); }} />
       210                    </>
       211                  )}
       212                </ScrollView>
       213              </View>
       214            </View>
       215          </Modal>
       216
       217          <View style={styles.sectionHead}>
       218            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Savings goals</Text>
       219            <Pressable onPress={() => router.push('/savings-goals')}>
       220              <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
       221            </Pressable>
       222          </View>
       223          <Pressable
       224            accessibilityRole="button"
       225            accessibilityLabel="Start a savings goal"
       226            onPress={() => router.push('/savings-goals')}
       227            style={({ pressed }) => [styles.goalCard, { borderColor: colors.border, backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 }]}
       228          >
       229            <View style={[styles.goalIcon, { backgroundColor: colors.secondary }]}>
       230              <Feather name="target" size={19} color={colors.foreground} />
       231            </View>
       232            <View style={styles.goalCopy}>
       233              <Text style={[styles.goalTitle, { color: colors.foreground }]}>Create a savings goal</Text>
       234              <Text style={[styles.goalSubtitle, { color: colors.mutedForeground }]}>Plan privately with your Mera passkey</Text>
       235            </View>
       236            <Feather name="plus-circle" size={20} color={colors.primary} />
       237          </Pressable>
       238
       239          <View style={styles.sectionHead}>
       240            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Assets</Text>
       241            <Pressable accessibilityRole="button" accessibilityLabel="Add an asset" onPress={() => { setAssetError(''); setAssetModalOpen(true); }}>
       242              <Text style={[styles.seeAll, { color: colors.primary }]}>Add asset</Text>
       243            </Pressable>
       244          </View>
       245          <Card style={styles.assetCard}>
       246            {assets.map((asset, index) => (
       247              <React.Fragment key={asset.address}>
       248                {index > 0 ? <Divider /> : null}
       249                <AssetRow symbol={asset.symbol.slice(0, 1)} name={asset.name} ticker={asset.symbol} amount={isMeraWallet ? assetBalances[asset.address.toLowerCase()] ?? null : asset.symbol === 'AUSD' ? balance : 0} />
       250              </React.Fragment>
       251            ))}
       252          </Card>
       253
       254          <Modal visible={assetModalOpen} transparent animationType="fade" onRequestClose={() => setAssetModalOpen(false)}>
       255            <View style={styles.assetModalOverlay}>
       256              <Pressable style={StyleSheet.absoluteFill} onPress={() => setAssetModalOpen(false)} accessibilityLabel="Close add asset" />
       257              <View style={[styles.assetModal, { backgroundColor: colors.background }]}>
       258                <Text style={[styles.assetModalTitle, { color: colors.foreground }]}>Add asset</Text>
       259                <Text style={[styles.assetModalCopy, { color: colors.mutedForeground }]}>Enter an ERC-20 contract address on Monad testnet. Assets added here are tracked on this device.</Text>
       260                <TextInput
       261                  accessibilityLabel="Token contract address"
       262                  value={assetAddress}
       263                  onChangeText={setAssetAddress}
       264                  placeholder="0x…"
       265                  placeholderTextColor={colors.mutedForeground}
       266                  autoCapitalize="none"
       267                  autoCorrect={false}
       268                  selectionColor={colors.primary}
       269                  style={[styles.assetInput, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.secondary }]}
       270                />
       271                {assetError ? <Text style={[styles.assetError, { color: colors.destructive }]}>{assetError}</Text> : null}
       272                <View style={styles.assetModalActions}>
       273                  <PrimaryButton label="Cancel" secondary onPress={() => setAssetModalOpen(false)} />
       274                  <PrimaryButton label="Add asset" icon="plus" loading={addingAsset} onPress={() => { void addAsset(); }} />
       275                </View>
       276              </View>
       277            </View>
       278          </Modal>
       279
       280          <View style={styles.sectionHead}>
       281            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent activity</Text>
       282            <Pressable onPress={() => router.push('/(tabs)/activity')}>
       283              <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
       284            </Pressable>
       285          </View>
       286          <Card style={styles.activityCard}>
       287            {recent.length ? (
       288              recent.map((entry, index) => {
       289                const indexed = 'indexed' in entry ? entry.indexed : undefined;
       290                const transfer = 'local' in entry ? entry.local : undefined;
         1    # yaml-language-server: $schema=./node_modules/envio/evm.schema.json
         2    name: ausd-wallet-activity
         3    description: AUSD, USDC, CTK, and savings pocket activity on Monad testnet
         4    contracts:
         5      - name: WalletToken
         6        events:
         7          - event: "Transfer(address indexed from, address indexed to, uint256 value)"
         8      - name: SavingsPockets
         9        events:
        10          - event: "PocketCreated(address indexed owner, bytes32 indexed pocketId)"
        11          - event: "AutoSaveRateUpdated(address indexed owner, bytes32 indexed pocketId, uint16 bps)"
        12          - event: "Deposited(address indexed owner, bytes32 indexed pocketId, uint256 amount)"
        13          - event: "Withdrawn(address indexed owner, bytes32 indexed pocketId, address indexed recipient, uint256 amount)"
        14          - event: "PaymentSent(address indexed owner, bytes32 indexed pocketId, address indexed recipient, uint256 paymentAmount, uint256 savedAmount)"
        15          - event: "Gifted(address indexed donor, address indexed recipientOwner, bytes32 indexed pocketId, uint256 amount)"
        16          - event: "PersonGifted(address indexed donor, address indexed recipientOwner, uint256 amount)"
        17          - event: "GiftAllocated(address indexed recipientOwner, bytes32 indexed pocketId, uint256 amount)"
        18          - event: "GiftWithdrawn(address indexed recipientOwner, address indexed recipient, uint256 amount)"
        19    chains:
        20      - id: 10143
        21        start_block: 69501034
        22        rpc:
        23          - url: https://testnet-rpc.monad.xyz
        24        contracts:
        25          - name: WalletToken
        26            address:
        27              - "0xa9012a055bd4e0eDfF8Ce09f960291C09D5322dC"
        28              - "0x534b2f3A21130d7a60830c2Df862319e593943A3"
        29              - "0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D"
        30          - name: SavingsPockets
        31            address:
        32              - "0xff17b04d8d71698295586678f6a6b7452587cf14"
         1    {
         2      "name": "@workspace/wallet-indexer",
         3      "version": "0.1.0",
         4      "private": true,
         5      "type": "module",
         6      "packageManager": "pnpm@10.32.0",
         7      "engines": {
         8        "node": ">=24"
         9      },
        10      "scripts": {
        11        "codegen": "envio codegen",
        12        "dev": "envio dev",
        13        "start": "envio start",
        14        "typecheck": "tsc --noEmit"
        15      },
        16      "dependencies": {
        17        "envio": "3.10.0"
        18      },
        19      "devDependencies": {
        20        "@types/node": "catalog:",
        21        "typescript": "~6.0.3"
        22      }
        23    }
    ✓ • 0ms

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx
    @@ -51,5 +51,3 @@
         if (!isMeraWallet || !profile?.address) return;
    -    let active = true;
         const results = await Promise.allSettled(assets.map((asset) => getErc20Balance(profile.address!, asset)));
    -    if (!active) return;
         setAssetBalances(Object.fromEntries(results.map((result, index) => [
    @@ -59,3 +57,2 @@
         setChainBalanceError(results.some((result) => result.status === 'rejected') ? 'Some balances are unavailable' : '');
    -    active = false;
       }, [assets, isMeraWallet, profile?.address]);

## Activity

    $ git diff --check && git status --short
     M artifacts/ausd-wallet/app/(tabs)/index.tsx
    ✓ • 0ms

## Activity

    $ git diff -- artifacts/wallet-indexer/package.json artifacts/wallet-indexer/config.yaml artifacts/ausd-wallet/services/passkey.ts artifacts/ausd-wallet/services/indexed-activity.ts artifacts/ausd-wallet/components/Primitives.tsx artifacts/ausd-wallet/README.md pnpm-lock.yaml && git log -3 --oneline
    2fa7d48 app is working , deploy envio
    6312de7 chandef app config
    77b0606 added
    ✓ • 0ms

## Activity

    $ git show --stat --oneline HEAD && git show --format= --name-only HEAD && git diff HEAD -- 'artifacts/ausd-wallet/app/(tabs)/index.tsx'
    2fa7d48 app is working , deploy envio
     artifacts/ausd-wallet/README.md                    |    2 +-
     artifacts/ausd-wallet/app/(tabs)/index.tsx         |  144 +-
     artifacts/ausd-wallet/components/Primitives.tsx    |    6 +
     artifacts/ausd-wallet/services/indexed-activity.ts |    5 +-
     artifacts/ausd-wallet/services/passkey.ts          |   34 +-
     artifacts/wallet-indexer/config.yaml               |    3 +-
     artifacts/wallet-indexer/package.json              |    2 +-
     codex-session-assetstatement.md                    | 5396 ++++++++++++++++++++
     pnpm-lock.yaml                                     |  624 ++-
     9 files changed, 6151 insertions(+), 65 deletions(-)
    artifacts/ausd-wallet/README.md
    artifacts/ausd-wallet/app/(tabs)/index.tsx
    artifacts/ausd-wallet/components/Primitives.tsx
    artifacts/ausd-wallet/services/indexed-activity.ts
    artifacts/ausd-wallet/services/passkey.ts
    artifacts/wallet-indexer/config.yaml
    artifacts/wallet-indexer/package.json
    codex-session-assetstatement.md
    pnpm-lock.yaml
    diff --git a/artifacts/ausd-wallet/app/(tabs)/index.tsx b/artifacts/ausd-wallet/app/(tabs)/index.tsx
    index 1e57c55..55ff280 100644
    --- a/artifacts/ausd-wallet/app/(tabs)/index.tsx
    +++ b/artifacts/ausd-wallet/app/(tabs)/index.tsx
    @@ -49,15 +49,12 @@ export default function WalletHome() {
    
       const refreshBalances = useCallback(async () => {
         if (!isMeraWallet || !profile?.address) return;
    -    let active = true;
         const results = await Promise.allSettled(assets.map((asset) => getErc20Balance(profile.address!, asset)));
    -    if (!active) return;
         setAssetBalances(Object.fromEntries(results.map((result, index) => [
           assets[index].address.toLowerCase(),
           result.status === 'fulfilled' ? Number(result.value) : null,
         ])));
         setChainBalanceError(results.some((result) => result.status === 'rejected') ? 'Some balances are unavailable' : '');
    -    active = false;
       }, [assets, isMeraWallet, profile?.address]);
    
       useEffect(() => {
    ✓ • 0ms

## Activity

    $ pnpm --filter @workspace/ausd-wallet run typecheck && pnpm --filter @workspace/wallet-indexer run typecheck
    
    > @workspace/ausd-wallet@0.0.0 typecheck /home/runner/workspace/artifacts/ausd-wallet
    > tsc -p tsconfig.json --noEmit
    
    
    > @workspace/wallet-indexer@0.1.0 typecheck /home/runner/workspace/artifacts/wallet-indexer
    > tsc --noEmit
    
    ✓ • 17.35s

## Assistant

Implemented the Home-tab fixes.

- Pull down on Home to refresh token balances and recent activity.
- “Add asset” accepts a Monad ERC-20 contract address, validates its metadata, saves it locally, and displays its balance. Added tokens are display-only until we update Send/Receive.
- Added USDC to the Envio indexer contracts, so external USDC transfers can appear in activity after redeployment.
- Pinned Envio to `3.10.0` and updated the lockfile.
- Updated the activity setup documentation.

Key files: [Home](/home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx:50), [ERC-20 support](/home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts:396), [USDC indexer config](/home/runner/workspace/artifacts/wallet-indexer/config.yaml:25), [Envio pin](/home/runner/workspace/artifacts/wallet-indexer/package.json:16).

Validation passed:

- `pnpm --filter @workspace/ausd-wallet run typecheck`
- `pnpm --filter @workspace/wallet-indexer run typecheck`

The updated indexer still needs deployment in Envio Cloud before the USDC transfer will be indexed.

## User

good now lets work on transfer and recieve screen, the transfer icon show be name recieve, also the direct recieve screen has a lot of write up and bad ux, amount and coin type should be below , also the text are too big , so improve the ui, then we can work on the aurora intents screen

## Assistant

I’ll simplify the direct Receive flow and change the Home entry point label to “Receive.” I’ll keep the Aurora Intents screen untouched for the next pass.

## Activity

    $ sed -n '1,280p' artifacts/ausd-wallet/app/receive.tsx && sed -n '1,340p' 'artifacts/ausd-wallet/app/(tabs)/index.tsx'
    import React, { useMemo, useState } from 'react';
    import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
    import { router } from 'expo-router';
    import * as Clipboard from 'expo-clipboard';
    import * as Linking from 'expo-linking';
    import QRCode from 'react-native-qrcode-svg';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { TRANSFER_TOKENS, type WalletToken } from '@/services/tokens';
    import {
      BackButton,
      Body,
      Card,
      Eyebrow,
      Field,
      InlineNotice,
      Page,
      PrimaryButton,
      Title,
    } from '@/components/Primitives';
    
    export default function ReceiveScreen() {
      const colors = useColors();
      const { profile } = useWallet();
      const [amount, setAmount] = useState('');
      const [token, setToken] = useState<WalletToken>('AUSD');
      const [copied, setCopied] = useState(false);
      const hasAddress = profile?.mode === 'mera' && Boolean(profile.address);
      const amountIsValid = !amount || (/^\d+(\.\d{1,6})?$/.test(amount) && Number(amount) > 0);
      const requestUrl = useMemo(() => {
        if (!profile?.address || !amountIsValid) return '';
        return Linking.createURL('/send', {
          scheme: 'ausd-wallet',
          isTripleSlashed: true,
          queryParams: {
            recipient: profile.address,
            token,
            ...(amount ? { amount } : {}),
          },
        });
      }, [amount, amountIsValid, profile?.address, token]);
    
      async function copyAddress() {
        if (!profile?.address) return;
        await Clipboard.setStringAsync(profile.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    
      async function shareRequest() {
        if (!requestUrl) return;
        const paymentDescription = amount ? `Request ${amount} ${token} on Monad testnet` : `Request ${token} on Monad testnet`;
        await Share.share({
          message: `${paymentDescription}\n${requestUrl}`,
          url: requestUrl,
        });
      }
    
      return (
        <Page contentStyle={styles.page}>
          <BackButton onPress={() => router.back()} />
          <View style={styles.heading}>
            <Eyebrow>MONAD TESTNET · RECEIVE</Eyebrow>
            <Title>Make it easy to pay you.</Title>
            <Body>Share a request. The sender reviews the details and approves with their passkey.</Body>
          </View>
    
          {!hasAddress ? (
            <Card style={styles.emptyCard}>
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Create a passkey wallet first</Text>
              <Text style={[styles.copy, { color: colors.mutedForeground }]}>A receiving address is created with your Mera account.</Text>
              <PrimaryButton label="Set up wallet" onPress={() => router.replace('/')} icon="arrow-right" />
            </Card>
          ) : (
            <>
              <Field
                label="Request amount · optional"
                value={amount}
                onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
                placeholder="Any amount"
                keyboardType="decimal-pad"
                error={amountIsValid ? undefined : 'Enter an amount greater than zero, with up to six decimals.'}
              />
    
              <View style={styles.tokenRow}>
                {TRANSFER_TOKENS.map((option) => (
                  <Pressable key={option} onPress={() => { setToken(option); setAmount(''); }} style={[styles.tokenOption, { backgroundColor: token === option ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.tokenText, { color: token === option ? colors.primaryForeground : colors.foreground }]}>{option}</Text>
                  </Pressable>
                ))}
              </View>
    
              <Card style={styles.requestCard}>
                <View style={styles.qrFrame}>
                  {requestUrl ? (
                    <QRCode
                      value={requestUrl}
                      size={220}
                      color={colors.foreground}
                      backgroundColor={colors.background}
                      quietZone={12}
                      ecl="M"
                    />
                  ) : null}
                </View>
                <Text style={[styles.requestAmount, { color: colors.foreground }]}>
                  {amount ? `${amount} ${token}` : `Any amount · ${token}`}
                </Text>
                <Text style={[styles.network, { color: colors.mutedForeground }]}>{token} · Monad testnet</Text>
              </Card>
    
              <View style={styles.actions}>
                <PrimaryButton label="Share payment request" icon="share-2" onPress={() => void shareRequest()} disabled={!requestUrl} />
                <PrimaryButton label={copied ? 'Address copied' : 'Copy wallet address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyAddress()} secondary />
              </View>
    
              <Card style={styles.addressCard}>
                <Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>YOUR MONAD ADDRESS</Text>
                <Text selectable style={[styles.address, { color: colors.foreground }]}>{profile?.address}</Text>
              </Card>
    
              <InlineNotice icon="shield">
                Anyone with this request can see your wallet address and requested amount. No payment is made until the sender approves it.
              </InlineNotice>
            </>
          )}
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { gap: 17, paddingTop: 8 },
      heading: { gap: 7, marginTop: 2, marginBottom: 3 },
      requestCard: { alignItems: 'center', gap: 7, paddingVertical: 22, paddingHorizontal: 18 },
      qrFrame: { minHeight: 244, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 12, borderRadius: 12 },
      requestAmount: { marginTop: 5, fontSize: 20, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
      network: { fontSize: 11, fontFamily: 'Inter_500Medium' },
      actions: { gap: 9 },
      tokenRow: { flexDirection: 'row', gap: 8 },
      tokenOption: { minHeight: 38, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
      tokenText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
      addressCard: { gap: 7, padding: 14 },
      addressLabel: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
      address: { fontSize: 11, lineHeight: 17, fontFamily: 'Inter_500Medium' },
      emptyCard: { gap: 11, padding: 18 },
      emptyTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
      copy: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
    });
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
              label="Deposit"
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
                    <Eyebrow>{openAction === 'deposit' ? 'MONEY IN' : 'MONAD TESTNET'}</Eyebrow>
                    <Text style={[styles.drawerTitle, { color: colors.foreground }]}>{openAction === 'deposit' ? 'Add money' : 'Swap tokens'}</Text>
                    <Text style={[styles.drawerSubtitle, { color: colors.mutedForeground }]}>
                      {openAction === 'deposit' ? 'Get AUSD into your wallet.' : 'Swap AUSD to CTK on Monad testnet.'}
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
                        <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>Choose a direct Monad deposit address or bridge from another supported network with Aurora Intents.</Text>
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
    ✓ • 1.45s

## Activity

    $ sed -n '1,260p' artifacts/ausd-wallet/app/aurora-deposit.tsx && rg -n "Deposit|Receive|Transfer" artifacts/ausd-wallet/app
    import React, { useCallback, useEffect, useMemo, useState } from 'react';
    import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import QRCode from 'react-native-qrcode-svg';
    import * as Clipboard from 'expo-clipboard';
    import { router } from 'expo-router';
    import { isAddress } from 'viem';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { MONAD_TESTNET } from '@/services/settlement';
    import { AuroraAsset, AuroraQuote, AuroraTransaction, getAuroraApiKeyConfigured, getAuroraAssets, getAuroraDepositStatus, requestAuroraDepositQuote } from '@/services/aurora-intents';
    import { BackButton, Body, Card, Eyebrow, InlineNotice, Page, PrimaryButton, Title } from '@/components/Primitives';
    
    const EVM_ORIGINS = new Set(['eth', 'ethereum', 'aurora', 'avax', 'avalanche', 'base', 'bera', 'bsc', 'gnosis', 'arbitrum', 'arb', 'op', 'optimism', 'pol', 'polygon', 'scroll', 'xlayer', 'monad']);
    
    const CHAIN_NAMES: Record<string, string> = { eth: 'Ethereum', arb: 'Arbitrum', op: 'Optimism', pol: 'Polygon', avax: 'Avalanche', bsc: 'BNB Chain', gnosis: 'Gnosis' };
    const chainName = (chain: string) => CHAIN_NAMES[chain.toLowerCase()] ?? chain.charAt(0).toUpperCase() + chain.slice(1);
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
      const [amount, setAmount] = useState('');
      const [refundAddress, setRefundAddress] = useState('');
      const [quote, setQuote] = useState<AuroraQuote | null>(null);
      const [quoteLoading, setQuoteLoading] = useState(false);
      const [quoteError, setQuoteError] = useState('');
      const [copied, setCopied] = useState(false);
      const [status, setStatus] = useState<AuroraTransaction | null>(null);
      const [statusLoading, setStatusLoading] = useState(false);
      const [statusError, setStatusError] = useState('');
    
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
        } catch (caught) {
          setAssetError(caught instanceof Error ? caught.message : 'Could not load Aurora supported tokens.');
        } finally {
          setAssetLoading(false);
        }
      }, []);
    
      useEffect(() => { void loadAssets(); }, [loadAssets]);
      useEffect(() => { if (profile?.address) setRefundAddress(profile.address); }, [profile?.address]);
    
      const destination = useMemo(() => assets.find((asset) => asset.blockchain.toLowerCase() === 'monad' &&
        asset.symbol.toUpperCase() === 'AUSD' &&
        asset.contractAddress?.toLowerCase() === MONAD_TESTNET.ausdAddress.toLowerCase()), [assets]);
      const origins = useMemo(() => assets
        .filter((asset) => EVM_ORIGINS.has(asset.blockchain.toLowerCase()) && asset.blockchain.toLowerCase() !== 'monad')
        .sort((left, right) => chainName(left.blockchain).localeCompare(chainName(right.blockchain)) || left.symbol.localeCompare(right.symbol)), [assets]);
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
            <Eyebrow>CROSS-CHAIN DEPOSIT</Eyebrow>
            <Title>Deposit with Aurora</Title>
            <Body>Bridge a supported EVM token into AUSD on Monad. Aurora creates a temporary deposit address for each quote.</Body>
          </View>
    
          {profile?.mode !== 'mera' ? <InlineNotice icon="info">A Mera passkey wallet is required as the Monad AUSD destination.</InlineNotice> : null}
          {!getAuroraApiKeyConfigured() ? (
            <InlineNotice icon="alert-circle">Aurora Intents is not configured yet. Add EXPO_PUBLIC_AURORA_INTENTS_API_KEY from Aurora Intents Studio, then restart or rebuild the app.</InlineNotice>
          ) : null}
    
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Send from</Text>
            {assetLoading ? <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={[styles.help, { color: colors.mutedForeground }]}>Loading supported assets…</Text></View> : null}
            {assetError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{assetError}</Text> : null}
            {!assetLoading && origins.length ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tokenList}>
                {origins.map((asset) => {
                  const active = asset.assetId === selectedAssetId;
                  return <Pressable key={asset.assetId} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => { setSelectedAssetId(asset.assetId); setQuote(null); setStatus(null); }} style={[styles.tokenChoice, { backgroundColor: active ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.tokenSymbol, { color: active ? colors.primaryForeground : colors.foreground }]}>{asset.symbol}</Text>
                    <Text style={[styles.tokenChain, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>{chainName(asset.blockchain)}</Text>
                  </Pressable>;
                })}
              </ScrollView>
            ) : null}
            <Text style={[styles.help, { color: colors.mutedForeground }]}>Only supported EVM assets are listed so refunds can use your 0x wallet address.</Text>
          </View>
    
          <Card style={styles.amountCard}>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT TO DEPOSIT{selectedAsset ? ` · ${selectedAsset.symbol}` : ''}</Text>
            <TextInput accessibilityLabel="Source token amount" value={amount} onChangeText={(value) => { setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); setQuote(null); setStatus(null); }} placeholder="0.00" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.foreground }]} />
          </Card>
    
          <Card style={styles.destinationCard}>
            <View style={styles.destinationIcon}><Feather name="arrow-down" size={16} color={colors.primary} /></View>
            <View style={styles.destinationText}>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>YOU RECEIVE</Text>
              <Text style={[styles.destinationName, { color: colors.foreground }]}>Agora AUSD · Monad</Text>
              <Text style={[styles.help, { color: colors.mutedForeground }]} numberOfLines={1}>{profile?.address ?? 'Wallet address unavailable'}</Text>
            </View>
          </Card>
    
          <View style={styles.refundBlock}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Refund address on source network</Text>
            <TextInput accessibilityLabel="Aurora source network refund address" value={refundAddress} onChangeText={(value) => { setRefundAddress(value); setQuote(null); setStatus(null); }} placeholder="0x…" placeholderTextColor={colors.mutedForeground} autoCapitalize="none" autoCorrect={false} style={[styles.refundInput, { color: colors.foreground, backgroundColor: colors.secondary }]} />
            <Text style={[styles.help, { color: colors.mutedForeground }]}>Defaults to your Monad wallet address. Change it if you want refunds sent to another EVM address you control.</Text>
          </View>
    
          <PrimaryButton label={quoteLoading ? 'Getting quote…' : quote ? 'Refresh deposit quote' : 'Get deposit instructions'} icon="arrow-right" onPress={() => void createQuote()} loading={quoteLoading} disabled={quoteLoading || !getAuroraApiKeyConfigured() || !destination || !selectedAsset || !amountValid || profile?.mode !== 'mera'} />
          {quoteError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{quoteError}</Text> : null}
    
          {quote ? (
            <>
              <Card style={styles.quoteCard}>
                <View style={styles.quoteHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.quoteAmount, { color: colors.foreground }]}>{quote.quote.amountOutFormatted ?? '—'} AUSD</Text>
                    <Text style={[styles.help, { color: colors.mutedForeground }]}>Estimated receive{quote.quote.amountOutUsd ? ` · $${quote.quote.amountOutUsd}` : ''}</Text>
                    <Text style={[styles.help, { color: colors.mutedForeground }]}>Minimum after 1% slippage: {formatUnits(quote.quote.minAmountOut, destination?.decimals ?? 6)} AUSD</Text>
                  </View>
                  <View style={[styles.liveBadge, { backgroundColor: colors.secondary }]}><View style={[styles.liveDot, { backgroundColor: colors.primary }]} /><Text style={[styles.liveText, { color: colors.foreground }]}>QUOTED</Text></View>
                </View>
                <View style={[styles.qrFrame, { backgroundColor: '#fff' }]}><QRCode value={quote.quote.depositAddress} size={180} color="#111111" backgroundColor="#ffffff" quietZone={10} ecl="M" /></View>
                <Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>SEND {amount} {selectedAsset?.symbol} ON {selectedAsset ? chainName(selectedAsset.blockchain).toUpperCase() : ''} TO</Text>
                <Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositAddress}</Text>
                <PrimaryButton label={copied ? 'Deposit address copied' : 'Copy deposit address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyDepositAddress()} secondary />
                {quote.quote.depositMemo ? <View style={[styles.memoBox, { backgroundColor: colors.secondary }]}><Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>REQUIRED MEMO</Text><Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositMemo}</Text></View> : null}
                {quote.quote.timeWhenInactive ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Deposit address expires {new Date(quote.quote.timeWhenInactive).toLocaleString()}.</Text> : null}
                {quote.quote.deadline ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Route deadline {new Date(quote.quote.deadline).toLocaleString()}.</Text> : null}
              </Card>
              <InlineNotice icon="alert-circle">Send only {selectedAsset?.symbol} on {selectedAsset ? chainName(selectedAsset.blockchain) : ''} to this quote address. Sending another token or using another network can lose funds. Refunds, if needed, go to your wallet address on the source EVM chain.</InlineNotice>
              <PrimaryButton label={statusLoading ? 'Checking status…' : 'Check deposit status'} icon="refresh-cw" onPress={() => void checkStatus()} loading={statusLoading} />
              {statusError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{statusError}</Text> : null}
              {status ? <Card style={styles.statusCard}>
                <Text style={[styles.statusLabel, { color: colors.mutedForeground }]}>{status.status.replaceAll('_', ' ')}</Text>
                <Text style={[styles.statusDescription, { color: colors.foreground }]}>{statusDescription}</Text>
                {status.originChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Source transaction: {hash}</Text>)}
                {status.destinationChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Monad transaction: {hash}</Text>)}
                {status.refundReason ? <Text style={[styles.help, { color: colors.destructive }]}>Refund detail: {status.refundReason}</Text> : null}
              </Card> : null}
            </>
          ) : null}
    
          <InlineNotice icon="shield">Each quote creates a one-time Aurora deposit address. Review the token, source network, amount, recipient, and expiry before sending from your external wallet.</InlineNotice>
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { gap: 15, paddingTop: 8, paddingBottom: 28 },
      heading: { gap: 7, marginBottom: 2 },
      section: { gap: 10 },
      sectionTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
      tokenList: { gap: 8, paddingRight: 4 },
      tokenChoice: { minWidth: 84, borderRadius: 15, paddingHorizontal: 12, paddingVertical: 10, gap: 4 },
      tokenSymbol: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
      tokenChain: { fontSize: 10, fontFamily: 'Inter_400Regular' },
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
      refundBlock: { gap: 8 },
      refundInput: { minHeight: 48, borderRadius: 14, paddingHorizontal: 13, fontSize: 12, fontFamily: 'Inter_500Medium' },
      quoteCard: { alignItems: 'center', gap: 12, padding: 16 },
      quoteHeader: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
      quoteAmount: { fontSize: 23, fontFamily: 'Inter_600SemiBold' },
      liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 14, paddingHorizontal: 9, paddingVertical: 6 },
      liveDot: { width: 6, height: 6, borderRadius: 3 },
      liveText: { fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_700Bold' },
      qrFrame: { padding: 10, borderRadius: 12 },
      addressLabel: { alignSelf: 'stretch', fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_600SemiBold' },
      depositAddress: { alignSelf: 'stretch', fontSize: 11, lineHeight: 17, fontFamily: 'Inter_500Medium' },
      memoBox: { alignSelf: 'stretch', gap: 6, borderRadius: 12, padding: 12 },
      statusCard: { gap: 7, padding: 15 },
      statusLabel: { fontSize: 10, letterSpacing: 0.7, fontFamily: 'Inter_700Bold' },
      statusDescription: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_500Medium' },
    });
    artifacts/ausd-wallet/app/savings-goals.tsx:189:  async function withdrawReceivedGifts() {
    artifacts/ausd-wallet/app/savings-goals.tsx:366:          <InlineNotice icon="lock">Goal details are encrypted with a separate Mera PRF namespace. Deposits and payment auto-saves move Monad testnet AUSD into the deployed pocket contract; older goals without an on-chain pocket remain local tracking only.</InlineNotice>
    artifacts/ausd-wallet/app/savings-goals.tsx:410:            {giftBalance !== null && Number(giftBalance) > 0 ? <View style={styles.receivedGift}><Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>Received gifts waiting for you: {money(Number(giftBalance))} AUSD</Text><PrimaryButton label="Withdraw to wallet" icon="download" secondary loading={saving} onPress={() => void withdrawReceivedGifts()} /></View> : null}
    artifacts/ausd-wallet/app/savings-goals.tsx:451:                        <Field label="Deposit AUSD into pocket" value={contribution} onChangeText={setContribution} placeholder="0.00" keyboardType="decimal-pad" />
    artifacts/ausd-wallet/app/savings-goals.tsx:452:                        <PrimaryButton label="Deposit on Monad" icon="lock" loading={saving} onPress={() => void addSavings(goal)} />
    artifacts/ausd-wallet/app/savings-goals.tsx:462:                            <Text style={[styles.addText, { color: colors.primary }]}>Deposit AUSD</Text>
    artifacts/ausd-wallet/app/review.tsx:9:  sendSponsoredTokenTransfer,
    artifacts/ausd-wallet/app/review.tsx:36:  const { profile, addTransfer } = useWallet();
    artifacts/ausd-wallet/app/review.tsx:67:  async function confirmTransfer() {
    artifacts/ausd-wallet/app/review.tsx:106:          : await sendSponsoredTokenTransfer(account, recipient, String(params.amount), getWalletToken(params.token, 'AUSD'));
    artifacts/ausd-wallet/app/review.tsx:140:        await addTransfer(transfer);
    artifacts/ausd-wallet/app/review.tsx:255:            <Text style={[styles.progressTitle, { color: colors.destructive }]}>{autoSave ? 'Payment not confirmed' : swapOnly ? 'Swap not confirmed' : 'Transfer not confirmed'}</Text>
    artifacts/ausd-wallet/app/review.tsx:264:        onPress={confirmTransfer}
    artifacts/ausd-wallet/app/success.tsx:55:      <Title>{autoSaveConfirmed ? 'Payment + savings confirmed' : settledThroughAgora ? 'Settlement confirmed' : 'Transfer confirmed'}</Title>
    artifacts/ausd-wallet/app/swap.tsx:143:          <Text style={[styles.receiverTitle, { color: colors.foreground }]}>Receive in this wallet</Text>
    artifacts/ausd-wallet/app/aurora-deposit.tsx:11:import { AuroraAsset, AuroraQuote, AuroraTransaction, getAuroraApiKeyConfigured, getAuroraAssets, getAuroraDepositStatus, requestAuroraDepositQuote } from '@/services/aurora-intents';
    artifacts/ausd-wallet/app/aurora-deposit.tsx:27:export default function AuroraDepositScreen() {
    artifacts/ausd-wallet/app/aurora-deposit.tsx:84:      const result = await requestAuroraDepositQuote({ sourceAsset: selectedAsset, destinationAsset: destination, amount, recipient: profile.address, refundTo: refundAddress.trim() });
    artifacts/ausd-wallet/app/aurora-deposit.tsx:93:  async function copyDepositAddress() {
    artifacts/ausd-wallet/app/aurora-deposit.tsx:105:      setStatus(await getAuroraDepositStatus(profile.address, quote.quote.depositAddress));
    artifacts/ausd-wallet/app/aurora-deposit.tsx:114:    KNOWN_DEPOSIT_TX: 'Deposit transaction detected; waiting for source-chain confirmation.',
    artifacts/ausd-wallet/app/aurora-deposit.tsx:117:    PROCESSING: 'Deposit received. Aurora is processing the route.',
    artifacts/ausd-wallet/app/aurora-deposit.tsx:128:        <Title>Deposit with Aurora</Title>
    artifacts/ausd-wallet/app/aurora-deposit.tsx:192:            <PrimaryButton label={copied ? 'Deposit address copied' : 'Copy deposit address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyDepositAddress()} secondary />
    artifacts/ausd-wallet/app/aurora-deposit.tsx:194:            {quote.quote.timeWhenInactive ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Deposit address expires {new Date(quote.quote.timeWhenInactive).toLocaleString()}.</Text> : null}
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:7:import { formatIndexedSavings, formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:14:  const { profile, transfers: localTransfers } = useWallet();
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:15:  const { transfers: indexedTransfers, savings: indexedSavings, loading, error, configured } = useIndexedActivity(profile?.address);
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:17:  const indexedHashes = new Set(indexedTransfers.map((item) => item.transactionHash.toLowerCase()));
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:20:        ...indexedTransfers.map((item) => ({ indexed: formatIndexedTransfer(item, profile?.address ?? '') })),
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:21:        ...localTransfers
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:29:    : localTransfers.map((item) => ({ local: item }));
    artifacts/ausd-wallet/app/(tabs)/index.tsx:9:import { formatIndexedTransfer, useIndexedActivity } from '@/services/indexed-activity';
    artifacts/ausd-wallet/app/(tabs)/index.tsx:23:  const { transfers: indexedTransfers, error: activityError, configured, refresh: refreshActivity } = useIndexedActivity(profile?.address);
    artifacts/ausd-wallet/app/(tabs)/index.tsx:90:  const indexedHashes = new Set(indexedTransfers.map((item) => item.transactionHash.toLowerCase()));
    artifacts/ausd-wallet/app/(tabs)/index.tsx:93:        ...indexedTransfers.map((item) => ({ indexed: formatIndexedTransfer(item, profile?.address ?? '') })),
    artifacts/ausd-wallet/app/(tabs)/index.tsx:149:          label="Deposit"
    artifacts/ausd-wallet/app/(tabs)/index.tsx:154:          label="Transfer"
    artifacts/ausd-wallet/app/(tabs)/index.tsx:197:                  <PrimaryButton label="Receive to wallet address" icon="copy" onPress={() => { setOpenAction(null); router.push('/receive'); }} />
    artifacts/ausd-wallet/app/(tabs)/index.tsx:198:                  <PrimaryButton label="Deposit with Aurora Intents" icon="repeat" secondary onPress={() => { setOpenAction(null); router.push('/aurora-deposit'); }} />
    artifacts/ausd-wallet/app/(tabs)/offramp.tsx:9:  { icon: 'smartphone' as const, title: 'Mobile money', detail: 'Receive on a mobile money wallet' },
    artifacts/ausd-wallet/app/receive.tsx:22:export default function ReceiveScreen() {
    ✓ • 0ms

## Assistant

The direct Receive screen currently puts the payment controls before the QR and uses a large promotional heading plus two explanatory notices. I’m reducing it to the address, QR, sharing actions, then optional amount and asset controls underneath.

## Activity

    file changes: Completed · 2 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx
    @@ -148,3 +148,3 @@
               icon="download"
    -          label="Deposit"
    +          label="Receive"
               onPress={() => { setDrawerOffset(0); setOpenAction('deposit'); }}
    @@ -179,6 +179,6 @@
                   <View>
    -                <Eyebrow>{openAction === 'deposit' ? 'MONEY IN' : 'MONAD TESTNET'}</Eyebrow>
    -                <Text style={[styles.drawerTitle, { color: colors.foreground }]}>{openAction === 'deposit' ? 'Add money' : 'Swap tokens'}</Text>
    +                <Eyebrow>{openAction === 'deposit' ? 'RECEIVE' : 'MONAD TESTNET'}</Eyebrow>
    +                <Text style={[styles.drawerTitle, { color: colors.foreground }]}>{openAction === 'deposit' ? 'Receive money' : 'Swap tokens'}</Text>
                     <Text style={[styles.drawerSubtitle, { color: colors.mutedForeground }]}>
    -                  {openAction === 'deposit' ? 'Get AUSD into your wallet.' : 'Swap AUSD to CTK on Monad testnet.'}
    +                  {openAction === 'deposit' ? 'Share your Monad wallet address or bridge funds from another network.' : 'Swap AUSD to CTK on Monad testnet.'}
                     </Text>
    @@ -194,3 +194,3 @@
                         <Feather name="info" size={16} color={colors.primary} />
    -                    <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>Choose a direct Monad deposit address or bridge from another supported network with Aurora Intents.</Text>
    +                    <Text style={[styles.actionMethodCopy, { color: colors.mutedForeground, flex: 1 }]}>Receive directly to your Monad address, or bridge from another supported network with Aurora Intents.</Text>
                       </View>
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/receive.tsx
    @@ -11,10 +11,6 @@
       BackButton,
    -  Body,
       Card,
    -  Eyebrow,
       Field,
    -  InlineNotice,
       Page,
       PrimaryButton,
    -  Title,
     } from '@/components/Primitives';
    @@ -62,5 +58,4 @@
           <View style={styles.heading}>
    -        <Eyebrow>MONAD TESTNET · RECEIVE</Eyebrow>
    -        <Title>Make it easy to pay you.</Title>
    -        <Body>Share a request. The sender reviews the details and approves with their passkey.</Body>
    +        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>MONAD TESTNET</Text>
    +        <Text style={[styles.title, { color: colors.foreground }]}>Receive</Text>
           </View>
    @@ -75,19 +70,2 @@
             <>
    -          <Field
    -            label="Request amount · optional"
    -            value={amount}
    -            onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
    -            placeholder="Any amount"
    -            keyboardType="decimal-pad"
    -            error={amountIsValid ? undefined : 'Enter an amount greater than zero, with up to six decimals.'}
    -          />
    -
    -          <View style={styles.tokenRow}>
    -            {TRANSFER_TOKENS.map((option) => (
    -              <Pressable key={option} onPress={() => { setToken(option); setAmount(''); }} style={[styles.tokenOption, { backgroundColor: token === option ? colors.primary : colors.secondary }]}>
    -                <Text style={[styles.tokenText, { color: token === option ? colors.primaryForeground : colors.foreground }]}>{option}</Text>
    -              </Pressable>
    -            ))}
    -          </View>
    -
               <Card style={styles.requestCard}>
    @@ -105,6 +83,3 @@
                 </View>
    -            <Text style={[styles.requestAmount, { color: colors.foreground }]}>
    -              {amount ? `${amount} ${token}` : `Any amount · ${token}`}
    -            </Text>
    -            <Text style={[styles.network, { color: colors.mutedForeground }]}>{token} · Monad testnet</Text>
    +            <Text selectable style={[styles.address, { color: colors.mutedForeground }]}>{profile?.address}</Text>
               </Card>
    @@ -112,3 +87,3 @@
               <View style={styles.actions}>
    -            <PrimaryButton label="Share payment request" icon="share-2" onPress={() => void shareRequest()} disabled={!requestUrl} />
    +            <PrimaryButton label="Share request" icon="share-2" onPress={() => void shareRequest()} disabled={!requestUrl} />
                 <PrimaryButton label={copied ? 'Address copied' : 'Copy wallet address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyAddress()} secondary />
    @@ -116,10 +91,22 @@
     
    -          <Card style={styles.addressCard}>
    -            <Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>YOUR MONAD ADDRESS</Text>
    -            <Text selectable style={[styles.address, { color: colors.foreground }]}>{profile?.address}</Text>
    -          </Card>
    -
    -          <InlineNotice icon="shield">
    -            Anyone with this request can see your wallet address and requested amount. No payment is made until the sender approves it.
    -          </InlineNotice>
    +          <View style={styles.requestDetails}>
    +            <Field
    +              label="Amount · optional"
    +              value={amount}
    +              onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
    +              placeholder="Any amount"
    +              keyboardType="decimal-pad"
    +              error={amountIsValid ? undefined : 'Enter an amount greater than zero, with up to six decimals.'}
    +            />
    +            <View style={styles.tokenRow}>
    +              <Text style={[styles.tokenLabel, { color: colors.mutedForeground }]}>ASSET</Text>
    +              <View style={styles.tokenOptions}>
    +                {TRANSFER_TOKENS.map((option) => (
    +                  <Pressable key={option} onPress={() => { setToken(option); setAmount(''); }} style={[styles.tokenOption, { backgroundColor: token === option ? colors.primary : colors.secondary }]}>
    +                    <Text style={[styles.tokenText, { color: token === option ? colors.primaryForeground : colors.foreground }]}>{option}</Text>
    +                  </Pressable>
    +                ))}
    +              </View>
    +            </View>
    +          </View>
             </>
    @@ -131,15 +118,16 @@
     const styles = StyleSheet.create({
    -  page: { gap: 17, paddingTop: 8 },
    -  heading: { gap: 7, marginTop: 2, marginBottom: 3 },
    -  requestCard: { alignItems: 'center', gap: 7, paddingVertical: 22, paddingHorizontal: 18 },
    -  qrFrame: { minHeight: 244, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 12, borderRadius: 12 },
    -  requestAmount: { marginTop: 5, fontSize: 20, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
    -  network: { fontSize: 11, fontFamily: 'Inter_500Medium' },
    +  page: { gap: 14, paddingTop: 8, paddingBottom: 24 },
    +  heading: { gap: 3, marginTop: 2 },
    +  eyebrow: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
    +  title: { fontSize: 23, lineHeight: 29, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
    +  requestCard: { alignItems: 'center', gap: 10, paddingVertical: 16, paddingHorizontal: 16 },
    +  qrFrame: { minHeight: 204, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderRadius: 12 },
       actions: { gap: 9 },
    -  tokenRow: { flexDirection: 'row', gap: 8 },
    +  requestDetails: { gap: 12, marginTop: 2 },
    +  tokenRow: { gap: 8 },
    +  tokenLabel: { fontSize: 9, letterSpacing: 0.7, fontFamily: 'Inter_600SemiBold' },
    +  tokenOptions: { flexDirection: 'row', gap: 8 },
       tokenOption: { minHeight: 38, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
       tokenText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
    -  addressCard: { gap: 7, padding: 14 },
    -  addressLabel: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
    -  address: { fontSize: 11, lineHeight: 17, fontFamily: 'Inter_500Medium' },
    +  address: { fontSize: 9, lineHeight: 14, textAlign: 'center', fontFamily: 'Inter_500Medium' },
       emptyCard: { gap: 11, padding: 18 },

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/receive.tsx
    @@ -75,3 +75,3 @@
                       value={requestUrl}
    -                  size={220}
    +                  size={180}
                       color={colors.foreground}

## Assistant

The revised screen now leads with the QR and address. Optional amount and asset selection sit below the share and copy actions, and the oversized heading and warning copy are gone.

## Activity

    $ pnpm --filter @workspace/ausd-wallet run typecheck && git diff --check && git diff --stat
    
    > @workspace/ausd-wallet@0.0.0 typecheck /home/runner/workspace/artifacts/ausd-wallet
    > tsc -p tsconfig.json --noEmit
    
     artifacts/ausd-wallet/app/(tabs)/index.tsx | 10 ++--
     artifacts/ausd-wallet/app/receive.tsx      | 84 +++++++++++++-----------------
     2 files changed, 41 insertions(+), 53 deletions(-)
    ✓ • 11.33s

## Assistant

Updated the direct Receive experience.

- Home’s “Deposit” action now reads **Receive**.
- The receive sheet uses clearer receive wording.
- Receive now leads with a smaller QR and wallet address.
- Share and copy actions are immediately below.
- Optional amount and asset selection now appear underneath.
- Removed the large headline and extra explanatory copy.

Changed [Home](/home/runner/workspace/artifacts/ausd-wallet/app/(tabs)/index.tsx:149) and [Receive](/home/runner/workspace/artifacts/ausd-wallet/app/receive.tsx:53).

Validation passed: `pnpm --filter @workspace/ausd-wallet run typecheck`.

Aurora Intents remains unchanged for the next pass.

## User

for intents deposit, use pashttps://docs.intents.aurora.dev/intents-deposits/quickstart/api-integration, this api has the quotes, execute and monitor, so you will look at the ui and propose a flow for this before you build , i have the api key pasEXPO_PUBLIC_AURORA_INITENTS_API_KEY

## Assistant

I’ll compare Aurora’s current deposits API with the existing implementation and return a concrete screen flow before changing it. I’ll use the API key name you provided as a configuration detail, but I won’t add or expose the key.

## Activity

    $ sed -n '1,360p' artifacts/ausd-wallet/services/aurora-intents.ts && sed -n '1,330p' artifacts/ausd-wallet/app/aurora-deposit.tsx
    const API_BASE = 'https://intents-api.aurora.dev/api';
    const API_KEY = process.env.EXPO_PUBLIC_AURORA_INTENTS_API_KEY?.trim();
    
    export interface AuroraAsset {
      assetId: string;
      decimals: number;
      blockchain: string;
      symbol: string;
      price?: number;
      contractAddress?: string | null;
    }
    
    export interface AuroraQuote {
      timestamp: string;
      signature: string;
      quoteRequest: Record<string, unknown>;
      quote: {
        depositAddress: string;
        depositMemo?: string | null;
        deadline?: string;
        timeWhenInactive?: string;
        amountInFormatted?: string;
        amountOutFormatted?: string;
        amountOutUsd?: string;
        minAmountOut?: string;
        timeEstimate?: number;
      };
    }
    
    export interface AuroraTransaction {
      depositAddress: string;
      status: 'KNOWN_DEPOSIT_TX' | 'PENDING_DEPOSIT' | 'INCOMPLETE_DEPOSIT' | 'PROCESSING' | 'SUCCESS' | 'REFUNDED' | 'FAILED';
      createdAt: string;
      amountInFormatted: string;
      amountOutFormatted: string;
      originChainTxHashes: string[];
      destinationChainTxHashes: string[];
      refundReason?: string | null;
    }
    
    function requireKey() {
      if (!API_KEY) throw new Error('Aurora Intents is not configured. Add EXPO_PUBLIC_AURORA_INTENTS_API_KEY and restart the app.');
      return API_KEY;
    }
    
    async function readResponse<T>(response: Response): Promise<T> {
      const data = await response.json().catch(() => null) as ({ message?: string; error?: string } | null);
      if (!response.ok) {
        const message = data?.message || data?.error || `Aurora Intents request failed (${response.status}).`;
        throw new Error(message);
      }
      return data as T;
    }
    
    export async function getAuroraAssets(): Promise<AuroraAsset[]> {
      const response = await fetch(`${API_BASE}/tokens/${encodeURIComponent(requireKey())}`);
      const data = await readResponse<unknown>(response);
      const assets = Array.isArray(data) ? data : (data as { data?: unknown[] } | null)?.data;
      if (!Array.isArray(assets)) throw new Error('Aurora returned an unexpected token list.');
      return assets.filter((asset): asset is AuroraAsset => {
        if (typeof asset !== 'object' || asset === null) return false;
        const token = asset as Partial<AuroraAsset>;
        return typeof token.assetId === 'string' && typeof token.symbol === 'string' &&
          typeof token.blockchain === 'string' && Number.isInteger(token.decimals);
      });
    }
    
    function toSmallestUnit(amount: string, decimals: number): string {
      if (!/^\d+(\.\d+)?$/.test(amount)) throw new Error('Enter a valid deposit amount.');
      const [whole, fraction = ''] = amount.split('.');
      if (fraction.length > decimals) throw new Error(`This token supports up to ${decimals} decimal places.`);
      return (BigInt(whole) * (10n ** BigInt(decimals)) + BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals) || '0')).toString();
    }
    
    export async function requestAuroraDepositQuote(input: {
      sourceAsset: AuroraAsset;
      destinationAsset: AuroraAsset;
      amount: string;
      recipient: string;
      refundTo: string;
    }): Promise<AuroraQuote> {
      const amount = toSmallestUnit(input.amount, input.sourceAsset.decimals);
      const response = await fetch(`${API_BASE}/quote/${encodeURIComponent(requireKey())}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dry: false,
          swapType: 'EXACT_INPUT',
          slippageTolerance: 100,
          originAsset: input.sourceAsset.assetId,
          depositType: 'ORIGIN_CHAIN',
          destinationAsset: input.destinationAsset.assetId,
          amount,
          recipient: input.recipient,
          recipientType: 'DESTINATION_CHAIN',
          refundTo: input.refundTo,
          refundType: 'ORIGIN_CHAIN',
          deadline: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        }),
      });
      const quote = await readResponse<AuroraQuote>(response);
      if (!quote?.quote?.depositAddress) throw new Error('Aurora did not return a deposit address for this route.');
      return quote;
    }
    
    export async function getAuroraDepositStatus(walletAddress: string, depositAddress: string): Promise<AuroraTransaction | null> {
      const params = new URLSearchParams({ walletAddress, numberOfTransactions: '100' });
      const response = await fetch(`${API_BASE}/transactions/${encodeURIComponent(requireKey())}?${params.toString()}`);
      const data = await readResponse<unknown>(response);
      const transactions = Array.isArray(data) ? data : (data as { data?: unknown[] } | null)?.data;
      if (!Array.isArray(transactions)) throw new Error('Aurora returned an unexpected transaction history.');
      return transactions.find((item): item is AuroraTransaction =>
        typeof item === 'object' && item !== null &&
        (item as Partial<AuroraTransaction>).depositAddress?.toLowerCase() === depositAddress.toLowerCase()) ?? null;
    }
    
    export function getAuroraApiKeyConfigured() {
      return Boolean(API_KEY);
    }
    import React, { useCallback, useEffect, useMemo, useState } from 'react';
    import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import QRCode from 'react-native-qrcode-svg';
    import * as Clipboard from 'expo-clipboard';
    import { router } from 'expo-router';
    import { isAddress } from 'viem';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { MONAD_TESTNET } from '@/services/settlement';
    import { AuroraAsset, AuroraQuote, AuroraTransaction, getAuroraApiKeyConfigured, getAuroraAssets, getAuroraDepositStatus, requestAuroraDepositQuote } from '@/services/aurora-intents';
    import { BackButton, Body, Card, Eyebrow, InlineNotice, Page, PrimaryButton, Title } from '@/components/Primitives';
    
    const EVM_ORIGINS = new Set(['eth', 'ethereum', 'aurora', 'avax', 'avalanche', 'base', 'bera', 'bsc', 'gnosis', 'arbitrum', 'arb', 'op', 'optimism', 'pol', 'polygon', 'scroll', 'xlayer', 'monad']);
    
    const CHAIN_NAMES: Record<string, string> = { eth: 'Ethereum', arb: 'Arbitrum', op: 'Optimism', pol: 'Polygon', avax: 'Avalanche', bsc: 'BNB Chain', gnosis: 'Gnosis' };
    const chainName = (chain: string) => CHAIN_NAMES[chain.toLowerCase()] ?? chain.charAt(0).toUpperCase() + chain.slice(1);
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
      const [amount, setAmount] = useState('');
      const [refundAddress, setRefundAddress] = useState('');
      const [quote, setQuote] = useState<AuroraQuote | null>(null);
      const [quoteLoading, setQuoteLoading] = useState(false);
      const [quoteError, setQuoteError] = useState('');
      const [copied, setCopied] = useState(false);
      const [status, setStatus] = useState<AuroraTransaction | null>(null);
      const [statusLoading, setStatusLoading] = useState(false);
      const [statusError, setStatusError] = useState('');
    
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
        } catch (caught) {
          setAssetError(caught instanceof Error ? caught.message : 'Could not load Aurora supported tokens.');
        } finally {
          setAssetLoading(false);
        }
      }, []);
    
      useEffect(() => { void loadAssets(); }, [loadAssets]);
      useEffect(() => { if (profile?.address) setRefundAddress(profile.address); }, [profile?.address]);
    
      const destination = useMemo(() => assets.find((asset) => asset.blockchain.toLowerCase() === 'monad' &&
        asset.symbol.toUpperCase() === 'AUSD' &&
        asset.contractAddress?.toLowerCase() === MONAD_TESTNET.ausdAddress.toLowerCase()), [assets]);
      const origins = useMemo(() => assets
        .filter((asset) => EVM_ORIGINS.has(asset.blockchain.toLowerCase()) && asset.blockchain.toLowerCase() !== 'monad')
        .sort((left, right) => chainName(left.blockchain).localeCompare(chainName(right.blockchain)) || left.symbol.localeCompare(right.symbol)), [assets]);
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
            <Eyebrow>CROSS-CHAIN DEPOSIT</Eyebrow>
            <Title>Deposit with Aurora</Title>
            <Body>Bridge a supported EVM token into AUSD on Monad. Aurora creates a temporary deposit address for each quote.</Body>
          </View>
    
          {profile?.mode !== 'mera' ? <InlineNotice icon="info">A Mera passkey wallet is required as the Monad AUSD destination.</InlineNotice> : null}
          {!getAuroraApiKeyConfigured() ? (
            <InlineNotice icon="alert-circle">Aurora Intents is not configured yet. Add EXPO_PUBLIC_AURORA_INTENTS_API_KEY from Aurora Intents Studio, then restart or rebuild the app.</InlineNotice>
          ) : null}
    
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Send from</Text>
            {assetLoading ? <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={[styles.help, { color: colors.mutedForeground }]}>Loading supported assets…</Text></View> : null}
            {assetError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{assetError}</Text> : null}
            {!assetLoading && origins.length ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tokenList}>
                {origins.map((asset) => {
                  const active = asset.assetId === selectedAssetId;
                  return <Pressable key={asset.assetId} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => { setSelectedAssetId(asset.assetId); setQuote(null); setStatus(null); }} style={[styles.tokenChoice, { backgroundColor: active ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.tokenSymbol, { color: active ? colors.primaryForeground : colors.foreground }]}>{asset.symbol}</Text>
                    <Text style={[styles.tokenChain, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>{chainName(asset.blockchain)}</Text>
                  </Pressable>;
                })}
              </ScrollView>
            ) : null}
            <Text style={[styles.help, { color: colors.mutedForeground }]}>Only supported EVM assets are listed so refunds can use your 0x wallet address.</Text>
          </View>
    
          <Card style={styles.amountCard}>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT TO DEPOSIT{selectedAsset ? ` · ${selectedAsset.symbol}` : ''}</Text>
            <TextInput accessibilityLabel="Source token amount" value={amount} onChangeText={(value) => { setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); setQuote(null); setStatus(null); }} placeholder="0.00" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.foreground }]} />
          </Card>
    
          <Card style={styles.destinationCard}>
            <View style={styles.destinationIcon}><Feather name="arrow-down" size={16} color={colors.primary} /></View>
            <View style={styles.destinationText}>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>YOU RECEIVE</Text>
              <Text style={[styles.destinationName, { color: colors.foreground }]}>Agora AUSD · Monad</Text>
              <Text style={[styles.help, { color: colors.mutedForeground }]} numberOfLines={1}>{profile?.address ?? 'Wallet address unavailable'}</Text>
            </View>
          </Card>
    
          <View style={styles.refundBlock}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Refund address on source network</Text>
            <TextInput accessibilityLabel="Aurora source network refund address" value={refundAddress} onChangeText={(value) => { setRefundAddress(value); setQuote(null); setStatus(null); }} placeholder="0x…" placeholderTextColor={colors.mutedForeground} autoCapitalize="none" autoCorrect={false} style={[styles.refundInput, { color: colors.foreground, backgroundColor: colors.secondary }]} />
            <Text style={[styles.help, { color: colors.mutedForeground }]}>Defaults to your Monad wallet address. Change it if you want refunds sent to another EVM address you control.</Text>
          </View>
    
          <PrimaryButton label={quoteLoading ? 'Getting quote…' : quote ? 'Refresh deposit quote' : 'Get deposit instructions'} icon="arrow-right" onPress={() => void createQuote()} loading={quoteLoading} disabled={quoteLoading || !getAuroraApiKeyConfigured() || !destination || !selectedAsset || !amountValid || profile?.mode !== 'mera'} />
          {quoteError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{quoteError}</Text> : null}
    
          {quote ? (
            <>
              <Card style={styles.quoteCard}>
                <View style={styles.quoteHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.quoteAmount, { color: colors.foreground }]}>{quote.quote.amountOutFormatted ?? '—'} AUSD</Text>
                    <Text style={[styles.help, { color: colors.mutedForeground }]}>Estimated receive{quote.quote.amountOutUsd ? ` · $${quote.quote.amountOutUsd}` : ''}</Text>
                    <Text style={[styles.help, { color: colors.mutedForeground }]}>Minimum after 1% slippage: {formatUnits(quote.quote.minAmountOut, destination?.decimals ?? 6)} AUSD</Text>
                  </View>
                  <View style={[styles.liveBadge, { backgroundColor: colors.secondary }]}><View style={[styles.liveDot, { backgroundColor: colors.primary }]} /><Text style={[styles.liveText, { color: colors.foreground }]}>QUOTED</Text></View>
                </View>
                <View style={[styles.qrFrame, { backgroundColor: '#fff' }]}><QRCode value={quote.quote.depositAddress} size={180} color="#111111" backgroundColor="#ffffff" quietZone={10} ecl="M" /></View>
                <Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>SEND {amount} {selectedAsset?.symbol} ON {selectedAsset ? chainName(selectedAsset.blockchain).toUpperCase() : ''} TO</Text>
                <Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositAddress}</Text>
                <PrimaryButton label={copied ? 'Deposit address copied' : 'Copy deposit address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyDepositAddress()} secondary />
                {quote.quote.depositMemo ? <View style={[styles.memoBox, { backgroundColor: colors.secondary }]}><Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>REQUIRED MEMO</Text><Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositMemo}</Text></View> : null}
                {quote.quote.timeWhenInactive ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Deposit address expires {new Date(quote.quote.timeWhenInactive).toLocaleString()}.</Text> : null}
                {quote.quote.deadline ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Route deadline {new Date(quote.quote.deadline).toLocaleString()}.</Text> : null}
              </Card>
              <InlineNotice icon="alert-circle">Send only {selectedAsset?.symbol} on {selectedAsset ? chainName(selectedAsset.blockchain) : ''} to this quote address. Sending another token or using another network can lose funds. Refunds, if needed, go to your wallet address on the source EVM chain.</InlineNotice>
              <PrimaryButton label={statusLoading ? 'Checking status…' : 'Check deposit status'} icon="refresh-cw" onPress={() => void checkStatus()} loading={statusLoading} />
              {statusError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{statusError}</Text> : null}
              {status ? <Card style={styles.statusCard}>
                <Text style={[styles.statusLabel, { color: colors.mutedForeground }]}>{status.status.replaceAll('_', ' ')}</Text>
                <Text style={[styles.statusDescription, { color: colors.foreground }]}>{statusDescription}</Text>
                {status.originChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Source transaction: {hash}</Text>)}
                {status.destinationChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Monad transaction: {hash}</Text>)}
                {status.refundReason ? <Text style={[styles.help, { color: colors.destructive }]}>Refund detail: {status.refundReason}</Text> : null}
              </Card> : null}
            </>
          ) : null}
    
          <InlineNotice icon="shield">Each quote creates a one-time Aurora deposit address. Review the token, source network, amount, recipient, and expiry before sending from your external wallet.</InlineNotice>
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { gap: 15, paddingTop: 8, paddingBottom: 28 },
      heading: { gap: 7, marginBottom: 2 },
      section: { gap: 10 },
      sectionTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
      tokenList: { gap: 8, paddingRight: 4 },
      tokenChoice: { minWidth: 84, borderRadius: 15, paddingHorizontal: 12, paddingVertical: 10, gap: 4 },
      tokenSymbol: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
      tokenChain: { fontSize: 10, fontFamily: 'Inter_400Regular' },
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
      refundBlock: { gap: 8 },
      refundInput: { minHeight: 48, borderRadius: 14, paddingHorizontal: 13, fontSize: 12, fontFamily: 'Inter_500Medium' },
      quoteCard: { alignItems: 'center', gap: 12, padding: 16 },
      quoteHeader: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
      quoteAmount: { fontSize: 23, fontFamily: 'Inter_600SemiBold' },
      liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 14, paddingHorizontal: 9, paddingVertical: 6 },
      liveDot: { width: 6, height: 6, borderRadius: 3 },
      liveText: { fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_700Bold' },
      qrFrame: { padding: 10, borderRadius: 12 },
      addressLabel: { alignSelf: 'stretch', fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_600SemiBold' },
      depositAddress: { alignSelf: 'stretch', fontSize: 11, lineHeight: 17, fontFamily: 'Inter_500Medium' },
      memoBox: { alignSelf: 'stretch', gap: 6, borderRadius: 12, padding: 12 },
      statusCard: { gap: 7, padding: 15 },
      statusLabel: { fontSize: 10, letterSpacing: 0.7, fontFamily: 'Inter_700Bold' },
      statusDescription: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_500Medium' },
    });
    ✓ • 1.36s

## Activity

    $ rg -n "AURORA|aurora" artifacts/ausd-wallet README.md .github codemagic.yaml 2>/dev/null || true
    artifacts/ausd-wallet/README.md:28:Aurora Intents deposits require `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`, created in [Aurora Intents Studio](https://studio.aurora.dev/). Add it to local environment as shown in `.env.example`. For GitHub Actions builds, set it as the repository variable `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`; for Codemagic, add it to the `ausd_wallet` variable group. Restart or rebuild after configuring. The key is public and embedded in the app bundle. The app loads supported assets, selects the configured Monad AUSD contract, requests a quote, shows the generated deposit address and any required memo, and can query transaction status. The user sends the source token from an external wallet; the app does not sign or submit that source-chain transfer. Always follow the quoted source chain, token, amount, address, memo, and expiry.
    .github/workflows/build-android-apk.yml:26:      EXPO_PUBLIC_AURORA_INTENTS_API_KEY: ${{ vars.EXPO_PUBLIC_AURORA_INTENTS_API_KEY }}
    .github/workflows/build-android-apk.yml:94:          if [[ -z "$EXPO_PUBLIC_AURORA_INTENTS_API_KEY" ]]; then
    .github/workflows/build-android-apk.yml:95:            echo '::notice::EXPO_PUBLIC_AURORA_INTENTS_API_KEY is unset; Aurora Intents deposits will be unavailable.'
    artifacts/ausd-wallet/services/aurora-intents.ts:1:const API_BASE = 'https://intents-api.aurora.dev/api';
    artifacts/ausd-wallet/services/aurora-intents.ts:2:const API_KEY = process.env.EXPO_PUBLIC_AURORA_INTENTS_API_KEY?.trim();
    artifacts/ausd-wallet/services/aurora-intents.ts:42:  if (!API_KEY) throw new Error('Aurora Intents is not configured. Add EXPO_PUBLIC_AURORA_INTENTS_API_KEY and restart the app.');
    artifacts/ausd-wallet/app/aurora-deposit.tsx:11:import { AuroraAsset, AuroraQuote, AuroraTransaction, getAuroraApiKeyConfigured, getAuroraAssets, getAuroraDepositStatus, requestAuroraDepositQuote } from '@/services/aurora-intents';
    artifacts/ausd-wallet/app/aurora-deposit.tsx:14:const EVM_ORIGINS = new Set(['eth', 'ethereum', 'aurora', 'avax', 'avalanche', 'base', 'bera', 'bsc', 'gnosis', 'arbitrum', 'arb', 'op', 'optimism', 'pol', 'polygon', 'scroll', 'xlayer', 'monad']);
    artifacts/ausd-wallet/app/aurora-deposit.tsx:134:        <InlineNotice icon="alert-circle">Aurora Intents is not configured yet. Add EXPO_PUBLIC_AURORA_INTENTS_API_KEY from Aurora Intents Studio, then restart or rebuild the app.</InlineNotice>
    artifacts/ausd-wallet/app/_layout.tsx:30:    const isProtectedRoute = ['(tabs)', 'review', 'success', 'receive', 'scan', 'swap', 'aurora-deposit', 'savings-goals', 'contacts'].includes(segments[0] ?? '');
    artifacts/ausd-wallet/app/_layout.tsx:44:      <Stack.Screen name="aurora-deposit" options={{ headerShown: false, animation: 'slide_from_right' }} />
    artifacts/ausd-wallet/app/(tabs)/index.tsx:198:                  <PrimaryButton label="Deposit with Aurora Intents" icon="repeat" secondary onPress={() => { setOpenAction(null); router.push('/aurora-deposit'); }} />
    ✓ • 223ms

## Activity

    Opened https://docs.intents.aurora.dev/intents-deposits/quickstart/api-integration

## Activity

    Opened https://docs.intents.aurora.dev/intents-deposits/quickstart/api-integration

## Assistant

The current implementation already uses Aurora’s supported-token, quote, and transaction-history endpoints. The main issue is the UX: it treats source selection, quote, sending instructions, and monitoring as one long form.

Aurora’s origin-chain flow does not submit the source transfer from this app. It creates a quote and deposit address; the user sends the exact quoted token from an external wallet, then the app monitors the deposit. [Aurora API integration guide](https://docs.intents.aurora.dev/intents-deposits/quickstart/api-integration)

Proposed flow:

| Step | Screen content | Primary action |
|---|---|---|
| 1. Select source | “Deposit to AUSD” with a compact chain and token selector, amount, and fixed destination: AUSD on Monad | Continue |
| 2. Review quote | You send, estimated AUSD received, minimum received, expected time, destination wallet, and a collapsed refund-address field | Get deposit address |
| 3. Send funds | Large exact instructions: token, source chain, amount, temporary deposit address, required memo, copy button, QR | I’ve sent it |
| 4. Track | Automatic polling after “I’ve sent it,” with a plain status timeline: Waiting → Detected → Processing → Delivered / Refunded / Failed | Refresh status |

A few product decisions I recommend:

- Keep the source-token picker limited to EVM routes for now, since this wallet validates EVM refund addresses and has no NEAR or Bitcoin wallet support.
- Move the refund address into the quote review step and default it to the user’s Monad address.
- Do not show the deposit QR until the quote is confirmed, because the deposit address is temporary and quote-specific.
- Persist the active quote locally so a user can close the app and return to monitor it.
- Rename “Get deposit instructions” to “Review quote,” then “Get deposit address” after the review step.

One configuration correction: the app expects `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`; the name in your message has an extra `I` in `INITENTS`. Use the exact existing name when adding the key.

If this flow looks right, I’ll build it next.

## User

good implement this as recommended

## Assistant

I’ll turn Aurora deposit into a four-stage flow: source and amount, quote review, deposit instructions, then monitoring. The app will retain an active deposit locally so the monitoring screen can resume after reopening.

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/aurora-deposit.tsx
    @@ -5,2 +5,3 @@
     import * as Clipboard from 'expo-clipboard';
    +import AsyncStorage from '@react-native-async-storage/async-storage';
     import { router } from 'expo-router';
    @@ -11,3 +12,3 @@
     import { AuroraAsset, AuroraQuote, AuroraTransaction, getAuroraApiKeyConfigured, getAuroraAssets, getAuroraDepositStatus, requestAuroraDepositQuote } from '@/services/aurora-intents';
    -import { BackButton, Body, Card, Eyebrow, InlineNotice, Page, PrimaryButton, Title } from '@/components/Primitives';
    +import { BackButton, Card, InlineNotice, Page, PrimaryButton } from '@/components/Primitives';
     
    @@ -16,3 +17,11 @@
     const CHAIN_NAMES: Record<string, string> = { eth: 'Ethereum', arb: 'Arbitrum', op: 'Optimism', pol: 'Polygon', avax: 'Avalanche', bsc: 'BNB Chain', gnosis: 'Gnosis' };
    +const ACTIVE_DEPOSIT_STORAGE_KEY = 'ausd-wallet-active-aurora-deposit-v1';
     const chainName = (chain: string) => CHAIN_NAMES[chain.toLowerCase()] ?? chain.charAt(0).toUpperCase() + chain.slice(1);
    +type DepositStep = 'form' | 'review' | 'instructions' | 'tracking';
    +interface ActiveDeposit {
    +  quote: AuroraQuote;
    +  sourceAsset: AuroraAsset;
    +  amount: string;
    +  refundAddress: string;
    +}
     const formatUnits = (raw: string | undefined, decimals: number) => {
    @@ -33,2 +42,3 @@
       const [selectedAssetId, setSelectedAssetId] = useState('');
    +  const [selectedChain, setSelectedChain] = useState('');
       const [amount, setAmount] = useState('');
    @@ -42,2 +52,5 @@
       const [statusError, setStatusError] = useState('');
    +  const [step, setStep] = useState<DepositStep>('form');
    +  const [showRefundAddress, setShowRefundAddress] = useState(false);
    +  const [resumedDeposit, setResumedDeposit] = useState<ActiveDeposit | null>(null);
     
    @@ -64,2 +77,13 @@
       useEffect(() => { if (profile?.address) setRefundAddress(profile.address); }, [profile?.address]);
    +  useEffect(() => {
    +    AsyncStorage.getItem(ACTIVE_DEPOSIT_STORAGE_KEY)
    +      .then((value) => {
    +        if (!value) return;
    +        const stored = JSON.parse(value) as ActiveDeposit;
    +        if (stored?.quote?.quote?.depositAddress && stored.sourceAsset?.assetId) {
    +          setResumedDeposit(stored);
    +        }
    +      })
    +      .catch(() => undefined);
    +  }, []);
     
    @@ -71,2 +95,4 @@
         .sort((left, right) => chainName(left.blockchain).localeCompare(chainName(right.blockchain)) || left.symbol.localeCompare(right.symbol)), [assets]);
    +  const sourceChains = useMemo(() => [...new Set(origins.map((asset) => asset.blockchain))], [origins]);
    +  const visibleOrigins = useMemo(() => origins.filter((asset) => !selectedChain || asset.blockchain === selectedChain), [origins, selectedChain]);
       const selectedAsset = origins.find((asset) => asset.assetId === selectedAssetId);
    @@ -85,2 +111,3 @@
           setQuote(result);
    +      setStep('review');
         } catch (caught) {
    @@ -112,2 +139,28 @@
     
    +  async function beginTracking() {
    +    if (!quote || !selectedAsset) return;
    +    const active: ActiveDeposit = { quote, sourceAsset: selectedAsset, amount, refundAddress };
    +    await AsyncStorage.setItem(ACTIVE_DEPOSIT_STORAGE_KEY, JSON.stringify(active));
    +    setResumedDeposit(active);
    +    setStep('tracking');
    +    void checkStatus();
    +  }
    +
    +  function resumeTracking() {
    +    if (!resumedDeposit) return;
    +    setQuote(resumedDeposit.quote);
    +    setSelectedAssetId(resumedDeposit.sourceAsset.assetId);
    +    setSelectedChain(resumedDeposit.sourceAsset.blockchain);
    +    setAmount(resumedDeposit.amount);
    +    setRefundAddress(resumedDeposit.refundAddress);
    +    setStep('tracking');
    +  }
    +
    +  useEffect(() => {
    +    if (step !== 'tracking' || !quote || !profile?.address || ['SUCCESS', 'REFUNDED', 'FAILED'].includes(status?.status ?? '')) return;
    +    void checkStatus();
    +    const timer = setInterval(() => { void checkStatus(); }, 12_000);
    +    return () => clearInterval(timer);
    +  }, [profile?.address, quote?.quote.depositAddress, status?.status, step]);
    +
       const statusDescription = status ? ({

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/aurora-deposit.tsx
    @@ -68,2 +68,3 @@
           setSelectedAssetId((previous) => previous || source?.assetId || '');
    +      setSelectedChain((previous) => previous || source?.blockchain || '');
         } catch (caught) {

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/aurora-deposit.tsx
    @@ -180,8 +180,7 @@
           <View style={styles.heading}>
    -        <Eyebrow>CROSS-CHAIN DEPOSIT</Eyebrow>
    -        <Title>Deposit with Aurora</Title>
    -        <Body>Bridge a supported EVM token into AUSD on Monad. Aurora creates a temporary deposit address for each quote.</Body>
    +        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>AURORA INTENTS</Text>
    +        <Text style={[styles.title, { color: colors.foreground }]}>{step === 'form' ? 'Deposit to AUSD' : step === 'review' ? 'Review your quote' : step === 'instructions' ? 'Send your deposit' : 'Track your deposit'}</Text>
           </View>
     
    -      {profile?.mode !== 'mera' ? <InlineNotice icon="info">A Mera passkey wallet is required as the Monad AUSD destination.</InlineNotice> : null}
    +      {profile?.mode !== 'mera' ? <InlineNotice icon="info">Set up a Mera wallet to receive AUSD on Monad.</InlineNotice> : null}
           {!getAuroraApiKeyConfigured() ? (
    @@ -190,76 +189,37 @@
     
    -      <View style={styles.section}>
    -        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Send from</Text>
    -        {assetLoading ? <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={[styles.help, { color: colors.mutedForeground }]}>Loading supported assets…</Text></View> : null}
    -        {assetError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{assetError}</Text> : null}
    -        {!assetLoading && origins.length ? (
    -          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tokenList}>
    -            {origins.map((asset) => {
    -              const active = asset.assetId === selectedAssetId;
    -              return <Pressable key={asset.assetId} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => { setSelectedAssetId(asset.assetId); setQuote(null); setStatus(null); }} style={[styles.tokenChoice, { backgroundColor: active ? colors.primary : colors.secondary }]}>
    -                <Text style={[styles.tokenSymbol, { color: active ? colors.primaryForeground : colors.foreground }]}>{asset.symbol}</Text>
    -                <Text style={[styles.tokenChain, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>{chainName(asset.blockchain)}</Text>
    -              </Pressable>;
    -            })}
    -          </ScrollView>
    -        ) : null}
    -        <Text style={[styles.help, { color: colors.mutedForeground }]}>Only supported EVM assets are listed so refunds can use your 0x wallet address.</Text>
    -      </View>
    -
    -      <Card style={styles.amountCard}>
    -        <Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT TO DEPOSIT{selectedAsset ? ` · ${selectedAsset.symbol}` : ''}</Text>
    -        <TextInput accessibilityLabel="Source token amount" value={amount} onChangeText={(value) => { setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); setQuote(null); setStatus(null); }} placeholder="0.00" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.foreground }]} />
    -      </Card>
    -
    -      <Card style={styles.destinationCard}>
    -        <View style={styles.destinationIcon}><Feather name="arrow-down" size={16} color={colors.primary} /></View>
    -        <View style={styles.destinationText}>
    -          <Text style={[styles.label, { color: colors.mutedForeground }]}>YOU RECEIVE</Text>
    -          <Text style={[styles.destinationName, { color: colors.foreground }]}>Agora AUSD · Monad</Text>
    -          <Text style={[styles.help, { color: colors.mutedForeground }]} numberOfLines={1}>{profile?.address ?? 'Wallet address unavailable'}</Text>
    +      {step === 'form' ? <>
    +        {resumedDeposit ? <Pressable onPress={resumeTracking} style={[styles.resumeCard, { backgroundColor: colors.secondary }]}><Feather name="clock" size={16} color={colors.primary} /><View style={{ flex: 1 }}><Text style={[styles.resumeTitle, { color: colors.foreground }]}>Resume active deposit</Text><Text style={[styles.help, { color: colors.mutedForeground }]}>{resumedDeposit.amount} {resumedDeposit.sourceAsset.symbol} from {chainName(resumedDeposit.sourceAsset.blockchain)}</Text></View><Feather name="arrow-right" size={16} color={colors.foreground} /></Pressable> : null}
    +        <View style={styles.section}>
    +          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>From</Text>
    +          {assetLoading ? <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={[styles.help, { color: colors.mutedForeground }]}>Loading supported assets…</Text></View> : null}
    +          {assetError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{assetError}</Text> : null}
    +          {!assetLoading && sourceChains.length ? <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tokenList}>{sourceChains.map((chain) => <Pressable key={chain} onPress={() => { setSelectedChain(chain); const first = origins.find((asset) => asset.blockchain === chain); setSelectedAssetId(first?.assetId ?? ''); setQuote(null); }} style={[styles.chainChoice, { backgroundColor: selectedChain === chain ? colors.primary : colors.secondary }]}><Text style={[styles.tokenText, { color: selectedChain === chain ? colors.primaryForeground : colors.foreground }]}>{chainName(chain)}</Text></Pressable>)}</ScrollView> : null}
    +          {!assetLoading && visibleOrigins.length ? <View style={styles.assetOptions}>{visibleOrigins.map((asset) => { const active = asset.assetId === selectedAssetId; return <Pressable key={asset.assetId} onPress={() => { setSelectedAssetId(asset.assetId); setQuote(null); }} style={[styles.assetChoice, { backgroundColor: active ? colors.primary : colors.secondary }]}><Text style={[styles.tokenText, { color: active ? colors.primaryForeground : colors.foreground }]}>{asset.symbol}</Text></Pressable>; })}</View> : null}
             </View>
    -      </Card>
    +        <Card style={styles.amountCard}><Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT{selectedAsset ? ` · ${selectedAsset.symbol}` : ''}</Text><TextInput accessibilityLabel="Source token amount" value={amount} onChangeText={(value) => { setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); setQuote(null); }} placeholder="0.00" placeholderTextColor={colors.mutedForeground} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.foreground }]} /></Card>
    +        <Card style={styles.destinationCard}><View style={styles.destinationIcon}><Feather name="arrow-down" size={16} color={colors.primary} /></View><View style={styles.destinationText}><Text style={[styles.label, { color: colors.mutedForeground }]}>TO</Text><Text style={[styles.destinationName, { color: colors.foreground }]}>Agora AUSD · Monad</Text><Text style={[styles.help, { color: colors.mutedForeground }]} numberOfLines={1}>{profile?.address ?? 'Wallet address unavailable'}</Text></View></Card>
    +        <PrimaryButton label="Review quote" icon="arrow-right" onPress={() => void createQuote()} loading={quoteLoading} disabled={quoteLoading || !getAuroraApiKeyConfigured() || !destination || !selectedAsset || !amountValid || profile?.mode !== 'mera'} />
    +        {quoteError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{quoteError}</Text> : null}
    +      </> : null}
     
    -      <View style={styles.refundBlock}>
    -        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Refund address on source network</Text>
    -        <TextInput accessibilityLabel="Aurora source network refund address" value={refundAddress} onChangeText={(value) => { setRefundAddress(value); setQuote(null); setStatus(null); }} placeholder="0x…" placeholderTextColor={colors.mutedForeground} autoCapitalize="none" autoCorrect={false} style={[styles.refundInput, { color: colors.foreground, backgroundColor: colors.secondary }]} />
    -        <Text style={[styles.help, { color: colors.mutedForeground }]}>Defaults to your Monad wallet address. Change it if you want refunds sent to another EVM address you control.</Text>
    -      </View>
    +      {step === 'review' && quote && selectedAsset ? <>
    +        <Card style={styles.quoteCard}><Text style={[styles.label, { color: colors.mutedForeground }]}>ESTIMATED RECEIVE</Text><Text style={[styles.quoteAmount, { color: colors.foreground }]}>{quote.quote.amountOutFormatted ?? '—'} AUSD</Text><View style={styles.summaryRow}><Text style={[styles.help, { color: colors.mutedForeground }]}>You send</Text><Text style={[styles.summaryValue, { color: colors.foreground }]}>{amount} {selectedAsset.symbol} · {chainName(selectedAsset.blockchain)}</Text></View><View style={styles.summaryRow}><Text style={[styles.help, { color: colors.mutedForeground }]}>Minimum receive</Text><Text style={[styles.summaryValue, { color: colors.foreground }]}>{formatUnits(quote.quote.minAmountOut, destination?.decimals ?? 6)} AUSD</Text></View>{quote.quote.timeEstimate ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Estimated processing time: {quote.quote.timeEstimate} seconds</Text> : null}</Card>
    +        <Pressable onPress={() => setShowRefundAddress((visible) => !visible)} style={[styles.refundToggle, { backgroundColor: colors.secondary }]}><View><Text style={[styles.summaryValue, { color: colors.foreground }]}>Refund address</Text><Text numberOfLines={1} style={[styles.help, { color: colors.mutedForeground }]}>{refundAddress}</Text></View><Feather name={showRefundAddress ? 'chevron-up' : 'chevron-down'} size={17} color={colors.foreground} /></Pressable>
    +        {showRefundAddress ? <TextInput accessibilityLabel="Aurora source network refund address" value={refundAddress} onChangeText={setRefundAddress} placeholder="0x…" placeholderTextColor={colors.mutedForeground} autoCapitalize="none" autoCorrect={false} style={[styles.refundInput, { color: colors.foreground, backgroundColor: colors.secondary }]} /> : null}
    +        <PrimaryButton label="Get deposit address" icon="arrow-right" onPress={() => setStep('instructions')} />
    +        <PrimaryButton label="Edit deposit" secondary onPress={() => setStep('form')} />
    +      </> : null}
     
    -      <PrimaryButton label={quoteLoading ? 'Getting quote…' : quote ? 'Refresh deposit quote' : 'Get deposit instructions'} icon="arrow-right" onPress={() => void createQuote()} loading={quoteLoading} disabled={quoteLoading || !getAuroraApiKeyConfigured() || !destination || !selectedAsset || !amountValid || profile?.mode !== 'mera'} />
    -      {quoteError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{quoteError}</Text> : null}
    +      {step === 'instructions' && quote && selectedAsset ? <>
    +        <Card style={styles.instructionsCard}><Text style={[styles.instructionTitle, { color: colors.foreground }]}>Send exactly {amount} {selectedAsset.symbol}</Text><Text style={[styles.help, { color: colors.mutedForeground }]}>Use {chainName(selectedAsset.blockchain)} and this temporary deposit address.</Text><View style={[styles.qrFrame, { backgroundColor: '#fff' }]}><QRCode value={quote.quote.depositAddress} size={180} color="#111111" backgroundColor="#ffffff" quietZone={10} ecl="M" /></View><Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositAddress}</Text><PrimaryButton label={copied ? 'Deposit address copied' : 'Copy deposit address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyDepositAddress()} secondary />{quote.quote.depositMemo ? <View style={[styles.memoBox, { backgroundColor: colors.secondary }]}><Text style={[styles.label, { color: colors.mutedForeground }]}>REQUIRED MEMO</Text><Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositMemo}</Text></View> : null}{quote.quote.timeWhenInactive ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Address expires {new Date(quote.quote.timeWhenInactive).toLocaleString()}.</Text> : null}</Card>
    +        <InlineNotice icon="alert-circle">Only send the quoted token on the quoted network. This address is temporary.</InlineNotice>
    +        <PrimaryButton label="I've sent it" icon="check" onPress={() => void beginTracking()} />
    +        <PrimaryButton label="Back to quote" secondary onPress={() => setStep('review')} />
    +      </> : null}
     
    -      {quote ? (
    -        <>
    -          <Card style={styles.quoteCard}>
    -            <View style={styles.quoteHeader}>
    -              <View style={{ flex: 1 }}>
    -                <Text style={[styles.quoteAmount, { color: colors.foreground }]}>{quote.quote.amountOutFormatted ?? '—'} AUSD</Text>
    -                <Text style={[styles.help, { color: colors.mutedForeground }]}>Estimated receive{quote.quote.amountOutUsd ? ` · $${quote.quote.amountOutUsd}` : ''}</Text>
    -                <Text style={[styles.help, { color: colors.mutedForeground }]}>Minimum after 1% slippage: {formatUnits(quote.quote.minAmountOut, destination?.decimals ?? 6)} AUSD</Text>
    -              </View>
    -              <View style={[styles.liveBadge, { backgroundColor: colors.secondary }]}><View style={[styles.liveDot, { backgroundColor: colors.primary }]} /><Text style={[styles.liveText, { color: colors.foreground }]}>QUOTED</Text></View>
    -            </View>
    -            <View style={[styles.qrFrame, { backgroundColor: '#fff' }]}><QRCode value={quote.quote.depositAddress} size={180} color="#111111" backgroundColor="#ffffff" quietZone={10} ecl="M" /></View>
    -            <Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>SEND {amount} {selectedAsset?.symbol} ON {selectedAsset ? chainName(selectedAsset.blockchain).toUpperCase() : ''} TO</Text>
    -            <Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositAddress}</Text>
    -            <PrimaryButton label={copied ? 'Deposit address copied' : 'Copy deposit address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyDepositAddress()} secondary />
    -            {quote.quote.depositMemo ? <View style={[styles.memoBox, { backgroundColor: colors.secondary }]}><Text style={[styles.addressLabel, { color: colors.mutedForeground }]}>REQUIRED MEMO</Text><Text selectable style={[styles.depositAddress, { color: colors.foreground }]}>{quote.quote.depositMemo}</Text></View> : null}
    -            {quote.quote.timeWhenInactive ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Deposit address expires {new Date(quote.quote.timeWhenInactive).toLocaleString()}.</Text> : null}
    -            {quote.quote.deadline ? <Text style={[styles.help, { color: colors.mutedForeground }]}>Route deadline {new Date(quote.quote.deadline).toLocaleString()}.</Text> : null}
    -          </Card>
    -          <InlineNotice icon="alert-circle">Send only {selectedAsset?.symbol} on {selectedAsset ? chainName(selectedAsset.blockchain) : ''} to this quote address. Sending another token or using another network can lose funds. Refunds, if needed, go to your wallet address on the source EVM chain.</InlineNotice>
    -          <PrimaryButton label={statusLoading ? 'Checking status…' : 'Check deposit status'} icon="refresh-cw" onPress={() => void checkStatus()} loading={statusLoading} />
    -          {statusError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{statusError}</Text> : null}
    -          {status ? <Card style={styles.statusCard}>
    -            <Text style={[styles.statusLabel, { color: colors.mutedForeground }]}>{status.status.replaceAll('_', ' ')}</Text>
    -            <Text style={[styles.statusDescription, { color: colors.foreground }]}>{statusDescription}</Text>
    -            {status.originChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Source transaction: {hash}</Text>)}
    -            {status.destinationChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Monad transaction: {hash}</Text>)}
    -            {status.refundReason ? <Text style={[styles.help, { color: colors.destructive }]}>Refund detail: {status.refundReason}</Text> : null}
    -          </Card> : null}
    -        </>
    -      ) : null}
    -
    -      <InlineNotice icon="shield">Each quote creates a one-time Aurora deposit address. Review the token, source network, amount, recipient, and expiry before sending from your external wallet.</InlineNotice>
    +      {step === 'tracking' && quote ? <>
    +        <Card style={styles.statusCard}><View style={styles.statusHeader}><View style={[styles.statusDot, { backgroundColor: status?.status === 'SUCCESS' ? colors.primary : colors.mutedForeground }]} /><Text style={[styles.statusLabel, { color: colors.foreground }]}>{status ? status.status.replaceAll('_', ' ') : 'WAITING FOR DEPOSIT'}</Text></View><Text style={[styles.statusDescription, { color: colors.foreground }]}>{status ? statusDescription : 'Send the quoted funds from your external wallet. We’ll check Aurora automatically.'}</Text><Text style={[styles.help, { color: colors.mutedForeground }]}>{amount} {selectedAsset?.symbol ?? resumedDeposit?.sourceAsset.symbol} → AUSD on Monad</Text>{status?.originChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Source transaction: {hash}</Text>)}{status?.destinationChainTxHashes.map((hash) => <Text key={hash} selectable style={[styles.help, { color: colors.mutedForeground }]}>Monad transaction: {hash}</Text>)}{status?.refundReason ? <Text style={[styles.help, { color: colors.destructive }]}>Refund detail: {status.refundReason}</Text> : null}</Card>
    +        <PrimaryButton label={statusLoading ? 'Checking status…' : 'Refresh status'} icon="refresh-cw" onPress={() => void checkStatus()} loading={statusLoading} />
    +        {statusError ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{statusError}</Text> : null}
    +      </> : null}
         </Page>

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/aurora-deposit.tsx
    @@ -229,4 +229,6 @@
     const styles = StyleSheet.create({
    -  page: { gap: 15, paddingTop: 8, paddingBottom: 28 },
    -  heading: { gap: 7, marginBottom: 2 },
    +  page: { gap: 14, paddingTop: 8, paddingBottom: 28 },
    +  heading: { gap: 3, marginBottom: 2 },
    +  eyebrow: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
    +  title: { fontSize: 23, lineHeight: 29, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
       section: { gap: 10 },
    @@ -234,5 +236,6 @@
       tokenList: { gap: 8, paddingRight: 4 },
    -  tokenChoice: { minWidth: 84, borderRadius: 15, paddingHorizontal: 12, paddingVertical: 10, gap: 4 },
    -  tokenSymbol: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
    -  tokenChain: { fontSize: 10, fontFamily: 'Inter_400Regular' },
    +  chainChoice: { minHeight: 38, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
    +  assetOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    +  assetChoice: { minHeight: 38, minWidth: 70, borderRadius: 12, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
    +  tokenText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
       help: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
    @@ -247,17 +250,20 @@
       destinationName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
    -  refundBlock: { gap: 8 },
       refundInput: { minHeight: 48, borderRadius: 14, paddingHorizontal: 13, fontSize: 12, fontFamily: 'Inter_500Medium' },
    -  quoteCard: { alignItems: 'center', gap: 12, padding: 16 },
    -  quoteHeader: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
    +  quoteCard: { gap: 12, padding: 16 },
       quoteAmount: { fontSize: 23, fontFamily: 'Inter_600SemiBold' },
    -  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 14, paddingHorizontal: 9, paddingVertical: 6 },
    -  liveDot: { width: 6, height: 6, borderRadius: 3 },
    -  liveText: { fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_700Bold' },
    +  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
    +  summaryValue: { fontSize: 12, fontFamily: 'Inter_600SemiBold', flexShrink: 1, textAlign: 'right' },
    +  refundToggle: { minHeight: 58, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
    +  instructionsCard: { alignItems: 'center', gap: 12, padding: 16 },
    +  instructionTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
       qrFrame: { padding: 10, borderRadius: 12 },
    -  addressLabel: { alignSelf: 'stretch', fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_600SemiBold' },
    -  depositAddress: { alignSelf: 'stretch', fontSize: 11, lineHeight: 17, fontFamily: 'Inter_500Medium' },
    +  depositAddress: { alignSelf: 'stretch', fontSize: 10, lineHeight: 16, fontFamily: 'Inter_500Medium', textAlign: 'center' },
       memoBox: { alignSelf: 'stretch', gap: 6, borderRadius: 12, padding: 12 },
    -  statusCard: { gap: 7, padding: 15 },
    +  statusCard: { gap: 10, padding: 16 },
    +  statusHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    +  statusDot: { width: 8, height: 8, borderRadius: 4 },
       statusLabel: { fontSize: 10, letterSpacing: 0.7, fontFamily: 'Inter_700Bold' },
       statusDescription: { fontSize: 13, lineHeight: 18, fontFamily: 'Inter_500Medium' },
    +  resumeCard: { minHeight: 64, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
    +  resumeTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
     });

## Assistant

The staged flow is implemented. I’m checking types now, particularly the persisted active-deposit state and the automatic monitor loop.

## Activity

    $ pnpm --filter @workspace/ausd-wallet run typecheck
    
    > @workspace/ausd-wallet@0.0.0 typecheck /home/runner/workspace/artifacts/ausd-wallet
    > tsc -p tsconfig.json --noEmit
    
    ✓ • 17.66s

## Activity

    $ git diff --check && git diff --stat && git status --short
     artifacts/ausd-wallet/app/(tabs)/index.tsx   |  10 +-
     artifacts/ausd-wallet/app/aurora-deposit.tsx | 198 +++++++++++++++------------
     artifacts/ausd-wallet/app/receive.tsx        |  84 +++++-------
     3 files changed, 150 insertions(+), 142 deletions(-)
     M artifacts/ausd-wallet/app/(tabs)/index.tsx
     M artifacts/ausd-wallet/app/aurora-deposit.tsx
     M artifacts/ausd-wallet/app/receive.tsx
    ✓ • 0ms

## Assistant

Implemented the Aurora Intents deposit flow in [aurora-deposit.tsx](/home/runner/workspace/artifacts/ausd-wallet/app/aurora-deposit.tsx:1).

It now has four stages:

1. Select EVM source chain, token, and amount.
2. Review the quote, expected AUSD, minimum received, and optional refund address.
3. Get the temporary deposit address with QR, copy action, memo, and expiry.
4. Confirm “I’ve sent it” to start automatic status checks, with manual refresh available.

Active deposits are saved locally so users can reopen the app and resume monitoring. The flow remains aligned with Aurora’s quote → external transfer → transaction monitoring model. [Aurora API guide](https://docs.intents.aurora.dev/intents-deposits/quickstart/api-integration)

Validation passed:

`pnpm --filter @workspace/ausd-wallet run typecheck`

## User

next is to align ourselves with the track  validates EVM refund addA team must build a mobile application that lets a user send AUSD to another person or across borders, using Mera passkey authentication for onboarding and instant settlement for the transfer itself. Teams should build against Agora's public API documentation and mock any actual movements of funds using the Instant Settlement contract on Monad testnet.,check how transfer works and improve the ui, i think transfer might need only ui work, sent transfer should show a goo ui cobfirmation screen

## Assistant

I’ll audit the current send, review, and success flow against the stated track requirements, then refine the confirmation screen without changing the transfer mechanics unless the audit shows a mismatch.

## Activity

    $ sed -n '1,360p' artifacts/ausd-wallet/app/send.tsx && sed -n '1,360p' artifacts/ausd-wallet/app/review.tsx && sed -n '1,260p' artifacts/ausd-wallet/app/success.tsx
    import React, { useEffect, useState } from 'react';
    import {
      KeyboardAvoidingView,
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
    import { isAddress } from 'viem';
    import { Feather } from '@expo/vector-icons';
    import { useSafeAreaInsets } from 'react-native-safe-area-context';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { getTokenBalance } from '@/services/passkey';
    import { simulateSettlementSwap, type SettlementQuote } from '@/services/settlement';
    import { TRANSFER_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    import { PrimaryButton } from '@/components/Primitives';
    
    const money = (amount: number) =>
      amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
    
    export default function SendDrawer() {
      const params = useLocalSearchParams<{ recipient?: string; recipientName?: string; token?: string }>();
      const colors = useColors();
      const insets = useSafeAreaInsets();
      const { height: windowHeight } = useWindowDimensions();
      const { profile, balance: demoBalance } = useWallet();
      const [recipient, setRecipient] = useState('');
      const [recipientName, setRecipientName] = useState('');
      const [amount, setAmount] = useState('');
      const [availableBalance, setAvailableBalance] = useState<number | null>(null);
      const [balanceError, setBalanceError] = useState('');
      const [error, setError] = useState('');
      const [sendMode, setSendMode] = useState<'direct' | 'settlement'>('direct');
      const [token, setToken] = useState<WalletToken>('AUSD');
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
    
      useEffect(() => {
        if (params.recipient) {
          setRecipient(params.recipient);
          setRecipientName(params.recipientName ?? '');
        }
      }, [params.recipient, params.recipientName]);
    
      useEffect(() => {
        if (params.token === 'AUSD' || params.token === 'USDC') setToken(params.token);
      }, [params.token]);
    
      useEffect(() => {
        if (profile?.mode !== 'mera' || !profile.address) return;
        let active = true;
        getTokenBalance(profile.address, sendMode === 'settlement' ? 'AUSD' : token)
          .then((value) => { if (active) setAvailableBalance(Number(value)); })
          .catch((caught: unknown) => {
            if (active) setBalanceError(caught instanceof Error ? caught.message : 'Balance unavailable');
          });
        return () => { active = false; };
      }, [sendMode, token, profile?.address, profile?.mode]);
    
      const balance = profile?.mode === 'mera' ? availableBalance : demoBalance;
    
      useEffect(() => {
        setQuote(null);
        setQuoteError('');
        if (sendMode !== 'settlement' || profile?.mode !== 'mera' || !profile.address || !/^\d+(\.\d{1,6})?$/.test(amount) || Number(amount) <= 0) {
          setQuoteLoading(false);
          return;
        }
        let active = true;
        const timer = setTimeout(() => {
          setQuoteLoading(true);
          simulateSettlementSwap(amount, profile.address!)
            .then((result) => { if (active) setQuote(result); })
            .catch((caught: unknown) => {
              if (active) setQuoteError(caught instanceof Error ? caught.message : 'Agora quote unavailable.');
            })
            .finally(() => { if (active) setQuoteLoading(false); });
        }, 350);
        return () => { active = false; clearTimeout(timer); };
      }, [amount, sendMode, profile?.address, profile?.mode]);
    
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
        if (!/^\d+(\.\d{1,6})?$/.test(amount) || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
          setError(`Enter an amount with up to ${WALLET_TOKENS[sendMode === 'settlement' ? 'AUSD' : token].decimals} decimal places.`);
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
            const freshQuote = await simulateSettlementSwap(amount, profile.address);
            router.push({
              pathname: '/review',
              params: {
                mode: 'settlement', recipient: recipient.trim(), recipientName, amount, token: 'AUSD',
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
                  height: windowHeight * 0.75,
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
    
                {sendMode === 'direct' ? (
                  <View style={styles.tokenRow}>
                    {TRANSFER_TOKENS.map((option) => (
                      <Pressable key={option} onPress={() => { setToken(option); setAmount(''); setError(''); }} style={[styles.tokenOption, { backgroundColor: token === option ? colors.primary : colors.secondary }]}>
                        <Text style={[styles.modeText, { color: token === option ? colors.primaryForeground : colors.foreground }]}>{option}</Text>
                      </Pressable>
                    ))}
                  </View>
                ) : null}
    
                <View style={[styles.modeSwitch, { backgroundColor: colors.secondary }]}>
                  <Pressable onPress={() => { setSendMode('direct'); setError(''); }} style={[styles.modeOption, sendMode === 'direct' && { backgroundColor: colors.background }]}>
                    <Text style={[styles.modeText, { color: sendMode === 'direct' ? colors.foreground : colors.mutedForeground }]}>AUSD transfer</Text>
                  </Pressable>
                  <Pressable onPress={() => { setSendMode('settlement'); setError(''); }} style={[styles.modeOption, sendMode === 'settlement' && { backgroundColor: colors.background }]}>
                    <Text style={[styles.modeText, { color: sendMode === 'settlement' ? colors.foreground : colors.mutedForeground }]}>Cross-border</Text>
                  </Pressable>
                </View>
    
                <View style={[styles.amountPanel, { backgroundColor: colors.secondary }]}>
                  <Text style={[styles.label, { color: colors.mutedForeground }]}>AMOUNT</Text>
                  <View style={styles.amountRow}>
                    <Text style={[styles.dollar, { color: colors.foreground }]}>$</Text>
                    <TextInput
                      accessibilityLabel={`${sendMode === 'settlement' ? 'AUSD' : token} amount`}
                      value={amount}
                      onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
                      placeholder="0"
                      placeholderTextColor={colors.mutedForeground}
                      keyboardType="decimal-pad"
                      selectionColor={colors.primary}
                      style={[styles.amountInput, { color: colors.foreground }]}
                      autoFocus
                    />
                    <Text style={[styles.currency, { color: colors.mutedForeground }]}>{sendMode === 'settlement' ? 'AUSD' : token}</Text>
                  </View>
                  <View style={styles.balanceRow}>
                    <Text style={[styles.balanceText, { color: colors.mutedForeground }]}>
                      {profile?.mode === 'mera'
                        ? availableBalance === null ? balanceError || 'Loading balance…' : `Available ${money(availableBalance)} ${sendMode === 'settlement' ? 'AUSD' : token}`
                        : `Demo balance ${money(demoBalance)} ${sendMode === 'settlement' ? 'AUSD' : token}`}
                    </Text>
                    {profile?.mode === 'mera' && availableBalance !== null ? (
                      <Pressable onPress={() => setAmount(String(availableBalance))}>
                        <Text style={[styles.maxText, { color: colors.primary }]}>MAX</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
    
                {sendMode === 'settlement' ? (
                  <View style={[styles.quotePanel, { backgroundColor: colors.secondary }]}>
                    <View style={styles.quoteLine}>
                      <Text style={[styles.quoteLabel, { color: colors.mutedForeground }]}>Recipient receives</Text>
                      <Text style={[styles.quoteValue, { color: colors.foreground }]}>
                        {quoteLoading ? 'Updating…' : quote ? `${Number(quote.amountOut).toLocaleString('en-US', { maximumFractionDigits: quote.outputDecimals })} CTK` : '— CTK'}
                      </Text>
                    </View>
                    <Text style={[styles.quoteCaption, { color: colors.mutedForeground }]}>
                      {quoteError || (quote ? 'Agora fixed-price pair · CTK is a testnet mock payout token' : 'Enter an amount to get an Agora testnet quote.')}
                    </Text>
                  </View>
                ) : null}
    
                <View style={styles.recipientBlock}>
                  <Text style={[styles.label, { color: colors.mutedForeground }]}>{recipientName ? `TO · ${recipientName}` : 'TO'}</Text>
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
                    style={[styles.recipientInput, { color: colors.foreground, backgroundColor: colors.secondary }]}
                  />
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
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      overlay: { flex: 1, justifyContent: 'flex-end' },
      backdrop: { backgroundColor: 'rgba(16, 18, 24, 0.48)' },
      keyboardLayer: { flex: 1, justifyContent: 'flex-end' },
      sheet: { maxHeight: '75%', borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden' },
      content: { paddingHorizontal: 22, paddingTop: 9, gap: 20 },
      modeSwitch: { borderRadius: 14, padding: 4, flexDirection: 'row', gap: 4 },
      tokenRow: { flexDirection: 'row', gap: 8 },
      tokenOption: { minHeight: 36, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
      modeOption: { flex: 1, minHeight: 39, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
      modeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
      handleRow: { alignItems: 'center', height: 12 },
      handle: { width: 38, height: 4, borderRadius: 3 },
      heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      title: { fontSize: 25, letterSpacing: -0.6, fontFamily: 'Inter_600SemiBold' },
      subtitle: { marginTop: 4, fontSize: 12, fontFamily: 'Inter_400Regular' },
      close: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
      amountPanel: { borderRadius: 20, paddingHorizontal: 17, paddingTop: 16, paddingBottom: 13, gap: 8 },
      label: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_600SemiBold' },
      amountRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
      dollar: { fontSize: 25, fontFamily: 'Inter_500Medium' },
      amountInput: { minWidth: 50, flex: 1, padding: 0, fontSize: 42, lineHeight: 50, letterSpacing: -1.4, fontFamily: 'Inter_600SemiBold' },
      currency: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
      balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      balanceText: { fontSize: 11, fontFamily: 'Inter_400Regular' },
      maxText: { fontSize: 10, letterSpacing: 0.6, fontFamily: 'Inter_700Bold' },
      recipientBlock: { gap: 8 },
      quotePanel: { borderRadius: 16, padding: 14, gap: 6 },
      quoteLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
      quoteLabel: { fontSize: 11, fontFamily: 'Inter_500Medium' },
      quoteValue: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
      quoteCaption: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
      recipientInput: { height: 52, borderRadius: 14, paddingHorizontal: 15, fontSize: 13, fontFamily: 'Inter_500Medium' },
      sponsorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: -7 },
      sponsorText: { fontSize: 11, fontFamily: 'Inter_400Regular' },
      firstTimeNote: { marginTop: -15, fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
      error: { fontSize: 12, lineHeight: 17, fontFamily: 'Inter_500Medium' },
    });
    import React, { useState } from 'react';
    import { router, useLocalSearchParams } from 'expo-router';
    import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { isAddress } from 'viem';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import {
      sendSponsoredTokenTransfer,
      sendSponsoredInstantSettlementSwap,
      type SponsoredSettlementResult,
    } from '@/services/passkey';
    import {
      calculateAutoSaveBreakdown,
      payWithAutoSaveSponsored,
    } from '@/services/savings-pockets';
    import { MONAD_TESTNET } from '@/services/settlement';
    import { getWalletToken, WALLET_TOKENS } from '@/services/tokens';
    import {
      BackButton,
      Card,
      Eyebrow,
      Page,
      PrimaryButton,
      Title,
    } from '@/components/Primitives';
    
    export default function ReviewScreen() {
      const colors = useColors();
      const params = useLocalSearchParams<{
        mode?: string; recipient?: string; recipientName?: string; amount?: string; quoteOutput?: string;
        swapAmount?: string; quoteMode?: string; quoteInputRaw?: string; inputToken?: string; outputToken?: string; token?: string;
        quoteOutputRaw?: string; quoteCheckedAt?: string; pairAddress?: string; purchaseFeeRate?: string;
        pocketId?: string; goalName?: string; autoSaveBps?: string;
      }>();
      const { profile, addTransfer } = useWallet();
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
      const amount = Number(params.amount ?? 0);
      const recipient = typeof params.recipient === 'string' ? params.recipient.trim() : '';
      const recipientName = typeof params.recipientName === 'string' ? params.recipientName.trim() : '';
      const tokenSwap = params.mode === 'token-swap';
      const settlement = params.mode === 'settlement' || params.mode === 'agora-swap' || tokenSwap;
      const swapOnly = params.mode === 'agora-swap' || tokenSwap;
      const inputToken = getWalletToken(params.inputToken, 'AUSD');
      const outputToken = getWalletToken(params.outputToken, tokenSwap ? 'USDC' : 'CTK');
      const autoSave = params.mode === 'autosave';
      const sendToken = autoSave ? 'AUSD' : settlement ? inputToken : getWalletToken(params.token, 'AUSD');
      const pocketId = typeof params.pocketId === 'string' ? params.pocketId : '';
      const goalName = typeof params.goalName === 'string' ? params.goalName : '';
      const autoSaveBps = typeof params.autoSaveBps === 'string' ? Number(params.autoSaveBps) : 0;
      let autoSaveBreakdown: ReturnType<typeof calculateAutoSaveBreakdown> | null = null;
      if (autoSave && Number.isFinite(amount) && amount > 0) {
        try {
          autoSaveBreakdown = calculateAutoSaveBreakdown(String(params.amount), autoSaveBps);
        } catch {
          autoSaveBreakdown = null;
        }
      }
      const quoteOutput = typeof params.quoteOutput === 'string' ? params.quoteOutput : '';
      const purchaseFeeRate = typeof params.purchaseFeeRate === 'string' ? Number(params.purchaseFeeRate) : 0;
      const quoteCheckedAt = typeof params.quoteCheckedAt === 'string' ? params.quoteCheckedAt : '';
      const quoteTime = quoteCheckedAt && Number.isFinite(Date.parse(quoteCheckedAt))
        ? new Date(quoteCheckedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        : '';
    
      async function confirmTransfer() {
        if (!profile) {
          setError('Your wallet session has ended. Return to setup and try again.');
          return;
        }
        if (profile.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
          setError('A Mera passkey wallet is required to send AUSD. Demo wallets cannot submit transactions.');
          return;
        }
        if (!isAddress(recipient, { strict: false })) {
          setError('Enter a valid Monad-compatible wallet address for the recipient.');
          return;
        }
        if (!Number.isFinite(amount) || amount <= 0) {
          setError('Enter a valid amount before reviewing the transfer.');
          return;
        }
        setError('');
        setBusy(true);
        try {
          const account = {
            address: profile.address,
            signerAddress: profile.signerAddress,
            credential: profile.passkey.credential,
            rpId: profile.passkey.rpId,
          };
          if (autoSave && (!pocketId || !goalName || !autoSaveBreakdown)) {
            throw new Error('The reviewed savings pocket details are missing or invalid. Return to the send form and review again.');
          }
          const result = autoSave
            ? await payWithAutoSaveSponsored(account, recipient, pocketId, autoSaveBps, String(params.amount))
            : settlement
              ? await sendSponsoredInstantSettlementSwap(account, recipient, swapOnly ? String(params.swapAmount ?? params.amount) : String(params.amount), {
                pairAddress: typeof params.pairAddress === 'string' ? params.pairAddress : '',
                amountInRaw: typeof params.quoteInputRaw === 'string' ? params.quoteInputRaw : undefined,
                amountOutRaw: typeof params.quoteOutputRaw === 'string' ? params.quoteOutputRaw : '',
                checkedAt: typeof params.quoteCheckedAt === 'string' ? params.quoteCheckedAt : '',
                quoteMode: params.quoteMode === 'exact-output' ? 'exact-output' : 'exact-input',
              }, swapOnly, inputToken, outputToken)
              : await sendSponsoredTokenTransfer(account, recipient, String(params.amount), getWalletToken(params.token, 'AUSD'));
          const settlementResult = settlement ? result as SponsoredSettlementResult : null;
          const autoSaveResult = autoSave ? result as Awaited<ReturnType<typeof payWithAutoSaveSponsored>> : null;
          const sentAmount = autoSaveResult
            ? Number(autoSaveResult.totalDebit)
            : settlementResult ? Number(settlementResult.amountIn) : amount;
          const receivedAmount = settlementResult ? Number(settlementResult.amountOut) : amount;
          const sentCurrency = autoSaveResult ? 'AUSD' : settlementResult?.inputSymbol ?? getWalletToken(params.token, 'AUSD');
          const receivedCurrency = settlementResult?.outputSymbol ?? sentCurrency;
          const transfer = {
            id: result.transactionHash,
            recipient,
            amount: sentAmount,
            currency: sentCurrency,
            receivedAmount,
            receivedCurrency,
            settlementKind: settlement
              ? 'agora-instant-settlement' as const
              : autoSaveResult ? 'savings-auto-save' as const : 'direct' as const,
            ...(autoSaveResult ? {
              savedAmount: Number(autoSaveResult.savedAmount),
              totalDebited: Number(autoSaveResult.totalDebit),
              paymentAmount: Number(autoSaveResult.paymentAmount),
              savingsPocketId: pocketId,
              savingsGoalName: goalName,
            } : {}),
            createdAt: new Date().toISOString(),
            mode: profile.mode,
            transactionHash: result.transactionHash,
            sponsored: true,
            ...(settlementResult ? { pairAddress: settlementResult.pairAddress, quoteOutput: settlementResult.amountOut, quoteSymbol: settlementResult.outputSymbol } : {}),
          };
          let historyWarning = '';
          try {
            await addTransfer(transfer);
          } catch {
            // The chain receipt is already confirmed. Never present this as a
            // failed payment or encourage a retry that could send funds twice.
            historyWarning = 'The transaction is confirmed, but Activity could not save its local receipt. Keep the transaction hash below and do not resubmit.';
          }
          router.replace({
            pathname: '/success',
            params: {
              recipient: transfer.recipient,
              amount: autoSaveResult?.paymentAmount ?? String(sentAmount),
              currency: sentCurrency,
              receiveAmount: String(receivedAmount),
              receiveCurrency: receivedCurrency,
              settlement: settlement ? 'agora' : 'direct',
              autoSave: autoSaveResult ? 'true' : 'false',
              goalName,
              paymentAmount: autoSaveResult?.paymentAmount ?? '',
              autoSavedAmount: autoSaveResult?.savedAmount ?? '',
              totalDebit: autoSaveResult?.totalDebit ?? '',
              historyWarning,
              id: transfer.id,
              transactionHash: result.transactionHash,
              accountAddress: result.accountAddress,
              blockNumber: result.blockNumber.toString(),
            },
          });
        } catch (caught) {
          setError(
            caught instanceof Error
              ? caught.message
              : 'The sponsored transfer failed. No receipt was recorded.',
          );
        } finally {
          setBusy(false);
        }
      }
    
      return (
        <Page contentStyle={styles.page}>
          <BackButton onPress={() => router.back()} />
          <View style={styles.heading}>
            <Eyebrow>{autoSave ? 'PAYMENT + AUTO-SAVE' : settlement ? 'AGORA INSTANT SETTLEMENT' : 'FINAL CHECK'}</Eyebrow>
            <Title>{autoSave ? 'Review payment + savings' : swapOnly ? 'Review swap' : settlement ? 'Review payout' : 'Review send'}</Title>
          </View>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryLine}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{autoSave ? 'RECIPIENT PAYMENT' : 'YOU SEND'}</Text>
              <Text style={[styles.amountValue, { color: colors.foreground }]}>
                {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} <Text style={[styles.amountUnit, { color: colors.mutedForeground }]}>{sendToken}</Text>
              </Text>
            </View>
            {autoSave && autoSaveBreakdown ? (
              <>
                <View style={[styles.rule, { backgroundColor: colors.border }]} />
                <View style={styles.summaryLine}>
                  <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>AUTO-SAVE · {autoSaveBps / 100}% TO {goalName.toUpperCase()}</Text>
                  <Text style={[styles.outputValue, { color: colors.foreground }]}>
                    +{Number(autoSaveBreakdown.savedAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                  </Text>
                </View>
                <View style={[styles.rule, { backgroundColor: colors.border }]} />
                <View style={styles.summaryLine}>
                  <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>TOTAL WALLET DEBIT</Text>
                  <Text style={[styles.outputValue, { color: colors.foreground }]}>
                    {Number(autoSaveBreakdown.totalDebit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                  </Text>
                </View>
              </>
            ) : null}
            <View style={[styles.rule, { backgroundColor: colors.border }]} />
            <View style={styles.summaryLine}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{settlement ? 'AGORA QUOTED OUTPUT' : 'RECIPIENT RECEIVES'}</Text>
              <Text style={[styles.outputValue, { color: colors.foreground }]}>
                {settlement
                  ? quoteOutput ? `${Number(quoteOutput).toLocaleString('en-US', { maximumFractionDigits: WALLET_TOKENS[outputToken].decimals })} ${outputToken}` : 'Quote unavailable'
                  : `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} ${sendToken}`}
              </Text>
            </View>
            {settlement ? (
              <Text style={[styles.quoteNote, { color: colors.mutedForeground }]}>
                {quoteTime ? `Quote from ${quoteTime} · ` : ''}{purchaseFeeRate > 0 ? `Pair fee ${(purchaseFeeRate * 100).toLocaleString('en-US', { maximumFractionDigits: 4 })}% is included. ` : 'The quoted output is protected by the reviewed minimum. '}{tokenSwap ? `${inputToken} to ${outputToken}` : 'CTK is the testnet settlement token.'}
              </Text>
            ) : null}
          </Card>
          <Card style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{swapOnly ? 'OUTPUT WALLET' : 'TO'}</Text>
               <Text selectable style={[styles.recipient, { color: colors.foreground }]}>{recipientName ? `${recipientName} · ${recipient}` : recipient}</Text>
            </View>
            <View style={[styles.rule, { backgroundColor: colors.border }]} />
            <View style={styles.detailRow}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>NETWORK</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>{MONAD_TESTNET.name}</Text>
            </View>
            <View style={[styles.rule, { backgroundColor: colors.border }]} />
            <View style={styles.detailRow}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>NETWORK FEE</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>Sponsorship requested · no MON if approved</Text>
            </View>
          </Card>
          {settlement ? <Text style={[styles.firstTimeNote, { color: colors.mutedForeground }]}>First use may enable this testnet wallet and approve the pair. One passkey approval covers the sponsored batch.</Text> : null}
          {busy ? (
            <View accessibilityLiveRegion="polite" style={[styles.progressPanel, { backgroundColor: colors.secondary }]}>
              <ActivityIndicator color={colors.primary} />
              <View style={styles.progressCopy}>
                <Text style={[styles.progressTitle, { color: colors.foreground }]}>Waiting for confirmation</Text>
                <Text style={[styles.networkCaption, { color: colors.mutedForeground }]}>Approve with your passkey, then we’ll wait for Monad testnet to confirm.</Text>
              </View>
            </View>
          ) : null}
          {error ? (
            <View accessibilityRole="alert" style={[styles.errorPanel, { backgroundColor: colors.secondary }]}>
              <Feather name="alert-circle" size={17} color={colors.destructive} />
              <View style={styles.progressCopy}>
                <Text style={[styles.progressTitle, { color: colors.destructive }]}>{autoSave ? 'Payment not confirmed' : swapOnly ? 'Swap not confirmed' : 'Transfer not confirmed'}</Text>
                <Text style={[styles.error, { color: colors.mutedForeground }]}>{error}</Text>
                <Text style={[styles.errorHint, { color: colors.mutedForeground }]}>If you approved a transaction, check Activity or MonadVision before trying again.</Text>
              </View>
            </View>
          ) : null}
          <PrimaryButton
            label={busy ? 'Confirming on Monad…' : autoSave ? 'Approve payment + save' : swapOnly ? 'Approve & swap' : settlement ? 'Approve & settle' : 'Approve & send'}
            icon="arrow-right"
            onPress={confirmTransfer}
            loading={busy}
            testID="confirm-transfer"
          />
          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>Passkey approval required · Monad testnet only</Text>
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { gap: 16, paddingTop: 8 },
      heading: { gap: 6, marginTop: 5 },
      summaryCard: { gap: 12, padding: 16 },
      summaryLine: { gap: 7 },
      rule: { height: StyleSheet.hairlineWidth },
      amountValue: { fontSize: 27, letterSpacing: -0.7, fontFamily: 'Inter_600SemiBold' },
      amountUnit: { fontSize: 17, fontFamily: 'Inter_500Medium' },
      outputValue: { fontSize: 20, fontFamily: 'Inter_600SemiBold' },
      quoteNote: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
      detailsCard: { gap: 11, padding: 15 },
      detailRow: { gap: 6 },
      metaLabel: { fontSize: 10, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
      recipient: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_500Medium' },
      detailValue: { fontSize: 12, fontFamily: 'Inter_500Medium' },
      networkCaption: { marginTop: 3, fontSize: 10, fontFamily: 'Inter_400Regular' },
      progressPanel: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, padding: 14 },
      progressCopy: { flex: 1, gap: 4 },
      progressTitle: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
      errorPanel: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderRadius: 14, padding: 14 },
      error: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
      errorHint: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
      disclaimer: { textAlign: 'center', fontSize: 10, fontFamily: 'Inter_400Regular' },
      firstTimeNote: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
    });
    import React from 'react';
    import { router, useLocalSearchParams } from 'expo-router';
    import { Linking, Pressable } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { StyleSheet, Text, View } from 'react-native';
    import { useColors } from '@/hooks/useColors';
    import {
      Card,
      Eyebrow,
      InlineNotice,
      Page,
      PrimaryButton,
      Title,
    } from '@/components/Primitives';
    
    export default function SimulationSuccessScreen() {
      const colors = useColors();
      const params = useLocalSearchParams<{
        recipient?: string;
        amount?: string;
        currency?: string;
        receiveAmount?: string;
        id?: string;
        transactionHash?: string;
        accountAddress?: string;
        blockNumber?: string;
        receiveCurrency?: string;
        settlement?: string;
        autoSave?: string;
        goalName?: string;
        paymentAmount?: string;
        autoSavedAmount?: string;
        totalDebit?: string;
        historyWarning?: string;
      }>();
      const amount = Number(params.amount ?? 0);
      const receiveAmount = Number(params.receiveAmount ?? amount);
      const receiveCurrency = typeof params.receiveCurrency === 'string' ? params.receiveCurrency : 'AUSD';
      const settledThroughAgora = params.settlement === 'agora';
      const autoSaveConfirmed = params.autoSave === 'true';
      const transactionHash = params.transactionHash;
      const explorerUrl = transactionHash
        ? `https://testnet.monadvision.com/tx/${transactionHash}`
        : '';
    
      return (
        <Page contentStyle={styles.page}>
          <View style={[styles.successIcon, { backgroundColor: colors.primary }]}>
            <Feather name="check" size={27} color={colors.primaryForeground} />
          </View>
          <View style={[styles.confirmedBadge, { backgroundColor: colors.secondary }]}>
            <View style={[styles.confirmedDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.confirmedText, { color: colors.foreground }]}>CONFIRMED ON MONAD TESTNET</Text>
          </View>
          <Title>{autoSaveConfirmed ? 'Payment + savings confirmed' : settledThroughAgora ? 'Settlement confirmed' : 'Transfer confirmed'}</Title>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {autoSaveConfirmed
              ? 'The recipient payment and savings allocation were included in one confirmed Monad testnet transaction.'
              : settledThroughAgora
              ? 'The Agora AUSD-to-CTK swap was included in a confirmed sponsored transaction.'
              : 'Your AUSD transfer was included in a confirmed sponsored transaction.'}
          </Text>
    
          <Card style={styles.receipt}>
            <Text style={[styles.amount, { color: colors.foreground }]}>
              {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
            </Text>
            <View style={[styles.receivePanel, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.receivesLabel, { color: colors.mutedForeground }]}>{settledThroughAgora ? 'TESTNET OUTPUT · AGORA QUOTE' : 'RECIPIENT RECEIVES'}</Text>
              <Text style={[styles.receivesValue, { color: colors.foreground }]}>
                {receiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {receiveCurrency}
              </Text>
            </View>
            {autoSaveConfirmed ? (
              <View style={[styles.receivePanel, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.receivesLabel, { color: colors.mutedForeground }]}>
                  AUTO-SAVED TO {params.goalName ?? 'SAVINGS POCKET'}
                </Text>
                <Text style={[styles.receivesValue, { color: colors.foreground }]}>
                  {Number(params.autoSavedAmount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                </Text>
                <Text style={[styles.reference, { color: colors.mutedForeground }]}>
                  Total wallet debit: {Number(params.totalDebit ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                </Text>
              </View>
            ) : null}
            <View style={[styles.receiptDivider, { backgroundColor: colors.border }]} />
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>RECIPIENT</Text>
            <Text selectable style={[styles.to, { color: colors.foreground }]}>{params.recipient ?? 'Recipient unavailable'}</Text>
            {params.accountAddress ? <Text selectable style={[styles.reference, { color: colors.mutedForeground }]}>From smart account · {params.accountAddress}</Text> : null}
            {params.blockNumber ? <Text style={[styles.reference, { color: colors.mutedForeground }]}>Block {params.blockNumber} · Gas sponsored by Pimlico</Text> : null}
            {transactionHash ? (
              <View style={styles.transactionRef}>
                <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>TRANSACTION HASH</Text>
                <Text selectable style={[styles.hash, { color: colors.foreground }]}>{transactionHash}</Text>
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel="View confirmed transaction on MonadVision"
                  onPress={() => void Linking.openURL(explorerUrl)}
                  style={({ pressed }) => [styles.explorerLink, { opacity: pressed ? 0.65 : 1 }]}
                >
                  <Text style={[styles.explorerText, { color: colors.primary }]}>View on MonadVision</Text>
                  <Feather name="external-link" size={13} color={colors.primary} />
                </Pressable>
              </View>
            ) : null}
          </Card>
    
          <InlineNotice icon="shield">
            {params.historyWarning
              ? params.historyWarning
              : autoSaveConfirmed
              ? 'Both transfers were performed atomically by the SavingsPockets contract. Testnet AUSD moved; this has no real-world monetary value.'
              : settledThroughAgora
              ? 'CTK is a testnet mock payout token. This confirms the on-chain swap only; it is not a fiat payout. Receipt saved to Activity on this device.'
              : 'Testnet transaction only. Receipt saved to Activity on this device.'}
          </InlineNotice>
          <PrimaryButton
            label="Back to wallet"
            onPress={() => router.replace('/(tabs)')}
            testID="back-to-wallet"
          />
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { justifyContent: 'center', gap: 16, paddingTop: 12 },
      successIcon: {
        width: 56,
        height: 56,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
      },
      confirmedBadge: { flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', gap: 7, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
      confirmedDot: { width: 7, height: 7, borderRadius: 4 },
      confirmedText: { fontSize: 9, letterSpacing: 0.65, fontFamily: 'Inter_700Bold' },
      subtitle: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
      receipt: { gap: 9, padding: 16 },
      amount: { fontSize: 22, fontFamily: 'Inter_600SemiBold' },
      fieldLabel: { fontSize: 9, letterSpacing: 0.75, fontFamily: 'Inter_600SemiBold' },
      to: { fontSize: 11, lineHeight: 17, fontFamily: 'Inter_500Medium' },
      receiptDivider: { height: StyleSheet.hairlineWidth, marginVertical: 2 },
      receivePanel: { borderRadius: 12, padding: 12, marginTop: 2, gap: 5 },
      receivesLabel: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
      receivesValue: { fontSize: 17, fontFamily: 'Inter_600SemiBold' },
      reference: { fontSize: 9, lineHeight: 14, fontFamily: 'Inter_400Regular' },
      transactionRef: { gap: 5, marginTop: 2 },
      hash: { fontSize: 9, lineHeight: 14, fontFamily: 'Inter_500Medium' },
      explorerLink: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 3 },
      explorerText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
    });
    ✓ • 259ms

## User

also we should be able to send other tokens

## Activity

    $ sed -n '1,360p' artifacts/ausd-wallet/services/settlement.ts && sed -n '450,730p' artifacts/ausd-wallet/services/passkey.ts && sed -n '1,150p' artifacts/ausd-wallet/README.md
    import {
      createPublicClient,
      defineChain,
      formatUnits,
      http,
      isAddress,
      parseUnits,
      type Address,
    } from 'viem';
    import { WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    
    export const MONAD_TESTNET = {
      chainId: 10143,
      name: 'Monad Testnet',
      rpcUrl: process.env.EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL?.trim() || 'https://testnet-rpc.monad.xyz',
      factoryAddress: '0x8468587Af422ad440F58a57E955eCA6A970b5375' as Address,
      explorerUrl:
        'https://testnet.monadvision.com/address/0x8468587Af422ad440F58a57E955eCA6A970b5375?tab=Contract',
      ausdAddress: '0xa9012a055bd4e0eDfF8Ce09f960291C09D5322dC' as Address,
      usdcAddress: '0x534b2f3A21130d7a60830c2Df862319e593943A3' as Address,
      ctkAddress: '0x7BEb5D9DB0d85cBEa543C04f0dE8c23c2176cd9D' as Address,
    };
    
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    export const AGORA_TESTNET_WHITELISTER = '0x7c10F56d6f04a51376393a1C3670e966863F6BD5' as Address;
    
    const chain = defineChain({
      id: MONAD_TESTNET.chainId,
      name: MONAD_TESTNET.name,
      nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
      rpcUrls: { default: { http: [MONAD_TESTNET.rpcUrl] } },
    });
    
    const client = createPublicClient({ chain, transport: http(MONAD_TESTNET.rpcUrl) });
    
    const factoryAbi = [
      {
        type: 'function',
        name: 'getPairFromTokens',
        stateMutability: 'view',
        inputs: [
          { name: '_token0', type: 'address' },
          { name: '_token1', type: 'address' },
        ],
        outputs: [{ name: '', type: 'address' }],
      },
    ] as const;
    
    export const pairAbi = [
      {
        type: 'function',
        name: 'APPROVED_SWAPPER',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'string' }],
      },
      {
        type: 'function',
        name: 'hasRole',
        stateMutability: 'view',
        inputs: [{ name: '_role', type: 'string' }, { name: '_account', type: 'address' }],
        outputs: [{ name: '', type: 'bool' }],
      },
      {
        type: 'function',
        name: 'isPaused',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'bool' }],
      },
      {
        type: 'function',
        name: 'token0',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'address' }],
      },
      {
        type: 'function',
        name: 'token1',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'address' }],
      },
      {
        type: 'function',
        name: 'token0Decimals',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'token1Decimals',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'getAmountsOut',
        stateMutability: 'view',
        inputs: [
          { name: 'amountIn', type: 'uint256' },
          { name: 'path', type: 'address[]' },
        ],
        outputs: [{ name: 'amounts', type: 'uint256[]' }],
      },
      {
        type: 'function',
        name: 'getAmountsIn',
        stateMutability: 'view',
        inputs: [
          { name: 'amountOut', type: 'uint256' },
          { name: 'path', type: 'address[]' },
        ],
        outputs: [{ name: 'amounts', type: 'uint256[]' }],
      },
      {
        type: 'function',
        name: 'token0PurchaseFee',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'token1PurchaseFee',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'swapExactTokensForTokens',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'amountIn', type: 'uint256' },
          { name: 'amountOutMin', type: 'uint256' },
          { name: 'path', type: 'address[]' },
          { name: 'to', type: 'address' },
          { name: 'deadline', type: 'uint256' },
        ],
        outputs: [{ name: 'amounts', type: 'uint256[]' }],
      },
      {
        type: 'function',
        name: 'swapTokensForExactTokens',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'amountOut', type: 'uint256' },
          { name: 'amountInMax', type: 'uint256' },
          { name: 'path', type: 'address[]' },
          { name: 'to', type: 'address' },
          { name: 'deadline', type: 'uint256' },
        ],
        outputs: [{ name: 'amounts', type: 'uint256[]' }],
      },
      {
        type: 'event',
        name: 'Swap',
        anonymous: false,
        inputs: [
          { name: 'sender', type: 'address', indexed: true },
          { name: 'amount0In', type: 'uint256', indexed: false },
          { name: 'amount1In', type: 'uint256', indexed: false },
          { name: 'amount0Out', type: 'uint256', indexed: false },
          { name: 'amount1Out', type: 'uint256', indexed: false },
          { name: 'to', type: 'address', indexed: true },
        ],
      },
    ] as const;
    
    export const whitelisterAbi = [
      {
        type: 'function',
        name: 'setApprovedSwapper',
        stateMutability: 'nonpayable',
        inputs: [{ name: 'swapper', type: 'address' }],
        outputs: [],
      },
    ] as const;
    
    export interface SettlementQuote {
      checkedAt: string;
      factoryAddress: Address;
      pairAddress: Address;
      amountIn: string;
      amountInRaw: string;
      amountOut: string;
      amountOutRaw: string;
      quoteMode: 'exact-input' | 'exact-output';
      purchaseFeeRate: string;
      outputDecimals: number;
      inputSymbol: WalletToken;
      outputSymbol: WalletToken;
    }
    
    export async function simulateTokenSwap(
      inputSymbol: WalletToken,
      outputSymbol: WalletToken,
      amount: string,
      senderAddress: string,
      quoteMode: 'exact-input' | 'exact-output' = 'exact-input',
    ): Promise<SettlementQuote> {
      if (inputSymbol === outputSymbol) throw new Error('Choose two different tokens to swap.');
      if (!isAddress(senderAddress, { strict: false })) throw new Error('A valid sender wallet address is required for the testnet call.');
      const input = WALLET_TOKENS[inputSymbol];
      const output = WALLET_TOKENS[outputSymbol];
      let requestedAmount: bigint;
      try {
        requestedAmount = parseUnits(amount, quoteMode === 'exact-input' ? input.decimals : output.decimals);
      } catch {
        throw new Error(`Enter a valid ${quoteMode === 'exact-input' ? inputSymbol : outputSymbol} amount with the supported decimal places.`);
      }
      if (requestedAmount <= 0n) throw new Error('Enter an amount greater than zero.');
    
      try {
        const pairAddress = await client.readContract({
          address: MONAD_TESTNET.factoryAddress,
          abi: factoryAbi,
          functionName: 'getPairFromTokens',
          args: [input.address, output.address],
          account: senderAddress as Address,
        });
        if (pairAddress.toLowerCase() === ZERO_ADDRESS.toLowerCase()) throw new Error(`The factory did not find a ${inputSymbol}/${outputSymbol} pair on Monad testnet.`);
        const [token0, token1, decimals0, decimals1, paused, token0PurchaseFee, token1PurchaseFee] = await Promise.all([
          client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0' }),
          client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token1' }),
          client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0Decimals' }),
          client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token1Decimals' }),
          client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'isPaused' }),
          client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0PurchaseFee' }),
          client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token1PurchaseFee' }),
        ]);
        if (paused) throw new Error('The selected swap pair is paused on Monad testnet.');
        const inputIsToken0 = token0.toLowerCase() === input.address.toLowerCase();
        const outputIsToken0 = token0.toLowerCase() === output.address.toLowerCase();
        if ((!inputIsToken0 && token1.toLowerCase() !== input.address.toLowerCase()) || (!outputIsToken0 && token1.toLowerCase() !== output.address.toLowerCase())) {
          throw new Error(`The returned pair does not contain ${inputSymbol} and ${outputSymbol}.`);
        }
        const inputDecimals = Number(inputIsToken0 ? decimals0 : decimals1);
        const outputDecimals = Number(outputIsToken0 ? decimals0 : decimals1);
        if (inputDecimals !== input.decimals || outputDecimals !== output.decimals) throw new Error('The selected pair reports unexpected token decimals.');
        const path = [input.address, output.address] as const;
        const amounts = quoteMode === 'exact-input'
          ? await client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'getAmountsOut', args: [requestedAmount, [...path]], account: senderAddress as Address })
          : await client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'getAmountsIn', args: [requestedAmount, [...path]], account: senderAddress as Address });
        const amountInRaw = quoteMode === 'exact-input' ? requestedAmount : amounts[0];
        const amountOutRaw = quoteMode === 'exact-input' ? amounts[amounts.length - 1] : requestedAmount;
        if (amountInRaw === undefined || amountInRaw <= 0n || amountOutRaw === undefined || amountOutRaw <= 0n) throw new Error('The selected pair returned no quote for this amount.');
        return {
          checkedAt: new Date().toISOString(), factoryAddress: MONAD_TESTNET.factoryAddress, pairAddress,
          amountIn: formatUnits(amountInRaw, inputDecimals), amountInRaw: amountInRaw.toString(),
          amountOut: formatUnits(amountOutRaw, outputDecimals), amountOutRaw: amountOutRaw.toString(), quoteMode,
          purchaseFeeRate: formatUnits(inputIsToken0 ? token0PurchaseFee : token1PurchaseFee, 18),
          inputSymbol, outputSymbol, outputDecimals,
        };
      } catch (error) {
        if (error instanceof Error && /factory|pair|quote|selected|Monad testnet|decimals/.test(error.message)) throw error;
        throw new Error(error instanceof Error ? `Monad testnet quote failed: ${error.message}` : 'Monad testnet quote failed. Check your connection and try again.');
      }
    }
    
    /**
     * Executes only eth_call reads: resolve the documented pair and ask it for a
     * live AUSD→CTK quote. This does not call a state-changing swap function.
     */
    export async function simulateSettlementSwap(
      amount: string,
      senderAddress: string,
      quoteMode: 'exact-input' | 'exact-output' = 'exact-input',
    ): Promise<SettlementQuote> {
      return simulateTokenSwap('AUSD', 'CTK', amount, senderAddress, quoteMode);
    }
    /**
     * Submit a reviewed set of calls as one Pimlico-sponsored Kernel UserOperation.
     * Callers must validate balances, contract state, and user-visible amounts first.
     */
    export async function sendSponsoredCalls(
      account: MeraPasskeyProfile,
      calls: SponsoredCall[],
    ) {
      if (!calls.length) throw new Error('There are no contract calls to submit.');
      const bundlerUrl = process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL?.trim();
      if (!bundlerUrl) throw new Error('Pimlico is not configured. Set EXPO_PUBLIC_PIMLICO_BUNDLER_URL and rebuild or restart the app.');
      if (!/^https:\/\//i.test(bundlerUrl)) throw new Error('The Pimlico bundler URL must use HTTPS.');
    
      const signer = await getMeraViemSigner(account);
      try {
        const kernelAccount = await createKernelAccount(signer.owner);
        if (kernelAccount.address.toLowerCase() !== account.address.toLowerCase()) {
          throw new Error('The passkey-derived smart account changed. Stop and restore the matching wallet before signing.');
        }
        const pimlicoClient = createPaymasterClient({ transport: http(bundlerUrl) });
        const sponsorshipPolicyId = process.env.EXPO_PUBLIC_PIMLICO_POLICY_ID?.trim();
        const smartAccountClient = createSmartAccountClient({
          account: kernelAccount,
          chain: MONAD_CHAIN,
          client: publicClient,
          bundlerTransport: http(bundlerUrl),
          paymaster: pimlicoClient,
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
        const transactionHash = await smartAccountClient.sendTransaction({
          calls: calls.map((call) => ({ ...call, value: 0n })),
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: transactionHash,
          timeout: 120_000,
        });
        if (receipt.status !== 'success') {
          throw new Error('The sponsored savings operation reverted on Monad testnet.');
        }
        return {
          transactionHash,
          accountAddress: kernelAccount.address,
          blockNumber: receipt.blockNumber,
          logs: receipt.logs,
        };
      } finally {
        signer.session.end();
      }
    }
    
    export async function sendSponsoredAUSDTransfer(
      account: MeraPasskeyProfile,
      recipient: string,
      amount: string,
    ): Promise<SponsoredTransferResult> {
      return sendSponsoredTokenTransfer(account, recipient, amount, 'AUSD');
    }
    
    export async function sendSponsoredTokenTransfer(
      account: MeraPasskeyProfile,
      recipient: string,
      amount: string,
      token: WalletToken,
    ): Promise<SponsoredTransferResult> {
      if (!isAddress(recipient, { strict: false })) throw new Error('Enter a valid recipient wallet address.');
      if (recipient.toLowerCase() === account.address.toLowerCase()) throw new Error('Choose a recipient other than your own wallet.');
      const bundlerUrl = process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL?.trim();
      if (!bundlerUrl) throw new Error('Pimlico is not configured. Set EXPO_PUBLIC_PIMLICO_BUNDLER_URL and rebuild or restart the app.');
      if (!/^https:\/\//i.test(bundlerUrl)) throw new Error('The Pimlico bundler URL must use HTTPS.');
    
      let amountIn: bigint;
      try {
        amountIn = parseUnits(amount, WALLET_TOKENS[token].decimals);
      } catch {
        throw new Error(`Enter a valid ${token} amount with at most ${WALLET_TOKENS[token].decimals} decimal places.`);
      }
      if (amountIn <= 0n) throw new Error(`Enter a ${token} amount greater than zero.`);
    
      const signer = await getMeraViemSigner(account);
      try {
        const kernelAccount = await createKernelAccount(signer.owner);
        if (kernelAccount.address.toLowerCase() !== account.address.toLowerCase()) {
          throw new Error('The passkey-derived smart account changed. Stop and restore the matching wallet before sending.');
        }
        const [decimals, balance] = await Promise.all([
          publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'decimals' }),
          publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'balanceOf', args: [kernelAccount.address] }),
        ]);
        if (decimals !== WALLET_TOKENS[token].decimals) throw new Error(`Monad ${token} reports ${decimals} decimals; expected ${WALLET_TOKENS[token].decimals}.`);
        if (balance < amountIn) throw new Error(`Insufficient ${token} balance. This smart account holds ${formatUnits(balance, decimals)} ${token}.`);
    
        const pimlicoClient = createPaymasterClient({ transport: http(bundlerUrl) });
        const sponsorshipPolicyId = process.env.EXPO_PUBLIC_PIMLICO_POLICY_ID?.trim();
        const smartAccountClient = createSmartAccountClient({
          account: kernelAccount,
          chain: MONAD_CHAIN,
          client: publicClient,
          bundlerTransport: http(bundlerUrl),
          paymaster: pimlicoClient,
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
    
        const transactionHash = await smartAccountClient.sendTransaction({
          to: WALLET_TOKENS[token].address,
          data: encodeFunctionData({
            abi: ausdAbi,
            functionName: 'transfer',
            args: [recipient as Address, amountIn],
          }),
          value: 0n,
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: transactionHash, timeout: 120_000 });
        if (receipt.status !== 'success') throw new Error(`The sponsored ${token} transfer reverted on Monad testnet.`);
        return { transactionHash, accountAddress: kernelAccount.address, blockNumber: receipt.blockNumber };
      } finally {
        signer.session.end();
      }
    }
    
    export async function sendSponsoredInstantSettlementSwap(
      account: MeraPasskeyProfile,
      recipient: string,
      amount: string,
      acceptedQuote: { pairAddress: string; amountInRaw?: string; amountOutRaw: string; checkedAt: string; quoteMode?: 'exact-input' | 'exact-output' },
      allowSelfRecipient = false,
      inputSymbol: WalletToken = 'AUSD',
      outputSymbol: WalletToken = 'CTK',
    ): Promise<SponsoredSettlementResult> {
      if (!isAddress(recipient, { strict: false })) throw new Error('Enter a valid recipient wallet address.');
      if (!allowSelfRecipient && recipient.toLowerCase() === account.address.toLowerCase()) throw new Error('Choose a recipient other than your own wallet.');
      if (!isAddress(acceptedQuote.pairAddress, { strict: false })) throw new Error('The reviewed Agora pair address is invalid.');
      if (!/^\d+$/.test(acceptedQuote.amountOutRaw) || BigInt(acceptedQuote.amountOutRaw) <= 0n) {
        throw new Error(`The reviewed ${outputSymbol} quote is invalid. Return to the swap form and refresh it.`);
      }
      const quoteMode = acceptedQuote.quoteMode ?? 'exact-input';
      if (quoteMode === 'exact-output' && (!acceptedQuote.amountInRaw || !/^\d+$/.test(acceptedQuote.amountInRaw) || BigInt(acceptedQuote.amountInRaw) <= 0n)) {
        throw new Error(`The reviewed maximum ${inputSymbol} input is invalid. Return to the swap form and refresh the quote.`);
      }
      const quoteTime = Date.parse(acceptedQuote.checkedAt);
      if (!Number.isFinite(quoteTime) || Date.now() - quoteTime > 5 * 60_000) {
        throw new Error('This Agora quote has expired. Return to the send form and get a fresh quote.');
      }
      const bundlerUrl = process.env.EXPO_PUBLIC_PIMLICO_BUNDLER_URL?.trim();
      if (!bundlerUrl) throw new Error('Pimlico is not configured. Set EXPO_PUBLIC_PIMLICO_BUNDLER_URL and rebuild or restart the app.');
      if (!/^https:\/\//i.test(bundlerUrl)) throw new Error('The Pimlico bundler URL must use HTTPS.');
    
      let requestedAmount: bigint;
      try { requestedAmount = parseUnits(amount, quoteMode === 'exact-input' ? WALLET_TOKENS[inputSymbol].decimals : WALLET_TOKENS[outputSymbol].decimals); }
      catch { throw new Error(`Enter a valid ${quoteMode === 'exact-input' ? inputSymbol : outputSymbol} amount with the supported decimal places.`); }
      if (requestedAmount <= 0n) throw new Error('Enter an amount greater than zero.');
    
      const signer = await getMeraViemSigner(account);
      try {
        const kernelAccount = await createKernelAccount(signer.owner);
        if (kernelAccount.address.toLowerCase() !== account.address.toLowerCase()) {
          throw new Error('The passkey-derived smart account changed. Stop and restore the matching wallet before sending.');
        }
    
        // Requote immediately before signing. The exact amount shown in review is
        // the minimum output; a worse quote requires the user to review again.
        const freshQuote = await simulateTokenSwap(inputSymbol, outputSymbol, amount, kernelAccount.address, quoteMode);
        const acceptedAmountInRaw = quoteMode === 'exact-input'
          ? requestedAmount.toString()
          : BigInt(acceptedQuote.amountInRaw!).toString();
        const quoteWorsened = quoteMode === 'exact-input'
          ? BigInt(freshQuote.amountOutRaw) < BigInt(acceptedQuote.amountOutRaw)
          : BigInt(freshQuote.amountInRaw) > BigInt(acceptedAmountInRaw) || freshQuote.amountOutRaw !== acceptedQuote.amountOutRaw;
        if (freshQuote.pairAddress.toLowerCase() !== acceptedQuote.pairAddress.toLowerCase() || quoteWorsened) {
          throw new Error('The Agora quote changed. Return to the send form and review the updated payout.');
        }
        const pairAddress = freshQuote.pairAddress;
        const amountInMax = quoteMode === 'exact-input' ? requestedAmount : BigInt(acceptedAmountInRaw);
        const [decimals, balance, approved, allowance, token0, token1, whitelisterCode] = await Promise.all([
          publicClient.readContract({ address: WALLET_TOKENS[inputSymbol].address, abi: balanceAbi, functionName: 'decimals' }),
          publicClient.readContract({ address: WALLET_TOKENS[inputSymbol].address, abi: balanceAbi, functionName: 'balanceOf', args: [kernelAccount.address] }),
          publicClient.readContract({ address: pairAddress, abi: pairAbi, functionName: 'hasRole', args: ['APPROVED_SWAPPER', kernelAccount.address] }),
          publicClient.readContract({ address: WALLET_TOKENS[inputSymbol].address, abi: ausdAbi, functionName: 'allowance', args: [kernelAccount.address, pairAddress] }),
          publicClient.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0' }),
          publicClient.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token1' }),
          publicClient.getBytecode({ address: AGORA_TESTNET_WHITELISTER }),
        ]);
        if (decimals !== WALLET_TOKENS[inputSymbol].decimals) throw new Error(`Monad ${inputSymbol} reports ${decimals} decimals; expected ${WALLET_TOKENS[inputSymbol].decimals}.`);
        if (balance < amountInMax) throw new Error(`Insufficient ${inputSymbol} balance. This smart account holds ${formatUnits(balance, decimals)} ${inputSymbol}.`);
        if (!whitelisterCode || whitelisterCode === '0x') throw new Error('Agora’s Monad testnet whitelister is not deployed at the documented address.');
        if (![token0.toLowerCase(), token1.toLowerCase()].includes(WALLET_TOKENS[inputSymbol].address.toLowerCase()) ||
            ![token0.toLowerCase(), token1.toLowerCase()].includes(WALLET_TOKENS[outputSymbol].address.toLowerCase())) {
          throw new Error('The swap pair token order changed. Return to the swap form and request a new quote.');
        }
    
        const calls: { to: Address; value: bigint; data: `0x${string}` }[] = [];
        if (!approved) {
          calls.push({
            to: AGORA_TESTNET_WHITELISTER,
            value: 0n,
            data: encodeFunctionData({ abi: whitelisterAbi, functionName: 'setApprovedSwapper', args: [kernelAccount.address] }),
          });
        }
        if (allowance < amountInMax) {
          calls.push({
            to: WALLET_TOKENS[inputSymbol].address,
            value: 0n,
            data: encodeFunctionData({ abi: ausdAbi, functionName: 'approve', args: [pairAddress, amountInMax] }),
          });
        }
        const swapDeadline = BigInt(Math.floor(Date.now() / 1000) + 300);
        const swapData = quoteMode === 'exact-input'
          ? encodeFunctionData({
              abi: pairAbi,
              functionName: 'swapExactTokensForTokens',
              args: [requestedAmount, BigInt(acceptedQuote.amountOutRaw), [WALLET_TOKENS[inputSymbol].address, WALLET_TOKENS[outputSymbol].address], recipient as Address, swapDeadline],
            })
          : encodeFunctionData({
              abi: pairAbi,
              functionName: 'swapTokensForExactTokens',
              args: [requestedAmount, amountInMax, [WALLET_TOKENS[inputSymbol].address, WALLET_TOKENS[outputSymbol].address], recipient as Address, swapDeadline],
            });
        calls.push({ to: pairAddress, value: 0n, data: swapData });
    
        const pimlicoClient = createPaymasterClient({ transport: http(bundlerUrl) });
        const sponsorshipPolicyId = process.env.EXPO_PUBLIC_PIMLICO_POLICY_ID?.trim();
        const smartAccountClient = createSmartAccountClient({
          account: kernelAccount,
          chain: MONAD_CHAIN,
          client: publicClient,
          bundlerTransport: http(bundlerUrl),
          paymaster: pimlicoClient,
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
        const transactionHash = await smartAccountClient.sendTransaction({
          calls,
          ...(sponsorshipPolicyId ? { paymasterContext: { sponsorshipPolicyId } } : {}),
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: transactionHash, timeout: 120_000 });
        if (receipt.status !== 'success') throw new Error('The sponsored Agora settlement reverted on Monad testnet.');
    
        let amountOut: bigint | undefined;
        let actualAmountIn: bigint | undefined;
        for (const log of receipt.logs) {
          if (log.address.toLowerCase() !== pairAddress.toLowerCase()) continue;
          try {
            const event = decodeEventLog({ abi: pairAbi, eventName: 'Swap', data: log.data, topics: log.topics });
            if (event.args.to.toLowerCase() !== recipient.toLowerCase()) continue;
            const inputIsToken0 = token0.toLowerCase() === WALLET_TOKENS[inputSymbol].address.toLowerCase();
            amountOut = inputIsToken0 ? event.args.amount1Out : event.args.amount0Out;
            actualAmountIn = inputIsToken0 ? event.args.amount0In : event.args.amount1In;
            break;
          } catch {
            // Other pair events in the same transaction are ignored.
          }
        }
        if (amountOut === undefined || actualAmountIn === undefined || amountOut < BigInt(acceptedQuote.amountOutRaw)) {
          throw new Error('The transaction was included, but the expected recipient payout could not be verified from the Agora swap event.');
        }
        return {
          transactionHash,
          accountAddress: kernelAccount.address,
          blockNumber: receipt.blockNumber,
          pairAddress,
          amountIn: formatUnits(actualAmountIn, WALLET_TOKENS[inputSymbol].decimals),
          amountOut: formatUnits(amountOut, freshQuote.outputDecimals),
          inputSymbol,
          outputSymbol,
        };
      } finally {
        signer.session.end();
      }
    }
    # AUSD Wallet
    
    Expo mobile wallet prototype for AUSD payments. New users move through a three-screen swipe introduction, then create a Mera passkey account. Mera authenticates wallet actions, direct AUSD transfers and Agora Instant Settlement swaps can submit sponsored transactions on Monad testnet, and CTK is used as a mock payout token. Aurora Intents can quote cross-chain deposits into Monad AUSD and provide a temporary source-chain deposit address.
    
    ## Passkey setup
    
    Mera uses WebAuthn PRF support. It is supported in React Native on iOS 18+ and Android 9+; native builds need `react-native-passkey` autolinked into the app (use a development or production build, not Expo Go).
    
    Set `EXPO_PUBLIC_RP_ID` to the hostname that will own the passkey. It must be a verified HTTPS domain and match the app’s native domain associations. If omitted, the Expo development domain is used when available. Native builds also accept:
    
    - `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    - `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
    - `AUSD_ANDROID_PACKAGE` (defaults to `com.ausd.wallet`)
    - `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
    
    The Expo config adds iOS Associated Domains and the Android verified web link when an RP ID is set. The app server serves `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json` from the variables above. Publish the server on the same HTTPS hostname as the RP ID. The association endpoints respond with a configuration error until the platform signing values are provided.
    
    Mera credential IDs and transports are stored locally so the user can authenticate again. The PRF output is converted into the standard EVM BIP-44 account key at `m/44'/60'/0'/0/0`; the PRF output, derived key, seed, and signing session are cleared after deriving the address and are not persisted.
    
    ## Monad testnet transfers and settlement
    
    The Mera PRF derives a standard EVM BIP-44 owner and a Kernel v0.3.1 smart account (EntryPoint v0.7). Direct sends authenticate with Mera and submit an AUSD transfer through a sponsored UserOperation. Agora settlement re-reads its AUSD→CTK quote, checks it has not changed, then submits the approved testnet settlement flow through a sponsored UserOperation. CTK is a test token, not a fiat payout. These actions can move test tokens on Monad testnet; do not use mainnet funds.
    
    Savings goals create pockets in the deployed Monad testnet `SavingsPockets` contract. Deposits batch an exact-amount AUSD approval with the pocket deposit; payments with auto-save batch an exact-amount approval when needed with the recipient payment and pocket allocation. The send review shows the recipient payment, auto-save amount, and total AUSD debit before Mera passkey approval. Pocket creation does not move AUSD. Legacy goals without a pocket remain labeled as local-only tracking. Confirm each transaction only after checking the recipient and total debit; sponsorship is requested, not guaranteed.
    
    Set `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` to an Alchemy Monad testnet RPC URL to route balance and Agora quote reads through Alchemy. The app falls back to Monad's public testnet RPC when this variable is absent. `EXPO_PUBLIC_*` values are embedded in the app bundle; use a dedicated testnet key with appropriate limits and keep local environment files out of version control.
    
    Aurora Intents deposits require `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`, created in [Aurora Intents Studio](https://studio.aurora.dev/). Add it to local environment as shown in `.env.example`. For GitHub Actions builds, set it as the repository variable `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`; for Codemagic, add it to the `ausd_wallet` variable group. Restart or rebuild after configuring. The key is public and embedded in the app bundle. The app loads supported assets, selects the configured Monad AUSD contract, requests a quote, shows the generated deposit address and any required memo, and can query transaction status. The user sends the source token from an external wallet; the app does not sign or submit that source-chain transfer. Always follow the quoted source chain, token, amount, address, memo, and expiry.
    
    Agora's unauthenticated public metrics endpoint appears on Profile. Add and Cash out tabs describe a planned Alchemy Pay connection; they do not launch checkout or submit a payout. Card issuing is not enabled. Agora's testnet swap is enabled through the existing send/review flow.
    
    ## Android demo APK on Codemagic
    
    The repository-root `codemagic.yaml` generates the Android native project with Expo prebuild, builds the bundled `assembleRelease` app, and archives `artifacts/ausd-wallet/android/app/build/outputs/apk/release/*.apk`. The workflow installs the pnpm workspace lockfile and runs on pushes to `main`.
    
    Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    
    ## Android APK on GitHub Actions
    
    The `.github/workflows/build-android-apk.yml` workflow builds the bundled app APK on every push and can also be started from the repository's **Actions** tab with **Run workflow**. After a successful run, download `ausd-wallet-android-<commit>` from that run's artifacts. Artifacts are retained for 14 days. This is a release-variant APK for demo installation, not a Play Store-signed production release.
    
    To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    
    ## Commands
    
    - `pnpm --filter @workspace/ausd-wallet run dev` — start the Expo app
    - `pnpm --filter @workspace/ausd-wallet run dev:client` — start Metro for an installed native development build
    - `pnpm --filter @workspace/ausd-wallet run typecheck` — typecheck the app
    - `pnpm --filter @workspace/ausd-wallet run build` — create its static Expo build
    
    ## Install an Android passkey build
    
    Expo Go cannot load Mera’s native passkey module. Build and install the Android development APK once, then use `dev:client` for JavaScript iteration:
    
    1. Set `EXPO_PUBLIC_RP_ID` to the public HTTPS hostname configured for passkeys, and publish the Android asset links file with the package name and signing certificate SHA-256 fingerprint.
    2. Run `eas build --platform android --profile development` to produce an installable APK.
    3. Install that APK on an Android 9+ device, then run `pnpm --filter @workspace/ausd-wallet run dev:client` and open the app.
    
    The current Expo Go preview remains useful for the UI, but passkey creation and authentication only work in the native development build (or supported web browser).
    
    ## Payment requests and indexed activity
    
    Receive creates an AUSD payment-request QR code and share link. Send can scan the request and prefill its recipient and optional amount for review; the sender must still approve with their passkey. Camera permission is requested only when scanning.
    
    The private contacts book stores user-chosen names with confirmed smart-account addresses in a Mera-encrypted vault on device. Contacts can be exported and restored as encrypted data with the same passkey and RP domain. Selecting a contact pre-fills Send and shows the saved name during transaction review; there is no global username directory.
    
    The Envio indexer is in `artifacts/wallet-indexer`. In Envio Cloud, set **Root Directory** to `artifacts/wallet-indexer` and **Config File** to `config.yaml`; that directory contains the exact Envio version pin Cloud checks. The indexer pins Envio `3.10.0`, pnpm `10.32.0`, and Node 24+. Deploy it, then set its public GraphQL URL as the GitHub Actions repository variable `EXPO_PUBLIC_ENVIO_GRAPHQL_URL`. Set the same variable in the local wallet environment to use indexed activity during development. It indexes Monad testnet AUSD, USDC, and CTK `Transfer` events from block `69501034`. If the URL is missing or unavailable, the activity screen falls back to transfers saved on the device.
    ✓ • 11ms

## Assistant

The transfer mechanics already meet the core track: Mera passkey authentication creates a sponsored Kernel operation; direct sends submit an ERC-20 transfer, and settlement rechecks the Agora quote immediately before it signs. I’ll extend direct sends to locally tracked ERC-20 assets while keeping the AUSD → CTK settlement route bounded to its testnet pair.

## Activity

    Searched the web for site:docs.agora.finance public API instant settlement Monad testnet Agora, site:agora.finance instant settlement Monad testnet documentation

## Activity

    $ sed -n '150,310p' artifacts/ausd-wallet/app/review.tsx && sed -n '1,130p' artifacts/ausd-wallet/app/success.tsx
              amount: autoSaveResult?.paymentAmount ?? String(sentAmount),
              currency: sentCurrency,
              receiveAmount: String(receivedAmount),
              receiveCurrency: receivedCurrency,
              settlement: settlement ? 'agora' : 'direct',
              autoSave: autoSaveResult ? 'true' : 'false',
              goalName,
              paymentAmount: autoSaveResult?.paymentAmount ?? '',
              autoSavedAmount: autoSaveResult?.savedAmount ?? '',
              totalDebit: autoSaveResult?.totalDebit ?? '',
              historyWarning,
              id: transfer.id,
              transactionHash: result.transactionHash,
              accountAddress: result.accountAddress,
              blockNumber: result.blockNumber.toString(),
            },
          });
        } catch (caught) {
          setError(
            caught instanceof Error
              ? caught.message
              : 'The sponsored transfer failed. No receipt was recorded.',
          );
        } finally {
          setBusy(false);
        }
      }
    
      return (
        <Page contentStyle={styles.page}>
          <BackButton onPress={() => router.back()} />
          <View style={styles.heading}>
            <Eyebrow>{autoSave ? 'PAYMENT + AUTO-SAVE' : settlement ? 'AGORA INSTANT SETTLEMENT' : 'FINAL CHECK'}</Eyebrow>
            <Title>{autoSave ? 'Review payment + savings' : swapOnly ? 'Review swap' : settlement ? 'Review payout' : 'Review send'}</Title>
          </View>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryLine}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{autoSave ? 'RECIPIENT PAYMENT' : 'YOU SEND'}</Text>
              <Text style={[styles.amountValue, { color: colors.foreground }]}>
                {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} <Text style={[styles.amountUnit, { color: colors.mutedForeground }]}>{sendToken}</Text>
              </Text>
            </View>
            {autoSave && autoSaveBreakdown ? (
              <>
                <View style={[styles.rule, { backgroundColor: colors.border }]} />
                <View style={styles.summaryLine}>
                  <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>AUTO-SAVE · {autoSaveBps / 100}% TO {goalName.toUpperCase()}</Text>
                  <Text style={[styles.outputValue, { color: colors.foreground }]}>
                    +{Number(autoSaveBreakdown.savedAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                  </Text>
                </View>
                <View style={[styles.rule, { backgroundColor: colors.border }]} />
                <View style={styles.summaryLine}>
                  <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>TOTAL WALLET DEBIT</Text>
                  <Text style={[styles.outputValue, { color: colors.foreground }]}>
                    {Number(autoSaveBreakdown.totalDebit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                  </Text>
                </View>
              </>
            ) : null}
            <View style={[styles.rule, { backgroundColor: colors.border }]} />
            <View style={styles.summaryLine}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{settlement ? 'AGORA QUOTED OUTPUT' : 'RECIPIENT RECEIVES'}</Text>
              <Text style={[styles.outputValue, { color: colors.foreground }]}>
                {settlement
                  ? quoteOutput ? `${Number(quoteOutput).toLocaleString('en-US', { maximumFractionDigits: WALLET_TOKENS[outputToken].decimals })} ${outputToken}` : 'Quote unavailable'
                  : `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} ${sendToken}`}
              </Text>
            </View>
            {settlement ? (
              <Text style={[styles.quoteNote, { color: colors.mutedForeground }]}>
                {quoteTime ? `Quote from ${quoteTime} · ` : ''}{purchaseFeeRate > 0 ? `Pair fee ${(purchaseFeeRate * 100).toLocaleString('en-US', { maximumFractionDigits: 4 })}% is included. ` : 'The quoted output is protected by the reviewed minimum. '}{tokenSwap ? `${inputToken} to ${outputToken}` : 'CTK is the testnet settlement token.'}
              </Text>
            ) : null}
          </Card>
          <Card style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{swapOnly ? 'OUTPUT WALLET' : 'TO'}</Text>
               <Text selectable style={[styles.recipient, { color: colors.foreground }]}>{recipientName ? `${recipientName} · ${recipient}` : recipient}</Text>
            </View>
            <View style={[styles.rule, { backgroundColor: colors.border }]} />
            <View style={styles.detailRow}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>NETWORK</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>{MONAD_TESTNET.name}</Text>
            </View>
            <View style={[styles.rule, { backgroundColor: colors.border }]} />
            <View style={styles.detailRow}>
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>NETWORK FEE</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>Sponsorship requested · no MON if approved</Text>
            </View>
          </Card>
          {settlement ? <Text style={[styles.firstTimeNote, { color: colors.mutedForeground }]}>First use may enable this testnet wallet and approve the pair. One passkey approval covers the sponsored batch.</Text> : null}
          {busy ? (
            <View accessibilityLiveRegion="polite" style={[styles.progressPanel, { backgroundColor: colors.secondary }]}>
              <ActivityIndicator color={colors.primary} />
              <View style={styles.progressCopy}>
                <Text style={[styles.progressTitle, { color: colors.foreground }]}>Waiting for confirmation</Text>
                <Text style={[styles.networkCaption, { color: colors.mutedForeground }]}>Approve with your passkey, then we’ll wait for Monad testnet to confirm.</Text>
              </View>
            </View>
          ) : null}
          {error ? (
            <View accessibilityRole="alert" style={[styles.errorPanel, { backgroundColor: colors.secondary }]}>
              <Feather name="alert-circle" size={17} color={colors.destructive} />
              <View style={styles.progressCopy}>
                <Text style={[styles.progressTitle, { color: colors.destructive }]}>{autoSave ? 'Payment not confirmed' : swapOnly ? 'Swap not confirmed' : 'Transfer not confirmed'}</Text>
                <Text style={[styles.error, { color: colors.mutedForeground }]}>{error}</Text>
                <Text style={[styles.errorHint, { color: colors.mutedForeground }]}>If you approved a transaction, check Activity or MonadVision before trying again.</Text>
              </View>
            </View>
          ) : null}
          <PrimaryButton
            label={busy ? 'Confirming on Monad…' : autoSave ? 'Approve payment + save' : swapOnly ? 'Approve & swap' : settlement ? 'Approve & settle' : 'Approve & send'}
            icon="arrow-right"
            onPress={confirmTransfer}
            loading={busy}
            testID="confirm-transfer"
          />
          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>Passkey approval required · Monad testnet only</Text>
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { gap: 16, paddingTop: 8 },
      heading: { gap: 6, marginTop: 5 },
      summaryCard: { gap: 12, padding: 16 },
      summaryLine: { gap: 7 },
      rule: { height: StyleSheet.hairlineWidth },
      amountValue: { fontSize: 27, letterSpacing: -0.7, fontFamily: 'Inter_600SemiBold' },
      amountUnit: { fontSize: 17, fontFamily: 'Inter_500Medium' },
      outputValue: { fontSize: 20, fontFamily: 'Inter_600SemiBold' },
      quoteNote: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
      detailsCard: { gap: 11, padding: 15 },
      detailRow: { gap: 6 },
      metaLabel: { fontSize: 10, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
      recipient: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_500Medium' },
      detailValue: { fontSize: 12, fontFamily: 'Inter_500Medium' },
      networkCaption: { marginTop: 3, fontSize: 10, fontFamily: 'Inter_400Regular' },
      progressPanel: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, padding: 14 },
      progressCopy: { flex: 1, gap: 4 },
      progressTitle: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
      errorPanel: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderRadius: 14, padding: 14 },
      error: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
      errorHint: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
      disclaimer: { textAlign: 'center', fontSize: 10, fontFamily: 'Inter_400Regular' },
      firstTimeNote: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
    });
    import React from 'react';
    import { router, useLocalSearchParams } from 'expo-router';
    import { Linking, Pressable } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { StyleSheet, Text, View } from 'react-native';
    import { useColors } from '@/hooks/useColors';
    import {
      Card,
      Eyebrow,
      InlineNotice,
      Page,
      PrimaryButton,
      Title,
    } from '@/components/Primitives';
    
    export default function SimulationSuccessScreen() {
      const colors = useColors();
      const params = useLocalSearchParams<{
        recipient?: string;
        amount?: string;
        currency?: string;
        receiveAmount?: string;
        id?: string;
        transactionHash?: string;
        accountAddress?: string;
        blockNumber?: string;
        receiveCurrency?: string;
        settlement?: string;
        autoSave?: string;
        goalName?: string;
        paymentAmount?: string;
        autoSavedAmount?: string;
        totalDebit?: string;
        historyWarning?: string;
      }>();
      const amount = Number(params.amount ?? 0);
      const receiveAmount = Number(params.receiveAmount ?? amount);
      const receiveCurrency = typeof params.receiveCurrency === 'string' ? params.receiveCurrency : 'AUSD';
      const settledThroughAgora = params.settlement === 'agora';
      const autoSaveConfirmed = params.autoSave === 'true';
      const transactionHash = params.transactionHash;
      const explorerUrl = transactionHash
        ? `https://testnet.monadvision.com/tx/${transactionHash}`
        : '';
    
      return (
        <Page contentStyle={styles.page}>
          <View style={[styles.successIcon, { backgroundColor: colors.primary }]}>
            <Feather name="check" size={27} color={colors.primaryForeground} />
          </View>
          <View style={[styles.confirmedBadge, { backgroundColor: colors.secondary }]}>
            <View style={[styles.confirmedDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.confirmedText, { color: colors.foreground }]}>CONFIRMED ON MONAD TESTNET</Text>
          </View>
          <Title>{autoSaveConfirmed ? 'Payment + savings confirmed' : settledThroughAgora ? 'Settlement confirmed' : 'Transfer confirmed'}</Title>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {autoSaveConfirmed
              ? 'The recipient payment and savings allocation were included in one confirmed Monad testnet transaction.'
              : settledThroughAgora
              ? 'The Agora AUSD-to-CTK swap was included in a confirmed sponsored transaction.'
              : 'Your AUSD transfer was included in a confirmed sponsored transaction.'}
          </Text>
    
          <Card style={styles.receipt}>
            <Text style={[styles.amount, { color: colors.foreground }]}>
              {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
            </Text>
            <View style={[styles.receivePanel, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.receivesLabel, { color: colors.mutedForeground }]}>{settledThroughAgora ? 'TESTNET OUTPUT · AGORA QUOTE' : 'RECIPIENT RECEIVES'}</Text>
              <Text style={[styles.receivesValue, { color: colors.foreground }]}>
                {receiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {receiveCurrency}
              </Text>
            </View>
            {autoSaveConfirmed ? (
              <View style={[styles.receivePanel, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.receivesLabel, { color: colors.mutedForeground }]}>
                  AUTO-SAVED TO {params.goalName ?? 'SAVINGS POCKET'}
                </Text>
                <Text style={[styles.receivesValue, { color: colors.foreground }]}>
                  {Number(params.autoSavedAmount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                </Text>
                <Text style={[styles.reference, { color: colors.mutedForeground }]}>
                  Total wallet debit: {Number(params.totalDebit ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                </Text>
              </View>
            ) : null}
            <View style={[styles.receiptDivider, { backgroundColor: colors.border }]} />
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>RECIPIENT</Text>
            <Text selectable style={[styles.to, { color: colors.foreground }]}>{params.recipient ?? 'Recipient unavailable'}</Text>
            {params.accountAddress ? <Text selectable style={[styles.reference, { color: colors.mutedForeground }]}>From smart account · {params.accountAddress}</Text> : null}
            {params.blockNumber ? <Text style={[styles.reference, { color: colors.mutedForeground }]}>Block {params.blockNumber} · Gas sponsored by Pimlico</Text> : null}
            {transactionHash ? (
              <View style={styles.transactionRef}>
                <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>TRANSACTION HASH</Text>
                <Text selectable style={[styles.hash, { color: colors.foreground }]}>{transactionHash}</Text>
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel="View confirmed transaction on MonadVision"
                  onPress={() => void Linking.openURL(explorerUrl)}
                  style={({ pressed }) => [styles.explorerLink, { opacity: pressed ? 0.65 : 1 }]}
                >
                  <Text style={[styles.explorerText, { color: colors.primary }]}>View on MonadVision</Text>
                  <Feather name="external-link" size={13} color={colors.primary} />
                </Pressable>
              </View>
            ) : null}
          </Card>
    
          <InlineNotice icon="shield">
            {params.historyWarning
              ? params.historyWarning
              : autoSaveConfirmed
              ? 'Both transfers were performed atomically by the SavingsPockets contract. Testnet AUSD moved; this has no real-world monetary value.'
              : settledThroughAgora
              ? 'CTK is a testnet mock payout token. This confirms the on-chain swap only; it is not a fiat payout. Receipt saved to Activity on this device.'
              : 'Testnet transaction only. Receipt saved to Activity on this device.'}
          </InlineNotice>
          <PrimaryButton
            label="Back to wallet"
            onPress={() => router.replace('/(tabs)')}
            testID="back-to-wallet"
          />
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { justifyContent: 'center', gap: 16, paddingTop: 12 },
      successIcon: {
        width: 56,
    ✓ • 0ms

## Assistant

The audit found one confirmation bug worth fixing alongside the visual work: the success receipt always labels the sent amount as AUSD, even when a direct USDC transfer succeeds. I’ll correct that and expose CTK as a supported direct-send asset; it already has configured metadata and the sender already supports it.

## Activity

    file changes: Completed · 3 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/send.tsx
    @@ -28,3 +28,3 @@
     export default function SendDrawer() {
    -  const params = useLocalSearchParams<{ recipient?: string; recipientName?: string; token?: string }>();
    +  const params = useLocalSearchParams<{ recipient?: string; recipientName?: string; token?: string; amount?: string }>();
       const colors = useColors();
    @@ -63,3 +63,7 @@
       useEffect(() => {
    -    if (params.token === 'AUSD' || params.token === 'USDC') setToken(params.token);
    +    if (params.amount && /^\d+(\.\d+)?$/.test(params.amount)) setAmount(params.amount);
    +  }, [params.amount]);
    +
    +  useEffect(() => {
    +    if (params.token === 'AUSD' || params.token === 'USDC' || params.token === 'CTK') setToken(params.token);
       }, [params.token]);
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/success.tsx
    @@ -36,2 +36,3 @@
       const amount = Number(params.amount ?? 0);
    +  const currency = typeof params.currency === 'string' ? params.currency : 'AUSD';
       const receiveAmount = Number(params.receiveAmount ?? amount);
    @@ -60,3 +61,3 @@
               ? 'The Agora AUSD-to-CTK swap was included in a confirmed sponsored transaction.'
    -          : 'Your AUSD transfer was included in a confirmed sponsored transaction.'}
    +          : `Your ${currency} transfer was included in a confirmed sponsored transaction.`}
           </Text>
    @@ -65,3 +66,3 @@
             <Text style={[styles.amount, { color: colors.foreground }]}>
    -          {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
    +          {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {currency}
             </Text>
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/services/tokens.ts
    @@ -32,3 +32,3 @@
     
    -export const TRANSFER_TOKENS: WalletToken[] = ['AUSD', 'USDC'];
    +export const TRANSFER_TOKENS: WalletToken[] = ['AUSD', 'USDC', 'CTK'];
     export const STABLECOIN_TOKENS: WalletToken[] = ['AUSD', 'USDC'];

## Activity

    $ sed -n '1,260p' artifacts/ausd-wallet/app/success.tsx && rg -n "pathname: '/success'|recipient:" artifacts/ausd-wallet/app/review.tsx
    import React from 'react';
    import { router, useLocalSearchParams } from 'expo-router';
    import { Linking, Pressable } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { StyleSheet, Text, View } from 'react-native';
    import { useColors } from '@/hooks/useColors';
    import {
      Card,
      Eyebrow,
      InlineNotice,
      Page,
      PrimaryButton,
      Title,
    } from '@/components/Primitives';
    
    export default function SimulationSuccessScreen() {
      const colors = useColors();
      const params = useLocalSearchParams<{
        recipient?: string;
        amount?: string;
        currency?: string;
        receiveAmount?: string;
        id?: string;
        transactionHash?: string;
        accountAddress?: string;
        blockNumber?: string;
        receiveCurrency?: string;
        settlement?: string;
        autoSave?: string;
        goalName?: string;
        paymentAmount?: string;
        autoSavedAmount?: string;
        totalDebit?: string;
        historyWarning?: string;
      }>();
      const amount = Number(params.amount ?? 0);
      const currency = typeof params.currency === 'string' ? params.currency : 'AUSD';
      const receiveAmount = Number(params.receiveAmount ?? amount);
      const receiveCurrency = typeof params.receiveCurrency === 'string' ? params.receiveCurrency : 'AUSD';
      const settledThroughAgora = params.settlement === 'agora';
      const autoSaveConfirmed = params.autoSave === 'true';
      const transactionHash = params.transactionHash;
      const explorerUrl = transactionHash
        ? `https://testnet.monadvision.com/tx/${transactionHash}`
        : '';
    
      return (
        <Page contentStyle={styles.page}>
          <View style={[styles.successIcon, { backgroundColor: colors.primary }]}>
            <Feather name="check" size={27} color={colors.primaryForeground} />
          </View>
          <View style={[styles.confirmedBadge, { backgroundColor: colors.secondary }]}>
            <View style={[styles.confirmedDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.confirmedText, { color: colors.foreground }]}>CONFIRMED ON MONAD TESTNET</Text>
          </View>
          <Title>{autoSaveConfirmed ? 'Payment + savings confirmed' : settledThroughAgora ? 'Settlement confirmed' : 'Transfer confirmed'}</Title>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {autoSaveConfirmed
              ? 'The recipient payment and savings allocation were included in one confirmed Monad testnet transaction.'
              : settledThroughAgora
              ? 'The Agora AUSD-to-CTK swap was included in a confirmed sponsored transaction.'
              : `Your ${currency} transfer was included in a confirmed sponsored transaction.`}
          </Text>
    
          <Card style={styles.receipt}>
            <Text style={[styles.amount, { color: colors.foreground }]}>
              {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {currency}
            </Text>
            <View style={[styles.receivePanel, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.receivesLabel, { color: colors.mutedForeground }]}>{settledThroughAgora ? 'TESTNET OUTPUT · AGORA QUOTE' : 'RECIPIENT RECEIVES'}</Text>
              <Text style={[styles.receivesValue, { color: colors.foreground }]}>
                {receiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {receiveCurrency}
              </Text>
            </View>
            {autoSaveConfirmed ? (
              <View style={[styles.receivePanel, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.receivesLabel, { color: colors.mutedForeground }]}>
                  AUTO-SAVED TO {params.goalName ?? 'SAVINGS POCKET'}
                </Text>
                <Text style={[styles.receivesValue, { color: colors.foreground }]}>
                  {Number(params.autoSavedAmount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                </Text>
                <Text style={[styles.reference, { color: colors.mutedForeground }]}>
                  Total wallet debit: {Number(params.totalDebit ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
                </Text>
              </View>
            ) : null}
            <View style={[styles.receiptDivider, { backgroundColor: colors.border }]} />
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>RECIPIENT</Text>
            <Text selectable style={[styles.to, { color: colors.foreground }]}>{params.recipient ?? 'Recipient unavailable'}</Text>
            {params.accountAddress ? <Text selectable style={[styles.reference, { color: colors.mutedForeground }]}>From smart account · {params.accountAddress}</Text> : null}
            {params.blockNumber ? <Text style={[styles.reference, { color: colors.mutedForeground }]}>Block {params.blockNumber} · Gas sponsored by Pimlico</Text> : null}
            {transactionHash ? (
              <View style={styles.transactionRef}>
                <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>TRANSACTION HASH</Text>
                <Text selectable style={[styles.hash, { color: colors.foreground }]}>{transactionHash}</Text>
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel="View confirmed transaction on MonadVision"
                  onPress={() => void Linking.openURL(explorerUrl)}
                  style={({ pressed }) => [styles.explorerLink, { opacity: pressed ? 0.65 : 1 }]}
                >
                  <Text style={[styles.explorerText, { color: colors.primary }]}>View on MonadVision</Text>
                  <Feather name="external-link" size={13} color={colors.primary} />
                </Pressable>
              </View>
            ) : null}
          </Card>
    
          <InlineNotice icon="shield">
            {params.historyWarning
              ? params.historyWarning
              : autoSaveConfirmed
              ? 'Both transfers were performed atomically by the SavingsPockets contract. Testnet AUSD moved; this has no real-world monetary value.'
              : settledThroughAgora
              ? 'CTK is a testnet mock payout token. This confirms the on-chain swap only; it is not a fiat payout. Receipt saved to Activity on this device.'
              : 'Testnet transaction only. Receipt saved to Activity on this device.'}
          </InlineNotice>
          <PrimaryButton
            label="Back to wallet"
            onPress={() => router.replace('/(tabs)')}
            testID="back-to-wallet"
          />
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { justifyContent: 'center', gap: 16, paddingTop: 12 },
      successIcon: {
        width: 56,
        height: 56,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
      },
      confirmedBadge: { flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', gap: 7, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
      confirmedDot: { width: 7, height: 7, borderRadius: 4 },
      confirmedText: { fontSize: 9, letterSpacing: 0.65, fontFamily: 'Inter_700Bold' },
      subtitle: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
      receipt: { gap: 9, padding: 16 },
      amount: { fontSize: 22, fontFamily: 'Inter_600SemiBold' },
      fieldLabel: { fontSize: 9, letterSpacing: 0.75, fontFamily: 'Inter_600SemiBold' },
      to: { fontSize: 11, lineHeight: 17, fontFamily: 'Inter_500Medium' },
      receiptDivider: { height: StyleSheet.hairlineWidth, marginVertical: 2 },
      receivePanel: { borderRadius: 12, padding: 12, marginTop: 2, gap: 5 },
      receivesLabel: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
      receivesValue: { fontSize: 17, fontFamily: 'Inter_600SemiBold' },
      reference: { fontSize: 9, lineHeight: 14, fontFamily: 'Inter_400Regular' },
      transactionRef: { gap: 5, marginTop: 2 },
      hash: { fontSize: 9, lineHeight: 14, fontFamily: 'Inter_500Medium' },
      explorerLink: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 3 },
      explorerText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
    });
    147:        pathname: '/success',
    149:          recipient: transfer.recipient,
    286:  recipient: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_500Medium' },
    ✓ • 174ms

## Activity

    file changes: Completed · 2 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/review.tsx
    @@ -149,2 +149,3 @@
               recipient: transfer.recipient,
    +          recipientName,
               amount: autoSaveResult?.paymentAmount ?? String(sentAmount),
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app/success.tsx
    @@ -12,3 +12,2 @@
       PrimaryButton,
    -  Title,
     } from '@/components/Primitives';
    @@ -19,2 +18,3 @@
         recipient?: string;
    +    recipientName?: string;
         amount?: string;
    @@ -55,9 +55,9 @@
           </View>
    -      <Title>{autoSaveConfirmed ? 'Payment + savings confirmed' : settledThroughAgora ? 'Settlement confirmed' : 'Transfer confirmed'}</Title>
    +      <Text style={[styles.title, { color: colors.foreground }]}>{autoSaveConfirmed ? 'Payment + savings confirmed' : settledThroughAgora ? 'Settlement confirmed' : 'Transfer sent'}</Text>
           <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
             {autoSaveConfirmed
    -          ? 'The recipient payment and savings allocation were included in one confirmed Monad testnet transaction.'
    +          ? 'Your payment and savings allocation are confirmed on Monad.'
               : settledThroughAgora
    -          ? 'The Agora AUSD-to-CTK swap was included in a confirmed sponsored transaction.'
    -          : `Your ${currency} transfer was included in a confirmed sponsored transaction.`}
    +          ? 'Your Agora testnet settlement is confirmed on Monad.'
    +          : `Sent to ${params.recipientName || params.recipient || 'recipient'}.`}
           </Text>
    @@ -65,2 +65,3 @@
           <Card style={styles.receipt}>
    +        <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>YOU SENT</Text>
             <Text style={[styles.amount, { color: colors.foreground }]}>
    @@ -90,4 +91,3 @@
             <Text selectable style={[styles.to, { color: colors.foreground }]}>{params.recipient ?? 'Recipient unavailable'}</Text>
    -        {params.accountAddress ? <Text selectable style={[styles.reference, { color: colors.mutedForeground }]}>From smart account · {params.accountAddress}</Text> : null}
    -        {params.blockNumber ? <Text style={[styles.reference, { color: colors.mutedForeground }]}>Block {params.blockNumber} · Gas sponsored by Pimlico</Text> : null}
    +        {params.blockNumber ? <Text style={[styles.reference, { color: colors.mutedForeground }]}>Block {params.blockNumber} · Sponsored gas</Text> : null}
             {transactionHash ? (
    @@ -116,3 +116,3 @@
               ? 'CTK is a testnet mock payout token. This confirms the on-chain swap only; it is not a fiat payout. Receipt saved to Activity on this device.'
    -          : 'Testnet transaction only. Receipt saved to Activity on this device.'}
    +          : 'Saved to Activity. This is a Monad testnet transaction.'}
           </InlineNotice>
    @@ -140,4 +140,6 @@
       confirmedText: { fontSize: 9, letterSpacing: 0.65, fontFamily: 'Inter_700Bold' },
    +  title: { fontSize: 25, lineHeight: 31, letterSpacing: -0.6, fontFamily: 'Inter_600SemiBold' },
       subtitle: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
       receipt: { gap: 9, padding: 16 },
    +  amountLabel: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
       amount: { fontSize: 22, fontFamily: 'Inter_600SemiBold' },

## Assistant

The send picker now includes CTK alongside AUSD and USDC, and the confirmation receipt uses the actual sent token rather than hard-coding AUSD. I’ve also tightened the success screen into a clearer, recipient-focused receipt.

## Activity

    $ pnpm --filter @workspace/ausd-wallet run typecheck && git diff --check && git diff --stat
    
    > @workspace/ausd-wallet@0.0.0 typecheck /home/runner/workspace/artifacts/ausd-wallet
    > tsc -p tsconfig.json --noEmit
    
     artifacts/ausd-wallet/app/(tabs)/index.tsx   |  10 +-
     artifacts/ausd-wallet/app/aurora-deposit.tsx | 198 +++++++++++++++------------
     artifacts/ausd-wallet/app/receive.tsx        |  84 +++++-------
     artifacts/ausd-wallet/app/review.tsx         |   1 +
     artifacts/ausd-wallet/app/send.tsx           |   8 +-
     artifacts/ausd-wallet/app/success.tsx        |  21 +--
     artifacts/ausd-wallet/services/tokens.ts     |   2 +-
     7 files changed, 170 insertions(+), 154 deletions(-)
    ✓ • 17.17s

## Assistant

Updated the transfer flow.

- Direct Send now supports **AUSD, USDC, and CTK**.
- Payment-request links now prefill the requested amount.
- Confirmation uses the actual sent token, so USDC and CTK receipts no longer display as AUSD.
- The success screen now has a cleaner confirmation title, recipient-focused message, sent-amount label, sponsored-gas reference, and transaction receipt.

The existing mechanics align with the track: Mera passkey authorizes the sponsored smart-account transaction, and the Agora settlement path validates a fresh quote before submitting the Monad testnet contract call. Agora’s testnet flow requires an approved swapper, which the current batched transaction handles. [Agora Instant Settlement overview](https://docs.agora.finance/instant-settlement), [testnet execution guide](https://docs.agora.finance/instant-settlement/guides/executing-swap)

Validation passed:

`pnpm --filter @workspace/ausd-wallet run typecheck`
