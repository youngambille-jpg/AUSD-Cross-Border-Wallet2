# Codex conversation

## User

read passkey.md, i am having issues with passkey and i am thinking if i can add an altertive privy social auth so app can work while i work on mera

## Assistant

I’ll read `passkey.md` and inspect the wallet’s current auth flow so I can see how a temporary Privy social sign-in would fit alongside the passkey path.

## Activity

    $ rg --files -g 'passkey.md' -g 'AGENTS.md' -g 'package.json' -g '*auth*' -g '*privy*'
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Activity

    $ pwd && rg --files | head -100
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Assistant

I couldn’t access the workspace: shell commands are failing with a sandbox error (`bwrap: Unexpected capabilities but not setuid, old file caps config?`). So I haven’t been able to read `passkey.md` or inspect the auth flow.

Please retry after the workspace shell is available, or paste `passkey.md` and the relevant auth files here. Then I can assess how to add Privy social sign-in as a temporary alternative while you work on Mera.

## User

retyr

## Assistant

I’ll retry reading `passkey.md` and locating the wallet authentication code.

## Activity

    $ pwd; rg --files -g 'passkey.md' -g 'AGENTS.md' -g 'package.json' -g '*auth*' -g '*privy*'
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Activity

    $ ls -la /home/runner/workspace
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Assistant

I retried, but the workspace shell is still unavailable with the same sandbox error:

`bwrap: Unexpected capabilities but not setuid, old file caps config?`

I still can’t read `passkey.md`. Please paste its contents (or the relevant auth files), and I’ll review how to add Privy social auth as a temporary fallback.

## User

analyse repo

## Assistant

I’ll inspect the workspace structure, `passkey.md`, and the wallet’s current authentication boundaries, then map the safest path for Privy social auth.

## Activity

    $ pwd && rg --files | head -150
    bwrap: Unexpected capabilities but not setuid, old file caps config?
    ✗ (1) • 0ms

## Activity

    $ pwd && rg --files | head -150
    /home/runner/workspace
    passkey.md
    task.md
    codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md
    codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md
    codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac7c6f.md
    coder.md
    pnpm-lock.yaml
    tsconfig.base.json
    codemagic.yaml
    replit.md
    package.json
    AGENTS.md
    plan.md
    lib/db/tsconfig.json
    lib/db/src/schema/index.ts
    lib/db/src/index.ts
    lib/db/package.json
    lib/db/drizzle.config.ts
    lib/api-zod/tsconfig.json
    lib/api-zod/src/generated/types/healthStatus.ts
    lib/api-zod/src/generated/types/index.ts
    lib/api-zod/src/generated/api.ts
    lib/api-zod/src/index.ts
    lib/api-zod/package.json
    lib/api-client-react/tsconfig.json
    lib/api-client-react/src/generated/api.schemas.ts
    lib/api-client-react/src/generated/api.ts
    lib/api-client-react/src/index.ts
    lib/api-client-react/src/custom-fetch.ts
    lib/api-client-react/package.json
    lib/api-spec/openapi.yaml
    lib/api-spec/package.json
    lib/api-spec/orval.config.ts
    tsconfig.json
    pnpm-workspace.yaml
    artifacts/ausd-contracts/README.md
    artifacts/ausd-contracts/deployments/monad-testnet.json
    artifacts/ausd-contracts/scripts/deploy.ts
    artifacts/ausd-contracts/package.json
    artifacts/ausd-contracts/test/SavingsPockets.t.sol
    artifacts/ausd-contracts/hardhat.config.ts
    artifacts/ausd-contracts/contracts/SavingsPockets.sol
    artifacts/wallet-indexer/package.json
    artifacts/wallet-indexer/tsconfig.json
    artifacts/wallet-indexer/envio-env.d.ts
    artifacts/wallet-indexer/src/handlers.ts
    artifacts/wallet-indexer/schema.graphql
    artifacts/wallet-indexer/config.yaml
    scripts/post-merge.sh
    scripts/tsconfig.json
    scripts/src/hello.ts
    scripts/package.json
    artifacts/mockup-sandbox/vite.config.ts
    artifacts/mockup-sandbox/tsconfig.json
    artifacts/mockup-sandbox/index.html
    artifacts/mockup-sandbox/mockupPreviewPlugin.ts
    artifacts/mockup-sandbox/components.json
    artifacts/mockup-sandbox/src/lib/utils.ts
    artifacts/mockup-sandbox/src/components/ui/button-group.tsx
    artifacts/mockup-sandbox/src/components/ui/carousel.tsx
    artifacts/mockup-sandbox/src/components/ui/breadcrumb.tsx
    artifacts/mockup-sandbox/src/components/ui/tabs.tsx
    artifacts/mockup-sandbox/src/components/ui/button.tsx
    artifacts/mockup-sandbox/src/components/ui/toggle.tsx
    artifacts/mockup-sandbox/src/components/ui/input-group.tsx
    artifacts/mockup-sandbox/src/components/ui/slider.tsx
    artifacts/mockup-sandbox/src/components/ui/label.tsx
    artifacts/mockup-sandbox/src/components/ui/command.tsx
    artifacts/mockup-sandbox/src/components/ui/pagination.tsx
    artifacts/mockup-sandbox/src/components/ui/sidebar.tsx
    artifacts/mockup-sandbox/src/components/ui/aspect-ratio.tsx
    artifacts/mockup-sandbox/src/components/ui/skeleton.tsx
    artifacts/mockup-sandbox/src/components/ui/item.tsx
    artifacts/mockup-sandbox/src/components/ui/field.tsx
    artifacts/mockup-sandbox/src/components/ui/accordion.tsx
    artifacts/mockup-sandbox/src/components/ui/dialog.tsx
    artifacts/mockup-sandbox/src/components/ui/separator.tsx
    artifacts/mockup-sandbox/src/components/ui/resizable.tsx
    artifacts/mockup-sandbox/src/components/ui/sheet.tsx
    artifacts/mockup-sandbox/src/components/ui/card.tsx
    artifacts/mockup-sandbox/src/components/ui/dropdown-menu.tsx
    artifacts/mockup-sandbox/src/components/ui/avatar.tsx
    artifacts/mockup-sandbox/src/components/ui/navigation-menu.tsx
    artifacts/mockup-sandbox/src/components/ui/select.tsx
    artifacts/mockup-sandbox/src/components/ui/chart.tsx
    artifacts/mockup-sandbox/src/components/ui/calendar.tsx
    artifacts/mockup-sandbox/src/components/ui/form.tsx
    artifacts/mockup-sandbox/src/components/ui/hover-card.tsx
    artifacts/mockup-sandbox/src/components/ui/radio-group.tsx
    artifacts/mockup-sandbox/src/components/ui/context-menu.tsx
    artifacts/mockup-sandbox/src/components/ui/toggle-group.tsx
    artifacts/mockup-sandbox/src/components/ui/alert.tsx
    artifacts/mockup-sandbox/src/components/ui/input-otp.tsx
    artifacts/mockup-sandbox/src/components/ui/tooltip.tsx
    artifacts/mockup-sandbox/src/components/ui/input.tsx
    artifacts/mockup-sandbox/src/components/ui/checkbox.tsx
    artifacts/mockup-sandbox/src/components/ui/progress.tsx
    artifacts/mockup-sandbox/src/components/ui/toaster.tsx
    artifacts/mockup-sandbox/src/components/ui/drawer.tsx
    artifacts/mockup-sandbox/src/components/ui/menubar.tsx
    artifacts/mockup-sandbox/src/components/ui/collapsible.tsx
    artifacts/mockup-sandbox/src/components/ui/popover.tsx
    artifacts/mockup-sandbox/src/components/ui/alert-dialog.tsx
    artifacts/mockup-sandbox/src/components/ui/kbd.tsx
    artifacts/mockup-sandbox/src/components/ui/switch.tsx
    artifacts/mockup-sandbox/src/components/ui/spinner.tsx
    artifacts/mockup-sandbox/src/components/ui/toast.tsx
    artifacts/mockup-sandbox/src/components/ui/badge.tsx
    artifacts/mockup-sandbox/src/components/ui/empty.tsx
    artifacts/mockup-sandbox/src/components/ui/textarea.tsx
    artifacts/mockup-sandbox/src/components/ui/table.tsx
    artifacts/mockup-sandbox/src/components/ui/sonner.tsx
    artifacts/mockup-sandbox/src/components/ui/scroll-area.tsx
    artifacts/mockup-sandbox/src/main.tsx
    artifacts/mockup-sandbox/src/hooks/use-mobile.tsx
    artifacts/mockup-sandbox/src/hooks/use-toast.ts
    artifacts/mockup-sandbox/src/index.css
    artifacts/mockup-sandbox/src/App.tsx
    artifacts/mockup-sandbox/package.json
    artifacts/api-server/tsconfig.json
    artifacts/api-server/src/routes/index.ts
    artifacts/api-server/src/routes/health.ts
    artifacts/api-server/src/lib/logger.ts
    artifacts/api-server/src/app.ts
    artifacts/api-server/src/index.ts
    artifacts/api-server/package.json
    artifacts/api-server/build.mjs
    artifacts/ausd-wallet/app.config.ts
    artifacts/ausd-wallet/app.json
    artifacts/ausd-wallet/README.md
    artifacts/ausd-wallet/package.json
    artifacts/ausd-wallet/eas.json
    artifacts/ausd-wallet/tsconfig.json
    artifacts/ausd-wallet/metro.config.js
    artifacts/ausd-wallet/hooks/useColors.ts
    artifacts/ausd-wallet/constants/colors.ts
    artifacts/ausd-wallet/components/Primitives.tsx
    artifacts/ausd-wallet/assets/images/icon.png
    artifacts/ausd-wallet/components/KeyboardAwareScrollViewCompat.tsx
    artifacts/ausd-wallet/components/ErrorFallback.tsx
    artifacts/ausd-wallet/components/ErrorBoundary.tsx
    artifacts/ausd-wallet/assets/images/icon4.png
    artifacts/ausd-wallet/scripts/build.js
    artifacts/ausd-wallet/state/wallet-context.tsx
    artifacts/ausd-wallet/app/create-account.tsx
    artifacts/ausd-wallet/app/savings-goals.tsx
    artifacts/ausd-wallet/app/review.tsx
    artifacts/ausd-wallet/app/success.tsx
    artifacts/ausd-wallet/app/contacts.tsx
    artifacts/ausd-wallet/app/aurora-deposit.tsx
    ✓ • 0ms

## Activity

    $ sed -n '1,240p' artifacts/ausd-wallet/package.json && sed -n '1,260p' artifacts/ausd-wallet/state/wallet-context.tsx
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
    ✓ • 76ms

## Activity

    $ sed -n '1,260p' passkey.md
    # Codex conversation
    
    ## User
    
    from ausd-wallet The passkey ceremony could not finish for RP domain auth.vic-ezealor.workers.dev. Check that the app’s RP domain has the matching Android assetlinks.json or iOS apple-app-site-association file, then retr If Mera's passkey flow is already serving the SHA-256 fingerprint and the Android credentials correctly, then we should investigate the association between the RP domain, the Android app, and Mera's WebAuthn implementation rather than assume the file is missing.
    
    From your screenshot, the RP domain is:
    
    `auth.vic-ezealor.workers.dev`
    
    There are a few important distinctions:
    
    * Android Digital Asset Links: `/.well-known/assetlinks.json` must be served by the RP domain and contain the correct Android package name and signing-certificate fingerprint.
    
    * RP ID consistency: The RP ID used during passkey registration must match the domain expected by the WebAuthn server. It must not include a scheme or path.
    
    * Signing certificate: The fingerprint must match the certificate used to sign the installed Android build, which may differ between debug and release builds.
    
    * Mera's implementation: If Mera uses a custom passkey flow or native bridge, we need to check how it associates the app with the RP domain.
    
    One key question: When you open `https://auth.vic-ezealor.workers.dev/.well-known/assetlinks.json` in your browser, does it return the correct JSON, including your Android package name and SHA-256 fingerprint?
    
    If it does, share the relevant passkey registration code and Android package ID from `youngambille-jpg/ausd-cross-border-wallet`. I can help pinpoint the failure without unnecessarily changing a working association file.
    
    ## Assistant
    
    I’ll trace the wallet’s passkey registration path and the Android app identity, then check how the auth worker serves its asset links. I’ll keep the association-file diagnosis grounded in the code and current configuration.
    
    ## Activity
    
        $ pwd && rg -n -i "passkey|webauthn|assetlinks|rp.?id|apple-app-site-association|workers.dev|packageName|applicationId" artifacts/ausd-wallet
        bwrap: Unexpected capabilities but not setuid, old file caps config?
        ✗ (1) • 0ms
    
    ## Activity
    
        $ rg -n -i "passkey|webauthn|assetlinks|rp.?id|apple-app-site-association|workers.dev|packageName|applicationId" artifacts/ausd-wallet
        bwrap: Unexpected capabilities but not setuid, old file caps config?
        ✗ (1) • 0ms
    
    ## Activity
    
        $ pwd
        bwrap: Unexpected capabilities but not setuid, old file caps config?
        ✗ (1) • 0ms
    
    ## Activity
    
        Opened https://auth.vic-ezealor.workers.dev/.well-known/assetlinks.json
    
    ## Assistant
    
    I couldn’t inspect the wallet code: the workspace shell failed to start (`bwrap: Unexpected capabilities but not setuid`), and the browser tool couldn’t access the asset-links URL. So I can’t confirm the package ID, fingerprint, or Mera’s WebAuthn configuration yet.
    
    Please paste the passkey registration code, the Android `applicationId`/package name, and the asset-links JSON returned by `https://auth.vic-ezealor.workers.dev/.well-known/assetlinks.json`. Then I can compare the RP ID, app identity, and signing fingerprint to pinpoint the mismatch.
    
    ## User
    
    inspect the repo
    
    ## Assistant
    
    I’m inspecting the wallet and its supporting auth configuration now, focusing on the RP ID, Android app identity, asset-links route, and the WebAuthn ceremony call.
    
    ## Activity
    
        $ rg --files artifacts/ausd-wallet artifacts/api-server | head -300
        artifacts/api-server/tsconfig.json
        artifacts/api-server/src/index.ts
        artifacts/api-server/package.json
        artifacts/api-server/build.mjs
        artifacts/api-server/src/app.ts
        artifacts/api-server/src/lib/logger.ts
        artifacts/api-server/src/routes/index.ts
        artifacts/api-server/src/routes/health.ts
        artifacts/ausd-wallet/README.md
        artifacts/ausd-wallet/app.json
        artifacts/ausd-wallet/package.json
        artifacts/ausd-wallet/eas.json
        artifacts/ausd-wallet/tsconfig.json
        artifacts/ausd-wallet/metro.config.js
        artifacts/ausd-wallet/app.config.ts
        artifacts/ausd-wallet/state/wallet-context.tsx
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
        artifacts/ausd-wallet/scripts/build.js
        artifacts/ausd-wallet/hooks/useColors.ts
        artifacts/ausd-wallet/server/templates/landing-page.html
        artifacts/ausd-wallet/server/serve.js
        artifacts/ausd-wallet/src/polyfills.ts
        artifacts/ausd-wallet/services/aurora-intents.ts
        artifacts/ausd-wallet/services/indexed-activity.ts
        artifacts/ausd-wallet/services/settlement.ts
        artifacts/ausd-wallet/services/agora.ts
        artifacts/ausd-wallet/services/passkey.ts
        artifacts/ausd-wallet/services/contacts.ts
        artifacts/ausd-wallet/services/savings-pockets.ts
        artifacts/ausd-wallet/services/savings-goals.ts
        artifacts/ausd-wallet/services/tokens.ts
        artifacts/ausd-wallet/services/shared-pockets.ts
        ✓ • 0ms
    
    ## Activity
    
        $ rg -n -i "passkey|webauthn|assetlinks|rp.?id|workers\.dev|android|ios|applicationId|package" artifacts/ausd-wallet artifacts/api-server --glob '!**/node_modules/**'
        artifacts/ausd-wallet/services/shared-pockets.ts:2:import type { PasskeySecretVault } from '@category-labs/mera';
        artifacts/ausd-wallet/services/shared-pockets.ts:4:import type { MeraPasskeyProfile } from '@/services/passkey';
        artifacts/ausd-wallet/services/shared-pockets.ts:5:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
        artifacts/ausd-wallet/services/shared-pockets.ts:69:export async function loadSharedPockets(account: MeraPasskeyProfile): Promise<SharedPocket[]> {
        artifacts/ausd-wallet/services/shared-pockets.ts:72:  const plaintext = await decryptWithMeraPasskey(account, JSON.parse(stored));
        artifacts/ausd-wallet/services/shared-pockets.ts:76:export async function saveSharedPockets(account: MeraPasskeyProfile, pockets: SharedPocket[]) {
        artifacts/ausd-wallet/services/shared-pockets.ts:77:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(validateSharedPockets(pockets)));
        artifacts/api-server/build.mjs:25:    // Some packages may not be bundleable, so we externalize them, we can add more here as needed.
        artifacts/api-server/build.mjs:26:    // Some of the packages below may not be imported or installed, but we're adding them in case they are in the future.
        artifacts/api-server/build.mjs:27:    // Examples of unbundleable packages:
        artifacts/api-server/build.mjs:109:    // Make sure packages that are cjs only (e.g. express) but are bundled continue to work in our esm output file
        artifacts/ausd-wallet/README.md:3:Expo mobile wallet prototype for AUSD payments. New users move through a three-screen swipe introduction, then create a Mera passkey account. Mera authenticates wallet actions, direct AUSD transfers and Agora Instant Settlement swaps can submit sponsored transactions on Monad testnet, and CTK is used as a mock payout token. Aurora Intents can quote cross-chain deposits into Monad AUSD and provide a temporary source-chain deposit address.
        artifacts/ausd-wallet/README.md:5:## Passkey setup
        artifacts/ausd-wallet/README.md:7:Mera uses WebAuthn PRF support. It is supported in React Native on iOS 18+ and Android 9+; native builds need `react-native-passkey` autolinked into the app (use a development or production build, not Expo Go).
        artifacts/ausd-wallet/README.md:9:Set `EXPO_PUBLIC_RP_ID` to the hostname that will own the passkey. It must be a verified HTTPS domain and match the app’s native domain associations. If omitted, the Expo development domain is used when available. Native builds also accept:
        artifacts/ausd-wallet/README.md:11:- `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
        artifacts/ausd-wallet/README.md:12:- `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
        artifacts/ausd-wallet/README.md:13:- `AUSD_ANDROID_PACKAGE` (defaults to `com.ausd.wallet`)
        artifacts/ausd-wallet/README.md:14:- `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
        artifacts/ausd-wallet/README.md:16:The Expo config adds iOS Associated Domains and the Android verified web link when an RP ID is set. The app server serves `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json` from the variables above. Publish the server on the same HTTPS hostname as the RP ID. The association endpoints respond with a configuration error until the platform signing values are provided.
        artifacts/ausd-wallet/README.md:24:Savings goals create pockets in the deployed Monad testnet `SavingsPockets` contract. Deposits batch an exact-amount AUSD approval with the pocket deposit; payments with auto-save batch an exact-amount approval when needed with the recipient payment and pocket allocation. The send review shows the recipient payment, auto-save amount, and total AUSD debit before Mera passkey approval. Pocket creation does not move AUSD. Legacy goals without a pocket remain labeled as local-only tracking. Confirm each transaction only after checking the recipient and total debit; sponsorship is requested, not guaranteed.
        artifacts/ausd-wallet/README.md:32:## Android demo APK on Codemagic
        artifacts/ausd-wallet/README.md:34:The repository-root `codemagic.yaml` generates the Android native project with Expo prebuild, builds the bundled `assembleRelease` app, and archives `artifacts/ausd-wallet/android/app/build/outputs/apk/release/*.apk`. The workflow installs the pnpm workspace lockfile and runs on pushes to `main`.
        artifacts/ausd-wallet/README.md:36:Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
        artifacts/ausd-wallet/README.md:38:## Android APK on GitHub Actions
        artifacts/ausd-wallet/README.md:40:The `.github/workflows/build-android-apk.yml` workflow builds the bundled app APK on every push and can also be started from the repository's **Actions** tab with **Run workflow**. After a successful run, download `ausd-wallet-android-<commit>` from that run's artifacts. Artifacts are retained for 14 days. This is a release-variant APK for demo installation, not a Play Store-signed production release.
        artifacts/ausd-wallet/README.md:42:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
        artifacts/ausd-wallet/README.md:51:## Install an Android passkey build
        artifacts/ausd-wallet/README.md:53:Expo Go cannot load Mera’s native passkey module. Build and install the Android development APK once, then use `dev:client` for JavaScript iteration:
        artifacts/ausd-wallet/README.md:55:1. Set `EXPO_PUBLIC_RP_ID` to the public HTTPS hostname configured for passkeys, and publish the Android asset links file with the package name and signing certificate SHA-256 fingerprint.
        artifacts/ausd-wallet/README.md:56:2. Run `eas build --platform android --profile development` to produce an installable APK.
        artifacts/ausd-wallet/README.md:57:3. Install that APK on an Android 9+ device, then run `pnpm --filter @workspace/ausd-wallet run dev:client` and open the app.
        artifacts/ausd-wallet/README.md:59:The current Expo Go preview remains useful for the UI, but passkey creation and authentication only work in the native development build (or supported web browser).
        artifacts/ausd-wallet/README.md:63:Receive creates an AUSD payment-request QR code and share link. Send can scan the request and prefill its recipient and optional amount for review; the sender must still approve with their passkey. Camera permission is requested only when scanning.
        artifacts/ausd-wallet/README.md:65:The private contacts book stores user-chosen names with confirmed smart-account addresses in a Mera-encrypted vault on device. Contacts can be exported and restored as encrypted data with the same passkey and RP domain. Selecting a contact pre-fills Send and shows the saved name during transaction review; there is no global username directory.
        artifacts/ausd-wallet/app.json:15:    "ios": {
        artifacts/ausd-wallet/app.json:18:    "android": {},
        artifacts/ausd-wallet/package.json:7:    "dev": "sh -c 'if [ -n \"$REPLIT_EXPO_SESSION_SECRET\" ]; then pnpm exec create-launch login --session \"$REPLIT_EXPO_SESSION_SECRET\" || true; fi' && EXPO_PACKAGER_PROXY_URL=https://$REPLIT_EXPO_DEV_DOMAIN EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN EXPO_PUBLIC_REPL_ID=$REPL_ID REACT_NATIVE_PACKAGER_HOSTNAME=$REPLIT_DEV_DOMAIN pnpm exec expo start --localhost --port $PORT",
        artifacts/ausd-wallet/package.json:68:    "react-native-passkey": "^3.6.2",
        artifacts/ausd-wallet/services/savings-goals.ts:2:import type { PasskeySecretVault } from '@category-labs/mera';
        artifacts/ausd-wallet/services/savings-goals.ts:3:import type { MeraPasskeyProfile } from '@/services/passkey';
        artifacts/ausd-wallet/services/savings-goals.ts:4:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
        artifacts/ausd-wallet/services/savings-goals.ts:35:export async function loadSavingsGoals(account: MeraPasskeyProfile): Promise<SavingsGoal[]> {
        artifacts/ausd-wallet/services/savings-goals.ts:38:  const decoded = JSON.parse(await decryptWithMeraPasskey(account, JSON.parse(stored))) as unknown;
        artifacts/ausd-wallet/services/savings-goals.ts:42:export async function saveSavingsGoals(account: MeraPasskeyProfile, goals: SavingsGoal[]) {
        artifacts/ausd-wallet/services/savings-goals.ts:43:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(goals));
        artifacts/ausd-wallet/services/savings-goals.ts:51:export async function importSavingsVault(account: MeraPasskeyProfile, serialized: string) {
        artifacts/ausd-wallet/services/savings-goals.ts:53:  const decoded = validateGoals(JSON.parse(await decryptWithMeraPasskey(account, vault)) as unknown);
        artifacts/ausd-wallet/eas.json:10:      "android": {
        artifacts/ausd-wallet/app.config.ts:13:  const rpId = domainHost(process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN);
        artifacts/ausd-wallet/app.config.ts:14:  const bundleIdentifier = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
        artifacts/ausd-wallet/app.config.ts:15:  const androidPackage = process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet';
        artifacts/ausd-wallet/app.config.ts:22:    ios: {
        artifacts/ausd-wallet/app.config.ts:23:      ...config.ios,
        artifacts/ausd-wallet/app.config.ts:26:      ...(rpId ? { associatedDomains: [`webcredentials:${rpId}`] } : {}),
        artifacts/ausd-wallet/app.config.ts:28:    android: {
        artifacts/ausd-wallet/app.config.ts:29:      ...config.android,
        artifacts/ausd-wallet/app.config.ts:30:      package: androidPackage,
        artifacts/ausd-wallet/app.config.ts:31:      ...(rpId
        artifacts/ausd-wallet/app.config.ts:37:                data: [{ scheme: 'https', host: rpId }],
        artifacts/ausd-wallet/server/templates/landing-page.html:408:        const isAndroid = /Android/i.test(ua);
        artifacts/ausd-wallet/server/templates/landing-page.html:409:        const isIOS =
        artifacts/ausd-wallet/server/templates/landing-page.html:420:        if (isIOS) {
        artifacts/ausd-wallet/server/templates/landing-page.html:423:        } else if (isAndroid) {
        artifacts/ausd-wallet/server/templates/landing-page.html:452:        if (isAndroid || isIOS) {
        artifacts/ausd-wallet/state/wallet-context.tsx:12:import type { PasskeyCredentialMetadata } from '@category-labs/mera';
        artifacts/ausd-wallet/state/wallet-context.tsx:28:  passkey?: {
        artifacts/ausd-wallet/state/wallet-context.tsx:29:    credential: PasskeyCredentialMetadata;
        artifacts/ausd-wallet/state/wallet-context.tsx:30:    rpId: string;
        artifacts/ausd-wallet/state/wallet-context.tsx:159:      if (profile.mode !== 'mera') throw new Error('A Mera passkey account is required.');
        artifacts/ausd-wallet/services/savings-pockets.ts:17:  type MeraPasskeyProfile,
        artifacts/ausd-wallet/services/savings-pockets.ts:19:} from '@/services/passkey';
        artifacts/ausd-wallet/services/savings-pockets.ts:248:  account: MeraPasskeyProfile,
        artifacts/ausd-wallet/services/savings-pockets.ts:319:  account: MeraPasskeyProfile,
        artifacts/ausd-wallet/services/savings-pockets.ts:365:  account: MeraPasskeyProfile,
        artifacts/ausd-wallet/services/savings-pockets.ts:433:  account: MeraPasskeyProfile,
        artifacts/ausd-wallet/services/savings-pockets.ts:471:export function giftToPersonSponsored(account: MeraPasskeyProfile, recipient: string, amount: string) {
        artifacts/ausd-wallet/services/savings-pockets.ts:475:export function giftToPocketSponsored(account: MeraPasskeyProfile, recipient: string, pocketId: string, amount: string) {
        artifacts/ausd-wallet/services/savings-pockets.ts:479:export async function withdrawGiftSponsored(account: MeraPasskeyProfile, amount: string) {
        artifacts/ausd-wallet/server/serve.js:86:function servePasskeyAssociation(pathname, res) {
        artifacts/ausd-wallet/server/serve.js:89:    const teamId = process.env.AUSD_IOS_TEAM_ID;
        artifacts/ausd-wallet/server/serve.js:90:    const bundleId = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
        artifacts/ausd-wallet/server/serve.js:93:      res.end(JSON.stringify({ error: 'Set AUSD_IOS_TEAM_ID to publish the iOS passkey association.' }));
        artifacts/ausd-wallet/server/serve.js:101:  } else if (pathname === '/.well-known/assetlinks.json') {
        artifacts/ausd-wallet/server/serve.js:102:    const packageName = process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet';
        artifacts/ausd-wallet/server/serve.js:103:    const fingerprints = (process.env.AUSD_ANDROID_SHA256_CERT_FINGERPRINTS || '')
        artifacts/ausd-wallet/server/serve.js:109:      res.end(JSON.stringify({ error: 'Set AUSD_ANDROID_SHA256_CERT_FINGERPRINTS to publish Android passkey associations.' }));
        artifacts/ausd-wallet/server/serve.js:118:        target: { namespace: 'android_app', package_name: packageName, sha256_cert_fingerprints: fingerprints },
        artifacts/ausd-wallet/server/serve.js:180:  if (servePasskeyAssociation(pathname, res)) return;
        artifacts/ausd-wallet/server/serve.js:188:    if (platform === 'ios' || platform === 'android') {
        artifacts/ausd-wallet/components/ErrorFallback.tsx:45:    ios: 'Menlo',
        artifacts/ausd-wallet/components/ErrorFallback.tsx:46:    android: 'monospace',
        artifacts/ausd-wallet/services/passkey.ts:23:import type { PasskeyCredentialMetadata } from '@category-labs/mera';
        artifacts/ausd-wallet/services/passkey.ts:36:  credential: PasskeyCredentialMetadata;
        artifacts/ausd-wallet/services/passkey.ts:37:  rpId: string;
        artifacts/ausd-wallet/services/passkey.ts:40:export interface MeraPasskeyProfile {
        artifacts/ausd-wallet/services/passkey.ts:43:  credential: PasskeyCredentialMetadata;
        artifacts/ausd-wallet/services/passkey.ts:44:  rpId: string;
        artifacts/ausd-wallet/services/passkey.ts:68:export function getPasskeyErrorMessage(error: unknown) {
        artifacts/ausd-wallet/services/passkey.ts:69:  if (!(error instanceof Error)) return 'Passkey authentication did not complete. Please try again.';
        artifacts/ausd-wallet/services/passkey.ts:78:    return 'The passkey was created, but this authenticator did not provide Mera’s secure account key. Try a device passkey provider that supports WebAuthn PRF, such as Google Password Manager or iCloud Keychain.';
        artifacts/ausd-wallet/services/passkey.ts:83:  if (shaped.code === 'PASSKEY_OPERATION_FAILED') {
        artifacts/ausd-wallet/services/passkey.ts:84:    const rpId = getRelyingPartyId();
        artifacts/ausd-wallet/services/passkey.ts:85:    return `The passkey ceremony could not finish for RP domain ${rpId ?? 'the configured domain'}. Check that the app’s RP domain has the matching Android assetlinks.json or iOS apple-app-site-association file, then retry.`;
        artifacts/ausd-wallet/services/passkey.ts:88:    return 'Passkey prompt cancelled. You can try again when you’re ready.';
        artifacts/ausd-wallet/services/passkey.ts:90:  return error.message || 'Passkey authentication did not complete. Please try again.';
        artifacts/ausd-wallet/services/passkey.ts:93:async function assertNativeRpAssociation(rpId: string) {
        artifacts/ausd-wallet/services/passkey.ts:95:  const isAndroid = Platform.OS === 'android';
        artifacts/ausd-wallet/services/passkey.ts:96:  const associationPath = isAndroid
        artifacts/ausd-wallet/services/passkey.ts:97:    ? '/.well-known/assetlinks.json'
        artifacts/ausd-wallet/services/passkey.ts:101:    response = await fetch(`https://${rpId}${associationPath}`, { redirect: 'manual' });
        artifacts/ausd-wallet/services/passkey.ts:103:    throw new Error(`Could not reach https://${rpId}${associationPath}. Publish the native passkey association file on the RP domain, then retry.`);
        artifacts/ausd-wallet/services/passkey.ts:106:    throw new Error(`The passkey association file at https://${rpId}${associationPath} must return JSON directly with HTTP 200. Check the RP domain’s association configuration.`);
        artifacts/ausd-wallet/services/passkey.ts:113:    throw new Error(`The passkey association file at https://${rpId}${associationPath} did not return valid JSON.`);
        artifacts/ausd-wallet/services/passkey.ts:116:  if (isAndroid) {
        artifacts/ausd-wallet/services/passkey.ts:117:    const packageName = Constants.expoConfig?.android?.package ?? 'com.ausd.wallet';
        artifacts/ausd-wallet/services/passkey.ts:123:        target?: { namespace?: string; package_name?: string; sha256_cert_fingerprints?: unknown };
        artifacts/ausd-wallet/services/passkey.ts:128:        && target?.namespace === 'android_app'
        artifacts/ausd-wallet/services/passkey.ts:129:        && target.package_name === packageName
        artifacts/ausd-wallet/services/passkey.ts:134:      throw new Error(`Android passkeys are not associated with ${packageName}. Add the installed APK’s signing-certificate SHA-256 fingerprint to the RP domain’s assetlinks.json, then rebuild and retry.`);
        artifacts/ausd-wallet/services/passkey.ts:139:  const iosBundleId = Constants.expoConfig?.ios?.bundleIdentifier;
        artifacts/ausd-wallet/services/passkey.ts:142:  if (iosBundleId && !apps.some((app) => typeof app === 'string' && app.endsWith(`.${iosBundleId}`))) {
        artifacts/ausd-wallet/services/passkey.ts:143:    throw new Error(`iOS passkeys are not associated with ${iosBundleId}. Add the Apple team and bundle ID to the RP domain’s apple-app-site-association file, then rebuild and retry.`);
        artifacts/ausd-wallet/services/passkey.ts:151:  const configured = process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN;
        artifacts/ausd-wallet/services/passkey.ts:163:      'Expo Go does not include Mera’s native passkey module. Install the AUSD development build, then open this project with the dev:client command.',
        artifacts/ausd-wallet/services/passkey.ts:166:  if (Platform.OS === 'ios' && Number(Platform.Version) < 18) {
    ✓ • 937ms

## Activity

    $ sed -n '1,220p' package.json && sed -n '1,220p' lib/db/src/schema/index.ts && sed -n '1,220p' artifacts/api-server/src/app.ts
    {
      "name": "workspace",
      "version": "0.0.0",
      "license": "MIT",
      "scripts": {
        "preinstall": "sh -c 'rm -f package-lock.json yarn.lock; case \"$npm_config_user_agent\" in pnpm/*) ;; *) echo \"Use pnpm instead\" >&2; exit 1 ;; esac'",
        "build": "pnpm run typecheck && pnpm -r --if-present run build",
        "typecheck:libs": "tsc --build",
        "typecheck": "pnpm run typecheck:libs && pnpm -r --filter \"./artifacts/**\" --filter \"./scripts\" --if-present run typecheck"
      },
      "private": true,
      "dependencies": {
        "@replit/connectors-sdk": "^0.4.3"
      },
      "devDependencies": {
        "prettier": "^3.9.6",
        "typescript": "~5.9.3"
      }
    }
    // Export your models here. Add one export per file
    // export * from "./posts";
    //
    // Each model/table should ideally be split into different files.
    // Each model/table should define a Drizzle table, insert schema, and types:
    //
    //   import { pgTable, text, serial } from "drizzle-orm/pg-core";
    //   import { createInsertSchema } from "drizzle-zod";
    //   import { z } from "zod/v4";
    //
    //   export const postsTable = pgTable("posts", {
    //     id: serial("id").primaryKey(),
    //     title: text("title").notNull(),
    //   });
    //
    //   export const insertPostSchema = createInsertSchema(postsTable).omit({ id: true });
    //   export type InsertPost = z.infer<typeof insertPostSchema>;
    //   export type Post = typeof postsTable.$inferSelect;
    
    export {}import express, { type Express } from "express";
    import cors from "cors";
    import pinoHttp from "pino-http";
    import router from "./routes";
    import { logger } from "./lib/logger";
    
    const app: Express = express();
    
    app.use(
      pinoHttp({
        logger,
        serializers: {
          req(req) {
            return {
              id: req.id,
              method: req.method,
              url: req.url?.split("?")[0],
            };
          },
          res(res) {
            return {
              statusCode: res.statusCode,
            };
          },
        },
      }),
    );
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use("/api", router);
    
    export default app;
    ✓ • 15.89s

## Activity

    $ rg -n -i "passkey|webauthn|privy|auth|mera|wallet" artifacts/ausd-wallet --glob '!node_modules/**'
    artifacts/ausd-wallet/app.config.ts:13:  const rpId = domainHost(process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN || "auth.vic-ezealor.workers.dev");
    artifacts/ausd-wallet/app.config.ts:14:  const bundleIdentifier = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
    artifacts/ausd-wallet/app.config.ts:15:  const androidPackage = process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet';
    artifacts/ausd-wallet/app.config.ts:19:    name: config.name ?? 'AUSD Wallet',
    artifacts/ausd-wallet/app.config.ts:20:    slug: config.slug ?? 'ausd-wallet',
    artifacts/ausd-wallet/app.json:3:    "name": "AUSD Wallet",
    artifacts/ausd-wallet/app.json:4:    "slug": "ausd-wallet",
    artifacts/ausd-wallet/app.json:8:    "scheme": "ausd-wallet",
    artifacts/ausd-wallet/app.json:19:      "package": "com.ausd.wallet",
    artifacts/ausd-wallet/app.json:33:        "expo-camera",
    artifacts/ausd-wallet/app.json:35:          "cameraPermission": "Allow AUSD Wallet to scan payment requests."
    artifacts/ausd-wallet/app.json:44:      "rpId" : "auth.vic-ezealor.workers.dev",
    artifacts/ausd-wallet/README.md:1:# AUSD Wallet
    artifacts/ausd-wallet/README.md:3:Expo mobile wallet prototype for AUSD payments. New users move through a three-screen swipe introduction, then create a Mera passkey account. Mera authenticates wallet actions, direct AUSD transfers and Agora Instant Settlement swaps can submit sponsored transactions on Monad testnet, and CTK is used as a mock payout token. Aurora Intents can quote cross-chain deposits into Monad AUSD and provide a temporary source-chain deposit address.
    artifacts/ausd-wallet/README.md:5:## Passkey setup
    artifacts/ausd-wallet/README.md:7:Mera uses WebAuthn PRF support. It is supported in React Native on iOS 18+ and Android 9+; native builds need `react-native-passkey` autolinked into the app (use a development or production build, not Expo Go).
    artifacts/ausd-wallet/README.md:9:Set `EXPO_PUBLIC_RP_ID` to the hostname that will own the passkey. It must be a verified HTTPS domain and match the app’s native domain associations. If omitted, the Expo development domain is used when available. Native builds also accept:
    artifacts/ausd-wallet/README.md:11:- `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    artifacts/ausd-wallet/README.md:13:- `AUSD_ANDROID_PACKAGE` (defaults to `com.ausd.wallet`)
    artifacts/ausd-wallet/README.md:18:Mera credential IDs and transports are stored locally so the user can authenticate again. The PRF output is converted into the standard EVM BIP-44 account key at `m/44'/60'/0'/0/0`; the PRF output, derived key, seed, and signing session are cleared after deriving the address and are not persisted.
    artifacts/ausd-wallet/README.md:22:The Mera PRF derives a standard EVM BIP-44 owner and a Kernel v0.3.1 smart account (EntryPoint v0.7). Direct sends authenticate with Mera and submit an AUSD transfer through a sponsored UserOperation. Agora settlement re-reads its AUSD→CTK quote, checks it has not changed, then submits the approved testnet settlement flow through a sponsored UserOperation. CTK is a test token, not a fiat payout. These actions can move test tokens on Monad testnet; do not use mainnet funds.
    artifacts/ausd-wallet/README.md:24:Savings goals create pockets in the deployed Monad testnet `SavingsPockets` contract. Deposits batch an exact-amount AUSD approval with the pocket deposit; payments with auto-save batch an exact-amount approval when needed with the recipient payment and pocket allocation. The send review shows the recipient payment, auto-save amount, and total AUSD debit before Mera passkey approval. Pocket creation does not move AUSD. Legacy goals without a pocket remain labeled as local-only tracking. Confirm each transaction only after checking the recipient and total debit; sponsorship is requested, not guaranteed.
    artifacts/ausd-wallet/README.md:28:Aurora Intents deposits require `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`, created in [Aurora Intents Studio](https://studio.aurora.dev/). Add it to local environment as shown in `.env.example`. For GitHub Actions builds, set it as the repository variable `EXPO_PUBLIC_AURORA_INTENTS_API_KEY`; for Codemagic, add it to the `ausd_wallet` variable group. Restart or rebuild after configuring. The key is public and embedded in the app bundle. The app loads supported assets, selects the configured Monad AUSD contract, requests a quote, shows the generated deposit address and any required memo, and can query transaction status. The user sends the source token from an external wallet; the app does not sign or submit that source-chain transfer. Always follow the quoted source chain, token, amount, address, memo, and expiry.
    artifacts/ausd-wallet/README.md:30:Agora's unauthenticated public metrics endpoint appears on Profile. Add and Cash out tabs describe a planned Alchemy Pay connection; they do not launch checkout or submit a payout. Card issuing is not enabled. Agora's testnet swap is enabled through the existing send/review flow.
    artifacts/ausd-wallet/README.md:34:The repository-root `codemagic.yaml` generates the Android native project with Expo prebuild, builds the bundled `assembleRelease` app, and archives `artifacts/ausd-wallet/android/app/build/outputs/apk/release/*.apk`. The workflow installs the pnpm workspace lockfile and runs on pushes to `main`.
    artifacts/ausd-wallet/README.md:36:Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    artifacts/ausd-wallet/README.md:40:The `.github/workflows/build-android-apk.yml` workflow builds the bundled app APK on every push and can also be started from the repository's **Actions** tab with **Run workflow**. After a successful run, download `ausd-wallet-android-<commit>` from that run's artifacts. Artifacts are retained for 14 days. This is a release-variant APK for demo installation, not a Play Store-signed production release.
    artifacts/ausd-wallet/README.md:42:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    artifacts/ausd-wallet/README.md:46:- `pnpm --filter @workspace/ausd-wallet run dev` — start the Expo app
    artifacts/ausd-wallet/README.md:47:- `pnpm --filter @workspace/ausd-wallet run dev:client` — start Metro for an installed native development build
    artifacts/ausd-wallet/README.md:48:- `pnpm --filter @workspace/ausd-wallet run typecheck` — typecheck the app
    artifacts/ausd-wallet/README.md:49:- `pnpm --filter @workspace/ausd-wallet run build` — create its static Expo build
    artifacts/ausd-wallet/README.md:51:## Install an Android passkey build
    artifacts/ausd-wallet/README.md:53:Expo Go cannot load Mera’s native passkey module. Build and install the Android development APK once, then use `dev:client` for JavaScript iteration:
    artifacts/ausd-wallet/README.md:55:1. Set `EXPO_PUBLIC_RP_ID` to the public HTTPS hostname configured for passkeys, and publish the Android asset links file with the package name and signing certificate SHA-256 fingerprint.
    artifacts/ausd-wallet/README.md:57:3. Install that APK on an Android 9+ device, then run `pnpm --filter @workspace/ausd-wallet run dev:client` and open the app.
    artifacts/ausd-wallet/README.md:59:The current Expo Go preview remains useful for the UI, but passkey creation and authentication only work in the native development build (or supported web browser).
    artifacts/ausd-wallet/README.md:63:Receive creates an AUSD payment-request QR code and share link. Send can scan the request and prefill its recipient and optional amount for review; the sender must still approve with their passkey. Camera permission is requested only when scanning.
    artifacts/ausd-wallet/README.md:65:The private contacts book stores user-chosen names with confirmed smart-account addresses in a Mera-encrypted vault on device. Contacts can be exported and restored as encrypted data with the same passkey and RP domain. Selecting a contact pre-fills Send and shows the saved name during transaction review; there is no global username directory.
    artifacts/ausd-wallet/README.md:67:The Envio indexer is in `artifacts/wallet-indexer`. In Envio Cloud, set **Root Directory** to `artifacts/wallet-indexer` and **Config File** to `config.yaml`; that directory contains the exact Envio version pin Cloud checks. The indexer pins Envio `3.14.0`, pnpm `10.32.0`, and Node 24+. Deploy it, then set its public GraphQL URL as the GitHub Actions repository variable `EXPO_PUBLIC_ENVIO_GRAPHQL_URL`. Set the same variable in the local wallet environment to use indexed activity during development. It indexes Monad testnet AUSD and CTK `Transfer` events starting from the configured latest block. If the URL is missing or unavailable, the activity screen falls back to transfers saved on the device.
    artifacts/ausd-wallet/services/tokens.ts:3:export type WalletToken = 'AUSD' | 'USDC' | 'CTK';
    artifacts/ausd-wallet/services/tokens.ts:5:export interface WalletTokenInfo {
    artifacts/ausd-wallet/services/tokens.ts:6:  symbol: WalletToken;
    artifacts/ausd-wallet/services/tokens.ts:12:export const WALLET_TOKENS: Record<WalletToken, WalletTokenInfo> = {
    artifacts/ausd-wallet/services/tokens.ts:33:export const TRANSFER_TOKENS: WalletToken[] = ['AUSD', 'USDC'];
    artifacts/ausd-wallet/services/tokens.ts:34:export const STABLECOIN_TOKENS: WalletToken[] = ['AUSD', 'USDC'];
    artifacts/ausd-wallet/services/tokens.ts:36:export function getWalletToken(symbol: string | undefined, fallback: WalletToken = 'AUSD') {
    artifacts/ausd-wallet/services/tokens.ts:37:  const normalized = symbol?.toUpperCase() as WalletToken | undefined;
    artifacts/ausd-wallet/services/tokens.ts:38:  return normalized && WALLET_TOKENS[normalized] ? normalized : fallback;
    artifacts/ausd-wallet/package.json:2:  "name": "@workspace/ausd-wallet",
    artifacts/ausd-wallet/package.json:56:    "@category-labs/mera": "^0.2.0",
    artifacts/ausd-wallet/package.json:60:    "expo-camera": "~57.0.6",
    artifacts/ausd-wallet/package.json:68:    "react-native-passkey": "^3.6.2",
    artifacts/ausd-wallet/state/wallet-context.tsx:12:import type { PasskeyCredentialMetadata } from '@category-labs/mera';
    artifacts/ausd-wallet/state/wallet-context.tsx:14:const LEGACY_STORAGE_KEY = 'ausd-wallet-state-v1';
    artifacts/ausd-wallet/state/wallet-context.tsx:15:const PROFILE_STORAGE_KEY = 'ausd-wallet-profile-v2';
    artifacts/ausd-wallet/state/wallet-context.tsx:16:const TRANSFERS_STORAGE_KEY = 'ausd-wallet-transfers-v2';
    artifacts/ausd-wallet/state/wallet-context.tsx:17:const INTRO_STORAGE_KEY = 'ausd-wallet-intro-complete-v1';
    artifacts/ausd-wallet/state/wallet-context.tsx:20:export type WalletMode = 'demo' | 'mera';
    artifacts/ausd-wallet/state/wallet-context.tsx:22:export interface WalletProfile {
    artifacts/ausd-wallet/state/wallet-context.tsx:27:  mode: WalletMode;
    artifacts/ausd-wallet/state/wallet-context.tsx:28:  passkey?: {
    artifacts/ausd-wallet/state/wallet-context.tsx:29:    credential: PasskeyCredentialMetadata;
    artifacts/ausd-wallet/state/wallet-context.tsx:46:  mode: WalletMode;
    artifacts/ausd-wallet/state/wallet-context.tsx:57:interface WalletState {
    artifacts/ausd-wallet/state/wallet-context.tsx:58:  profile: WalletProfile | null;
    artifacts/ausd-wallet/state/wallet-context.tsx:62:interface WalletContextValue extends WalletState {
    artifacts/ausd-wallet/state/wallet-context.tsx:64:  authenticated: boolean;
    artifacts/ausd-wallet/state/wallet-context.tsx:69:  completeOnboarding: (profile: WalletProfile) => Promise<void>;
    artifacts/ausd-wallet/state/wallet-context.tsx:71:  unlockWallet: () => void;
    artifacts/ausd-wallet/state/wallet-context.tsx:72:  lockWallet: () => void;
    artifacts/ausd-wallet/state/wallet-context.tsx:73:  resetWallet: () => Promise<void>;
    artifacts/ausd-wallet/state/wallet-context.tsx:76:const WalletContext = createContext<WalletContextValue | null>(null);
    artifacts/ausd-wallet/state/wallet-context.tsx:78:export function WalletProvider({ children }: { children: React.ReactNode }) {
    artifacts/ausd-wallet/state/wallet-context.tsx:79:  const [state, setState] = useState<WalletState>({ profile: null, transfers: [] });
    artifacts/ausd-wallet/state/wallet-context.tsx:81:  const [authenticated, setAuthenticated] = useState(false);
    artifacts/ausd-wallet/state/wallet-context.tsx:97:        const legacy = legacyValue ? JSON.parse(legacyValue) as WalletState : null;
    artifacts/ausd-wallet/state/wallet-context.tsx:98:        const legacyProfile = legacy?.profile?.mode === 'mera' ? legacy.profile : null;
    artifacts/ausd-wallet/state/wallet-context.tsx:100:          ? JSON.parse(profileValue) as WalletProfile
    artifacts/ausd-wallet/state/wallet-context.tsx:119:        setState({ profile: profile?.mode === 'mera' ? profile : null, transfers });
    artifacts/ausd-wallet/state/wallet-context.tsx:125:          ? `Wallet data could not be opened. Your saved data was preserved. ${caught.message}`
    artifacts/ausd-wallet/state/wallet-context.tsx:126:          : 'Wallet data could not be opened. Your saved data was preserved.');
    artifacts/ausd-wallet/state/wallet-context.tsx:138:  const persist = useCallback(async (next: WalletState) => {
    artifacts/ausd-wallet/state/wallet-context.tsx:139:    if (next.profile?.mode === 'mera') {
    artifacts/ausd-wallet/state/wallet-context.tsx:158:    async (profile: WalletProfile) => {
    artifacts/ausd-wallet/state/wallet-context.tsx:159:      if (profile.mode !== 'mera') throw new Error('A Mera passkey account is required.');
    artifacts/ausd-wallet/state/wallet-context.tsx:161:      setAuthenticated(true);
    artifacts/ausd-wallet/state/wallet-context.tsx:168:      if (!state.profile) throw new Error('Set up a wallet before sending.');
    artifacts/ausd-wallet/state/wallet-context.tsx:177:  const resetWallet = useCallback(async () => {
    artifacts/ausd-wallet/state/wallet-context.tsx:183:    setAuthenticated(false);
    artifacts/ausd-wallet/state/wallet-context.tsx:186:  const unlockWallet = useCallback(() => setAuthenticated(true), []);
    artifacts/ausd-wallet/state/wallet-context.tsx:187:  const lockWallet = useCallback(() => setAuthenticated(false), []);
    artifacts/ausd-wallet/state/wallet-context.tsx:193:      authenticated,
    artifacts/ausd-wallet/state/wallet-context.tsx:200:      unlockWallet,
    artifacts/ausd-wallet/state/wallet-context.tsx:201:      lockWallet,
    artifacts/ausd-wallet/state/wallet-context.tsx:202:      resetWallet,
    artifacts/ausd-wallet/state/wallet-context.tsx:204:    [state, ready, authenticated, introComplete, storageError, completeIntro, completeOnboarding, addTransfer, unlockWallet, lockWallet, resetWallet],
    artifacts/ausd-wallet/state/wallet-context.tsx:207:  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
    artifacts/ausd-wallet/state/wallet-context.tsx:210:export function useWallet() {
    artifacts/ausd-wallet/state/wallet-context.tsx:211:  const value = useContext(WalletContext);
    artifacts/ausd-wallet/state/wallet-context.tsx:212:  if (!value) throw new Error('useWallet must be used inside WalletProvider.');
    artifacts/ausd-wallet/services/shared-pockets.ts:2:import type { PasskeySecretVault } from '@category-labs/mera';
    artifacts/ausd-wallet/services/shared-pockets.ts:4:import type { MeraPasskeyProfile } from '@/services/passkey';
    artifacts/ausd-wallet/services/shared-pockets.ts:5:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/shared-pockets.ts:69:export async function loadSharedPockets(account: MeraPasskeyProfile): Promise<SharedPocket[]> {
    artifacts/ausd-wallet/services/shared-pockets.ts:72:  const plaintext = await decryptWithMeraPasskey(account, JSON.parse(stored));
    artifacts/ausd-wallet/services/shared-pockets.ts:76:export async function saveSharedPockets(account: MeraPasskeyProfile, pockets: SharedPocket[]) {
    artifacts/ausd-wallet/services/shared-pockets.ts:77:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(validateSharedPockets(pockets)));
    artifacts/ausd-wallet/services/savings-goals.ts:2:import type { PasskeySecretVault } from '@category-labs/mera';
    artifacts/ausd-wallet/services/savings-goals.ts:3:import type { MeraPasskeyProfile } from '@/services/passkey';
    artifacts/ausd-wallet/services/savings-goals.ts:4:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/savings-goals.ts:35:export async function loadSavingsGoals(account: MeraPasskeyProfile): Promise<SavingsGoal[]> {
    artifacts/ausd-wallet/services/savings-goals.ts:38:  const decoded = JSON.parse(await decryptWithMeraPasskey(account, JSON.parse(stored))) as unknown;
    artifacts/ausd-wallet/services/savings-goals.ts:42:export async function saveSavingsGoals(account: MeraPasskeyProfile, goals: SavingsGoal[]) {
    artifacts/ausd-wallet/services/savings-goals.ts:43:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(goals));
    artifacts/ausd-wallet/services/savings-goals.ts:51:export async function importSavingsVault(account: MeraPasskeyProfile, serialized: string) {
    artifacts/ausd-wallet/services/savings-goals.ts:53:  const decoded = validateGoals(JSON.parse(await decryptWithMeraPasskey(account, vault)) as unknown);
    artifacts/ausd-wallet/services/savings-pockets.ts:17:  type MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:19:} from '@/services/passkey';
    artifacts/ausd-wallet/services/savings-pockets.ts:216:    throw new Error('A valid Mera smart-account address is required to create a savings pocket.');
    artifacts/ausd-wallet/services/savings-pockets.ts:248:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:319:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:334:  const walletBalance = await publicClient.readContract({
    artifacts/ausd-wallet/services/savings-pockets.ts:340:  if (walletBalance < amountRaw) throw new Error(`Your smart account has ${formatUnits(walletBalance, 6)} AUSD available.`);
    artifacts/ausd-wallet/services/savings-pockets.ts:365:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:371:  if (!isAddress(recipient, { strict: false })) throw new Error('Enter a valid recipient wallet address.');
    artifacts/ausd-wallet/services/savings-pockets.ts:389:  const walletBalance = await publicClient.readContract({
    artifacts/ausd-wallet/services/savings-pockets.ts:395:  if (walletBalance < totalRaw) {
    artifacts/ausd-wallet/services/savings-pockets.ts:396:    throw new Error(`You need ${breakdown.totalDebit} AUSD for the payment and savings allocation; the account has ${formatUnits(walletBalance, 6)} AUSD.`);
    artifacts/ausd-wallet/services/savings-pockets.ts:421:  if (!isAddress(owner, { strict: false })) throw new Error('The wallet address is invalid.');
    artifacts/ausd-wallet/services/savings-pockets.ts:433:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:438:  if (!isAddress(recipient, { strict: false })) throw new Error('Choose a valid recipient wallet address.');
    artifacts/ausd-wallet/services/savings-pockets.ts:449:  const walletBalance = await publicClient.readContract({
    artifacts/ausd-wallet/services/savings-pockets.ts:455:  if (walletBalance < amountRaw) throw new Error(`Your smart account has ${formatUnits(walletBalance, 6)} AUSD available.`);
    artifacts/ausd-wallet/services/savings-pockets.ts:471:export function giftToPersonSponsored(account: MeraPasskeyProfile, recipient: string, amount: string) {
    artifacts/ausd-wallet/services/savings-pockets.ts:475:export function giftToPocketSponsored(account: MeraPasskeyProfile, recipient: string, pocketId: string, amount: string) {
    artifacts/ausd-wallet/services/savings-pockets.ts:479:export async function withdrawGiftSponsored(account: MeraPasskeyProfile, amount: string) {
    artifacts/ausd-wallet/services/passkey.ts:6:import { toViemAccount } from '@category-labs/mera/viem';
    artifacts/ausd-wallet/services/passkey.ts:23:import type { PasskeyCredentialMetadata } from '@category-labs/mera';
    artifacts/ausd-wallet/services/passkey.ts:31:import { WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/services/passkey.ts:33:export interface MeraAccount {
    artifacts/ausd-wallet/services/passkey.ts:36:  credential: PasskeyCredentialMetadata;
    artifacts/ausd-wallet/services/passkey.ts:40:export interface MeraPasskeyProfile {
    artifacts/ausd-wallet/services/passkey.ts:43:  credential: PasskeyCredentialMetadata;
    artifacts/ausd-wallet/services/passkey.ts:68:export function getPasskeyErrorMessage(error: unknown) {
    artifacts/ausd-wallet/services/passkey.ts:69:  if (!(error instanceof Error)) return 'Passkey authentication did not complete. Please try again.';
    artifacts/ausd-wallet/services/passkey.ts:71:  const nativeDetails = getNativePasskeyErrorDetails(shaped.cause);
    artifacts/ausd-wallet/services/passkey.ts:75:    return 'The passkey was created, but this authenticator did not provide Mera’s secure account key. Try a device passkey provider that supports WebAuthn PRF, such as Google Password Manager or iCloud Keychain.';
    artifacts/ausd-wallet/services/passkey.ts:80:  if (shaped.code === 'PASSKEY_OPERATION_FAILED') {
    artifacts/ausd-wallet/services/passkey.ts:82:      ? `The passkey ceremony failed. Native error: ${nativeDetails}`
    artifacts/ausd-wallet/services/passkey.ts:83:      : 'The passkey ceremony failed, but the native platform did not provide additional error details.';
    artifacts/ausd-wallet/services/passkey.ts:86:    return 'Passkey prompt cancelled. You can try again when you’re ready.';
    artifacts/ausd-wallet/services/passkey.ts:88:  return error.message || 'Passkey authentication did not complete. Please try again.';
    artifacts/ausd-wallet/services/passkey.ts:91:function getNativePasskeyErrorDetails(error: unknown): string {
    artifacts/ausd-wallet/services/passkey.ts:137:    throw new Error(`Could not reach https://${rpId}${associationPath}. Publish the native passkey association file on the RP domain, then retry.`);
    artifacts/ausd-wallet/services/passkey.ts:140:    throw new Error(`The passkey association file at https://${rpId}${associationPath} must return JSON directly with HTTP 200. Check the RP domain’s association configuration.`);
    artifacts/ausd-wallet/services/passkey.ts:147:    throw new Error(`The passkey association file at https://${rpId}${associationPath} did not return valid JSON.`);
    artifacts/ausd-wallet/services/passkey.ts:151:    const packageName = Constants.expoConfig?.android?.package ?? 'com.ausd.wallet';
    artifacts/ausd-wallet/services/passkey.ts:168:      throw new Error(`Android passkeys are not associated with ${packageName}. Add the installed APK’s signing-certificate SHA-256 fingerprint to the RP domain’s assetlinks.json, then rebuild and retry.`);
    artifacts/ausd-wallet/services/passkey.ts:177:    throw new Error(`iOS passkeys are not associated with ${iosBundleId}. Add the Apple team and bundle ID to the RP domain’s apple-app-site-association file, then rebuild and retry.`);
    artifacts/ausd-wallet/services/passkey.ts:197:      'Expo Go does not include Mera’s native passkey module. Install the AUSD development build, then open this project with the dev:client command.',
    artifacts/ausd-wallet/services/passkey.ts:201:    throw new Error('Mera passkey accounts require iOS 18 or later.');
    artifacts/ausd-wallet/services/passkey.ts:204:    throw new Error('Mera passkey accounts require Android 9 or later.');
    artifacts/ausd-wallet/services/passkey.ts:207:    const { Passkey } = await import('react-native-passkey');
    artifacts/ausd-wallet/services/passkey.ts:208:    if (!Passkey.isSupported()) {
    artifacts/ausd-wallet/services/passkey.ts:209:      throw new Error('Passkeys are not available on this device. Try a supported device with a screen lock enabled.');
    artifacts/ausd-wallet/services/passkey.ts:213:    throw new Error('This browser does not support passkeys. Try a supported browser.');
    artifacts/ausd-wallet/services/passkey.ts:217:async function getNativeWebAuthnClient() {
    artifacts/ausd-wallet/services/passkey.ts:220:    : (await import('@category-labs/mera/react-native-webauthn-client'))
    artifacts/ausd-wallet/services/passkey.ts:221:        .reactNativeWebAuthnClient;
    artifacts/ausd-wallet/services/passkey.ts:224:function signerFromPrf(mera: typeof import('@category-labs/mera'), prfOutput: Uint8Array) {
    artifacts/ausd-wallet/services/passkey.ts:225:  let session: ReturnType<typeof mera.createSecp256k1SigningSession> | undefined;
    artifacts/ausd-wallet/services/passkey.ts:232:    if (!node.privateKey) throw new Error('Mera could not derive the EVM account key.');
    artifacts/ausd-wallet/services/passkey.ts:234:    session = mera.createSecp256k1SigningSession({ privateKey });
    artifacts/ausd-wallet/services/passkey.ts:255:export async function createMeraPasskey(name: string, email: string): Promise<MeraAccount> {
    artifacts/ausd-wallet/services/passkey.ts:260:      'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    artifacts/ausd-wallet/services/passkey.ts:265:  const mera = await import('@category-labs/mera');
    artifacts/ausd-wallet/services/passkey.ts:266:  const webAuthnClient = await getNativeWebAuthnClient();
    artifacts/ausd-wallet/services/passkey.ts:267:  const created = await mera.createPasskeyWithPrfOutput({
    artifacts/ausd-wallet/services/passkey.ts:268:    rp: { id: rpId, name: 'AUSD Wallet' },
    artifacts/ausd-wallet/services/passkey.ts:270:    ...(webAuthnClient ? { webAuthnClient } : {}),
    artifacts/ausd-wallet/services/passkey.ts:273:  const signer = signerFromPrf(mera, created.prfOutput);
    artifacts/ausd-wallet/services/passkey.ts:291: * Recover an account from any discoverable passkey synced to this RP.
    artifacts/ausd-wallet/services/passkey.ts:293: * passkey instead of requiring a profile from the previous device.
    artifacts/ausd-wallet/services/passkey.ts:295:export async function recoverMeraPasskey(): Promise<MeraAccount> {
    artifacts/ausd-wallet/services/passkey.ts:300:      'Account recovery needs the same verified HTTPS domain used when the passkey was created. Configure EXPO_PUBLIC_RP_ID and publish the native association files for that domain.',
    artifacts/ausd-wallet/services/passkey.ts:305:  const mera = await import('@category-labs/mera');
    artifacts/ausd-wallet/services/passkey.ts:306:  const webAuthnClient = await getNativeWebAuthnClient();
    artifacts/ausd-wallet/services/passkey.ts:307:  const recovered = await mera.getPasskeyPrfOutput({
    artifacts/ausd-wallet/services/passkey.ts:309:    ...(webAuthnClient ? { webAuthnClient } : {}),
    artifacts/ausd-wallet/services/passkey.ts:311:  const signer = signerFromPrf(mera, recovered.prfOutput);
    artifacts/ausd-wallet/services/passkey.ts:325:export async function getMeraViemSigner(account: MeraPasskeyProfile) {
    artifacts/ausd-wallet/services/passkey.ts:327:  const mera = await import('@category-labs/mera');
    artifacts/ausd-wallet/services/passkey.ts:328:  const webAuthnClient = await getNativeWebAuthnClient();
    artifacts/ausd-wallet/services/passkey.ts:329:  const { prfOutput } = await mera.getPasskeyPrfOutput({
    artifacts/ausd-wallet/services/passkey.ts:332:    ...(webAuthnClient ? { webAuthnClient } : {}),
    artifacts/ausd-wallet/services/passkey.ts:334:  const signer = signerFromPrf(mera, prfOutput);
    artifacts/ausd-wallet/services/passkey.ts:337:    throw new Error('This passkey does not match the wallet saved on this device.');
    artifacts/ausd-wallet/services/passkey.ts:342:/** Encrypts non-wallet app state with a namespaced Mera PRF secret vault. */
    artifacts/ausd-wallet/services/passkey.ts:343:export async function encryptWithMeraPasskey(account: MeraPasskeyProfile, value: string) {
    artifacts/ausd-wallet/services/passkey.ts:344:  const mera = await import('@category-labs/mera');
    artifacts/ausd-wallet/services/passkey.ts:345:  const webAuthnClient = await getNativeWebAuthnClient();
    artifacts/ausd-wallet/services/passkey.ts:348:    return await mera.createSecretVaultWithExistingPasskey({
    artifacts/ausd-wallet/services/passkey.ts:352:      ...(webAuthnClient ? { webAuthnClient } : {}),
    artifacts/ausd-wallet/services/passkey.ts:359:/** Opens Mera-encrypted app state without exposing or persisting PRF output. */
    artifacts/ausd-wallet/services/passkey.ts:360:export async function decryptWithMeraPasskey(account: MeraPasskeyProfile, vault: unknown) {
    artifacts/ausd-wallet/services/passkey.ts:361:  const mera = await import('@category-labs/mera');
    artifacts/ausd-wallet/services/passkey.ts:362:  const webAuthnClient = await getNativeWebAuthnClient();
    artifacts/ausd-wallet/services/passkey.ts:363:  const plaintext = await mera.decryptSecretVaultWithPasskey({
    artifacts/ausd-wallet/services/passkey.ts:365:    vault: mera.parseSecretVault(vault),
    artifacts/ausd-wallet/services/passkey.ts:366:    ...(webAuthnClient ? { webAuthnClient } : {}),
    artifacts/ausd-wallet/services/passkey.ts:375:export async function authenticateMeraPasskey(account: MeraPasskeyProfile): Promise<string> {
    artifacts/ausd-wallet/services/passkey.ts:376:  const signer = await getMeraViemSigner(account);
    artifacts/ausd-wallet/services/passkey.ts:380:      throw new Error('This passkey smart account does not match the wallet saved on this device.');
    artifacts/ausd-wallet/services/passkey.ts:396:export async function getTokenBalance(account: string, token: WalletToken) {
    artifacts/ausd-wallet/services/passkey.ts:397:  if (!isAddress(account, { strict: false })) throw new Error('Invalid Monad wallet address.');
    artifacts/ausd-wallet/services/passkey.ts:398:  const info = WALLET_TOKENS[token];
    artifacts/ausd-wallet/services/passkey.ts:417:  inputSymbol: WalletToken;
    artifacts/ausd-wallet/services/passkey.ts:418:  outputSymbol: WalletToken;
    artifacts/ausd-wallet/services/passkey.ts:431:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/passkey.ts:439:  const signer = await getMeraViemSigner(account);
    artifacts/ausd-wallet/services/passkey.ts:443:      throw new Error('The passkey-derived smart account changed. Stop and restore the matching wallet before signing.');
    artifacts/ausd-wallet/services/passkey.ts:478:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/passkey.ts:486:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/passkey.ts:489:  token: WalletToken,
    artifacts/ausd-wallet/services/passkey.ts:491:  if (!isAddress(recipient, { strict: false })) throw new Error('Enter a valid recipient wallet address.');
    artifacts/ausd-wallet/services/passkey.ts:492:  if (recipient.toLowerCase() === account.address.toLowerCase()) throw new Error('Choose a recipient other than your own wallet.');
    artifacts/ausd-wallet/services/passkey.ts:499:    amountIn = parseUnits(amount, WALLET_TOKENS[token].decimals);
    artifacts/ausd-wallet/services/passkey.ts:501:    throw new Error(`Enter a valid ${token} amount with at most ${WALLET_TOKENS[token].decimals} decimal places.`);
    artifacts/ausd-wallet/services/passkey.ts:505:  const signer = await getMeraViemSigner(account);
    artifacts/ausd-wallet/services/passkey.ts:509:      throw new Error('The passkey-derived smart account changed. Stop and restore the matching wallet before sending.');
    artifacts/ausd-wallet/services/passkey.ts:512:      publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'decimals' }),
    artifacts/ausd-wallet/services/passkey.ts:513:      publicClient.readContract({ address: WALLET_TOKENS[token].address, abi: balanceAbi, functionName: 'balanceOf', args: [kernelAccount.address] }),
    artifacts/ausd-wallet/services/passkey.ts:515:    if (decimals !==
    ... command output truncated for persistence ...
    ce.</Text>
    artifacts/ausd-wallet/app/create-account.tsx:106:          <Text style={[styles.securityText, { color: colors.mutedForeground }]}>Recovery must use the same RP domain and a passkey provider that supports WebAuthn PRF.</Text>
    artifacts/ausd-wallet/app/create-account.tsx:126:        <Title>{isRecovery ? 'Bring your wallet back.' : 'Let’s set up your wallet.'}</Title>
    artifacts/ausd-wallet/app/create-account.tsx:127:        <Text style={[styles.body, { color: colors.mutedForeground }]}>{isRecovery ? 'Choose your synced Mera passkey, then add the name and email you want to use on this device.' : 'Add your details, then create a passkey to protect your wallet.'}</Text>
    artifacts/ausd-wallet/app/create-account.tsx:135:        <Text style={[styles.securityText, { color: colors.mutedForeground }]}>Mera uses your device security: fingerprint, face, or screen lock. The passkey approves sends; there’s no separate password.</Text>
    artifacts/ausd-wallet/app/create-account.tsx:139:        <PrimaryButton label={isRecovery ? 'Recover with passkey' : 'Create passkey'} icon="key" loading={busy} onPress={isRecovery ? recoverAccount : createAccount} testID={isRecovery ? 'recover-passkey' : 'create-passkey'} />
    artifacts/ausd-wallet/app/savings-goals.tsx:7:import { getAUSDBalance } from '@/services/passkey';
    artifacts/ausd-wallet/app/savings-goals.tsx:20:import { loadContacts, type WalletContact } from '@/services/contacts';
    artifacts/ausd-wallet/app/savings-goals.tsx:28:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/savings-goals.tsx:35:  const { profile } = useWallet();
    artifacts/ausd-wallet/app/savings-goals.tsx:51:  const [contacts, setContacts] = useState<WalletContact[]>([]);
    artifacts/ausd-wallet/app/savings-goals.tsx:58:  const account = profile?.mode === 'mera' && profile.address && profile.signerAddress && profile.passkey
    artifacts/ausd-wallet/app/savings-goals.tsx:59:    ? { address: profile.address, signerAddress: profile.signerAddress, credential: profile.passkey.credential, rpId: profile.passkey.rpId }
    artifacts/ausd-wallet/app/savings-goals.tsx:82:      const [savedGoals, walletBalance, savedSharedPockets, savedContacts, receivedGifts] = await Promise.all([
    artifacts/ausd-wallet/app/savings-goals.tsx:98:      setBalance(Number(walletBalance));
    artifacts/ausd-wallet/app/savings-goals.tsx:114:    if (!account) return setError('Unlock your Mera wallet before tracking a shared pocket.');
    artifacts/ausd-wallet/app/savings-goals.tsx:144:    if (!account) return setError('Unlock your Mera wallet before sending a gift.');
    artifacts/ausd-wallet/app/savings-goals.tsx:155:          { text: 'Confirm with passkey', onPress: () => resolve(true) },
    artifacts/ausd-wallet/app/savings-goals.tsx:195:      Alert.alert('Gift received', `${result.amount} AUSD was sent to your wallet.\n\n${result.transactionHash}`);
    artifacts/ausd-wallet/app/savings-goals.tsx:212:    if (!account) return setError('Unlock your Mera wallet before creating a pocket.');
    artifacts/ausd-wallet/app/savings-goals.tsx:245:      Alert.alert('Savings pocket ready', `${txNote} No AUSD moved. Your plan is encrypted with your Mera passkey.`);
    artifacts/ausd-wallet/app/savings-goals.tsx:254:    if (!account) return setError('Unlock your Mera wallet before activating a pocket.');
    artifacts/ausd-wallet/app/savings-goals.tsx:296:    if (balance === null || amount > balance) return setError('That is more than your available wallet AUSD balance.');
    artifacts/ausd-wallet/app/savings-goals.tsx:297:    if (!account) return setError('Unlock your Mera wallet before depositing.');
    artifacts/ausd-wallet/app/savings-goals.tsx:317:    await Share.share({ message: backup, title: 'Encrypted Mera savings plan backup' });
    artifacts/ausd-wallet/app/savings-goals.tsx:329:      Alert.alert('Plan restored', 'Your encrypted savings plan was opened with your Mera passkey.');
    artifacts/ausd-wallet/app/savings-goals.tsx:345:      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Make a plan, set aside AUSD, and track your progress with your passkey.</Text>
    artifacts/ausd-wallet/app/savings-goals.tsx:348:        <InlineNotice icon="key">Savings plans are protected by Mera. Create or unlock a Mera passkey wallet to get started.</InlineNotice>
    artifacts/ausd-wallet/app/savings-goals.tsx:361:              {balance === null ? 'Wallet balance loading…' : `${money(balance)} AUSD in your wallet`}
    artifacts/ausd-wallet/app/savings-goals.tsx:366:          <InlineNotice icon="lock">Goal details are encrypted with a separate Mera PRF namespace. Deposits and payment auto-saves move Monad testnet AUSD into the deployed pocket contract; older goals without an on-chain pocket remain local tracking only.</InlineNotice>
    artifacts/ausd-wallet/app/savings-goals.tsx:410:            {giftBalance !== null && Number(giftBalance) > 0 ? <View style={styles.receivedGift}><Text style={[styles.pocketMeta, { color: colors.mutedForeground }]}>Received gifts waiting for you: {money(Number(giftBalance))} AUSD</Text><PrimaryButton label="Withdraw to wallet" icon="download" secondary loading={saving} onPress={() => void withdrawReceivedGifts()} /></View> : null}
    artifacts/ausd-wallet/app/savings-goals.tsx:513:          <Text style={[styles.privacy, { color: colors.mutedForeground }]}>Goal labels are encrypted on this device; pocket balances and transactions are read from Monad testnet. Your passkey can recreate the decryption key on another supported device.</Text>
    artifacts/ausd-wallet/app/savings-goals.tsx:516:            <Text style={[styles.summaryMeta, { color: colors.mutedForeground }]}>Share or copy this encrypted backup, then restore it on a device with the same passkey and app domain.</Text>
    artifacts/ausd-wallet/app/savings-goals.tsx:534:              <PrimaryButton label="Restore with passkey" icon="key" loading={saving} onPress={() => void restoreBackup()} />
    artifacts/ausd-wallet/app/review.tsx:7:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/review.tsx:12:} from '@/services/passkey';
    artifacts/ausd-wallet/app/review.tsx:18:import { getWalletToken, WALLET_TOKENS } from '@/services/tokens';
    artifacts/ausd-wallet/app/review.tsx:36:  const { profile, addTransfer } = useWallet();
    artifacts/ausd-wallet/app/review.tsx:45:  const inputToken = getWalletToken(params.inputToken, 'AUSD');
    artifacts/ausd-wallet/app/review.tsx:46:  const outputToken = getWalletToken(params.outputToken, tokenSwap ? 'USDC' : 'CTK');
    artifacts/ausd-wallet/app/review.tsx:48:  const sendToken = autoSave ? 'AUSD' : settlement ? inputToken : getWalletToken(params.token, 'AUSD');
    artifacts/ausd-wallet/app/review.tsx:69:      setError('Your wallet session has ended. Return to setup and try again.');
    artifacts/ausd-wallet/app/review.tsx:72:    if (profile.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
    artifacts/ausd-wallet/app/review.tsx:73:      setError('A Mera passkey wallet is required to send AUSD. Demo wallets cannot submit transactions.');
    artifacts/ausd-wallet/app/review.tsx:77:      setError('Enter a valid Monad-compatible wallet address for the recipient.');
    artifacts/ausd-wallet/app/review.tsx:90:        credential: profile.passkey.credential,
    artifacts/ausd-wallet/app/review.tsx:91:        rpId: profile.passkey.rpId,
    artifacts/ausd-wallet/app/review.tsx:106:          : await sendSponsoredTokenTransfer(account, recipient, String(params.amount), getWalletToken(params.token, 'AUSD'));
    artifacts/ausd-wallet/app/review.tsx:113:      const sentCurrency = autoSaveResult ? 'AUSD' : settlementResult?.inputSymbol ?? getWalletToken(params.token, 'AUSD');
    artifacts/ausd-wallet/app/review.tsx:189:            {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} <Text style={[styles.amountUnit, { color: colors.mutedForeground }]}>{sendToken}</Text>
    artifacts/ausd-wallet/app/review.tsx:203:              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>TOTAL WALLET DEBIT</Text>
    artifacts/ausd-wallet/app/review.tsx:215:              ? quoteOutput ? `${Number(quoteOutput).toLocaleString('en-US', { maximumFractionDigits: WALLET_TOKENS[outputToken].decimals })} ${outputToken}` : 'Quote unavailable'
    artifacts/ausd-wallet/app/review.tsx:216:              : `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: WALLET_TOKENS[sendToken].decimals })} ${sendToken}`}
    artifacts/ausd-wallet/app/review.tsx:227:          <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{swapOnly ? 'OUTPUT WALLET' : 'TO'}</Text>
    artifacts/ausd-wallet/app/review.tsx:241:      {settlement ? <Text style={[styles.firstTimeNote, { color: colors.mutedForeground }]}>First use may enable this testnet wallet and approve the pair. One passkey approval covers the sponsored batch.</Text> : null}
    artifacts/ausd-wallet/app/review.tsx:247:            <Text style={[styles.networkCaption, { color: colors.mutedForeground }]}>Approve with your passkey, then we’ll wait for Monad testnet to confirm.</Text>
    artifacts/ausd-wallet/app/review.tsx:268:      <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>Passkey approval required · Monad testnet only</Text>
    artifacts/ausd-wallet/app/success.tsx:83:              Total wallet debit: {Number(params.totalDebit ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} AUSD
    artifacts/ausd-wallet/app/success.tsx:119:        label="Back to wallet"
    artifacts/ausd-wallet/app/success.tsx:121:        testID="back-to-wallet"
    artifacts/ausd-wallet/app/contacts.tsx:8:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/contacts.tsx:9:import { exportContactsVault, importContactsVault, loadContacts, saveContacts, type WalletContact } from '@/services/contacts';
    artifacts/ausd-wallet/app/contacts.tsx:13:  const { profile } = useWallet();
    artifacts/ausd-wallet/app/contacts.tsx:14:  const [contacts, setContacts] = useState<WalletContact[]>([]);
    artifacts/ausd-wallet/app/contacts.tsx:23:  const account = useMemo(() => profile?.mode === 'mera' && profile.address && profile.signerAddress && profile.passkey
    artifacts/ausd-wallet/app/contacts.tsx:24:    ? { address: profile.address, signerAddress: profile.signerAddress, credential: profile.passkey.credential, rpId: profile.passkey.rpId }
    artifacts/ausd-wallet/app/contacts.tsx:45:  async function commit(next: WalletContact[]) {
    artifacts/ausd-wallet/app/contacts.tsx:54:      Alert.alert('Contacts protected', 'Your contacts are encrypted with your Mera passkey.');
    artifacts/ausd-wallet/app/contacts.tsx:87:      await Share.share({ title: 'Encrypted Mera contacts backup', message: backup });
    artifacts/ausd-wallet/app/contacts.tsx:101:      Alert.alert('Contacts restored', 'Your encrypted contacts were opened with your Mera passkey.');
    artifacts/ausd-wallet/app/contacts.tsx:119:      {!account ? <InlineNotice icon="key">Create or unlock a Mera passkey wallet to use encrypted contacts.</InlineNotice> : <>
    artifacts/ausd-wallet/app/contacts.tsx:120:        <InlineNotice icon="lock">Names and addresses are encrypted with Mera before they are stored on this device. There is no shared username directory.</InlineNotice>
    artifacts/ausd-wallet/app/contacts.tsx:126:          <PrimaryButton label="Save contact with passkey" icon="lock" loading={saving} onPress={addContact} />
    artifacts/ausd-wallet/app/contacts.tsx:155:          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Share or copy the encrypted backup, then restore it with the same passkey and app domain.</Text>
    artifacts/ausd-wallet/app/contacts.tsx:163:            <PrimaryButton label="Restore with passkey" icon="key" loading={saving} onPress={() => void restoreBackup()} />
    artifacts/ausd-wallet/app/aurora-deposit.tsx:9:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/aurora-deposit.tsx:29:  const { profile } = useWallet();
    artifacts/ausd-wallet/app/aurora-deposit.tsx:53:      if (!current) throw new Error('Aurora does not currently list this wallet’s Monad AUSD token as a destination asset.');
    artifacts/ausd-wallet/app/aurora-deposit.tsx:78:    if (!profile?.address || profile.mode !== 'mera') return setQuoteError('Set up a Mera passkey wallet before creating a cross-chain deposit.');
    artifacts/ausd-wallet/app/aurora-deposit.tsx:118:    SUCCESS: 'AUSD was delivered to your Monad wallet.',
    artifacts/ausd-wallet/app/aurora-deposit.tsx:132:      {profile?.mode !== 'mera' ? <InlineNotice icon="info">A Mera passkey wallet is required as the Monad AUSD destination.</InlineNotice> : null}
    artifacts/ausd-wallet/app/aurora-deposit.tsx:152:        <Text style={[styles.help, { color: colors.mutedForeground }]}>Only supported EVM assets are listed so refunds can use your 0x wallet address.</Text>
    artifacts/ausd-wallet/app/aurora-deposit.tsx:165:          <Text style={[styles.help, { color: colors.mutedForeground }]} numberOfLines={1}>{profile?.address ?? 'Wallet address unavailable'}</Text>
    artifacts/ausd-wallet/app/aurora-deposit.tsx:172:        <Text style={[styles.help, { color: colors.mutedForeground }]}>Defaults to your Monad wallet address. Change it if you want refunds sent to another EVM address you control.</Text>
    artifacts/ausd-wallet/app/aurora-deposit.tsx:175:      <PrimaryButton label={quoteLoading ? 'Getting quote…' : quote ? 'Refresh deposit quote' : 'Get deposit instructions'} icon="arrow-right" onPress={() => void createQuote()} loading={quoteLoading} disabled={quoteLoading || !getAuroraApiKeyConfigured() || !destination || !selectedAsset || !amountValid || profile?.mode !== 'mera'} />
    artifacts/ausd-wallet/app/aurora-deposit.tsx:197:          <InlineNotice icon="alert-circle">Send only {selectedAsset?.symbol} on {selectedAsset ? chainName(selectedAsset.blockchain) : ''} to this quote address. Sending another token or using another network can lose funds. Refunds, if needed, go to your wallet address on the source EVM chain.</InlineNotice>
    artifacts/ausd-wallet/app/aurora-deposit.tsx:210:      <InlineNotice icon="shield">Each quote creates a one-time Aurora deposit address. Review the token, source network, amount, recipient, and expiry before sending from your external wallet.</InlineNotice>
    artifacts/ausd-wallet/app/swap.tsx:6:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/swap.tsx:7:import { getTokenBalance } from '@/services/passkey';
    artifacts/ausd-wallet/app/swap.tsx:9:import { STABLECOIN_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/app/swap.tsx:16:  const { profile, balance: demoBalance } = useWallet();
    artifacts/ausd-wallet/app/swap.tsx:18:  const [inputToken, setInputToken] = useState<WalletToken>('AUSD');
    artifacts/ausd-wallet/app/swap.tsx:19:  const [outputToken, setOutputToken] = useState<WalletToken>('CTK');
    artifacts/ausd-wallet/app/swap.tsx:22:  const [balance, setBalance] = useState<number | null>(profile?.mode === 'mera' ? null : demoBalance);
    artifacts/ausd-wallet/app/swap.tsx:29:    if (profile?.mode !== 'mera' || !profile.address) return;
    artifacts/ausd-wallet/app/swap.tsx:40:  const enteredDecimals = WALLET_TOKENS[enteredToken].decimals;
    artifacts/ausd-wallet/app/swap.tsx:47:    if (!profile?.address || profile.mode !== 'mera' || !new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`).test(amount) || Number(amount) <= 0) return;
    artifacts/ausd-wallet/app/swap.tsx:64:  const canReview = profile?.mode === 'mera' && Boolean(profile.address && profile.signerAddress && profile.passkey) && Boolean(quote) && !loading && balance !== null && inputAmountValid && amountIn <= balance;
    artifacts/ausd-wallet/app/swap.tsx:74:  function chooseInput(next: WalletToken) {
    artifacts/ausd-wallet/app/swap.tsx:80:  function chooseOutput(next: WalletToken) {
    artifacts/ausd-wallet/app/swap.tsx:102:        <Body>Trade the live AUSD/CTK pair. Your passkey approves the swap on Monad testnet.</Body>
    artifacts/ausd-wallet/app/swap.tsx:125:          {balance !== null && profile?.mode === 'mera' && quoteMode === 'exact-input' ? <Text onPress={() => setAmount(String(balance))} style={[styles.max, { color: colors.primary }]}>MAX</Text> : null}
    artifacts/ausd-wallet/app/swap.tsx:143:          <Text style={[styles.receiverTitle, { color: colors.foreground }]}>Receive in this wallet</Text>
    artifacts/ausd-wallet/app/swap.tsx:144:          <Text numberOfLines={1} style={[styles.balanceText, { color: colors.mutedForeground }]}>{profile?.address ?? 'Wallet address unavailable'}</Text>
    artifacts/ausd-wallet/app/swap.tsx:148:      {profile?.mode !== 'mera' ? <InlineNotice icon="info">Create a Mera passkey wallet to request and approve an on-chain swap. Demo wallets cannot submit transactions.</InlineNotice> : null}
    artifacts/ausd-wallet/app/swap.tsx:156:function TokenSelector({ label, value, options, onChange, colors }: { label: string; value: WalletToken; options: WalletToken[]; onChange: (value: WalletToken) => void; colors: ReturnType<typeof useColors> }) {
    artifacts/ausd-wallet/app/scan.tsx:2:import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
    artifacts/ausd-wallet/app/scan.tsx:20:    if (url.protocol !== 'ausd-wallet:' || url.pathname.replace(/^\/+/, '') !== 'send') return null;
    artifacts/ausd-wallet/app/scan.tsx:35:  const [permission, requestPermission] = useCameraPermissions();
    artifacts/ausd-wallet/app/scan.tsx:43:      setError('This QR code is not a valid AUSD Wallet payment request.');
    artifacts/ausd-wallet/app/scan.tsx:60:        <Card style={styles.messageCard}><Text style={[styles.message, { color: colors.mutedForeground }]}>Checking camera permission…</Text></Card>
    artifacts/ausd-wallet/app/scan.tsx:63:          <Text style={[styles.message, { color: colors.foreground }]}>Camera access is needed to scan a request.</Text>
    artifacts/ausd-wallet/app/scan.tsx:64:          <PrimaryButton label="Allow camera access" icon="camera" onPress={() => void requestPermission()} />
    artifacts/ausd-wallet/app/scan.tsx:67:        <View style={styles.cameraFrame}>
    artifacts/ausd-wallet/app/scan.tsx:68:          <CameraView
    artifacts/ausd-wallet/app/scan.tsx:81:      <InlineNotice icon="shield">Check the recipient and amount on the review screen before approving with your passkey.</InlineNotice>
    artifacts/ausd-wallet/app/scan.tsx:90:  cameraFrame: { aspectRatio: 1, overflow: 'hidden', borderRadius: 12, backgroundColor: '#15191e', alignItems: 'center', justifyContent: 'center' },
    artifacts/ausd-wallet/server/templates/landing-page.html:387:            <p class="step-description">Use your phone's camera or Expo Go</p>
    artifacts/ausd-wallet/app/receive.tsx:8:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/receive.tsx:9:import { TRANSFER_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/app/receive.tsx:24:  const { profile } = useWallet();
    artifacts/ausd-wallet/app/receive.tsx:26:  const [token, setToken] = useState<WalletToken>('AUSD');
    artifacts/ausd-wallet/app/receive.tsx:28:  const hasAddress = profile?.mode === 'mera' && Boolean(profile.address);
    artifacts/ausd-wallet/app/receive.tsx:33:      scheme: 'ausd-wallet',
    artifacts/ausd-wallet/app/receive.tsx:65:        <Body>Share a request. The sender reviews the details and approves with their passkey.</Body>
    artifacts/ausd-wallet/app/receive.tsx:70:          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Create a passkey wallet first</Text>
    artifacts/ausd-wallet/app/receive.tsx:71:          <Text style={[styles.copy, { color: colors.mutedForeground }]}>A receiving address is created with your Mera account.</Text>
    artifacts/ausd-wallet/app/receive.tsx:72:          <PrimaryButton label="Set up wallet" onPress={() => router.replace('/')} icon="arrow-right" />
    artifacts/ausd-wallet/app/receive.tsx:114:            <PrimaryButton label={copied ? 'Address copied' : 'Copy wallet address'} icon={copied ? 'check' : 'copy'} onPress={() => void copyAddress()} secondary />
    artifacts/ausd-wallet/app/receive.tsx:123:            Anyone with this request can see your wallet address and requested amount. No payment is made until the sender approves it.
    artifacts/ausd-wallet/server/serve.js:86:function servePasskeyAssociation(pathname, res) {
    artifacts/ausd-wallet/server/serve.js:90:    const bundleId = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
    artifacts/ausd-wallet/server/serve.js:93:      res.end(JSON.stringify({ error: 'Set AUSD_IOS_TEAM_ID to publish the iOS passkey association.' }));
    artifacts/ausd-wallet/server/serve.js:102:    const packageName = process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet';
    artifacts/ausd-wallet/server/serve.js:109:      res.end(JSON.stringify({ error: 'Set AUSD_ANDROID_SHA256_CERT_FINGERPRINTS to publish Android passkey associations.' }));
    artifacts/ausd-wallet/server/serve.js:180:  if (servePasskeyAssociation(pathname, res)) return;
    artifacts/ausd-wallet/app/(tabs)/settings.tsx:15:        <Title size={21}>Wallet settings are coming soon</Title>
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:5:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:14:  const { profile, transfers: localTransfers } = useWallet();
    artifacts/ausd-wallet/app/(tabs)/activity.tsx:139:                    <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>{autoSave ? 'TOTAL WALLET DEBIT' : 'SENT'}</Text>
    artifacts/ausd-wallet/app/(tabs)/send.tsx:7:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/(tabs)/send.tsx:8:import { getAUSDBalance } from '@/services/passkey';
    artifacts/ausd-wallet/app/(tabs)/send.tsx:26:  const { profile, balance } = useWallet();
    artifacts/ausd-wallet/app/(tabs)/send.tsx:46:  const displayedBalance = profile?.mode === 'mera' ? Number(onchainBalance ?? 0) : balance;
    artifacts/ausd-wallet/app/(tabs)/send.tsx:62:    if (profile?.mode !== 'mera' || !profile.address) return;
    artifacts/ausd-wallet/app/(tabs)/send.tsx:74:    if (!isAddress(recipient.trim(), { strict: false })) return setError('Enter a valid recipient wallet address.');
    artifacts/ausd-wallet/app/(tabs)/send.tsx:78:    if (profile?.mode === 'mera' && onchainBalance === null) return setError(balanceError || 'Wait for your Monad testnet balance to load.');
    artifacts/ausd-wallet/app/(tabs)/send.tsx:104:        <Body>Send AUSD directly to a wallet on Monad testnet. Pimlico sponsorship is requested when you confirm.</Body>
    artifacts/ausd-wallet/app/(tabs)/send.tsx:115:        label="Recipient wallet address"
    artifacts/ausd-wallet/app/(tabs)/send.tsx:144:          {profile?.mode === 'mera'
    artifacts/ausd-wallet/app/(tabs)/send.tsx:205:        Demo wallets cannot send. A Mera passkey smart account and a funded Monad testnet AUSD balance are required.
    artifacts/ausd-wallet/app/(tabs)/_layout.tsx:56:        // The wallet screens provide their own branded headers. The stack
    artifacts/ausd-wallet/app/(tabs)/index.tsx:6:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/(tabs)/index.tsx:7:import { getAUSDBalance, getUSDCBalance } from '@/services/passkey';
    artifacts/ausd-wallet/app/(tabs)/index.tsx:14:export default function WalletHome() {
    artifacts/ausd-wallet/app/(tabs)/index.tsx:17:  const { profile, balance, transfers } = useWallet();
    artifacts/ausd-wallet/app/(tabs)/index.tsx:24:  const isMeraWallet = profile?.mode === 'mera';
    artifacts/ausd-wallet/app/(tabs)/index.tsx:27:    if (!isMeraWallet || !profile?.address) return;
    artifacts/ausd-wallet/app/(tabs)/index.tsx:39:  }, [isMeraWallet, profile?.address]);
    artifacts/ausd-wallet/app/(tabs)/index.tsx:53:  const ausd = isMeraWallet ? (chainBalance === null ? null : Number(chainBalance)) : balance;
    artifacts/ausd-wallet/app/(tabs)/index.tsx:54:  const usdc = isMeraWallet ? (usdcBalance === null ? null : Number(usdcBalance)) : 0;
    artifacts/ausd-wallet/app/(tabs)/index.tsx:69:          <Eyebrow>MONAD WALLET</Eyebrow>
    artifacts/ausd-wallet/app/(tabs)/index.tsx:87:            <Text style={[styles.networkText, { color: colors.foreground }]}>{isMeraWallet ? 'TESTNET' : 'DEMO'}</Text>
    artifacts/ausd-wallet/app/(tabs)/index.tsx:92:          {chainBalanceError || (isMeraWallet ? 'AUSD + USDC on Monad' : 'Demo balance · AUSD')}
    artifacts/ausd-wallet/app/(tabs)/index.tsx:133:                  {openAction === 'deposit' ? 'Get AUSD into your wallet.' : 'Swap AUSD to CTK on Monad testnet.'}
    artifacts/ausd-wallet/app/(tabs)/index.tsx:147:                  <PrimaryButton label="Receive to wallet address" icon="copy" onPress={() => { setOpenAction(null); router.push('/receive'); }} />
    artifacts/ausd-wallet/app/(tabs)/index.tsx:181:          <Text style={[styles.goalSubtitle, { color: colors.mutedForeground }]}>Plan privately with your Mera passkey</Text>
    artifacts/ausd-wallet/app/index.tsx:6:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/index.tsx:7:import { authenticateMeraPasskey, getPasskeyErrorMessage } from '@/services/passkey';
    artifacts/ausd-wallet/app/index.tsx:19:  { eyebrow: 'PAY PEOPLE, SIMPLY', title: 'Dollar value that moves with you.', copy: 'Send AUSD to another wallet or preview a cross-border payout from one straightforward flow.', icon: 'arrow-up-right' as const, accent: 'AUSD', detail: 'Send to anyone' },
    artifacts/ausd-wallet/app/index.tsx:20:  { eyebrow: 'YOUR PASSKEY IS YOUR KEY', title: 'A wallet made for your phone.', copy: 'Mera uses your device passkey to create and unlock your account. No seed phrase to copy or manage.', icon: 'key' as const, accent: 'Mera', detail: 'Face · fingerprint · screen lock' },
    artifacts/ausd-wallet/app/index.tsx:26:  const { ready, profile, authenticated, introComplete, completeIntro, completeOnboarding, unlockWallet } = useWallet();
    artifacts/ausd-wallet/app/index.tsx:35:    if (ready && profile && authenticated) router.replace('/(tabs)');
    artifacts/ausd-wallet/app/index.tsx:37:  }, [ready, profile, authenticated, introComplete]);
    artifacts/ausd-wallet/app/index.tsx:39:  async function continueWithPasskey() {
    artifacts/ausd-wallet/app/index.tsx:41:    if (!profile || profile.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
    artifacts/ausd-wallet/app/index.tsx:42:      setError('This saved account is missing its Mera credential metadata. Reset the local wallet and set it up again.');
    artifacts/ausd-wallet/app/index.tsx:47:      await authenticateMeraPasskey({
    artifacts/ausd-wallet/app/index.tsx:50:        credential: profile.passkey.credential,
    artifacts/ausd-wallet/app/index.tsx:51:        rpId: profile.passkey.rpId,
    artifacts/ausd-wallet/app/index.tsx:53:      unlockWallet();
    artifacts/ausd-wallet/app/index.tsx:56:      setError(getPasskeyErrorMessage(caught));
    artifacts/ausd-wallet/app/index.tsx:77:  async function previewWallet() {
    artifacts/ausd-wallet/app/index.tsx:82:  if (!ready || (profile && authenticated) || (!profile && introComplete)) {
    artifacts/ausd-wallet/app/index.tsx:97:            <Eyebrow>YOUR WALLET IS READY</Eyebrow>
    artifacts/ausd-wallet/app/index.tsx:101:            <Eyebrow>PASSKEY ACCOUNT</Eyebrow>
    artifacts/ausd-wallet/app/index.tsx:105:          <PrimaryButton label="Continue with passkey" icon="key" loading={busy} onPress={continueWithPasskey} testID="continue-passkey" />
    artifacts/ausd-wallet/app/index.tsx:110:          <ScrollView style={styles.carousel} ref={carousel} horizontal pagingEnabled bounces={false} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onCarouselScroll} accessibilityLabel="AUSD Wallet introduction">
    artifacts/ausd-wallet/app/index.tsx:135:          <Pressable testID="preview-wallet" onPress={() => void previewWallet()} style={({ pressed }) => [styles.previewLink, { opacity: pressed ? 0.55 : 1 }]}>
    artifacts/ausd-wallet/app/index.tsx:136:            <Text style={[styles.previewText, { color: colors.foreground }]}>Explore a demo wallet</Text>
    artifacts/ausd-wallet/app/index.tsx:140:          <InlineNotice icon="shield">Your Mera passkey is created after the introduction, on the account setup screen.</InlineNotice>
    artifacts/ausd-wallet/components/Primitives.tsx:72:      accessibilityLabel="AUSD Wallet"
    artifacts/ausd-wallet/app/(tabs)/offramp.tsx:9:  { icon: 'smartphone' as const, title: 'Mobile money', detail: 'Receive on a mobile money wallet' },
    artifacts/ausd-wallet/app/(tabs)/onramp.tsx:20:        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Get AUSD into your wallet.</Text>
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:6:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:21:  const { profile, lockWallet, resetWallet } = useWallet();
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:54:      if (profile?.mode === 'demo') await resetWallet();
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:55:      else lockWallet();
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:75:            {profile?.displayName ?? 'Wallet user'}
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:83:            {profile?.mode === 'mera' ? 'PASSKEY' : 'DEMO'}
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:98:          Read from Agora’s public metrics API. This is not your wallet balance.
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:138:            Counterfactual Kernel account. AUSD must be sent to this address. Mera signer: {profile.signerAddress ?? 'legacy account'}.
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:145:        <Text style={[styles.metricCaption, { color: colors.mutedForeground }]}>Save familiar names for smart-account addresses. Your address book is encrypted with Mera and stays private to you.</Text>
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:154:        label={profile?.mode === 'demo' ? 'Exit demo wallet' : 'Lock this wallet'}
    artifacts/ausd-wallet/app/_layout.tsx:17:import { WalletProvider, useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/_layout.tsx:26:  const { ready, profile, authenticated } = useWallet();
    artifacts/ausd-wallet/app/_layout.tsx:31:    if (isProtectedRoute && (!profile || !authenticated)) router.replace('/');
    artifacts/ausd-wallet/app/_layout.tsx:32:  }, [ready, profile, authenticated, segments]);
    artifacts/ausd-wallet/app/_layout.tsx:74:              <WalletProvider>
    artifacts/ausd-wallet/app/_layout.tsx:76:              </WalletProvider>
    artifacts/ausd-wallet/app/send.tsx:19:import { useWallet } from '@/state/wallet-context';
    artifacts/ausd-wallet/app/send.tsx:20:import { getTokenBalance } from '@/services/passkey';
    artifacts/ausd-wallet/app/send.tsx:22:import { TRANSFER_TOKENS, WALLET_TOKENS, type WalletToken } from '@/services/tokens';
    artifacts/ausd-wallet/app/send.tsx:33:  const { profile, balance: demoBalance } = useWallet();
    artifacts/ausd-wallet/app/send.tsx:41:  const [token, setToken] = useState<WalletToken>('AUSD');
    artifacts/ausd-wallet/app/send.tsx:68:    if (profile?.mode !== 'mera' || !profile.address) return;
    artifacts/ausd-wallet/app/send.tsx:78:  const balance = profile?.mode === 'mera' ? availableBalance : demoBalance;
    artifacts/ausd-wallet/app/send.tsx:83:    if (sendMode !== 'settlement' || profile?.mode !== 'mera' || !profile.address || !/^\d+(\.\d{1,6})?$/.test(amount) || Number(amount) <= 0) {
    artifacts/ausd-wallet/app/send.tsx:102:    if (profile?.mode !== 'mera') {
    artifacts/ausd-wallet/app/send.tsx:103:      setError(`Create a Mera passkey wallet to send testnet ${sendMode === 'settlement' ? 'AUSD' : token}.`);
    artifacts/ausd-wallet/app/send.tsx:106:    if (!profile.address || !profile.signerAddress || !profile.passkey) {
    artifacts/ausd-wallet/app/send.tsx:107:      setError('This passkey wallet needs to be set up again before it can send.');
    artifacts/ausd-wallet/app/send.tsx:111:      setError('Enter a valid wallet address.');
    artifacts/ausd-wallet/app/send.tsx:115:      setError(`Enter an amount with up to ${WALLET_TOKENS[sendMode === 'settlement' ? 'AUSD' : token].decimals} decimal places.`);
    artifacts/ausd-wallet/app/send.tsx:182:                <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{sendMode === 'direct' ? 'Direct wallet transfer' : 'Agora instant settlement · testnet'}</Text>
    artifacts/ausd-wallet/app/send.tsx:232:                  {profile?.mode === 'mera'
    artifacts/ausd-wallet/app/send.tsx:236:                {profile?.mode === 'mera' && availableBalance !== null ? (
    artifacts/ausd-wallet/app/send.tsx:261:                accessibilityLabel="Recipient wallet address"
    artifacts/ausd-wallet/app/send.tsx:267:                placeholder="Wallet address"
    ✓ • 83ms

## Assistant

I can access the repo now. The initial finding is structural: this is a local-only Mera wallet, not an application with a conventional identity backend. Privy could provide social identity, but it cannot directly replace the Mera passkey where Mera signs transactions and encrypts local vaults. I’m checking the exact coupling points next.

## Activity

    $ sed -n '1,240p' codemagic.yaml && sed -n '1,150p' artifacts/ausd-wallet/README.md && git status --short
    workflows:
      ausd-wallet-android:
        name: AUSD Wallet Android APK
        max_build_duration: 120
        instance_type: mac_mini_m2
        environment:
          groups:
            - ausd_wallet
          vars:
            AUSD_ANDROID_PACKAGE: com.ausd.wallet
            COREPACK_ENABLE_PROJECT_SPEC: "0"
        triggering:
          events:
            - push
          branch_patterns:
            - pattern: main
              include: true
              source: true
        scripts:
          - name: Set up pnpm
            script: |
              corepack enable
              corepack prepare pnpm@10.26.1 --activate
          - name: Install workspace dependencies
            script: |
              cd "$CM_BUILD_DIR"
              pnpm install --frozen-lockfile
          - name: Generate Android project with Expo
            script: |
              cd "$CM_BUILD_DIR/artifacts/ausd-wallet"
              pnpm exec expo prebuild --platform android --no-install --non-interactive
          - name: Set Android SDK location
            script: |
              echo "sdk.dir=$ANDROID_SDK_ROOT" > "$CM_BUILD_DIR/artifacts/ausd-wallet/android/local.properties"
          - name: Build bundled release APK
            script: |
              cd "$CM_BUILD_DIR/artifacts/ausd-wallet/android"
              ./gradlew assembleRelease
        artifacts:
          - artifacts/ausd-wallet/android/app/build/outputs/apk/release/*.apk
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
    ✓ • 6ms

## Activity

    $ sed -n '1,300p' artifacts/ausd-wallet/app/create-account.tsx && sed -n '1,200p' artifacts/ausd-wallet/app/index.tsx && sed -n '1,150p' artifacts/ausd-wallet/app/_layout.tsx
    import React, { useState } from 'react';
    import { router } from 'expo-router';
    import { StyleSheet, Text, View } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { createMeraPasskey, getPasskeyErrorMessage, recoverMeraPasskey } from '@/services/passkey';
    import { BrandHeader, Card, Eyebrow, Field, Page, PrimaryButton, Title } from '@/components/Primitives';
    
    export default function CreateAccountScreen() {
      const colors = useColors();
      const { ready, profile, introComplete, completeOnboarding, storageError } = useWallet();
      const [displayName, setDisplayName] = useState('');
      const [email, setEmail] = useState('');
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
      const [mode, setMode] = useState<'choice' | 'create' | 'recover'>('choice');
    
      React.useEffect(() => {
        if (ready && (profile || !introComplete)) router.replace('/');
      }, [ready, profile, introComplete]);
    
      async function createAccount() {
        setError('');
        if (storageError) {
          setError('Wallet storage needs attention before a new account can be created. Restart the app and try again.');
          return;
        }
        if (displayName.trim().length < 2) {
          setError('Enter a name with at least two characters.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          setError('Enter a valid email address.');
          return;
        }
    
        setBusy(true);
        try {
          const account = await createMeraPasskey(displayName.trim(), email.trim());
          await completeOnboarding({
            address: account.address,
            signerAddress: account.signerAddress,
            displayName: displayName.trim(),
            email: email.trim(),
            mode: 'mera',
            passkey: { credential: account.credential, rpId: account.rpId },
          });
          router.replace('/(tabs)');
        } catch (caught) {
          setError(getPasskeyErrorMessage(caught));
    
        } finally {
          setBusy(false);
        }
      }
    
      async function recoverAccount() {
        setError('');
        if (storageError) {
          setError('Wallet storage needs attention before account recovery. Restart the app and try again.');
          return;
        }
        if (displayName.trim().length < 2) {
          setError('Enter a name with at least two characters.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          setError('Enter a valid email address.');
          return;
        }
    
        setBusy(true);
        try {
          const account = await recoverMeraPasskey();
          await completeOnboarding({
            address: account.address,
            signerAddress: account.signerAddress,
            displayName: displayName.trim(),
            email: email.trim(),
            mode: 'mera',
            passkey: { credential: account.credential, rpId: account.rpId },
          });
          router.replace('/(tabs)');
        } catch (caught) {
          setError(getPasskeyErrorMessage(caught));
        } finally {
          setBusy(false);
        }
      }
    
      if (!ready || profile || !introComplete) return <View style={[styles.loading, { backgroundColor: colors.background }]} />;
    
      if (mode === 'choice') {
        return (
          <Page contentStyle={styles.page}>
            <BrandHeader />
            <View style={styles.heading}>
              <View style={[styles.icon, { backgroundColor: colors.secondary }]}><Feather name="key" size={22} color={colors.primary} /></View>
              <Eyebrow>YOUR MONAD WALLET</Eyebrow>
              <Title>How would you like to begin?</Title>
              <Text style={[styles.body, { color: colors.mutedForeground }]}>Create a new Mera passkey account, or recover an existing account from a passkey synced to this device.</Text>
            </View>
            <Card style={{ ...styles.securityCard, backgroundColor: colors.secondary }}>
              <Feather name="shield" size={17} color={colors.primary} />
              <Text style={[styles.securityText, { color: colors.mutedForeground }]}>Recovery must use the same RP domain and a passkey provider that supports WebAuthn PRF.</Text>
            </Card>
            {error ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
            <View style={styles.actions}>
              <PrimaryButton label="Create a new account" icon="user-plus" onPress={() => { setError(''); setMode('create'); }} />
              <PrimaryButton label="Recover existing account" icon="refresh-cw" secondary onPress={() => { setError(''); setMode('recover'); }} />
              <Text style={[styles.footnote, { color: colors.mutedForeground }]}>Requires the AUSD development build and a supported device. Testnet only.</Text>
            </View>
          </Page>
        );
      }
    
      const isRecovery = mode === 'recover';
      return (
        <Page contentStyle={styles.page}>
          <Text onPress={() => { setError(''); setMode('choice'); }} style={[styles.back, { color: colors.foreground }]}>← Back</Text>
          <BrandHeader />
          <View style={styles.heading}>
            <View style={[styles.icon, { backgroundColor: colors.secondary }]}><Feather name={isRecovery ? 'refresh-cw' : 'user-plus'} size={22} color={colors.primary} /></View>
            <Eyebrow>{isRecovery ? 'RECOVER ACCOUNT' : 'CREATE ACCOUNT'}</Eyebrow>
            <Title>{isRecovery ? 'Bring your wallet back.' : 'Let’s set up your wallet.'}</Title>
            <Text style={[styles.body, { color: colors.mutedForeground }]}>{isRecovery ? 'Choose your synced Mera passkey, then add the name and email you want to use on this device.' : 'Add your details, then create a passkey to protect your wallet.'}</Text>
          </View>
          <View style={styles.fields}>
            <Field label="Your name" value={displayName} onChangeText={setDisplayName} placeholder="Name shown on your account" autoCapitalize="words" testID="name-input" />
            <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" testID="email-input" />
          </View>
          <Card style={{ ...styles.securityCard, backgroundColor: colors.secondary }}>
            <Feather name="shield" size={17} color={colors.primary} />
            <Text style={[styles.securityText, { color: colors.mutedForeground }]}>Mera uses your device security: fingerprint, face, or screen lock. The passkey approves sends; there’s no separate password.</Text>
          </Card>
          {error ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
          <View style={styles.actions}>
            <PrimaryButton label={isRecovery ? 'Recover with passkey' : 'Create passkey'} icon="key" loading={busy} onPress={isRecovery ? recoverAccount : createAccount} testID={isRecovery ? 'recover-passkey' : 'create-passkey'} />
            <Text style={[styles.footnote, { color: colors.mutedForeground }]}>Requires the AUSD development build and a supported device. Testnet only.</Text>
          </View>
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { flex: 1, justifyContent: 'space-between', gap: 20, paddingTop: 8, paddingBottom: 14 },
      back: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
      loading: { flex: 1 },
      heading: { gap: 12 },
      icon: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
      body: { fontSize: 14, lineHeight: 21, fontFamily: 'Inter_400Regular' },
      fields: { gap: 14 },
      securityCard: { borderWidth: 0, flexDirection: 'row', gap: 11, alignItems: 'flex-start' },
      securityText: { flex: 1, fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
      error: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_500Medium' },
      actions: { gap: 12, marginTop: 'auto' },
      footnote: { textAlign: 'center', fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
    });
    import React, { useEffect, useRef, useState } from 'react';
    import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
    import { router } from 'expo-router';
    import { Feather } from '@expo/vector-icons';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { authenticateMeraPasskey, getPasskeyErrorMessage } from '@/services/passkey';
    import {
      BrandHeader,
      Card,
      Eyebrow,
      InlineNotice,
      Page,
      PrimaryButton,
      Title,
    } from '@/components/Primitives';
    
    const INTRO_PAGES = [
      { eyebrow: 'PAY PEOPLE, SIMPLY', title: 'Dollar value that moves with you.', copy: 'Send AUSD to another wallet or preview a cross-border payout from one straightforward flow.', icon: 'arrow-up-right' as const, accent: 'AUSD', detail: 'Send to anyone' },
      { eyebrow: 'YOUR PASSKEY IS YOUR KEY', title: 'A wallet made for your phone.', copy: 'Mera uses your device passkey to create and unlock your account. No seed phrase to copy or manage.', icon: 'key' as const, accent: 'Mera', detail: 'Face · fingerprint · screen lock' },
      { eyebrow: 'SETTLEMENT PREVIEW', title: 'See the payout before you confirm.', copy: 'Agora Instant Settlement quotes AUSD to a mock payout token on Monad testnet. Confirming submits a testnet transaction; this is not a real-world payout.', icon: 'zap' as const, accent: 'Monad', detail: 'Agora quote · testnet settlement' },
    ];
    
    export default function WelcomeScreen() {
      const colors = useColors();
      const { ready, profile, authenticated, introComplete, completeIntro, completeOnboarding, unlockWallet } = useWallet();
      const { width } = useWindowDimensions();
      const slideWidth = Math.max(280, width - 48);
      const carousel = useRef<ScrollView>(null);
      const [slideIndex, setSlideIndex] = useState(0);
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
    
      useEffect(() => {
        if (ready && profile && authenticated) router.replace('/(tabs)');
        else if (ready && !profile && introComplete) router.replace('/create-account');
      }, [ready, profile, authenticated, introComplete]);
    
      async function continueWithPasskey() {
        setError('');
        if (!profile || profile.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
          setError('This saved account is missing its Mera credential metadata. Reset the local wallet and set it up again.');
          return;
        }
        setBusy(true);
        try {
          await authenticateMeraPasskey({
            address: profile.address,
            signerAddress: profile.signerAddress,
            credential: profile.passkey.credential,
            rpId: profile.passkey.rpId,
          });
          unlockWallet();
          router.replace('/(tabs)');
        } catch (caught) {
          setError(getPasskeyErrorMessage(caught));
        } finally {
          setBusy(false);
        }
      }
    
      function onCarouselScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        setSlideIndex(Math.min(INTRO_PAGES.length - 1, Math.round(event.nativeEvent.contentOffset.x / slideWidth)));
      }
    
      async function advanceIntro() {
        if (slideIndex < INTRO_PAGES.length - 1) {
          const next = slideIndex + 1;
          setSlideIndex(next);
          carousel.current?.scrollTo({ x: next * slideWidth, animated: true });
          return;
        }
        await completeIntro();
        router.replace('/create-account');
      }
    
      async function previewWallet() {
        await completeOnboarding({ displayName: 'Alex', email: 'preview@ausd.app', mode: 'demo' });
        router.replace('/(tabs)');
      }
    
      if (!ready || (profile && authenticated) || (!profile && introComplete)) {
        return (
          <View style={[styles.loading, { backgroundColor: colors.background }]}>
            <ActivityIndicator color={colors.primary} />
          </View>
        );
      }
    
      return (
        <Page contentStyle={styles.page}>
          <BrandHeader />
          {profile ? (
            <View style={styles.returningContent}>
              <View style={styles.hero}>
                <View style={[styles.heroMark, { backgroundColor: colors.secondary }]}><Feather name="key" size={32} color={colors.primary} /></View>
                <Eyebrow>YOUR WALLET IS READY</Eyebrow>
                <Title size={36}>Welcome back.</Title>
              </View>
              <Card style={styles.returningCard}>
                <Eyebrow>PASSKEY ACCOUNT</Eyebrow>
                <Text style={[styles.returningName, { color: colors.foreground }]}>{profile.displayName}</Text>
                {profile.address ? <Text selectable style={[styles.returningAddress, { color: colors.mutedForeground }]}>{profile.address}</Text> : null}
              </Card>
              <PrimaryButton label="Continue with passkey" icon="key" loading={busy} onPress={continueWithPasskey} testID="continue-passkey" />
              {error ? <Text accessibilityRole="alert" style={[styles.errorText, { color: colors.destructive }]}>{error}</Text> : null}
            </View>
          ) : (
            <View style={styles.introContent}>
              <ScrollView style={styles.carousel} ref={carousel} horizontal pagingEnabled bounces={false} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onCarouselScroll} accessibilityLabel="AUSD Wallet introduction">
                {INTRO_PAGES.map((page, index) => (
                  <View key={page.eyebrow} style={[styles.slide, { width: slideWidth }]}>
                    <View style={[styles.slideArtwork, { backgroundColor: index === 1 ? colors.foreground : colors.secondary }]}>
                      <View style={[styles.artworkOrb, { backgroundColor: index === 1 ? colors.primary : colors.background }]}>
                        <Feather name={page.icon} size={36} color={index === 1 ? colors.primaryForeground : colors.primary} />
                      </View>
                      <View style={[styles.artworkTag, { backgroundColor: index === 1 ? '#252525' : colors.background }]}>
                        <Text style={[styles.artworkTagText, { color: index === 1 ? colors.background : colors.foreground }]}>{page.accent}</Text>
                      </View>
                      <View style={[styles.artworkCaption, { backgroundColor: index === 1 ? '#252525' : colors.background }]}>
                        <View style={[styles.artworkDot, { backgroundColor: colors.primary }]} />
                        <Text style={[styles.artworkCaptionText, { color: index === 1 ? colors.background : colors.mutedForeground }]}>{page.detail}</Text>
                      </View>
                    </View>
                    <Eyebrow>{page.eyebrow}</Eyebrow>
                    <Title size={34}>{page.title}</Title>
                    <Text style={[styles.slideCopy, { color: colors.mutedForeground }]}>{page.copy}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.pagination} accessibilityLabel={`Page ${slideIndex + 1} of ${INTRO_PAGES.length}`}>
                {INTRO_PAGES.map((page, index) => <View key={page.eyebrow} style={[styles.pageDot, { backgroundColor: index === slideIndex ? colors.primary : colors.border, width: index === slideIndex ? 24 : 7 }]} />)}
              </View>
              <PrimaryButton label={slideIndex === INTRO_PAGES.length - 1 ? 'Create your account' : 'Continue'} icon={slideIndex === INTRO_PAGES.length - 1 ? 'user-plus' : 'arrow-right'} onPress={() => void advanceIntro()} testID={slideIndex === INTRO_PAGES.length - 1 ? 'intro-create-account' : 'intro-continue'} />
              <Pressable testID="preview-wallet" onPress={() => void previewWallet()} style={({ pressed }) => [styles.previewLink, { opacity: pressed ? 0.55 : 1 }]}>
                <Text style={[styles.previewText, { color: colors.foreground }]}>Explore a demo wallet</Text>
                <Text style={[styles.arrow, { color: colors.primary }]}>→</Text>
              </Pressable>
              <Text style={[styles.footerText, { color: colors.mutedForeground }]}>Swipe to explore · Monad testnet · test tokens only</Text>
              <InlineNotice icon="shield">Your Mera passkey is created after the introduction, on the account setup screen.</InlineNotice>
            </View>
          )}
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { flex: 1, justifyContent: 'space-between', gap: 18, paddingTop: 10, paddingBottom: 16 },
      loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
      hero: { gap: 15, paddingTop: 6 },
      introContent: { flex: 1, gap: 14, justifyContent: 'space-between' },
      carousel: { flex: 1 },
      returningContent: { flex: 1, justifyContent: 'center', gap: 22 },
      slide: { gap: 15, paddingHorizontal: 24, paddingTop: 6 },
      slideArtwork: { height: 240, borderRadius: 30, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', marginBottom: 7 },
      artworkOrb: { width: 108, height: 108, borderRadius: 38, alignItems: 'center', justifyContent: 'center' },
      artworkTag: { position: 'absolute', top: 25, right: 23, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 9 },
      artworkTagText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
      artworkCaption: { position: 'absolute', bottom: 22, left: 20, borderRadius: 13, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
      artworkDot: { width: 7, height: 7, borderRadius: 4 },
      artworkCaptionText: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
      slideCopy: { fontSize: 14, lineHeight: 21, fontFamily: 'Inter_400Regular' },
      pagination: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 2 },
      pageDot: { height: 7, borderRadius: 4 },
      previewLink: { minHeight: 36, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
      previewText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
      arrow: { fontSize: 17, fontFamily: 'Inter_600SemiBold' },
      returningCard: { gap: 6 },
      returningName: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
      returningAddress: { fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
      heroMark: {
        width: 84,
        height: 84,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
        position: 'relative',
      },
      errorText: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_400Regular' },
      footerText: { fontSize: 10, lineHeight: 15, textAlign: 'center', fontFamily: 'Inter_400Regular' },
    });
    import '../src/polyfills';
    import React, { useEffect } from 'react';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import { GestureHandlerRootView } from 'react-native-gesture-handler';
    import { KeyboardProvider } from 'react-native-keyboard-controller';
    import { SafeAreaProvider } from 'react-native-safe-area-context';
    import { ErrorBoundary } from '@/components/ErrorBoundary';
    import {
      Inter_400Regular,
      Inter_500Medium,
      Inter_600SemiBold,
      Inter_700Bold,
      useFonts,
    } from '@expo-google-fonts/inter';
    import { router, Stack, useSegments } from 'expo-router';
    import * as SplashScreen from 'expo-splash-screen';
    import { WalletProvider, useWallet } from '@/state/wallet-context';
    
    // Prevent the splash screen from auto-hiding before asset loading is complete.
    SplashScreen.preventAutoHideAsync();
    
    const queryClient = new QueryClient();
    
    function RootLayoutNav() {
      const segments = useSegments();
      const { ready, profile, authenticated } = useWallet();
    
      useEffect(() => {
        if (!ready) return;
        const isProtectedRoute = ['(tabs)', 'review', 'success', 'receive', 'scan', 'swap', 'aurora-deposit', 'savings-goals', 'contacts'].includes(segments[0] ?? '');
        if (isProtectedRoute && (!profile || !authenticated)) router.replace('/');
      }, [ready, profile, authenticated, segments]);
    
      return (
        <Stack screenOptions={{ headerBackTitle: 'Back', headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="create-account" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="send" options={{ headerShown: false, presentation: 'transparentModal', animation: 'slide_from_bottom', contentStyle: { backgroundColor: 'transparent' } }} />
          <Stack.Screen name="review" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="success" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
          <Stack.Screen name="receive" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="swap" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="aurora-deposit" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="savings-goals" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="contacts" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="scan" options={{ headerShown: false, animation: 'slide_from_right' }} />
        </Stack>
      );
    }
    
    export default function RootLayout() {
      const [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
      });
    
      useEffect(() => {
        if (fontsLoaded || fontError) {
          SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) return null;
    
      return (
        <SafeAreaProvider>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <GestureHandlerRootView>
                <KeyboardProvider>
                  <WalletProvider>
                    <RootLayoutNav />
                  </WalletProvider>
                </KeyboardProvider>
              </GestureHandlerRootView>
            </QueryClientProvider>
          </ErrorBoundary>
        </SafeAreaProvider>
      );
    }
    ✓ • 2.14s

## Activity

    $ sed -n '1,260p' artifacts/ausd-wallet/services/passkey.ts
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
      return error.message || 'Passkey authentication did not complete. Please try again.';
    }
    
    function getNativePasskeyErrorDetails(error: unknown): string {
      const details: string[] = [];
      let current = error;
    
      for (let depth = 0; depth < 4 && current; depth += 1) {
        if (current instanceof Error) {
          const shaped = current as Error & { code?: unknown; error?: unknown; cause?: unknown };
          const code = typeof shaped.code === 'string' ? shaped.code : undefined;
          const message = shaped.message.trim();
          const detail = [code, message && message !== code ? message : undefined]
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
      const rpId = getRelyingPartyId();
      if (!rpId) {
        throw new Error(
          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ✓ • 5.73s

## Activity

    $ sed -n '1,220p' artifacts/ausd-wallet/app.config.ts && sed -n '1,250p' artifacts/ausd-wallet/server/serve.js && sed -n '1,180p' artifacts/ausd-wallet/app.json
    import type { ConfigContext } from 'expo/config';
    
    function domainHost(value?: string) {
      if (!value) return undefined;
      try {
        return new URL(value.includes('://') ? value : `https://${value}`).hostname;
      } catch {
        return undefined;
      }
    }
    
    export default ({ config }: ConfigContext) => {
      const rpId = domainHost(process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN || "auth.vic-ezealor.workers.dev");
      const bundleIdentifier = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
      const androidPackage = process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet';
    
      return {
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
    };
    /**
     * Standalone production server for Expo static builds.
     *
     * Serves the output of build.js (static-build/) with two special routes:
     * - GET / or /manifest with expo-platform header → platform manifest JSON
     * - GET / without expo-platform → landing page HTML
     * Everything else falls through to static file serving from ./static-build/.
     *
     * Zero external dependencies — uses only Node.js built-ins (http, fs, path).
     */
    
    const http = require('http');
    const fs = require('fs');
    const path = require('path');
    
    const STATIC_ROOT = path.resolve(__dirname, '..', 'static-build');
    const TEMPLATE_PATH = path.resolve(__dirname, 'templates', 'landing-page.html');
    const basePath = (process.env.BASE_PATH || '/').replace(/\/+$/, '');
    
    const MIME_TYPES = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.otf': 'font/otf',
      '.map': 'application/json',
    };
    
    function getAppName() {
      try {
        const appJsonPath = path.resolve(__dirname, '..', 'app.json');
        const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'));
        return typeof appJson.expo?.name === 'string'
          ? appJson.expo.name
          : 'App Landing Page';
      } catch {
        return 'App Landing Page';
      }
    }
    
    function escapeHtml(value) {
      return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }
    
    function toScriptString(value) {
      return JSON.stringify(value)
        .replaceAll('<', '\\u003c')
        .replaceAll('>', '\\u003e')
        .replaceAll('&', '\\u0026');
    }
    
    function serveManifest(platform, res) {
      const manifestPath = path.join(STATIC_ROOT, platform, 'manifest.json');
    
      if (!fs.existsSync(manifestPath)) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(
          JSON.stringify({ error: `Manifest not found for platform: ${platform}` }),
        );
        return;
      }
    
      const manifest = fs.readFileSync(manifestPath, 'utf-8');
      res.writeHead(200, {
        'content-type': 'application/json',
        'expo-protocol-version': '1',
        'expo-sfv-version': '0',
      });
      res.end(manifest);
    }
    
    function servePasskeyAssociation(pathname, res) {
      let document;
      if (pathname === '/.well-known/apple-app-site-association') {
        const teamId = process.env.AUSD_IOS_TEAM_ID;
        const bundleId = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
        if (!teamId) {
          res.writeHead(503, { 'content-type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Set AUSD_IOS_TEAM_ID to publish the iOS passkey association.' }));
          return true;
        }
        document = {
          applinks: {},
          webcredentials: { apps: [`${teamId}.${bundleId}`] },
          appclips: {},
        };
      } else if (pathname === '/.well-known/assetlinks.json') {
        const packageName = process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet';
        const fingerprints = (process.env.AUSD_ANDROID_SHA256_CERT_FINGERPRINTS || '')
          .split(',')
          .map((fingerprint) => fingerprint.trim())
          .filter(Boolean);
        if (fingerprints.length === 0) {
          res.writeHead(503, { 'content-type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Set AUSD_ANDROID_SHA256_CERT_FINGERPRINTS to publish Android passkey associations.' }));
          return true;
        }
        document = [
          {
            relation: [
              'delegate_permission/common.handle_all_urls',
              'delegate_permission/common.get_login_creds',
            ],
            target: { namespace: 'android_app', package_name: packageName, sha256_cert_fingerprints: fingerprints },
          },
        ];
      } else {
        return false;
      }
    
      res.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300',
      });
      res.end(JSON.stringify(document));
      return true;
    }
    
    function serveLandingPage(req, res, landingPageTemplate, appName) {
      const forwardedProto = req.headers['x-forwarded-proto'];
      const protocol = forwardedProto || 'https';
      const host = req.headers['x-forwarded-host'] || req.headers['host'];
      const baseUrl = `${protocol}://${host}`;
      const expsUrl = `exps://${host}${basePath}`;
    
      const html = landingPageTemplate
        .replace(/BASE_URL_PLACEHOLDER/g, baseUrl)
        .replace(/EXPS_URL_ATTRIBUTE_PLACEHOLDER/g, escapeHtml(expsUrl))
        .replace(/EXPS_URL_JSON_PLACEHOLDER/g, toScriptString(expsUrl))
        .replace(/APP_NAME_PLACEHOLDER/g, escapeHtml(appName));
    
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(html);
    }
    
    function serveStaticFile(urlPath, res) {
      const safePath = path.normalize(urlPath).replace(/^(\.\.(\/|\\|$))+/, '');
      const filePath = path.join(STATIC_ROOT, safePath);
    
      if (!filePath.startsWith(STATIC_ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
    
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
    
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'content-type': contentType });
      res.end(content);
    }
    
    const landingPageTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    const appName = getAppName();
    
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      let pathname = url.pathname;
    
      if (servePasskeyAssociation(pathname, res)) return;
    
      if (basePath && pathname.startsWith(basePath)) {
        pathname = pathname.slice(basePath.length) || '/';
      }
    
      if (pathname === '/' || pathname === '/manifest') {
        const platform = req.headers['expo-platform'];
        if (platform === 'ios' || platform === 'android') {
          return serveManifest(platform, res);
        }
    
        if (pathname === '/') {
          return serveLandingPage(req, res, landingPageTemplate, appName);
        }
      }
    
      serveStaticFile(pathname, res);
    });
    
    const port = parseInt(process.env.PORT || '3000', 10);
    server.listen(port, '0.0.0.0', () => {
      console.log(`Serving static Expo build on port ${port}`);
    });
    {
      "expo": {
        "name": "AUSD Wallet",
        "slug": "ausd-wallet",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "ausd-wallet",
        "userInterfaceStyle": "light",
        "splash": {
          "image": "./assets/images/icon.png",
          "resizeMode": "cover",
          "backgroundColor": "#000000"
        },
        "ios": {
          "supportsTablet": false
        },
        "android": {
          "package": "com.ausd.wallet",
          "usesCleartextTraffic": false,
          "adaptiveIcon": {
            "foregroundImage": "./assets/images/icon.png",
            "backgroundColor": "#000000"
          }
        },
        "web": {
          "favicon": "./assets/images/icon.png"
        },
        "plugins": [
          "expo-router",
          "expo-secure-store",
          [
            "expo-camera",
            {
              "cameraPermission": "Allow AUSD Wallet to scan payment requests."
            }
          ]
        ],
        "experiments": {
          "typedRoutes": true,
          "reactCompiler": true
        },
        "extra": {
          "rpId" : "auth.vic-ezealor.workers.dev",
          "eas": {
            "projectId": "f2e6ac36-6687-432f-a553-d5ba8f970cab"
          }
        }
      }
    }
    ✓ • 0ms

## Activity

    $ sed -n '180,520p' artifacts/ausd-wallet/services/passkey.ts
    
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
      const rpId = getRelyingPartyId();
      if (!rpId) {
        throw new Error(
          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
        );
      }
      await assertNativeRpAssociation(rpId);
    
      const mera = await import('@category-labs/mera');
      const webAuthnClient = await getNativeWebAuthnClient();
      const created = await mera.createPasskeyWithPrfOutput({
        rp: { id: rpId, name: 'AUSD Wallet' },
        user: { name: email, displayName: name },
        ...(webAuthnClient ? { webAuthnClient } : {}),
      });
    
      const signer = signerFromPrf(mera, created.prfOutput);
      try {
        const kernelAccount = await createKernelAccount(signer.owner);
        return {
          address: kernelAccount.address,
          signerAddress: signer.owner.address,
          rpId,
          credential: {
            credentialId: created.credentialId,
            ...(created.transports ? { transports: [...created.transports] } : {}),
          },
        };
      } finally {
        signer.session.end();
      }
    }
    
    /**
     * Recover an account from any discoverable passkey synced to this RP.
     * Omitting credential metadata lets the platform choose the user's existing
     * passkey instead of requiring a profile from the previous device.
     */
    export async function recoverMeraPasskey(): Promise<MeraAccount> {
      await assertPlatformSupport();
      const rpId = getRelyingPartyId();
      if (!rpId) {
        throw new Error(
          'Account recovery needs the same verified HTTPS domain used when the passkey was created. Configure EXPO_PUBLIC_RP_ID and publish the native association files for that domain.',
        );
      }
      await assertNativeRpAssociation(rpId);
    
      const mera = await import('@category-labs/mera');
      const webAuthnClient = await getNativeWebAuthnClient();
      const recovered = await mera.getPasskeyPrfOutput({
        rpId,
        ...(webAuthnClient ? { webAuthnClient } : {}),
      });
      const signer = signerFromPrf(mera, recovered.prfOutput);
      try {
        const kernelAccount = await createKernelAccount(signer.owner);
        return {
          address: kernelAccount.address,
          signerAddress: signer.owner.address,
          rpId,
          credential: { credentialId: recovered.credentialId },
        };
      } finally {
        signer.session.end();
      }
    }
    
    export async function getMeraViemSigner(account: MeraPasskeyProfile) {
      await assertPlatformSupport();
      const mera = await import('@category-labs/mera');
      const webAuthnClient = await getNativeWebAuthnClient();
      const { prfOutput } = await mera.getPasskeyPrfOutput({
        rpId: account.rpId,
        credential: account.credential,
        ...(webAuthnClient ? { webAuthnClient } : {}),
      });
      const signer = signerFromPrf(mera, prfOutput);
      if (signer.owner.address.toLowerCase() !== account.signerAddress.toLowerCase()) {
        signer.session.end();
        throw new Error('This passkey does not match the wallet saved on this device.');
      }
      return signer;
    }
    
    /** Encrypts non-wallet app state with a namespaced Mera PRF secret vault. */
    export async function encryptWithMeraPasskey(account: MeraPasskeyProfile, value: string) {
      const mera = await import('@category-labs/mera');
      const webAuthnClient = await getNativeWebAuthnClient();
      const secret = new TextEncoder().encode(value);
      try {
        return await mera.createSecretVaultWithExistingPasskey({
          rpId: account.rpId,
          credential: account.credential,
          secret,
          ...(webAuthnClient ? { webAuthnClient } : {}),
        });
      } finally {
        secret.fill(0);
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
    ✓ • 2.87s

## Activity

    $ rg --files .github && sed -n '1,260p' .github/workflows/build-android-apk.yml && git log --oneline -8
    .github/workflows/build-android-apk.yml
    name: Build Android APK
    
    on:
      push:
      workflow_dispatch:
    
    permissions:
      contents: read
    
    concurrency:
      group: android-apk-${{ github.ref }}
      cancel-in-progress: true
    
    jobs:
      build:
        name: Build AUSD Wallet app APK
        runs-on: ubuntu-latest
        timeout-minutes: 45
        env:
          AUSD_ANDROID_PACKAGE: ${{ vars.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet' }}
          EXPO_PUBLIC_RP_ID: ${{ secrets.EXPO_PUBLIC_RP_ID }}
          EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL: ${{ secrets.EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL }}
          EXPO_PUBLIC_PIMLICO_BUNDLER_URL: ${{ secrets.EXPO_PUBLIC_PIMLICO_BUNDLER_URL }}
          EXPO_PUBLIC_PIMLICO_POLICY_ID: ${{ secrets.EXPO_PUBLIC_PIMLICO_POLICY_ID }}
          EXPO_PUBLIC_ENVIO_GRAPHQL_URL: ${{ vars.EXPO_PUBLIC_ENVIO_GRAPHQL_URL }}
          EXPO_PUBLIC_AURORA_INTENTS_API_KEY: ${{ vars.EXPO_PUBLIC_AURORA_INTENTS_API_KEY }}
    
        steps:
          - name: Check out repository
            uses: actions/checkout@v4
    
          - name: Set up pnpm
            uses: pnpm/action-setup@v4
            with:
              version: 10.26.1
    
          - name: Set up Node.js
            uses: actions/setup-node@v4
            with:
              node-version: 22
              cache: pnpm
    
          - name: Set up Java
            uses: actions/setup-java@v4
            with:
              distribution: temurin
              java-version: '17'
    
          - name: Set up Android SDK
            uses: android-actions/setup-android@v3
            with:
              packages: platform-tools
    
          - name: Install workspace dependencies
            run: pnpm install --frozen-lockfile
    
          - name: Validate wallet build settings
            working-directory: artifacts/ausd-wallet
            shell: bash
            run: |
              missing=()
              for name in EXPO_PUBLIC_RP_ID EXPO_PUBLIC_PIMLICO_BUNDLER_URL; do
                if [[ -z "${!name}" ]]; then
                  missing+=("$name")
                fi
              done
    
              if (( ${#missing[@]} > 0 )); then
                printf '::error::Missing required GitHub Actions secrets: %s\n' "${missing[*]}"
                echo 'Add them under Settings > Secrets and variables > Actions > Repository secrets, then rerun this workflow.'
                exit 1
              fi
    
              rp_host="$(node -e "console.log(new URL(process.env.EXPO_PUBLIC_RP_ID.includes('://') ? process.env.EXPO_PUBLIC_RP_ID : 'https://' + process.env.EXPO_PUBLIC_RP_ID).hostname)")"
              if [[ "$rp_host" != "auth.vic-ezealor.workers.dev" ]]; then
                echo "::error::EXPO_PUBLIC_RP_ID must be auth.vic-ezealor.workers.dev for the published Android association file; received $rp_host"
                exit 1
              fi
              assetlinks="$(curl --fail --silent --show-error --location --max-redirs 0 "https://$rp_host/.well-known/assetlinks.json")"
              if ! printf '%s' "$assetlinks" | node -e "let s=''; process.stdin.on('data', c => s += c).on('end', () => { const entries = JSON.parse(s); const ok = entries.some(e => e.target?.namespace === 'android_app' && e.target?.package_name === (process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet') && e.relation?.includes('delegate_permission/common.get_login_creds') && e.target.sha256_cert_fingerprints?.length); if (!ok) process.exit(1); })"; then
                echo '::error::The RP domain assetlinks.json does not contain the Android package, get_login_creds relation, and certificate fingerprint.'
                exit 1
              fi
    
              if [[ -z "$EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL" ]]; then
                echo '::notice::EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL is unset; the app will use Monad public testnet RPC.'
              fi
              if [[ -z "$EXPO_PUBLIC_PIMLICO_POLICY_ID" ]]; then
                echo '::notice::EXPO_PUBLIC_PIMLICO_POLICY_ID is unset; the bundler URL must select the sponsorship policy.'
              fi
              if [[ -z "$EXPO_PUBLIC_ENVIO_GRAPHQL_URL" ]]; then
                echo '::notice::EXPO_PUBLIC_ENVIO_GRAPHQL_URL is unset; activity will use device-saved transfer history.'
              fi
              if [[ -z "$EXPO_PUBLIC_AURORA_INTENTS_API_KEY" ]]; then
                echo '::notice::EXPO_PUBLIC_AURORA_INTENTS_API_KEY is unset; Aurora Intents deposits will be unavailable.'
              fi
    
          - name: Generate Android project
            working-directory: artifacts/ausd-wallet
            run: pnpm exec expo prebuild --platform android --no-install --non-interactive
    
          - name: Build bundled release APK
            working-directory: artifacts/ausd-wallet/android
            run: ./gradlew --no-daemon assembleRelease
    
          - name: Print Android passkey certificate fingerprint
            working-directory: artifacts/ausd-wallet/android
            run: |
              keytool -list -v \
                -keystore app/debug.keystore \
                -alias androiddebugkey \
                -storepass android \
                -keypass android | grep -E "Alias name|SHA256:"
    
          - name: Upload APK artifact
            uses: actions/upload-artifact@v4
            with:
              name: ausd-wallet-android-${{ github.sha }}
              path: artifacts/ausd-wallet/android/app/build/outputs/apk/release/*.apk
              if-no-files-found: error
              retention-days: 14
    c0e5de8 fixed
    6c3669f Published your App
    efb42a7 added
    79e6bb6 aded
    2e50bf4 added tools
    ee9200c feat: qr scanning
    564accb fixed task
    a6097e9 gottensha
    ✓ • 1.95s

## Activity

    $ sed -n '1,160p' artifacts/ausd-wallet/app.json && rg -n "createMeraPasskey|authenticateMeraPasskey|encryptWithMeraPasskey|decryptWithMeraPasskey|profile\.mode !== 'mera'|mode === 'mera'" artifacts/ausd-wallet --glob '*.{ts,tsx}'
    {
      "expo": {
        "name": "AUSD Wallet",
        "slug": "ausd-wallet",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "ausd-wallet",
        "userInterfaceStyle": "light",
        "splash": {
          "image": "./assets/images/icon.png",
          "resizeMode": "cover",
          "backgroundColor": "#000000"
        },
        "ios": {
          "supportsTablet": false
        },
        "android": {
          "package": "com.ausd.wallet",
          "usesCleartextTraffic": false,
          "adaptiveIcon": {
            "foregroundImage": "./assets/images/icon.png",
            "backgroundColor": "#000000"
          }
        },
        "web": {
          "favicon": "./assets/images/icon.png"
        },
        "plugins": [
          "expo-router",
          "expo-secure-store",
          [
            "expo-camera",
            {
              "cameraPermission": "Allow AUSD Wallet to scan payment requests."
            }
          ]
        ],
        "experiments": {
          "typedRoutes": true,
          "reactCompiler": true
        },
        "extra": {
          "rpId" : "auth.vic-ezealor.workers.dev",
          "eas": {
            "projectId": "f2e6ac36-6687-432f-a553-d5ba8f970cab"
          }
        }
      }
    }
    artifacts/ausd-wallet/state/wallet-context.tsx:98:        const legacyProfile = legacy?.profile?.mode === 'mera' ? legacy.profile : null;
    artifacts/ausd-wallet/state/wallet-context.tsx:119:        setState({ profile: profile?.mode === 'mera' ? profile : null, transfers });
    artifacts/ausd-wallet/state/wallet-context.tsx:139:    if (next.profile?.mode === 'mera') {
    artifacts/ausd-wallet/state/wallet-context.tsx:159:      if (profile.mode !== 'mera') throw new Error('A Mera passkey account is required.');
    artifacts/ausd-wallet/services/shared-pockets.ts:5:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/shared-pockets.ts:72:  const plaintext = await decryptWithMeraPasskey(account, JSON.parse(stored));
    artifacts/ausd-wallet/services/shared-pockets.ts:77:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(validateSharedPockets(pockets)));
    artifacts/ausd-wallet/app/create-account.tsx:7:import { createMeraPasskey, getPasskeyErrorMessage, recoverMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/app/create-account.tsx:40:      const account = await createMeraPasskey(displayName.trim(), email.trim());
    artifacts/ausd-wallet/app/savings-goals.tsx:58:  const account = profile?.mode === 'mera' && profile.address && profile.signerAddress && profile.passkey
    artifacts/ausd-wallet/app/review.tsx:72:    if (profile.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
    artifacts/ausd-wallet/services/savings-goals.ts:4:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/savings-goals.ts:38:  const decoded = JSON.parse(await decryptWithMeraPasskey(account, JSON.parse(stored))) as unknown;
    artifacts/ausd-wallet/services/savings-goals.ts:43:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(goals));
    artifacts/ausd-wallet/services/savings-goals.ts:53:  const decoded = validateGoals(JSON.parse(await decryptWithMeraPasskey(account, vault)) as unknown);
    artifacts/ausd-wallet/app/contacts.tsx:23:  const account = useMemo(() => profile?.mode === 'mera' && profile.address && profile.signerAddress && profile.passkey
    artifacts/ausd-wallet/app/aurora-deposit.tsx:78:    if (!profile?.address || profile.mode !== 'mera') return setQuoteError('Set up a Mera passkey wallet before creating a cross-chain deposit.');
    artifacts/ausd-wallet/services/passkey.ts:255:export async function createMeraPasskey(name: string, email: string): Promise<MeraAccount> {
    artifacts/ausd-wallet/services/passkey.ts:343:export async function encryptWithMeraPasskey(account: MeraPasskeyProfile, value: string) {
    artifacts/ausd-wallet/services/passkey.ts:360:export async function decryptWithMeraPasskey(account: MeraPasskeyProfile, vault: unknown) {
    artifacts/ausd-wallet/services/passkey.ts:375:export async function authenticateMeraPasskey(account: MeraPasskeyProfile): Promise<string> {
    artifacts/ausd-wallet/app/swap.tsx:22:  const [balance, setBalance] = useState<number | null>(profile?.mode === 'mera' ? null : demoBalance);
    artifacts/ausd-wallet/app/swap.tsx:47:    if (!profile?.address || profile.mode !== 'mera' || !new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`).test(amount) || Number(amount) <= 0) return;
    artifacts/ausd-wallet/app/swap.tsx:64:  const canReview = profile?.mode === 'mera' && Boolean(profile.address && profile.signerAddress && profile.passkey) && Boolean(quote) && !loading && balance !== null && inputAmountValid && amountIn <= balance;
    artifacts/ausd-wallet/app/swap.tsx:125:          {balance !== null && profile?.mode === 'mera' && quoteMode === 'exact-input' ? <Text onPress={() => setAmount(String(balance))} style={[styles.max, { color: colors.primary }]}>MAX</Text> : null}
    artifacts/ausd-wallet/services/contacts.ts:5:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/contacts.ts:52:  const plaintext = await decryptWithMeraPasskey(account, JSON.parse(serialized));
    artifacts/ausd-wallet/services/contacts.ts:58:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(validContacts));
    artifacts/ausd-wallet/services/contacts.ts:68:  const plaintext = await decryptWithMeraPasskey(account, vault);
    artifacts/ausd-wallet/app/receive.tsx:28:  const hasAddress = profile?.mode === 'mera' && Boolean(profile.address);
    artifacts/ausd-wallet/app/index.tsx:7:import { authenticateMeraPasskey, getPasskeyErrorMessage } from '@/services/passkey';
    artifacts/ausd-wallet/app/index.tsx:41:    if (!profile || profile.mode !== 'mera' || !profile.address || !profile.signerAddress || !profile.passkey) {
    artifacts/ausd-wallet/app/index.tsx:47:      await authenticateMeraPasskey({
    artifacts/ausd-wallet/app/send.tsx:78:  const balance = profile?.mode === 'mera' ? availableBalance : demoBalance;
    artifacts/ausd-wallet/app/send.tsx:232:                  {profile?.mode === 'mera'
    artifacts/ausd-wallet/app/send.tsx:236:                {profile?.mode === 'mera' && availableBalance !== null ? (
    artifacts/ausd-wallet/app/(tabs)/send.tsx:46:  const displayedBalance = profile?.mode === 'mera' ? Number(onchainBalance ?? 0) : balance;
    artifacts/ausd-wallet/app/(tabs)/send.tsx:78:    if (profile?.mode === 'mera' && onchainBalance === null) return setError(balanceError || 'Wait for your Monad testnet balance to load.');
    artifacts/ausd-wallet/app/(tabs)/send.tsx:144:          {profile?.mode === 'mera'
    artifacts/ausd-wallet/app/(tabs)/index.tsx:24:  const isMeraWallet = profile?.mode === 'mera';
    artifacts/ausd-wallet/app/(tabs)/profile.tsx:83:            {profile?.mode === 'mera' ? 'PASSKEY' : 'DEMO'}
    ✓ • 1.03s

## Activity

    $ sed -n '1,330p' artifacts/ausd-wallet/app/create-account.tsx
    import React, { useState } from 'react';
    import { router } from 'expo-router';
    import { StyleSheet, Text, View } from 'react-native';
    import { Feather } from '@expo/vector-icons';
    import { useColors } from '@/hooks/useColors';
    import { useWallet } from '@/state/wallet-context';
    import { createMeraPasskey, getPasskeyErrorMessage, recoverMeraPasskey } from '@/services/passkey';
    import { BrandHeader, Card, Eyebrow, Field, Page, PrimaryButton, Title } from '@/components/Primitives';
    
    export default function CreateAccountScreen() {
      const colors = useColors();
      const { ready, profile, introComplete, completeOnboarding, storageError } = useWallet();
      const [displayName, setDisplayName] = useState('');
      const [email, setEmail] = useState('');
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
      const [mode, setMode] = useState<'choice' | 'create' | 'recover'>('choice');
    
      React.useEffect(() => {
        if (ready && (profile || !introComplete)) router.replace('/');
      }, [ready, profile, introComplete]);
    
      async function createAccount() {
        setError('');
        if (storageError) {
          setError('Wallet storage needs attention before a new account can be created. Restart the app and try again.');
          return;
        }
        if (displayName.trim().length < 2) {
          setError('Enter a name with at least two characters.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          setError('Enter a valid email address.');
          return;
        }
    
        setBusy(true);
        try {
          const account = await createMeraPasskey(displayName.trim(), email.trim());
          await completeOnboarding({
            address: account.address,
            signerAddress: account.signerAddress,
            displayName: displayName.trim(),
            email: email.trim(),
            mode: 'mera',
            passkey: { credential: account.credential, rpId: account.rpId },
          });
          router.replace('/(tabs)');
        } catch (caught) {
          setError(getPasskeyErrorMessage(caught));
    
        } finally {
          setBusy(false);
        }
      }
    
      async function recoverAccount() {
        setError('');
        if (storageError) {
          setError('Wallet storage needs attention before account recovery. Restart the app and try again.');
          return;
        }
        if (displayName.trim().length < 2) {
          setError('Enter a name with at least two characters.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          setError('Enter a valid email address.');
          return;
        }
    
        setBusy(true);
        try {
          const account = await recoverMeraPasskey();
          await completeOnboarding({
            address: account.address,
            signerAddress: account.signerAddress,
            displayName: displayName.trim(),
            email: email.trim(),
            mode: 'mera',
            passkey: { credential: account.credential, rpId: account.rpId },
          });
          router.replace('/(tabs)');
        } catch (caught) {
          setError(getPasskeyErrorMessage(caught));
        } finally {
          setBusy(false);
        }
      }
    
      if (!ready || profile || !introComplete) return <View style={[styles.loading, { backgroundColor: colors.background }]} />;
    
      if (mode === 'choice') {
        return (
          <Page contentStyle={styles.page}>
            <BrandHeader />
            <View style={styles.heading}>
              <View style={[styles.icon, { backgroundColor: colors.secondary }]}><Feather name="key" size={22} color={colors.primary} /></View>
              <Eyebrow>YOUR MONAD WALLET</Eyebrow>
              <Title>How would you like to begin?</Title>
              <Text style={[styles.body, { color: colors.mutedForeground }]}>Create a new Mera passkey account, or recover an existing account from a passkey synced to this device.</Text>
            </View>
            <Card style={{ ...styles.securityCard, backgroundColor: colors.secondary }}>
              <Feather name="shield" size={17} color={colors.primary} />
              <Text style={[styles.securityText, { color: colors.mutedForeground }]}>Recovery must use the same RP domain and a passkey provider that supports WebAuthn PRF.</Text>
            </Card>
            {error ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
            <View style={styles.actions}>
              <PrimaryButton label="Create a new account" icon="user-plus" onPress={() => { setError(''); setMode('create'); }} />
              <PrimaryButton label="Recover existing account" icon="refresh-cw" secondary onPress={() => { setError(''); setMode('recover'); }} />
              <Text style={[styles.footnote, { color: colors.mutedForeground }]}>Requires the AUSD development build and a supported device. Testnet only.</Text>
            </View>
          </Page>
        );
      }
    
      const isRecovery = mode === 'recover';
      return (
        <Page contentStyle={styles.page}>
          <Text onPress={() => { setError(''); setMode('choice'); }} style={[styles.back, { color: colors.foreground }]}>← Back</Text>
          <BrandHeader />
          <View style={styles.heading}>
            <View style={[styles.icon, { backgroundColor: colors.secondary }]}><Feather name={isRecovery ? 'refresh-cw' : 'user-plus'} size={22} color={colors.primary} /></View>
            <Eyebrow>{isRecovery ? 'RECOVER ACCOUNT' : 'CREATE ACCOUNT'}</Eyebrow>
            <Title>{isRecovery ? 'Bring your wallet back.' : 'Let’s set up your wallet.'}</Title>
            <Text style={[styles.body, { color: colors.mutedForeground }]}>{isRecovery ? 'Choose your synced Mera passkey, then add the name and email you want to use on this device.' : 'Add your details, then create a passkey to protect your wallet.'}</Text>
          </View>
          <View style={styles.fields}>
            <Field label="Your name" value={displayName} onChangeText={setDisplayName} placeholder="Name shown on your account" autoCapitalize="words" testID="name-input" />
            <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" testID="email-input" />
          </View>
          <Card style={{ ...styles.securityCard, backgroundColor: colors.secondary }}>
            <Feather name="shield" size={17} color={colors.primary} />
            <Text style={[styles.securityText, { color: colors.mutedForeground }]}>Mera uses your device security: fingerprint, face, or screen lock. The passkey approves sends; there’s no separate password.</Text>
          </Card>
          {error ? <Text accessibilityRole="alert" style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
          <View style={styles.actions}>
            <PrimaryButton label={isRecovery ? 'Recover with passkey' : 'Create passkey'} icon="key" loading={busy} onPress={isRecovery ? recoverAccount : createAccount} testID={isRecovery ? 'recover-passkey' : 'create-passkey'} />
            <Text style={[styles.footnote, { color: colors.mutedForeground }]}>Requires the AUSD development build and a supported device. Testnet only.</Text>
          </View>
        </Page>
      );
    }
    
    const styles = StyleSheet.create({
      page: { flex: 1, justifyContent: 'space-between', gap: 20, paddingTop: 8, paddingBottom: 14 },
      back: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
      loading: { flex: 1 },
      heading: { gap: 12 },
      icon: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
      body: { fontSize: 14, lineHeight: 21, fontFamily: 'Inter_400Regular' },
      fields: { gap: 14 },
      securityCard: { borderWidth: 0, flexDirection: 'row', gap: 11, alignItems: 'flex-start' },
      securityText: { flex: 1, fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
      error: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_500Medium' },
      actions: { gap: 12, marginTop: 'auto' },
      footnote: { textAlign: 'center', fontSize: 10, lineHeight: 15, fontFamily: 'Inter_400Regular' },
    });
    ✓ • 0ms

## Activity

    $ curl --silent --show-error --location --max-redirs 0 --dump-header - https://auth.vic-ezealor.workers.dev/.well-known/assetlinks.json
    HTTP/2 200
    date: Sun, 11 Oct 2026 02:42:48 GMT
    content-type: application/json
    content-length: 347
    cf-cache-status: HIT
    cache-control: public, max-age=0, must-revalidate
    etag: "71093485591295b1bfe9e2b76fbd5719"
    report-to: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=NR%2Fx4qBocS01qDoOSk4mOihl9pAZCear9djkv9Cn6UKewYPuEM%2F%2FTfxIO8pClH9P%2FvdmEtTCoW8SnXiF4%2BEEJS0AAd79b%2Bu7VVRU%2Bes36WemmnshMl0n%2BgrzYMA4W8mvC386KgK%2B0yGopprgE2dd"}]}
    nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
    server: cloudflare
    cf-ray: a48a837dec1ee1d3-ORD
    alt-svc: h3=":443"; ma=86400
    
    [
      {
        "relation": [
          "delegate_permission/common.get_login_creds"
        ],
        "target": {
          "namespace": "android_app",
          "package_name": "com.ausd.wallet",
          "sha256_cert_fingerprints": [
            "FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C"
          ]
        }
      }
    ]
    ✓ • 48ms

## Activity

    $ rg -n "SHA256|AUSD_ANDROID_SHA|EXPO_PUBLIC_RP_ID|auth\.vic-ezealor|AUSD_IOS" --glob '!pnpm-lock.yaml' --glob '!passkey.md' .
    ./coder.md:1390:    artifacts/ausd-wallet/README.md:11:- `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    ./coder.md:1391:    artifacts/ausd-wallet/README.md:12:- `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
    ./coder.md:1393:    artifacts/ausd-wallet/README.md:14:- `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
    ./coder.md:1397:    artifacts/ausd-wallet/README.md:34:Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    ./coder.md:1398:    artifacts/ausd-wallet/README.md:40:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac7c6f.md:1390:    artifacts/ausd-wallet/README.md:11:- `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac7c6f.md:1391:    artifacts/ausd-wallet/README.md:12:- `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac7c6f.md:1393:    artifacts/ausd-wallet/README.md:14:- `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac7c6f.md:1397:    artifacts/ausd-wallet/README.md:34:Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac7c6f.md:1398:    artifacts/ausd-wallet/README.md:40:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:1390:    artifacts/ausd-wallet/README.md:11:- `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:1391:    artifacts/ausd-wallet/README.md:12:- `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:1393:    artifacts/ausd-wallet/README.md:14:- `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:1397:    artifacts/ausd-wallet/README.md:34:Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:1398:    artifacts/ausd-wallet/README.md:40:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:5937:          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:6285:          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./codex-session-01a11fa2-3c6c-7f40-8c72-bf86d6ac76f.md:6454:       217          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./artifacts/ausd-wallet/app.config.ts:13:  const rpId = domainHost(process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN || "auth.vic-ezealor.workers.dev");
    ./artifacts/ausd-wallet/app.config.ts:14:  const bundleIdentifier = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
    ./artifacts/ausd-wallet/app.json:44:      "rpId" : "auth.vic-ezealor.workers.dev",
    ./artifacts/ausd-wallet/README.md:9:Set `EXPO_PUBLIC_RP_ID` to the hostname that will own the passkey. It must be a verified HTTPS domain and match the app’s native domain associations. If omitted, the Expo development domain is used when available. Native builds also accept:
    ./artifacts/ausd-wallet/README.md:11:- `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    ./artifacts/ausd-wallet/README.md:12:- `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
    ./artifacts/ausd-wallet/README.md:14:- `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
    ./artifacts/ausd-wallet/README.md:36:Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    ./artifacts/ausd-wallet/README.md:42:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    ./artifacts/ausd-wallet/README.md:55:1. Set `EXPO_PUBLIC_RP_ID` to the public HTTPS hostname configured for passkeys, and publish the Android asset links file with the package name and signing certificate SHA-256 fingerprint.
    ./artifacts/ausd-wallet/services/passkey.ts:185:  const configured = process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN;
    ./artifacts/ausd-wallet/services/passkey.ts:260:      'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./artifacts/ausd-wallet/services/passkey.ts:300:      'Account recovery needs the same verified HTTPS domain used when the passkey was created. Configure EXPO_PUBLIC_RP_ID and publish the native association files for that domain.',
    ./artifacts/ausd-wallet/server/serve.js:89:    const teamId = process.env.AUSD_IOS_TEAM_ID;
    ./artifacts/ausd-wallet/server/serve.js:90:    const bundleId = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
    ./artifacts/ausd-wallet/server/serve.js:93:      res.end(JSON.stringify({ error: 'Set AUSD_IOS_TEAM_ID to publish the iOS passkey association.' }));
    ./artifacts/ausd-wallet/server/serve.js:103:    const fingerprints = (process.env.AUSD_ANDROID_SHA256_CERT_FINGERPRINTS || '')
    ./artifacts/ausd-wallet/server/serve.js:109:      res.end(JSON.stringify({ error: 'Set AUSD_ANDROID_SHA256_CERT_FINGERPRINTS to publish Android passkey associations.' }));
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:722:    Set `EXPO_PUBLIC_RP_ID` to the hostname that will own the passkey. It must be a verified HTTPS domain and match the app’s native domain associations. If omitted, the Expo development domain is used when available. Native builds also accept:
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:724:    - `AUSD_IOS_BUNDLE_ID` (defaults to `com.ausd.wallet`)
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:725:    - `AUSD_IOS_TEAM_ID` for the iOS `apple-app-site-association` response
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:727:    - `AUSD_ANDROID_SHA256_CERT_FINGERPRINTS`, comma-separated, for Android `assetlinks.json`
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:749:    Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:755:    To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:768:    1. Set `EXPO_PUBLIC_RP_ID` to the public HTTPS hostname configured for passkeys, and publish the Android asset links file with the package name and signing certificate SHA-256 fingerprint.
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1055:    .github/workflows/build-android-apk.yml:21:      EXPO_PUBLIC_RP_ID: ${{ secrets.EXPO_PUBLIC_RP_ID }}
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1061:    .github/workflows/build-android-apk.yml:62:          for name in EXPO_PUBLIC_RP_ID EXPO_PUBLIC_PIMLICO_BUNDLER_URL; do
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1080:    artifacts/ausd-wallet/README.md:9:Set `EXPO_PUBLIC_RP_ID` to the hostname that will own the passkey. It must be a verified HTTPS domain and match the app’s native domain associations. If omitted, the Expo development domain is used when available. Native builds also accept:
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1087:    artifacts/ausd-wallet/README.md:36:Configure a Codemagic variable group named `ausd_wallet`. Add `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` for Alchemy-backed testnet reads. For passkey use in the installed app, also configure `EXPO_PUBLIC_RP_ID` and the Android package/signing-certificate association values used by the app's `/.well-known/assetlinks.json` endpoint. Download the APK from the Codemagic build artifacts. The existing workflow triggers on pushes to `main`; use Codemagic's manual start action to build another branch.
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1088:    artifacts/ausd-wallet/README.md:42:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1089:    artifacts/ausd-wallet/README.md:55:1. Set `EXPO_PUBLIC_RP_ID` to the public HTTPS hostname configured for passkeys, and publish the Android asset links file with the package name and signing certificate SHA-256 fingerprint.
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1092:    artifacts/ausd-wallet/app.config.ts:13:  const rpId = domainHost(process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN);
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1113:    artifacts/ausd-wallet/services/passkey.ts:143:  const configured = process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN;
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1118:    artifacts/ausd-wallet/services/passkey.ts:218:      'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1377:      const configured = process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN;
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:1452:          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:5024:      const configured = process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN;
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:5099:          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:8120:      const configured = process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN;
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:8195:          'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:8395:    artifacts/ausd-wallet/services/passkey.ts:218:      'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:8920:          "sha256_cert_fingerprints": ["SHA256_FINGERPRINT"]
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:8936:    For an Android development build, print the fingerprint of the generated debug certificate and replace `SHA256_FINGERPRINT` in `assetlinks.json` with the result:
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:9461:      const rpId = domainHost(process.env.EXPO_PUBLIC_RP_ID || process.env.EXPO_PUBLIC_DOMAIN);
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:9462:      const bundleIdentifier = process.env.AUSD_IOS_BUNDLE_ID || 'com.ausd.wallet';
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:9524:- `EXPO_PUBLIC_RP_ID` is not present in [.env.example](/home/runner/workspace/artifacts/ausd-wallet/.env.example).
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:9681:    +      'Account recovery needs the same verified HTTPS domain used when the passkey was created. Configure EXPO_PUBLIC_RP_ID and publish the native association files for that domain.',
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:9749:EXPO_PUBLIC_RP_ID=auth.yourdomain.com
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:9920:    3. Replace `SHA256_FINGERPRINT` with each Android signing certificate's SHA-256
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:9984:          "sha256_cert_fingerprints": ["SHA256_FINGERPRINT"]
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:10174:EXPO_PUBLIC_RP_ID=auth.yourdomain.com
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:10222:EXPO_PUBLIC_RP_ID=auth.ausd.app
    ./codex-session-01a1226f-72a5-7360-a0b6-5c3f1e0342.md:10274:      "sha256_cert_fingerprints": ["YOUR_CERTIFICATE_SHA256"]
    ✓ • 45ms

## Activity

    $ curl --silent --show-error --location --max-redirs 0 --dump-header - https://auth.vic-ezealor.workers.dev/.well-known/apple-app-site-association
    HTTP/2 404
    date: Sun, 11 Oct 2026 02:42:52 GMT
    content-length: 0
    report-to: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=1wwUJ0ILQ49RogG1cJC3oj8hDOrBpkGF7z7ufmBTWLPA50J1bV0GKnNH2odDQoCex7qq4T2yUOzZd%2FPvXcNNb5%2B%2BPhRVVpYvTfvXJff7YaivFYtmQgPExOvYuMPbSE9Y9GemeUEDB%2FXfPmgDKcrA"}]}
    nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
    server: cloudflare
    cf-ray: a48a8396c8e9acae-ORD
    alt-svc: h3=":443"; ma=86400
    
    ✓ • 0ms

## Activity

    Searched the web for site:docs.privy.io React Native Expo social login embedded wallet, site:docs.privy.io react native social login expo Privy SDK

## Assistant

The immediate passkey failure is most likely an Android signing-certificate mismatch, not a missing `assetlinks.json`.

The live association file is valid JSON, returns HTTP 200, and declares:

- Package: `com.ausd.wallet`
- Relation: `delegate_permission/common.get_login_creds`
- SHA-256 certificate: `FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C`

The app is configured for that same package and RP domain in [app.config.ts](/home/runner/workspace/artifacts/ausd-wallet/app.config.ts:13). However, CI builds the APK with `assembleRelease` without a committed release keystore, and the workflow only prints the debug certificate after building. Each build environment can use a different debug signing key, while your domain publishes only one fingerprint. Android then rejects the credential association before Mera can complete its ceremony.

There is also an iOS issue: `/.well-known/apple-app-site-association` currently returns 404.

Privy social sign-in is useful as an onboarding fallback, but it cannot be a drop-in replacement for Mera in this app. Mera’s passkey PRF derives the EVM owner, validates the Kernel account, signs sponsored transfers, and encrypts contacts/savings data. Those dependencies are concentrated in [passkey.ts](/home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts:255), while the app currently refuses all non-Mera profiles in [wallet-context.tsx](/home/runner/workspace/artifacts/ausd-wallet/state/wallet-context.tsx:159).

I recommend:

1. Fix Mera first: obtain the SHA-256 fingerprint from the exact installed APK’s signing certificate, add it to `assetlinks.json` (multiple fingerprints are allowed), then rebuild/reinstall. Move builds to one persistent release keystore so future APKs retain the same identity.

2. Add Privy only as a temporary “Sign in and explore” path. It can create an authenticated social profile and unlock read-only/demo screens, but should keep sending, swaps, savings deposits, encrypted contacts, and wallet recovery behind Mera.

3. If Privy needs to power real transactions, use a Privy embedded EVM wallet and build a separate transaction adapter. That creates a different wallet address and custody/recovery model from the Mera wallet; it should be presented as a separate wallet migration, not a fallback unlock for the same account. Privy supports social auth and embedded wallets, but its access tokens should be verified by a backend before protected actions. [Privy authentication docs](https://docs.privy.io/authentication)

The clean temporary design is: **Privy for identity/demo access; Mera required for the existing Monad wallet.**

## User

check the github action workflow if it prints the correct sha for me

## Assistant

I’ll verify what certificate the workflow actually prints and whether that is the certificate used to sign the generated release APK.

## Activity

    $ nl -ba .github/workflows/build-android-apk.yml | sed -n '80,125p' && test -d artifacts/ausd-wallet/android && rg -n "signingConfig|signingConfigs|storeFile" artifacts/ausd-wallet/android/app/build.gradle artifacts/ausd-wallet/android/app/build.gradle.kts 2>/dev/null || true
        80              if ! printf '%s' "$assetlinks" | node -e "let s=''; process.stdin.on('data', c => s += c).on('end', () => { const entries = JSON.parse(s); const ok = entries.some(e => e.target?.namespace === 'android_app' && e.target?.package_name === (process.env.AUSD_ANDROID_PACKAGE || 'com.ausd.wallet') && e.relation?.includes('delegate_permission/common.get_login_creds') && e.target.sha256_cert_fingerprints?.length); if (!ok) process.exit(1); })"; then
        81                echo '::error::The RP domain assetlinks.json does not contain the Android package, get_login_creds relation, and certificate fingerprint.'
        82                exit 1
        83              fi
        84
        85              if [[ -z "$EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL" ]]; then
        86                echo '::notice::EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL is unset; the app will use Monad public testnet RPC.'
        87              fi
        88              if [[ -z "$EXPO_PUBLIC_PIMLICO_POLICY_ID" ]]; then
        89                echo '::notice::EXPO_PUBLIC_PIMLICO_POLICY_ID is unset; the bundler URL must select the sponsorship policy.'
        90              fi
        91              if [[ -z "$EXPO_PUBLIC_ENVIO_GRAPHQL_URL" ]]; then
        92                echo '::notice::EXPO_PUBLIC_ENVIO_GRAPHQL_URL is unset; activity will use device-saved transfer history.'
        93              fi
        94              if [[ -z "$EXPO_PUBLIC_AURORA_INTENTS_API_KEY" ]]; then
        95                echo '::notice::EXPO_PUBLIC_AURORA_INTENTS_API_KEY is unset; Aurora Intents deposits will be unavailable.'
        96              fi
        97
        98          - name: Generate Android project
        99            working-directory: artifacts/ausd-wallet
       100            run: pnpm exec expo prebuild --platform android --no-install --non-interactive
       101
       102          - name: Build bundled release APK
       103            working-directory: artifacts/ausd-wallet/android
       104            run: ./gradlew --no-daemon assembleRelease
       105
       106          - name: Print Android passkey certificate fingerprint
       107            working-directory: artifacts/ausd-wallet/android
       108            run: |
       109              keytool -list -v \
       110                -keystore app/debug.keystore \
       111                -alias androiddebugkey \
       112                -storepass android \
       113                -keypass android | grep -E "Alias name|SHA256:"
       114
       115          - name: Upload APK artifact
       116            uses: actions/upload-artifact@v4
       117            with:
       118              name: ausd-wallet-android-${{ github.sha }}
       119              path: artifacts/ausd-wallet/android/app/build/outputs/apk/release/*.apk
       120              if-no-files-found: error
       121              retention-days: 14
    artifacts/ausd-wallet/android/app/build.gradle:100:    signingConfigs {
    artifacts/ausd-wallet/android/app/build.gradle:102:            storeFile file('debug.keystore')
    artifacts/ausd-wallet/android/app/build.gradle:110:            signingConfig signingConfigs.debug
    artifacts/ausd-wallet/android/app/build.gradle:115:            signingConfig signingConfigs.debug
    ✓ • 45ms

## Activity

    $ rg -n "signingConfigs.*release|signingConfig signingConfigs\.debug|signingConfig = signingConfigs\.getByName\(\"debug\"\)" node_modules/expo* node_modules/@expo* 2>/dev/null | head -80
    ✓ • 0ms

## Activity

    $ nl -ba artifacts/ausd-wallet/android/app/build.gradle | sed -n '92,120p'; ls -l artifacts/ausd-wallet/android/app/debug.keystore; keytool -list -v -keystore artifacts/ausd-wallet/android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android | grep -E 'Alias name|SHA256:'; keytool -printcert -jarfile artifacts/ausd-wallet/android/app/build/outputs/apk/release/app-release.apk 2>/dev/null | grep -E 'Owner:|SHA256:' || true
        92            applicationId 'com.ausd.wallet'
        93            minSdkVersion rootProject.ext.minSdkVersion
        94            targetSdkVersion rootProject.ext.targetSdkVersion
        95            versionCode 1
        96            versionName "1.0.0"
        97
        98            buildConfigField "String", "REACT_NATIVE_RELEASE_LEVEL", "\"${findProperty('reactNativeReleaseLevel') ?: 'stable'}\""
        99        }
       100        signingConfigs {
       101            debug {
       102                storeFile file('debug.keystore')
       103                storePassword 'android'
       104                keyAlias 'androiddebugkey'
       105                keyPassword 'android'
       106            }
       107        }
       108        buildTypes {
       109            debug {
       110                signingConfig signingConfigs.debug
       111            }
       112            release {
       113                // Caution! In production, you need to generate your own keystore file.
       114                // see https://reactnative.dev/docs/signed-apk-android.
       115                signingConfig signingConfigs.debug
       116                def enableShrinkResources = findProperty('android.enableShrinkResourcesInReleaseBuilds') ?: 'false'
       117                shrinkResources enableShrinkResources.toBoolean()
       118                minifyEnabled enableMinifyInReleaseBuilds
       119                proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
       120                def enablePngCrunchInRelease = findProperty('android.enablePngCrunchInReleaseBuilds') ?: 'true'
    -rw-r--r-- 1 runner runner 2257 Oct  8 01:28 artifacts/ausd-wallet/android/app/debug.keystore
    /bin/bash: line 1: keytool: command not found
    ✓ • 0ms

## Assistant

Yes. The GitHub Action prints the correct SHA-256 for the APK it creates.

The generated Gradle config explicitly signs the `release` build with `signingConfigs.debug`:

```gradle
release {
  signingConfig signingConfigs.debug
}
```

And the workflow prints that exact keystore:

```yaml
keytool -list -v \
  -keystore app/debug.keystore \
  -alias androiddebugkey \
  -storepass android \
  -keypass android
```

So copy the `SHA256:` value from the Action log’s **Print Android passkey certificate fingerprint** step into the `sha256_cert_fingerprints` list served at your RP domain.

The weakness is that the workflow’s earlier validation only confirms `assetlinks.json` contains some fingerprint; it does not compare the printed build fingerprint with the live file. That allows a build to succeed while Android passkey association fails.

## User

I can see the problem in your GitHub Actions workflow: you're building a release APK but printing the fingerprint from app/debug.keystore. Those certificates may be different.

## Assistant

That would be a problem in a normal production setup, but this repo currently signs its release APK with that debug keystore.

Expo generates [build.gradle](/home/runner/workspace/artifacts/ausd-wallet/android/app/build.gradle:112) with:

```gradle
release {
  signingConfig signingConfigs.debug
}
```

The debug config points to `app/debug.keystore`, the same file the workflow queries. So the printed SHA-256 matches this workflow’s release artifact.

The actual fragility is that this is a debug certificate. If the fingerprint published on `auth.vic-ezealor.workers.dev` came from a different machine, runner image, Codemagic build, or a prior generated keystore, Android will reject it. The workflow should compare the APK’s signing certificate fingerprint against the live `assetlinks.json` and fail when they differ.

## User

but its app relase apk and not app debug apk i am installing

## Assistant

You are installing a **release variant** APK (`app-release.apk`), but it is currently **signed with the debug keystore**.

Those are separate things:

- `assembleRelease` controls the APK variant and output name: `app-release.apk`.
- `signingConfig signingConfigs.debug` controls which certificate signs it.

Your generated Gradle file says the release variant uses:

```gradle
release {
  signingConfig signingConfigs.debug
}
```

So the Action’s debug-keystore SHA is the certificate Android sees in the installed `app-release.apk`.

For a production-signed release, the workflow needs a dedicated release keystore and this Gradle configuration must point `release` to it. Then the Action should print the release keystore fingerprint instead.

## User

i think you should add another printing for relase like /apple-app-site-associatio```yaml
      - name: Print actual APK signing certificate
        working-directory: artifacts/ausd-wallet/android
        shell: bash
        run: |
          set -euo pipefail

          APK="$(find app/build/outputs/apk/release \
            -maxdepth 1 -name '*.apk' -print -quit)"

          if [[ -z "$APK" ]]; then
            echo "::error::Release APK not found"
            exit 1
          fi

          APKSIGNER="$(find "$ANDROID_HOME/build-tools" \
            -name apksigner -type f | sort -V | tail -n 1)"

          if [[ -z "$APKSIGNER" ]]; then
            echo "::error::apksigner not found"
            exit 1
          fi

          echo "APK: $APK"
          "$APKSIGNER" verify --print-certs "$APK"
```

## Assistant

I’ll add APK-level certificate output after the release build. This verifies the certificate embedded in the artifact itself, independent of which keystore Gradle was configured to use.

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/.github/workflows/build-android-apk.yml
    @@ -114,2 +114,25 @@
     
    +      - name: Print actual APK signing certificate
    +        working-directory: artifacts/ausd-wallet/android
    +        shell: bash
    +        run: |
    +          set -euo pipefail
    +
    +          APK="$(find app/build/outputs/apk/release -maxdepth 1 -name '*.apk' -print -quit)"
    +
    +          if [[ -z "$APK" ]]; then
    +            echo "::error::Release APK not found"
    +            exit 1
    +          fi
    +
    +          APKSIGNER="$(find "$ANDROID_HOME/build-tools" -name apksigner -type f | sort -V | tail -n 1)"
    +
    +          if [[ -z "$APKSIGNER" ]]; then
    +            echo "::error::apksigner not found"
    +            exit 1
    +          fi
    +
    +          echo "APK: $APK"
    +          "$APKSIGNER" verify --print-certs "$APK"
    +
           - name: Upload APK artifact

## Activity

    $ git diff --check && git diff -- .github/workflows/build-android-apk.yml
    diff --git a/.github/workflows/build-android-apk.yml b/.github/workflows/build-android-apk.yml
    index 961bd96..418a8b8 100644
    --- a/.github/workflows/build-android-apk.yml
    +++ b/.github/workflows/build-android-apk.yml
    @@ -112,6 +112,29 @@ jobs:
                 -storepass android \
                 -keypass android | grep -E "Alias name|SHA256:"
    
    +      - name: Print actual APK signing certificate
    +        working-directory: artifacts/ausd-wallet/android
    +        shell: bash
    +        run: |
    +          set -euo pipefail
    +
    +          APK="$(find app/build/outputs/apk/release -maxdepth 1 -name '*.apk' -print -quit)"
    +
    +          if [[ -z "$APK" ]]; then
    +            echo "::error::Release APK not found"
    +            exit 1
    +          fi
    +
    +          APKSIGNER="$(find "$ANDROID_HOME/build-tools" -name apksigner -type f | sort -V | tail -n 1)"
    +
    +          if [[ -z "$APKSIGNER" ]]; then
    +            echo "::error::apksigner not found"
    +            exit 1
    +          fi
    +
    +          echo "APK: $APK"
    +          "$APKSIGNER" verify --print-certs "$APK"
    +
           - name: Upload APK artifact
             uses: actions/upload-artifact@v4
             with:
    ✓ • 0ms

## Assistant

Added the APK-level verification step to [build-android-apk.yml](/home/runner/workspace/.github/workflows/build-android-apk.yml:115).

After `assembleRelease`, the workflow now locates the generated APK and runs:

```bash
apksigner verify --print-certs "$APK"
```

Use the resulting SHA-256 certificate fingerprint for `assetlinks.json`. `git diff --check` passes.

## User

Incubating] Problems report is available at: file:///home/runner/work/AUSD-Cross-Border-Wallet/AUSD-Cross-Border-Wallet/artifacts/ausd-wallet/android/build/reports/problems/problems-report.html
Deprecated Gradle features were used in this build, making it incompatible with Gradle 10.
You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.
For more on this, please refer to https://docs.gradle.org/9.3.1/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
BUILD SUCCESSFUL in 27m 28s
1030 actionable tasks: 1030 executed
0s
Run keytool -list -v \
  
Warning:
The certificate uses the SHA1withRSA signature algorithm which is considered a security risk. This algorithm will be disabled in a future update.
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore app/debug.keystore -destkeystore app/debug.keystore -deststoretype pkcs12".
Alias name: androiddebugkey
	 SHA256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
1s
Run set -euo pipefail
APK: app/build/outputs/apk/release/app-release.apk
V2 Signer: certificate DN: CN=Android Debug, OU=Android, O=Unknown, L=Unknown, ST=Unknown, C=US
V2 Signer: certificate SHA-256 digest: fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c
V2 Signer: certificate SHA-1 digest: 5e8f16062ea3cd2c4a0d547876baa6f38cabf625
V2 Signer: certificate MD5 digest: 20f46148b72d8e5e5ca23d37a4f41490
6s
Run actions/upload-artifact@v4
  
(node:8869) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
With the provided path, there will be 1 file uploaded
Artifact name is valid!
Root directory input is valid!
Beginning upload of artifact content to blob storage
(node:8869) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
Uploaded bytes 8388608
Uploaded bytes 16777216
Uploaded bytes 25165824
Uploaded bytes 33554432
Uploaded bytes 41943040
Uploaded bytes 50331648
Uploaded bytes 58720256
Uploaded bytes 67108864
Uploaded bytes 71316280
Finished uploading artifact content to blob storage!
SHA256 digest of uploaded artifact zip is 6b9d98ced7baaf52fcda9bce0a77e14022841d5e90ed63c79402507bf53c822d
Finalizing artifact upload
Artifact ausd-wallet-android-7504699dff5cb20d122319b8f05cab4875ad7a78.zip successfully finalized. Artifact ID 11691315321
Artifact ausd-wallet-android-7504699dff5cb20d122319b8f05cab4875ad7a78 has been successfully uploaded! Final size is 71316280 bytes. Artifact ID is 11691315321
Artifact download URL: https://github.com/youngambille-jpg/AUSD-Cross-Border-Wallet/actions/runs/38106821171/artifacts/11691315321

## Assistant

This confirms the APK is correctly signed for the live `assetlinks.json`.

Both fingerprints are the same:

- Published asset link: `FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C`
- Installed `app-release.apk`: `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`

Case and colon formatting do not matter. The release APK is signed by the Android Debug certificate, but it is the exact certificate published for `com.ausd.wallet`.

So the RP domain, app package, and signing fingerprint are aligned. The next likely cause is device-side credential-provider verification or Mera’s native WebAuthn/PRF call, rather than the asset-links file.

## User

https://mera.category.xyz/recipes/use-mera-with-react-native/, check the mira side stuuf and device side provider

## Assistant

I’ll compare Mera’s current React Native requirements with this app’s native integration, then separate Mera-side setup from Android credential-provider requirements.

## Activity

    Opened https://mera.category.xyz/recipes/use-mera-with-react-native/

## Activity

    $ rg -n "reactNativeWebAuthnClient|createPasskeyWithPrfOutput|getPasskeyPrfOutput|prf|Passkey" artifacts/ausd-wallet node_modules/@category-labs/mera node_modules/react-native-passkey --glob '*.{ts,tsx,js,jsx,kt,java,md}' 2>/dev/null | head -300
    artifacts/ausd-wallet/README.md:5:## Passkey setup
    artifacts/ausd-wallet/README.md:42:To produce an APK configured for the live testnet demo, add repository **Actions secrets** in **Settings → Secrets and variables → Actions**: `EXPO_PUBLIC_RP_ID` and `EXPO_PUBLIC_PIMLICO_BUNDLER_URL` are required by the build workflow. `EXPO_PUBLIC_ALCHEMY_MONAD_RPC_URL` is optional; without it the app uses Monad public testnet RPC. Add `EXPO_PUBLIC_PIMLICO_POLICY_ID` if the Pimlico URL does not select the sponsorship policy. The `EXPO_PUBLIC_*` values are compiled into the APK; use restricted testnet credentials. `AUSD_ANDROID_PACKAGE` can be set as a repository Actions variable; it defaults to `com.ausd.wallet`. Passkey authentication also requires the matching Android asset links file to be published for the RP domain and signing certificate.
    artifacts/ausd-wallet/state/wallet-context.tsx:12:import type { PasskeyCredentialMetadata } from '@category-labs/mera';
    artifacts/ausd-wallet/state/wallet-context.tsx:29:    credential: PasskeyCredentialMetadata;
    artifacts/ausd-wallet/server/serve.js:86:function servePasskeyAssociation(pathname, res) {
    artifacts/ausd-wallet/server/serve.js:180:  if (servePasskeyAssociation(pathname, res)) return;
    artifacts/ausd-wallet/services/shared-pockets.ts:2:import type { PasskeySecretVault } from '@category-labs/mera';
    artifacts/ausd-wallet/services/shared-pockets.ts:4:import type { MeraPasskeyProfile } from '@/services/passkey';
    artifacts/ausd-wallet/services/shared-pockets.ts:5:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/shared-pockets.ts:69:export async function loadSharedPockets(account: MeraPasskeyProfile): Promise<SharedPocket[]> {
    artifacts/ausd-wallet/services/shared-pockets.ts:72:  const plaintext = await decryptWithMeraPasskey(account, JSON.parse(stored));
    artifacts/ausd-wallet/services/shared-pockets.ts:76:export async function saveSharedPockets(account: MeraPasskeyProfile, pockets: SharedPocket[]) {
    artifacts/ausd-wallet/services/shared-pockets.ts:77:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(validateSharedPockets(pockets)));
    artifacts/ausd-wallet/app/create-account.tsx:7:import { createMeraPasskey, getPasskeyErrorMessage, recoverMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/app/create-account.tsx:40:      const account = await createMeraPasskey(displayName.trim(), email.trim());
    artifacts/ausd-wallet/app/create-account.tsx:51:      setError(getPasskeyErrorMessage(caught));
    artifacts/ausd-wallet/app/create-account.tsx:75:      const account = await recoverMeraPasskey();
    artifacts/ausd-wallet/app/create-account.tsx:86:      setError(getPasskeyErrorMessage(caught));
    artifacts/ausd-wallet/services/savings-goals.ts:2:import type { PasskeySecretVault } from '@category-labs/mera';
    artifacts/ausd-wallet/services/savings-goals.ts:3:import type { MeraPasskeyProfile } from '@/services/passkey';
    artifacts/ausd-wallet/services/savings-goals.ts:4:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/savings-goals.ts:35:export async function loadSavingsGoals(account: MeraPasskeyProfile): Promise<SavingsGoal[]> {
    artifacts/ausd-wallet/services/savings-goals.ts:38:  const decoded = JSON.parse(await decryptWithMeraPasskey(account, JSON.parse(stored))) as unknown;
    artifacts/ausd-wallet/services/savings-goals.ts:42:export async function saveSavingsGoals(account: MeraPasskeyProfile, goals: SavingsGoal[]) {
    artifacts/ausd-wallet/services/savings-goals.ts:43:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(goals));
    artifacts/ausd-wallet/services/savings-goals.ts:51:export async function importSavingsVault(account: MeraPasskeyProfile, serialized: string) {
    artifacts/ausd-wallet/services/savings-goals.ts:53:  const decoded = validateGoals(JSON.parse(await decryptWithMeraPasskey(account, vault)) as unknown);
    artifacts/ausd-wallet/services/savings-pockets.ts:17:  type MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:248:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:319:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:365:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:433:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/savings-pockets.ts:471:export function giftToPersonSponsored(account: MeraPasskeyProfile, recipient: string, amount: string) {
    artifacts/ausd-wallet/services/savings-pockets.ts:475:export function giftToPocketSponsored(account: MeraPasskeyProfile, recipient: string, pocketId: string, amount: string) {
    artifacts/ausd-wallet/services/savings-pockets.ts:479:export async function withdrawGiftSponsored(account: MeraPasskeyProfile, amount: string) {
    artifacts/ausd-wallet/services/passkey.ts:23:import type { PasskeyCredentialMetadata } from '@category-labs/mera';
    artifacts/ausd-wallet/services/passkey.ts:36:  credential: PasskeyCredentialMetadata;
    artifacts/ausd-wallet/services/passkey.ts:40:export interface MeraPasskeyProfile {
    artifacts/ausd-wallet/services/passkey.ts:43:  credential: PasskeyCredentialMetadata;
    artifacts/ausd-wallet/services/passkey.ts:68:export function getPasskeyErrorMessage(error: unknown) {
    artifacts/ausd-wallet/services/passkey.ts:69:  if (!(error instanceof Error)) return 'Passkey authentication did not complete. Please try again.';
    artifacts/ausd-wallet/services/passkey.ts:71:  const nativeDetails = getNativePasskeyErrorDetails(shaped.cause);
    artifacts/ausd-wallet/services/passkey.ts:86:    return 'Passkey prompt cancelled. You can try again when you’re ready.';
    artifacts/ausd-wallet/services/passkey.ts:88:  return error.message || 'Passkey authentication did not complete. Please try again.';
    artifacts/ausd-wallet/services/passkey.ts:91:function getNativePasskeyErrorDetails(error: unknown): string {
    artifacts/ausd-wallet/services/passkey.ts:207:    const { Passkey } = await import('react-native-passkey');
    artifacts/ausd-wallet/services/passkey.ts:208:    if (!Passkey.isSupported()) {
    artifacts/ausd-wallet/services/passkey.ts:209:      throw new Error('Passkeys are not available on this device. Try a supported device with a screen lock enabled.');
    artifacts/ausd-wallet/services/passkey.ts:221:        .reactNativeWebAuthnClient;
    artifacts/ausd-wallet/services/passkey.ts:224:function signerFromPrf(mera: typeof import('@category-labs/mera'), prfOutput: Uint8Array) {
    artifacts/ausd-wallet/services/passkey.ts:229:    const mnemonic = entropyToMnemonic(prfOutput, wordlist);
    artifacts/ausd-wallet/services/passkey.ts:242:    prfOutput.fill(0);
    artifacts/ausd-wallet/services/passkey.ts:255:export async function createMeraPasskey(name: string, email: string): Promise<MeraAccount> {
    artifacts/ausd-wallet/services/passkey.ts:260:      'Passkey setup needs a verified HTTPS domain. Configure EXPO_PUBLIC_RP_ID and publish the iOS and Android domain association files for that domain.',
    artifacts/ausd-wallet/services/passkey.ts:267:  const created = await mera.createPasskeyWithPrfOutput({
    artifacts/ausd-wallet/services/passkey.ts:273:  const signer = signerFromPrf(mera, created.prfOutput);
    artifacts/ausd-wallet/services/passkey.ts:295:export async function recoverMeraPasskey(): Promise<MeraAccount> {
    artifacts/ausd-wallet/services/passkey.ts:307:  const recovered = await mera.getPasskeyPrfOutput({
    artifacts/ausd-wallet/services/passkey.ts:311:  const signer = signerFromPrf(mera, recovered.prfOutput);
    artifacts/ausd-wallet/services/passkey.ts:325:export async function getMeraViemSigner(account: MeraPasskeyProfile) {
    artifacts/ausd-wallet/services/passkey.ts:329:  const { prfOutput } = await mera.getPasskeyPrfOutput({
    artifacts/ausd-wallet/services/passkey.ts:334:  const signer = signerFromPrf(mera, prfOutput);
    artifacts/ausd-wallet/services/passkey.ts:343:export async function encryptWithMeraPasskey(account: MeraPasskeyProfile, value: string) {
    artifacts/ausd-wallet/services/passkey.ts:348:    return await mera.createSecretVaultWithExistingPasskey({
    artifacts/ausd-wallet/services/passkey.ts:360:export async function decryptWithMeraPasskey(account: MeraPasskeyProfile, vault: unknown) {
    artifacts/ausd-wallet/services/passkey.ts:363:  const plaintext = await mera.decryptSecretVaultWithPasskey({
    artifacts/ausd-wallet/services/passkey.ts:375:export async function authenticateMeraPasskey(account: MeraPasskeyProfile): Promise<string> {
    artifacts/ausd-wallet/services/passkey.ts:431:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/passkey.ts:478:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/passkey.ts:486:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/services/passkey.ts:548:  account: MeraPasskeyProfile,
    artifacts/ausd-wallet/app/review.tsx:268:      <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>Passkey approval required · Monad testnet only</Text>
    artifacts/ausd-wallet/app/index.tsx:7:import { authenticateMeraPasskey, getPasskeyErrorMessage } from '@/services/passkey';
    artifacts/ausd-wallet/app/index.tsx:39:  async function continueWithPasskey() {
    artifacts/ausd-wallet/app/index.tsx:47:      await authenticateMeraPasskey({
    artifacts/ausd-wallet/app/index.tsx:56:      setError(getPasskeyErrorMessage(caught));
    artifacts/ausd-wallet/app/index.tsx:105:          <PrimaryButton label="Continue with passkey" icon="key" loading={busy} onPress={continueWithPasskey} testID="continue-passkey" />
    artifacts/ausd-wallet/services/contacts.ts:2:import type { PasskeySecretVault } from '@category-labs/mera';
    artifacts/ausd-wallet/services/contacts.ts:4:import type { MeraPasskeyProfile } from '@/services/passkey';
    artifacts/ausd-wallet/services/contacts.ts:5:import { decryptWithMeraPasskey, encryptWithMeraPasskey } from '@/services/passkey';
    artifacts/ausd-wallet/services/contacts.ts:49:export async function loadContacts(account: MeraPasskeyProfile): Promise<WalletContact[]> {
    artifacts/ausd-wallet/services/contacts.ts:52:  const plaintext = await decryptWithMeraPasskey(account, JSON.parse(serialized));
    artifacts/ausd-wallet/services/contacts.ts:56:export async function saveContacts(account: MeraPasskeyProfile, contacts: WalletContact[]) {
    artifacts/ausd-wallet/services/contacts.ts:58:  const vault: PasskeySecretVault = await encryptWithMeraPasskey(account, JSON.stringify(validContacts));
    artifacts/ausd-wallet/services/contacts.ts:66:export async function importContactsVault(account: MeraPasskeyProfile, serialized: string) {
    artifacts/ausd-wallet/services/contacts.ts:68:  const plaintext = await decryptWithMeraPasskey(account, vault);
    ✓ • 14ms

## Activity

    Opened https://mera.category.xyz/recipes/use-mera-with-react-native/

## Activity

    $ curl --silent --show-error --location https://mera.category.xyz/recipes/use-mera-with-react-native/ | sed -n '1,260p'
    <!DOCTYPE html><html lang="en" dir="ltr" data-theme="dark" data-has-toc data-has-sidebar class="astro-a63wdqsm"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Use mera with React Native | mera</title><link rel="canonical" href="https://mera.category.xyz/recipes/use-mera-with-react-native/"/><link rel="sitemap" href="/sitemap-index.xml"/><link rel="preconnect" href="https://api.fontshare.com"/><link rel="preconnect" href="https://cdn.fontshare.com" crossorigin="true"/><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701&amp;display=swap"/><link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml"/><meta name="generator" content="Astro v7.3.5"/><meta name="generator" content="Starlight v0.42.5"/><meta property="og:title" content="Use mera with React Native"/><meta property="og:type" content="article"/><meta property="og:url" content="https://mera.category.xyz/recipes/use-mera-with-react-native/"/><meta property="og:locale" content="en"/><meta property="og:description" content="Configure mera passkeys in a React Native app."/><meta property="og:site_name" content="mera"/><meta name="description" content="Configure mera passkeys in a React Native app."/><meta property="og:image" content="https://mera.category.xyz/og.png"/><meta property="og:image:type" content="image/png"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="mera. Accounts on any chain and platform, from a passkey. npm install @category-labs/mera"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="https://mera.category.xyz/og.png"/><meta name="twitter:image:alt" content="mera. Accounts on any chain and platform, from a passkey. npm install @category-labs/mera"/><script>
      document.documentElement.dataset.theme = "light";
    </script><link rel="stylesheet" href="/_astro/print.ehPL0gv-.css" media="print"><link rel="stylesheet" href="/_astro/common.Lg63Wt6i.css"><script type="module" src="/_astro/page.Dwipeu-R.js"></script></head><body class="astro-a63wdqsm"><a class="sl-skip-link astro-orf7nmkp" href="#_top">Skip to content</a><div class="page sl-flex astro-wbin6jht"><header class="header astro-wbin6jht"><div class="header astro-nen7h5rs"><div class="title-wrapper sl-flex astro-nen7h5rs"><a class="brand-link astro-nen7h5rs" href="https://category.xyz" aria-label="Category Labs"><svg aria-hidden="true" viewBox="0 0 1344 234" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M299.308 71.5513C298.157 71.5513 297.582 72.134 297.582 73.2994C297.51 102.92 297.522 124.928 297.618 139.326C297.69 151.526 300.189 165.456 316.028 159.975C320.523 158.427 325.467 151.38 329.512 146.992C329.84 146.631 330.24 146.345 330.686 146.154C331.133 145.962 331.615 145.869 332.101 145.881C334.75 145.954 335.84 147.556 335.373 150.688C334.007 159.92 327.247 169.808 321.691 175.088C313.193 183.161 303.455 185.298 292.476 181.498C272.448 174.542 272.376 148.922 272.412 131.569C272.436 120.279 272.508 100.85 272.628 73.2812C272.64 72.565 272.292 72.1583 271.585 72.0612C267.36 71.5149 258.263 72.9534 256.645 66.8898C254.254 57.9309 264.448 57.5485 269.536 56.4742C282.858 53.7064 284.656 43.1451 289.168 30.5262C289.274 30.2381 289.443 29.9795 289.662 29.7708C289.88 29.5622 290.142 29.4094 290.427 29.3244C291.925 28.8874 293.651 28.8874 295.605 29.3244C296.192 29.4458 296.557 29.81 296.701 30.4169C298.283 37.0815 297.654 45.4212 297.492 56.5106C297.49 56.6915 297.523 56.871 297.59 57.0388C297.656 57.2066 297.755 57.3593 297.881 57.4881C298.006 57.6168 298.156 57.7191 298.32 57.7888C298.485 57.8586 298.662 57.8945 298.841 57.8945H323.13C325.491 57.8945 326.671 59.0902 326.671 61.4817V68.0006C326.671 70.3677 325.503 71.5513 323.166 71.5513H299.308Z" fill="currentColor"></path><path d="M532.265 68.787C532.076 68.7893 531.891 68.8437 531.73 68.9443C531.569 69.045 531.438 69.1881 531.351 69.3584C531.264 69.5287 531.225 69.7197 531.237 69.9109C531.249 70.1022 531.312 70.2864 531.42 70.444C539.294 81.5516 541.865 95.4087 538.485 108.446C534.434 124.106 524.174 133.988 507.706 138.091C497.722 140.567 488.379 140.476 479.678 137.818C476.753 136.919 474.548 137.763 473.062 140.349L471.947 142.297C470.365 145.029 470.976 146.947 473.781 148.051C477.113 149.35 480.103 150.048 482.752 150.145C496.751 150.631 507.239 151.123 514.214 151.62C531.528 152.859 546 161.799 548.517 180.445C551.628 203.607 538.09 222.162 516.857 230.193C502.87 235.473 486.33 234.29 471.48 231.34C462.622 229.568 454.939 225.744 448.431 219.868C438.022 210.472 435.99 193.811 445.447 182.74C448.575 179.061 452.8 177.222 456.198 174.655C456.349 174.541 456.47 174.391 456.551 174.219C456.631 174.046 456.669 173.856 456.66 173.666C456.651 173.475 456.596 173.29 456.5 173.125C456.403 172.961 456.269 172.824 456.108 172.725C449.888 168.901 444.602 164.348 445.447 156.045C446.579 144.956 454.885 137.617 464.612 133.484C464.834 133.389 465.027 133.237 465.174 133.044C465.32 132.85 465.413 132.621 465.444 132.381C465.475 132.141 465.443 131.897 465.35 131.675C465.258 131.453 465.108 131.261 464.917 131.117C453.759 122.498 448.317 110.783 448.593 95.9732C449.258 60.6293 481.961 48.8116 511.464 56.7144C512.758 57.0543 513.651 57.2242 514.143 57.2242C519.752 57.2424 529.029 55.4761 543.591 53.6552C547.355 53.1818 549.236 54.8692 549.236 58.7174V63.0693C549.236 66.8811 547.355 68.787 543.591 68.787H532.265ZM494.113 129.442C496.833 129.446 499.527 128.614 502.043 126.991C504.558 125.369 506.846 122.988 508.774 119.985C510.702 116.982 512.234 113.415 513.282 109.489C514.329 105.563 514.872 101.354 514.88 97.1024C514.887 92.8507 514.359 88.6397 513.324 84.7099C512.29 80.78 510.771 77.2082 508.853 74.1984C506.935 71.1887 504.656 68.7999 502.146 67.1684C499.636 65.5369 496.944 64.6947 494.224 64.6899C491.504 64.6851 488.81 65.5178 486.294 67.1404C483.779 68.763 481.491 71.1438 479.563 74.1468C477.634 77.1497 476.103 80.7161 475.055 84.6423C474.008 88.5685 473.465 92.7775 473.457 97.0292C473.45 101.281 473.978 105.492 475.012 109.422C476.047 113.352 477.566 116.923 479.484 119.933C481.402 122.943 483.681 125.332 486.191 126.963C488.701 128.595 491.393 129.437 494.113 129.442ZM503.391 178.533C489.296 178.115 483.309 178.206 473.439 176.694C473.009 176.628 472.568 176.681 472.163 176.847C471.758 177.014 471.404 177.288 471.138 177.641C460.099 192.354 463.875 213.367 482.554 219.14C497.135 223.656 518.943 221.598 524.84 204.445C527.189 197.623 526.53 191.498 522.862 186.072C518.709 179.917 510.295 178.734 503.391 178.533Z" fill="currentColor"></path><path d="M228.479 166.077C228.436 165.891 228.341 165.72 228.205 165.586C228.07 165.452 227.899 165.361 227.713 165.323C227.528 165.284 227.335 165.301 227.159 165.37C226.982 165.439 226.829 165.558 226.717 165.713C217.908 178.29 206.347 183.983 192.037 182.793C185.42 182.235 180.057 181.288 175.946 179.953C163.631 175.983 155.918 164.512 156.134 151.219C156.349 137.186 162.384 126.667 174.238 119.662C189.555 110.612 207.732 105.605 223.373 101.435C223.947 101.278 224.458 100.944 224.835 100.48C225.212 100.017 225.436 99.4468 225.476 98.8494C226.232 87.6508 227.148 70.0972 214.366 66.7649C194.392 61.5935 195.758 90.7281 180.261 95.1347C165.536 99.3593 160.592 81.5143 168.377 72.3005C176.515 62.6618 187.278 56.9199 200.666 55.0747C219.13 52.5254 241.082 55.366 248.093 74.6313C249.831 79.4385 250.706 85.3686 250.718 92.4216C250.73 127.371 250.802 149.204 250.934 157.92C250.97 159.996 251.509 161.902 252.552 163.637C252.669 163.829 252.828 163.99 253.015 164.107C253.203 164.224 253.414 164.294 253.631 164.311L261.577 164.967C262.088 165.01 262.578 165.189 262.998 165.486C263.418 165.784 263.755 166.19 263.976 166.664C264.197 167.139 264.294 167.667 264.258 168.196C264.222 168.725 264.054 169.237 263.771 169.683C259.612 176.093 254.188 180.111 247.5 181.737C239.661 183.649 231.373 179.479 229.648 171.486C229.024 168.609 228.635 166.806 228.479 166.077ZM223.984 112.761C214.168 117.404 204.154 120.773 194.374 126.2C188.393 129.501 184.635 134.187 183.101 140.257C180.998 148.579 182.526 158.848 189.681 164.293C198.473 170.976 209.871 168.008 216.325 159.886C227.256 146.12 226.25 132.591 225.081 113.417C225.033 112.652 224.667 112.433 223.984 112.761Z" fill="currentColor"></path><path d="M364.649 111.687C364.289 124.118 365.943 134.321 369.611 142.296C375.723 155.534 388.111 164.511 402.745 163.51C414.359 162.709 422.683 155.498 430.306 145.756C432.008 143.571 433.812 143.164 435.718 144.536C436.165 144.855 436.52 145.291 436.747 145.8C436.975 146.309 437.066 146.871 437.012 147.431C436.736 150.345 435.867 153.258 434.405 156.172C425.218 174.618 410.062 184.378 388.92 183.048C371.888 181.98 358.884 175.68 349.906 164.147C336.009 146.284 334.517 116.731 341.241 94.8615C345.502 80.9862 355.174 67.3475 367.867 60.2824C380.871 53.0473 395.074 52.1854 410.476 57.6967C428.778 64.252 437.659 85.1743 436.742 104.185C436.658 105.969 436.395 107.432 435.951 108.573C435.724 109.156 435.316 109.526 434.729 109.684C432.308 110.339 429.437 110.661 426.117 110.649C415.869 110.625 395.733 110.625 365.709 110.649C365.026 110.649 364.673 110.995 364.649 111.687ZM376.317 73.4112C371.714 79.2381 368.4 86.4853 366.375 95.1529C366.329 95.3531 366.328 95.5613 366.372 95.7619C366.417 95.9625 366.505 96.1503 366.632 96.3113C366.758 96.4724 366.918 96.6025 367.101 96.6919C367.284 96.7814 367.484 96.828 367.687 96.8281H408.678C410.236 96.8281 410.865 96.0573 410.566 94.5156C409.091 86.892 407.665 81.2532 406.287 77.5993C401.217 64.0517 384.982 62.4311 376.317 73.4112Z" fill="currentColor"></path><path d="M606.661 54.2871C643.679 54.3235 664.678 82.9665 664.66 118.693C664.624 154.419 643.571 183.026 606.571 182.989C569.554 182.971 548.555 154.328 548.591 118.602C548.609 82.8572 569.661 54.2689 606.661 54.2871ZM574.839 118.747C574.857 138.468 581.707 171.317 606.643 171.317C631.561 171.317 638.411 138.45 638.411 118.729C638.393 99.0269 631.543 66.1595 606.607 66.1777C581.689 66.1777 574.839 99.0451 574.839 118.747Z" fill="currentColor"></path><path d="M705.717 65.5454C705.741 68.2525 706.61 68.5681 708.324 66.4923C710.853 63.4453 712.795 61.2966 714.149 60.0463C723.57 51.3605 741.315 51.925 748.398 63.597C754.835 74.1947 750.556 89.4904 736.568 87.014C734.327 86.6134 732.631 85.5936 731.481 83.9548C727.202 77.7819 721.107 66.3284 712.837 75.5058C704.693 84.5557 705.394 91.2749 705.376 105.077C705.316 133.047 705.352 152.178 705.484 162.473C705.496 163.395 705.795 165.35 706.383 168.336C706.503 168.943 706.838 169.368 707.389 169.611C711.632 171.468 715.731 172.688 714.994 178.205C714.951 178.558 714.781 178.884 714.517 179.121C714.253 179.359 713.912 179.493 713.556 179.498C702.529 179.656 690.268 179.668 676.772 179.534C674.399 179.51 672.152 179.134 670.03 178.406C669.748 178.307 669.496 178.135 669.3 177.908C669.103 177.68 668.969 177.404 668.911 177.107C668.853 176.81 668.872 176.504 668.968 176.217C669.063 175.93 669.231 175.674 669.455 175.474C673.248 172.069 679.631 169.92 679.649 163.838C679.721 138.88 679.739 109.138 679.703 74.6135C679.703 69.8974 673.77 66.5287 670.102 64.5257C669.785 64.3501 669.516 64.0978 669.318 63.7914C669.121 63.4851 669.001 63.1345 668.971 62.7712C668.941 62.4079 669 62.0435 669.144 61.7108C669.289 61.3781 669.513 61.0876 669.796 60.8657C671.534 59.506 673.5 58.632 675.693 58.2435C691.251 55.4151 699.275 53.9887 699.767 53.9644C705.753 53.6913 705.682 61.4301 705.717 65.5454Z" fill="currentColor"></path><path d="M820.148 143.33C820.891 142.82 821.449 141.995 821.82 140.854C829.994 116.368 837.078 94.8573 843.071 76.3204C844.485 71.9502 844.155 68.8061 842.082 66.8881C839.745 64.7212 837.641 62.8275 837.479 60.3692C837.462 60.0668 837.498 59.764 837.584 59.4795C837.671 59.195 837.807 58.9347 837.984 58.7147C838.161 58.4947 838.375 58.3196 838.613 58.2001C838.85 58.0807 839.107 58.0195 839.367 58.0203L865.346 57.9838C865.928 57.9828 866.499 58.1515 866.989 58.4695C867.479 58.7875 867.868 59.2413 868.11 59.7762C868.351 60.3112 868.434 60.9044 868.349 61.4845C868.264 62.0647 868.014 62.6069 867.629 63.046C866.011 64.8912 864.255 66.4329 862.362 67.6711C860.348 68.9821 858.526 71.9563 856.896 76.5936C840.464 123.5 827.148 161.017 816.948 189.144C815.354 193.551 812.172 200.015 807.402 208.537C798.868 223.796 786.019 230.879 768.856 229.787C765.02 229.544 761.119 228.081 757.152 225.399C750.536 220.937 749.888 212.689 754.311 206.716C757.206 202.819 764.775 203.02 768.352 205.004C776.748 209.666 782.771 218.151 791.814 207.736C799.341 199.068 804.453 188.495 807.15 176.015C807.869 172.689 807.455 169.108 805.909 165.272C795.398 139.318 784.527 112.217 773.296 83.9683C769.557 74.5359 766.806 68.6908 759.507 64.4481C758.951 64.1293 758.487 63.6684 758.162 63.1112C757.837 62.5541 757.663 61.9204 757.655 61.2733C757.648 60.6263 757.808 59.9887 758.121 59.4242C758.433 58.8597 758.886 58.3882 759.435 58.0567C759.819 57.826 760.765 57.7168 762.275 57.7289C774.693 57.7896 786.87 57.9049 798.808 58.0749C800.306 58.0992 801.439 58.263 802.206 58.5665C802.573 58.711 802.898 58.9462 803.153 59.2511C803.407 59.556 803.582 59.9208 803.662 60.3128C803.743 60.7049 803.725 61.1117 803.612 61.4966C803.499 61.8815 803.294 62.2325 803.015 62.5179L797.603 68.0171C797.16 68.4662 796.878 69.0004 796.758 69.6195C796.183 72.5693 796.926 77.0367 798.988 83.0214C802.451 93.1092 808.354 110.183 816.696 134.244C817.559 136.744 818.308 139.603 818.944 142.82C818.97 142.95 819.027 143.071 819.11 143.174C819.193 143.276 819.299 143.356 819.418 143.407C819.537 143.457 819.667 143.477 819.794 143.463C819.921 143.45 820.043 143.404 820.148 143.33Z" fill="currentColor"></path><path d="M147.564 132.571C147.564 131.744 147.549 130.918 147.529 130.092C147.483 128.329 147.433 126.561 147.004 124.841C146.937 124.549 146.798 124.279 146.598 124.05C146.395 123.824 146.14 123.647 145.847 123.537C145.557 123.427 145.241 123.389 144.934 123.424C144.624 123.459 144.328 123.566 144.073 123.74C143.137 124.346 142.438 125.137 141.968 126.111C137.095 136.273 130.891 146.197 121.764 153.476C113.136 160.359 99.6058 162.905 88.5484 162.371C69.9561 161.475 53.1149 151.279 42.733 136.969C33.5803 124.354 29.0026 108.96 28.4546 93.4494C28.4923 91.5852 28.5793 89.724 28.7185 87.8685C29.3302 80.5829 30.8146 73.4075 33.1165 66.6293C40.7239 44.2159 57.107 27.3341 81.6368 24.0348C110.643 20.1499 126.559 38.2842 138.663 60.8541C139.501 62.4226 140.539 63.5011 141.774 64.0867C142.087 64.2346 142.435 64.2983 142.783 64.2752C143.131 64.252 143.467 64.1447 143.754 63.9591C144.044 63.7736 144.273 63.5185 144.424 63.2228C144.575 62.9241 144.638 62.5936 144.612 62.2631C144.143 56.1807 144.001 50.0867 143.482 44.01C142.951 37.8058 142.293 31.6074 141.591 25.4177C141.339 23.252 140.884 21.6662 140.226 20.6573C136.503 14.8996 122.782 10.9625 115.482 9.29549C69.7097 -1.15308 19.7514 16.4651 4.69892 61.9993C1.22863 72.4885 -0.267335 82.995 0.0399754 93.1392C-0.0846884 97.227 0.0834628 101.266 0.527034 105.234C4.35103 143.524 31.3857 175.681 73.554 182.68C95.9065 186.394 121.025 184.573 140.519 172.034C142.081 171.034 143.969 168.668 144.148 166.975C144.737 161.313 145.346 155.651 146.045 150.003C146.448 146.73 147.074 143.474 147.306 140.187C147.485 137.653 147.57 135.11 147.564 132.571Z" fill="currentColor"></path><path d="M97.3789 95.3378C97.3789 101.101 92.7083 105.775 86.9506 105.775C81.1929 105.775 76.5223 101.101 76.5223 95.3378C76.5223 89.5743 81.1929 84.9008 86.9506 84.9008C92.7083 84.9008 97.3789 89.5743 97.3789 95.3378Z" fill="#FF5500"></path><path d="M1174.18 66.7395C1174.18 66.9134 1174.23 67.0843 1174.32 67.2319C1174.41 67.3795 1174.54 67.4976 1174.7 67.5723C1174.85 67.6471 1175.02 67.6752 1175.2 67.6535C1175.37 67.6317 1175.53 67.561 1175.66 67.4497C1179.04 64.5241 1181.99 62.2419 1184.5 60.603C1200.7 50.0053 1223.75 52.591 1237 67.4679C1243.35 74.5816 1247.84 83.8197 1250.47 95.1822C1257.06 123.789 1251.64 159.624 1224.79 176.085C1205.07 188.176 1176.38 183.496 1157.1 172.589C1148.06 167.472 1148.94 161.809 1148.96 151.193C1149 110.927 1149 70.6666 1148.98 30.4123C1148.96 21.071 1149.39 14.4793 1140.56 11.1471C1139.98 10.9269 1139.48 10.5196 1139.15 9.98712C1138.81 9.45462 1138.66 8.82609 1138.71 8.19718C1138.88 6.30344 1139.84 5.18054 1141.61 4.8285C1155.76 1.95146 1164.94 -1.03484 1172.04 0.349055C1172.68 0.470449 1173.09 0.840702 1173.27 1.45981C1173.97 4.04551 1174.34 6.27309 1174.36 8.14256C1174.53 27.3835 1174.47 46.9158 1174.18 66.7395ZM1178.55 162.356C1187.69 172.006 1203.29 172.808 1212.96 163.648C1219.2 157.73 1222.51 147.97 1224.31 139.303C1227.87 122.308 1227.21 105.507 1222.35 88.9C1214.94 63.6622 1188.37 63.1159 1176.4 84.7301C1175.05 87.1701 1174.39 91.1519 1174.4 96.6753C1174.44 114.496 1174.43 132.311 1174.38 150.119C1174.36 155.345 1175.14 158.75 1178.55 162.356Z" fill="currentColor"></path><path d="M944.113 168.252C944.653 166.893 944.922 165.114 944.922 162.917C944.982 123.027 944.982 76.3023 944.922 22.7432C944.923 22.0212 944.733 21.3127 944.372 20.6915C944.012 20.0702 943.494 19.5589 942.873 19.2106C939.187 17.1347 935.142 15.6052 935.088 11.235C935.083 10.9456 935.134 10.6581 935.239 10.3889C935.343 10.1197 935.497 9.87413 935.694 9.66614C935.891 9.45815 936.127 9.29185 936.387 9.17674C936.647 9.06163 936.926 8.99996 937.21 8.99527C945 8.83745 956.597 8.77675 971.998 8.81317C975.21 8.82531 977.973 9.20164 980.286 9.94214C980.681 10.0682 981.034 10.3015 981.307 10.6167C981.581 10.9319 981.763 11.3169 981.836 11.7299C981.908 12.1428 981.867 12.568 981.717 12.9591C981.568 13.3502 981.315 13.6922 980.987 13.9481C977.248 16.8434 971.333 19.4655 971.315 26.8038C971.219 59.9687 971.195 100.514 971.243 148.441C971.261 153.157 970.416 163.39 977.212 163.9C986.399 164.592 999.433 165.539 1007.09 161.041C1018 154.632 1023.45 144.052 1028.23 131.725C1028.39 131.311 1028.67 130.955 1029.04 130.705C1029.4 130.455 1029.83 130.322 1030.27 130.323C1032.94 130.311 1034.07 131.573 1033.65 134.11C1032.22 142.705 1029.94 157.211 1026.81 177.63C1026.73 178.167 1026.46 178.656 1026.05 179.01C1025.64 179.363 1025.12 179.558 1024.59 179.56H937.551C937.215 179.559 936.882 179.487 936.575 179.349C936.268 179.21 935.994 179.008 935.77 178.755C935.546 178.502 935.377 178.205 935.275 177.882C935.173 177.56 935.14 177.219 935.178 176.883C935.627 173.023 939.097 171.22 942.963 169.472C943.493 169.228 943.906 168.79 944.113 168.252Z" fill="currentColor"></path><path d="M1106.91 166.123C1106.87 165.936 1106.77 165.766 1106.64 165.632C1106.5 165.498 1106.33 165.406 1106.15 165.368C1105.96 165.33 1105.77 165.346 1105.59 165.415C1105.41 165.485 1105.26 165.604 1105.15 165.759C1096.33 178.335 1084.76 184.023 1070.45 182.821C1063.84 182.262 1058.47 181.315 1054.34 179.98C1042.03 175.992 1034.33 164.502 1034.55 151.21C1034.78 137.177 1040.82 126.658 1052.69 119.653C1068.01 110.622 1086.2 105.614 1101.84 101.462C1102.42 101.308 1102.93 100.976 1103.31 100.512C1103.7 100.048 1103.92 99.4764 1103.96 98.8767C1104.72 87.6599 1105.65 70.1063 1092.85 66.774C1072.88 61.5844 1074.23 90.719 1058.73 95.1256C1043.99 99.3319 1039.06 81.487 1046.85 72.2732C1055 62.6345 1065.77 56.8986 1079.17 55.0655C1097.63 52.5163 1119.6 55.3751 1126.6 74.6585C1128.34 79.4658 1129.2 85.3959 1129.2 92.4489C1129.19 127.423 1129.25 149.267 1129.38 157.983C1129.42 160.059 1129.96 161.965 1131 163.701C1131.12 163.893 1131.28 164.053 1131.47 164.17C1131.65 164.288 1131.86 164.358 1132.08 164.375L1140.03 165.03C1140.54 165.072 1141.03 165.25 1141.46 165.549C1141.88 165.848 1142.22 166.256 1142.44 166.733C1142.66 167.211 1142.76 167.741 1142.72 168.273C1142.68 168.804 1142.51 169.319 1142.22 169.765C1138.05 176.174 1132.62 180.186 1125.93 181.801C1118.09 183.713 1109.81 179.543 1108.08 171.531C1107.46 168.654 1107.07 166.851 1106.91 166.123ZM1102.42 112.807C1092.62 117.432 1082.6 120.8 1072.84 126.209C1066.86 129.51 1063.1 134.19 1061.57 140.248C1059.47 148.569 1060.99 158.821 1068.13 164.266C1076.92 170.948 1088.3 167.98 1094.76 159.877C1105.67 146.129 1104.68 132.618 1103.51 113.462C1103.47 112.697 1103.1 112.479 1102.42 112.807Z" fill="currentColor"></path><path d="M1318.28 160.224C1320.85 152.176 1314 142.088 1307.96 137.718C1298.24 130.689 1281.26 121.548 1271.12 108.656C1267.35 103.861 1265.27 98.6593 1264.89 93.0509C1262.98 65.2456 1284.48 53.264 1308.52 54.2655C1315.84 54.5811 1323.55 55.6676 1331.66 57.5249C1339.75 59.3822 1339.17 64.6811 1339.66 72.6567C1340.11 79.9889 1340.3 87.3272 1340.23 94.6715C1340.23 95.3028 1339.96 95.7701 1339.41 96.0736C1337.91 96.9113 1336.46 95.928 1335.79 94.4894C1329.77 81.1057 1323.14 69.9071 1308.88 65.2456C1301.35 62.7692 1292.21 64.7539 1288.94 72.766C1278.28 98.9507 1360.01 110.932 1341.17 159.605C1331.05 185.735 1299.1 187.101 1276.52 178.233C1271.21 176.157 1265.78 173.426 1265.3 167.089C1264.35 154.452 1263.95 143.97 1264.09 135.642C1264.1 135.188 1264.22 134.743 1264.43 134.346C1264.64 133.95 1264.95 133.613 1265.32 133.366C1267.32 132.018 1268.62 132.54 1269.22 134.932C1272.51 147.842 1277.85 163.957 1290.7 170.33C1302.44 176.139 1313.86 173.972 1318.28 160.224Z" fill="currentColor"></path></svg></a><span class="brand-divider astro-nen7h5rs" aria-hidden="true"></span><a href="/" class="site-title sl-flex astro-om4pmazt"><span class="astro-om4pmazt" translate="no">mera</span></a></div><div class="search-wrapper sl-flex print:hidden astro-nen7h5rs"><!--
      Reuse Starlight's default Search (button, modal, Pagefind wiring) and inject a
      suggestions panel into the modal's empty state. The panel is rendered hidden,
      moved into the dialog's `.search-container` by the script below, and hidden
      again by CSS as soon as the query is non-empty.
    --><site-search class="astro-ac66eqjo astro-4kkigcfw" data-translations="{&quot;placeholder&quot;:&quot;Search&quot;}"><button data-open-modal disabled aria-label="Search" aria-keyshortcuts="Control+K" class="astro-4kkigcfw"><svg aria-hidden="true" class="astro-4kkigcfw astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1em;"><path d="M21.71 20.29 18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a.999.999 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"/></svg><span class="sl-hidden md:sl-block astro-4kkigcfw" aria-hidden="true">Search</span><kbd class="sl-hidden md:sl-flex astro-4kkigcfw" style="display: none;"><kbd class="astro-4kkigcfw">Ctrl</kbd><kbd class="astro-4kkigcfw">K</kbd></kbd></button><dialog style="padding:0" aria-label="Search" class="astro-4kkigcfw"><div class="dialog-frame sl-flex astro-4kkigcfw"><button data-close-modal class="sl-flex md:sl-hidden astro-4kkigcfw">Cancel</button><div class="search-container astro-4kkigcfw"><div id="starlight__search" class="astro-4kkigcfw"></div></div></div></dialog></site-search><script>
        (() => {
            const openBtn = document.querySelector('button[data-open-modal]');
            const shortcut = openBtn?.querySelector('kbd');
            if (!openBtn || !(shortcut instanceof HTMLElement)) return;
            const platformKey = shortcut.querySelector('kbd');
            if (platformKey && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
                platformKey.textContent = '⌘';
                openBtn.setAttribute('aria-keyshortcuts', 'Meta+K');
            }
            shortcut.style.display = '';
        })();
    </script><script type="module" src="/_astro/Search.astro_astro_type_script_index_0_lang.Bumivpjo.js"></script><div class="search-suggestions astro-ac66eqjo" data-suggestions hidden><p class="suggestions-label astro-ac66eqjo">Suggested pages</p><ul class="suggestions-list astro-ac66eqjo"><li class="astro-ac66eqjo"><a class="suggestion astro-ac66eqjo" href="/concepts/passkey-accounts/"><span class="suggestion-title astro-ac66eqjo">Passkey accounts</span><span class="suggestion-excerpt astro-ac66eqjo">Accounts derived from a passkey with no stored secret.</span></a></li><li class="astro-ac66eqjo"><a class="suggestion astro-ac66eqjo" href="/concepts/signing-sessions/"><span class="suggestion-title astro-ac66eqjo">Signing sessions</span><span class="suggestion-excerpt astro-ac66eqjo">A private key held in memory for signing until the session ends.</span></a></li><li class="astro-ac66eqjo"><a class="suggestion astro-ac66eqjo" href="/recipes/create-passkey-accounts/"><span class="suggestion-title astro-ac66eqjo">Create passkey accounts</span><span class="suggestion-excerpt astro-ac66eqjo">Create EVM and Solana accounts from a passkey.</span></a></li><li class="astro-ac66eqjo"><a class="suggestion astro-ac66eqjo" href="/recipes/send-a-transaction-with-viem/"><span class="suggestion-title astro-ac66eqjo">Send a transaction with viem</span><span class="suggestion-excerpt astro-ac66eqjo">Send an EVM transaction from a passkey account with viem.</span></a></li></ul></div><script type="module">(()=>{let e=document.querySelector(`[data-suggestions]`),t=document.querySelector(`#starlight__search`)?.parentElement;e&&t&&(e.hidden=!1,t.append(e))})();</script></div><div class="right-group sl-flex print:hidden astro-nen7h5rs"><div class="social-icons sl-flex astro-nen7h5rs"><a href="https://github.com/category-labs/mera" rel="me" class="sl-flex astro-5lfg4qvv"><span class="sr-only astro-5lfg4qvv">GitHub</span><svg aria-hidden="true" class="astro-5lfg4qvv astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1em;"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.08 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3Z"/></svg></a></div><script type="module">var e=class extends HTMLElement{constructor(){super();let e=this.querySelector(`select`);e&&(e.addEventListener(`change`,e=>{e.currentTarget instanceof HTMLSelectElement&&(window.location.pathname=e.currentTarget.value)}),window.addEventListener(`pageshow`,t=>{if(!t.persisted)return;let n=e.querySelector(`option[selected]`)?.index;n!==e.selectedIndex&&(e.selectedIndex=n??0)}))}};customElements.define(`starlight-lang-select`,e);</script><a class="header-cta astro-nen7h5rs" href="/getting-started/"><span class="mobile-label astro-nen7h5rs">Get started</span><span class="desktop-label astro-nen7h5rs">Getting started&nbsp;→</span></a></div></div></header><nav class="sidebar print:hidden astro-wbin6jht" aria-label="Main"><button popovertarget="starlight__sidebar" class="sl-menu-button sl-flex md:sl-hidden print:hidden astro-3di5onqe"><svg aria-hidden="true" class="open-menu astro-3di5onqe astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1em;"><path d="M3 8h18a1 1 0 1 0 0-2H3a1 1 0 0 0 0 2Zm18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Zm0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"/></svg><svg aria-hidden="true" class="close-menu astro-3di5onqe astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1em;"><path d="m13.41 12 6.3-6.29a1.004 1.004 0 1 0-1.42-1.42L12 10.59l-6.29-6.3a1.004 1.004 0 0 0-1.42 1.42l6.3 6.29-6.3 6.29a1 1 0 0 0 0 1.42.998.998 0 0 0 1.42 0l6.29-6.3 6.29 6.3a.999.999 0 0 0 1.42 0 1 1 0 0 0 0-1.42L13.41 12Z"/></svg><span class="sr-only astro-3di5onqe">Menu</span></button><script type="module">var e=class extends HTMLElement{constructor(){super();let e=matchMedia(`(min-width: 50em)`),t=()=>{this.popover=e.matches?null:`auto`};t(),e.addEventListener(`change`,()=>t()),this.addEventListener(`toggle`,({newState:e})=>this.trapFocus(e===`open`))}trapFocus(e){document.querySelectorAll(`.main-frame, .sl-skip-link`).forEach(t=>{t.toggleAttribute(`inert`,e)})}};customElements.define(`sl-sidebar-pane`,e);</script><sl-sidebar-pane popover id="starlight__sidebar" class="sidebar-pane astro-wbin6jht"><div class="sidebar-content sl-flex astro-wbin6jht"><sl-sidebar-state-persist data-hash="1msr8m0" class="astro-l353yszr"><script aria-hidden="true">
            (() => {
                try {
                    if (!matchMedia('(min-width: 50em)').matches) return;
                    /** @type {HTMLElement | null} */
                    const target = document.querySelector('sl-sidebar-state-persist');
                    const state = JSON.parse(sessionStorage.getItem('sl-sidebar-state') || '0');
                    if (!target || !state || target.dataset.hash !== state.hash) return;
                    window._starlightScrollRestore = state.scroll;
                    customElements.define(
                        'sl-sidebar-restore',
                        class SidebarRestore extends HTMLElement {
                            connectedCallback() {
                                try {
                                    const idx = parseInt(this.dataset.index || '');
                                    const details = this.closest('details');
                                    if (details && typeof state.open[idx] === 'boolean') details.open = state.open[idx];
                                } catch {}
                            }
                        }
                    );
                } catch {}
            })();
        </script><ul class="top-level astro-j2iendjs"><li class="astro-j2iendjs"><a href="/getting-started/" class="large astro-j2iendjs"><span class="astro-j2iendjs">Getting started</span></a></li><li class="astro-j2iendjs"><details open class="astro-j2iendjs"><summary class="astro-j2iendjs"><span class="group-label astro-j2iendjs"><span class="large astro-j2iendjs">Concepts</span></span><svg aria-hidden="true" class="caret astro-j2iendjs astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.25rem;"><path d="m14.83 11.29-4.24-4.24a1 1 0 1 0-1.42 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.24-4.24a1.002 1.002 0 0 0 0-1.42Z"/></svg></summary><sl-sidebar-restore data-index="0"></sl-sidebar-restore><ul class="astro-j2iendjs"><li class="astro-j2iendjs"><a href="/concepts/passkey-accounts/" class="astro-j2iendjs"><span class="astro-j2iendjs">Passkey accounts</span></a></li><li class="astro-j2iendjs"><a href="/concepts/signing-sessions/" class="astro-j2iendjs"><span class="astro-j2iendjs">Signing sessions</span></a></li><li class="astro-j2iendjs"><a href="/concepts/security-model/" class="astro-j2iendjs"><span class="astro-j2iendjs">Security model</span></a></li><li class="astro-j2iendjs"><a href="/concepts/secret-vaults/" class="astro-j2iendjs"><span class="astro-j2iendjs">Secret vaults (advanced)</span></a></li><li class="astro-j2iendjs"><details open class="astro-j2iendjs"><summary class="astro-j2iendjs"><span class="group-label astro-j2iendjs"><span class="large astro-j2iendjs">Foundations</span></span><svg aria-hidden="true" class="caret astro-j2iendjs astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.25rem;"><path d="m14.83 11.29-4.24-4.24a1 1 0 1 0-1.42 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.24-4.24a1.002 1.002 0 0 0 0-1.42Z"/></svg></summary><sl-sidebar-restore data-index="1"></sl-sidebar-restore><ul class="astro-j2iendjs"><li class="astro-j2iendjs"><a href="/concepts/passkeys-and-prf/" class="astro-j2iendjs"><span class="astro-j2iendjs">Passkeys and the PRF extension</span></a></li><li class="astro-j2iendjs"><a href="/concepts/entropy-keys-and-accounts/" class="astro-j2iendjs"><span class="astro-j2iendjs">Keys and accounts</span></a></li></ul></details></li></ul></details></li><li class="astro-j2iendjs"><details open class="astro-j2iendjs"><summary class="astro-j2iendjs"><span class="group-label astro-j2iendjs"><span class="large astro-j2iendjs">Recipes</span></span><svg aria-hidden="true" class="caret astro-j2iendjs astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.25rem;"><path d="m14.83 11.29-4.24-4.24a1 1 0 1 0-1.42 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.24-4.24a1.002 1.002 0 0 0 0-1.42Z"/></svg></summary><sl-sidebar-restore data-index="2"></sl-sidebar-restore><ul class="astro-j2iendjs"><li class="astro-j2iendjs"><a href="/recipes/create-passkey-accounts/" class="astro-j2iendjs"><span class="astro-j2iendjs">Create passkey accounts</span></a></li><li class="astro-j2iendjs"><a href="/recipes/use-mera-with-react-native/" aria-current="page" class="astro-j2iendjs"><span class="astro-j2iendjs">Use mera with React Native</span></a></li><li class="astro-j2iendjs"><a href="/recipes/use-mera-with-chrome-extensions/" class="astro-j2iendjs"><span class="astro-j2iendjs">Use mera with Chrome extensions</span></a></li><li class="astro-j2iendjs"><a href="/recipes/send-a-transaction-with-viem/" class="astro-j2iendjs"><span class="astro-j2iendjs">Send a transaction with viem</span></a></li><li class="astro-j2iendjs"><a h
    ... command output truncated for persistence ...
    de>PASSKEY_OPERATION_FAILED</code> when WebAuthn is unavailable, cancelled, or returns an unexpected credential.</span></p></div></div><span style="--0:#D6DEEB;--1:#403F53">getPasskeyPrfOutput</span></span></span><span style="--0:#D6DEEB;--1:#403F53">,</span></div></div><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">} </span><span style="--0:#C792EA;--1:#8844AE">from</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">@category-labs/mera</span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#D6DEEB;--1:#403F53">;</span></div></div><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">import</span><span style="--0:#D6DEEB;--1:#403F53"> { </span><span class="twoslash" style="--0:#D6DEEB;--1:#403F53"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span style="--0:#82AAFF;--1:#3B61B0">reactNativeWebAuthnClient</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#C792EA;--1:#8844AE"> </span><span style="--0:#FFCB8B;--1:#111111">WebAuthnClient</span></div></div></code></pre></figure></div></span></code></div><span style="--0:#D6DEEB;--1:#403F53">reactNativeWebAuthnClient</span></span></span><span style="--0:#D6DEEB;--1:#403F53"> } </span><span style="--0:#C792EA;--1:#8844AE">from</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">@category-labs/mera/react-native-webauthn-client</span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#D6DEEB;--1:#403F53">;</span></div></div><div class="ec-line"><div class="code">
    </div></div><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span class="twoslash" style="--0:#82AAFF;--1:#3B61B0"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span style="--0:#82AAFF;--1:#3B61B0">rpId</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#C792EA;--1:#8844AE"> </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">account.example.com</span><span style="--0:#D9F5DD;--1:#111111">"</span></div></div></code></pre></figure></div></span></code></div><span style="--0:#82AAFF;--1:#3B61B0">rpId</span></span></span><span style="--0:#C792EA;--1:#8844AE"> = </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">account.example.com</span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#D6DEEB;--1:#403F53">;</span></div></div><div class="ec-line"><div class="code">
    </div></div><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span class="twoslash" style="--0:#82AAFF;--1:#3B61B0"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span style="--0:#82AAFF;--1:#3B61B0">created</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#C792EA;--1:#8844AE"> createPasskeyWithPrfOutput.</span><span style="--0:#FFCB8B;--1:#111111">Result</span></div></div></code></pre></figure></div></span></code></div><span style="--0:#82AAFF;--1:#3B61B0">created</span></span></span><span style="--0:#C792EA;--1:#8844AE"> = await </span><span class="twoslash" style="--0:#82AAFF;--1:#3B61B0"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">function</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#82AAFF;--1:#3B61B0">createPasskeyWithPrfOutput</span><span style="--0:#D9F5DD;--1:#111111">(</span><span style="--1:#403F53"><span style="--0:#D6DEEB">{ </span><span style="--0:#D7DBE0">rp</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> </span><span style="--0:#D7DBE0">user</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> </span><span style="--0:#D7DBE0">timeout</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> </span><span style="--0:#D7DBE0">prfSalt</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> </span><span style="--0:#D7DBE0">webAuthnClient</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--0:#D6DEEB;--1:#403F53"> }</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#D6DEEB;--1:#403F53"> createPasskeyWithPrfOutput</span><span style="--0:#C792EA;--1:#8844AE">.</span><span style="--1:#111111"><span style="--0:#FFCB8B">Options</span><span style="--0:#D9F5DD">)</span></span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#FFCB8B;--1:#111111">Promise</span><span style="--0:#D6DEEB;--1:#403F53">&#x3C;</span><span style="--0:#889FB2;--1:#4D667B">createPasskeyWithPrfOutput</span><span style="--0:#C792EA;--1:#8844AE">.</span><span style="--0:#FFCB8B;--1:#111111">Result</span><span style="--0:#D6DEEB;--1:#403F53">></span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Creates a discoverable, user-verified passkey that requires WebAuthn PRF
    support and returns the first PRF output.</p><p></p></div><div class="twoslash-popup-docs twoslash-popup-docs-tags"><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@param</span> ― <span class="twoslash-popup-docs-tag-value">options - Passkey creation inputs.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@returns</span> ― <span class="twoslash-popup-docs-tag-value">Credential metadata and the first PRF output.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@remarks</span> ― <span class="twoslash-popup-docs-tag-value"></span></p><p>Runs one creation ceremony and shows one user-verification prompt. On
    authenticators that do not evaluate PRF during creation, a fallback
    assertion evaluates the same salt and shows a second prompt.</p>
    <p>WebAuthn challenges and the credential's user handle (<code>user.id</code>) are
    generated internally, 32 random bytes each. An authenticator overwrites a
    discoverable credential that has the same <code>rp.id</code> and <code>user.id</code>, so a fresh
    handle per call adds a passkey instead of replacing one.</p>
    <p>The credential is requested with fixed parameters: ES256 or RS256 key types,
    attestation <code>"none"</code>, a required resident key, and required user
    verification (getPasskeyPrfOutput explains the requirement).</p>
    <p>Any failure after the creation ceremony completes leaves the passkey on the
    authenticator, but the thrown error does not carry its metadata.</p><p></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>PRF_UNAVAILABLE</code> when the authenticator reports no PRF support and returns no create-time output, returns an output that is not 32 bytes, or returns none on the fallback ceremony.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>INPUT_INVALID</code> when an explicit <code>prfSalt</code> is not 32 bytes.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>CRYPTO_UNAVAILABLE</code> when <code>crypto.getRandomValues</code> is unavailable.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>PASSKEY_OPERATION_FAILED</code> when WebAuthn is unavailable, cancelled, or returns an unexpected credential.</span></p></div></div><span style="--0:#82AAFF;--1:#3B61B0">createPasskeyWithPrfOutput</span></span></span><span style="--0:#D6DEEB;--1:#403F53">(</span><span style="--0:#C792EA;--1:#8844AE">{</span></div></div><div class="ec-line"><div class="code"><span class="indent"><span style="--0:#C792EA;--1:#8844AE">  </span></span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">rp: PasskeyRelyingParty</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Relying party identity passed to WebAuthn. <code>id</code> is required so the
    fallback assertion can target the same relying party.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">rp</span></span></span><span style="--0:#C792EA;--1:#8844AE">: { </span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">id: string</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Relying party ID: the host the passkey is scoped to.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">id</span></span></span><span style="--0:#C792EA;--1:#8844AE">: </span><span class="twoslash" style="--0:#D6DEEB;--1:#403F53"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span style="--0:#82AAFF;--1:#3B61B0">rpId</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#C792EA;--1:#8844AE"> </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">account.example.com</span><span style="--0:#D9F5DD;--1:#111111">"</span></div></div></code></pre></figure></div></span></code></div><span style="--0:#D6DEEB;--1:#403F53">rpId</span></span></span><span style="--0:#C792EA;--1:#8844AE">, </span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">name: string</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Relying party name the authenticator may show.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">name</span></span></span><span style="--0:#C792EA;--1:#8844AE">: </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">Example</span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#C792EA;--1:#8844AE"> },</span></div></div><div class="ec-line"><div class="code"><span class="indent"><span style="--0:#C792EA;--1:#8844AE">  </span></span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">user: {</span></div></div><div class="ec-line"><div class="code"><span class="indent"><span style="--0:#D6DEEB;--1:#403F53">    </span></span><span style="--0:#D6DEEB;--1:#403F53">name: string;</span></div></div><div class="ec-line"><div class="code"><span class="indent"><span style="--0:#D6DEEB;--1:#403F53">    </span></span><span style="--0:#D6DEEB;--1:#403F53">displayName: string;</span></div></div><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">}</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>User identity passed to WebAuthn.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">user</span></span></span><span style="--0:#C792EA;--1:#8844AE">: { </span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">name: string</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>User name displayed or stored by the authenticator.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">name</span></span></span><span style="--0:#C792EA;--1:#8844AE">: </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">account@example.com</span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#C792EA;--1:#8844AE">, </span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">displayName: string</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Human-readable display name for the authenticator UI.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">displayName</span></span></span><span style="--0:#C792EA;--1:#8844AE">: </span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#ECC48D;--1:#984E4D">Example account</span><span style="--0:#D9F5DD;--1:#111111">"</span><span style="--0:#C792EA;--1:#8844AE"> },</span></div></div><div class="ec-line"><div class="code"><span class="indent"><span style="--0:#C792EA;--1:#8844AE">  </span></span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">webAuthnClient</span><span style="--0:#C792EA;--1:#8844AE">?:</span><span style="--0:#D6DEEB;--1:#403F53"> WebAuthnClient </span><span style="--0:#C792EA;--1:#8844AE">|</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#82AAFF;--1:#3B61B0">undefined</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Client that runs the WebAuthn ceremonies. Defaults to the built-in browser
    client, which calls <code>navigator.credentials</code>.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">webAuthnClient</span></span></span><span style="--0:#C792EA;--1:#8844AE">: </span><span class="twoslash" style="--0:#D6DEEB;--1:#403F53"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span style="--0:#82AAFF;--1:#3B61B0">reactNativeWebAuthnClient</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#C792EA;--1:#8844AE"> </span><span style="--0:#FFCB8B;--1:#111111">WebAuthnClient</span></div></div></code></pre></figure></div></span></code></div><span style="--0:#D6DEEB;--1:#403F53">reactNativeWebAuthnClient</span></span></span><span style="--0:#C792EA;--1:#8844AE">,</span></div></div><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">}</span><span style="--0:#D6DEEB;--1:#403F53">);</span></div></div><div class="ec-line"><div class="code">
    </div></div><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span class="twoslash" style="--0:#82AAFF;--1:#3B61B0"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span style="--0:#82AAFF;--1:#3B61B0">signedIn</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#C792EA;--1:#8844AE"> getPasskeyPrfOutput.</span><span style="--0:#FFCB8B;--1:#111111">Result</span></div></div></code></pre></figure></div></span></code></div><span style="--0:#82AAFF;--1:#3B61B0">signedIn</span></span></span><span style="--0:#C792EA;--1:#8844AE"> = await </span><span class="twoslash" style="--0:#82AAFF;--1:#3B61B0"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">function</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#82AAFF;--1:#3B61B0">getPasskeyPrfOutput</span><span style="--0:#D9F5DD;--1:#111111">(</span><span style="--1:#403F53"><span style="--0:#D6DEEB">{ </span><span style="--0:#D7DBE0">rpId</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> credential: </span><span style="--0:#D7DBE0">allowCredential</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> </span><span style="--0:#D7DBE0">prfSalt</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> </span><span style="--0:#D7DBE0">timeout</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--1:#403F53"><span style="--0:#D6DEEB"> </span><span style="--0:#D7DBE0">webAuthnClient</span></span><span style="--0:#889FB2;--1:#4D667B">,</span><span style="--0:#D6DEEB;--1:#403F53"> }</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#D6DEEB;--1:#403F53"> getPasskeyPrfOutput</span><span style="--0:#C792EA;--1:#8844AE">.</span><span style="--1:#111111"><span style="--0:#FFCB8B">Options</span><span style="--0:#D9F5DD">)</span></span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#FFCB8B;--1:#111111">Promise</span><span style="--0:#D6DEEB;--1:#403F53">&#x3C;</span><span style="--0:#889FB2;--1:#4D667B">getPasskeyPrfOutput</span><span style="--0:#C792EA;--1:#8844AE">.</span><span style="--0:#FFCB8B;--1:#111111">Result</span><span style="--0:#D6DEEB;--1:#403F53">></span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Requests a passkey PRF evaluation and returns the first output.</p><p></p></div><div class="twoslash-popup-docs twoslash-popup-docs-tags"><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@param</span> ― <span class="twoslash-popup-docs-tag-value">options - Passkey PRF request inputs.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@returns</span> ― <span class="twoslash-popup-docs-tag-value">The selected credential ID and first WebAuthn PRF output.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@remarks</span> ― <span class="twoslash-popup-docs-tag-value"></span></p><p>Runs one assertion ceremony and shows one user-verification prompt.</p>
    <p>The WebAuthn challenge is generated internally.</p>
    <p>The default salt is <code>sha256("mera.prf.salt.v1")</code> and will not change across
    library versions. The PRF output is a deterministic function of the
    credential, <code>rpId</code>, and salt; a different salt yields an unrelated output.</p>
    <p>The assertion requires user verification, and the requirement is not
    configurable. User verification is the authenticator's local check; the
    gesture depends on the platform (a biometric, a device PIN, or a password).
    Authenticators built on CTAP's <code>hmac-secret</code> keep two PRFs per credential,
    one for user-verified requests and one for the rest; WebAuthn exposes only
    the user-verified PRF and overrides a weaker <code>userVerification</code> setting
    when evaluating it, so a configurable setting could neither change the PRF
    output nor skip the check.</p><p></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@see</span> ― <span class="twoslash-popup-docs-tag-value"><a href="https://www.w3.org/TR/webauthn-3/#prf-extension">https://www.w3.org/TR/webauthn-3/#prf-extension</a> WebAuthn: the PRF extension</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@see</span> ― <span class="twoslash-popup-docs-tag-value"><a href="https://www.w3.org/TR/webauthn-3/#enumdef-userverificationrequirement">https://www.w3.org/TR/webauthn-3/#enumdef-userverificationrequirement</a> WebAuthn: UserVerificationRequirement</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>PRF_UNAVAILABLE</code> when the authenticator does not return a usable 32-byte PRF output.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>INPUT_INVALID</code> when an explicit <code>prfSalt</code> is not 32 bytes, or <code>credential.credentialId</code> is empty or not canonical base64url.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>CRYPTO_UNAVAILABLE</code> when <code>crypto.getRandomValues</code> is unavailable.</span></p><p class="twoslash-popup-docs-tagline"><span class="twoslash-popup-docs-tag-name">@throws</span> ― <span class="twoslash-popup-docs-tag-value">MeraError with code <code>PASSKEY_OPERATION_FAILED</code> when WebAuthn is unavailable, cancelled, or returns an unexpected credential.</span></p></div></div><span style="--0:#82AAFF;--1:#3B61B0">getPasskeyPrfOutput</span></span></span><span style="--0:#D6DEEB;--1:#403F53">(</span><span style="--0:#C792EA;--1:#8844AE">{</span></div></div><div class="ec-line"><div class="code"><span class="indent">  </span><span class="twoslash" style="--0:#D6DEEB;--1:#403F53"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">rpId: string</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Relying party ID for the WebAuthn assertion.</p><p></p></div></div><span style="--0:#D6DEEB;--1:#403F53">rpId</span></span></span><span style="--0:#C792EA;--1:#8844AE">,</span></div></div><div class="ec-line"><div class="code"><span class="indent"><span style="--0:#C792EA;--1:#8844AE">  </span></span><span class="twoslash" style="--0:#C792EA;--1:#8844AE"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">webAuthnClient</span><span style="--0:#C792EA;--1:#8844AE">?:</span><span style="--0:#D6DEEB;--1:#403F53"> WebAuthnClient </span><span style="--0:#C792EA;--1:#8844AE">|</span><span style="--0:#D6DEEB;--1:#403F53"> </span><span style="--0:#82AAFF;--1:#3B61B0">undefined</span></div></div></code></pre></figure></div></span></code><div class="twoslash-popup-docs"><p></p><p>Client that runs the WebAuthn ceremony. Defaults to the built-in browser
    client, which calls <code>navigator.credentials</code>.</p><p></p></div></div><span style="--0:#C792EA;--1:#8844AE">webAuthnClient</span></span></span><span style="--0:#C792EA;--1:#8844AE">: </span><span class="twoslash" style="--0:#D6DEEB;--1:#403F53"><span class="twoslash-hover"><div class="twoslash-popup-container not-content"><code class="twoslash-popup-code"><span class="twoslash-popup-code-type"><div class="expressive-code"><figure class="frame"><figcaption class="header"></figcaption><pre data-language="ts"><code><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">const </span><span style="--0:#82AAFF;--1:#3B61B0">reactNativeWebAuthnClient</span><span style="--0:#7FDBCA;--1:#096E72">:</span><span style="--0:#C792EA;--1:#8844AE"> </span><span style="--0:#FFCB8B;--1:#111111">WebAuthnClient</span></div></div></code></pre></figure></div></span></code></div><span style="--0:#D6DEEB;--1:#403F53">reactNativeWebAuthnClient</span></span></span><span style="--0:#C792EA;--1:#8844AE">,</span></div></div><div class="ec-line"><div class="code"><span style="--0:#C792EA;--1:#8844AE">}</span><span style="--0:#D6DEEB;--1:#403F53">);</span></div></div></code></pre><div class="copy"><div aria-live="polite"></div><button title="Copy to clipboard" data-copied="Copied!" data-code="import {  createPasskeyWithPrfOutput,  getPasskeyPrfOutput,} from &#x22;@category-labs/mera&#x22;;import { reactNativeWebAuthnClient } from &#x22;@category-labs/mera/react-native-webauthn-client&#x22;;const rpId = &#x22;account.example.com&#x22;;const created = await createPasskeyWithPrfOutput({  rp: { id: rpId, name: &#x22;Example&#x22; },  user: { name: &#x22;account@example.com&#x22;, displayName: &#x22;Example account&#x22; },  webAuthnClient: reactNativeWebAuthnClient,});const signedIn = await getPasskeyPrfOutput({  rpId,  webAuthnClient: reactNativeWebAuthnClient,});"><div></div></button></div></figure></div>
    <p>Both results contain a credential ID and PRF output. <a href="/recipes/create-passkey-accounts/">Create passkey accounts</a> shows how to derive and use accounts from the PRF output.</p>
    <p>An app can use this client or provide its own <code dir="auto">WebAuthnClient</code>.</p>
    <div class="sl-heading-wrapper level-h2"><h2 id="optional-storage">Optional storage</h2><a class="sl-anchor-link" href="#optional-storage"><span aria-hidden="true" class="sl-anchor-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 1 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 0 0-1.42-1.42m8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 1 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3.88-3.89a4.49 4.49 0 0 0 0-6.33M8.83 15.17a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.92-4.92a1 1 0 1 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42"></path></svg></span><span class="sr-only" data-pagefind-ignore="">Section titled “Optional storage”</span></a></div>
    <p>A mobile app can store the credential ID and PRF output in secure device storage. It can then restore the account without another passkey request.</p>
    <div class="sl-heading-wrapper level-h2"><h2 id="see-also">See also</h2><a class="sl-anchor-link" href="#see-also"><span aria-hidden="true" class="sl-anchor-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 1 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 0 0-1.42-1.42m8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 1 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3.88-3.89a4.49 4.49 0 0 0 0-6.33M8.83 15.17a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.92-4.92a1 1 0 1 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42"></path></svg></span><span class="sr-only" data-pagefind-ignore="">Section titled “See also”</span></a></div>
    <ul>
    <li><a href="https://github.com/category-labs/mera/tree/main/demos/mobile">React Native mobile demo</a>: a full app that stores the credential ID and PRF output in secure device storage.</li>
    <li><a href="/reference/web-authn-client/">WebAuthnClient</a>: the client contract and React Native client errors.</li>
    <li><a href="/authenticator-support/">Authenticator support</a>: browser and operating system support.</li>
    </ul></div><footer class="sl-flex astro-hsjauyix"><div class="meta sl-flex astro-hsjauyix"></div><div class="pagination-links print:hidden astro-lkaayiun" dir="ltr"><a href="/recipes/create-passkey-accounts/" rel="prev" class="astro-lkaayiun"><svg aria-hidden="true" class="astro-lkaayiun astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M17 11H9.41l3.3-3.29a1.004 1.004 0 1 0-1.42-1.42l-5 5a1 1 0 0 0-.21.33 1 1 0 0 0 0 .76 1 1 0 0 0 .21.33l5 5a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095L9.41 13H17a1 1 0 0 0 0-2Z"/></svg><span class="astro-lkaayiun">Previous<br class="astro-lkaayiun"><span class="link-title astro-lkaayiun">Create passkey accounts</span></span></a><a href="/recipes/use-mera-with-chrome-extensions/" rel="next" class="astro-lkaayiun"><svg aria-hidden="true" class="astro-lkaayiun astro-c7spjmhn" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M17.92 11.62a1.001 1.001 0 0 0-.21-.33l-5-5a1.003 1.003 0 1 0-1.42 1.42l3.3 3.29H7a1 1 0 0 0 0 2h7.59l-3.3 3.29a1.002 1.002 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219l5-5a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76Z"/></svg><span class="astro-lkaayiun">Next<br class="astro-lkaayiun"><span class="link-title astro-lkaayiun">Use mera with Chrome extensions</span></span></a></div></footer><footer class="legal astro-jo6i4kqk"><nav aria-label="Legal" class="astro-k2b5ips3"><a href="https://www.category.xyz/terms-of-service" class="astro-k2b5ips3">Terms of Service</a><a href="https://www.category.xyz/privacy-policy" class="astro-k2b5ips3">Privacy Policy</a></nav></footer></div></div></main></div></div></div></div></body></html>
    ✓ • 168ms

## Activity

    $ curl --silent --show-error --location https://mera.category.xyz/reference/web-authn-client/ | perl -0pe 's/<script\b[^>]*>.*?<\/script>//sg; s/<style\b[^>]*>.*?<\/style>//sg; s/<[^>]+>/ /g; s/&quot;/"/g; s/&amp;/\&/g; s/\s+/ /g' | fold -sw 180 | rg -i -C 3 "android|error|provider|passkey|association|credential" | head -180
     WebAuthnClient | mera Skip to content mera Search Ctrl K Cancel Suggested pages Passkey accounts Accounts derived from a passkey with no stored secret. Signing sessions A private
    key held in memory for signing until the session ends. Create passkey accounts Create EVM and Solana accounts from a passkey. Send a transaction with viem Send an EVM transaction
    from a passkey account with viem. GitHub Get started Getting started&nbsp;→ Menu Getting started Concepts Passkey accounts Signing sessions Security model Secret vaults (advanced)
    Foundations Passkeys and the PRF extension Keys and accounts Recipes Create passkey accounts Use mera with React Native Use mera with Chrome extensions Send a transaction with
    viem Encrypt an existing secret with a passkey Authenticator support Reference Overview Passkeys createPasskeyWithPrfOutput getPasskeyPrfOutput WebAuthnClient Signing sessions
    createSecp256k1SigningSession Secp256k1SigningSession createEd25519SigningSession Ed25519SigningSession toViemAccount Secret vault createSecretVaultWithNewPasskey
    createSecretVaultWithExistingPasskey decryptSecretVaultWithPasskey parseSecretVault Secret vault format Addresses getEvmAddress getSolanaAddress Errors GitHub On this page
    Overview Members WebAuthnClient.CreateCredentialRequest WebAuthnClient.CreateCredentialResult WebAuthnClient.GetCredentialRequest WebAuthnClient.GetCredentialResult Usage
    reactNativeWebAuthnClient See also On this page Overview Members WebAuthnClient.CreateCredentialRequest WebAuthnClient.CreateCredentialResult WebAuthnClient.GetCredentialRequest
    WebAuthnClient.GetCredentialResult Usage reactNativeWebAuthnClient See also WebAuthnClient WebAuthnClient is the abstraction layer between mera’s passkey functions and a
    platform’s WebAuthn API. For each call, mera builds a request that the client converts to the platform’s format and sends to the API. The built-in browser client calls
    navigator.credentials . Apps on other platforms can provide a client that implements createCredential and getCredential . Members Section titled “Members” type type WebAuthnClient
    = { readonly createCredential : ( request : MeraWebAuthnClient . CreateCredentialRequest ) => Promise &#x3C; MeraWebAuthnClient . CreateCredentialResult >; readonly getCredential
    : ( request : MeraWebAuthnClient . GetCredentialRequest ) => Promise &#x3C; MeraWebAuthnClient . GetCredentialResult >; } WebAuthnClient = { readonly createCredential: ( request :
    MeraWebAuthnClient . CreateCredentialRequest ) => Promise &#x3C; MeraWebAuthnClient . CreateCredentialResult > createCredential : ( request: MeraWebAuthnClient .
    CreateCredentialRequest request : (alias) namespace MeraWebAuthnClient import MeraWebAuthnClient MeraWebAuthnClient . type WebAuthnClient.CreateCredentialRequest = { rp :
    PasskeyRelyingParty ; user : { id : Uint8Array &#x3C; ArrayBuffer >; name : string ; displayName : string ; }; challenge : Uint8Array &#x3C; ArrayBuffer >; algorithms : readonly
    number []; prfSalt : Uint8Array &#x3C; ArrayBuffer >; residentKey : " required " ; userVerification : " required " ; attestation : " none " ; timeout ?: number ; } Ceremony
    parameters for creating one passkey and evaluating its PRF. CreateCredentialRequest , ) => interface Promise&#x3C; T > Represents the completion of an asynchronous operation
    Promise &#x3C; (alias) namespace MeraWebAuthnClient import MeraWebAuthnClient MeraWebAuthnClient . type WebAuthnClient.CreateCredentialResult = { credentialId : Uint8Array ;
    transports ?: readonly PasskeyCredentialTransport []; prfEnabled : boolean ; prfOutput ?: Uint8Array ; } Outcome of one credential-creation ceremony. CreateCredentialResult >;
    readonly getCredential: ( request : MeraWebAuthnClient . GetCredentialRequest ) => Promise &#x3C; MeraWebAuthnClient . GetCredentialResult > getCredential : ( request:
    MeraWebAuthnClient . GetCredentialRequest request : (alias) namespace MeraWebAuthnClient import MeraWebAuthnClient MeraWebAuthnClient . type WebAuthnClient.GetCredentialRequest =
    { rpId : string ; challenge : Uint8Array &#x3C; ArrayBuffer >; allowCredential ?: MeraWebAuthnClient . AllowCredential ; prfSalt : Uint8Array &#x3C; ArrayBuffer >;
    userVerification : " required " ; timeout ?: number ; } Ceremony parameters for asserting a passkey and evaluating its PRF. GetCredentialRequest , ) => interface Promise&#x3C; T >
    Represents the completion of an asynchronous operation Promise &#x3C; (alias) namespace MeraWebAuthnClient import MeraWebAuthnClient MeraWebAuthnClient . type
    WebAuthnClient.GetCredentialResult = { credentialId : Uint8Array ; prfOutput ?: Uint8Array ; } Outcome of one assertion ceremony. GetCredentialResult >; }; Promise ; readonly
    getCredential: ( request: MeraWebAuthnClient.GetCredentialRequest, ) => Promise ;};"> Related types: WebAuthnClient.CreateCredentialRequest ,
    WebAuthnClient.CreateCredentialResult , WebAuthnClient.GetCredentialRequest , and WebAuthnClient.GetCredentialResult . WebAuthnClient.CreateCredentialRequest Section titled
    “WebAuthnClient.CreateCredentialRequest” The relying party, user, challenge, credential policy, and PRF salt for a creation ceremony. WebAuthnClient.CreateCredentialResult Section
    titled “WebAuthnClient.CreateCredentialResult” The new credential ID, reported transports, PRF support flag, and optional PRF output. WebAuthnClient.GetCredentialRequest Section
    titled “WebAuthnClient.GetCredentialRequest” The relying party ID, challenge, optional allowed credential, and PRF salt for an assertion ceremony.
    WebAuthnClient.GetCredentialResult Section titled “WebAuthnClient.GetCredentialResult” The credential ID that answered and its optional PRF output. Requests and results use
    Uint8Array for binary values. When creation enables PRF but returns no output, mera calls getCredential with the same client and salt. A PRF output that is not 32 bytes fails with
    PRF_UNAVAILABLE . Anything a client throws surfaces as PASSKEY_OPERATION_FAILED with the original error as its cause . Usage Section titled “Usage” import { function
    getPasskeyPrfOutput ( { rpId , credential: allowCredential , prfSalt , timeout , webAuthnClient , } : getPasskeyPrfOutput . Options ) : Promise &#x3C; getPasskeyPrfOutput . Result
    > Requests a passkey PRF evaluation and returns the first output. @param ― options - Passkey PRF request inputs. @returns ― The selected credential ID and first WebAuthn PRF
    output. @remarks ― Runs one assertion ceremony and shows one user-verification prompt. The WebAuthn challenge is generated internally. The default salt is
    sha256("mera.prf.salt.v1") and will not change across library versions. The PRF output is a deterministic function of the credential, rpId , and salt; a different salt yields an
    unrelated output. The assertion requires user verification, and the requirement is not configurable. User verification is the authenticator's local check; the gesture depends on
    the platform (a biometric, a device PIN, or a password). Authenticators built on CTAP's hmac-secret keep two PRFs per credential, one for user-verified requests and one for the
    rest; WebAuthn exposes only the user-verified PRF and overrides a weaker userVerification setting when evaluating it, so a configurable setting could neither change the PRF output
    nor skip the check. @see ― https://www.w3.org/TR/webauthn-3/#prf-extension WebAuthn: the PRF extension @see ― https://www.w3.org/TR/webauthn-3/#enumdef-userverificationrequirement
    WebAuthn: UserVerificationRequirement @throws ― MeraError with code PRF_UNAVAILABLE when the authenticator does not return a usable 32-byte PRF output. @throws ― MeraError with
    code INPUT_INVALID when an explicit prfSalt is not 32 bytes, or credential.credentialId is empty or not canonical base64url. @throws ― MeraError with code CRYPTO_UNAVAILABLE when
    crypto.getRandomValues is unavailable. @throws ― MeraError with code PASSKEY_OPERATION_FAILED when WebAuthn is unavailable, cancelled, or returns an unexpected credential.
    getPasskeyPrfOutput } from " @category-labs/mera " ; import { const reactNativeWebAuthnClient : WebAuthnClient reactNativeWebAuthnClient } from "
    @category-labs/mera/react-native-webauthn-client " ; const { const prfOutput : Uint8Array &#x3C; ArrayBuffer > First PRF output from WebAuthn. Always 32 bytes. prfOutput } = await
    function getPasskeyPrfOutput ( { rpId , credential: allowCredential , prfSalt , timeout , webAuthnClient , } : getPasskeyPrfOutput . Options ) : Promise &#x3C; getPasskeyPrfOutput
    . Result > Requests a passkey PRF evaluation and returns the first output. @param ― options - Passkey PRF request inputs. @returns ― The selected credential ID and first WebAuthn
    PRF output. @remarks ― Runs one assertion ceremony and shows one user-verification prompt. The WebAuthn challenge is generated internally. The default salt is
    sha256("mera.prf.salt.v1") and will not change across library versions. The PRF output is a deterministic function of the credential, rpId , and salt; a different salt yields an
    unrelated output. The assertion requires user verification, and the requirement is not configurable. User verification is the authenticator's local check; the gesture depends on
    the platform (a biometric, a device PIN, or a password). Authenticators built on CTAP's hmac-secret keep two PRFs per credential, one for user-verified requests and one for the
    rest; WebAuthn exposes only the user-verified PRF and overrides a weaker userVerification setting when evaluating it, so a configurable setting could neither change the PRF output
    nor skip the check. @see ― https://www.w3.org/TR/webauthn-3/#prf-extension WebAuthn: the PRF extension @see ― https://www.w3.org/TR/webauthn-3/#enumdef-userverificationrequirement
    WebAuthn: UserVerificationRequirement @throws ― MeraError with code PRF_UNAVAILABLE when the authenticator does not return a usable 32-byte PRF output. @throws ― MeraError with
    code INPUT_INVALID when an explicit prfSalt is not 32 bytes, or credential.credentialId is empty or not canonical base64url. @throws ― MeraError with code CRYPTO_UNAVAILABLE when
    crypto.getRandomValues is unavailable. @throws ― MeraError with code PASSKEY_OPERATION_FAILED when WebAuthn is unavailable, cancelled, or returns an unexpected credential.
    getPasskeyPrfOutput ( { rpId: string Relying party ID for the WebAuthn assertion. rpId : " account.example.com " , webAuthnClient ?: WebAuthnClient | undefined Client that runs
    the WebAuthn ceremony. Defaults to the built-in browser client, which calls navigator.credentials . webAuthnClient : const reactNativeWebAuthnClient : WebAuthnClient
    reactNativeWebAuthnClient , } ); reactNativeWebAuthnClient Section titled “reactNativeWebAuthnClient” The React Native client requires react-native-passkey . It lives in a
    separate entry point, so the root package loads no React Native code. The cause inside PASSKEY_OPERATION_FAILED is react-native-passkey’s PasskeyError . See also Section titled
    “See also” getPasskeyPrfOutput : the assertion that returns PRF output. createPasskeyWithPrfOutput : the creation ceremony and its fallback assertion. Use mera with React Native :
    configure passkeys in a React Native app. Authenticator support : browser and operating system support. Passkeys and the PRF extension : ceremonies, prompts, and user
    verification. Previous getPasskeyPrfOutput Next createSecp256k1SigningSession Terms of Service Privacy Policy
    ✓ • 43ms

## Activity

    $ curl --silent --show-error --location https://mera.category.xyz/recipes/use-mera-with-react-native/ | perl -0pe 's/<script\b[^>]*>.*?<\/script>//sg; s/<style\b[^>]*>.*?<\/style>//sg; s/<[^>]+>/ /g; s/&(?:#x27|#39);/'\''/g; s/&quot;/"/g; s/&amp;/\&/g; s/\s+/ /g' | fold -sw 180 | sed -n '1,140p'
     Use mera with React Native | mera Skip to content mera Search Ctrl K Cancel Suggested pages Passkey accounts Accounts derived from a passkey with no stored secret. Signing
    sessions A private key held in memory for signing until the session ends. Create passkey accounts Create EVM and Solana accounts from a passkey. Send a transaction with viem Send
    an EVM transaction from a passkey account with viem. GitHub Get started Getting started&nbsp;→ Menu Getting started Concepts Passkey accounts Signing sessions Security model
    Secret vaults (advanced) Foundations Passkeys and the PRF extension Keys and accounts Recipes Create passkey accounts Use mera with React Native Use mera with Chrome extensions
    Send a transaction with viem Encrypt an existing secret with a passkey Authenticator support Reference Overview Passkeys createPasskeyWithPrfOutput getPasskeyPrfOutput
    WebAuthnClient Signing sessions createSecp256k1SigningSession Secp256k1SigningSession createEd25519SigningSession Ed25519SigningSession toViemAccount Secret vault
    createSecretVaultWithNewPasskey createSecretVaultWithExistingPasskey decryptSecretVaultWithPasskey parseSecretVault Secret vault format Addresses getEvmAddress getSolanaAddress
    Errors GitHub On this page Overview Requirements Install the packages Example polyfill Link the app to the relying party domain iOS Android Use the React Native WebAuthn client
    Optional storage See also On this page Overview Requirements Install the packages Example polyfill Link the app to the relying party domain iOS Android Use the React Native
    WebAuthn client Optional storage See also Use mera with React Native Requirements Section titled “Requirements” An HTTPS host for the relying party ID. crypto.getRandomValues .
    Hermes does not provide it, so Hermes apps need a polyfill. Install the packages Section titled “Install the packages” Terminal window npm install @category-labs/mera
    react-native-passkey Example polyfill Section titled “Example polyfill” This Expo example uses expo-crypto : Terminal window npx expo install expo-crypto import { function
    getRandomValues &#x3C; T extends IntBasedTypedArray | UintBasedTypedArray > ( typedArray : T ) : T The getRandomValues() method of Crypto fills a provided TypedArray with
    cryptographically secure random values. @param ― typedArray An integer based TypedArray to fill with cryptographically secure random values. It modifies the input array in place.
    @return ― The input array filled with cryptographically secure random values. @example const byteArray = new Uint8Array ( 16 ); Crypto . getRandomValues (byteArray); console . log
    ( ' Your lucky bytes: ' + byteArray); getRandomValues } from " expo-crypto " ; if ( typeof module globalThis globalThis . var crypto : Crypto MDN Reference crypto ?. Crypto .
    getRandomValues &#x3C; T extends ArrayBufferView > ( array : T ) : T The Crypto.getRandomValues() method lets you get cryptographically strong random values. MDN Reference
    getRandomValues !== " function " ) { var Object : ObjectConstructor Provides functionality common to all JavaScript objects. Object . ObjectConstructor . defineProperty &#x3C;
    typeof globalThis>(o: typeof globalThis, p: PropertyKey, attributes: PropertyDescriptor &#x26; ThisType &#x3C; any > ): typeof globalThis Adds a property to an object, or modifies
    attributes of an existing property. @param ― o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in
    object) or a DOM object. @param ― p The property name. @param ― attributes Descriptor for the property. It can be for a data property or an accessor property. defineProperty (
    module globalThis globalThis , " crypto " , { PropertyDescriptor . configurable ?: boolean | undefined configurable : true , PropertyDescriptor . value ?: any value : { ... module
    globalThis globalThis . var crypto : Crypto MDN Reference crypto , getRandomValues: &#x3C; T extends IntBasedTypedArray | UintBasedTypedArray > ( typedArray : T ) => T
    getRandomValues }, }); } Load the polyfill before any code that imports mera: import " ./src/polyfills " ; Link the app to the relying party domain Section titled “Link the app to
    the relying party domain” The relying party ID is the host the passkeys belong to. Use a host name without https:// or a path. The host must list the app in the platform file
    below. iOS Section titled “iOS” Serve this JSON from https://account.example.com/.well-known/apple-app-site-association : { "webcredentials" : { "apps" : [ "
    TEAM_ID.com.example.app " ] } } Replace TEAM_ID with the Apple team ID and com.example.app with the bundle ID. Add this value under Associated Domains in Xcode:
    webcredentials:account.example.com Android Section titled “Android” Serve this JSON from https://account.example.com/.well-known/assetlinks.json : [ { "relation" : [ "
    delegate_permission/common.get_login_creds " ], "target" : { "namespace" : " android_app " , "package_name" : " com.example.app " , "sha256_cert_fingerprints" : [ "
    SHA256_FINGERPRINT " ] } } ] Replace the package name and fingerprint with those of the Android app. Include every certificate used to sign the app. For a local build, print the
    debug certificate with: Terminal window keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android Both files must be public over HTTPS and
    return JSON without a redirect. Use the React Native WebAuthn client Section titled “Use the React Native WebAuthn client” reactNativeWebAuthnClient uses the iOS and Android API
    bindings from react-native-passkey . Pass it to each mera function that uses a passkey: import { function createPasskeyWithPrfOutput ( { rp , user , timeout , prfSalt ,
    webAuthnClient , } : createPasskeyWithPrfOutput . Options ) : Promise &#x3C; createPasskeyWithPrfOutput . Result > Creates a discoverable, user-verified passkey that requires
    WebAuthn PRF support and returns the first PRF output. @param ― options - Passkey creation inputs. @returns ― Credential metadata and the first PRF output. @remarks ― Runs one
    creation ceremony and shows one user-verification prompt. On authenticators that do not evaluate PRF during creation, a fallback assertion evaluates the same salt and shows a
    second prompt. WebAuthn challenges and the credential's user handle ( user.id ) are generated internally, 32 random bytes each. An authenticator overwrites a discoverable
    credential that has the same rp.id and user.id , so a fresh handle per call adds a passkey instead of replacing one. The credential is requested with fixed parameters: ES256 or
    RS256 key types, attestation "none" , a required resident key, and required user verification (getPasskeyPrfOutput explains the requirement). Any failure after the creation
    ceremony completes leaves the passkey on the authenticator, but the thrown error does not carry its metadata. @throws ― MeraError with code PRF_UNAVAILABLE when the authenticator
    reports no PRF support and returns no create-time output, returns an output that is not 32 bytes, or returns none on the fallback ceremony. @throws ― MeraError with code
    INPUT_INVALID when an explicit prfSalt is not 32 bytes. @throws ― MeraError with code CRYPTO_UNAVAILABLE when crypto.getRandomValues is unavailable. @throws ― MeraError with code
    PASSKEY_OPERATION_FAILED when WebAuthn is unavailable, cancelled, or returns an unexpected credential. createPasskeyWithPrfOutput , function getPasskeyPrfOutput ( { rpId ,
    credential: allowCredential , prfSalt , timeout , webAuthnClient , } : getPasskeyPrfOutput . Options ) : Promise &#x3C; getPasskeyPrfOutput . Result > Requests a passkey PRF
    evaluation and returns the first output. @param ― options - Passkey PRF request inputs. @returns ― The selected credential ID and first WebAuthn PRF output. @remarks ― Runs one
    assertion ceremony and shows one user-verification prompt. The WebAuthn challenge is generated internally. The default salt is sha256("mera.prf.salt.v1") and will not change
    across library versions. The PRF output is a deterministic function of the credential, rpId , and salt; a different salt yields an unrelated output. The assertion requires user
    verification, and the requirement is not configurable. User verification is the authenticator's local check; the gesture depends on the platform (a biometric, a device PIN, or a
    password). Authenticators built on CTAP's hmac-secret keep two PRFs per credential, one for user-verified requests and one for the rest; WebAuthn exposes only the user-verified
    PRF and overrides a weaker userVerification setting when evaluating it, so a configurable setting could neither change the PRF output nor skip the check. @see ―
    https://www.w3.org/TR/webauthn-3/#prf-extension WebAuthn: the PRF extension @see ― https://www.w3.org/TR/webauthn-3/#enumdef-userverificationrequirement WebAuthn:
    UserVerificationRequirement @throws ― MeraError with code PRF_UNAVAILABLE when the authenticator does not return a usable 32-byte PRF output. @throws ― MeraError with code
    INPUT_INVALID when an explicit prfSalt is not 32 bytes, or credential.credentialId is empty or not canonical base64url. @throws ― MeraError with code CRYPTO_UNAVAILABLE when
    crypto.getRandomValues is unavailable. @throws ― MeraError with code PASSKEY_OPERATION_FAILED when WebAuthn is unavailable, cancelled, or returns an unexpected credential.
    getPasskeyPrfOutput , } from " @category-labs/mera " ; import { const reactNativeWebAuthnClient : WebAuthnClient reactNativeWebAuthnClient } from "
    @category-labs/mera/react-native-webauthn-client " ; const const rpId : " account.example.com " rpId = " account.example.com " ; const const created : createPasskeyWithPrfOutput.
    Result created = await function createPasskeyWithPrfOutput ( { rp , user , timeout , prfSalt , webAuthnClient , } : createPasskeyWithPrfOutput . Options ) : Promise &#x3C;
    createPasskeyWithPrfOutput . Result > Creates a discoverable, user-verified passkey that requires WebAuthn PRF support and returns the first PRF output. @param ― options - Passkey
    creation inputs. @returns ― Credential metadata and the first PRF output. @remarks ― Runs one creation ceremony and shows one user-verification prompt. On authenticators that do
    not evaluate PRF during creation, a fallback assertion evaluates the same salt and shows a second prompt. WebAuthn challenges and the credential's user handle ( user.id ) are
    generated internally, 32 random bytes each. An authenticator overwrites a discoverable credential that has the same rp.id and user.id , so a fresh handle per call adds a passkey
    instead of replacing one. The credential is requested with fixed parameters: ES256 or RS256 key types, attestation "none" , a required resident key, and required user verification
    (getPasskeyPrfOutput explains the requirement). Any failure after the creation ceremony completes leaves the passkey on the authenticator, but the thrown error does not carry its
    metadata. @throws ― MeraError with code PRF_UNAVAILABLE when the authenticator reports no PRF support and returns no create-time output, returns an output that is not 32 bytes, or
    returns none on the fallback ceremony. @throws ― MeraError with code INPUT_INVALID when an explicit prfSalt is not 32 bytes. @throws ― MeraError with code CRYPTO_UNAVAILABLE when
    crypto.getRandomValues is unavailable. @throws ― MeraError with code PASSKEY_OPERATION_FAILED when WebAuthn is unavailable, cancelled, or returns an unexpected credential.
    createPasskeyWithPrfOutput ( { rp: PasskeyRelyingParty Relying party identity passed to WebAuthn. id is required so the fallback assertion can target the same relying party. rp :
    { id: string Relying party ID: the host the passkey is scoped to. id : const rpId : " account.example.com " rpId , name: string Relying party name the authenticator may show. name
    : " Example " }, user: { name: string; displayName: string; } User identity passed to WebAuthn. user : { name: string User name displayed or stored by the authenticator. name : "
    account@example.com " , displayName: string Human-readable display name for the authenticator UI. displayName : " Example account " }, webAuthnClient ?: WebAuthnClient | undefined
    Client that runs the WebAuthn ceremonies. Defaults to the built-in browser client, which calls navigator.credentials . webAuthnClient : const reactNativeWebAuthnClient :
    WebAuthnClient reactNativeWebAuthnClient , } ); const const signedIn : getPasskeyPrfOutput. Result signedIn = await function getPasskeyPrfOutput ( { rpId , credential:
    allowCredential , prfSalt , timeout , webAuthnClient , } : getPasskeyPrfOutput . Options ) : Promise &#x3C; getPasskeyPrfOutput . Result > Requests a passkey PRF evaluation and
    returns the first output. @param ― options - Passkey PRF request inputs. @returns ― The selected credential ID and first WebAuthn PRF output. @remarks ― Runs one assertion
    ceremony and shows one user-verification prompt. The WebAuthn challenge is generated internally. The default salt is sha256("mera.prf.salt.v1") and will not change across library
    versions. The PRF output is a deterministic function of the credential, rpId , and salt; a different salt yields an unrelated output. The assertion requires user verification, and
    the requirement is not configurable. User verification is the authenticator's local check; the gesture depends on the platform (a biometric, a device PIN, or a password).
    Authenticators built on CTAP's hmac-secret keep two PRFs per credential, one for user-verified requests and one for the rest; WebAuthn exposes only the user-verified PRF and
    overrides a weaker userVerification setting when evaluating it, so a configurable setting could neither change the PRF output nor skip the check. @see ―
    https://www.w3.org/TR/webauthn-3/#prf-extension WebAuthn: the PRF extension @see ― https://www.w3.org/TR/webauthn-3/#enumdef-userverificationrequirement WebAuthn:
    UserVerificationRequirement @throws ― MeraError with code PRF_UNAVAILABLE when the authenticator does not return a usable 32-byte PRF output. @throws ― MeraError with code
    INPUT_INVALID when an explicit prfSalt is not 32 bytes, or credential.credentialId is empty or not canonical base64url. @throws ― MeraError with code CRYPTO_UNAVAILABLE when
    crypto.getRandomValues is unavailable. @throws ― MeraError with code PASSKEY_OPERATION_FAILED when WebAuthn is unavailable, cancelled, or returns an unexpected credential.
    getPasskeyPrfOutput ( { rpId: string Relying party ID for the WebAuthn assertion. rpId , webAuthnClient ?: WebAuthnClient | undefined Client that runs the WebAuthn ceremony.
    Defaults to the built-in browser client, which calls navigator.credentials . webAuthnClient : const reactNativeWebAuthnClient : WebAuthnClient reactNativeWebAuthnClient , } );
    Both results contain a credential ID and PRF output. Create passkey accounts shows how to derive and use accounts from the PRF output. An app can use this client or provide its
    own WebAuthnClient . Optional storage Section titled “Optional storage” A mobile app can store the credential ID and PRF output in secure device storage. It can then restore the
    account without another passkey request. See also Section titled “See also” React Native mobile demo : a full app that stores the credential ID and PRF output in secure device
    storage. WebAuthnClient : the client contract and React Native client errors. Authenticator support : browser and operating system support. Previous Create passkey accounts Next
    Use mera with Chrome extensions Terms of Service Privacy Policy
    ✓ • 2.04s

## Activity

    $ curl --silent --show-error --location https://mera.category.xyz/authenticator-support/ | perl -0pe 's/<script\b[^>]*>.*?<\/script>//sg; s/<style\b[^>]*>.*?<\/style>//sg; s/<[^>]+>/ /g; s/&quot;/"/g; s/&amp;/\&/g; s/\s+/ /g' | fold -sw 180 | sed -n '1,180p'
     Authenticator support | mera Skip to content mera Search Ctrl K Cancel Suggested pages Passkey accounts Accounts derived from a passkey with no stored secret. Signing sessions A
    private key held in memory for signing until the session ends. Create passkey accounts Create EVM and Solana accounts from a passkey. Send a transaction with viem Send an EVM
    transaction from a passkey account with viem. GitHub Get started Getting started&nbsp;→ Menu Getting started Concepts Passkey accounts Signing sessions Security model Secret
    vaults (advanced) Foundations Passkeys and the PRF extension Keys and accounts Recipes Create passkey accounts Use mera with React Native Use mera with Chrome extensions Send a
    transaction with viem Encrypt an existing secret with a passkey Authenticator support Reference Overview Passkeys createPasskeyWithPrfOutput getPasskeyPrfOutput WebAuthnClient
    Signing sessions createSecp256k1SigningSession Secp256k1SigningSession createEd25519SigningSession Ed25519SigningSession toViemAccount Secret vault createSecretVaultWithNewPasskey
    createSecretVaultWithExistingPasskey decryptSecretVaultWithPasskey parseSecretVault Secret vault format Addresses getEvmAddress getSolanaAddress Errors GitHub On this page
    Overview Native apps The desktop Chrome complication See also On this page Overview Native apps The desktop Chrome complication See also Authenticator support mera requires three
    things from the authenticator stack: the WebAuthn PRF extension, discoverable credentials, and user verification. Passkeys and the PRF extension defines all three. In the table, ✓
    means a live PRF create + get cycle has been confirmed end-to-end; Not supported means a live test did not return PRF. Authenticator Browser OS Status Supported since 1Password
    any browser with 1Password active any ✓ 2.26.1 beta / Android 8.10.38 beta (2024-07) iCloud Keychain Safari iOS 18+ ✓ Safari 18 / iOS 18 (2024-09) iCloud Keychain Safari macOS 15+
    ✓ Safari 18 / macOS 15 (2024-09) iCloud Keychain Chrome macOS 15+ ✓ Chrome 132+ (2025-01) iCloud Keychain Chrome iOS 18+ ✓ Safari 18 / iOS 18 (2024-09) iCloud Keychain Firefox
    macOS 15+ ✓ Firefox 139+ (2025-05) Google Password Manager Chrome Android ✓ Known by 2026-06 Google Password Manager Chrome Desktop (signed-in) ✓ Chrome 132+ (2025-01) Chrome
    profile Chrome Desktop Not supported (2026-06-01) Google Password Manager Edge Android ✓ Known by 2026-06 Windows Password Manager Edge Windows 11 25H2+ ✓ Windows 11 25H2 +
    2026-02 update Windows Password Manager Chrome Windows 11 25H2+ ✓ Chrome 147+ (2026-04) Windows Password Manager Firefox 148+ Windows 11 25H2+ ✓ Firefox 148+ (2026-02) YubiKey 5C
    Nano Chrome Desktop ✓ Chrome 116+; YubiKey 5.2+ hmac-secret Bitwarden Chrome Desktop Not supported (2026-06-01) Dashlane Chrome Desktop Not supported (2026-06-01) Proton Pass
    Chrome Desktop ✓ Latest public version (2026-06) Native apps Section titled “Native apps” Native apps can use PRF on iOS 18 or later and Android 9 or later. The desktop Chrome
    complication Section titled “The desktop Chrome complication” On desktop Chrome, only passkeys saved to Google Password Manager carry PRF. The local profile authenticator lacks
    hmac-secret , the CTAP primitive behind PRF. Chrome may create the passkey in the local profile instead of Google Password Manager when its “Offer to save passwords and passkeys”
    setting is off, or when a third-party password-manager extension intercepts WebAuthn and relays the browser fallback ceremony . Either way the passkey exists but returns no PRF
    output, so mera cannot use it and createPasskeyWithPrfOutput fails. See also Section titled “See also” Passkeys and the PRF extension : what PRF is and why user verification is
    required. Corbado’s Passkeys &#x26; WebAuthn PRF for End-to-End Encryption : the broader PRF compatibility picture beyond the combinations tested here. Previous Encrypt an
    existing secret with a passkey Next Overview Terms of Service Privacy Policy
    ✓ • 0ms

## Assistant

Mera’s recipe matches the app’s core wiring: it uses the same React Native WebAuthn client, RP ID, and Expo crypto polyfill. The remaining meaningful variable is the Android credential provider: Mera requires a discoverable passkey with PRF and mandatory user verification.

## Activity

    $ sed -n '1,220p' artifacts/ausd-wallet/src/polyfills.ts; rg -n "react-native-passkey|credentialManager|PasskeyError|createCredential|getCredential|clientData" node_modules/@category-labs/mera node_modules/react-native-passkey --glob '*.{ts,tsx,js,jsx,kt,java,md}' 2>/dev/null | head -260
    import { getRandomValues } from 'expo-crypto';
    
    if (typeof globalThis.crypto?.getRandomValues !== 'function') {
      Object.defineProperty(globalThis, 'crypto', {
        configurable: true,
        value: { ...globalThis.crypto, getRandomValues },
      });
    }
    ✓ • 946ms

## Activity

    $ rg -n '"@category-labs/mera"|"react-native-passkey"|"expo-crypto"' pnpm-lock.yaml | head -60; sed -n '50,85p' artifacts/ausd-wallet/package.json
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
    ✓ • 68ms

## Assistant

Mera’s React Native side is correctly wired in this repository.

- The required Expo crypto polyfill is present and loaded before the app: [polyfills.ts](/home/runner/workspace/artifacts/ausd-wallet/src/polyfills.ts:1), imported first from [_layout.tsx](/home/runner/workspace/artifacts/ausd-wallet/app/_layout.tsx:1).
- The required packages are installed: `@category-labs/mera` and `react-native-passkey`.
- The app uses Mera’s required `reactNativeWebAuthnClient` for create, recover, unlock, signing, and encryption: [passkey.ts](/home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts:217).
- RP ID, Android package, live asset link, and release APK certificate all match.

That follows Mera’s official React Native recipe. [Mera React Native recipe](https://mera.category.xyz/recipes/use-mera-with-react-native/)

The likely remaining problem is the device credential provider. Mera needs all three:

1. A discoverable passkey  
2. User verification through device PIN, fingerprint, or face unlock  
3. WebAuthn PRF support  

Mera says Android native apps need Android 9+, but PRF support comes from the selected credential provider. Their verified Android combination is **Google Password Manager**. A provider such as Samsung Pass, an OEM manager, or an older Google Play services build may create/select a passkey yet fail Mera’s PRF ceremony. [Mera authenticator support](https://mera.category.xyz/authenticator-support/)

On the test device:

- Enable a screen lock and biometric or PIN.
- Update Google Play services, Google Password Manager, and Chrome.
- In Android Settings, select **Google Password Manager** as the preferred passkey/password service.
- Create a fresh passkey through Google Password Manager. Mera may show a second verification prompt after creation because it must evaluate PRF.
- Uninstall the old APK, reinstall the newly built APK, then retry. This forces Android to refresh the installed app identity and its domain association.

One diagnostics issue remains in [passkey.ts](/home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts:91): the error formatter can omit an `error` field when the native `PasskeyError` is an `Error` subclass. That can hide the provider’s real rejection reason, leaving only the generic “ceremony could not finish” message. Adding that native error field to the displayed diagnostics would make the next failure actionable.

## User

fix the errir so so we can debug well

## Assistant

I’ll preserve the native `PasskeyError.error` code when it is an `Error` subclass, then show its error name and nested causes. That is the detail currently being lost before it reaches the UI.

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts
    @@ -97,5 +97,6 @@
           const shaped = current as Error & { code?: unknown; error?: unknown; cause?: unknown };
    -      const code = typeof shaped.code === 'string' ? shaped.code : undefined;
    +      const code = [shaped.code, shaped.error].find((part): part is string => typeof part === 'string');
           const message = shaped.message.trim();
    -      const detail = [code, message && message !== code ? message : undefined]
    +      const name = shaped.name && shaped.name !== 'Error' ? shaped.name : undefined;
    +      const detail = [name, code, message && message !== code ? message : undefined]
             .filter((part): part is string => Boolean(part))

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts
    @@ -87,3 +87,6 @@
       }
    -  return error.message || 'Passkey authentication did not complete. Please try again.';
    +  const message = error.message || 'Passkey authentication did not complete. Please try again.';
    +  return nativeDetails && !message.includes(nativeDetails)
    +    ? `${message} Native error: ${nativeDetails}`
    +    : message;
     }

## Assistant

The formatter now retains the native provider code and appends nested details even when Mera returns a nonstandard wrapper error. I’ll run the wallet typecheck to confirm the change compiles.

## Activity

    $ pnpm --filter @workspace/ausd-wallet run typecheck
    
    > @workspace/ausd-wallet@0.0.0 typecheck /home/runner/workspace/artifacts/ausd-wallet
    > tsc -p tsconfig.json --noEmit
    
    ✓ • 12.33s

## Assistant

Updated [passkey.ts](/home/runner/workspace/artifacts/ausd-wallet/services/passkey.ts:91) so failed ceremonies now retain:

- The native `PasskeyError.error` code
- The native error class name
- Nested causes, up to four levels
- Native details even when Mera wraps the failure in an unexpected error shape

The next failure should show a useful result such as:

```text
The passkey ceremony failed. Native error:
PasskeyError: <provider-code>: <provider-message>
```

Wallet typecheck passes.

## User

native error rp id cannot be valdated

## Assistant

“RP ID cannot be validated” is a device-side Android association failure, before Mera evaluates PRF. I’ll inspect the generated Android manifest and the passkey bridge’s Android setup for the required Credential Manager asset-statement configuration.

## Activity

    $ find artifacts/ausd-wallet/android -path '*AndroidManifest.xml' -print -exec sh -c 'echo ---; sed -n "1,240p" "$1"' _ {} \;
    artifacts/ausd-wallet/android/app/src/main/AndroidManifest.xml
    ---
    <manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">
      <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
      <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
      <uses-permission android:name="android.permission.INTERNET"/>
      <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" tools:replace="android:maxSdkVersion"/>
      <uses-permission android:name="android.permission.RECORD_AUDIO"/>
      <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
      <uses-permission android:name="android.permission.VIBRATE"/>
      <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32" tools:replace="android:maxSdkVersion"/>
      <queries>
        <intent>
          <action android:name="android.intent.action.VIEW"/>
          <category android:name="android.intent.category.BROWSABLE"/>
          <data android:scheme="https"/>
        </intent>
      </queries>
      <application android:name=".MainApplication" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:allowBackup="true" android:theme="@style/AppTheme" android:supportsRtl="true" android:enableOnBackInvokedCallback="false" android:fullBackupContent="@xml/secure_store_backup_rules" android:dataExtractionRules="@xml/secure_store_data_extraction_rules">
        <meta-data android:name="expo.modules.updates.ENABLED" android:value="false"/>
        <meta-data android:name="expo.modules.updates.ENABLE_BSDIFF_PATCH_SUPPORT" android:value="true"/>
        <meta-data android:name="expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH" android:value="ALWAYS"/>
        <meta-data android:name="expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS" android:value="0"/>
        <activity android:name=".MainActivity" android:configChanges="keyboard|keyboardHidden|orientation|screenSize|screenLayout|uiMode|smallestScreenSize|assetsPaths" android:launchMode="singleTask" android:windowSoftInputMode="adjustResize" android:theme="@style/Theme.App.SplashScreen" android:exported="true" android:screenOrientation="portrait">
          <intent-filter>
            <action android:name="android.intent.action.MAIN"/>
            <category android:name="android.intent.category.LAUNCHER"/>
          </intent-filter>
          <intent-filter>
            <action android:name="android.intent.action.VIEW"/>
            <category android:name="android.intent.category.DEFAULT"/>
            <category android:name="android.intent.category.BROWSABLE"/>
            <data android:scheme="ausd-wallet"/>
            <data android:scheme="exp+ausd-wallet"/>
          </intent-filter>
        </activity>
      </application>
    </manifest>artifacts/ausd-wallet/android/app/src/debug/AndroidManifest.xml
    ---
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools">
    
        <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    
        <application android:usesCleartextTraffic="true" tools:targetApi="28" tools:ignore="GoogleAppIndexingWarning" tools:replace="android:usesCleartextTraffic" />
    </manifest>
    artifacts/ausd-wallet/android/app/src/debugOptimized/AndroidManifest.xml
    ---
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools">
    
        <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    
        <application android:usesCleartextTraffic="true" tools:targetApi="28" tools:ignore="GoogleAppIndexingWarning" tools:replace="android:usesCleartextTraffic" />
    </manifest>
    ✓ • 1.48s

## Activity

    $ find artifacts/ausd-wallet/android/app/build/outputs -type f \( -name '*.apk' -o -name '*merged_manifest*' \) -print | head -80; find "$ANDROID_HOME" -name aapt -o -name aapt2 2>/dev/null | head -20
    find: ‘artifacts/ausd-wallet/android/app/build/outputs’: No such file or directory
    ✓ • 0ms

## Activity

    $ find node_modules -path '*react-native-passkey*' -maxdepth 6 -type f \( -name 'README.md' -o -name 'AndroidManifest.xml' -o -name 'build.gradle' -o -name 'build.gradle.kts' -o -name '*.kt' \) -print | head -160
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android/build.gradle
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/README.md
    node_modules/.pnpm/@category-labs+mera@0.2.0_react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7._b15bb4e093dcef9ebb85d0cce52918a9/node_modules/@category-labs/mera/README.md
    ✓ • 1.38s

## Activity

    $ sed -n '1,260p' node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/README.md; find node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey -maxdepth 4 -type f | sort
    # react-native-passkey
    
    [![Build](https://img.shields.io/github/actions/workflow/status/mTRx0/react-native-passkey/main.yml?branch=stable)](https://img.shields.io/github/workflow/status/mTRx0/react-native-passkey/Build) [![Version](https://img.shields.io/npm/v/react-native-passkey)](https://img.shields.io/npm/v/react-native-passkey) [![License](https://img.shields.io/npm/l/react-native-passkey)](https://img.shields.io/npm/l/react-native-passkey)
    
    Native Passkeys on iOS 15.0+ and Android API 28+ using React Native.
    
    > You can find an example backend for testing [here](https://github.com/f-23/passkey-server-example).
    
    ## Installation
    
    #### Javascript
    
    For the javascript part of the installation you need to run
    
    ```sh
    npm install react-native-passkey
    ```
    
    or
    
    ```sh
    yarn add react-native-passkey
    ```
    
    #### Native
    
    For the native part of the installation you need to run
    
    ```sh
    cd ios && pod install
    ```
    
    in the root of your React Native project.
    
    ---
    
    ## Configuration
    
    ### iOS
    
    There are iOS specific steps you need to go through in order to configure Passkey support. If you have already set up an associated domain for your application you can skip this step.
    
    #### Set up an associated domain for your application ([More info](https://developer.apple.com/documentation/xcode/supporting-associated-domains))
    
    - You need to associate a domain with your application. On your webserver set up this route:
    
      ```
      GET https://<yourdomain>/.well-known/apple-app-site-association
      ```
    
    - This route should serve a static JSON object containing your team id and bundle identifier.
      Example (replace XXXXXXXXXX with your team identifier and the rest with your bundle id, e.g. "H123456789.com.mtrx0.passkeyExample"):
    
      ```json
      {
        "applinks": {},
        "webcredentials": {
          "apps": ["XXXXXXXXXX.YYY.YYYYY.YYYYYYYYYYYYYY"]
        },
        "appclips": {}
      }
      ```
    
    - In XCode under `Signing & Capabilities` add a new Capability of type `Associated Domains`.
      Now add this and replace XXXXXX with your domain (e.g. `apple.com`)
      ```
      webcredentials:XXXXXX
      ```
    
    ### Android
    
    The Android specific configuration is similar to iOS. If you have already set up Digital Asset Links for your application you can skip this step.
    
    #### Associate your app with a domain ([More info](https://developer.android.com/training/sign-in/passkeys#add-support-dal))
    
    - You need to associate a domain with your application. On your webserver set up this route:
    
      ```
      GET https://<yourdomain>/.well-known/assetlinks.json
      ```
    
    - This route should serve a static JSON object containing the following information.
      Example (replace with your data, replace SHA_HEX_VALUE with the SHA256 fingerprints of your Android signing certificate)
    
      ```json
      [{
        "relation": ["delegate_permission/common.get_login_creds"],
        "target": {
          "namespace": "android_app",
          "package_name": "com.example",
          "sha256_cert_fingerprints": [
            SHA_HEX_VALUE
          ]
        }
      }]
      ```
    
    > If you are having issues with your backend setup you can look at an example [here](https://github.com/f-23/passkey-server-example).
    
    ---
    
    ## Usage
    
    #### Check if Passkeys are supported
    
    ```ts
    import { Passkey } from 'react-native-passkey';
    
    // Use this method to check if passkeys are supported on the device
    
    const isSupported: boolean = Passkey.isSupported();
    ```
    
    #### Creating a new Passkey
    
    ```ts
    import { Passkey, PasskeyCreateResult } from 'react-native-passkey';
    
    // Retrieve a valid FIDO2 attestation request from your server
    // The challenge inside the request needs to be a base64URL encoded string
    // There are plenty of libraries which can be used for this (e.g. fido2-lib)
    
    try {
      // Call the `create` method with the retrieved request in JSON format
      // A native overlay will be displayed
      const result: PasskeyCreateResult = await Passkey.create(requestJson);
    
      // The `create` method returns a FIDO2 attestation result
      // Pass it to your server for verification
    } catch (error) {
      // Handle Error...
    }
    ```
    
    #### Authenticating with existing Passkey
    
    ```ts
    import { Passkey, PasskeyGetResult } from 'react-native-passkey';
    
    // Retrieve a valid FIDO2 assertion request from your server
    // The challenge inside the request needs to be a base64URL encoded string
    // There are plenty of libraries which can be used for this (e.g. fido2-lib)
    
    try {
      // Call the `get` method with the retrieved request in JSON format
      // A native overlay will be displayed
      const result: PasskeyGetResult = await Passkey.get(requestJson);
    
      // The `get` method returns a FIDO2 assertion result
      // Pass it to your server for verification
    } catch (error) {
      // Handle Error...
    }
    ```
    
    #### Silent / Immediate Authentication
    
    Use `Passkey.getImmediate()` to authenticate **only** when a credential is
    already available on the device, without surfacing the system modal when
    nothing matches. This is useful for opportunistic sign-in checks (e.g. on app
    launch or on a sign-in screen) where you do not want to interrupt the user
    with a credential picker if no passkey exists.
    
    - iOS 16+: uses `ASAuthorizationController.preferImmediatelyAvailableCredentials`
    - Android: uses the `preferImmediatelyAvailableCredentials` flag on
      `GetCredentialRequest` (Credential Manager)
    - iOS < 16: falls back to a normal `get()` request (no silent behaviour
      available on the platform)
    
    When no credential is available the call rejects with a `NoCredentials` error
    and no UI is shown. Handle this error to fall back to your usual sign-in flow.
    
    If a credential *was* available and the user dismissed the sheet, the call
    rejects with `UserCancelled` instead. The two are distinct on both platforms, so
    `UserCancelled` from `getImmediate()` is a reliable signal that the device holds
    a passkey for your relying party — useful for deciding whether to offer a
    "Sign in with passkey" retry after a dismissal.
    
    ```ts
    import { Passkey } from 'react-native-passkey';
    
    try {
      const result = await Passkey.getImmediate(requestJson);
      // Credential available — pass to your server
    } catch (error) {
      if (error.error === 'NoCredentials') {
        // No passkey on device — fall back to password / OTP / etc.
      } else if (error.error === 'UserCancelled') {
        // User dismissed the sheet
      } else {
        // Handle other errors
      }
    }
    ```
    
    #### Signal API
    
    The [WebAuthn Signal API](https://w3c.github.io/webauthn/#sctn-signal-methods)
    lets your app keep OS credential managers (e.g. iCloud Keychain, Google Password
    Manager) in sync with your server. When the server has revoked or deleted a
    passkey, signalling it removes / hides the stale credential so it no longer shows
    up in the system sheet.
    
    Both methods are **best-effort**: they resolve once the request is accepted and
    **no-op** on OS versions without Signal API support (iOS < 26). All credential ids
    and the user handle are passed as Base64URL encoded strings.
    
    - iOS 26+: uses `ASCredentialUpdater`
    - Android: uses `CredentialManager.signalCredentialState` (requires
      `androidx.credentials` 1.6.0+, bundled with the library)
    
    ##### `Passkey.signalUnknownCredential()`
    
    Reports a single credential the relying party no longer recognizes. Use this when
    **unauthenticated** (e.g. after a failed sign-in): it takes a single credential id
    and no user handle, so it reveals nothing about the user.
    
    ```ts
    import { Passkey } from 'react-native-passkey';
    
    // e.g. after the server rejects the credential used to authenticate
    await Passkey.signalUnknownCredential({
      rpId: 'example.com',
      credentialId, // Base64URL encoded credential id
    });
    ```
    
    ##### `Passkey.signalAllAcceptedCredentials()`
    
    Reports the complete set of credential ids the relying party still accepts for a
    user. OS credential managers remove / hide any stored credentials **not** in the
    list (reversible — re-signal an id to restore it; an empty list hides all). Use
    this when **authenticated** (after login, or after adding / deleting a passkey):
    it needs the user handle and the full accepted set, so it authoritatively prunes.
    
    ```ts
    import { Passkey } from 'react-native-passkey';
    
    // e.g. after deleting a passkey, signal the remaining accepted credentials
    await Passkey.signalAllAcceptedCredentials({
      rpId: 'example.com',
      userId, // Base64URL encoded WebAuthn user handle
      allAcceptedCredentialIds, // string[] of Base64URL encoded credential ids
    });
    ```
    
    #### Error codes
    
    The library normalises native error codes into the following set:
    
    | `error` value        | Meaning                                                                |
    | -------------------- | ---------------------------------------------------------------------- |
    | `NotSupported`       | Passkeys are not supported on this device / OS version                 |
    | `RequestFailed`      | Generic request failure (e.g. transport / network / invalid response)  |
    | `UserCancelled`      | User dismissed the system sheet                                        |
    | `InvalidChallenge`   | The provided challenge could not be decoded                            |
    | `InvalidUserId`      | The provided user id could not be decoded (registration only)          |
    | `BadConfiguration`   | App is not configured correctly (associated domain / asset links)      |
    | `NoCredentials`      | No credential is available — also returned for silent `getImmediate()` |
    | `CredentialAlreadyExists` | A passkey already exists for this account on this device (registration) |
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/LICENSE
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/README.md
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android/build.gradle
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android/gradle.properties
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android/src/main/AndroidManifest.xml
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/Passkey-Bridging-Header.h
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/Passkey.m
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/Passkey.swift
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/Passkey.xcodeproj/project.pbxproj
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/PasskeyDelegate.swift
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/PasskeyErrors.swift
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/PasskeyHelper.swift
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/PasskeyOptions.swift
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/PasskeyResponses.swift
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/ios/PasskeyShared.swift
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/NativePasskey.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/NativePasskey.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/Passkey.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/Passkey.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/PasskeyError.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/PasskeyError.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/PasskeyRequest.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/PasskeyRequest.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/PasskeyTypes.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/PasskeyTypes.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/index.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/commonjs/index.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/NativePasskey.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/NativePasskey.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/Passkey.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/Passkey.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/PasskeyError.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/PasskeyError.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/PasskeyRequest.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/PasskeyRequest.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/PasskeyTypes.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/PasskeyTypes.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/index.js
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/module/index.js.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/NativePasskey.d.ts
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/NativePasskey.d.ts.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/Passkey.d.ts
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/Passkey.d.ts.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/PasskeyError.d.ts
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/PasskeyError.d.ts.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/PasskeyRequest.d.ts
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/PasskeyRequest.d.ts.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/PasskeyTypes.d.ts
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/PasskeyTypes.d.ts.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/index.d.ts
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/lib/typescript/index.d.ts.map
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/node_modules/.bin/react-native
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/package.json
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/react-native-passkey.podspec
    ✓ • 17ms

## Activity

    $ pnpm --dir artifacts/ausd-wallet exec expo config --type public --json | rg -o '"android"\s*:\s*\{[^}]*\}|"intentFilters"\s*:\s*\[[^]]*\]|"package"\s*:\s*"[^"]+"|"rpId"\s*:\s*"[^"]+"'
    "android":{"package":"com.ausd.wallet","usesCleartextTraffic":false,"adaptiveIcon":{"foregroundImage":"./assets/images/icon.png","backgroundColor":"#000000"}
    "intentFilters":[{"action":"VIEW","autoVerify":true,"data":[{"scheme":"https","host":"auth.vic-ezealor.workers.dev"}]
    "rpId":"auth.vic-ezealor.workers.dev"
    ✓ • 2.97s

## Activity

    $ git status --short; git check-ignore -v artifacts/ausd-wallet/android/app/src/main/AndroidManifest.xml || true; rg -n "intentFilters|assetlinks|asset_statements" artifacts/ausd-wallet/android/app/build/intermediates 2>/dev/null | head -100
    artifacts/ausd-wallet/.gitignore:14:android/    artifacts/ausd-wallet/android/app/src/main/AndroidManifest.xml
    ✓ • 20ms

## Activity

    $ sed -n '1,160p' node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android/src/main/AndroidManifest.xml; find node_modules/.pnpm/react-native-passkey@3.6.2_react-native@3.6.2* -type f -name '*.kt' -print 2>/dev/null
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
              package="com.reactnativepasskey">
    
    </manifest>
    ✗ (1) • 2.39s

## Activity

    $ find node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android -type f -name '*.kt' -print -exec sed -n '1,300p' {} \;
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android/src/main/java/com/reactnativepasskey/PasskeyModule.kt
    package com.reactnativepasskey
    
    import com.facebook.react.bridge.ReactApplicationContext
    import com.facebook.react.bridge.ReactContextBaseJavaModule
    import com.facebook.react.bridge.ReactMethod
    import com.facebook.react.bridge.Promise
    
    import androidx.credentials.CredentialManager
    import androidx.credentials.CreatePublicKeyCredentialRequest
    import androidx.credentials.GetCredentialRequest
    import androidx.credentials.GetPublicKeyCredentialOption
    import androidx.credentials.SignalAllAcceptedCredentialIdsRequest
    import androidx.credentials.SignalUnknownCredentialRequest
    import androidx.credentials.exceptions.*
    import androidx.credentials.exceptions.domerrors.*
    import androidx.credentials.exceptions.publickeycredential.CreatePublicKeyCredentialDomException
    import androidx.credentials.exceptions.publickeycredential.GetPublicKeyCredentialDomException
    
    import kotlinx.coroutines.Dispatchers
    import kotlinx.coroutines.CoroutineScope
    import kotlinx.coroutines.launch
    
    import org.json.JSONArray
    import org.json.JSONObject
    
    class PasskeyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
      private val mainScope = CoroutineScope(Dispatchers.Default)
    
      override fun getName(): String {
        return "Passkey"
      }
    
      @ReactMethod
      fun create(requestJson: String, forcePlatformKey: Boolean, forceSecurityKey: Boolean, promise: Promise) {
        val credentialManager = CredentialManager.create(reactApplicationContext.applicationContext)
        val createPublicKeyCredentialRequest = CreatePublicKeyCredentialRequest(requestJson)
    
        mainScope.launch {
          try {
            val activity = reactApplicationContext.currentActivity
              ?: run { promise.reject("RequestFailed", "No active Activity"); return@launch }
    
            val result = credentialManager.createCredential(activity, createPublicKeyCredentialRequest)
    
            val response =
              result.data.getString("androidx.credentials.BUNDLE_KEY_REGISTRATION_RESPONSE_JSON")
                ?: run { promise.reject("UnknownError", "Empty credential response"); return@launch }
            promise.resolve(response)
          } catch (e: CreateCredentialException) {
            val errorCode = handleRegistrationException(e)
            promise.reject(errorCode, e.errorMessage?.toString() ?: errorCode)
          } catch (e: Throwable) {
            promise.reject("UnknownError", e.message ?: "UnknownError")
          }
        }
      }
    
      private fun handleRegistrationException(e: CreateCredentialException): String {
        e.printStackTrace()
        when (e) {
          is CreatePublicKeyCredentialDomException -> {
            return mapDomError(e.domError)
          }
          is CreateCredentialCancellationException -> {
            return "UserCancelled"
          }
          is CreateCredentialInterruptedException -> {
            return "Interrupted"
          }
          is CreateCredentialProviderConfigurationException -> {
            return "NotConfigured"
          }
          is CreateCredentialUnknownException -> {
            return "UnknownError"
          }
          is CreateCredentialUnsupportedException -> {
            return "NotSupported"
          }
          is CreateCredentialNoCreateOptionException -> {
            // No credential provider offered to create a passkey — e.g. Google Password Manager
            // with no Google account signed in, or no provider installed at all. Without a stable
            // code here the JS side only receives the localized errorMessage, which it cannot
            // branch on to offer a password fallback.
            return "NoCreateOption"
          }
          else -> {
            // Fall back to the androidx type constant rather than the human-readable message:
            // `type` is a stable identifier, `errorMessage` is display text that may change.
            return e.type
          }
        }
      }
    
      @ReactMethod
      fun get(requestJson: String, forcePlatformKey: Boolean, forceSecurityKey: Boolean, preferImmediatelyAvailable: Boolean, promise: Promise) {
          val credentialManager = CredentialManager.create(reactApplicationContext.applicationContext)
          val getCredentialRequest =
            GetCredentialRequest(
              listOf(GetPublicKeyCredentialOption(requestJson)),
              preferImmediatelyAvailableCredentials = preferImmediatelyAvailable
            )
    
          mainScope.launch {
            try {
              val activity = reactApplicationContext.currentActivity
                ?: run { promise.reject("RequestFailed", "No active Activity"); return@launch }
    
              val result = credentialManager.getCredential(activity, getCredentialRequest)
    
              val response =
                result.credential.data.getString("androidx.credentials.BUNDLE_KEY_AUTHENTICATION_RESPONSE_JSON")
                  ?: run { promise.reject("UnknownError", "Empty credential response"); return@launch }
              promise.resolve(response)
            } catch (e: GetCredentialException) {
              val errorCode = handleAuthenticationException(e)
              promise.reject(errorCode, e.errorMessage?.toString() ?: errorCode)
            } catch (e: Throwable) {
              promise.reject("UnknownError", e.message ?: "UnknownError")
            }
          }
      }
    
      /**
       * WebAuthn Signal API: tells OS credential managers a credential the relying party no longer
       * recognizes should be removed/hidden. `credentialId` is a base64url string; the platform
       * decodes it. Best-effort — resolves once the request is accepted.
       *
       * Use when unauthenticated / after a failed sign-in (single credential, no user handle). For the
       * authenticated full-set reconcile, use [signalAllAcceptedCredentials] instead.
       */
      @ReactMethod
      fun signalUnknownCredential(rpId: String, credentialId: String, promise: Promise) {
        val credentialManager = CredentialManager.create(reactApplicationContext.applicationContext)
        val requestJson = JSONObject().apply {
          put("rpId", rpId)
          put("credentialId", credentialId)
        }.toString()
    
        mainScope.launch {
          try {
            credentialManager.signalCredentialState(SignalUnknownCredentialRequest(requestJson))
            promise.resolve(null)
          } catch (e: Exception) {
            promise.reject("SignalFailed", e.message ?: "signalUnknownCredential failed", e)
          }
        }
      }
    
      /**
       * WebAuthn Signal API: reports the complete set of credential ids the relying party still
       * accepts for (rpId, userId); the credential manager removes any stored credentials not in the
       * list. `userId` and the ids are base64url strings. `allAcceptedCredentialIdsJson` is a
       * JSON-encoded array of base64url credential ids.
       *
       * Use when authenticated (needs the user handle + full accepted set); authoritatively prunes.
       * For a single credential when unauthenticated, use [signalUnknownCredential] instead.
       */
      @ReactMethod
      fun signalAllAcceptedCredentials(
        rpId: String,
        userId: String,
        allAcceptedCredentialIdsJson: String,
        promise: Promise
      ) {
        val credentialManager = CredentialManager.create(reactApplicationContext.applicationContext)
        val requestJson = JSONObject().apply {
          put("rpId", rpId)
          put("userId", userId)
          put("allAcceptedCredentialIds", JSONArray(allAcceptedCredentialIdsJson))
        }.toString()
    
        mainScope.launch {
          try {
            credentialManager.signalCredentialState(SignalAllAcceptedCredentialIdsRequest(requestJson))
            promise.resolve(null)
          } catch (e: Exception) {
            promise.reject("SignalFailed", e.message ?: "signalAllAcceptedCredentials failed", e)
          }
        }
      }
    
      private fun handleAuthenticationException(e: GetCredentialException): String {
        e.printStackTrace()
        when (e) {
          is GetPublicKeyCredentialDomException -> {
            return mapDomError(e.domError)
          }
          is GetCredentialCancellationException -> {
            return "UserCancelled"
          }
          is GetCredentialInterruptedException -> {
            return "Interrupted"
          }
          is GetCredentialProviderConfigurationException -> {
            return "NotConfigured"
          }
          is GetCredentialUnknownException -> {
            return "UnknownError"
          }
          is GetCredentialUnsupportedException -> {
            return "NotSupported"
          }
          is NoCredentialException -> {
            return "NoCredentials"
          }
          else -> {
            // Stable identifier over display text, same rationale as the create path.
            return e.type
          }
        }
      }
    
      private fun mapDomError(domError: DomError): String {
        return when (domError) {
          is InvalidStateError -> "CredentialAlreadyExists"
          is SecurityError -> "RequestFailed"
          is ConstraintError -> "BadConfiguration"
          // WebAuthn uses NotAllowedError as the (deliberately ambiguous) signal for a
          // user-aborted/cancelled ceremony. The Credential Manager / FIDO2 provider
          // surfaces a Back-button cancel as GetPublicKeyCredentialDomException(NotAllowedError)
          // rather than GetCredentialCancellationException, so treat it as a cancellation
          // (consistent with iOS .canceled and the web navigator.credentials convention).
          is NotAllowedError -> "UserCancelled"
          is TimeoutError -> "TimedOut"
          is AbortError -> "UserCancelled"
          is DataError -> "RequestFailed"
          is NotSupportedError -> "NotSupported"
          else -> "UnknownError"
        }
      }
    }
    node_modules/.pnpm/react-native-passkey@3.6.2_react-native@0.86.3_@babel+core@7.29.7_@types+react@19.2.18_react@19.2.3__react@19.2.3/node_modules/react-native-passkey/android/src/main/java/com/reactnativepasskey/PasskeyPackage.kt
    package com.reactnativepasskey
    import com.facebook.react.ReactPackage
    import com.facebook.react.bridge.NativeModule
    import com.facebook.react.bridge.ReactApplicationContext
    import com.facebook.react.uimanager.ViewManager
    
    
    class PasskeyPackage : ReactPackage {
        override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
            return listOf(PasskeyModule(reactContext))
        }
    
        override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
            return emptyList()
        }
    }
    ✓ • 0ms

## Activity

    Searched the web for "RP ID cannot be validated" Android passkey, "rp id cannot be validated" Credential Manager Android, "Relying party ID cannot be validated" react-native-passkey

## Assistant

The new native message confirms Android’s Credential Manager is rejecting the app-to-domain association. The live asset file and APK certificate match, so I’m verifying whether this credential-manager path also needs an app-side `asset_statements` declaration.

## Activity

    Searched the web for site:developer.android.com passkeys asset_statements RP ID cannot be validated Credential Manager assetlinks, site:developer.android.com "asset_statements" "get_login_creds" passkeys, site:developer.android.com training sign-in passkeys Android Digital Asset Links asset statements

## Assistant

I found the missing Android half. The installed APK’s manifest has no `asset_statements` metadata, which Android’s Credential Manager requires to load the domain’s `assetlinks.json`. I’ll add it through Expo config so every native prebuild includes it.

## Activity

    $ rg -n "function withStringsXml|withStringsXml|withAndroidManifest" node_modules/.pnpm/@expo+config-plugins* node_modules/.pnpm/expo@*/node_modules/expo --glob '*.{d.ts,js,ts}' | head -100
    ✓ • 0ms

## Activity

    $ find node_modules/.pnpm -path '*config-plugins*' -type f \( -name 'withAndroidManifest.d.ts' -o -name 'withStringsXml.d.ts' -o -name 'android-plugins.d.ts' \) -print | head -80
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/plugins/android-plugins.d.ts
    ✓ • 1.59s

## Activity

    $ sed -n '1,220p' node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/plugins/android-plugins.d.ts; rg -n "withStringsXml|withAndroidManifest" node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build -g '*.d.ts'
    import type { ConfigPlugin, ExportedConfigWithProps, Mod } from '../Plugin.types';
    import type { Manifest, Paths, Properties, Resources } from '../android';
    type OptionalPromise<T> = T | Promise<T>;
    type MutateDataAction<T> = (expo: ExportedConfigWithProps<T>, data: T) => OptionalPromise<T>;
    /**
     * Helper method for creating mods from existing config functions.
     *
     * @param action
     */
    export declare function createAndroidManifestPlugin(action: MutateDataAction<Manifest.AndroidManifest>, name: string): ConfigPlugin;
    export declare function createStringsXmlPlugin(action: MutateDataAction<Resources.ResourceXML>, name: string): ConfigPlugin;
    /**
     * Provides the AndroidManifest.xml for modification.
     *
     * @param config
     * @param action
     */
    export declare const withAndroidManifest: ConfigPlugin<Mod<Manifest.AndroidManifest>>;
    /**
     * Provides the strings.xml for modification.
     *
     * @param config
     * @param action
     */
    export declare const withStringsXml: ConfigPlugin<Mod<Resources.ResourceXML>>;
    /**
     * Provides the `android/app/src/main/res/values/colors.xml` as JSON (parsed with [`xml2js`](https://www.npmjs.com/package/xml2js)).
     *
     * @param config
     * @param action
     */
    export declare const withAndroidColors: ConfigPlugin<Mod<Resources.ResourceXML>>;
    /**
     * Provides the `android/app/src/main/res/values-night/colors.xml` as JSON (parsed with [`xml2js`](https://www.npmjs.com/package/xml2js)).
     *
     * @param config
     * @param action
     */
    export declare const withAndroidColorsNight: ConfigPlugin<Mod<Resources.ResourceXML>>;
    /**
     * Provides the `android/app/src/main/res/values/styles.xml` as JSON (parsed with [`xml2js`](https://www.npmjs.com/package/xml2js)).
     *
     * @param config
     * @param action
     */
    export declare const withAndroidStyles: ConfigPlugin<Mod<Resources.ResourceXML>>;
    /**
     * Provides the project MainActivity for modification.
     *
     * @param config
     * @param action
     */
    export declare const withMainActivity: ConfigPlugin<Mod<Paths.ApplicationProjectFile>>;
    /**
     * Provides the project MainApplication for modification.
     *
     * @param config
     * @param action
     */
    export declare const withMainApplication: ConfigPlugin<Mod<Paths.ApplicationProjectFile>>;
    /**
     * Provides the project /build.gradle for modification.
     *
     * @param config
     * @param action
     */
    export declare const withProjectBuildGradle: ConfigPlugin<Mod<Paths.GradleProjectFile>>;
    /**
     * Provides the app/build.gradle for modification.
     *
     * @param config
     * @param action
     */
    export declare const withAppBuildGradle: ConfigPlugin<Mod<Paths.GradleProjectFile>>;
    /**
     * Provides the /settings.gradle for modification.
     *
     * @param config
     * @param action
     */
    export declare const withSettingsGradle: ConfigPlugin<Mod<Paths.GradleProjectFile>>;
    /**
     * Provides the /gradle.properties for modification.
     *
     * @param config
     * @param action
     */
    export declare const withGradleProperties: ConfigPlugin<Mod<Properties.PropertiesItem[]>>;
    export {};
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/index.d.ts:26:export { withAndroidManifest, withStringsXml, withAndroidColors, withAndroidColorsNight, withAndroidStyles, withMainActivity, withMainApplication, withProjectBuildGradle, withAppBuildGradle, withSettingsGradle, withGradleProperties, } from './plugins/android-plugins';
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/plugins/android-plugins.d.ts:18:export declare const withAndroidManifest: ConfigPlugin<Mod<Manifest.AndroidManifest>>;
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/plugins/android-plugins.d.ts:25:export declare const withStringsXml: ConfigPlugin<Mod<Resources.ResourceXML>>;
    ✓ • 0ms

## Activity

    $ rg -n "export interface AndroidManifest|interface ResourceXML|type ResourceXML|type AndroidManifest" node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/android -g '*.d.ts'; sed -n '1,220p' node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/android/Manifest.d.ts; sed -n '1,180p' node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/android/Resources.d.ts
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/android/Updates.d.ts:2:import { type ResourceXML } from './Resources';
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/android/Resources.d.ts:9:export type ResourceXML = {
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/android/Manifest.d.ts:6:type AndroidManifestAttributes = {
    node_modules/.pnpm/@expo+config-plugins@57.0.10_typescript@6.0.3/node_modules/@expo/config-plugins/build/android/Manifest.d.ts:122:export type AndroidManifest = {
    export type StringBoolean = 'true' | 'false';
    type ManifestMetaDataAttributes = AndroidManifestAttributes & {
        'android:value'?: string;
        'android:resource'?: string;
    };
    type AndroidManifestAttributes = {
        'android:name': string | 'android.intent.action.VIEW';
        'tools:node'?: string | 'remove';
    };
    type ManifestAction = {
        $: AndroidManifestAttributes;
    };
    type ManifestCategory = {
        $: AndroidManifestAttributes;
    };
    type ManifestData = {
        $: {
            [key: string]: string | undefined;
            'android:host'?: string;
            'android:port'?: string;
            'android:mimeType'?: string;
            'android:pathPattern'?: string;
            'android:pathPrefix'?: string;
            'android:pathSuffix'?: string;
            'android:pathAdvancedPattern'?: string;
            'android:scheme'?: string;
        };
    };
    type ManifestReceiver = {
        $: AndroidManifestAttributes & {
            'android:exported'?: StringBoolean;
            'android:enabled'?: StringBoolean;
        };
        'intent-filter'?: ManifestIntentFilter[];
    };
    export type ManifestIntentFilter = {
        $?: {
            'android:autoVerify'?: StringBoolean;
            'data-generated'?: StringBoolean;
        };
        action?: ManifestAction[];
        data?: ManifestData[];
        category?: ManifestCategory[];
    };
    export type ManifestActivityAlias = {
        $?: {
            'android:name': string;
            'android:enabled'?: StringBoolean;
            'android:exported'?: StringBoolean;
            'android:label'?: string;
            'android:permission'?: string;
            'android:icon'?: string;
            'android:targetActivity': string;
        };
        'intent-filter'?: ManifestIntentFilter[];
        'meta-data'?: ManifestMetaData[];
    };
    export type ManifestMetaData = {
        $: ManifestMetaDataAttributes;
    };
    type ManifestServiceAttributes = AndroidManifestAttributes & {
        'android:enabled'?: StringBoolean;
        'android:exported'?: StringBoolean;
        'android:permission'?: string;
        'android:foregroundServiceType'?: string;
    };
    type ManifestService = {
        $: ManifestServiceAttributes;
        'intent-filter'?: ManifestIntentFilter[];
    };
    type ManifestApplicationAttributes = {
        'android:name': string | '.MainApplication';
        'android:icon'?: string;
        'android:roundIcon'?: string;
        'android:label'?: string;
        'android:allowBackup'?: StringBoolean;
        'android:largeHeap'?: StringBoolean;
        'android:requestLegacyExternalStorage'?: StringBoolean;
        'android:supportsPictureInPicture'?: StringBoolean;
        'android:usesCleartextTraffic'?: StringBoolean;
        'android:enableOnBackInvokedCallback'?: StringBoolean;
        [key: string]: string | undefined;
    };
    export type ManifestActivity = {
        $: ManifestApplicationAttributes & {
            'android:exported'?: StringBoolean;
            'android:launchMode'?: string;
            'android:theme'?: string;
            'android:windowSoftInputMode'?: string | 'stateUnspecified' | 'stateUnchanged' | 'stateHidden' | 'stateAlwaysHidden' | 'stateVisible' | 'stateAlwaysVisible' | 'adjustUnspecified' | 'adjustResize' | 'adjustPan';
            [key: string]: string | undefined;
        };
        'intent-filter'?: ManifestIntentFilter[];
    };
    export type ManifestUsesLibrary = {
        $: AndroidManifestAttributes & {
            'android:required'?: StringBoolean;
        };
    };
    export type ManifestApplication = {
        $: ManifestApplicationAttributes;
        activity?: ManifestActivity[];
        service?: ManifestService[];
        receiver?: ManifestReceiver[];
        'meta-data'?: ManifestMetaData[];
        'uses-library'?: ManifestUsesLibrary[];
        'activity-alias'?: ManifestActivityAlias[];
    };
    type ManifestPermission = {
        $: AndroidManifestAttributes & {
            'android:protectionLevel'?: string | 'signature';
        };
    };
    export type ManifestUsesPermission = {
        $: AndroidManifestAttributes;
    };
    type ManifestUsesFeature = {
        $: AndroidManifestAttributes & {
            'android:glEsVersion'?: string;
            'android:required': StringBoolean;
        };
    };
    export type AndroidManifest = {
        manifest: {
            $: {
                'xmlns:android': string;
                'xmlns:tools'?: string;
                package?: string;
                [key: string]: string | undefined;
            };
            permission?: ManifestPermission[];
            'uses-permission'?: ManifestUsesPermission[];
            'uses-permission-sdk-23'?: ManifestUsesPermission[];
            'uses-feature'?: ManifestUsesFeature[];
            queries: ManifestQuery[];
            application?: ManifestApplication[];
        };
    };
    type ManifestQueryIntent = Omit<ManifestIntentFilter, '$'>;
    export type ManifestQuery = {
        package?: {
            $: {
                'android:name': string;
            };
        }[];
        intent?: ManifestQueryIntent[];
        provider?: {
            $: {
                'android:authorities': string;
            };
        }[];
    };
    export declare function writeAndroidManifestAsync(manifestPath: string, androidManifest: AndroidManifest): Promise<void>;
    export declare function readAndroidManifestAsync(manifestPath: string): Promise<AndroidManifest>;
    /** Returns the `manifest.application` tag ending in `.MainApplication` */
    export declare function getMainApplication(androidManifest: AndroidManifest): ManifestApplication | null;
    export declare function getMainApplicationOrThrow(androidManifest: AndroidManifest): ManifestApplication;
    export declare function getMainActivityOrThrow(androidManifest: AndroidManifest): ManifestActivity;
    export declare function getRunnableActivity(androidManifest: AndroidManifest): ManifestActivity | null;
    export declare function getMainActivity(androidManifest: AndroidManifest): ManifestActivity | null;
    export declare function addMetaDataItemToMainApplication(mainApplication: ManifestApplication, itemName: string, itemValue: string, itemType?: 'resource' | 'value'): ManifestApplication;
    export declare function removeMetaDataItemFromMainApplication(mainApplication: any, itemName: string): any;
    export declare function findMetaDataItem(mainApplication: any, itemName: string): number;
    export declare function findUsesLibraryItem(mainApplication: any, itemName: string): number;
    export declare function getMainApplicationMetaDataValue(androidManifest: AndroidManifest, name: string): string | null;
    export declare function addUsesLibraryItemToMainApplication(mainApplication: ManifestApplication, item: {
        name: string;
        required?: boolean;
    }): ManifestApplication;
    export declare function removeUsesLibraryItemFromMainApplication(mainApplication: ManifestApplication, itemName: string): ManifestApplication;
    export declare function prefixAndroidKeys<T extends Record<string, any> = Record<string, string>>(head: T): Record<string, any>;
    /**
     * Ensure the `tools:*` namespace is available in the manifest.
     *
     * @param manifest AndroidManifest.xml
     * @returns manifest with the `tools:*` namespace available
     */
    export declare function ensureToolsAvailable(manifest: AndroidManifest): AndroidManifest;
    export {};
    import { type XMLObject } from '../utils/XML';
    export type ResourceGroupXML = {
        $: {
            name: string;
            parent: string;
        };
        item: ResourceItemXML[];
    };
    export type ResourceXML = {
        resources: {
            $?: {
                'xmlns:tools'?: string;
            };
            color?: ResourceItemXML[];
            string?: ResourceItemXML[];
            style?: ResourceGroupXML[];
        };
    };
    export type ResourceItemXML = {
        _: string;
        $: {
            name: string;
            'tools:targetApi'?: string;
            translatable?: string;
        };
    };
    /**
     * Name of the resource folder.
     */
    export type ResourceKind = 'values' | 'values-night' | 'values-v23' | 'values-night-v23' | 'drawable';
    /**
     * Read an XML file while providing a default fallback for resource files.
     *
     * @param options path to the XML file, returns a fallback XML if the path doesn't exist.
     */
    export declare function readResourcesXMLAsync({ path, fallback, }: {
        path: string;
        fallback?: string | null;
    }): Promise<ResourceXML>;
    /**
     * Ensure the provided xml has a `resources` object (the expected shape).
     *
     * @param xml
     */
    export declare function ensureDefaultResourceXML(xml: XMLObject): ResourceXML;
    /**
     * Build a `ResourceItemXML` given its `name` and `value`. This makes things a bit more readable.
     *
     * - JSON: `{ $: { name }, _: value }`
     * - XML: `<item name="NAME">VALUE</item>`
     *
     * @param props name and value strings.
     */
    export declare function buildResourceItem({ name, value, targetApi, translatable, }: {
        name: string;
        value: string;
        targetApi?: string;
        translatable?: boolean;
    }): ResourceItemXML;
    export declare function buildResourceGroup(parent: {
        name: string;
        parent: string;
        items?: ResourceItemXML[];
    }): ResourceGroupXML;
    export declare function findResourceGroup(xml: ResourceGroupXML[] | undefined, group: {
        name: string;
        parent?: string;
    }): ResourceGroupXML | null;
    /**
     * Helper to convert a basic XML object into a simple k/v pair.
     *
     * @param xml
     * @returns
     */
    export declare function getResourceItemsAsObject(xml: ResourceItemXML[]): Record<string, string> | null;
    /**
     * Helper to convert a basic k/v object to a ResourceItemXML array.
     *
     * @param xml
     * @returns
     */
    export declare function getObjectAsResourceItems(obj: Record<string, string>): ResourceItemXML[];
    export declare function getObjectAsResourceGroup(group: {
        name: string;
        parent: string;
        item: Record<string, string>;
    }): ResourceGroupXML;
    ✓ • 0ms

## Activity

    file changes: Completed · 1 changes
    Update { move_path: None }: /home/runner/workspace/artifacts/ausd-wallet/app.config.ts
    @@ -1,2 +1,3 @@
     import type { ConfigContext } from 'expo/config';
    +import { withAndroidManifest, withStringsXml, type ConfigPlugin } from 'expo/config-plugins';
     
    @@ -11,2 +12,42 @@
     
    +const withPasskeyAssetStatements = (rpId: string): ConfigPlugin => (config) => {
    +  const statement = `[{\"include\":\"https://${rpId}/.well-known/assetlinks.json\"}]`;
    +
    +  config = withStringsXml(config, (config) => {
    +    const strings = config.modResults.resources.string ?? [];
    +    const existing = strings.find((item) => item.$.name === 'asset_statements');
    +    if (existing) {
    +      existing._ = statement;
    +      existing.$.translatable = 'false';
    +    } else {
    +      strings.push({
    +        $: { name: 'asset_statements', translatable: 'false' },
    +        _: statement,
    +      });
    +    }
    +    config.modResults.resources.string = strings;
    +    return config;
    +  });
    +
    +  return withAndroidManifest(config, (config) => {
    +    const application = config.modResults.manifest.application?.[0];
    +    if (!application) return config;
    +    const metadata = application['meta-data'] ?? [];
    +    const existing = metadata.find((item) => item.$['android:name'] === 'asset_statements');
    +    if (existing) {
    +      existing.$['android:resource'] = '@string/asset_statements';
    +      delete existing.$['android:value'];
    +    } else {
    +      metadata.push({
    +        $: {
    +          'android:name': 'asset_statements',
    +          'android:resource': '@string/asset_statements',
    +        },
    +      });
    +    }
    +    application['meta-data'] = metadata;
    +    return config;
    +  });
    +};
    +
     export default ({ config }: ConfigContext) => {
    @@ -16,3 +57,3 @@
     
    -  return {
    +  const appConfig = {
         ...config,
    @@ -44,2 +85,4 @@
       };
    +
    +  return rpId ? withPasskeyAssetStatements(rpId)(appConfig) : appConfig;
     };

## Assistant

The Expo config now adds both required Android entries: the `asset_statements` string and its application manifest metadata. I’ll typecheck the config and inspect Expo’s resolved Android config without regenerating native files.

## Activity

    $ pnpm exec expo config --type introspect --json | rg -o '.{0,180}asset_statements.{0,280}'
    "strings":{"resources":{"string":[{"$":{"name":"app_name"},"_":"AUSD Wallet"},{"$":{"name":"expo_system_ui_user_interface_style","translatable":"false"},"_":"light"},{"$":{"name":"asset_statements","translatable":"false"},"_":"[{\"include\":\"https://auth.vic-ezealor.workers.dev/.well-known/assetlinks.json\"}]"}]}},"manifest":{"manifest":{"$":{"xmlns:android":"http://schemas.android.com/apk/res/android","xmlns:tools":"http://schemas.android.com/tools"},"uses-permission":[
    pdates.EXPO_UPDATES_CHECK_ON_LAUNCH","android:value":"ALWAYS"}},{"$":{"android:name":"expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS","android:value":"0"}},{"$":{"android:name":"asset_statements","android:resource":"@string/asset_statements"}}],"activity":[{"$":{"android:name":".MainActivity","android:configChanges":"keyboard|keyboardHidden|orientation|screenSize|screenLayout|uiMode|smallestScreenSize|assetsPaths","android:launchMode":"singleTask","android:windowSoftInp
    ✓ • 2.18s

## Activity

    $ pnpm --filter @workspace/ausd-wallet run typecheck
    
    > @workspace/ausd-wallet@0.0.0 typecheck /home/runner/workspace/artifacts/ausd-wallet
    > tsc -p tsconfig.json --noEmit
    
    ✓ • 11.22s

## Assistant

Fixed the Android RP association configuration in [app.config.ts](/home/runner/workspace/artifacts/ausd-wallet/app.config.ts:13).

Expo will now generate:

```xml
<string name="asset_statements" translatable="false">
  [{"include":"https://auth.vic-ezealor.workers.dev/.well-known/assetlinks.json"}]
</string>
```

and:

```xml
<meta-data
  android:name="asset_statements"
  android:resource="@string/asset_statements" />
```

Your previous generated manifest had neither entry. That explains `RP ID cannot be validated`: Android Credential Manager requires this app-side declaration as well as the server-side `assetlinks.json`. [Android Credential Manager prerequisites](https://developer.android.com/identity/credential-manager/prerequisites)

Expo introspection confirms both entries are emitted, and wallet typecheck passes.

Build and install a fresh APK, uninstalling the old app first. The existing installed APK cannot gain this manifest metadata without a rebuild.
