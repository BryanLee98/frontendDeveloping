// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "marketpage-96fb4.firebaseapp.com",
  projectId: "marketpage-96fb4",
  storageBucket: "marketpage-96fb4.firebasestorage.app",
  messagingSenderId: "722987463935",
  appId: "1:722987463935:web:106dd761e81276f4f248ca",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
