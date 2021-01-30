import { Layout } from '@/components/Layout'
import { NextSeo } from 'next-seo'
import { PageTitle } from '../../components/PageTitle'
import { parseISO, compareDesc } from 'date-fns'
import { Video } from '@/components/Video'
import { useState } from 'react'
import { Chip, Link } from '@/components/design-system'
import { useImportTipVideoPaths } from '@/components/useImportTipVideoPaths'

type TipMeta = {
  date: string
  title: string
  tags: string[]
  slug: string
  videoPoster?: string
  video?: string
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
  title,
  slug,
  date,
  tags,
  videoPoster,
  video,
  active,
  onMouseEnter,
  onMouseLeave,
}: TipPreviewProps) {
  const [videoPath, videoPosterPath] = useImportTipVideoPaths(
    slug,
    video,
    videoPoster,
  )
  return (
    <article
      onMouseEnter={() => typeof onMouseEnter === 'function' && onMouseEnter()}
      onMouseLeave={() => typeof onMouseLeave === 'function' && onMouseLeave()}
      className="border border-gray-200 cursor-pointer rounded-sm overflow-hidden hover:shadow-lg"
    >
      <Link href={`/tips/${slug}`} underline={false}>
        <div>
          <div
            className="relative"
            css={{
              paddingTop: '56.25%',
              '& > *': {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
            }}
          >
            {videoPosterPath && videoPath ? (
              <Video
                videoUrl={videoPath}
                posterUrl={videoPosterPath}
                play={active}
              />
            ) : (
              <h2 className="p-4 text-lg bg-green-500 text-white font-semibold">
                {title}
              </h2>
            )}
          </div>
          {/* {thumbnailImage && (
            <Image src={thumbnailImage} width={100} height={100} />
          )} */}
          <div className="p-4 space-y-4">
            {videoPosterPath && videoPath && (
              <h2 className="text-base font-semibold">{title}</h2>
            )}
            <div className="text-tiny flex space-x-1">
              {tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            {/* <div className="text-sm text-gray-500">{date}</div> */}
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
        <div
          className={
            `w-11/12 mx-auto space-y-10 ` + //
            // `sm:w-full sm:max-w-screen-sm ` + //
            // `md:max-w-screen-md ` + //
            `xl:max-w-screen-xl`
          }
        >
          <PageTitle>{title}</PageTitle>
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

export async function getStaticProps() {
  const context = require.context('.', true, /index\.mdx/)
  const tips = context
    .keys()
    .map((filename) => {
      const meta = context(filename).meta
      return meta
    })
    .sort(compareDates)
  return { props: { tips } }
}
