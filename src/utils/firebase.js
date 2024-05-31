import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJNC62CVoI6Dr7HOm6WCwI6iExB1Qna8s",
  authDomain: "slutprojekt-javascript.firebaseapp.com",
  databaseURL:
    "https://slutprojekt-javascript-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slutprojekt-javascript",
  storageBucket: "slutprojekt-javascript.appspot.com",
  messagingSenderId: "844476599666",
  appId: "1:844476599666:web:050fd9ca6b18f34d46e1eb",
  measurementId: "G-7MDBDWGP5Q",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
