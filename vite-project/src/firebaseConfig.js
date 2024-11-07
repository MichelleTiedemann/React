import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwcYRGOP6_MVBiwq9G7CGrALpeAR7Q5r8",
  authDomain: "react-aab83.firebaseapp.com",
  projectId: "react-aab83",
  storageBucket: "react-aab83.appspot.com",
  messagingSenderId: "1066221921068",
  appId: "1:1066221921068:web:b6c1df795c298c70ac8289",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
