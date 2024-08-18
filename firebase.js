// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "flashcardsaas-118ce.firebaseapp.com",
  projectId: "flashcardsaas-118ce",
  storageBucket: "flashcardsaas-118ce.appspot.com",
  messagingSenderId: "359001728639",
  appId: "1:359001728639:web:e947e8b66c6d7abb7ec14a",
  measurementId: "G-FXP3S0LGNJ"
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