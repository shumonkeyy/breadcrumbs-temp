// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "import.meta.env.FIREBASE_API_KEY",
  authDomain: "breadcrumbs-temp-admin.firebaseapp.com",
  projectId: "breadcrumbs-temp-admin",
  storageBucket: "breadcrumbs-temp-admin.firebasestorage.app",
  messagingSenderId: "333169523960",
  appId: "1:333169523960:web:395d6758badc2de5774f0d",
  measurementId: "G-V57KJSB584",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
