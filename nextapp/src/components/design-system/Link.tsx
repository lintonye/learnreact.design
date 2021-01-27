import * as React from 'react'
import { css } from '@emotion/core'
import NLink from 'next/link'

type Props = {
  href: string
  underline?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export function Link({
  href,
  className,
  children,
  underline = true,
  ...props
}: Props) {
  // const LinkComp: React.FunctionComponent<any> | string =
  // href && href.match(/(https?)|(mailto:).+/) ? 'a' : NLink
  return (
    <NLink href={href}>
      <a
        className={
          `cursor-pointer ${underline ? 'hover:underline' : ''} ` + className
        }
        {...props}
      >
        {children}
      </a>
    </NLink>
    //   <span classname={`cursor-pointer hover:underline ` + classname}>
    //     {react.createelement(linkcomp, {
    //       href,
    //       ...props,
    //     })}
    //   </span>
  )
}
