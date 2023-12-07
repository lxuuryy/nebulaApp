// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJEN5XKnYJaTiztTNbyfBH3uuGbjsO4Ho",
  authDomain: "socialapp-8c7eb.firebaseapp.com",
  projectId: "socialapp-8c7eb",
  storageBucket: "socialapp-8c7eb.appspot.com",
  messagingSenderId: "367076555410",
  appId: "1:367076555410:web:f54b812224124a5271444b",
  measurementId: "G-CBGG3LLFZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
