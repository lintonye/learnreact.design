import React from 'react'
import { Link } from '@/components/design-system'
import { SurpriseReveal } from './SurpriseReveal'
import { Course } from '@/types'

type Props = {
  nameAs?: 'div' | 'h2' | 'h3' | 'h4'
  subtitleAs?: 'div' | 'h2' | 'h3' | 'h4'
} & Course

export function CoursePreview({
  nameAs = 'div',
  subtitleAs = 'div',
  title: name,
  excerpt: subtitle,
  icon,
  length,
  url: detailLink,
  isNew,
}: Props) {
  return (
    <SurpriseReveal surprise={icon}>
      <div className="space-y-4">
        <div className="space-x-2 flex items-center">
          {React.createElement(
            nameAs,
            { className: 'text-lg font-bold inline-block' },
            <Link href={detailLink}>{name}</Link>,
          )}
          <div className="text-tiny inline-block border border-gray-800 px-1 uppercase opacity-90">
            course
          </div>
        </div>

        {React.createElement(subtitleAs, {}, subtitle)}
        <div className="text-sm">{length}</div>
      </div>
    </SurpriseReveal>
  )
}
