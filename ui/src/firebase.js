// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-4cRRvO25PfT-aVRubUH_EGV0rChjles",
    authDomain: "edify-5cb9d.firebaseapp.com",
    projectId: "edify-5cb9d",
    storageBucket: "edify-5cb9d.appspot.com",
    messagingSenderId: "293262069527",
    appId: "1:293262069527:web:ed6e3c3d0868b5d458f152",
    measurementId: "G-RFCXHXQ3FR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp)

export default firebaseApp;