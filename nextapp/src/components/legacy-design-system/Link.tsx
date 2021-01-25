import * as React from 'react'
import NLink from 'next/link'

export default function Link(props: any) {
  const { to, children, underline = true, className = ' ', ...rest } = props
  return (
    <NLink href={to}>
      <a
        {...rest}
        className={`cursor-pointer ${
          underline ? 'hover:underline' : ''
        } ${className}`}
      >
        {children}
      </a>
    </NLink>
  )
}
