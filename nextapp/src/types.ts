export type Post = {
  title: string
  excerpt: React.FunctionComponent | string
  slug: string
  categorySlug: string
}

export type Category = {
  title: string
  categorySlug: string
  description: string
}
