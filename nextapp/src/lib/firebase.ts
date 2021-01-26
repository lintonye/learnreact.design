import { useEffect, useState } from 'react'
import { FirebaseFirestore } from '@firebase/firestore-types'
import { FirebaseApp } from '@firebase/app-types'
// require("dotenv").config();

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

let firebaseAppInstance: FirebaseApp
const getFirebase = async () => {
  const firebase = (await import('@firebase/app')).default
  await import('firebase/firestore')
  // await import('firebase/auth')

  if (firebaseAppInstance) {
    return firebaseAppInstance
  }

  firebaseAppInstance = firebase.initializeApp(config)

  return firebaseAppInstance
}

export function useFirebase(): FirebaseApp | undefined {
  const [firebase, setFirebase] = useState<FirebaseApp>()
  useEffect(() => {
    async function initFirebase() {
      const firebase = await getFirebase()
      setFirebase(firebase)
    }
    initFirebase()
  }, [])
  return firebase
}

export function useFirestore(): FirebaseFirestore {
  const firebase = useFirebase()
  // @ts-ignore
  return firebase ? firebase.firestore() : null
}
