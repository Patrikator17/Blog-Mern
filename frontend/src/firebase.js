// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: process.env.VITE_FIREBASE_API_KEY,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,// for vite
  authDomain: "mern-blog-974a9.firebaseapp.com",
  projectId: "mern-blog-974a9",
  storageBucket: "mern-blog-974a9.appspot.com",
  messagingSenderId: "415144285300",
  appId: "1:415144285300:web:de160a5b506a0d856a2d21"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);