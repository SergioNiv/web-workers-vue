// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl9uBQRBo-YIgeeM_yc7Xh_iensDUP3Is",
  authDomain: "web-workers-b4768.firebaseapp.com",
  projectId: "web-workers-b4768",
  storageBucket: "web-workers-b4768.appspot.com",
  messagingSenderId: "953037673492",
  appId: "1:953037673492:web:33a2c3f4f84cebb2eac301"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getStorage } from "firebase/storage";
const storage = getStorage(app);

export { storage }