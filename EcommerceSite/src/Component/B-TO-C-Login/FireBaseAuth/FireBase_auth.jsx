// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyDeSH-h6u8TipJddn5KjSqbMO4jcsM6RwA",
  authDomain: "ishum-7feeb.firebaseapp.com",
  projectId: "ishum-7feeb",
  storageBucket: "ishum-7feeb.appspot.com",
  messagingSenderId: "181947412631",
  appId: "1:181947412631:web:715b546a945a0f1db1f9d2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };





 
