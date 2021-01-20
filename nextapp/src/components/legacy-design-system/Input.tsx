import * as React from 'react'
import { space, color, width } from 'styled-system'
import { themeGet } from '@styled-system/theme-get'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { textVariantStyle } from './Text'

const StyledInput = styled.input`
  ${space}
  ${textVariantStyle}
  ${color}
  ${width}
  border: none;
  /* border-bottom: 1px solid ${themeGet('colors.secondaryText')}; */
  &:disabled {
    color: ${themeGet('colors.disabledText')};
    /* border-bottom: 1px solid ${themeGet('colors.disabledText')}; */
  }
`

//TODO why defaultProps doesn't work?
// StyledInput.defaultProps = {
//   textVariant: "body",
//   color: "primaryText",
//   bg: "primaryBg"
// };

export default function Input(props: any) {
  return (
    <StyledInput
      textVariant="body"
      color="primaryText"
      bg="secondaryBg"
      p={1}
      {...props}
    />
  )
}
