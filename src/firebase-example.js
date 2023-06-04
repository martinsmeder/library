// ========================== Read as firebase.js ========================

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
  // Use data from firebase
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
