import { css } from '@emotion/core'
import * as React from 'react'
import Box from './Box'
import Text from './Text'
import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
const tinycolor = require('tinycolor2')

const StyledBox = styled(Box)`
  ${({ disabled, primary, color }) =>
    disabled
      ? `
          cursor: default;
          background-color: ${themeGet(
            `colors.${primary ? 'secondaryBg' : 'disabledBg'}`,
          )};
          color: ${themeGet(`colors.disabledText`)};
        `
      : `
          cursor: pointer;
          background-color: ${
            color || themeGet(`colors.${primary ? 'accent' : 'transparent'}`)
          };

          &:hover {
            background-color: ${(props) =>
              primary
                ? tinycolor(color || themeGet('colors.accent')(props))
                    .brighten()
                    .toString()
                : themeGet('colors.secondaryBg')(props)};
          }
        `};
`

export default function Button(props: any) {
  const { children, height, variant, onClick, ...rest } = props

  return (
    <StyledBox
      {...rest}
      onClick={rest.disabled ? null : onClick}
      alignItems="center"
      border={rest.primary ? 'none' : 'solid'}
      borderRadius="mostRound"
      justifyContent="center"
      layout="flex"
      p={1}
      px={4}
    >
      <Text
        m={0}
        color={
          rest.disabled
            ? 'disabledText'
            : rest.primary
            ? 'white'
            : 'primaryText'
        }
        textAlign="center"
        textVariant={
          variant === 'big' ? 'h4' : variant === 'small' ? 'small' : 'body'
        }
      >
        {children}
      </Text>
    </StyledBox>
  )
}
