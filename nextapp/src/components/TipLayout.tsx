import React from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout'
import { MDXWrapper } from './MDXWrapper'

type LayoutProps = {
  meta: any
}

export const TipLayout: FunctionComponent<LayoutProps> = ({
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
            ' ' //+
            // 'sm:max-w-screen-sm ' +
            // 'lg:max-w-screen-md ' +
            // 'xl:max-w-screen-lg '
          }
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
            >
              {title}
            </h1>
          )}
          {/* Main content */}
          {children}
        </div>
      </MDXWrapper>
    </Layout>
  )
}
