import { jsx } from '@emotion/core'
import { highlightedPost } from '@/featuredPostData'
import Link from 'next/link'

export function Hero() {
  const { title, excerpt, categorySlug, slug } = highlightedPost
  return (
    <div className="flex">
      <div className="m-1">
        <h1 className="text-5xl p-3">
          React For <h1 className="text-8xl font-extrabold">Designers</h1>
          <span className="font-cursive transform -rotate-6  absolute right-1/3 top-36 text-4xl p-3">
            and visual learners
          </span>
        </h1>
        <p className="p-3">
          Hand-picked resources on design and frontend development: React,
          Framer, HTML, CSS, JavaScript{' '}
        </p>
      </div>
      <article className="border-l-2 m-5 p-5 relative left-26 top-32">
        <h2 className="text-2xl font-semibold italic p-1">{title}</h2>
        <p className="p-1">{excerpt}</p>
        <Link href={`/${categorySlug}/${slug}`}>Read more</Link>
      </article>
    </div>
  )
}
