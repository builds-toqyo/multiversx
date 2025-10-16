import { useGetPendingTransactions } from '@multiversx/sdk-dapp/out/react/transactions/useGetPendingTransactions'
import { useGetSuccessfulTransactions } from '@multiversx/sdk-dapp/out/react/transactions/useGetSuccessfulTransactions'
import { useGetFailedTransactions } from '@multiversx/sdk-dapp/out/react/transactions/useGetFailedTransactions'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export const TransactionStatus = () => {
  const pendingTransactions = useGetPendingTransactions()
  const successfulTransactions = useGetSuccessfulTransactions()
  const failedTransactions = useGetFailedTransactions()

  const hasPending = pendingTransactions.length > 0
  const hasSuccessful = successfulTransactions.length > 0
  const hasFailed = failedTransactions.length > 0

  if (!hasPending && !hasSuccessful && !hasFailed) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {hasPending && (
        <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]">
          <Clock className="w-5 h-5 animate-spin" />
          <div>
            <p className="font-semibold">Processing Transaction</p>
            <p className="text-sm text-blue-100">
              {pendingTransactions.length} transaction(s) pending
            </p>
          </div>
        </div>
      )}

      {hasSuccessful && (
        <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold">Transaction Successful</p>
            <p className="text-sm text-green-100">
              {successfulTransactions.length} transaction(s) completed
            </p>
          </div>
        </div>
      )}

      {hasFailed && (
        <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]">
          <XCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold">Transaction Failed</p>
            <p className="text-sm text-red-100">
              {failedTransactions.length} transaction(s) failed
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
