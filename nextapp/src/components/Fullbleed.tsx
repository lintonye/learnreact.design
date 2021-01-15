import { jsx } from '@emotion/core'

type Props = {
  children: any
}

export function Fullbleed({ children }: Props) {
  return (
    <div className="relative mb-96 pb-96 -ml-40">
      <div className="absolute w-screen grid grid-cols-2 items-start justify-items-center">
        {children}
      </div>
    </div>
  )
}
