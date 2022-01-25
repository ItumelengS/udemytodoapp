// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  /* 
  apiKey: "AIzaSyAXdAKMmLPsaIsaPFSqgrUql_cEOkLZ3JU",
  authDomain: "udemytod.firebaseapp.com",
  projectId: "udemytod",
  storageBucket: "udemytod.appspot.com",
  messagingSenderId: "567039449894",
  appId: "1:567039449894:web:ea110157c9203d7bbfbfe7"*/
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,

  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,

  appId: process.env.NEXT_PUBLIC_APP_ID,

  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db,auth,provider };
