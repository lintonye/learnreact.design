import { jsx } from '@emotion/core'
import React from 'react'
import { Link, Chip } from '@/components/design-system'
import { FunctionComponent } from 'react'
import { Post } from '../types'
import { formatISO } from 'date-fns'
import { SurpriseReveal } from '@/components/SurpriseReveal'
import Image from 'next/image'

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
  showTags?: boolean
} & Post

export function PostPreview({
  url,
  title,
  excerpt,
  date,
  surprise,
  tags,
  titleAs = 'div',
  showTags = true,
}: Props) {
  const lastUpdated = formatISO(date, { representation: 'date' })
  return (
    <SurpriseReveal
      surprise={
        surprise &&
        (typeof surprise.actor === 'string' ? (
          <Image
            src={surprise.actor}
            width={100}
            height={100}
            layout="intrinsic"
          />
        ) : (
          surprise.actor
        ))
      }
      animationVariants={surprise?.animationVariants}
    >
      <article className="space-y-2">
        {React.createElement(
          titleAs,
          { className: 'text-xl font-bold' },
          <Link href={url}>{title}</Link>,
        )}
        <div className="text-sm opacity-70 flex space-x-6 items-center">
          <div className="italic">
            Updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </div>
          {showTags && tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
        </div>
        <div>{renderExcerpt(excerpt)}</div>
        <div className="text-sm font-bold">
          <Link href={url}>Read more</Link>
        </div>
      </article>
    </SurpriseReveal>
  )
}
