import React from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout'
import { MDXWrapper } from './MDXWrapper'
import { Video } from './Video'
import Image from 'next/image'
import { Chip, Link } from './design-system'
import { useImportTipVideoPaths } from './useImportTipVideoPaths'

type LayoutProps = {
  meta: any
}

export const TipLayout: FunctionComponent<LayoutProps> = ({
  children,
  meta,
}) => {
  const {
    title,
    slug,
    description,
    videoPoster,
    video,
    sourceFile,
    tags,
    date,
  } = meta || {}

  const [videoPath, videoPosterPath] = useImportTipVideoPaths(
    slug,
    video,
    videoPoster,
  )

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
              {tags.map((tag: string) => (
                <Chip key="tag">{tag}</Chip>
              ))}
              <div className="pl-8">Updated: {date}</div>
            </div>{' '}
          </div>

          {videoPath && videoPosterPath ? (
            <Video videoUrl={videoPath} posterUrl={videoPosterPath} play />
          ) : (
            videoPosterPath && (
              <Image src={videoPosterPath} width={640} height={360} />
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
