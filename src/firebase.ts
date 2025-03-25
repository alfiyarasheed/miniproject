// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC-5dW00-3AV-a3DMT1EBqpwQPchzqC84Q",
//   authDomain: "venue-ease-3d192.firebaseapp.com",
//   databaseURL: "https://venue-ease-3d192-default-rtdb.firebaseio.com",
//   projectId: "venue-ease-3d192",
//   storageBucket: "venue-ease-3d192.firebasestorage.app",
//   messagingSenderId: "959255067754",
//   appId: "1:959255067754:web:d19501bbe6276d8a325e13",
//   measurementId: "G-493HQ8B3J2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // For image upload


// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC-5dW00-3AV-a3DMT1EBqpwQPchzqC84Q",
  authDomain: "venue-ease-3d192.firebaseapp.com",
  databaseURL: "https://venue-ease-3d192-default-rtdb.firebaseio.com",
  projectId: "venue-ease-3d192",
  storageBucket: "venue-ease-3d192.appspot.com", // ✅ Corrected storage bucket
  messagingSenderId: "959255067754",
  appId: "1:959255067754:web:d19501bbe6276d8a325e13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
