import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'bootstrap/dist/css/bootstrap.css'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnxzs9ZfFJWNnHe-7APHTdHHCYW3ABMrE",
  authDomain: "univ3-23-4d5bf.firebaseapp.com",
  projectId: "univ3-23-4d5bf",
  storageBucket: "univ3-23-4d5bf.appspot.com",
  messagingSenderId: "417543779607",
  appId: "1:417543779607:web:c8fe46c2b2df7f8699b352",
  measurementId: "G-9H2F3P5ED3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
