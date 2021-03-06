import { jsx } from '@emotion/core'
import { ButtonHTMLAttributes } from 'react'

type Props = {
  // children?: React.ReactNode
  // className?: string
  variant?: 'outline' | 'primary'
  size?: 'small' | 'normal' | 'large'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  className,
  variant = 'outline',
  size = 'normal',
  ...props
}: Props) {
  const variantClasses = {
    outline: 'border border-gray-500 disabled:opacity-40',
    primary: 'bg-gray-800 text-white font-semibold disabled:bg-gray-300',
  }
  const sizeClasses = {
    small: ' text-sm ',
    normal: '',
    large: ' text-lg ',
  }
  return (
    <button
      className={
        `px-4 py-2 rounded-sm disabled:cursor-default` +
        ' ' +
        variantClasses[variant] +
        ' ' +
        sizeClasses[size] +
        ' ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}
