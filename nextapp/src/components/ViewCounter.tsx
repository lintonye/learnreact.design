import { useFirestore } from '@/lib/firebase'
import { useLocalStorage } from '@/lib/useLocalStorage'
import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { FiActivity } from 'react-icons/fi'

/**
 *
 * collection viewCounts:
 *  - url
 *  - count
 *  - timestamp
 */
function useViewCount(url: string) {
  const firestore = useFirestore()
  const [count, setCount] = useState(0)
  const [visitedUrls, setVisibleUrls] = useLocalStorage('visitedURLs', [])

  useEffect(() => {
    const urlKey = url.replace(/\/+/g, '_')
    async function incViewCount() {
      const collection = firestore.collection('pageViewCounts')
      const doc = collection.doc(urlKey)
      const updates = {
        url,
        count: firebase.firestore.FieldValue.increment(1),
        lastViewed: firebase.firestore.FieldValue.serverTimestamp(),
      }
      const snapshot = await doc.get()
      if (!visitedUrls.includes(url)) {
        if (snapshot.exists) {
          await doc.update(updates)
          setCount(snapshot.get('count') + 1)
        } else {
          await doc.set(updates)
          setCount(1)
        }
        setVisibleUrls([...visitedUrls, url])
      } else {
        setCount(snapshot.get('count'))
      }
    }
    incViewCount()
  }, [url, firestore])
  return count
}

export function ViewCounter({ url }: { url: string }) {
  const count = useViewCount(url)
  return (
    <div className="flex items-center space-x-2">
      <FiActivity />
      <span>Visits: {count}</span>
    </div>
  )
}
