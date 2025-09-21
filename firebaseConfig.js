// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGP51NQsAjTeGI6H8gsuG_JhjF1LqzBuE",
  authDomain: "edutrack-a64d3.firebaseapp.com",
  projectId: "edutrack-a64d3",
  storageBucket: "edutrack-a64d3.firebasestorage.app",
  messagingSenderId: "565682586442",
  appId: "1:565682586442:web:3f880db0bd6df95f7cb7b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Firestore instance
