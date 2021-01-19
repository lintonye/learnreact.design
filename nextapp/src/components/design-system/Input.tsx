import { jsx } from '@emotion/react'
import { InputHTMLAttributes } from 'react'

type Props = {
  // className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={
        `px-2 rounded-sm border border-gray-300 disabled:opacity-70` +
        ' ' +
        className
      }
      {...props}
    />
  )
}
