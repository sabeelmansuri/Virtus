// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase";

import "firebase/firestore";

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA9HxtzwseqJvC8os2xCUrK7M4s6e4toDw",
    authDomain: "sdhacks-twitchfortas.firebaseapp.com",
    databaseURL: "https://sdhacks-twitchfortas.firebaseio.com",
    projectId: "sdhacks-twitchfortas",
    storageBucket: "sdhacks-twitchfortas.appspot.com",
    messagingSenderId: "216879657596",
    appId: "1:216879657596:web:5624efb346def8b453cff9"
};

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig);
export const fdb = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

