import React, { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { formatSupply, getAgoraMetrics } from '@/services/agora';
import { MONAD_TESTNET } from '@/services/settlement';
import {
  Card,
  Eyebrow,
  InlineNotice,
  Page,
  PrimaryButton,
  Title,
} from '@/components/Primitives';

export default function ProfileScreen() {
  const colors = useColors();
  const { profile, lockWallet, resetWallet } = useWallet();
  const [supply, setSupply] = useState<string | null>(null);
  const [metricsStatus, setMetricsStatus] = useState('Loading Agora public metrics…');
  const [loggingOut, setLoggingOut] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getAgoraMetrics()
      .then((metrics) => {
        if (!mounted) return;
        const value = formatSupply(metrics.circulatingSupply);
        if (metrics.partial || !value) {
          setMetricsStatus('Agora reports a partial network snapshot.');
        } else {
          setSupply(value);
          setMetricsStatus('Live public metric · all supported Agora networks');
        }
      })
      .catch((error: unknown) => {
        if (mounted) {
          setMetricsStatus(
            error instanceof Error ? error.message : 'Agora metrics could not be loaded.',
          );
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function copyText(text: string, key: string) {
    if (!text) return;
    await Clipboard.setStringAsync(text);
    setCopied(key);
    setTimeout(() => setCopied((current) => (current === key ? null : current)), 1600);
  }

  async function disconnect() {
    setLoggingOut(true);
    try {
      if (profile?.mode === 'demo') await resetWallet();
      else lockWallet();
      router.replace('/');
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <Page contentStyle={styles.page}>
      <Eyebrow>ACCOUNT</Eyebrow>
      <Title size={24}>Profile</Title>

      <Card style={[styles.hero, { backgroundColor: colors.foreground, borderWidth: 0 }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {(profile?.displayName?.[0] ?? 'A').toUpperCase()}
          </Text>
        </View>
        <View style={styles.heroCopy}>
          <Text numberOfLines={1} style={[styles.heroName, { color: '#ffffff' }]}>
            {profile?.displayName ?? 'Wallet user'}
          </Text>
          {!!profile?.email && (
            <Text numberOfLines={1} style={[styles.heroEmail, { color: 'rgba(255,255,255,0.65)' }]}>
              {profile.email}
            </Text>
          )}
          <View style={styles.chipRow}>
            <View style={[styles.heroChip, { backgroundColor: 'rgba(255,255,255,0.14)' }]}>
              <Text style={[styles.chipText, { color: '#ffffff' }]}>
                {profile?.mode === 'mera' ? 'PASSKEY' : 'DEMO'}
              </Text>
            </View>
            <View style={[styles.heroChip, { backgroundColor: 'rgba(255,255,255,0.14)' }]}>
              <Text style={[styles.chipText, { color: '#ffffff' }]}>MONAD TESTNET</Text>
            </View>
          </View>
        </View>
      </Card>

      {profile?.address ? (
        <>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>WALLET</Text>
          <Card style={[styles.group, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
            <View style={styles.rowTop}>
              <Text style={[styles.groupTitle, { color: colors.foreground }]}>Smart account</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Copy wallet address"
                onPress={() => void copyText(profile.address ?? '', 'wallet')}
                style={styles.inlineAction}
              >
                <Feather name={copied === 'wallet' ? 'check' : 'copy'} size={14} color={colors.primary} />
                <Text style={[styles.inlineActionText, { color: colors.primary }]}>
                  {copied === 'wallet' ? 'Copied' : 'Copy'}
                </Text>
              </Pressable>
            </View>
            <Text selectable style={[styles.address, { color: colors.foreground }]}>
              {profile.address}
            </Text>
            <Text style={[styles.caption, { color: colors.mutedForeground }]}>
              Send AUSD here. Mera signer: {profile.signerAddress ?? 'legacy account'}.
            </Text>
          </Card>
        </>
      ) : null}

      <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>NETWORK</Text>
      <Card style={[styles.group, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
        <View style={styles.rowTop}>
          <View>
            <Text style={[styles.groupTitle, { color: colors.foreground }]}>Monad Testnet</Text>
            <Text style={[styles.caption, { color: colors.mutedForeground }]}>
              Chain ID {MONAD_TESTNET.chainId} · {MONAD_TESTNET.rpcUrl.includes('alchemy') ? 'Alchemy RPC' : 'Public RPC'}
            </Text>
          </View>
          <Pressable
            onPress={() => void Linking.openURL(MONAD_TESTNET.explorerUrl)}
            style={({ pressed }) => [styles.inlineAction, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Text style={[styles.inlineActionText, { color: colors.primary }]}>Explorer</Text>
            <Feather name="external-link" size={13} color={colors.primary} />
          </Pressable>
        </View>
        <Text style={[styles.caption, { color: colors.mutedForeground }]}>
          Agora Instant Settlement factory
        </Text>
        <View style={styles.addressRow}>
          <Text selectable numberOfLines={1} style={[styles.address, { color: colors.foreground, flex: 1 }]}>
            {MONAD_TESTNET.factoryAddress}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Copy factory address"
            onPress={() => void copyText(MONAD_TESTNET.factoryAddress, 'factory')}
          >
            <Feather name={copied === 'factory' ? 'check' : 'copy'} size={14} color={colors.primary} />
          </Pressable>
        </View>
      </Card>

      <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>AUSD</Text>
      <Card style={[styles.group, { backgroundColor: colors.secondary, borderWidth: 0 }]}>
        <View style={styles.rowTop}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>In circulation</Text>
          <Feather name="activity" size={15} color={colors.primary} />
        </View>
        <Text style={[styles.supply, { color: colors.foreground }]}>
          {supply ? `${supply}` : '—'}
        </Text>
        <Text style={[styles.caption, { color: colors.mutedForeground }]}>
          {metricsStatus} This is Agora's public supply, not your balance.
        </Text>
      </Card>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Manage private contacts"
        onPress={() => router.push('/contacts')}
        style={({ pressed }) => [styles.contactsRow, { backgroundColor: colors.secondary, opacity: pressed ? 0.75 : 1 }]}
      >
        <View style={[styles.contactsIcon, { backgroundColor: colors.background }]}>
          <Feather name="users" size={16} color={colors.primary} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>Private contacts</Text>
          <Text style={[styles.caption, { color: colors.mutedForeground }]}>Names for addresses, encrypted with Mera</Text>
        </View>
        <Feather name="chevron-right" size={17} color={colors.mutedForeground} />
      </Pressable>

      <InlineNotice icon="info" tone="warning">
        Direct AUSD transfers and Agora swaps move test tokens on Monad testnet. Fiat onramp and offramp, card issuing, and cross-chain transfers are not connected yet.
      </InlineNotice>

      <PrimaryButton
        label={profile?.mode === 'demo' ? 'Exit demo wallet' : 'Lock this wallet'}
        icon="log-out"
        secondary
        loading={loggingOut}
        onPress={disconnect}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { gap: 12, paddingTop: 10, paddingBottom: 32 },
  hero: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 16, borderRadius: 20 },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  heroCopy: { flex: 1, gap: 3 },
  heroName: { fontSize: 19, fontFamily: 'Inter_600SemiBold' },
  heroEmail: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  chipRow: { flexDirection: 'row', gap: 6, marginTop: 5 },
  heroChip: { borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5 },
  chipText: { fontSize: 9, letterSpacing: 0.6, fontFamily: 'Inter_600SemiBold' },
  sectionLabel: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_600SemiBold', marginTop: 4 },
  group: { gap: 8, padding: 15, borderRadius: 16 },
  rowTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  groupTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  inlineAction: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 4 },
  inlineActionText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  address: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_500Medium' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  caption: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
  supply: { fontSize: 22, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
  contactsRow: { borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11 },
  contactsIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});
