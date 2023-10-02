import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8beR0mrBJqI95H5Suy38UE_a8CEp1uhk",
  authDomain: "diary-dc092.firebaseapp.com",
  projectId: "diary-dc092",
  storageBucket: "diary-dc092.appspot.com",
  messagingSenderId: "987860403415",
  appId: "1:987860403415:web:db337310aee55987689c92",
  measurementId: "G-LP2EVT2516",
};

const app = initializeApp(firebaseConfig);
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, firebase_app };
