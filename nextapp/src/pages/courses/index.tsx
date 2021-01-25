import { Layout } from '@/components/Layout'
import React from 'react'
import { NextSeo } from 'next-seo'
import { coursesByReq } from '@/assets/CourseData'
import { CoursePreview } from '../../components/CoursePreview'
import { PageTitle } from '@/components/PageTitle'

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
        <PageTitle>{title}</PageTitle>
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
