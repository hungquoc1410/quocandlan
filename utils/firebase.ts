import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
    storageBucket: 'quoc-lan-couple-website.appspot.com',
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
