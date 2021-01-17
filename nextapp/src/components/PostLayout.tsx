import { jsx } from '@emotion/core'
import React, { useState, useReducer, useContext } from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as SeoData from '../../next-seo.json'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import {
  InPostStateContext,
  InPostAction,
  InPostState,
} from './InPostStateContext'
import { IntersectionDetector } from './IntersectionDetector'

type LayoutProps = {
  meta: any
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold" {...props} />,
  h2: withTocNotifier((props: any) => (
    <h2 {...props} className={'text-3xl font-bold my-3 ' + props.className} />
  )),
  h3: withTocNotifier((props: any) => (
    <h3 {...props} className={'text-2xl font-bold my-2 ' + props.className} />
  )),
  h4: (props: any) => (
    <h4 {...props} className={'text-xl font-bold ' + props.className} />
  ),
  ul: (props: any) => <ul className="list-outside list-disc ml-5" {...props} />,
  ol: (props: any) => (
    <ol className="list-outside list-decimal ml-5" {...props} />
  ),
  li: (props: any) => <li className=" leading-loose" {...props} />,
  a: (props: any) => <a className="underline" {...props} />,
  p: (props: any) => <p className="leading-loose" {...props} />,
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
      className="px-3 py-2 italic border-l-4 border-gray-300 bg-gray-100"
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

function createToc(path: string, activeHeadingSlug: string, children: any) {
  const toc: React.ReactElement[] = []
  visitHeading(children, ({ heading, slug, content }) => {
    const url = `${path}#${slug}`
    // console.log({ activeHeadingSlug, slug })

    toc.push(
      <li
        key={url}
        className={
          (heading === 'h3' ? 'ml-4' : 'ml-0') +
          ' hover:underline ' +
          (activeHeadingSlug === slug ? ' text-black font-semibold ' : '')
        }
      >
        <Link href={url}>{content}</Link>
      </li>,
    )
  })
  return <ul className="space-y-2">{toc}</ul>
}

function inPostStateReducer(state: InPostState, action: InPostAction) {
  return { ...state, [action.type]: action.data }
}

function withTocNotifier(Comp: FunctionComponent) {
  return function HeadingWithTocNotifier(props: any) {
    console.log({ props })

    return (
      <div>
        <Comp {...props} className={props.className + ' '} />
        <IntersectionDetector
          onIntersectionChange={({ isIntersecting, dispatch }) => {
            // isIntersecting && console.log('heading', props.children)

            isIntersecting &&
              dispatch({ type: 'activeHeadingSlug', data: props.id })
          }}
        >
          <div className="absolute h-16 w-1" />
        </IntersectionDetector>
      </div>
    )
  }
}

function Toc({
  pathname,
  contentChildren,
}: {
  pathname: string
  contentChildren: any
}) {
  const [state] = useContext(InPostStateContext)
  const toc = createToc(pathname, state?.activeHeadingSlug, contentChildren)
  return (
    <div className="hidden lg:block">
      <div className="uppercase font-semibold tracking-wider text-gray-800 mb-4">
        table of contents
      </div>
      <div className="text-sm text-gray-600">{toc}</div>
    </div>
  )
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

  const [inPostState, dispatch] = useReducer(inPostStateReducer, [])
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
      <InPostStateContext.Provider value={[inPostState, dispatch]}>
        <MDXProvider components={components}>
          <div
            className={
              'grid gap-y-5 ' //+
              // 'sm:max-w-screen-sm ' +
              // 'lg:max-w-screen-md ' +
              // 'xl:max-w-screen-lg '
            }
            css={{
              gridTemplateColumns: '1fr min(65ch, 100%) 30ch 1fr',
              '& > *': { gridColumn: 2 },
            }}
          >
            {title && (
              <h1
                className={
                  'font-bold leading-tight text-center text-2xl my-10 justify-self-center ' +
                  'sm:text-4xl ' +
                  'md:my-16 ' +
                  'lg:max-w-2xl lg:my-24 ' +
                  'xl:max-w-3xl xl:text-5xl xl:my-36 '
                }
                css={{
                  gridColumn: '2/4',
                }}
              >
                {title}
              </h1>
            )}

            {/* Sidebar */}
            <div
              className="sticky top-20 self-start mt-6 ml-12 justify-self-center"
              css={{ gridColumn: '3/4', gridRow: '2/20' }}
            >
              <Toc pathname={router.pathname} contentChildren={children} />
            </div>

            {/* Main content */}
            {children}
          </div>
        </MDXProvider>
      </InPostStateContext.Provider>

      <Footer />
    </>
  )
}
