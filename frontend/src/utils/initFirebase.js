import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkaIQXvoS-OI0LDlD0p-NHr7vmcaUr9lo",
  authDomain: "ecotransit-400921.firebaseapp.com",
  projectId: "ecotransit-400921",
  storageBucket: "ecotransit-400921.appspot.com",
  messagingSenderId: "989492743489",
  appId: "1:989492743489:web:f677f97fa9626afd7525c0",
  measurementId: "G-DJCDP60VP5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
