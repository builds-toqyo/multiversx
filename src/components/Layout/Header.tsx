import { Link, useMatch } from 'react-router'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { Wallet } from 'lucide-react'
import { routeNames } from '@/routes'

export const Header = () => {
  const { address } = useGetAccountInfo()
  const isLoggedIn = Boolean(address)
  const isUnlockRoute = Boolean(useMatch(routeNames.unlock))

  const ConnectButton = isUnlockRoute ? null : (
    <Link
      to={routeNames.unlock}
      className="inline-block rounded-lg px-4 py-2 text-center hover:no-underline text-white bg-blue-600 hover:bg-blue-700 transition-colors"
    >
      Connect
    </Link>
  )

  return (
    <header className="flex flex-row items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      <Link
        className="flex items-center gap-2"
        to={isLoggedIn ? routeNames.dashboard : routeNames.home}
      >
        <Wallet className="w-6 h-6 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">MultiversX Lite Wallet</span>
      </Link>

      <nav className="flex items-center gap-2">
        {isLoggedIn ? (
          <Link
            className="inline-block rounded-lg px-4 py-2 text-center hover:no-underline text-gray-600 hover:bg-slate-100 transition-colors"
            to={routeNames.logout}
          >
            Close
          </Link>
        ) : (
          ConnectButton
        )}
      </nav>
    </header>
  )
}
