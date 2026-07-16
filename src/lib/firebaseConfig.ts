import type { FirebaseOptions } from 'firebase/app';

// Firebase web configuration contains public app identifiers. Environment
// variables can override these defaults for preview or alternate deployments.
export const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBvLTXgG4U14pAJ3aiq7SyLkE-t20HVOCo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'acharitiwari-bd237.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'acharitiwari-bd237',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'acharitiwari-bd237.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '31876276721',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:31876276721:web:ea26740c42cbc0cbf0e450',
  // Optional for recent Firebase SDKs: Analytics fetches it from the linked
  // Google Analytics property when it is not supplied at build time.
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};
