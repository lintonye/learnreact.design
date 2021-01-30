import { Layout } from '@/components/Layout'
import { NextSeo } from 'next-seo'
import getAllPostPreviews from '@/getAllPostPreviews'
import { PostPreview } from '@/components/PostPreview'
import { PageTitle } from '../../components/PageTitle'

export default function AllPostsPage() {
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
        <PageTitle>{title}</PageTitle>
        <div className="w-11/12 mx-auto space-y-10 sm:w-full sm:max-w-screen-sm">
          {allPosts.map((p) => (
            // @ts-ignore
            <PostPreview key={p.slug} {...p} titleAs="h2" />
          ))}
        </div>
      </main>
    </Layout>
  )
}
