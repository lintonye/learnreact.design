import * as React from 'react'
import { useCallback } from 'react'
import Layout from '@/components/legacy-design-system/Layout'
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
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import * as SeoData from '@/../next-seo.json'
import { CourseEvents } from '@/components/CourseEvents'

export default function PrototypingMasterCourse() {
  const [scrollValues, set] = useSpring(() => ({
    scrollTop: 0,
    xy: [0, 0],
  }))
  const onScroll = useCallback(
    (e) => set({ scrollTop: e.target.scrollTop / 30 }),
    [],
  )
  const title =
    'Prototyping with React+Framer, a React course tailored for product designers, UX designers, UI designers.'
  const description =
    "A React course, Framer course and JavaScript course, all in one! It's a linear learning process that guides you from zero coding experience to being able to build stunning prototypes."
  const router = useRouter()
  const url = SeoData.siteUrl + router.pathname
  return (
    <Layout theme="spaceLight" onScroll={onScroll} footer={false}>
      <NextSeo
        title={title}
        description={description}
        // titleTemplate={titleAppendSiteName ? undefined : '%s'}
        openGraph={{
          title,
          description,
          url,
          // images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
      />
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
        <CourseEvents />
        <Footer />
      </ScrollContext.Provider>
    </Layout>
  )
}
