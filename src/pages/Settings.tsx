import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { Settings as SettingsIcon, Network, Info, Shield, ExternalLink } from 'lucide-react'
import { AuthRedirectWrapper } from '@/wrappers'

const Settings = () => {
  const { address } = useGetAccountInfo()
  const environment = import.meta.env.VITE_ENVIRONMENT || 'devnet'
  const apiUrl = import.meta.env.VITE_MULTIVERSX_API_URL || 'https://devnet-api.multiversx.com'
  const explorerUrl = import.meta.env.VITE_MULTIVERSX_EXPLORER_URL || 'https://devnet-explorer.multiversx.com'
  const walletUrl = import.meta.env.VITE_MULTIVERSX_WALLET_URL || 'https://devnet-wallet.multiversx.com'

  return (
    <AuthRedirectWrapper>
      <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-100 p-3 rounded-lg">
            <SettingsIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Wallet configuration and information</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Network className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Network Configuration</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Environment</span>
                <span className="font-semibold text-gray-900 capitalize">{environment}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">API URL</span>
                <a
                  href={apiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <span className="font-mono text-sm">{apiUrl}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Explorer URL</span>
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <span className="font-mono text-sm">{explorerUrl}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Wallet URL</span>
                <a
                  href={walletUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <span className="font-mono text-sm">{walletUrl}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
            </div>
            <div className="space-y-3">
              <div className="py-2">
                <span className="text-gray-600 block mb-1">Connected Address</span>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-mono text-sm text-gray-900 break-all">{address}</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Storage</span>
                <span className="font-semibold text-gray-900">
                  {import.meta.env.VITE_APP_PERSIST || 'localStorage'}
                </span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-yellow-600" />
              <h2 className="text-xl font-semibold text-yellow-900">Security Notice</h2>
            </div>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>
                <strong>⚠️ Development Wallet:</strong> This is a development version of the MultiversX Lite Wallet.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Do not use this wallet with real funds on mainnet</li>
                <li>Always verify transactions before signing</li>
                <li>Keep your private keys and seed phrases secure</li>
                <li>Never share your credentials with anyone</li>
              </ul>
            </div>
          </div>

          {/* Application Info */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Application Info</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">App Name</span>
                <span className="font-semibold text-gray-900">
                  {import.meta.env.VITE_APP_NAME || 'MultiversX Lite Wallet'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Version</span>
                <span className="font-semibold text-gray-900">
                  {import.meta.env.VITE_APP_VERSION || '1.0.0'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Repository</span>
                <a
                  href="https://github.com/multiversx/mx-lite-wallet-dapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </AuthRedirectWrapper>
  )
}

export default Settings
