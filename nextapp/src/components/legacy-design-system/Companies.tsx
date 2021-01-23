import * as React from 'react'
import Box from './Box'
import Text from './Text'
import styled from '@emotion/styled'
import { space } from 'styled-system'

const LogoImg = styled.img(space)

export default function Companies() {
  const [photoUrls, setPhotoUrls] = React.useState([])
  const companies = [
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
  ]
  return (
    <Box>
      <Box
        layout="flex"
        flexWrap="wrap"
        alignItems="center"
        maxWidth={800}
        mt={6}
        mx="auto"
      >
        {companies.map((company) => (
          <LogoImg
            src={require(`@/assets/company-logos/${company}.png`).default}
            key={company}
            m={[2, 2, 4]}
          />
        ))}
      </Box>
    </Box>
  )
}
