import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { routeNames } from '@/routes'

interface AuthRedirectWrapperPropsType extends PropsWithChildren {
  requireAuth?: boolean
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true
}: AuthRedirectWrapperPropsType) => {
  const { address } = useGetAccountInfo()
  const isLoggedIn = Boolean(address)
  const { pathname, search } = useLocation()

  const shouldGoToDashboard =
    isLoggedIn && pathname !== routeNames.dashboard && !requireAuth

  if (shouldGoToDashboard) {
    return <Navigate to={`${routeNames.dashboard}${search}`} />
  }

  const shouldGoToUnlock = !isLoggedIn && pathname !== routeNames.unlock && requireAuth

  if (shouldGoToUnlock) {
    return <Navigate to={`${routeNames.unlock}${search}`} />
  }

  return <>{children}</>
}
