import { jsx } from '@emotion/core'
import { getPostDataAtHome } from '../assets/featuredPostData'
import { PostPreview } from './PostPreview'

export function Main() {
  const postData = getPostDataAtHome()
  return (
    <div>
      <div className="space-y-8">
        {postData.map(({ categoryTitle, categorySlug, posts }) => (
          <section key={categorySlug} className="space-y-8">
            <h2>{categoryTitle}</h2>
            {posts.map((post) => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </section>
        ))}
      </div>
      <div>Sidebar</div>
    </div>
  )
}
