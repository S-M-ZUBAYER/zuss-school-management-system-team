// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDR3d7IJDVlED0Hwi93O-c2kWzRXXyYfO8",
    authDomain: "zuss-school-management-system.firebaseapp.com",
    projectId: "zuss-school-management-system",
    storageBucket: "zuss-school-management-system.appspot.com",
    messagingSenderId: "1047827177789",
    appId: "1:1047827177789:web:b9ce98b4c7a1824264e554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;