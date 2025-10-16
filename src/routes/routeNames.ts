export const RouteNamesEnum = {
  home: '/',
  unlock: '/unlock',
  dashboard: '/dashboard',
  send: '/send',
  transactions: '/transactions',
  settings: '/settings',
  logout: '/logout'
} as const

export const routeNames = {
  home: RouteNamesEnum.home,
  unlock: RouteNamesEnum.unlock,
  dashboard: RouteNamesEnum.dashboard,
  send: RouteNamesEnum.send,
  transactions: RouteNamesEnum.transactions,
  settings: RouteNamesEnum.settings,
  logout: RouteNamesEnum.logout
}
