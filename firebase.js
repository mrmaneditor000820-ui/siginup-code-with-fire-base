
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";


import { getAnalytics } from 
"https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";

import { doc, setDoc,addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js"; 


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
   getFirestore,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  updateDoc
} from 
"https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";


const firebaseConfig = {
  apiKey:" AIzaSyAV_au2xxUwILWhGPfHXkkFahiSfvy8XBM",
  authDomain: "e-commerce-18a79.firebaseapp.com",
  projectId: "e-commerce-18a79",
  storageBucket: "e-commerce-18a79.firebasestorage.app",
  messagingSenderId: "779164026643",
  appId: "1:779164026643:web:f5275e2ab4e868808bfce6",
  measurementId: "G-QJM2CFG0Q4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {
  app,
  analytics,
  auth,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
   getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  updateDoc
};