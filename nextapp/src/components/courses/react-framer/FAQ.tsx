import * as React from 'react'
import { Box, Text, Link } from '@/components/legacy-design-system'
import GalaxyHole from './GalaxyHole'

const Question = ({ title, children, ...props }: any) => (
  <Box
    {...props}
    layout="grid"
    gridTemplateColumns="auto 1fr"
    gridColumnGap={3}
    gridRowGap={1}
    my={1}
  >
    <Text textVariant="h3">
      <strong>Q.</strong>
    </Text>
    <Text textVariant="h3" as="h3" my={0}>
      {title}
    </Text>
    <Text textVariant="h3" color="secondaryText">
      <strong>A.</strong>
    </Text>
    <Text textVariant="body" color="secondaryText">
      {children}
    </Text>
  </Box>
)
export default function FAQ() {
  return (
    <Box
      mx={'auto'}
      px={[4, 0]}
      mt={[5, 8]}
      mb={[8, 8]}
      layout="grid"
      gridTemplateColumns="1fr"
      maxWidth={700}
      justifyContent="center"
      gridGap={4}
    >
      <GalaxyHole galaxy={['mobileSmall1', 'small1']}>
        <Text as="h2" textVariant="h2" color="white" ml={6}>
          FAQs
        </Text>
      </GalaxyHole>
      <Question title="Is this a Framer course or React course?">
        It's a React course, Framer course and JavaScript course, all in one!
        It's a linear learning process that guides you from zero coding
        experience to being able to build stunning prototypes. Try the{' '}
        <Link to="/prototyping-with-react-framer#pricing">
          Satellite course
        </Link>
        !
      </Question>
      {/* <Question title="What if I don't have a Framer license yet?">
        No worries. You can download a free 14-day trial of Framer X. If you
        enroll in this course, you'll get a 20% discount on a Yearly
        subscription of Framer. <br />
        <br /> This course is designed with minimal upfront requirements in
        mind. Although it focuses on Framer (and React), you'd only need a
        modern browser to get started. Once you master its core, it'd be a
        breeze to move to Framer X at a later module (Module 9).
      </Question> */}
      <Question title="Do I need to have JavaScript experience to join?">
        No. This course is designed to get you started quickly even with 0
        coding experience. I'll cover basic coding concepts along the journey to
        creating stunning prototypes.
        <br />
        <br />
        I'll assume that you are familiar with HTML and CSS.
      </Question>
      <Question title="I'm familiar with Framer Classic, is this course for me?">
        Yes! As one of the students said: "I just didn’t get the whole
        React/Declarative/Framer X general way of thinking. Also using some of
        the basic hooks. I think starting in Code Sandbox made it a bit easier.
        So, it wasn’t one specific thing but all the other things. I will
        recommend this course to anyone who’s struggling to make the switch to
        X."
      </Question>
      <Question title="I'm familiar with jQuery, is this course for me?">
        Yes! React requires a different mental model than jQuery. This course
        covers that mental model with illustrations and metaphors. I think
        you'll like it! Try the first couple of modules to see!
      </Question>
      <Question title="Is there a Parity Purchasing Power program or student discount?">
        Please email me: linton[AT]jimulabs.com.
      </Question>
    </Box>
  )
}
