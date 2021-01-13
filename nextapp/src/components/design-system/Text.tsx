import { jsx } from '@emotion/core'

type Props = {
  children?: React.ReactNode
}

export function Text({ children }: Props) {
  return <div>{children}</div>
}
