import React, { useState, useEffect } from 'react'
import { FiSmile } from 'react-icons/fi'
import produce from 'immer'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserId } from './useUserId'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { useFirestore } from '@/lib/firebase'
import firebase from 'firebase/app'

const reactionEmojis: { [key: string]: string } = {
  up1: '👍',
  // up2: '😍',
  // up3: '🤯',
  down1: '👎',
  // down2: '🧐',
  // down3: '😕',
}

type ReactionCounts = {
  [key: string]: number
}

type AddReaction = (reaction: string) => void

type ReactionOps = {
  reactions: ReactionCounts
  myReaction: string | null
  setReaction: (reaction: string | null) => void
}

function useReactions(id: string): ReactionOps {
  const [myReaction, setMyReaction] = useLocalStorage(`reaction-${id}`, null)

  const [reactions, setReactions] = useState({
    // up1: 40,
    // up2: 100,
    // down1: 2,
  })
  const firestore = useFirestore()
  const collectionName = 'reactions'
  useEffect(() => {
    const collection = firestore.collection(collectionName)
    const doc = collection.doc(id)
    const sub = doc.onSnapshot((snapshot) => {
      setReactions(snapshot.data()?.counts || {})
    })
    return sub
  }, [id])
  const setReaction = async (reaction: string | null) => {
    const oldReaction = myReaction
    const collection = firestore.collection(collectionName)
    const doc = collection.doc(id)
    const countDelta = (prefix = '') => ({
      ...(oldReaction !== null
        ? {
            [`${prefix}${oldReaction}`]: firebase.firestore.FieldValue.increment(
              -1,
            ),
          }
        : {}),
      ...(reaction !== null
        ? {
            [`${prefix}${reaction}`]: firebase.firestore.FieldValue.increment(
              1,
            ),
          }
        : {}),
    })
    // console.log('setReaction', { oldReaction, reaction, delta: countDelta })
    try {
      if ((await doc.get()).exists) {
        await doc.update({
          id,
          updated: firebase.firestore.FieldValue.serverTimestamp(),
          ...countDelta('counts.'),
        })
      } else {
        await doc.set({
          id,
          updated: firebase.firestore.FieldValue.serverTimestamp(),
          counts: countDelta(),
        })
      }
      setMyReaction(reaction)
    } catch (e) {
      console.error(e)
    }
  }

  return { reactions, myReaction, setReaction }
}

function PopOver({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) {
  useEffect(() => {
    const listener = () => {
      typeof onClose === 'function' && onClose()
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [])
  return (
    <div className="absolute p-2 border border-gray-300 rounded-md grid grid-cols-3 gap-x-1 gap-y-1 bottom-7 bg-gray-50 shadow-lg w-48">
      {children}
    </div>
  )
}

const reactionComparator = (r1: string, r2: string) => {
  const pattern = /((up)|(down))(\d+)/
  const m1 = r1.match(pattern)
  const m2 = r2.match(pattern)
  if (m1 && m2) {
    if (m1[1] === 'up' && m2[1] === 'down') return -1
    else if (m1[1] === 'down' && m2[1] === 'up') return 1
    else {
      return Number.parseInt(m1[4]) - Number.parseInt(m2[4])
    }
  } else return 0
}

export function Reactions({
  id,
  revealAfterReaction,
}: {
  id: string
  revealAfterReaction: React.ReactNode
}) {
  const { reactions, myReaction, setReaction } = useReactions(id)

  return (
    <>
      <div className="space-x-0 flex select-none">
        {Object.keys(reactionEmojis)
          .sort(reactionComparator)
          .map((reaction) => (
            <div
              key={reaction}
              className={`space-x-1 text-yellow-800 relative overflow-hidden rounded-sm flex items-center -ml-2 px-2 py-0 cursor-pointer ${
                myReaction === reaction ? 'bg-yellow-200' : ''
              }`}
              onClick={() => {
                setReaction(myReaction === reaction ? null : reaction)
              }}
            >
              <div className="mr-6">{reactionEmojis[reaction]}</div>
              <AnimatePresence>
                {myReaction && (
                  <motion.div
                    key={reactions[reaction] || 0}
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    className="text-tiny inline-block absolute left-7"
                  >
                    {reactions[reaction] || 0}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
      {myReaction && revealAfterReaction}
    </>
  )
}
