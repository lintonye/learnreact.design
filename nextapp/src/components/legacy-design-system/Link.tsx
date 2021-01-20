import * as React from 'react'
import { css } from '@emotion/core'
import NLink from 'next/link'
import Text from './Text'
import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'

const common = `
  &:link {
    text-decoration: none;
    color: ${themeGet('colors.secondaryText')};
  }
  &:visited {
    text-decoration: none;
    color: ${themeGet('colors.secondaryText')};
  }
  &:hover {
    text-decoration: ${({ underline }: { underline: boolean }) =>
      underline && 'underline'};
    color: ${themeGet('colors.primaryText')};
  }
`

const StyledLink = styled(NLink)`
  ${common};
`

const StyledAnchor = styled.a`
  ${common};
`

export default function Link(props: any) {
  const {
    to,
    children,
    underline = true,
    target,
    textAlign,
    className,
    ...rest
  } = props
  const LinkComp: React.FunctionComponent<any> =
    to && to.match(/(https?)|(mailto:).+/) ? StyledAnchor : StyledLink
  return (
    <LinkComp
      href={to}
      underline={underline}
      target={target}
      style={{ textAlign }}
    >
      <Text
        {...rest}
        as="span"
        className={`cursor-pointer ${
          underline ? 'hover:underline' : ''
        } ${className}`}
      >
        {children}
      </Text>
    </LinkComp>
  )
}
