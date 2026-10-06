import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAHf1YQ7sHAcwlMN8-QiNsT0LF8zS1AVM",
  authDomain: "naslookapp-ecf15.firebaseapp.com",
  databaseURL: "https://naslookapp-ecf15-default-rtdb.firebaseio.com",
  projectId: "naslookapp-ecf15",
  storageBucket: "naslookapp-ecf15.firebasestorage.app",
  messagingSenderId: "574849261990",
  appId: "1:574849261990:web:457bfa5670eba8dbc4af67",
  measurementId: "G-G7RMKRJ4ZV"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app, "algohary");

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, db };
