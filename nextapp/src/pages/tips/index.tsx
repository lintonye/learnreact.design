import { Layout } from '@/components/Layout'
import { NextSeo } from 'next-seo'
import getAllPostPreviews from '@/getAllPostPreviews'
import { PostPreview } from '@/components/PostPreview'
import { PageTitle } from '../../components/PageTitle'

export default function AllPostsPage(props) {
  const title = 'React/Framer Tips'
  console.log(props)

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
        <div className="max-w-screen-sm mx-auto space-y-10 leading-loose">
          {/* {allPosts.map((p) => (
            // @ts-ignore
            <PostPreview key={p.slug} {...p} titleAs="h2" />
          ))} */}
        </div>
      </main>
    </Layout>
  )
}

export function getStaticProps() {
  return { props: require('./test.mdx').meta }
}
