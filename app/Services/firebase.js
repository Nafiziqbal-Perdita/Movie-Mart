// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.APIKEY,
  authDomain: Constants.expoConfig.extra.AUTHDOMAIN,
  projectId: Constants.expoConfig.extra.PROJECTID,
  storageBucket: Constants.expoConfig.extra.STORAGEBUCKET,
  messagingSenderId:Constants.expoConfig.extra.MESSAGINGSENDERID,
  appId:Constants.expoConfig.extra.APPID,
  measurementId: Constants.expoConfig.extra.MEASUREMENTID,
  databaseURL: Constants.expoConfig.extra.DATABASEURL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
// const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export {  database,db };
