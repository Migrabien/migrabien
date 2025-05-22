// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrMnY36bsdJGWpOlrMqyNdgIe6NvRGucc",
  authDomain: "migrabien.firebaseapp.com",
  projectId: "migrabien",
  storageBucket: "migrabien.firebasestorage.app",
  messagingSenderId: "799665094504",
  appId: "1:799665094504:web:0d848d14d5f524267b20dd",
  measurementId: "G-HNMKJH3CTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, analytics };
