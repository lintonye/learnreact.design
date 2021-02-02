import React from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout'
import { MDXWrapper } from './MDXWrapper'

type LayoutProps = {
  meta: any
}

export const MdxLayout: FunctionComponent<LayoutProps> = ({
  children,
  meta,
}) => {
  const { title, description } = meta || {}

  return (
    <Layout>
      <NextSeo title={title} description={description} />
      <MDXWrapper>
        <div
          className={
            'w-11/12 max-w-prose mx-auto space-y-10 leading-loose ' //+
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
          </div>

          {/* Main content */}
          {children}
        </div>
      </MDXWrapper>
    </Layout>
  )
}
