import { Link, useLocation } from 'react-router'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { getAccountProvider } from '@multiversx/sdk-dapp/out/providers/helpers/accountProvider'
import { Home, ArrowLeftRight, Settings, LogOut, Wallet } from 'lucide-react'

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
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            
            <Link
              to="/transactions"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/transactions') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ArrowLeftRight className="w-5 h-5" />
              <span className="font-medium">Transactions</span>
            </Link>
            
            <Link
              to="/settings"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/settings') 
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
