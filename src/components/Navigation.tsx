import { Link, useLocation } from 'react-router'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { getAccountProvider } from '@multiversx/sdk-dapp/out/providers/helpers/accountProvider'
import { Home, ArrowLeftRight, Settings, LogOut, Wallet, Send } from 'lucide-react'
import { routeNames } from '@/routes'

const Navigation = () => {
  const { address } = useGetAccountInfo()
  const location = useLocation()

  const handleLogout = async () => {
    const provider = getAccountProvider()
    await provider.logout()
  }

  const isActive = (path: string) => location.pathname === path

  if (!address) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">MultiversX Lite Wallet</h1>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">MultiversX Lite Wallet</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              to={routeNames.dashboard}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive(routeNames.dashboard) 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to={routeNames.send}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive(routeNames.send) 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Send</span>
            </Link>
            
            <Link
              to={routeNames.transactions}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive(routeNames.transactions) 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ArrowLeftRight className="w-5 h-5" />
              <span className="font-medium">Transactions</span>
            </Link>
            
            <Link
              to={routeNames.settings}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive(routeNames.settings) 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
