// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWv4BMY9n-GzYuRM7Xw9gFRdtb5kGqPsQ",
  authDomain: "estimate-form-647c5.firebaseapp.com",
  projectId: "estimate-form-647c5",
  storageBucket: "estimate-form-647c5.appspot.com",
  messagingSenderId: "139892589059",
  appId: "1:139892589059:web:c14cb5d5c82d96bb3a0436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};