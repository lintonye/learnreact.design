import { jsx } from '@emotion/core'
import { getFeaturedItem } from '@/assets/featuredItemData'
import { Link } from '@/components/design-system'
import { PostPreview } from './PostPreview'

export function Hero() {
  const featuredPost = getFeaturedItem()

  return (
    <div className="my-12 lg:flex">
      <div className="m-1 relative">
        <h1>
          <span className="text-4xl p-1 sm:text-5xl sm:p-2">React For </span>
          <div className="flex items-end relative">
            <span className="font-extrabold text-6xl p-1 sm:text-8xl sm:p-2">
              Designers{' '}
            </span>
            <IconPointArrow className="relative flex-shrink-0 -left-2" />
          </div>
          <span className="font-cursive transform -rotate-6 text-2xl opacity-80 p-3 absolute top-2 whitespace-nowrap left-1/2 sm:text-4xl sm:right-6 md:left-2/3">
            and visual learners
          </span>
        </h1>

        <p className="p-3">
          Tutorials and courses on design and frontend development: React,
          Framer, HTML, CSS, JavaScript
        </p>
      </div>
      <div className="self-end m-2 mt-8 lg:mt-40">
        {/* @ts-ignore */}
        <PostPreview
          showTags={false}
          titleAs={(props: any) => (
            <h2
              {...props}
              className="text-2xl font-bold text italic p-1 text-white -mb-3"
              css={{
                textShadow:
                  '-1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              }}
            />
          )}
          {...featuredPost}
        />
      </div>
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
      viewBox="0 0 22 17"
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
