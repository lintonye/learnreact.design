export type Post = {
  title: string
  excerpt: React.FunctionComponent
  slug: string
  categorySlug: string
}

export type Category = {
  title: string
  categorySlug: string
  description: string
}
