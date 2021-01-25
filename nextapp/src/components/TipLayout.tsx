import React from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout'
import { MDXWrapper } from './MDXWrapper'
import { Video } from './Video'
import Image from 'next/image'
import { Link } from './design-system'

type LayoutProps = {
  meta: any
}

export const TipLayout: FunctionComponent<LayoutProps> = ({
  children,
  meta,
}) => {
  const { title, description, thumbnailImage, thumbnailVideo, sourceFile } =
    meta || {}

  return (
    <Layout>
      <NextSeo title={title} description={description} />
      <MDXWrapper>
        <div
          className={
            'max-w-screen-sm mx-auto space-y-10 leading-loose ' //+
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
          {thumbnailVideo ? (
            <Video videoUrl={thumbnailVideo} posterUrl={thumbnailImage} play />
          ) : (
            thumbnailImage && (
              <Image src={thumbnailImage} width={640} height={360} />
            )
          )}

          {/* Main content */}
          {children}

          {/* Downloads */}
          {sourceFile && (
            <div>
              <h2 className="text-3xl font-bold my-3 ">Source Code</h2>
              <Link href={sourceFile}>
                <a>Check out the complete source code here</a>
              </Link>
            </div>
          )}
        </div>
      </MDXWrapper>
    </Layout>
  )
}
