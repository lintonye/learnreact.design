import * as React from 'react'
import { useCallback } from 'react'
import Layout from '@/components/legacy-design-system/Layout'
import ConvertKitForm from '@/components/legacy-design-system/ConvertKitForm'
import { Box, Header, Text } from '@/components/legacy-design-system'
import Bios from '@/components/legacy-design-system/BiosComet'
import Hero from '@/components/courses/react-framer/Hero'
import SocialProof from '@/components/courses/react-framer/SocialProof'
import Details from '@/components/courses/react-framer/Details'
import StudentWorks from '@/components/courses/react-framer/StudentWorks'
import Pricing from '@/components/courses/react-framer/Pricing'
import { useSpring } from 'react-spring'
import ScrollContext from '@/components/courses/react-framer/ScrollContext'
import FAQ from '@/components/courses/react-framer/FAQ'
import Footer from '@/components/courses/react-framer/Footer'

export default function PrototypingMasterCourse() {
  const [scrollValues, set] = useSpring(() => ({
    scrollTop: 0,
    xy: [0, 0],
  }))
  const onMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    [],
  )
  const onScroll = useCallback(
    (e) => set({ scrollTop: e.target.scrollTop / 30 }),
    [],
  )
  return (
    <Layout theme="spaceLight" onScroll={onScroll} footer={false}>
      <Helmet>
        <title>
          Prototyping with React+Framer, a React course tailored for product
          designers, UX designers, UI designers.
        </title>
        <meta
          name="Description"
          content="A React course, Framer course and JavaScript course, all in one! It's a linear learning process that guides you from zero coding experience to being able to build stunning prototypes."
        />
        {/* <script async id="_ck_340441" src="https://forms.convertkit.com/340441?v=6"></script> */}
      </Helmet>
      {/* <Header /> */}
      {/* <Box bg={`url("${banner}")`} width="100%" height={50} /> */}
      <ScrollContext.Provider value={scrollValues}>
        <Hero />
        <StudentWorks />
        <Details />
        <Pricing />
        <SocialProof />
        <FAQ />
        <Bios bg="primaryBg" cometBg />
        <Footer />
      </ScrollContext.Provider>
    </Layout>
  )
}
