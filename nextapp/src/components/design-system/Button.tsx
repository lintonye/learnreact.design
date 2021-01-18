import { jsx } from '@emotion/core'
import { ButtonHTMLAttributes } from 'react'

type Props = {
  // children?: React.ReactNode
  // className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={
        `bg-gray-800 px-4 py-2 text-white rounded-sm disabled:bg-gray-300 disabled:cursor-default` +
        ' ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}
