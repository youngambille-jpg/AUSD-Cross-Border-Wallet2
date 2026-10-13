import React, { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { getUnallocatedGiftBalance, withdrawGiftSponsored } from '@/services/savings-pockets';
import { BackButton, Card, Eyebrow, InlineNotice, Page, PrimaryButton, Title } from '@/components/Primitives';

const EXPLORER_TX = (hash: string) => `https://testnet.monadvision.com/tx/${hash}`;

export default function GiftClaimScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ recipient?: string; amount?: string; tx?: string; donor?: string }>();
  const { profile } = useWallet();
  const [giftBalance, setGiftBalance] = useState<string | null>(null);
  const [balanceError, setBalanceError] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState('');

  const recipient = typeof params.recipient === 'string' ? params.recipient.trim() : '';
  const amount = typeof params.amount === 'string' ? params.amount : '';
  const txHash = typeof params.tx === 'string' ? params.tx : '';
  const donor = typeof params.donor === 'string' ? params.donor : '';
  const account = profile?.mode === 'mera' && profile.address && profile.signerAddress && profile.passkey
    ? { address: profile.address, signerAddress: profile.signerAddress, credential: profile.passkey.credential, rpId: profile.passkey.rpId }
    : null;
  const isOwn = Boolean(account && recipient && account.address.toLowerCase() === recipient.toLowerCase());

  useEffect(() => {
    if (!recipient) return;
    let active = true;
    setBalanceError('');
    getUnallocatedGiftBalance(recipient)
      .then((value) => { if (active) setGiftBalance(value); })
      .catch((caught: unknown) => {
        if (active) setBalanceError(caught instanceof Error ? caught.message : 'Could not read this gift.');
      });
    return () => { active = false; };
  }, [recipient]);

  async function withdraw() {
    setError('');
    if (!account || !giftBalance || Number(giftBalance) <= 0) return;
    setWithdrawing(true);
    try {
      await withdrawGiftSponsored(account, giftBalance);
      setClaimed(true);
      setGiftBalance('0');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The claim did not complete.');
    } finally {
      setWithdrawing(false);
    }
  }

  if (!recipient) {
    return (
      <Page contentStyle={styles.page}>
        <BackButton onPress={() => router.back()} />
        <Eyebrow>GIFT</Eyebrow>
        <Title size={24}>Invalid gift link</Title>
        <InlineNotice icon="alert-circle">This link is missing the recipient address. Ask the sender for a fresh one.</InlineNotice>
      </Page>
    );
  }

  return (
    <Page contentStyle={styles.page}>
      <BackButton onPress={() => router.back()} />
      <Eyebrow>AUSD GIFT</Eyebrow>
      <Title size={24}>{claimed ? 'Gift claimed' : 'You received AUSD'}</Title>

      <Card style={[styles.giftCard, { backgroundColor: colors.primarySoft, borderWidth: 0 }]}>
        <View style={[styles.giftIcon, { backgroundColor: colors.background }]}>
          <Feather name="gift" size={24} color={colors.primary} />
        </View>
        <Text style={[styles.giftAmount, { color: colors.foreground }]}>
          {amount ? `${Number(amount).toLocaleString('en-US', { maximumFractionDigits: 6 })} AUSD` : 'AUSD gift'}
        </Text>
        {donor ? <Text style={[styles.giftMeta, { color: colors.mutedForeground }]}>from {donor}</Text> : null}
        {txHash ? (
          <Pressable onPress={() => void Linking.openURL(EXPLORER_TX(txHash))} style={styles.txLink}>
            <Text style={[styles.txText, { color: colors.primary }]}>View gift transaction</Text>
            <Feather name="external-link" size={12} color={colors.primary} />
          </Pressable>
        ) : null}
      </Card>

      {!account ? (
        <Card style={styles.actionCard}>
          <Text style={[styles.actionTitle, { color: colors.foreground }]}>Create a wallet to claim it</Text>
          <Text style={[styles.actionCopy, { color: colors.mutedForeground }]}>
            Gifts live on Monad testnet. Set up a Mera passkey wallet on the device that owns {recipient.slice(0, 6)}…{recipient.slice(-4)}, then open this link again.
          </Text>
          <PrimaryButton label="Set up wallet" icon="arrow-right" onPress={() => router.replace('/')} />
        </Card>
      ) : !isOwn ? (
        <InlineNotice icon="info">
          This gift was sent to {recipient.slice(0, 6)}…{recipient.slice(-4)}, but this device holds a different wallet. Open the link where your receiving wallet lives.
        </InlineNotice>
      ) : claimed ? (
        <InlineNotice icon="check">Claimed — the AUSD is in your wallet balance.</InlineNotice>
      ) : giftBalance === null ? (
        <Text style={[styles.statusText, { color: colors.mutedForeground }]}>{balanceError || 'Reading the gift…'}</Text>
      ) : Number(giftBalance) > 0 ? (
        <Card style={styles.actionCard}>
          <Text style={[styles.actionTitle, { color: colors.foreground }]}>{Number(giftBalance).toLocaleString('en-US', { maximumFractionDigits: 6 })} AUSD waiting</Text>
          <Text style={[styles.actionCopy, { color: colors.mutedForeground }]}>Withdraw it straight into your wallet. One passkey approval, gas sponsored.</Text>
          {error ? <Text style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
          <PrimaryButton label="Claim to my wallet" icon="download" loading={withdrawing} onPress={() => void withdraw()} />
        </Card>
      ) : (
        <InlineNotice icon="info">Nothing left to claim here — it may already have been withdrawn or allocated to a goal.</InlineNotice>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14, paddingTop: 8, paddingBottom: 24 },
  giftCard: { alignItems: 'center', gap: 8, paddingVertical: 24, paddingHorizontal: 18, borderRadius: 20 },
  giftIcon: { width: 60, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  giftAmount: { fontSize: 24, fontFamily: 'Inter_700Bold' },
  giftMeta: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  txLink: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 4 },
  txText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  actionCard: { gap: 10, padding: 16 },
  actionTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  actionCopy: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
  statusText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  error: { fontSize: 12, lineHeight: 17, fontFamily: 'Inter_500Medium' },
});
