import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getAccountProvider } from '@multiversx/sdk-dapp/out/providers/helpers/accountProvider'
import { routeNames } from '@/routes'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const performLogout = async () => {
      try {
        const provider = getAccountProvider()
        await provider.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        navigate(routeNames.unlock)
      }
    }

    performLogout()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  )
}

export default Logout
