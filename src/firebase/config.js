import firebase from "firebase/app";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAAfMnNr2rygk37hue-dOzFVLOxCpnlh1s",
  authDomain: "survey-system-845b2.firebaseapp.com",
  projectId: "survey-system-845b2",
  storageBucket: "survey-system-845b2.appspot.com",
  messagingSenderId: "293932024837",
  appId: "1:293932024837:web:860d6a8e3bef8e7e15486c",
  measurementId: "G-F7MGFXCEVF"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
