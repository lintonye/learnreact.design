import * as React from 'react'
import { useState, useEffect } from 'react'
import { useFirestore } from '@/lib/firebase'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/components/design-system'
import { useLocalStorage } from '@/lib/useLocalStorage'

// TODO
// function condenseEvents(events) {
//   return events
// }

function getFirstName(name: string) {
  return name.split(' ')[0]
}

function getReadableTime(time: number) {
  const then = new Date(time).getTime()
  const now = new Date().getTime()
  const diff = now - then
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(seconds / 3600)
  const days = Math.floor(hours / 24)
  const units = ['days', 'hours', 'minutes', 'seconds']
  const values = [days, hours, minutes, seconds]
  for (let i = 0; i < values.length; i++) {
    const v = values[i]
    if (v > 0) return `${v} ${units[i]} ago`
  }
  return `just now`
}

function processEvents(events: Event[]) {
  return events.map((e) => ({
    ...e,
    name: getFirstName(e.name),
    link: '/courses/react-framer?ref=events', //TODO it's this link for everything
    time: getReadableTime(e.created),
  }))
}

function Notification({ avatar, names, verb, courseLecture, link, time }: any) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        cursor: 'pointer',
      }}
    >
      <Link href={link}>
        <img
          src={avatar}
          style={{ float: 'left', marginRight: 8, borderRadius: '50%' }}
        />
        <div>
          <strong>{names}</strong> {verb} {courseLecture}
        </div>
        <div style={{ color: '#999' }}>
          <small>{time}</small>
        </div>
      </Link>
    </motion.div>
  )
}

function Notifications({ events }: { events: Event[] }) {
  const verbs = {
    'LectureProgress.created': 'completed',
    'Enrollment.completed': 'completed',
    'Enrollment.created': 'enrolled in',
  }
  const processed = processEvents(events)
  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20 }}>
      <AnimatePresence>
        {processed.map((e) => (
          <Notification
            key={e.id}
            avatar={e.avatar}
            names={e.name}
            // @ts-ignore
            verb={verbs[e.type]}
            courseLecture={e.lecture || e.course}
            link={e.link}
            time={e.time}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

function useShownEvents() {
  const [shownEvents, setShownEvents] = useLocalStorage<string[]>(
    'ShownEvents',
    [],
  )
  return [
    shownEvents,
    (eventId: string) => {
      if (!shownEvents.includes(eventId)) {
        // forget shownEvents if there are too many
        setShownEvents([eventId, ...shownEvents].slice(0, 10))
      }
    },
  ]
}

type Event = {
  id: string
  type: string
  name: string
  avatar: string
  created: number
  course: string
  lecture: string
}

export function CourseEvents() {
  const firestore = useFirestore()
  const [events, setEvents] = useState<Event[]>([])
  const [shownEvents, addShownEvent] = useShownEvents()
  useEffect(() => {
    const eventsRef = firestore.collection('teachableEvents')
    const unsubscribe = eventsRef
      // .where("created", ">=", new Date())
      // .select(
      //   "id",
      //   "created",
      //   "user.name",
      //   "user.avatar",
      //   "course",
      //   "lecture"
      // )
      .orderBy('created', 'desc')
      .limit(2)
      .onSnapshot((snapshot) => {
        const formattedEvents = snapshot.docs
          .map((d) => ({
            id: d.id,
            type: d.get('type'),
            name: d.get('user.name'),
            avatar: d.get('user.avatar'),
            created: d.get('created'),
            course: d.get('course.name'),
            lecture: d.get('lecture.name'),
          }))
          .filter((e) => !shownEvents.includes(e.id))
          .slice(0, 1) // only show the first one
        setEvents(formattedEvents)
        formattedEvents.forEach((e) => addShownEvent(e.id))
      })
    return unsubscribe
  }, [firestore, setEvents])
  useEffect(() => {
    events.length > 0 &&
      setTimeout(() => {
        setEvents([])
      }, 10000)
  }, [events, setEvents])
  return <Notifications events={events} />
}
