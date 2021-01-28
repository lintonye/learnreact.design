import { useFirestore } from '@/lib/firebase'
import { useCallback, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useRef } from 'react'

type IncLikeCount = (delta: number) => void

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

function useLikes(url: string): [number, IncLikeCount, number] {
  const db = useFirestore()
  const [likes, setLikes] = useState(0)

  const likesBeforeCommit = useRef(likes)

  const urlKey = url.replace(/\//g, '_')

  useEffect(() => {
    const docRef = db.collection(COLLECTION_LIKE_COUNTS).doc(urlKey)
    const unsubscribe = docRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const counts = snapshot.get('count')
        setLikes(counts)
        likesBeforeCommit.current = counts
      }
    })
    return unsubscribe
  }, [db, urlKey])

  const incLikeCount = useCallback(
    (delta: number) => {
      setLikes((likes) => likes + delta)
    },
    [db, url, urlKey],
  )

  const likesCommitted = useDebounce(likes, 500)

  const delta = likesCommitted - likesBeforeCommit.current

  useEffect(() => {
    likesBeforeCommit.current = likesCommitted
  }, [likesCommitted])

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

  return [likes, incLikeCount, likesCommitted]
}

function LikeButton({ onLike }: { onLike: IncLikeCount }) {
  const addOneLike = () => typeof onLike === 'function' && onLike(1)

  const [mouseDown, setMouseDown] = useState(false)
  const intervalRef = useRef(0)
  const holdDetectionTimeoutRef = useRef(0)
  const holdDetectionThreshold = 300
  const repeatDelay = 100
  useEffect(() => {
    if (!mouseDown) {
      holdDetectionTimeoutRef.current &&
        clearTimeout(holdDetectionTimeoutRef.current)
      intervalRef.current && clearInterval(intervalRef.current)
    } else {
      holdDetectionTimeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          addOneLike()
        }, repeatDelay)
      }, holdDetectionThreshold)
      return () => {
        clearInterval(intervalRef.current)
        clearTimeout(holdDetectionTimeoutRef.current)
      }
    }
  }, [mouseDown])
  return (
    <div
      onClick={addOneLike}
      onMouseDown={() => {
        setMouseDown(true)
      }}
      onMouseUp={() => {
        setMouseDown(false)
      }}
    >
      Like
    </div>
  )
}

export function Likes({ url }: { url: string }) {
  const [likeCount, incLikeCount, likeCountCommitted] = useLikes(url)
  return (
    <div className="space-x-4 flex">
      <LikeButton onLike={(amount: number) => incLikeCount(amount)} />
      <div>{likeCount}</div>
      {/* For debugging only */}
      {/* <div>committed: {likeCountCommitted}</div> */}
    </div>
  )
}
