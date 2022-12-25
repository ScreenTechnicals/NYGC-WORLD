import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
    apiKey: "AIzaSyCN08s0lOry2NWnAb6Up0ytzHPlszGXlYs",
    authDomain: "nygc-world.firebaseapp.com",
    projectId: "nygc-world",
    storageBucket: "nygc-world.appspot.com",
    messagingSenderId: "359925586454",
    appId: "1:359925586454:web:7fad434c31cbc07873f337"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);