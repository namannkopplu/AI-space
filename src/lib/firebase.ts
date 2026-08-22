import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmR_FgRuR7nh2c85dSMqNyrT5eBHMu3a4",
  authDomain: "ai-space-d6bf6.firebaseapp.com",
  projectId: "ai-space-d6bf6",
  storageBucket: "ai-space-d6bf6.firebasestorage.app",
  messagingSenderId: "549303426319",
  appId: "1:549303426319:web:f0776d467395e2def2327a"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
let dbInstance;
try {
  dbInstance = getFirestore(app, "ai-studio-aispace-df3c9258-ad84-4037-8ce3-f5c371a52661");
} catch {
  dbInstance = getFirestore(app);
}

export const db = dbInstance;
export { app, auth, googleProvider };
