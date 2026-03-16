

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: process.env.API_KEY,
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



// action
var signupbtn = document.getElementById("signupbtn")
signupbtn.addEventListener("click",signup)


function signup(){
var semail = document.getElementById("semail").value
var spassword = document.getElementById("spassword").value
createUserWithEmailAndPassword(auth, semail, spassword)
  .then((userCredential) => {

    const user = userCredential.user;

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

  });
}

