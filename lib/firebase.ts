// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1nG6kVC6mptgOAhBpRj7zIawVKJ-Iw24",
  authDomain: "hugemartyr-9506d.firebaseapp.com",
  projectId: "hugemartyr-9506d",
  storageBucket: "hugemartyr-9506d.firebasestorage.app",
  messagingSenderId: "989174322460",
  appId: "1:989174322460:web:c3b32e59420743629796d9",
  measurementId: "G-3JCL5LXP99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
