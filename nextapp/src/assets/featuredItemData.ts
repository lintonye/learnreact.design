import getAllPostPreviews from '@/getAllPostPreviews'
import { Course, Post } from '@/types'
import { getCourse } from './CourseData'

type ItemAtHome = {
  type: 'post' | 'course'
  slug: string
  title?: string
  excerpt?: string
}

type Category = {
  categoryTitle: string
  categorySlug: string
  items: ItemAtHome[]
}

const featuredItem: ItemAtHome = {
  title: 'What is React?',
  type: 'post',
  slug: 'what-is-react',
  excerpt:
    'This is an interactive guide for complete beginners. The only prerequisite is some knowledge of HTML.',
}

const itemsAtHome: Category[] = [
  {
    categoryTitle: 'Latest',
    categorySlug: 'latest',
    items: [
      {
        type: 'post',
        slug: 'useref-by-example',
      },
    ],
  },
  {
    categoryTitle: 'React Tutorials',
    categorySlug: 'react',
    items: [
      {
        type: 'post',
        slug: 'react-mental-model-cut-holes-in-html-template',
      },
      {
        type: 'post',
        slug: 'react-mental-model-html-input',
      },
      {
        type: 'post',
        slug: 'react-mental-model-jsx',
      },
    ],
  },
  {
    categoryTitle: 'Design x React',
    categorySlug: 'design-react',
    items: [
      // {
      //   type: 'post',
      //   slug: 'what-is-react',
      // },
      {
        type: 'post',
        slug: 'harness-react-power',
      },
      {
        type: 'post',
        slug: 'react-for-designers-interviews',
      },
    ],
  },
  // {
  //   categoryTitle: 'Fundamentals',
  //   categorySlug: 'html-css-js',
  //   items: [
  //     {
  //       type: 'course',
  //       slug: 'web-basics',
  //     },
  //   ],
  // },

  {
    categoryTitle: 'Framer',
    categorySlug: 'framer',
    items: [
      {
        type: 'course',
        slug: 'react-framer',
      },
      {
        type: 'post',
        slug: 'busy-designers-guide-to-framer',
      },
      {
        type: 'post',
        slug: 'design-data-tables-part-1',
      },
      {
        type: 'post',
        slug: 'design-data-tables-part-2',
      },
    ],
  },
]

const allPostPreviews = getAllPostPreviews()

type HydratedItem = (Post | Course) & { type: 'post' | 'course' }

function hydrateItem(item: ItemAtHome): HydratedItem {
  switch (item.type) {
    case 'post':
      const postPreview = allPostPreviews.find((p) => p.slug === item.slug)
      return {
        // put default values to pass type check
        title: 'title',
        date: new Date(),
        excerpt: 'excerpt',
        url: 'url',
        tags: [],
        ...postPreview,
        ...item,
      }
    case 'course':
      const course = getCourse(item.slug)
      return { ...course, ...item }
  }
}

export function getItemsAtHome() {
  return itemsAtHome.map((cat) => ({
    ...cat,
    items: cat.items.map(hydrateItem),
  }))
}

export function getFeaturedItem() {
  return hydrateItem(featuredItem)
}
