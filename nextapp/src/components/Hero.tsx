import { jsx } from '@emotion/react'
import { getFeaturedPost } from '@/featuredPostData'
import Link from 'next/link'

export function Hero() {
  const featuredPost = getFeaturedPost()
  const { title, excerpt: Excerpt, url } = featuredPost

  return (
    <div className="sm:flex">
      <div className="m-1">
        <h1>
          <span className="text-4xl p-1 sm:text-5xl sm:p-2">React For </span>
          <div className="flex items-end">
            <span className="font-extrabold text-6xl p-1 sm:text-8xl sm:p-2">
              Designers{' '}
            </span>
            <IconPointArrow className="relative -left-2" />
          </div>
          <span className="font-cursive transform -rotate-6 text-2xl opacity-80 p-3 absolute top-36 right-2 sm:right-1/4 sm:text-4xl md:right-1/3">
            and visual learners
          </span>
        </h1>

        <p className="p-3">
          Hand-picked resources on design and frontend development: React,
          Framer, HTML, CSS, JavaScript
        </p>
      </div>
      <article className="border-l-2 m-2 p-5 relative sm:top-36">
        <h2
          className="text-2xl font-bold text italic p-1 text-white"
          css={{
            textShadow:
              '-1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          }}
        >
          {title}
        </h2>
        <p className="p-1">
          {typeof Excerpt === 'string' ? Excerpt : <Excerpt />}
        </p>
        <div className="text-sm font-bold p-1">
          <Link href={url}>Read more</Link>
        </div>
      </article>
    </div>
  )
}
function IconPointArrow(props: any) {
  return (
    <svg
      width={22}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.433 15.295C9.214 10.4 11.65 7.507 13.111 2.043c1.929 6.399 3.664 8.518 7.214 11.276"
        stroke="#000"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  )
}
