import { useFirestore } from '@/lib/firebase'
import { useCallback, useEffect, useState } from 'react'
import firebase from 'firebase/app'

type IncLikeCount = (delta: number) => void

const COLLECTION_LIKE_COUNTS = 'pageLikeCounts'

function useLikes(url: string): [number, IncLikeCount] {
  const db = useFirestore()
  const [likes, setLikes] = useState(0)

  // Likes count only goes up.
  // Optimistic update: this make sure the number won't jump back if the user clicks very quickly
  const setLikesIncOnly = useCallback(
    (count) => {
      setLikes((c) => (c < count ? count : c))
    },
    [setLikes],
  )

  const urlKey = url.replace(/\//g, '_')

  useEffect(() => {
    const docRef = db.collection(COLLECTION_LIKE_COUNTS).doc(urlKey)
    const unsubscribe = docRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setLikesIncOnly(snapshot.get('count'))
      }
    })
    return unsubscribe
  }, [db, urlKey])

  const incLikeCount = useCallback(
    (delta: number) => {
      const docRef = db.collection(COLLECTION_LIKE_COUNTS).doc(urlKey)
      // optimistic update
      setLikes((likes) => likes + delta)
      // actually update it in the db
      db.runTransaction(async (t) => {
        const updates = {
          url,
          count: firebase.firestore.FieldValue.increment(delta),
          lastLiked: firebase.firestore.FieldValue.serverTimestamp(),
        }
        const snapshot = await t.get(docRef)
        let count = delta
        if (snapshot.exists) {
          count = snapshot.get('count') + delta
          await t.update(docRef, updates)
        } else await t.set(docRef, updates)
        return count
      }).then((count) => setLikesIncOnly(count))
    },
    [db, url, urlKey],
  )
  return [likes, incLikeCount]
}

function LikeButton({ onLike }: { onLike: IncLikeCount }) {
  return (
    <button onClick={() => typeof onLike === 'function' && onLike(1)}>
      Like
    </button>
  )
}

export function Likes({ url }: { url: string }) {
  const [likeCount, incLikeCount] = useLikes(url)
  return (
    <div className="space-x-4 flex">
      <LikeButton onLike={(amount: number) => incLikeCount(amount)} />
      <div>{likeCount}</div>
    </div>
  )
}
