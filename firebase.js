// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "advice-19486.firebaseapp.com",
  projectId: "advice-19486",
  storageBucket: "advice-19486.appspot.com",
  messagingSenderId: "748516707397",
  appId: "1:748516707397:web:f9b420bfd778e2bee5272c",
  measurementId: "G-XGZZ2FX73W"
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

