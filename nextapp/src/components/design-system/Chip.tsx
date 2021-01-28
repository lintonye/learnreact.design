import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export function Chip({ children, className }: Props) {
  return (
    <div
      className={`bg-gray-200 text-black py-0.5 -my-0.5 px-3 rounded-3xl whitespace-nowrap ${className}`}
    >
      {children}
    </div>
  )
}
