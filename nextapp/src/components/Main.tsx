import { jsx } from '@emotion/core'
import { getItemsAtHome } from '../assets/featuredItemData'
import { PostPreview } from './PostPreview'
import { CoursePreview } from './CoursePreview'

export function Main() {
  const postData = getItemsAtHome()
  return (
    <div>
      <div className="space-y-16">
        {postData.map(({ categoryTitle, categorySlug, items }) => (
          <section key={categorySlug} className="space-y-8">
            <h2 className="font-thin text-4xl">{categoryTitle}</h2>
            {items.map((item) =>
              item.type === 'post' ? (
                <PostPreview
                  titleAs="h3"
                  showTags={false}
                  key={item.slug}
                  {...item}
                />
              ) : (
                <CoursePreview nameAs="h3" key={item.slug} {...item} />
              ),
            )}
          </section>
        ))}
      </div>
      <div>Sidebar</div>
    </div>
  )
}
