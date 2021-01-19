import * as React from 'react'
import { Link as GLink } from 'gatsby'
import Text from './Text'
import styled, { css } from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

const common = css`
  &:link {
    text-decoration: none;
    color: ${themeGet('colors.secondaryText')};
  }
  &:visited {
    text-decoration: none;
    color: ${themeGet('colors.secondaryText')};
  }
  &:hover {
    text-decoration: ${({ underline }) => underline && 'underline'};
    color: ${themeGet('colors.primaryText')};
  }
`

const StyledLink = styled(GLink)`
  ${common};
`

const StyledAnchor = styled.a`
  ${common};
`

export default function Link(props) {
  const { to, children, underline = true, target, textAlign, ...rest } = props
  const LinkComp =
    to && to.match(/(https?)|(mailto:).+/) ? StyledAnchor : StyledLink
  return (
    <LinkComp
      to={to}
      href={to}
      underline={underline}
      target={target}
      style={{ textAlign }}
    >
      <Text {...rest} as="span">
        {children}
      </Text>
    </LinkComp>
  )
}
