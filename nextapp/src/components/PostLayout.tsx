import { jsx } from '@emotion/core'
import React from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as SeoData from '../../next-seo.json'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { vi } from 'date-fns/esm/locale'

type LayoutProps = {
  meta: any
}

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold my-6" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold my-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold my-3" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold" {...props} />,
  ul: (props: any) => <ul className="list-outside list-disc ml-5" {...props} />,
  ol: (props: any) => (
    <ol className="list-outside list-decimal ml-5" {...props} />
  ),
  a: (props: any) => <a className="underline" {...props} />,
  p: (props: any) => <p className="my-4 leading-relaxed" {...props} />,
  hr: (props: any) => <hr className="my-6" {...props} />,
  img: (props: any) => (
    <Image
      className="mx-auto max-w-full"
      width={500}
      height={300}
      layout="responsive"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="pl-3 py-0.5 italic border-l-4 border-gray-300 bg-gray-100"
      {...props}
    />
  ),
}

type HeadingProcessor = (params: {
  heading: string
  slug: string
  content: string
}) => void

function visit(children: any, fun: (c: React.ReactElement) => void) {
  if (children)
    React.Children.forEach(children, (c) => {
      fun(c)
      if (c.props) {
        visit(c.props.children, fun)
      }
    })
}

function flatten(children: any) {
  let result = ''
  visit(children, (c) => {
    if (typeof c === 'string') result += c
  })
  return result
}

const headings = ['h2', 'h3']
function visitHeading(children: any, headingProcessorFun: HeadingProcessor) {
  visit(children, (c) => {
    if (c.props && headings.includes(c.props.originalType)) {
      const heading = c.props.originalType
      const content = flatten(c.props.children)
      const slug = c.props.id
      headingProcessorFun({ heading, slug, content })
    }
  })
}

function createToc(path: string, children: any) {
  const toc: React.ReactElement[] = []
  visitHeading(children, ({ heading, slug, content }) => {
    const url = `${path}#${slug}`
    toc.push(
      <li
        key={url}
        className={(heading === 'h3' ? 'ml-4' : 'ml-0') + ' hover:underline'}
      >
        <Link href={url}>{content}</Link>
      </li>,
    )
  })
  return <ul className="space-y-1">{toc}</ul>
}

export const PostLayout: FunctionComponent<LayoutProps> = ({
  children,
  meta,
}) => {
  const router = useRouter()
  const currentCanonicalUrl = SeoData.siteUrl + router.pathname
  const {
    title,
    description,
    titleAppendSiteName = false,
    url = currentCanonicalUrl,
    ogImage,
  } = meta || {}
  const toc = createToc(router.pathname, children)
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={titleAppendSiteName ? undefined : '%s'}
        openGraph={{
          title,
          description,
          url,
          images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
      />
      <NavBar />
      <div className="max-w-screen-lg mt-10 mx-auto h-auto ">
        {title && (
          <h1 className="text-5xl max-w-3xl mx-auto font-bold leading-tight text-center my-36">
            {title}
          </h1>
        )}
        <div className="flex justify-center space-x-16">
          <MDXProvider components={components}>
            <div className="prose md:prose-xl max-w-2xl leading-6">
              {children}
            </div>
          </MDXProvider>
          <div className="sticky top-20 self-start mt-6">
            <div className="uppercase font-semibold text-gray-500">
              table of contents
            </div>
            <div className="text-sm text-gray-500">{toc}</div>
          </div>
        </div>
      </div>
    </>
  )
}
