import { Layout } from '@/components/Layout'
import { NextSeo } from 'next-seo'
import getAllPostPreviews from '@/getAllPostPreviews'
import { PostPreview } from '@/components/PostPreview'
import { PageTitle } from '../../components/PageTitle'
import { parseISO, compareDesc } from 'date-fns'
import { Video } from '@/components/Video'
import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/components/design-system'

type TipMeta = {
  date: string
  title: string
  tags: string[]
  slug: string
  thumbnailImage?: string
  thumbnailVideo?: string
}

type Props = {
  tips: TipMeta[]
}

type TipPreviewProps = {
  active: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
} & TipMeta

function TipPreview({
  date,
  title,
  tags,
  slug,
  thumbnailImage,
  thumbnailVideo,
  active,
  onMouseEnter,
  onMouseLeave,
}: TipPreviewProps) {
  return (
    <article
      onMouseEnter={() => typeof onMouseEnter === 'function' && onMouseEnter()}
      onMouseLeave={() => typeof onMouseLeave === 'function' && onMouseLeave()}
      className="border border-gray-200 cursor-pointer rounded-sm overflow-hidden hover:shadow-lg"
    >
      <Link href={`/tips/${slug}`}>
        <div>
          {thumbnailImage && thumbnailVideo && (
            <Video
              videoUrl={thumbnailVideo}
              posterUrl={thumbnailImage}
              play={active}
            />
          )}
          {/* {thumbnailImage && (
            <Image src={thumbnailImage} width={100} height={100} />
          )} */}
          <div className="p-4">
            <h2 className="text-base font-semibold">{title}</h2>
          </div>
        </div>
      </Link>
    </article>
  )
}

function TipList({ tips }: { tips: TipMeta[] }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  return (
    <div
      className="grid gap-4"
      css={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      }}
    >
      {tips.map((tip, index) => (
        <TipPreview
          key={tip.title}
          {...tip}
          active={activeIndex === index}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(-1)}
        />
      ))}
    </div>
  )
}

export default function AllTipsPage({ tips }: Props) {
  const title = 'React + Framer Tips'

  return (
    <Layout>
      <NextSeo
        title={title}
        openGraph={{
          title,
          // description,
          // images: ogImage ? [ogImage] : undefined,
        }}
      />
      <main>
        <PageTitle>{title}</PageTitle>
        <div className="md:max-w-screen-lg mx-auto space-y-10 leading-loose">
          {/* {allPosts.map((p) => (
            // @ts-ignore
            <PostPreview key={p.slug} {...p} titleAs="h2" />
          ))} */}
          <TipList tips={tips} />
        </div>
      </main>
    </Layout>
  )
}

function compareDates(meta1: TipMeta, meta2: TipMeta) {
  const d1 = parseISO(meta1.date)
  const d2 = parseISO(meta2.date)
  return compareDesc(d1, d2)
}

export function getStaticProps() {
  const context = require.context('.', true, /index\.mdx/)
  const path = require('path')
  const tips = context
    .keys()
    .map((filename) => {
      const meta = context(filename).meta
      meta.slug = path.dirname(filename).split(path.separator).pop()
      return meta
    })
    .sort(compareDates)
  return { props: { tips } }
}
