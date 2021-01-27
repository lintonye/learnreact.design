import { useMemo } from 'react'
import { FirebaseFirestore } from '@firebase/firestore-types'
import firebase from 'firebase/app'
import 'firebase/firestore'
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

firebase.apps.length === 0 && firebase.initializeApp(config)

export function useFirestore(): FirebaseFirestore {
  return useMemo(() => firebase.firestore(), [])
}
