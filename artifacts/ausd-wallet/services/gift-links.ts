import * as ExpoLinking from 'expo-linking';

/**
 * Shareable gift claim link. Anyone opening it lands on the claim screen,
 * which verifies the gift on-chain before offering a withdraw.
 */
export function buildGiftLink(input: { recipient: string; amount?: string; txHash?: string; donor?: string }): string {
  return ExpoLinking.createURL('/gift/claim', {
    scheme: 'ausd-wallet',
    isTripleSlashed: true,
    queryParams: {
      recipient: input.recipient,
      ...(input.amount ? { amount: input.amount } : {}),
      ...(input.txHash ? { tx: input.txHash } : {}),
      ...(input.donor ? { donor: input.donor } : {}),
    },
  });
}
