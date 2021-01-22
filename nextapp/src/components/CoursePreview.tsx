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
  name,
  subtitle,
  icon,
  length,
  detailLink,
  isNew,
}: Props) {
  return (
    <SurpriseReveal surprise={icon}>
      {React.createElement(
        nameAs,
        { className: 'text-lg font-bold' },
        <Link href={detailLink}>{name}</Link>,
      )}

      {React.createElement(subtitleAs, {}, subtitle)}
      <div className="text-sm">{length}</div>
    </SurpriseReveal>
  )
}
