import * as React from 'react'
import { Box, Text } from '.'

export function BigNumber({ number, subtitle, ...rest }: any) {
  return (
    <Box {...rest} layout="flex" alignItems="baseline">
      <Text textVariant="bigNumber" color="primaryText">
        {number}
      </Text>
      <Text textVariant="h4" color="secondaryText" ml={1}>
        {subtitle}
      </Text>
    </Box>
  )
}
