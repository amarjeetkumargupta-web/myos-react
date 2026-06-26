import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9oG22-avCMoHaGLfwTyHP_MHj8_DfT2I",
  authDomain: "myos-app-2dfc9.firebaseapp.com",
  projectId: "myos-app-2dfc9",
  storageBucket: "myos-app-2dfc9.firebasestorage.app",
  messagingSenderId: "890408349271",
  appId: "1:890408349271:web:ea7ba22bf2ccf64fe9fd12"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);