import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { GetStaticPathsContext } from 'next'
import { Link } from '@/components/design-system'
import { PageTitle } from '@/components/PageTitle'
import { NextSeo } from 'next-seo'
import * as SEOData from '@/../next-seo.json'

type Props = {
  courseSlug: string
  moduleSlug: string
  sections: { slug: string; url: string; name: string }[]
}

export default function CoursePostModulePage({
  courseSlug,
  moduleSlug,
  sections,
  ...rest
}: Props) {
  // if (!sections) {
  //   debugger
  //   console.log({ moduleSlug, courseSlug, sections, rest })
  // }
  const url = `${SEOData.siteUrl}/course-posts/${courseSlug}/${moduleSlug}`

  return (
    <Layout>
      <NextSeo canonical={url} openGraph={{ url }} />
      {/* <div>{courseSlug}</div> */}
      <div className="w-11/12 max-w-prose mx-auto space-y-10">
        <PageTitle>{moduleSlug}</PageTitle>
        <ul className="text-xl space-y-4">
          {sections &&
            sections.map((section) => (
              <li key={section.slug}>
                <Link href={section.url}>{section.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      'module8-scroll-parallax',
      'module1-getting-started',
      'module2-toggle',
      `module3-slider`,
      `module4-tinder-swipe`,
      `module5-mouse-parallax`,
      `module6-react-state`,
      `module7-animation-orchestration`,
    ].map((p) => `/course-posts/prototyping-react-framer/${p}`),
    fallback: true,
  }
}

export async function getStaticProps(context: GetStaticPathsContext) {
  // @ts-ignore: params exists here.
  const { courseSlug, moduleSlug } = context.params
  const path = require('path')
  const fs = require('fs').promises

  try {
    const root = `src/pages/course-posts/${courseSlug}/${moduleSlug}`
    const files = await fs.readdir(root)

    const sections = []
    for (const file of files) {
      const stat = await fs.stat(path.join(root, file))
      if (stat.isDirectory()) {
        const sectionSlug = file
        const sectionURL = `/course-posts/${courseSlug}/${moduleSlug}/${sectionSlug}`
        sections.push({
          slug: sectionSlug,
          url: sectionURL,
          name: sectionSlug,
        })
      }
    }
    return files.length > 0
      ? { props: { sections, courseSlug, moduleSlug } }
      : { notFound: true }
  } catch (e) {
    return { notFound: true }
  }

  // console.log(sections)
}
