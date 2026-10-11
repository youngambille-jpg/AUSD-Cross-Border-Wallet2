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
