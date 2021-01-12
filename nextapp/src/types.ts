export type Post = {
  title: string
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

export type JsxNode =
  | {
      type: string
      attrs?: { [name: string]: string }
      children?: JsxNode[]
    }
  | string
