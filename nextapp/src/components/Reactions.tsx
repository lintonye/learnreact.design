import React, { useState, useEffect } from 'react'
import { FiSmile } from 'react-icons/fi'
import produce from 'immer'

const reactionEmojis: { [key: string]: string } = {
  up1: '👍',
  up2: '😍',
  up3: '🤯',
  down1: '👎',
  down2: '🧐',
  down3: '😕',
}

type ReactionCounts = {
  [key: string]: number
}

type AddReaction = (reaction: string) => void

type ReactionOps = {
  reactions: ReactionCounts
  myReactions: string[]
  addReaction: AddReaction
  removeReaction: (reaction: string) => void
}

function useReactions(id: string): ReactionOps {
  const [myReactions, setMyReactions] = useState<string[]>([])
  const [reactions, setReactions] = useState({
    up1: 40,
    up2: 100,
    down1: 2,
  })
  const addReaction = (reaction: string) => {
    //TODO
    setMyReactions([...myReactions, reaction])
    setReactions(
      produce((rs) => {
        if (typeof rs[reaction] !== 'number') {
          rs[reaction] = 1
        } else {
          rs[reaction] += 1
        }
      }),
    )
  }
  const removeReaction = (reaction: string) => {
    setMyReactions(
      produce((rs: string[]) => {
        const idx = rs.indexOf(reaction)
        rs.splice(idx, 1)
      }),
    )
    setReactions(
      produce((rs) => {
        if (typeof rs[reaction] === 'number') {
          rs[reaction] -= 1
        }
      }),
    )
  }
  return { reactions, myReactions, addReaction, removeReaction }
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
  const { reactions, myReactions, addReaction, removeReaction } = useReactions(
    id,
  )
  const [menuVisible, setMenuVisible] = useState(false)
  const hasReactions = Object.keys(reactions).length > 0
  const [hover, setHover] = useState(false)

  return (
    <>
      <div
        className="flex gap-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hasReactions && (
          <div className="space-x-0 flex select-none">
            {Object.keys(reactions)
              .sort(reactionComparator)
              .map((reaction) => (
                <div
                  key={reaction}
                  className={`space-x-1 rounded-sm flex items-center -ml-2 px-2 py-0 cursor-pointer ${
                    myReactions.includes(reaction)
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'text-yellow-800 '
                  }`}
                  onClick={() => {
                    if (myReactions.includes(reaction)) {
                      removeReaction(reaction)
                    } else {
                      addReaction(reaction)
                    }
                  }}
                >
                  <div>{reactionEmojis[reaction]}</div>
                  <div className="text-tiny inline-block">
                    {reactions[reaction]}
                  </div>
                </div>
              ))}
          </div>
        )}
        {(!hasReactions || hover) && (
          <div className="relative flex-shrink-0">
            {/* Menu */}
            {menuVisible && (
              <PopOver onClose={() => setMenuVisible(false)}>
                <div className="text-center col-span-3 text-sm border-b border-gray-300 pb-2 text-gray-700">
                  Pick your reaction
                </div>
                {Object.keys(reactionEmojis).map((reaction) => (
                  <div
                    key={reaction}
                    className="select-none cursor-pointer px-4 py-2 rounded-sm hover:bg-gray-300 flex justify-center items-center"
                    onClick={() => {
                      addReaction(reaction)
                      // setMenuVisible(false)
                    }}
                  >
                    {reactionEmojis[reaction]}
                  </div>
                ))}
              </PopOver>
            )}
            <button
              className="text-blue-700"
              onClick={() => {
                setMenuVisible(true)
              }}
            >
              <FiSmile />
            </button>
          </div>
        )}
      </div>
      {myReactions.length > 0 && revealAfterReaction}
    </>
  )
}
