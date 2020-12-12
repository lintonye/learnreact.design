import {postData} from './postData'
import Link from 'next/link'

export function Main() {
  return (
    <div>
      <div>
        {postData.map(({categoryTitle, categorySlug, posts}) => (
          <section key={categorySlug}>
            <h2>{categoryTitle}</h2>
            {posts.map(({title, excerpt, slug}) => (
              <div key={slug}>
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <Link href={`/${categorySlug}/${slug}`}>Read more</Link>
              </div>
            ))}
          </section>
        ))}
      </div>
      <div>Sidebar</div>
    </div>
  )
}
