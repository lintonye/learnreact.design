import { jsx } from '@emotion/core'
import { highlightedPost } from '@/featuredPostData'
import Link from 'next/link'

export function Hero() {
  const { title, excerpt, categorySlug, slug } = highlightedPost
  return (
    <div className="flex-column md:flex">
      <div className="m-1">
        <h1 className="text-4xl p-2 sm:text-5xl sm:p-3">
          React For{' '}
          <h1 className="font-extrabold text-7xl sm:text-8xl">Designers</h1>
          <span className="font-cursive transform -rotate-6 text-2xl opacity-80 p-3 absolute top-32 right-12 sm:right-1/4 sm:text-4xl sm:top-36 md:right-1/3">
            and visual learners
          </span>
        </h1>
        <p className="p-3">
          Hand-picked resources on design and frontend development: React,
          Framer, HTML, CSS, JavaScript{' '}
        </p>
      </div>
      <article className="border-l-2 m-2 p-5 relative left-26 sm:top-0 md:top-32">
        <h2
          className="text-2xl font-bold text italic p-1 text-white"
          css={{
            textShadow:
              '-1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          }}
        >
          {title}
        </h2>
        <p className="p-1">{excerpt}</p>
        <div className="text-sm font-bold p-1">
          <Link href={`/${categorySlug}/${slug}`}>Read more</Link>
        </div>
      </article>
    </div>
  )
}
