import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyBIQFkGkLYaUjxSdx9VJif72Qj0UaukXc4",
  authDomain: "kleiderer-com.firebaseapp.com",
  databaseURL: "https://kleiderer-com.firebaseio.com",
  projectId: "kleiderer-com",
  storageBucket: "kleiderer-com.appspot.com",
  messagingSenderId: "545339606583",
  appId: "1:545339606583:web:707984370dbc7ffdd7e1b2",
  measurementId: "G-3Z8C7FVTH0",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.performance();
