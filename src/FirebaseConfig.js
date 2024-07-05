// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt1MMGvMdb3U-uDOsPaWF4cCTkkhUDiME",
  authDomain: "signup-app-5358d.firebaseapp.com",
  projectId: "signup-app-5358d",
  storageBucket: "signup-app-5358d.appspot.com",
  messagingSenderId: "819243856165",
  appId: "1:819243856165:web:4635f48b303f272472aacc"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);