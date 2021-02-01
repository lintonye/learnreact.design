import { jsx, css } from '@emotion/core'
import React, { useState, useReducer, useContext } from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import * as SeoData from '../../next-seo.json'
import { Link } from '@/components/design-system'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Layout } from '@/components/Layout'
import {
  InPostStateContext,
  InPostAction,
  InPostState,
} from './InPostStateContext'
import { ConvertKitForm } from './design-system'
import { MDXWrapper } from './MDXWrapper'
import { ViewCounter } from './ViewCounter'
import { Likes } from './Likes'
import { DiscussionTwitter } from './DiscussOnTwitter'
import { PostPreview } from './PostPreview'
import { getPostBySlug } from '@/getAllPostPreviews'
import { motion } from 'framer-motion'
import { lg } from '../lib/media-queries'
import { FiCalendar } from 'react-icons/fi'

type LayoutProps = {
  meta: any
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

function visitHeading(
  children: any,
  headingProcessorFun: HeadingProcessor,
  headings: string[],
) {
  visit(children, (c) => {
    if (c.props && headings.includes(c.props.originalType)) {
      const heading = c.props.originalType
      const content = flatten(c.props.children)
      const slug = c.props.id
      headingProcessorFun({ heading, slug, content })
    }
  })
}

function createToc(
  activeHeadingSlug: string,
  children: any,
  headings: string[],
) {
  const toc: React.ReactElement[] = []
  visitHeading(
    children,
    ({ heading, slug, content }) => {
      const url = `#${slug}`
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
    },
    headings,
  )
  return <ul className="space-y-2">{toc}</ul>
}

function inPostStateReducer(state: InPostState, action: InPostAction) {
  return { ...state, [action.type]: action.data }
}

function Toc({
  contentChildren,
  headings = ['h2', 'h3'],
}: {
  contentChildren: any
  headings: string[]
}) {
  const [state] = useContext(InPostStateContext)
  const toc = createToc(state?.activeHeadingSlug, contentChildren, headings)
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
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  const {
    title,
    date,
    description,
    titleAppendSiteName = false,
    ogImage,
    tocHeadings,
    sidebar = true,
    related = [],
  } = meta || {}

  const [inPostState, dispatch] = useReducer(inPostStateReducer, [])

  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={titleAppendSiteName ? undefined : '%s'}
        openGraph={{
          title,
          description,
          images: ogImage ? [ogImage] : undefined,
        }}
      />
      <InPostStateContext.Provider value={[inPostState, dispatch]}>
        <MDXWrapper>
          <div
            className={
              'grid gap-y-5'
              // 'max-w-screen-sm mx-auto ' +
              // 'sm:max-w-screen-sm ' +
              // 'lg:grid lg:gap-y-5 lg:mx-0 lg:max-w-none' // +
              // 'xl:max-w-screen-lg '
            }
            css={css`
              grid-template-columns: 1fr min(65ch, 90%) 1fr;
              & > * {
                grid-column: 2;
              }
              ${lg} {
                grid-template-columns: 1fr min(65ch, 100%) 30ch 1fr;
              }
            `}
          >
            {title && (
              <div
                className={
                  'my-10 justify-self-center flex flex-col justify-center items-center space-y-8 ' +
                  'md:my-16 md:max-w-xl ' +
                  'lg:max-w-2xl lg:my-24 ' +
                  'xl:max-w-3xl xl:my-36 '
                }
                css={css`
                  ${lg} {
                    grid-column: 2/4 !important;
                  }
                `}
              >
                <h1
                  className={
                    'font-bold leading-tight text-center text-3xl ' +
                    'sm:text-4xl ' +
                    'xl:text-5xl '
                  }
                >
                  {title}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiCalendar />
                  <span>
                    Last Updated: <time dateTime={date}>{date}</time>
                  </span>
                </div>
              </div>
            )}

            {/* Sidebar */}
            <div
              className={
                'hidden sticky top-8 self-start mt-6 ml-12 justify-self-start space-y-8' +
                ' ' +
                'lg:block'
              }
              css={css`
                ${lg} {
                  grid-column: 3/4 !important;
                  grid-row: 2/20;
                }
              `}
            >
              <Toc contentChildren={children} headings={tocHeadings} />
              <DiscussionTwitter
                pageUrl={router.pathname}
                title={title}
                large
              />
              <Likes url={router.pathname} onLike={() => setLiked(true)} />
              {liked && (
                <motion.div
                  className="space-y-3 text-sm"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <div className="font-bold">
                    <span className="mr-1">👋</span> Thank you! I'm so thrilled!
                  </div>
                  <p className="leading-normal">
                    Want to receive early previews of future posts? Sign up
                    below!
                  </p>
                  <ConvertKitForm formId="465988" />
                </motion.div>
              )}
            </div>

            {/* Main content */}
            {children}

            {/* Additional Info */}
            <hr />
            <ViewCounter url={router.pathname} />
            <DiscussionTwitter pageUrl={router.pathname} title={title} />

            {/* Sign up form */}
            <div className="p-8 bg-indigo-100 border border-indigo-400 rounded-sm space-y-4">
              <p>I hope you find this article useful!</p>
              <p>
                One of my 2021 goals is to write more posts that are{' '}
                <strong>useful</strong>, <strong>interactive</strong> and{' '}
                <strong>entertaining</strong>. Want to receive early previews of
                future posts? Sign up below. No spam, unsubscribe anytime.
              </p>

              <ConvertKitForm formId="208846" />
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-thin my-3">You may also like</h2>
                {related.map((slug: string) => (
                  // @ts-ignore
                  <PostPreview key={slug} {...getPostBySlug(slug)} />
                ))}
              </div>
            )}
          </div>
        </MDXWrapper>
      </InPostStateContext.Provider>
    </Layout>
  )
}
