import devnetConfig from './config.devnet';
import testnetConfig from './config.testnet';
import mainnetConfig from './config.mainnet';

const configs: Record<string, any> = {
  devnet: devnetConfig,
  testnet: testnetConfig,
  mainnet: mainnetConfig,
};

export const getNetworkConfig = (environment: string) => {
  return configs[environment] || devnetConfig;
};

export { devnetConfig, testnetConfig, mainnetConfig };
