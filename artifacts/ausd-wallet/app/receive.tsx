import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { Feather } from '@expo/vector-icons';
import { parseUnits } from 'viem';
import { useColors } from '@/hooks/useColors';
import { useWallet } from '@/state/wallet-context';
import { TRANSFER_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
import type { Erc20TokenInfo } from '@/services/passkey';
import {
  BackButton,
  Card,
  Field,
  Page,
  PrimaryButton,
} from '@/components/Primitives';

const TRACKED_ASSETS_STORAGE_KEY = 'ausd-wallet-tracked-assets-v1';
const MONAD_CHAIN_ID = 10143;

interface ReceiveToken extends Erc20TokenInfo {
  known?: boolean;
}

const defaultTokens: ReceiveToken[] = TRANSFER_TOKENS.map((symbol) => ({ ...WALLET_TOKENS[symbol], known: true }));

export default function ReceiveScreen() {
  const colors = useColors();
  const { profile } = useWallet();
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState<string>(WALLET_TOKENS.AUSD.address);
  const [customs, setCustoms] = useState<Erc20TokenInfo[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [copied, setCopied] = useState<'address' | 'eip' | null>(null);
  const hasAddress = profile?.mode === 'mera' && Boolean(profile.address);

  useEffect(() => {
    AsyncStorage.getItem(TRACKED_ASSETS_STORAGE_KEY)
      .then((value) => {
        if (!value) return;
        const stored = JSON.parse(value) as Erc20TokenInfo[];
        if (Array.isArray(stored)) setCustoms(stored);
      })
      .catch(() => undefined);
  }, []);

  const tokens: ReceiveToken[] = useMemo(() => {
    const known = new Set(defaultTokens.map((t) => t.address.toLowerCase()));
    return [...defaultTokens, ...customs.filter((c) => !known.has(c.address.toLowerCase())).map((c) => ({ ...c, known: false }))];
  }, [customs]);

  const token = tokens.find((t) => t.address.toLowerCase() === tokenAddress.toLowerCase()) ?? defaultTokens[0];
  const amountIsValid = !amount || (/^\d+(\.\d+)?$/.test(amount) && Number(amount) > 0 && (amount.split('.')[1]?.length ?? 0) <= token.decimals);

  const amountRaw = useMemo(() => {
    if (!amount || !amountIsValid) return '';
    try {
      return parseUnits(amount, token.decimals).toString();
    } catch {
      return '';
    }
  }, [amount, amountIsValid, token.decimals]);

  // Internal app link (in-app Scan understands ausd-wallet:).
  const requestUrl = useMemo(() => {
    if (!profile?.address || !amountIsValid) return '';
    const knownSymbol = (Object.keys(WALLET_TOKENS) as WalletToken[]).find(
      (symbol) => WALLET_TOKENS[symbol].address.toLowerCase() === token.address.toLowerCase(),
    );
    return Linking.createURL('/send', {
      scheme: 'ausd-wallet',
      isTripleSlashed: true,
      queryParams: {
        recipient: profile.address,
        ...(knownSymbol ? { token: knownSymbol } : {}),
        ...(amount ? { amount } : {}),
      },
    });
  }, [amount, amountIsValid, profile?.address, token.address]);

  // EIP-681: scannable by any external wallet.
  const eip681 = useMemo(() => {
    if (!profile?.address) return '';
    if (!amount) return `ethereum:${token.address}@${MONAD_CHAIN_ID}`;
    if (!amountRaw) return '';
    return `ethereum:${token.address}@${MONAD_CHAIN_ID}/transfer?address=${profile.address}&uint256=${amountRaw}`;
  }, [amount, amountRaw, profile?.address, token.address]);

  async function copyText(text: string, which: 'address' | 'eip') {
    if (!text) return;
    await Clipboard.setStringAsync(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 1600);
  }

  async function shareRequest() {
    if (!requestUrl && !eip681) return;
    const paymentDescription = amount ? `Request ${amount} ${token.symbol} on Monad testnet` : `Request ${token.symbol} on Monad testnet`;
    await Share.share({
      message: `${paymentDescription}\nApp: ${requestUrl}\nAny wallet: ${eip681}`,
      url: eip681,
    });
  }

  return (
    <Page contentStyle={styles.page}>
      <BackButton onPress={() => router.back()} />
      <View style={styles.heading}>
        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>MONAD TESTNET · CHAIN {MONAD_CHAIN_ID}</Text>
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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Choose asset to receive"
            onPress={() => setPickerOpen(true)}
            style={[styles.tokenPicker, { backgroundColor: colors.secondary }]}
          >
            <View style={[styles.tokenBadge, { backgroundColor: colors.background }]}>
              <Text style={[styles.tokenBadgeText, { color: colors.foreground }]}>{token.symbol.slice(0, 1)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.tokenTitle, { color: colors.foreground }]}>{token.symbol} · {token.name}</Text>
              <Text numberOfLines={1} style={[styles.tokenSub, { color: colors.mutedForeground }]}>{token.address}</Text>
            </View>
            <Feather name="chevron-down" size={18} color={colors.mutedForeground} />
          </Pressable>

          <Card style={styles.requestCard}>
            <View style={styles.qrFrame}>
              {eip681 ? (
                <QRCode
                  value={eip681}
                  size={180}
                  color={colors.foreground}
                  backgroundColor={colors.background}
                  quietZone={12}
                  ecl="M"
                />
              ) : null}
            </View>
            <Text style={[styles.qrCaption, { color: colors.mutedForeground }]}>Scannable by any EIP-681 wallet · switch token or amount to update</Text>
            <Text selectable style={[styles.address, { color: colors.mutedForeground }]}>{profile?.address}</Text>
          </Card>

          <View style={styles.actions}>
            <PrimaryButton label="Share request" icon="share-2" onPress={() => void shareRequest()} disabled={!requestUrl && !eip681} />
            <PrimaryButton label={copied === 'address' ? 'Address copied' : 'Copy wallet address'} icon={copied === 'address' ? 'check' : 'copy'} onPress={() => void copyText(profile?.address ?? '', 'address')} secondary />
            <PrimaryButton label={copied === 'eip' ? 'EIP-681 link copied' : 'Copy EIP-681 link'} icon={copied === 'eip' ? 'check' : 'link'} onPress={() => void copyText(eip681, 'eip')} secondary />
          </View>

          <View style={styles.requestDetails}>
            <Field
              label={`Amount · optional · up to ${token.decimals} decimals`}
              value={amount}
              onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
              placeholder="Any amount"
              keyboardType="decimal-pad"
              error={amountIsValid ? undefined : `Enter an amount greater than zero, with up to ${token.decimals} decimals.`}
            />
            {eip681 ? <Text selectable style={[styles.tokenSub, { color: colors.mutedForeground }]}>{eip681}</Text> : null}
          </View>
        </>
      )}

      <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPickerOpen(false)} accessibilityLabel="Close asset picker" />
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Receive asset</Text>
            {tokens.map((option) => (
              <Pressable key={option.address} onPress={() => { setTokenAddress(option.address); setAmount(''); setPickerOpen(false); }} style={styles.modalRow}>
                <View style={[styles.tokenBadge, { backgroundColor: colors.secondary }]}>
                  <Text style={[styles.tokenBadgeText, { color: colors.foreground }]}>{option.symbol.slice(0, 1)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tokenTitle, { color: colors.foreground }]}>{option.symbol}</Text>
                  <Text numberOfLines={1} style={[styles.tokenSub, { color: colors.mutedForeground }]}>{option.name}{option.known === false ? ' · custom' : ''}</Text>
                </View>
                {option.address.toLowerCase() === token.address.toLowerCase() ? <Feather name="check" size={17} color={colors.primary} /> : null}
              </Pressable>
            ))}
            <Text style={[styles.tokenSub, { color: colors.mutedForeground }]}>Custom assets come from your Home-tracked list.</Text>
          </View>
        </View>
      </Modal>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { gap: 14, paddingTop: 8, paddingBottom: 24 },
  heading: { gap: 3, marginTop: 2 },
  eyebrow: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_600SemiBold' },
  title: { fontSize: 23, lineHeight: 29, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold' },
  tokenPicker: { borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  tokenBadge: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  tokenBadgeText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  tokenTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  tokenSub: { fontSize: 10, lineHeight: 15, marginTop: 2, fontFamily: 'Inter_400Regular' },
  requestCard: { alignItems: 'center', gap: 10, paddingVertical: 16, paddingHorizontal: 16 },
  qrFrame: { minHeight: 204, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderRadius: 12 },
  qrCaption: { fontSize: 10, textAlign: 'center', fontFamily: 'Inter_400Regular' },
  actions: { gap: 9 },
  requestDetails: { gap: 8, marginTop: 2 },
  address: { fontSize: 9, lineHeight: 14, textAlign: 'center', fontFamily: 'Inter_500Medium' },
  emptyCard: { gap: 11, padding: 18 },
  emptyTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  copy: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
  modalOverlay: { flex: 1, justifyContent: 'center', padding: 22, backgroundColor: 'rgba(16, 18, 24, 0.48)' },
  modalCard: { borderRadius: 20, padding: 18, gap: 10, maxHeight: '70%' },
  modalTitle: { fontSize: 17, fontFamily: 'Inter_600SemiBold' },
  modalRow: { borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
});
