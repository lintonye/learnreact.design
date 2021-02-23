import { useFirestore } from '@/lib/firebase'
import { useCallback, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useRef } from 'react'
import { FiHeart } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

type ValueOrFunc<T> = T | ((preValue: T) => T)

type DebouncedStateSetter<T> = (
  valueOrFun: ValueOrFunc<T>,
  flush?: boolean,
) => void

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay || 500])
  return debouncedValue
}

// [immediateValue, valueBeforeDebounce, valueAfterDebounce, setValue2]
function useDebouncedState<T>(
  initialValue: T,
  delay = 500,
): [T, T, T, DebouncedStateSetter<T>] {
  const [value, setValue] = useState<T>(initialValue)
  const valueBeforeDebounceRef = useRef<T>(value)
  const valueAfterDebounce = useDebounce<T>(value, delay)
  useEffect(() => {
    valueBeforeDebounceRef.current = valueAfterDebounce
  }, [valueAfterDebounce])
  const setValue2 = useCallback(
    (valueOrFunc: ValueOrFunc<T>, flush = false) => {
      if (typeof valueOrFunc === 'function') {
        setValue((v) => {
          // @ts-ignore TODO: why it reports error even inside typeof conditional?
          const newV = valueOrFunc(v)
          if (flush) valueBeforeDebounceRef.current = newV
          return newV
        })
      } else {
        setValue(valueOrFunc)
        if (flush) valueBeforeDebounceRef.current = valueOrFunc
      }
    },
    [setValue, valueBeforeDebounceRef],
  )
  return [value, valueBeforeDebounceRef.current, valueAfterDebounce, setValue2]
}

function usePressHoldRepeat(
  callback: () => void,
  holdDetectionThreshold = 300,
  repeatDelay = 100,
) {
  const [mouseDown, setMouseDown] = useState(false)
  const intervalRef = useRef(0)
  const holdDetectionTimeoutRef = useRef(0)
  const runCallback = useCallback(
    () => typeof callback === 'function' && callback(),
    [callback],
  )
  useEffect(() => {
    // console.log('usePressHoldRepeat effect')
    if (!mouseDown) {
      holdDetectionTimeoutRef.current &&
        clearTimeout(holdDetectionTimeoutRef.current)
      intervalRef.current && clearInterval(intervalRef.current)
    } else {
      holdDetectionTimeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          runCallback()
        }, repeatDelay)
      }, holdDetectionThreshold)
      return () => {
        clearInterval(intervalRef.current)
        clearTimeout(holdDetectionTimeoutRef.current)
      }
    }
  }, [mouseDown, repeatDelay, runCallback])
  return {
    onClick: runCallback,
    onMouseDown: (e: React.MouseEvent) => {
      if (e.button === 0) setMouseDown(true)
    },
    onMouseUp: () => setMouseDown(false),
    onMouseOut: () => setMouseDown(false),
  }
}

function random(min: number, max: number) {
  return Math.floor((max - min) * Math.random()) + min
}

export function LikeButton() {
  const [likes, setLikes] = useState(0)
  const [likesByMe, setLikesByMe] = useState(0)
  const handleOnLike = useCallback(() => {
    setLikes((c) => c + 1)
    setLikesByMe((c) => c + 1)
  }, [])
  const props = usePressHoldRepeat(handleOnLike, 300, 100)
  const [mode, setMode] = useState('default')
  return (
    <div className="relative">
      <motion.button
        className="flex space-x-4 items-center select-none focus:outline-none relative z-10"
        onHoverStart={() => setMode('hovered')}
        onHoverEnd={() => setMode('default')}
        animate={mode}
        {...props}
      >
        <motion.div
          variants={{ default: { rotate: 0 }, hovered: { rotate: 10 } }}
          className={`text-pink-500 hover:text-pink-700`}
        >
          <FiHeart fill={'rgba(236,72,153)'} size={40} strokeWidth={1} />
        </motion.div>

        <div className="text-black">{likes}</div>
        {/* For debugging only */}
        {/* <div>committed: {likeCountCommitted}</div> */}
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