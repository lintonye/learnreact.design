import { jsx } from '@emotion/core'
import { highlightedPost } from '@/featuredPostData'
import Link from 'next/link'

export function Hero() {
  const { title, excerpt, categorySlug, slug } = highlightedPost
  return (
    <div>
      <h1>
        React For Designers
        <span className="font-cursive">and visual learners</span>
      </h1>
      <article>
        <h2>{title}</h2>
        <p>{excerpt}</p>
        <Link href={`/${categorySlug}/${slug}`}>Read more</Link>
      </article>
    </div>
  )
}
