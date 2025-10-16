import { Routes, Route, Navigate } from 'react-router'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { routes, routeNames } from '@/routes'
import Navigation from '@/components/Navigation'
import Unlock from '@/pages/Unlock'
import './App.css'

function App() {
  const { address } = useGetAccountInfo()

  return (
    <div className="min-h-screen bg-gray-50">
      {address && <Navigation />}
      <Routes>
        <Route path={routeNames.unlock} element={<Unlock />} />
        {routes.map((route) => {
          const RouteComponent = route.component
          
          if (route.authenticatedRoute && !address) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate to={routeNames.unlock} replace />}
              />
            )
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteComponent />}
            />
          )
        })}
        <Route path="*" element={<Navigate to={routeNames.home} replace />} />
      </Routes>
    </div>
  )
}

export default App
