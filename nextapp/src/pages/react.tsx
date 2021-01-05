import { jsx } from '@emotion/core'
import React from 'react'
import { PostList, filterPosts } from '@/components/PostList'
import getAllPostPreviews from '@/getAllPostPreviews'

export const meta = {
  categorySlug: 'react',
  title: 'React',
  description: 'All posts related to React',
}

const posts = filterPosts(getAllPostPreviews(), meta.categorySlug)

export default function DesignReactPostList() {
  return <PostList category={meta} posts={posts} />
}
