import Link from 'next/link'
import { Post } from '../types'

export function PostPreview({
  slug,
  title,
  excerpt: Component,
  categorySlug,
}: Post) {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <Component />
      </div>
      <Link href={`/${categorySlug}/${slug}`}>Read more</Link>
    </div>
  )
}
