import { Layout } from '@/components/Layout'
import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import { coursesByReq } from '@/assets/CourseData'
import { Course } from '@/types'
import { Link } from '@/components/design-system'
import { motion } from 'framer-motion'

function Reveal({
  itemUnder,
  children,
}: {
  itemUnder: React.ReactNode
  children: React.ReactNode
}) {
  const [animate, setAnimate] = useState<'hidden' | 'revealed'>('hidden')
  return (
    <motion.div
      animate={animate}
      className="relative border-l border-black border-opacity-40 pl-8"
      onMouseEnter={() => setAnimate('revealed')}
      onMouseLeave={() => setAnimate('hidden')}
    >
      <motion.div
        variants={{
          hidden: { x: 0, rotate: 180 },
          revealed: { x: -80, rotate: 0 },
        }}
        className="absolute"
      >
        {itemUnder}
      </motion.div>
      <div className="absolute inset-0 bg-white" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

type Props = {
  nameAs?: 'div' | 'h2' | 'h3' | 'h4'
  subtitleAs?: 'div' | 'h2' | 'h3' | 'h4'
} & Course

function CoursePreview({
  nameAs = 'div',
  subtitleAs = 'div',
  name,
  subtitle,
  icon,
  length,
  detailLink,
  isNew,
}: Props) {
  return (
    <Reveal itemUnder={icon}>
      {React.createElement(
        nameAs,
        { className: 'text-lg font-bold' },
        <Link href={detailLink}>{name}</Link>,
      )}

      {React.createElement(subtitleAs, {}, subtitle)}
      <div>{length}</div>
    </Reveal>
  )
}

export default function AllCoursesPage() {
  const title = 'All Courses'
  const requirements = ['none', 'js', 'react']
  return (
    <Layout>
      <NextSeo
        title={title}
        openGraph={{
          title,
          // description,
          // images: ogImage ? [ogImage] : undefined,
        }}
      />
      <main>
        <h1 className="m-20 text-center text-4xl font-bold">{title}</h1>
        <div className="max-w-screen-sm mx-auto space-y-10 leading-loose">
          {requirements
            .map((r) => coursesByReq(r))
            .flatMap((courses) =>
              courses.map((c) => (
                <CoursePreview key={c.id} nameAs="h2" subtitleAs="h3" {...c} />
              )),
            )}
        </div>
      </main>
    </Layout>
  )
}
