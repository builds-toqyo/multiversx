import { AuthRedirectWrapper } from '@/wrappers'
import WalletConnect from '@/components/WalletConnect'

const Unlock = () => {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <WalletConnect />
    </AuthRedirectWrapper>
  )
}

export default Unlock
