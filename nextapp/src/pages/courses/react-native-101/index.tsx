import React from 'react'
import { getCourse } from '@/assets/CourseData'
import { OldCoursePage } from '../../../components/OldCoursePage'

export default function ReactNative101Page() {
  return (
    <OldCoursePage
      course={getCourse('react-native-101')}
      convertkitFormId="405368"
    />
  )
}
