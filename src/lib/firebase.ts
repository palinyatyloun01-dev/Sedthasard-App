// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "lao-finance-tracker",
  appId: "1:866170359664:web:b0d04ea2eb77e30aad49b5",
  storageBucket: "lao-finance-tracker.firebasestorage.app",
  apiKey: "AIzaSyD3roX-X90cZesc6QuDrfVJEXWFjsEjBA4",
  authDomain: "lao-finance-tracker.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "866170359664"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      console.warn('Firestore persistence failed: multiple tabs open.');
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      console.warn('Firestore persistence not available in this browser.');
    }
  });


export { db };
