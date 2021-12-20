// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKJMaT6E7k80LVXxlCl3-sy7lHYhy15-A",
  authDomain: "hardco-ecommerce.firebaseapp.com",
  projectId: "hardco-ecommerce",
  storageBucket: "hardco-ecommerce.appspot.com",
  messagingSenderId: "760033463369",
  appId: "1:760033463369:web:b744450c50cf20424d0398",
  // eslint-disable-next-line no-template-curly-in-string
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;