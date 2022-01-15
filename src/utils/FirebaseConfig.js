// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKJD5EZ2Ynu46zLrCEIzUFEDRaXD5SN58",
  authDomain: "medikamententimer.firebaseapp.com",
  projectId: "medikamententimer",
  storageBucket: "medikamententimer.appspot.com",
  messagingSenderId: "713405592516",
  appId: "1:713405592516:web:0958247fd08483e0576a91",
  measurementId: "G-D0TMXXLNV6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
