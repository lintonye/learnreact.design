import { useFirestore } from '@/lib/firebase'
import { useCallback, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useRef } from 'react'

type ValueOrFunc<T> = T | ((preValue: T) => T)

type DebouncedStateSetter<T> = (
  valueOrFun: ValueOrFunc<T>,
  flush?: boolean,
) => void

const COLLECTION_LIKE_COUNTS = 'pageLikeCounts'

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

function useLikes(url: string): [number, DebouncedStateSetter<number>, number] {
  const [likes, likesBeforeCommit, likesToCommit, setLikes] = useDebouncedState(
    0,
  )

  const urlKey = url.replace(/\//g, '_')
  const db = useFirestore()
  useEffect(() => {
    const docRef = db.collection(COLLECTION_LIKE_COUNTS).doc(urlKey)
    const unsubscribe = docRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const counts = snapshot.get('count')
        setLikes(counts, true)
      }
    })
    return unsubscribe
  }, [db, urlKey])

  const delta = likesToCommit - likesBeforeCommit
  useEffect(() => {
    // actually update it in the db
    if (delta !== 0) {
      const docRef = db.collection(COLLECTION_LIKE_COUNTS).doc(urlKey)
      // console.log('running transaction, delta = ', delta)
      db.runTransaction(async (t) => {
        const updates = {
          url,
          count: firebase.firestore.FieldValue.increment(delta),
          lastLiked: firebase.firestore.FieldValue.serverTimestamp(),
        }
        const snapshot = await t.get(docRef)
        if (snapshot.exists) {
          await t.update(docRef, updates)
        } else await t.set(docRef, updates)
      })
    }
  }, [db, delta])

  return [likes, setLikes, likesToCommit]
}

function usePressHoldRepeat(
  callback: () => void,
  holdDetectionThreshold = 300,
  repeatDelay = 100,
) {
  const [mouseDown, setMouseDown] = useState(false)
  const intervalRef = useRef(0)
  const holdDetectionTimeoutRef = useRef(0)
  useEffect(() => {
    if (!mouseDown) {
      holdDetectionTimeoutRef.current &&
        clearTimeout(holdDetectionTimeoutRef.current)
      intervalRef.current && clearInterval(intervalRef.current)
    } else {
      holdDetectionTimeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          callback()
        }, repeatDelay)
      }, holdDetectionThreshold)
      return () => {
        clearInterval(intervalRef.current)
        clearTimeout(holdDetectionTimeoutRef.current)
      }
    }
  }, [mouseDown])
  return {
    onClick: callback,
    onMouseDown: () => setMouseDown(true),
    onMouseUp: () => setMouseDown(false),
    onMouseOut: () => setMouseDown(false),
  }
}

function LikeButton({ onLike }: { onLike: () => void }) {
  const addOneLike = () => typeof onLike === 'function' && onLike()
  const props = usePressHoldRepeat(addOneLike, 300, 100)

  return <div {...props}>Like</div>
}

export function Likes({ url }: { url: string }) {
  const [likes, setLikes, likeCountCommitted] = useLikes(url)
  return (
    <div className="space-x-4 flex">
      <LikeButton onLike={() => setLikes((c) => c + 1)} />
      <div>{likes}</div>
      {/* For debugging only */}
      {/* <div>committed: {likeCountCommitted}</div> */}
    </div>
  )
}
