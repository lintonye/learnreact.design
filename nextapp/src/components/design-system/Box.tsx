import { jsx } from '@emotion/core'

type Props = {
  children?: React.ReactNode
}

export function Box({ children }: Props) {
  return <div>{children}</div>
}
