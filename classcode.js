

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBxWy54p37na-NPWlk4Qs6dVY46_H2wfOw",
    authDomain: "abdurehman-app.firebaseapp.com",
    projectId: "abdurehman-app",
    storageBucket: "abdurehman-app.firebasestorage.app",
    messagingSenderId: "1069858262240",
    appId: "1:1069858262240:web:07c13d163a93266e9f5485",
    measurementId: "G-CCX68B9RV2"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

var text = document.getElementById("text")

// action
var signupbtn = document.getElementById("signupbtn")
signupbtn.addEventListener("click",signup)

var loginbtn = document.getElementById("loginbtn")
loginbtn.addEventListener("click",login)
// check user state

onAuthStateChanged(auth, (user) => {
  if (user) {
       text.innerHTML = user.email + " is created successfully"

    const uid = user.uid;

  } else {
   
  }
});


function signup(){
var semail = document.getElementById("semail").value
var spassword = document.getElementById("spassword").value
createUserWithEmailAndPassword(auth, semail, spassword)
  .then((userCredential) => {

    const user = userCredential.user;
    text.innerHTML = user.email + " is created successfully"

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)

  });
}

function login(){
var lemail = document.getElementById("lemail").value
var lpassword = document.getElementById("lpassword").value
signInWithEmailAndPassword(auth, lemail, lpassword)
  .then((userCredential) => {

    const user = userCredential.user;
    text.innerHTML = user.email + " is logged in successfully"

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)

  });
}


