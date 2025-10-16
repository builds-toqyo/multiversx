import { formatAmount } from '@multiversx/sdk-dapp/out/lib/sdkDappUtils'
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/out/react/network/useGetNetworkConfig'

export const DECIMALS = 18
export const DIGITS = 4

interface IFormatAmountProps {
  value: string
  className?: string
  showLabel?: boolean
  'data-testid'?: string
  decimals?: number
  digits?: number
}

export const FormatAmount = ({
  value,
  className = '',
  showLabel = true,
  decimals = DECIMALS,
  digits = DIGITS,
  ...props
}: IFormatAmountProps) => {
  const {
    network: { egldLabel }
  } = useGetNetworkConfig()

  const formattedValue = formatAmount({
    input: value,
    decimals,
    digits,
    showLastNonZeroDecimal: true
  })

  return (
    <span className={className} data-testid={props['data-testid']}>
      {formattedValue}
      {showLabel && ` ${egldLabel}`}
    </span>
  )
}
