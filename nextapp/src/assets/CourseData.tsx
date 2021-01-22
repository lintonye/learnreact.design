import React from 'react'
import { Requirement, Course } from '../types'
// import _ from 'lodash'
import {
  FramerXIcon,
  WebBasicsIcon,
  R101Icon,
  RN101Icon,
  ToggleIcon,
  PrototypingReactFramerIcon,
  SmileyIcon,
} from './CourseIcons'
import Chapters from './CourseChapters'

const ICONS = {
  prep: <WebBasicsIcon />,
  framerx: <FramerXIcon />,
  r101: <R101Icon />,
  rn101: <RN101Icon />,
  toggle: <ToggleIcon />,
  prototypingReactFramer: <PrototypingReactFramerIcon />,
  smiley: <SmileyIcon />,
}

const HOURS: { [key: string]: number } = {
  framerx: 4,
  r101: 3.5,
  rn101: 7.5,
  prototypingReactFramer: 13,
}

const LESSONS: { [key: string]: number } = {
  framerx: 27,
  r101: 31,
  rn101: 58,
  prototypingReactFramer: 130,
}

const makeLengthText = (hours: number, lessons: number) =>
  `${hours} hours, ${lessons} lessons`

const ALL_COURSES: Course[] = [
  {
    slug: 'web-basics',
    title: 'Web Basics',
    excerpt: 'HTML + CSS + JS',
    icon: ICONS.prep,
    length: '6-week email course',
    url: '/re4d-prerequisites',
    requirement: 'none',
  },
  {
    slug: 'react-framer',
    title: 'Prototyping With React + Framer',
    excerpt: 'Build 15+ real world prototypes',
    icon: ICONS.prototypingReactFramer,
    length: makeLengthText(
      HOURS.prototypingReactFramer,
      LESSONS.prototypingReactFramer,
    ),
    url: '/courses/react-framer',
    requirement: 'none',
    chapters: Chapters.framerx,
  },
  {
    slug: 'rmm',
    title: 'React Mental Models',
    excerpt: 'Think in React',
    icon: ICONS.r101,
    isNew: true,
    length: `In the making`, //makeLengthText(HOURS.r101, LESSONS.r101),
    url: '/courses/react-mental-models',
    requirement: 'js',
    chapters: Chapters.r101,
  },
  // {
  //   id: "toggle",
  //   name: "Framer UI Motion: Toggle",
  //   subtitle: "New Framer API, workflow, React",
  //   icon: ICONS.toggle,
  //   length: "2 hours, 12 lessons",
  //   detailLink: "/framer-ui-motion-toggle",
  //   originalPrice: 59,
  //   price: 39,
  //   requirement: "js",
  //   bundleable: true,
  // },
  {
    slug: 'smiley-in-motion',
    title: 'Smiley In Motion',
    excerpt:
      'A Framer Motion course on mental models, tips & tricks and common pitfalls',
    icon: ICONS.smiley,
    isNew: true,
    length: '2 hours, 24 lessons',
    url: 'https://smileyinmotion.com',
    requirement: 'react',
  },
  {
    slug: 'r101',
    title: 'React 101',
    excerpt: 'Build web UIs yourself!',
    icon: ICONS.r101,
    length: makeLengthText(HOURS.r101, LESSONS.r101),
    url: '/courses/react-101',
    requirement: 'js',
    chapters: Chapters.r101,
  },
  {
    slug: 'rn101',
    title: 'React Native 101',
    excerpt: 'Build mobile UIs yourself!',
    icon: ICONS.rn101,
    length: makeLengthText(HOURS.rn101, LESSONS.rn101),
    url: '/courses/react-native-101',
    requirement: 'react',
    chapters: Chapters.rn101,
  },
]

export function coursesByReq(reqId: string) {
  return ALL_COURSES.filter((c) => c.requirement === reqId)
}

export function getCourse(courseId: string) {
  const course = ALL_COURSES.find((c) => c.slug === courseId)
  if (!!!course) throw `Invalid courseId: ${courseId}`
  return course
}

export function getLecture(courseId: string, lectureId: string) {
  const course = getCourse(courseId)
  const chapters = course.chapters
  const [chId, lid] = lectureId.split('.')
  const chIdx = Number.parseInt(chId) - 1
  const lIdx = Number.parseInt(lid) - 1
  const chapter = chapters && chapters[chIdx]
  return chapter && chapter.lectures[lIdx]
}

export function getRequirement(courseIds: string[]) {
  const requirements = {
    none: { difficulty: 1, title: 'No coding experience required' },
    js: { difficulty: 1, title: 'Requires JavaScript knowledge' },
    react: { difficulty: 1, title: 'Requires JavaScript and React knowledge' },
  }
  const reqs = ALL_COURSES.filter((c) => courseIds.includes(c.slug))
    .map((c) => c.requirement)
    .sort((ra, rb) => {
      const da = requirements[ra].difficulty
      const db = requirements[rb].difficulty
      return da - db
    })
  return requirements[reqs[0]].title
}

// export function getPrice(courseIds:string[], licenses = 1) {
//   const courses = ALL_COURSES.filter((c) => courseIds.includes(c.id))
//   const original =
//     licenses * courses.reduce((h, c) => ORIGINAL_PRICES[c.id] + h, 0)
//   const bundleId = courseIds.sort().join('+')
//   const current = PRICES[bundleId][licenses.toString()]

//   const currentPrice = current.price
//   const discountPercentage = Math.floor(
//     ((original - currentPrice) / original) * 100,
//   )

//   const price = {
//     original,
//     current: currentPrice,
//     discountPercentage,
//     link: current.link,
//   }
//   return price
// }

// export function getLicensePrices(courseIds) {
//   return _.reduce(
//     TEAM_DISCOUNTS,
//     (priceOptions, discount, countStr) => {
//       const count = Number(countStr)
//       const price = getPrice(courseIds, count)
//       return [
//         ...priceOptions,
//         {
//           count,
//           price: price.current,
//           originalPrice: price.original,
//           discountPercentage: price.discountPercentage,
//         },
//       ]
//     },
//     [],
//   )
// }

export function getLength(courseIds: string[]) {
  const courses = ALL_COURSES.filter((c) => courseIds.includes(c.slug))
  const hours = courses.reduce((h, c) => HOURS[c.slug] + h, 0)
  const lessons = courses.reduce((h, c) => LESSONS[c.slug] + h, 0)
  return makeLengthText(hours, lessons)
}

// export function getUpsells(courseIds:string[], licenses = 1) {
//   if (courseIds.length === 0) return []
//   const bundles = [
//     ['framerx', 'r101'],
//     ['framerx', 'r101', 'rn101'],
//     ['r101', 'rn101'],
//   ]
//   const upsells = bundles
//     .map((b) => _.difference(b, courseIds))
//     .filter((b) => b.length > 0)

//   const upsellCourseIds = _.uniq(
//     upsells.reduce((u, result) => _.union(result, u), []),
//   )

//   return upsellCourseIds
//     .map((id) => ({
//       id,
//       discountPercentage: getPrice(_.union(courseIds, [id]), licenses)
//         .discountPercentage,
//     }))
//     .sort((a, b) => a.discountPercentage - b.discountPercentage)
// }

export function sanitizeCourseIds(courseIds: string[]) {
  const validCourseIds = ALL_COURSES.map((c) => c.slug)
  return courseIds.filter((cid) => validCourseIds.includes(cid))
}

// export function getBundles(activeCourseId) {
//   switch (activeCourseId) {
//     case 'framerx':
//       return [
//         { title: '🔥 1 Course', courseIds: ['framerx'] },
//         {
//           title: '🔥🔥 2 Courses',
//           courseIds: ['framerx', 'r101'],
//           highlight: true,
//         },
//         { title: '🔥 3 Courses', courseIds: ['framerx', 'r101', 'rn101'] },
//       ]
//     case 'r101':
//       return [
//         { title: '🔥 1 Course', courseIds: ['r101'] },
//         {
//           title: '🔥🔥 2 Courses',
//           courseIds: ['r101', 'rn101'],
//           highlight: true,
//         },
//         { title: '🔥 3 Courses', courseIds: ['framerx', 'r101', 'rn101'] },
//       ]
//     case 'rn101':
//       return [
//         { title: '🔥 1 Course', courseIds: ['rn101'] },
//         {
//           title: '🔥🔥 2 Courses',
//           courseIds: ['rn101', 'r101'],
//           highlight: true,
//         },
//         { title: '🔥 3 Courses', courseIds: ['framerx', 'r101', 'rn101'] },
//       ]
//   }
// }
