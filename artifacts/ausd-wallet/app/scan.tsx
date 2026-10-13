import React, { useRef, useState } from 'react';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { formatUnits, isAddress } from 'viem';
import { useColors } from '@/hooks/useColors';
import { WALLET_TOKENS, type WalletToken } from '@/services/tokens';
import {
  BackButton,
  Card,
  Eyebrow,
  InlineNotice,
  Page,
  PrimaryButton,
  Title,
} from '@/components/Primitives';

const TOKEN_BY_ADDRESS = new Map(
  (Object.keys(WALLET_TOKENS) as WalletToken[]).map((symbol) => [WALLET_TOKENS[symbol].address.toLowerCase(), symbol]),
);

function readInternalRequest(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'ausd-wallet:' || url.pathname.replace(/^\/+/, '') !== 'send') return null;
    const recipient = url.searchParams.get('recipient')?.trim() ?? '';
    const amount = url.searchParams.get('amount')?.trim() ?? '';
    const token = url.searchParams.get('token')?.trim().toUpperCase() ?? 'AUSD';
    if (!isAddress(recipient, { strict: false })) return null;
    if (amount && (!/^\d+(\.\d{1,18})?$/.test(amount) || Number(amount) <= 0)) return null;
    if (token !== 'AUSD' && token !== 'USDC' && token !== 'CTK') return null;
    return { recipient, amount, token };
  } catch {
    return null;
  }
}

function readEip681(value: string) {
  const trimmed = value.trim();
  if (!trimmed.toLowerCase().startsWith('ethereum:')) return null;
  try {
    const withoutScheme = trimmed.slice('ethereum:'.length);
    const [targetPart, queryPart] = withoutScheme.split('?');
    const tokenPart = targetPart.split('@')[0] ?? '';
    if (!isAddress(tokenPart, { strict: false })) return null;
    const symbol = TOKEN_BY_ADDRESS.get(tokenPart.toLowerCase());
    const params = new URLSearchParams(queryPart ?? '');
    const recipientRaw = params.get('address')?.trim() ?? '';
    // Bare token address QR (no transfer fn): treat as receive asset hint, no recipient.
    if (!recipientRaw) return null;
    if (!isAddress(recipientRaw, { strict: false })) return null;
    const rawAmount = params.get('uint256')?.trim() ?? '';
    if (!rawAmount) return { recipient: recipientRaw, amount: '', token: symbol ?? 'AUSD' };
    if (!/^\d+$/.test(rawAmount)) return null;
    if (!symbol) return { recipient: recipientRaw, amount: '', token: 'AUSD' };
    const decimals = WALLET_TOKENS[symbol].decimals;
    const amount = formatUnits(BigInt(rawAmount), decimals);
    if (Number(amount) <= 0) return null;
    return { recipient: recipientRaw, amount, token: symbol };
  } catch {
    return null;
  }
}

function readGiftRequest(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'ausd-wallet:') return null;
    if (url.pathname.replace(/^\/+/, '') !== 'gift/claim') return null;
    const recipient = url.searchParams.get('recipient')?.trim() ?? '';
    if (!isAddress(recipient, { strict: false })) return null;
    return {
      recipient,
      amount: url.searchParams.get('amount')?.trim() ?? '',
      tx: url.searchParams.get('tx')?.trim() ?? '',
      donor: url.searchParams.get('donor')?.trim() ?? '',
    };
  } catch {
    return null;
  }
}

function readPaymentRequest(value: string) {
  const gift = readGiftRequest(value);
  if (gift) return { ...gift, gift: '1' };
  const internal = readInternalRequest(value);
  if (internal) return internal;
  const eip = readEip681(value);
  if (eip) return eip;
  if (isAddress(value.trim(), { strict: false })) {
    return { recipient: value.trim(), amount: '', token: 'AUSD' };
  }
  return null;
}

export default function ScanScreen() {
  const colors = useColors();
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState('');
  const scanned = useRef(false);

  function handleScan(result: BarcodeScanningResult) {
    if (scanned.current) return;
    const request = readPaymentRequest(result.data);
    if (!request) {
      setError('This QR code is not a valid payment request. It should be an AUSD Wallet link, a gift link, an EIP-681 request, or a wallet address.');
      return;
    }
    scanned.current = true;
    if ('gift' in request) {
      const { gift: _gift, ...giftParams } = request as { gift: string; recipient: string; amount: string; tx: string; donor: string };
      void _gift;
      router.replace({ pathname: '/gift/claim', params: giftParams });
      return;
    }
    router.replace({ pathname: '/send', params: request });
  }

  return (
    <Page contentStyle={styles.page}>
      <BackButton onPress={() => router.back()} />
      <View style={styles.heading}>
        <Eyebrow>SEND TOKEN</Eyebrow>
        <Title>Scan a payment request.</Title>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>AUSD Wallet links, gift links, EIP-681 requests, and plain wallet addresses are accepted.</Text>
      </View>

      {!permission ? (
        <Card style={styles.messageCard}><Text style={[styles.message, { color: colors.mutedForeground }]}>Checking camera permission…</Text></Card>
      ) : !permission.granted ? (
        <Card style={styles.messageCard}>
          <Text style={[styles.message, { color: colors.foreground }]}>Camera access is needed to scan a request.</Text>
          <PrimaryButton label="Allow camera access" icon="camera" onPress={() => void requestPermission()} />
        </Card>
      ) : (
        <View style={styles.cameraFrame}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={handleScan}
          />
          <View pointerEvents="none" style={styles.scanGuide} />
        </View>
      )}

      {error ? (
        <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text>
      ) : null}
      <InlineNotice icon="shield">Check the recipient and amount on the review screen before approving with your passkey.</InlineNotice>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { gap: 17, paddingTop: 8 },
  heading: { gap: 7, marginTop: 2, marginBottom: 3 },
  subtitle: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
  cameraFrame: { aspectRatio: 1, overflow: 'hidden', borderRadius: 12, backgroundColor: '#15191e', alignItems: 'center', justifyContent: 'center' },
  scanGuide: { width: '66%', aspectRatio: 1, borderWidth: 2, borderColor: '#ff5900', borderRadius: 12 },
  messageCard: { gap: 12, padding: 17 },
  message: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_500Medium' },
  error: { fontSize: 12, lineHeight: 17, fontFamily: 'Inter_500Medium' },
});
