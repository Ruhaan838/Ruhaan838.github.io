// Minimal Firebase client initialization (only Firestore) for static-export safe usage.
// This runs client-side only. Ensure you set env variables in a .env file (NEXT_PUBLIC_*)

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// All keys must be exposed with NEXT_PUBLIC_ since build is static.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Simple validation so you immediately see why persistence might fail
const missingKeys = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (typeof window !== 'undefined') {
  if (missingKeys.length) {
    console.warn('[Firebase] Missing NEXT_PUBLIC_* env vars:', missingKeys.join(', '));
  } else {
    console.log('[Firebase] Config loaded for project:', firebaseConfig.projectId);
  }
}

let app: FirebaseApp | null = null;

export const getFirebaseApp = (): FirebaseApp | null => {
  if (missingKeys.length) return null; // Disable silently if config incomplete
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  }
  return getApps()[0]!;
};

export const db = (() => {
  const a = getFirebaseApp();
  return a ? getFirestore(a) : null;
})();

export const firebaseAvailable = () => !!db;
