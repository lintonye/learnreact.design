import { jsx } from '@emotion/core'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Post } from '../types'

function renderExcerpt(excerpt: string | FunctionComponent) {
  if (typeof excerpt === 'string') {
    return excerpt
  } else {
    const ExcerptComponent = excerpt
    return <ExcerptComponent />
  }
}

export function PostPreview({ slug, title, excerpt, categorySlug }: Post) {
  return (
    <div>
      <h3>{title}</h3>
      <div>{renderExcerpt(excerpt)}</div>
      <Link href={`/${categorySlug}/${slug}`}>Read more</Link>
    </div>
  )
}
