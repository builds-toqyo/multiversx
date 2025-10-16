import { RouteNamesEnum } from './routeNames'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Transactions from '@/pages/Transactions'
import Settings from '@/pages/Settings'
import Send from '@/pages/Send'
import Logout from '@/pages/Logout'
import type { JSX } from 'react'

export interface RouteType {
  path: string
  component: () => JSX.Element
  authenticatedRoute?: boolean
  title: string
}

export const routes: RouteType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Home
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: RouteNamesEnum.send,
    title: 'Send',
    component: Send,
    authenticatedRoute: true
  },
  {
    path: RouteNamesEnum.transactions,
    title: 'Transactions',
    component: Transactions,
    authenticatedRoute: true
  },
  {
    path: RouteNamesEnum.settings,
    title: 'Settings',
    component: Settings,
    authenticatedRoute: true
  },
  {
    path: RouteNamesEnum.logout,
    title: 'Logout',
    component: Logout
  }
]
