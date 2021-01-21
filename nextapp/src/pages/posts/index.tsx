import { Layout } from '@/components/Layout'
import { NextSeo } from 'next-seo'
import getAllPostPreviews from '@/getAllPostPreviews'
import { PostPreview } from '@/components/PostPreview'

export default function Home() {
  const title = 'All Posts'
  const allPosts = getAllPostPreviews()
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
        <h1 className="m-20 text-center text-4xl font-bold">{title}</h1>
        <div className="max-w-screen-sm mx-auto space-y-10 leading-loose">
          {allPosts.map((p) => (
            <PostPreview key={p.slug} {...p} titleAs="h2" />
          ))}
        </div>
      </main>
    </Layout>
  )
}
