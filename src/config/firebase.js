import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDUi4M9HcHdFood6A5dKEKz5JDxbbjQZWU",
  authDomain: "swiggy-clone-3d80e.firebaseapp.com",
  projectId: "swiggy-clone-3d80e",
  storageBucket: "swiggy-clone-3d80e.appspot.com",
  messagingSenderId: "1009959871048",
  appId: "1:1009959871048:web:8687513368268265756e7d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;

