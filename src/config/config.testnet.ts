export const networkConfig = {
  id: 'multiversx-lite-wallet',
  name: 'MultiversX',
  egldLabel: 'xEGLD',
  decimals: '18',
  digits: '4',
  gasPerDataByte: '1500',
  walletConnectDeepLink: 'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/user/walletconnect?wallet-connect-url=',
  walletAddress: 'https://testnet-wallet.multiversx.com',
  apiAddress: 'https://testnet-api.multiversx.com',
  explorerAddress: 'https://testnet-explorer.multiversx.com',
  apiTimeout: '4000',
  environment: 'testnet',
  sampleAuthenticatedDomains: [
    'https://testnet-wallet.multiversx.com',
    'https://testnet-explorer.multiversx.com',
    'https://devnet-wallet.multiversx.com',
    'https://devnet-explorer.multiversx.com',
    'https://wallet.multiversx.com',
    'https://explorer.multiversx.com'
  ]
};

export default networkConfig;
