// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "wise-51f1e.firebaseapp.com",
  projectId: "wise-51f1e",
  storageBucket: "wise-51f1e.appspot.com",
  messagingSenderId: "556592843108",
  appId: "1:556592843108:web:ce2f9b67d50097c674d271",
  measurementId: "G-DSJ8HZG9PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Conditionally initialize analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export { firestore, auth, analytics, db };
export default app;

