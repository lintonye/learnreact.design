import * as React from 'react'
import { Box, Testimonial, Companies } from '../../design-system'
import EmailForm from './EmailForm'

export default function SocialProof() {
  return (
    <Box bg="primaryBg" m={0} pt={6} pb={8} px={4}>
      <Testimonial
        company="Pitch"
        name="Kevin Cannon"
        photoName="kevinc"
        text="I’ve seriously learned 10x more in the last 4 weeks than in the last 8 months trying to learn Framer on my own, also quite a bit of React as a bonus. These 4 weeks will really stay with me for a long time! "
        title="Product Designer"
      />
      <Companies />
      {/* <EmailForm /> */}
    </Box>
  )
}
