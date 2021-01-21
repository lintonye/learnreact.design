export type Post = {
  title: string
  date: Date
  excerpt: React.FunctionComponent | string
  slug: string
  url: string
  tags: string[]
}

export type Tag = {
  title: string
  tagSlug: string
  description: string
}

export type JsxParentNode = {
  type: string
  attrs?: { [name: string]: string }
  children?: JsxNode[]
}

export type JsxNode = JsxParentNode | string
