import * as React from 'react'
import { Text as _Text } from 'rebass'
import {
  variant,
  // fontSize,
  compose,
  // lineHeight,
  // letterSpacing,
  // fontWeight,
  // fontFamily,
  // fontStyle,
  typography,
  maxWidth,
  minWidth,
} from 'styled-system'
import styled from '@emotion/styled'

const textVariant = variant({ key: 'textVariants', prop: 'textVariant' })

const textStyle = compose(typography)
// fontSize,
// lineHeight,
// fontWeight,
// fontFamily,
// fontStyle,
// letterSpacing,

export const textVariantStyle = (props: any) => {
  //// In Gatsby's HTML build, textVariant() returns
  //// null, so the line below fails
  const { as, ...variantStyle } = textVariant(props)
  // const variantStyle = textVariant(props)
  return textStyle(variantStyle)
}

const Text = styled(_Text)(textVariantStyle, maxWidth, minWidth)

export default Text
