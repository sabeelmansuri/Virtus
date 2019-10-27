// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");


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
firebase.initializeApp(firebaseConfig);

const fdb = firebase.firestore();
module.exports = {fdb: fdb};