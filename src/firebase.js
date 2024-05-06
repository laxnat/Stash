import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCy2aJFK71nYQY731TZMQAYFgITehTLuK8",
    authDomain: "cecs327project2-879de.firebaseapp.com",
    projectId: "cecs327project2-879de",
    storageBucket: "cecs327project2-879de.appspot.com",
    messagingSenderId: "990352202883",
    appId: "1:990352202883:web:937ce0761cf3389b878fb6",
    measurementId: "G-JNMY8G5DQS"
  };

// Initialiize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const firestore = firebaseApp.firestore();
export default firebaseApp;