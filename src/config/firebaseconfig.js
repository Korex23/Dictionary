import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5cTjnCAV-OIhea6BWCToY5skjweKyVNc",
  authDomain: "dictionary-d9d5b.firebaseapp.com",
  projectId: "dictionary-d9d5b",
  storageBucket: "dictionary-d9d5b.appspot.com",
  messagingSenderId: "55705772963",
  appId: "1:55705772963:web:172aa6e987ceb36aadf016",
  measurementId: "G-2G53FMWTXD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
