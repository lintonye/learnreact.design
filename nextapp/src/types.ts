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
  related?: string[]
  translations?: { [key: string]: string }
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
  youtubeId?: string
  excerpt: string
  icon: React.ReactNode
  length: string
  url: string
  price?: {
    original: number
    current: number
    purchaseUrl: string
  }
  requirement: Requirement
  chapters?: any[]
  isNew?: boolean
}

export type Question = {
  id: string
  revealAnswerOnConfirm: boolean
  ask: React.ReactNode
  options: React.ReactNode[]
  answer: 'A' | 'B' | 'C' | 'D' | 'E'
  explanation: React.ReactNode
  lastAnswerTime?: Date
  reviewDueDate?: Date
}

export type Quiz = {
  startTime: number // in seconds. if negative, it's from the end of the video
  questions: Question[]
}
