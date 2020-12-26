import { jsx } from '@emotion/core'
import { highlightedPost } from '@/featuredPostData'
import Link from 'next/link'

export function Hero() {
  const { title, excerpt, categorySlug, slug } = highlightedPost
  return (
    <div className="justify-center md:flex sm:flex-column">
      <div className="m-1">
        <h1 className="text-5xl p-3">
          React For <h1 className="text-8xl font-extrabold">Designers</h1>
          <span className="font-cursive transform -rotate-6 text-4xl opacity-80 p-3 absolute top-36 md:right-1/3 sm:right-1/4 ">
            and visual learners
          </span>
        </h1>
        <p className="p-3">
          Hand-picked resources on design and frontend development: React,
          Framer, HTML, CSS, JavaScript{' '}
        </p>
      </div>
      <article className="border-l-2 m-2 p-5 relative left-26 md:top-32 sm:top-auto">
        <h2 className="text-2xl font-bold italic p-1">{title}</h2>
        <p className="p-1">{excerpt}</p>
        <div className="text-sm font-bold p-1">
          <Link href={`/${categorySlug}/${slug}`}>Read more</Link>
        </div>
      </article>
    </div>
  )
}
