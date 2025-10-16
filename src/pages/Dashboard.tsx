import { useNavigate } from 'react-router'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { useGetAccount } from '@multiversx/sdk-dapp/out/react/account/useGetAccount'
import { formatAmount } from '@multiversx/sdk-dapp/out/lib/sdkDappUtils'
import { Wallet, Copy, ExternalLink, RefreshCw, Send } from 'lucide-react'
import { useState } from 'react'
import { routeNames } from '@/routes'

const Dashboard = () => {
  const navigate = useNavigate()
  const { address } = useGetAccountInfo()
  const { balance, nonce } = useGetAccount()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 10)}...${addr.slice(-8)}`
  }

  const explorerUrl = import.meta.env.VITE_MULTIVERSX_EXPLORER_URL || 'https://devnet-explorer.multiversx.com'

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-blue-100 text-sm">Your Wallet</p>
              <h2 className="text-2xl font-bold">Account Overview</h2>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-blue-100 text-sm mb-1">Balance</p>
            <p className="text-4xl font-bold">
              {formatAmount({ input: balance, decimals: 18, digits: 4 })} xEGLD
            </p>
          </div>

          <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
            <div className="flex-1">
              <p className="text-blue-100 text-sm mb-1">Address</p>
              <p className="font-mono text-lg">{formatAddress(address)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyAddress}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                title="Copy address"
              >
                <Copy className="w-5 h-5" />
              </button>
              <a
                href={`${explorerUrl}/accounts/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                title="View in explorer"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {copied && (
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
              Address copied to clipboard!
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Account Nonce</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{nonce}</p>
          <p className="text-gray-500 text-sm mt-2">Transaction count</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Network</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 capitalize">
            {import.meta.env.VITE_ENVIRONMENT || 'devnet'}
          </p>
          <p className="text-gray-500 text-sm mt-2">Current environment</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Status</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-2xl font-bold text-gray-900">Connected</p>
          </div>
          <p className="text-gray-500 text-sm mt-2">Wallet is active</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate(routeNames.send)}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
            <span className="font-medium">Send Transaction</span>
          </button>
          <button 
            onClick={() => navigate(routeNames.transactions)}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="font-medium">Receive</span>
          </button>
          <a
            href={`${explorerUrl}/accounts/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="font-medium">View in Explorer</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
