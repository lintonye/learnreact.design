import { jsx, css } from '@emotion/core'
import React from 'react'
import { lg } from '../lib/media-queries'

type Props = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export function FullBleed({ className, children, ...props }: Props) {
  return (
    <div
      className={`w-full ` + ' ' + className}
      css={css`
        grid-column: 1/4;
        ${lg} {
          grid-column: 1/5 !important;
        }
      `}
    >
      {children}
    </div>
  )
}
