// function test(callback) {
//     setTimeout(() => {
//         console.log("this is test 1")
//     },2000)

//     callback()
// }
// function callbackFunction() {
//     console.log("call back function")
// }
// // test(callbackFunction)

// function fetchData() {
//     fetch('https://dummyjson.com/products')
//         .then(res => res.json())
//         .then(console.log);
//     // .then(data=> handleData(data))
// }
// // function handleData(data){
// // console.log("data fetched",data)
// // }
// fetchData()


// callback
// promise
//this
// call apply bind

// callback hell
// function fun1(callback) {
//     setTimeout(() => {
//         console.log("function 1")
//         callback()
//     }, 2000)

// }
// function fun2(callback) {
//     setTimeout(() => {
//         console.log("function 2")
//         callback()
//     }, 3000)

// }
// fun1(() => {
//     fun2(() => {
//         console.log("functions completed")
//     })
// })

// const promise = new Promise((res,rej)=>{
// let a = 3
// if(a ==3){
//     res("condition true")
// }
// else{
//      rej("condition false")
// }
// }) 
// promise.then((res)=>{
//   console.log(res)
// }).catch((rej)=>{
// console.log(rej)
// })
// console.log(promise)
// async / await
// console.log("first")
// async function fetchApi() {
//     try {
//         const res =await fetch("https://dummyjson.com/products")
//             .then(res => res.json())
//             .then(data=>handledata(data.products))
//         function handledata(data) {
//             console.log(data)
//         }
//     } catch (error) {
//         console.log("error in api", error.message)
//     }
// }
// fetchApi()

// console.log("end")


// function test(){
//     console.log("test function")
// }
// setTimeout(test,3000)

// console.log("first console")

// setInterval(()=>{
//     console.log("set time out")
// })

// let promise = new Promise(()=>{
// console.log("promises console")
// })  //micotask

// console.log("last console")

// let a  = this 
// console.log(a)
// "use strict"
// console.log(this)
// function test(){
// }
// test()

// const obj ={
//     name:"a",
//     age:1,
//     funt : function(){
//         console.log(this.name)
//     }
// }
// obj.funt()

// task 1 


//1. aik function ko call karna he jisme apka name ae lekin wo 4 second k bad ae 

//2. aik apne data cosole karna he aur reject hone pe console.error ka msg dikhana he

//3. aik dummy api fetch karke una title aur image console karna he

// 1.type module in script
// 2.live server


//   // Import the functions you need from the SDKs you need


import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
   getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  updateDoc
} from "./firebase.js";
import { app } from "./firebase.js";
const db = getFirestore(app);
console.log("db=>", db);



var addbtn = document.getElementById("addBtn");
var quoteList = document.getElementById("quoteList");
addbtn.addEventListener("click", addQuote);

var quoteInput = document.getElementById("quoteInput");
const quoteCollection = collection(db, "quotes");
async function addQuote() {
  await addDoc(quoteCollection, {
    quote: quoteInput.value,
    time: serverTimestamp(),
  });
}

async function getQuote() {
  const querySnapshot = await getDocs(quoteCollection);
  querySnapshot.forEach((doc) => {
    console.log("id=>",doc.id, " => ", doc.data().quote);
    const li = document.createElement("li");
    // li.innerHTML = ` ${doc.data().quote} + <button>Edit</button>`

    li.textContent = doc.data().quote + " ";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
editBtn.addEventListener("click",function(){
  editBtn(doc.id,doc.data().quote)
})


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    quoteList.appendChild(li);
  });
}
getQuote();

async function editBtn(id,oldQuote){
// await updateDoc(doc(db,"quote",id))
const newQuote =await prompt("enter new quote",oldQuote)
console.log("new quote",newQuote)
await updateDoc(doc(db,"quotes",id),{
  quote:newQuote
})
}

var text = document.getElementById("text");

var signupBtn = document.getElementById("signupBtn");
var loginBtn = document.getElementById("loginBtn");
var logoutBtn = document.getElementById("logout");

signupBtn.addEventListener("click", signup);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);


// ✅ Signup
function signup() {

  var email = document.getElementById("semail").value;
  var password = document.getElementById("spassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      text.innerText = userCredential.user.email;
    })
    .catch((error) => {
      alert(error.message);
    });
}


function login() {

  var email = document.getElementById("lemail").value;
  var password = document.getElementById("lpassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      text.innerText = userCredential.user.email;
    })
    .catch((error) => {
      alert(error.message);
    });
}



function logout() {
  signOut(auth);
}

//  Reload User
onAuthStateChanged(auth, (user) => {
  if (user) {
    text.innerText = user.email;
  } else {
    text.innerText = "No User";
  }
});