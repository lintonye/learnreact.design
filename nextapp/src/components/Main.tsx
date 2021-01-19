import { jsx } from '@emotion/react'
import { getPostDataAtHome } from '../featuredPostData'
import { PostPreview } from './PostPreview'

export function Main() {
  const postData = getPostDataAtHome()
  return (
    <div>
      <div>
        {postData.map(({ categoryTitle, categorySlug, posts }) => (
          <section key={categorySlug}>
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
