// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "smartseekr-97f7d.firebaseapp.com",
    projectId: "smartseekr-97f7d",
    storageBucket: "smartseekr-97f7d.appspot.com",
    messagingSenderId: "223465951138",
    appId: "1:223465951138:web:a4e7344d9848c8a23cecfb"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);