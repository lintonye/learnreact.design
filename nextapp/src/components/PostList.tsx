import React, { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import { Category, Post } from '../types'
import { PostPreview } from './PostPreview'

type Props = {
  category: Category
  posts: Post[]
}

export const PostList: FunctionComponent<Props> = ({ category, posts }) => {
  const { title, description, categorySlug } = category
  const url = `/${categorySlug}`
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

export function filterPosts(posts: Post[], categorySlug: string) {
  return posts.filter((p) => p.categorySlug === categorySlug)
}
