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
  Card,
  Field,
  Page,
  PrimaryButton,
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
        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>MONAD TESTNET</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Receive</Text>
      </View>

      {!hasAddress ? (
        <Card style={styles.emptyCard}>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Create a passkey wallet first</Text>
          <Text style={[styles.copy, { color: colors.mutedForeground }]}>A receiving address is created with your Mera account.</Text>
          <PrimaryButton label="Set up wallet" onPress={() => router.replace('/')} icon="arrow-right" />
        </Card>
      ) : (
        <>
          <Card style={styles.requestCard}>
            <View style={styles.qrFrame}>
              {requestUrl ? (
                <QRCode
                  value={requestUrl}
                  size={180}
                  color={colors.foreground}
                  backgroundColor={colors.background}
                  quietZone={12}
                  ecl="M"
                />
              ) : null}
            </View>
            <Text selectable style={[styles.address, { color: colors.mutedForeground }]}>{profile?.address}</Text>
          </Card>

          <View style={styles.actions}>
            <PrimaryButton label="Share request" icon="share-2" onPress={() => void shareRequest()} disabled={!requestUrl} />
            <PrimaryButton label={copied ? 'Address copied' : 'Copy wallet address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyAddress()} secondary />
          </View>

          <View style={styles.requestDetails}>
            <Field
              label="Amount · optional"
              value={amount}
              onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
              placeholder="Any amount"
              keyboardType="decimal-pad"
              error={amountIsValid ? undefined : 'Enter an amount greater than zero, with up to six decimals.'}
            />
            <View style={styles.tokenRow}>
              <Text style={[styles.tokenLabel, { color: colors.mutedForeground }]}>ASSET</Text>
              <View style={styles.tokenOptions}>
                {TRANSFER_TOKENS.map((option) => (
                  <Pressable key={option} onPress={() => { setToken(option); setAmount(''); }} style={[styles.tokenOption, { backgroundColor: token === option ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.tokenText, { color: token === option ? colors.primaryForeground : colors.foreground }]}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14, paddingTop: 8, paddingBottom: 24 },
  heading: { gap: 3, marginTop: 2 },
  eyebrow: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
  title: { fontSize: 23, lineHeight: 29, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
  requestCard: { alignItems: 'center', gap: 10, paddingVertical: 16, paddingHorizontal: 16 },
  qrFrame: { minHeight: 204, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderRadius: 12 },
  actions: { gap: 9 },
  requestDetails: { gap: 12, marginTop: 2 },
  tokenRow: { gap: 8 },
  tokenLabel: { fontSize: 9, letterSpacing: 0.7, fontFamily: 'Inter_600SemiBold' },
  tokenOptions: { flexDirection: 'row', gap: 8 },
  tokenOption: { minHeight: 38, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tokenText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  address: { fontSize: 9, lineHeight: 14, textAlign: 'center', fontFamily: 'Inter_500Medium' },
  emptyCard: { gap: 11, padding: 18 },
  emptyTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  copy: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
});
