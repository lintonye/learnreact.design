import React, { useState, useEffect } from 'react'
import { FiSmile } from 'react-icons/fi'

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

function useReactions(id: string): [ReactionCounts, AddReaction] {
  const reactions = {
    up1: 40,
    up2: 100,
    down1: 2,
  }
  const addReaction = (reaction: string) => {
    //TODO
  }
  return [reactions, addReaction]
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

export function Reactions({
  id,
  revealAfterReaction,
}: {
  id: string
  revealAfterReaction: React.ReactNode
}) {
  const [reactions, addReaction] = useReactions(id)
  const [menuVisible, setMenuVisible] = useState(false)
  const hasReactions = Object.keys(reactions).length > 0
  const [hover, setHover] = useState(false)
  const [reactionAdded, setReactionAdded] = useState(false)
  return (
    <>
      <div
        className="flex gap-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hasReactions && (
          <div className="space-x-3 flex">
            {Object.keys(reactions).map((reaction) => (
              <div key={reaction} className="space-x-2 flex items-center">
                <div>{reactionEmojis[reaction]}</div>
                <div className="text-tiny text-gray-600 inline-block">
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
                    className="select-none cursor-pointer px-4 py-2 rounded-sm hover:bg-gray-500 flex justify-center items-center"
                    onClick={() => {
                      addReaction(reaction)
                      setReactionAdded(true)
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
      {reactionAdded && revealAfterReaction}
    </>
  )
}
