import getAllPostPreviews from '@/getAllPostPreviews'
import { Post } from '@/types'

type PostAtHome = {
  slug: string
  title?: string
  excerpt?: string
}

type Category = {
  categoryTitle: string
  categorySlug: string
  posts: PostAtHome[]
}

const featuredPost = {
  title: 'What is React?',
  slug: 'what-is-react',
}

const postDataAtHome: Category[] = [
  {
    categoryTitle: 'Design ╳ React',
    categorySlug: 'design-react',
    posts: [
      {
        slug: 'what-is-react',
      },
      {
        slug: 'harness-react-power',
      },
    ],
  },
  {
    categoryTitle: 'Fundamentals: HTML/CSS/JavaScript',
    categorySlug: 'html-css-js',
    posts: [
      {
        title: 'What is React?',
        excerpt: 'React concepts explained in plain English and doodles',
        slug: 'what-is-react',
      },
    ],
  },
  {
    categoryTitle: 'React',
    categorySlug: 'react',
    posts: [
      {
        title: 'What is React?',
        excerpt: 'React concepts explained in plain English and doodles',
        slug: 'what-is-react',
      },
    ],
  },
  {
    categoryTitle: 'Framer',
    categorySlug: 'framer',
    posts: [
      {
        title: 'What is React?',
        excerpt: 'React concepts explained in plain English and doodles',
        slug: 'what-is-react',
      },
    ],
  },
]

const allPostPreviews = getAllPostPreviews()

function hydratePost(post: PostAtHome): Post {
  const postPreview = allPostPreviews.find((p) => p.slug === post.slug)
  return {
    title: 'title',
    date: new Date(),
    excerpt: 'excerpt',
    url: 'url',
    tags: [],
    ...postPreview,
    ...post,
  }
}

export function getPostDataAtHome() {
  return postDataAtHome.map((cat) => ({
    ...cat,
    posts: cat.posts.map(hydratePost),
  }))
}

export function getFeaturedPost() {
  return hydratePost(featuredPost)
}
