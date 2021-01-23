import { Layout } from '@/components/Layout'
import React from 'react'
import { NextSeo } from 'next-seo'
import { coursesByReq } from '@/assets/CourseData'
import { CoursePreview } from '../../components/CoursePreview'

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
                <CoursePreview
                  key={c.slug}
                  titleAs="h2"
                  excerptAs="h3"
                  {...c}
                />
              )),
            )}
        </div>
      </main>
    </Layout>
  )
}
