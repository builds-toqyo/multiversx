import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Address, Transaction } from '@multiversx/sdk-core'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { useGetAccount } from '@multiversx/sdk-dapp/out/react/account/useGetAccount'
import { getAccountProvider } from '@multiversx/sdk-dapp/out/providers/helpers/accountProvider'
import { TransactionManager } from '@multiversx/sdk-dapp/out/managers/TransactionManager'
import { GAS_PRICE, GAS_LIMIT } from '@multiversx/sdk-dapp/out/constants/mvx.constants'
import { refreshAccount } from '@multiversx/sdk-dapp/out/utils/account/refreshAccount'
import { ArrowLeft, Send as SendIcon, AlertCircle } from 'lucide-react'
import { routeNames } from '@/routes'
import { AuthRedirectWrapper } from '@/wrappers'

const Send = () => {
  const navigate = useNavigate()
  const { address } = useGetAccountInfo()
  const { balance, nonce } = useGetAccount()
  
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!recipient || !amount || !address) {
        throw new Error('Please fill in all required fields')
      }

      if (!recipient.startsWith('erd1')) {
        throw new Error('Invalid recipient address')
      }

      await refreshAccount()

      const amountInWei = BigInt(Math.floor(parseFloat(amount) * Math.pow(10, 18)))
      const gasLimit = BigInt(GAS_LIMIT + (data ? data.length * 1500 : 0))

      const transaction = new Transaction({
        value: amountInWei,
        data: data ? Buffer.from(data) : undefined,
        receiver: Address.newFromBech32(recipient),
        gasLimit,
        gasPrice: BigInt(GAS_PRICE),
        chainID: 'D',
        nonce: BigInt(nonce),
        sender: Address.newFromBech32(address),
        version: 1
      })

      const provider = getAccountProvider()
      const signedTransactions = await provider.signTransactions([transaction])

      const txManager = TransactionManager.getInstance()
      const sentTransactions = await txManager.send(signedTransactions)
      
      toast.info('Transaction Sent', {
        description: 'Your transaction is being processed...',
        duration: 3000
      })
      
      await txManager.track(sentTransactions, {
        transactionsDisplayInfo: {
          processingMessage: 'Processing transaction',
          errorMessage: 'Transaction failed',
          successMessage: 'Transaction successful'
        }
      })

      // Reset form and navigate
      setRecipient('')
      setAmount('')
      setData('')
      
      setTimeout(() => {
        navigate(routeNames.dashboard)
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Failed to send transaction')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthRedirectWrapper>
      <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(routeNames.dashboard)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <SendIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Send Transaction</h1>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Address *
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="erd1..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (EGLD) *
                </label>
                <input
                  type="number"
                  step="0.000000000000000001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Available: {(parseFloat(balance) / Math.pow(10, 18)).toFixed(4)} EGLD
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data (Optional)
                </label>
                <textarea
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Transaction data or message"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(routeNames.dashboard)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </AuthRedirectWrapper>
  )
}

export default Send
