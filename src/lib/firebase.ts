import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFviUIffyfFnTs1n07KjBL52FzGEyDSF8",
  authDomain: "adwaith-bed.firebaseapp.com",
  databaseURL: "https://adwaith-bed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "adwaith-bed",
  storageBucket: "adwaith-bed.firebasestorage.app",
  messagingSenderId: "339333457502",
  appId: "1:339333457502:web:cd296b50594be0016736cf",
  measurementId: "G-5MY52911N7"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
