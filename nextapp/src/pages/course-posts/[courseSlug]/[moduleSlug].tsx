import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { GetStaticPathsContext } from 'next'
import { Link } from '@/components/design-system'
import { PageTitle } from '@/components/PageTitle'

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
  if (!sections) {
    debugger
    console.log({ moduleSlug, courseSlug, sections, rest })
  }

  return (
    <Layout>
      {/* <div>{courseSlug}</div> */}
      <div className="md:max-w-screen-sm mx-auto space-y-10 leading-loose">
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
    paths: [],
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
