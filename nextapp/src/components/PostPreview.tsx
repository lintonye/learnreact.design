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

export function PostPreview({ url, title, excerpt }: Post) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{renderExcerpt(excerpt)}</div>
      <Link href={url}>Read more</Link>
    </article>
  )
}
