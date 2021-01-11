import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as SeoData from '../../next-seo.json'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { InPostMessageContext } from './InPostMessageContext'

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
      width={1024}
      height={768}
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
  const [inPostMessage, setInPostMessage] = useState(null)
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
      <div
        className={
          'max-w-xs mx-auto mt-10 ' +
          'sm:max-w-screen-sm ' +
          'lg:max-w-screen-md ' +
          'xl:max-w-screen-lg '
        }
      >
        {title && (
          <h1
            className={
              'mx-auto font-bold leading-tight text-center text-2xl my-10 w-full ' +
              'sm:text-4xl ' +
              'md:my-16 ' +
              'lg:max-w-2xl lg:my-24 ' +
              'xl:max-w-3xl xl:text-5xl xl:my-36 '
            }
          >
            {title}
          </h1>
        )}
        <InPostMessageContext.Provider
          value={[inPostMessage, (msg) => setInPostMessage(msg)]}
        >
          <div
            className={
              'block justify-center space-x-16 w-full mx-auto ' + //
              'lg:flex '
            }
          >
            {/* Main content */}
            <MDXProvider components={components}>
              <div className="w-full">{children}</div>
            </MDXProvider>

            {/* Sidebar */}
            <div className="sticky top-20 self-start mt-6">
              <div className="hidden lg:block">
                <div className="uppercase font-semibold text-gray-500 my-2">
                  table of contents
                </div>
                <div className="text-sm text-gray-500">{toc}</div>
              </div>
            </div>
          </div>
        </InPostMessageContext.Provider>
      </div>
      <Footer />
    </>
  )
}
