import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDfqMkPn3CQcy3XQTGvDZLSU0Y5EVLCtfU",
    authDomain: "chatapp42-963f8.firebaseapp.com",
    databaseURL: "https://chatapp42-963f8.firebaseio.com",
    projectId: "chatapp42-963f8",
    storageBucket: "chatapp42-963f8.appspot.com",
    messagingSenderId: "68830046571",
    appId: "1:68830046571:web:e73d86069a9d242e8d842e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
