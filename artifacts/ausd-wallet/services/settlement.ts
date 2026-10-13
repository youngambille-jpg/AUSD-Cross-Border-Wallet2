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
  /** Agora AUSD faucet on Monad testnet (from stable-swap-examples monad branch).
   * Verified on-chain: distributes AUSD, 10,000 per drip, 100,000 max held. */
  ausdFaucetAddress: '0xd236c18D274E54FAccC3dd9DDA4b27965a73ee6C' as Address,
};

export const faucetAbi = [
  { type: 'function', name: 'token', stateMutability: 'view', inputs: [], outputs: [{ type: 'address' }] },
  { type: 'function', name: 'faucetDripAmount', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'maxAmountToOwn', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  {
    type: 'function',
    name: 'requestFunds',
    stateMutability: 'nonpayable',
    inputs: [{ name: '_receiver', type: 'address' }],
    outputs: [],
  },
] as const;

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
  {
    type: 'function',
    name: 'getAllPairData',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'pairAddress', type: 'address' },
          {
            name: 'token0',
            type: 'tuple',
            components: [
              { name: 'tokenAddress', type: 'address' },
              { name: 'name', type: 'string' },
              { name: 'symbol', type: 'string' },
              { name: 'decimals', type: 'uint256' },
            ],
          },
          {
            name: 'token1',
            type: 'tuple',
            components: [
              { name: 'tokenAddress', type: 'address' },
              { name: 'name', type: 'string' },
              { name: 'symbol', type: 'string' },
              { name: 'decimals', type: 'uint256' },
            ],
          },
        ],
      },
    ],
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
    name: 'reserve0',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'reserve1',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'getPrice',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'getPrice',
    stateMutability: 'view',
    inputs: [{ name: 'timestamp', type: 'uint256' }],
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
  /** Raw fixed price (token1/token0, 18-decimal scale) from the pair's getPrice. */
  fixedPriceRaw: string;
  /** Human-readable "1 input ≈ X output" rate derived from the fixed price. */
  fixedPriceHuman: string;
  /** Human-readable output-token reserve (pool liquidity). */
  outputReserve: string;
  outputReserveRaw: string;
}

/**
 * Reads the pair's fixed price (see Agora "Fetching Pair Price") and converts
 * it to a human "1 input ≈ X output" rate using each side's decimals.
 * Per the docs, the raw price embeds the decimals ratio, so the human rate is
 * the 1e18-scaled value re-based by 10^decOut / 10^decIn.
 */
export function formatFixedPrice(
  priceRaw: bigint,
  inputDecimals: number,
  outputDecimals: number,
  inputIsToken0: boolean,
): string {
  const scaled = Number(priceRaw) / 1e18;
  if (!Number.isFinite(scaled) || scaled <= 0) return '—';
  const base = inputIsToken0 ? scaled : 1 / scaled;
  const perInput = base * 10 ** outputDecimals / 10 ** inputDecimals;
  if (!Number.isFinite(perInput) || perInput <= 0) return '—';
  return perInput.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

export interface FactoryPairToken {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
}

export interface FactoryPair {
  pairAddress: Address;
  token0: FactoryPairToken;
  token1: FactoryPairToken;
}

/**
 * Lists every Instant Settlement pool (see Agora "Fetching All Pairs").
 * Used to offer only routes the factory actually has liquidity for.
 */
export async function listFactoryPairs(): Promise<FactoryPair[]> {
  const raw = await client.readContract({
    address: MONAD_TESTNET.factoryAddress,
    abi: factoryAbi,
    functionName: 'getAllPairData',
  });
  return raw.map((entry) => ({
    pairAddress: entry.pairAddress,
    token0: {
      address: entry.token0.tokenAddress,
      name: entry.token0.name,
      symbol: entry.token0.symbol,
      decimals: Number(entry.token0.decimals),
    },
    token1: {
      address: entry.token1.tokenAddress,
      name: entry.token1.name,
      symbol: entry.token1.symbol,
      decimals: Number(entry.token1.decimals),
    },
  }));
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
    const [token0, token1, decimals0, decimals1, paused, token0PurchaseFee, token1PurchaseFee, reserve0, reserve1, fixedPriceRaw] = await Promise.all([
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token1' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0Decimals' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token1Decimals' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'isPaused' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0PurchaseFee' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token1PurchaseFee' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'reserve0' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'reserve1' }),
      client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'getPrice', args: [] }),
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
    // Liquidity guard (see Agora "Fetching Pair Reserves"): fail early with a
    // clear message instead of an opaque execution revert.
    const outputReserveRaw = inputIsToken0 ? reserve1 : reserve0;
    if (amountOutRaw > outputReserveRaw) {
      throw new Error(`The ${inputSymbol}/${outputSymbol} pool holds only ${formatUnits(outputReserveRaw, outputDecimals)} ${outputSymbol}. Enter a smaller amount.`);
    }
    return {
      checkedAt: new Date().toISOString(), factoryAddress: MONAD_TESTNET.factoryAddress, pairAddress,
      amountIn: formatUnits(amountInRaw, inputDecimals), amountInRaw: amountInRaw.toString(),
      amountOut: formatUnits(amountOutRaw, outputDecimals), amountOutRaw: amountOutRaw.toString(), quoteMode,
      purchaseFeeRate: formatUnits(inputIsToken0 ? token0PurchaseFee : token1PurchaseFee, 18),
      inputSymbol, outputSymbol, outputDecimals,
      fixedPriceRaw: fixedPriceRaw.toString(),
      fixedPriceHuman: formatFixedPrice(fixedPriceRaw, input.decimals, output.decimals, inputIsToken0),
      outputReserve: formatUnits(outputReserveRaw, outputDecimals),
      outputReserveRaw: outputReserveRaw.toString(),
    };
  } catch (error) {
    if (error instanceof Error && /factory|pair|quote|selected|Monad testnet|decimals|pool|liquidity/.test(error.message)) throw error;
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
