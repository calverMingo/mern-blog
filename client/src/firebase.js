// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-25771.firebaseapp.com",
  projectId: "mern-blog-25771",
  storageBucket: "mern-blog-25771.appspot.com",
  messagingSenderId: "689806938926",
  appId: "1:689806938926:web:24f6829ebaf52bab83e0bf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
