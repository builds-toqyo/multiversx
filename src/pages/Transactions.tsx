import { useGetAccountInfo } from '@multiversx/sdk-dapp/out/react/account/useGetAccountInfo'
import { ExternalLink, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react'
import { formatAmount } from '@multiversx/sdk-dapp/out/lib/sdkDappUtils'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Transactions = () => {
  const { address } = useGetAccountInfo()
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return
      
      try {
        setIsLoading(true)
        const apiUrl = import.meta.env.VITE_MULTIVERSX_API_URL || 'https://devnet-api.multiversx.com'
        const response = await axios.get(`${apiUrl}/accounts/${address}/transactions?size=20`)
        setTransactions(response.data || [])
      } catch (error) {
        console.error('Error fetching transactions:', error)
        setTransactions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [address])

  const explorerUrl = import.meta.env.VITE_MULTIVERSX_EXPLORER_URL || 'https://devnet-explorer.multiversx.com'

  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }

  const getTransactionType = (tx: any) => {
    if (tx.sender === address) return 'sent'
    if (tx.receiver === address) return 'received'
    return 'unknown'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-1">View your transaction history</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : transactions && transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((tx: any) => {
              const type = getTransactionType(tx)
              const isSent = type === 'sent'

              return (
                <div
                  key={tx.txHash}
                  className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
            
                      <div
                        className={`p-3 rounded-lg ${
                          isSent ? 'bg-red-100' : 'bg-green-100'
                        }`}
                      >
                        {isSent ? (
                          <ArrowUpRight className="w-6 h-6 text-red-600" />
                        ) : (
                          <ArrowDownLeft className="w-6 h-6 text-green-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className={`font-semibold ${
                              isSent ? 'text-red-600' : 'text-green-600'
                            }`}
                          >
                            {isSent ? 'Sent' : 'Received'}
                          </span>
                          {tx.status === 'pending' && (
                            <span className="flex items-center space-x-1 text-yellow-600 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>Pending</span>
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">
                            {isSent ? 'To: ' : 'From: '}
                          </span>
                          <span className="font-mono">
                            {formatAddress(isSent ? tx.receiver : tx.sender)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatTimestamp(tx.timestamp)}
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-xl font-bold ${
                            isSent ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {isSent ? '-' : '+'}
                          {formatAmount({
                            input: tx.value,
                            decimals: 18,
                            digits: 4,
                          })}{' '}
                          xEGLD
                        </div>
                        {tx.fee && (
                          <div className="text-sm text-gray-500">
                            Fee:{' '}
                            {formatAmount({
                              input: tx.fee,
                              decimals: 18,
                              digits: 6,
                            })}{' '}
                            xEGLD
                          </div>
                        )}
                      </div>

                      <a
                        href={`${explorerUrl}/transactions/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                        title="View in explorer"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-600" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUpRight className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No transactions yet
            </h3>
            <p className="text-gray-600">
              Your transaction history will appear here once you make your first transaction.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions
