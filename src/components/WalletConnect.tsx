import { useNavigate } from 'react-router'
import { UnlockPanelManager } from '@multiversx/sdk-dapp/out/managers/UnlockPanelManager'
import { Wallet } from 'lucide-react'

const WalletConnect = () => {
  const navigate = useNavigate()
  
  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      navigate('/')
    },
    onClose: () => {
      // Optional: handle panel close
    }
  })

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Wallet className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600">
            Choose your preferred method to connect to MultiversX
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={handleOpenUnlockPanel}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Connect Wallet
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Supports Extension, Web Wallet, xPortal, and Ledger
          </p>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a development wallet. Never use it with real funds on mainnet.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WalletConnect
