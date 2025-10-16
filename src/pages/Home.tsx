import { useNavigate } from 'react-router'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { Wallet, Shield, Zap, Lock } from 'lucide-react'
import { routeNames } from '@/routes'
import { useEffect } from 'react'

const Home = () => {
  const navigate = useNavigate()
  const { address } = useGetAccountInfo()

  useEffect(() => {
    if (address) {
      navigate(routeNames.dashboard)
    }
  }, [address, navigate])

  const handleConnect = () => {
    navigate(routeNames.unlock)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-6 rounded-full shadow-lg">
              <Wallet className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            MultiversX Lite Wallet
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A lightweight, secure wallet for the MultiversX blockchain. Send, receive, and manage your digital assets with ease.
          </p>
          <button
            onClick={handleConnect}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure
            </h3>
            <p className="text-gray-600">
              Your private keys never leave your device. Multiple authentication methods for maximum security.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Fast
            </h3>
            <p className="text-gray-600">
              Lightning-fast transactions on the MultiversX network. Send and receive funds in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Private
            </h3>
            <p className="text-gray-600">
              Non-custodial wallet. You have full control over your assets and private keys.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-200 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-yellow-700" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Development Notice</h4>
              <p className="text-yellow-800 text-sm">
                This wallet is for development and testing purposes only. Never use it with real funds on mainnet. Always verify transactions before signing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
