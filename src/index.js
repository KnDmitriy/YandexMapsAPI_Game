// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp =  initializeApp({
  apiKey: "AIzaSyBK66o3OCiEB3Z73Uf-CYamddyJYO5G6Ms",
  authDomain: "yandex-maps-3270f.firebaseapp.com",
  projectId: "yandex-maps-3270f",
  storageBucket: "yandex-maps-3270f.appspot.com",
  messagingSenderId: "427145089780",
  appId: "1:427145089780:web:f347c7024a284f29e2c4a1",
  measurementId: "G-ZPVNJ4C0QS"
});

// Initialize Firebase
const auth = getAuth(firebaseApp);

// Detect auth state 
onAuthStateChanged(auth, user=>{
    if(user != null){
        console.log('logged in!');
    }
    else {
        console.log('No user');
    }
});

const { src, dest } = require('gulp');

function streamTask() {
  return src('*.js')
    .pipe(dest('output'));
}

exports.default = streamTask;

const db = firebase.firestore();