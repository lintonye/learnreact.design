import { Variants } from 'framer-motion'

export type Post = {
  title: string
  date: Date
  excerpt: React.FunctionComponent | string
  surprise?: {
    actor: string | React.ReactNode
    animationVariants: Variants
  }
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

export type Requirement = 'none' | 'js' | 'react'

export type Course = {
  slug: string
  title: string
  excerpt: string
  icon: React.ReactNode
  length: string
  url: string
  requirement: Requirement
  chapters?: any[]
  isNew?: boolean
}
