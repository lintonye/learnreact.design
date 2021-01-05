import { jsx } from '@emotion/core'
import React from 'react'
import { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { Tag, Post } from '../types'
import { PostPreview } from './PostPreview'
import getAllPostPreviews from '@/getAllPostPreviews'

type Props = {
  tag: Tag
  posts: Post[]
}

export const PostList: FunctionComponent<Props> = ({ tag, posts }) => {
  const { title, description, tagSlug: tagSlug } = tag
  const url = `/${tagSlug}`
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
          // images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
      />
      <div className="prose md:prose-xl max-w-screen-md mt-0 mx-auto leading-6">
        {title && <h1 className="text-xl leading-tight">{title}</h1>}
        {posts.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </>
  )
}

export function filterPosts(posts: Post[], tagSlug: string) {
  return posts.filter((p) => p.tags.includes(tagSlug))
}

export function createTagPostList(meta: Tag) {
  const posts = filterPosts(getAllPostPreviews(), meta.tagSlug)
  return function PostListWithMeta() {
    return <PostList tag={meta} posts={posts} />
  }
}
