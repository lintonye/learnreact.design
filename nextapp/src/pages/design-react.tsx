import { jsx } from '@emotion/react'
import React from 'react'
import { PostList, filterPosts } from '@/components/PostList'
import getAllPostPreviews from '@/getAllPostPreviews'

import { createTagPostList } from '@/components/PostList'

const DesignReactPostList = createTagPostList({
  tagSlug: 'design-react',
  title: 'Design X React',
  description: 'All posts related to the use of React in design',
})
export default DesignReactPostList
