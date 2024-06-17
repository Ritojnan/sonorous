import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9iO3myLOOdh-zfofgOcbkyvR33Em-AiM",
  authDomain: "theindexstreet.firebaseapp.com",
  projectId: "theindexstreet",
  storageBucket: "theindexstreet.appspot.com",
  messagingSenderId: "218439558713",
  appId: "1:218439558713:web:347fc55354485fbc638fe8"
}; 
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }