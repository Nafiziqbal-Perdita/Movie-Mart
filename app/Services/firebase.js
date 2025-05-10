// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK5AmaTMfCfYJ-A7DfGPrug_IWXiav7pg",
  authDomain: "moviemart-b4a15.firebaseapp.com",
  projectId: "moviemart-b4a15",
  storageBucket: "moviemart-b4a15.firebasestorage.app",
  messagingSenderId: "254603058964",
  appId: "1:254603058964:web:31fa76169c7a4abf856c01",
  measurementId: "G-WB98G9ZCFL",
  databaseURL: "https://moviemart-b4a15-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
// const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export {  database,db };
