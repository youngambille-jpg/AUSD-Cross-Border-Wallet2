import { getRandomValues } from 'expo-crypto';
import { hkdf } from '@noble/hashes/hkdf.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { gcm } from '@noble/ciphers/aes.js';

if (typeof globalThis.crypto?.getRandomValues !== 'function') {
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: { ...globalThis.crypto, getRandomValues },
  });
}

// Hermes (React Native) and non-secure web contexts have no
// `crypto.subtle`, but Mera's encrypted vaults need exactly HKDF-SHA256 key
// derivation plus AES-GCM-256 encrypt/decrypt. This minimal shim implements
// only those code paths (via audited @noble primitives) so vault operations
// behave identically to WebCrypto. Anything else throws instead of silently
// misbehaving. Never installed when a real `crypto.subtle` exists.
if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.subtle === 'undefined') {
  interface ShimHkdfKey {
    __shim: 'hkdf';
    raw: Uint8Array;
  }

  interface ShimAesKey {
    __shim: 'aes-gmc';
    raw: Uint8Array;
  }

  function toBytes(data: BufferSource): Uint8Array {
    if (data instanceof Uint8Array) return data;
    if (ArrayBuffer.isView(data)) {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
    return new Uint8Array(data);
  }

  function algorithmName(algorithm: string | { name?: string }): string {
    return typeof algorithm === 'string' ? algorithm : (algorithm?.name ?? '');
  }

  function notSupported(what: string): Error {
    const error = new Error(`crypto.subtle shim does not support ${what}`);
    error.name = 'NotSupportedError';
    return error;
  }

  function exactBuffer(data: Uint8Array): ArrayBuffer {
    return Uint8Array.from(data).buffer as ArrayBuffer;
  }

  const subtleShim = {
    async importKey(
      format: string,
      keyData: BufferSource,
      algorithm: string | { name?: string },
    ): Promise<CryptoKey> {
      if (format !== 'raw') throw notSupported(`importKey format "${format}"`);
      if (algorithmName(algorithm) !== 'HKDF') {
        throw notSupported(`importKey algorithm "${algorithmName(algorithm)}"`);
      }
      const key: ShimHkdfKey = { __shim: 'hkdf', raw: toBytes(keyData) };
      return key as unknown as CryptoKey;
    },

    async deriveKey(
      algorithm: { name?: string; hash?: unknown; salt?: BufferSource; info?: BufferSource },
      baseKey: CryptoKey,
      derivedKeyType: { name?: string; length?: number },
    ): Promise<CryptoKey> {
      const input = baseKey as unknown as ShimHkdfKey;
      if (!input || input.__shim !== 'hkdf') throw notSupported('deriveKey base key type');
      if (algorithmName(algorithm) !== 'HKDF') {
        throw notSupported(`deriveKey algorithm "${algorithmName(algorithm)}"`);
      }
      const hashName = typeof algorithm.hash === 'string' ? algorithm.hash : algorithm.hash != null
        ? (algorithm.hash as { name?: string }).name
        : undefined;
      if (hashName !== 'SHA-256') throw notSupported(`deriveKey hash "${hashName}"`);
      if (algorithmName(derivedKeyType) !== 'AES-GCM' || derivedKeyType.length !== 256) {
        throw notSupported('deriveKey target other than AES-GCM-256');
      }
      const raw = hkdf(
        sha256,
        input.raw,
        algorithm.salt ? toBytes(algorithm.salt) : new Uint8Array(0),
        algorithm.info ? toBytes(algorithm.info) : new Uint8Array(0),
        32,
      );
      const key: ShimAesKey = { __shim: 'aes-gmc', raw };
      return key as unknown as CryptoKey;
    },

    async encrypt(
      algorithm: { name?: string; iv?: BufferSource; tagLength?: number },
      key: CryptoKey,
      data: BufferSource,
    ): Promise<ArrayBuffer> {
      const aesKey = key as unknown as ShimAesKey;
      if (!aesKey || aesKey.__shim !== 'aes-gmc') throw notSupported('encrypt key type');
      if (algorithmName(algorithm) !== 'AES-GCM') {
        throw notSupported(`encrypt algorithm "${algorithmName(algorithm)}"`);
      }
      if (!algorithm.iv) throw new Error('AES-GCM encryption requires an iv.');
      if (algorithm.tagLength !== undefined && algorithm.tagLength !== 128) {
        throw notSupported(`AES-GCM tagLength ${algorithm.tagLength}`);
      }
      return exactBuffer(gcm(aesKey.raw, toBytes(algorithm.iv)).encrypt(toBytes(data)));
    },

    async decrypt(
      algorithm: { name?: string; iv?: BufferSource; tagLength?: number },
      key: CryptoKey,
      data: BufferSource,
    ): Promise<ArrayBuffer> {
      const aesKey = key as unknown as ShimAesKey;
      if (!aesKey || aesKey.__shim !== 'aes-gmc') throw notSupported('decrypt key type');
      if (algorithmName(algorithm) !== 'AES-GCM') {
        throw notSupported(`decrypt algorithm "${algorithmName(algorithm)}"`);
      }
      if (!algorithm.iv) throw new Error('AES-GCM decryption requires an iv.');
      if (algorithm.tagLength !== undefined && algorithm.tagLength !== 128) {
        throw notSupported(`AES-GCM tagLength ${algorithm.tagLength}`);
      }
      try {
        return exactBuffer(gcm(aesKey.raw, toBytes(algorithm.iv)).decrypt(toBytes(data)));
      } catch {
        const error = new Error('AES-GCM decryption failed.');
        error.name = 'OperationError';
        throw error;
      }
    },
  };

  Object.defineProperty(globalThis.crypto, 'subtle', {
    configurable: true,
    value: subtleShim,
  });
}
