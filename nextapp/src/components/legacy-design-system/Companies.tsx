import * as React from 'react'
import Box from './Box'
import Text from './Text'
import styled from '@emotion/styled'
import { space } from 'styled-system'

const LogoImg = styled.img(space)

export default function Companies() {
  return (
    <Box>
      <Box
        layout="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        maxWidth={800}
        mt={6}
        mx="auto"
      >
        {[
          'facebook',
          'google',
          'amazon',
          // "microsoft",
          'twitter',
          'uber',
          'IDEO',
          // "oracle",
          // "verizon",
          // "atlassian"
          // "braintree"
        ].map((company) => (
          <LogoImg
            src={require(`./assets/company-logos/${company}.png`)}
            key={company}
            m={[2, 2, 4]}
          />
        ))}
      </Box>
    </Box>
  )
}
