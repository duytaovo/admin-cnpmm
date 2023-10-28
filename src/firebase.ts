import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBRhgufi0z_I3ujmwgee7qx0BCAM-m5QDU",
  authDomain: "clone-music-yt-typescript.firebaseapp.com",
  projectId: "clone-music-yt-typescript",
  storageBucket: "clone-music-yt-typescript.appspot.com",
  messagingSenderId: "28798679661",
  appId: "1:28798679661:web:83651acac88495b01edd64",
  measurementId: "G-LRN9K91GXD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
export default firebase;
