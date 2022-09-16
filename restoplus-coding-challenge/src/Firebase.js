import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAvVK4XymAtzqWsCqSG-BxtU_72MwIJkUM",
  authDomain: "restoplus-challenge.firebaseapp.com",
  projectId: "restoplus-challenge",
  storageBucket: "restoplus-challenge.appspot.com",
  messagingSenderId: "973108000042",
  appId: "1:973108000042:web:43457dbc62908187d7da53",
};

// Initialization and firestore connectivity
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
