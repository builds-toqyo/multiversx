import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { initApp } from '@multiversx/sdk-dapp/out/methods/initApp/initApp'
import type { InitAppType } from '@multiversx/sdk-dapp/out/methods/initApp/initApp.types'
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/out/types/enums.types'
import { getNetworkConfig } from './config'
import './index.css'
import App from './App.tsx'

const environment = (import.meta.env.VITE_ENVIRONMENT || 'devnet') as EnvironmentsEnum
const networkConfig = getNetworkConfig(environment)

const config: InitAppType = {
  storage: {
    getStorageCallback: () => localStorage
  },
  dAppConfig: {
    environment,
    network: networkConfig,
    transactionTracking: {
      successfulToastLifetime: 5000,
      onSuccess: async (sessionId: string) => {
        console.log('Transaction session successful:', sessionId)
      },
      onFail: async (sessionId: string) => {
        console.error('Transaction session failed:', sessionId)
      }
    }
  }
}

initApp(config).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})
