// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendEmailVerification} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOmk9IDTlXUSKEgMy7jVur4nESUgWL-2k",
  authDomain: "recipe-finder-and-genera-d1363.firebaseapp.com",
  databaseURL: "https://recipe-finder-and-genera-d1363-default-rtdb.firebaseio.com",
  projectId: "recipe-finder-and-genera-d1363",
  storageBucket: "recipe-finder-and-genera-d1363.firebasestorage.app",
  messagingSenderId: "19285283995",
  appId: "1:19285283995:web:ad39f73ade3218bd14a23e",
  measurementId: "G-HDTBC59XCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, provider, sendPasswordResetEmail, doc, setDoc, sendEmailVerification };
