import * as React from 'react'
import { css } from '@emotion/core'
import NLink from 'next/link'

type Props = {} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export function Link({ href, className, ...props }: Props) {
  const LinkComp: React.FunctionComponent<any> | string =
    href && href.match(/(https?)|(mailto:).+/) ? 'a' : NLink
  return (
    <span className={`cursor-pointer hover:underline ` + className}>
      {React.createElement(LinkComp, {
        href,
        ...props,
      })}
    </span>
  )
}
