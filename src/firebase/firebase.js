import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9CPJMbAwVuhs7675Fhl6Ko1wfMHz7s1w",
  authDomain: "chat-21924.firebaseapp.com",
  projectId: "chat-21924",
  storageBucket: "chat-21924.appspot.com",
  messagingSenderId: "6106296776",
  appId: "1:6106296776:web:822c4969539dc3f10190fd",
  measurementId: "G-S0RBP9QM8P",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
