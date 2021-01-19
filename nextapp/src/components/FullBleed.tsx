import { jsx } from '@emotion/react'
import React from 'react'

type Props = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export function FullBleed({ className, children, ...props }: Props) {
  return (
    <div className={`w-full ` + ' ' + className} css={{ gridColumn: '1/5' }}>
      {children}
    </div>
  )
}
