import React from 'react'
import { Link } from '@/components/design-system'
import { SurpriseReveal } from './SurpriseReveal'
import { Course } from '@/types'

type Props = {
  titleAs: 'div' | 'h2' | 'h3' | 'h4'
  excerptAs: 'div' | 'h2' | 'h3' | 'h4'
} & Course

export function CoursePreview({
  titleAs = 'div',
  excerptAs = 'div',
  title: name,
  excerpt: subtitle,
  icon,
  length,
  url: detailLink,
  isNew,
}: Props) {
  return (
    <SurpriseReveal surprise={icon}>
      <div className="space-y-5">
        <div className="space-x-2 flex items-center">
          {React.createElement(
            titleAs,
            { className: 'text-lg font-bold inline-block' },
            <Link href={detailLink}>{name}</Link>,
          )}
          <div className="text-tiny inline-block border border-gray-800 px-1 uppercase opacity-90">
            course
          </div>
        </div>

        {React.createElement(excerptAs, {}, subtitle)}
        <div className="text-sm">{length}</div>
      </div>
    </SurpriseReveal>
  )
}
