// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Jko5HnJuQnGjNZA7F67HZY9HxhFi0_s",
  authDomain: "challenge-graydive.firebaseapp.com",
  projectId: "challenge-graydive",
  storageBucket: "challenge-graydive.appspot.com",
  messagingSenderId: "539435934424",
  appId: "1:539435934424:web:fd82a1ebecf73e7a72edad",
  measurementId: "G-177W21RLPX",
};

// Initialize Firebase

const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export const db = getFirestore(appFirebase);

