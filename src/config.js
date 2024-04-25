// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDKSyVxEowl_4gvCO4rmDyPeY1gF7T4wrU",
  authDomain: "auth-c2ea2.firebaseapp.com",
  projectId: "auth-c2ea2",
  storageBucket: "auth-c2ea2.appspot.com",
  messagingSenderId: "1010982784411",
  appId: "1:1010982784411:web:f5d04dc2804cac067fe53e",
  measurementId: "G-MXT16N3GJF"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth=getAuth()
const provider=new GoogleAuthProvider()
export {auth,provider}