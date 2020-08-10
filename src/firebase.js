
import firebase from "firebase";

var app = firebase.initializeApp({
  apiKey: "AIzaSyAuItlEPCQlDsblu2ssSVnNbNPnO2z2qBY",
  authDomain: "afrex-6f4a8.firebaseapp.com",
  databaseURL: "https://afrex-6f4a8.firebaseio.com",
  projectId: "afrex-6f4a8",
  storageBucket: "afrex-6f4a8.appspot.com",
  messagingSenderId: "50092088269",
  appId: "1:50092088269:web:5dc2ee7994d7187dea8284",
  measurementId: "G-WC0K8E389Z",
});

export const db = app.firestore();

