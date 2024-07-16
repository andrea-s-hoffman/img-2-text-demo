import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Exm-QJhlrTMQkc4JeKB0gWIiYDhJxXI",
  authDomain: "img-to-text-demo.firebaseapp.com",
  projectId: "img-to-text-demo",
  storageBucket: "img-to-text-demo.appspot.com",
  messagingSenderId: "949368679037",
  appId: "1:949368679037:web:92e53669c93e6f52aa1f14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}

export function signOutOfGoogle(): void {
  auth.signOut();
}

export const db = getFirestore(app);

export const storage = getStorage(app);

export const checkText = async (fileName: string): Promise<string> => {
  let result = "not found";
  const q = query(collection(db, "extractedText"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.data().file.includes(fileName)) {
      result = doc.data().text;
    }
  });
  return result;
};
