import * as firebase from "firebase";

const db = firebase.initializeApp({
    apiKey: "AIzaSyA9HxtzwseqJvC8os2xCUrK7M4s6e4toDw",
    authDomain: "sdhacks-twitchfortas.firebaseapp.com",
    databaseURL: "https://sdhacks-twitchfortas.firebaseio.com",
    projectId: "sdhacks-twitchfortas",
    storageBucket: "sdhacks-twitchfortas.appspot.com",
    messagingSenderId: "216879657596",
    appId: "1:216879657596:web:5624efb346def8b453cff9"
});

export default db;
export const provider = new firebase.auth.GoogleAuthProvider();