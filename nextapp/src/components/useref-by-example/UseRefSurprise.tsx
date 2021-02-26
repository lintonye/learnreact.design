import { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import { FiHeart } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

function random(min: number, max: number) {
  return Math.floor((max - min) * Math.random()) + min
}

export function UseRefSurprise({ autoPlay = false }: { autoPlay: boolean }) {
  const [likes, setLikes] = useState(0)
  const [mode, setMode] = useState('default')
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setLikes((l) => l + 1)
      }, 120)
      return () => clearInterval(interval)
    }
  }, [autoPlay])
  return (
    <div className="relative">
      <motion.button
        className="flex space-x-4 items-center select-none focus:outline-none relative z-10"
        onHoverStart={() => setMode('hovered')}
        onHoverEnd={() => setMode('default')}
        animate={mode}
      >
        <motion.div
          variants={{ default: { rotate: 0 }, hovered: { rotate: 10 } }}
          className={`text-pink-500 hover:text-pink-700`}
        >
          <FiHeart fill={'rgba(236,72,153)'} size={40} strokeWidth={1} />
        </motion.div>
      </motion.button>

      {/* Floating hearts when pressed */}
      <AnimatePresence>
        <motion.div
          className="absolute pointer-events-none z-0 left-0 top-0 m-0"
          key={likes}
          initial={{ x: 0, y: 0 }}
          animate={mode}
          variants={{ default: { rotate: 0 }, hovered: { rotate: 10 } }}
          exit={{
            y: -random(60, 120),
            x: random(0, 120),
            scale: 0.5,
            opacity: 0,
            transition: { type: 'spring', damping: 7 },
          }}
        >
          <FiHeart
            fill={'rgba(236,72,153)'}
            size={40}
            className={`text-pink-500`}
            strokeWidth={1}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
