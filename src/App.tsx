import { Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'sonner'
import { routes, routeNames } from '@/routes'
import { Layout } from '@/components/Layout'
import { TransactionStatus } from '@/components/TransactionStatus'
import Unlock from '@/pages/Unlock'
import './App.css'

function App() {
  return (
    <Layout>
      <Toaster position="top-right" richColors closeButton />
      <TransactionStatus />
      <Routes>
        <Route path={routeNames.unlock} element={<Unlock />} />
        {routes.map((route) => {
          const RouteComponent = route.component

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
    </Layout>
  )
}

export default App
