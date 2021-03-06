import { jsx, css } from '@emotion/core'
import React from 'react'
import { Link, Chip } from '@/components/design-system'
import { FunctionComponent } from 'react'
import { Post } from '../types'
import { formatISO } from 'date-fns'
import { SurpriseReveal } from '@/components/SurpriseReveal'
import Image from 'next/image'

function renderExcerpt(excerpt: string | FunctionComponent) {
  if (typeof excerpt === 'string') {
    return <p>{excerpt}</p>
  } else {
    const ExcerptComponent = excerpt
    return <ExcerptComponent />
  }
}

type Props = {
  titleAs?: 'h1' | 'h2' | 'h3' | 'div' | React.FunctionComponent
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
            alt="Post preview image"
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
      <article className="space-y-5 ">
        {React.createElement(
          titleAs,
          // @ts-ignore Custom component is supported
          { className: 'text-xl font-bold -mb-3' },
          <Link href={url}>{title}</Link>,
        )}
        <div
          className="text-sm opacity-70 grid items-center gap-x-4"
          css={css`
            grid-template-columns: repeat(auto-fit, minmax(50px, max-content));
          `}
        >
          <div className="italic flex-shrink-0 whitespace-nowrap">
            Updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </div>
          {showTags && tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}
        </div>
        {renderExcerpt(excerpt)}
        <div className="text-sm font-bold">
          <Link href={url}>Read more</Link>
        </div>
      </article>
    </SurpriseReveal>
  )
}
