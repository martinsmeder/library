console.log('firebase.js says: this seem to be working');

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'library-e9bf7.firebaseapp.com',
  projectId: 'library-e9bf7',
  storageBucket: 'library-e9bf7.appspot.com',
  messagingSenderId: '108285759447',
  appId: '1:108285759447:web:b512fce576edf56ec2c592',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Create a new instance of the GoogleAuthProvider class from the
// firebase/auth module
const provider = new GoogleAuthProvider();

export {
  app,
  auth,
  db,
  provider,
  // Export specific functions to avoid using entire app, auth and db - in
  // order to increase performance.
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
