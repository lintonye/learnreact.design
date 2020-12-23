import { featuredPostData } from '../featuredPostData'
import { PostPreview } from './PostPreview'

export function Main() {
  return (
    <div>
      <div>
        {featuredPostData.map(({ categoryTitle, categorySlug, posts }) => (
          <section key={categorySlug}>
            <h2>{categoryTitle}</h2>
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                {...post}
                categorySlug={categorySlug}
              />
            ))}
          </section>
        ))}
      </div>
      <div>Sidebar</div>
    </div>
  )
}
