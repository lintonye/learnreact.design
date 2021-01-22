import { jsx } from '@emotion/core'
import React from 'react'
import { Link, Chip } from '@/components/design-system'
import { FunctionComponent } from 'react'
import { Post } from '../types'
import { formatISO } from 'date-fns'

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

export function PostPreview({
  url,
  title,
  excerpt,
  date,
  tags,
  titleAs = 'div',
}: Props) {
  const lastUpdated = formatISO(date, { representation: 'date' })
  return (
    <article className="space-y-2">
      {React.createElement(
        titleAs,
        { className: 'text-xl font-bold' },
        <Link href={url}>{title}</Link>,
      )}
      <div className="text-sm opacity-70 flex space-x-6 items-center">
        <div className="italic">
          Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
        </div>
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      <div>{renderExcerpt(excerpt)}</div>
      <div className="text-sm font-bold">
        <Link href={url}>Read more</Link>
      </div>
    </article>
  )
}
