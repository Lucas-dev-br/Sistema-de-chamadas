import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyBW__ij8xvk8_t3NqWFMKsEVU-_5vRIvMQ",
    authDomain: "sistemadelogin-4449f.firebaseapp.com",
    projectId: "sistemadelogin-4449f",
    storageBucket: "sistemadelogin-4449f.appspot.com",
    messagingSenderId: "197365814586",
    appId: "1:197365814586:web:93c532adb556b482662c03",
    measurementId: "G-Q0RC4ZPNP2"
  };
  
  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase;