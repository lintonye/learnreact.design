import React, { useState, useEffect } from 'react'
import { FiSmile } from 'react-icons/fi'
import produce from 'immer'
import { motion, AnimatePresence } from 'framer-motion'

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

const updateCounts = (
  counts: ReactionCounts,
  oldReaction: string | null,
  reaction: string | null,
) => {
  if (oldReaction && typeof counts[oldReaction] === 'number')
    counts[oldReaction]--
  if (reaction) {
    if (typeof counts[reaction] !== 'number') counts[reaction] = 0
    counts[reaction]++
  }
}

function useReactions(id: string): ReactionOps {
  const [myReaction, setMyReaction] = useState<string | null>(null)
  const [reactions, setReactions] = useState({
    // up1: 40,
    // up2: 100,
    // down1: 2,
  })
  const setReaction = (reaction: string | null) => {
    //TODO
    setMyReaction(reaction)
    setReactions(
      produce((rs) => {
        updateCounts(rs, myReaction, reaction)
      }),
    )
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
              className={`space-x-1 relative overflow-hidden rounded-sm flex items-center -ml-2 px-2 py-0 cursor-pointer ${
                myReaction == reaction
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'text-yellow-800 '
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
