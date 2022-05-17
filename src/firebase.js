import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1QgHfjQBVcLd06LYvbBPbR5I_IlwdhHQ",
  authDomain: "ourclub-24864.firebaseapp.com",
  projectId: "ourclub-24864",
  storageBucket: "ourclub-24864.appspot.com",
  messagingSenderId: "323807759216",
  appId: "1:323807759216:web:a0ffa40544a2bf8b275db5",
  measurementId: "G-VTXBZCWVQ9",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = getFirestore(app);
const storage = getStorage();

export { auth, db, storage };
