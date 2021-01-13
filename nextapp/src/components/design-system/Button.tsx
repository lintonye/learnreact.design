import { jsx } from '@emotion/core'

type Props = {
  children?: React.ReactNode
}

export function Button({ children }: Props) {
  return <button>{children}</button>
}
