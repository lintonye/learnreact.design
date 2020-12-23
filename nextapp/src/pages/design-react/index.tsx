import { jsx } from '@emotion/core'
import { PostList, filterPosts } from '@/components/PostList'
import getAllPostPreviews from '@/getAllPostPreviews'

export const meta = {
  categorySlug: 'design-react',
  title: 'Design X React',
  description: 'All posts related to the use of React in design',
}

const posts = filterPosts(getAllPostPreviews(), meta.categorySlug)

export default function DesignReactPostList() {
  return <PostList category={meta} posts={posts} />
}
