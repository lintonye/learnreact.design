import { Layout } from '@/components/Layout'
import React from 'react'
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
  return (
    <motion.div className="border-l border-black pl-8">{children}</motion.div>
  )
}

function CoursePreview({
  name,
  subtitle,
  icon,
  length,
  detailLink,
  isNew,
}: Course) {
  return (
    <Reveal itemUnder={icon}>
      <div className="text-lg font-bold">
        <Link href={detailLink}>{name}</Link>
      </div>
      <div>{subtitle}</div>
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
              courses.map((c) => <CoursePreview key={c.id} {...c} />),
            )}
        </div>
      </main>
    </Layout>
  )
}
