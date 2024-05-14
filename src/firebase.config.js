import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAw2j5RlkHNGbMdGL1aJnCP9zShN2fj804",
  authDomain: "candramebel-2388d.firebaseapp.com",
  projectId: "candramebel-2388d",
  storageBucket: "candramebel-2388d.appspot.com",
  messagingSenderId: "558952684184",
  appId: "1:558952684184:web:a48258af421a92fb5e4eed",
  measurementId: "G-B9W8K050NS",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
