import { jsx } from '@emotion/core'
import React from 'react'
import { Link } from '@/components/design-system/Link'
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

type Props = {
  titleAs?: 'h1' | 'h2' | 'h3' | 'div'
} & Post

export function PostPreview({ url, title, excerpt, titleAs = 'div' }: Props) {
  return (
    <article className="space-y-2">
      <Link href={url}>
        {React.createElement(
          titleAs,
          { className: 'text-xl font-bold' },
          title,
        )}
      </Link>
      <div>{renderExcerpt(excerpt)}</div>
      <div className="text-sm font-bold">
        <Link href={url}>Read more</Link>
      </div>
    </article>
  )
}
