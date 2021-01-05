export type Post = {
  title: string
  excerpt: React.FunctionComponent | string
  slug: string
  url: string
  tags: string[]
}

export type Category = {
  title: string
  categorySlug: string
  description: string
}
