// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8_oejoJ-6dxwQieqJbvkN7Huu3bynpHY",
  authDomain: "fire-homes-course-ba4d8.firebaseapp.com",
  projectId: "fire-homes-course-ba4d8",
  storageBucket: "fire-homes-course-ba4d8.firebasestorage.app",
  messagingSenderId: "1023505586303",
  appId: "1:1023505586303:web:1621ea1d967df93a8e074a"
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };
