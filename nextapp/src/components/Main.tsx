import { jsx } from '@emotion/core'
import { getItemsAtHome } from '../assets/featuredItemData'
import { PostPreview } from './PostPreview'
import { CoursePreview } from './CoursePreview'
import { Course, Post } from '@/types'

export function Main() {
  const postData = getItemsAtHome()
  return (
    <div>
      <div className="space-y-16">
        {postData.map(({ categoryTitle, categorySlug, items }) => (
          <section key={categorySlug} className="space-y-8">
            <h2 className="font-thin text-4xl">{categoryTitle}</h2>
            {items.map((item) => {
              switch (item.type) {
                case 'post':
                  // @ts-ignore
                  const post: Post = item
                  return (
                    <PostPreview
                      titleAs="h3"
                      showTags={false}
                      key={item.slug}
                      {...post}
                    />
                  )
                case 'course':
                  // @ts-ignore
                  const course: Course = item
                  return (
                    // @ts-ignore
                    <CoursePreview titleAs="h3" key={item.slug} {...course} />
                  )
              }
            })}
          </section>
        ))}
      </div>
      {/* <div>Sidebar</div> */}
    </div>
  )
}
