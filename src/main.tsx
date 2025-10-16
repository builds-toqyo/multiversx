import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { toast } from 'sonner'
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
        toast.success('Transaction Successful', {
          description: `Session ${sessionId.slice(0, 8)}... completed successfully`,
          duration: 5000
        })
      },
      onFail: async (sessionId: string) => {
        console.error('Transaction session failed:', sessionId)
        toast.error('Transaction Failed', {
          description: `Session ${sessionId.slice(0, 8)}... failed to complete`,
          duration: 5000
        })
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
