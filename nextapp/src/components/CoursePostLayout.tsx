import React from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout'
import { MDXWrapper } from './MDXWrapper'
import { Link } from './design-system'
import { FiPlayCircle } from 'react-icons/fi'

type LayoutProps = {
  meta: any
}

export const CoursePostLayout: FunctionComponent<LayoutProps> = ({
  children,
  meta,
}) => {
  const { title, description, video } = meta || {}

  return (
    <Layout>
      <NextSeo title={title} description={description} />
      <MDXWrapper>
        <div
          className={
            'w-11/12 max-w-prose mx-auto space-y-10  ' //+
            // 'sm:max-w-screen-sm ' +
            // 'lg:max-w-screen-md ' +
            // 'xl:max-w-screen-lg '
          }
        >
          <div
            className={
              'my-10 flex flex-col justify-center items-center space-y-8 ' +
              'md:my-16 ' +
              'lg:max-w-2xl lg:my-24 ' +
              'xl:max-w-3xl  xl:my-36 '
            }
          >
            <h1
              className={
                'font-bold leading-tight text-center text-2xl ' +
                'sm:text-4xl ' +
                'xl:text-5xl '
              }
            >
              {title}
            </h1>
            <div className="flex space-x-2 text-sm">
              {/* <div className="pl-8">Updated: {date}</div> */}
            </div>
          </div>

          <Link href={video}>
            <a className="flex space-x-2 items-center hover:text-green-600">
              <FiPlayCircle className="inline-block opacity-60" size={30} />
              <div>Watch the video course</div>
            </a>
          </Link>

          {/* Main content */}
          {children}
        </div>
      </MDXWrapper>
    </Layout>
  )
}
