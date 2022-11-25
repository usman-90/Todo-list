// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrybfDgw98mOG-6uWetbQ9WzGLAmX-b-Q",
  authDomain: "to-do-list-8e130.firebaseapp.com",
  databaseURL: "https://to-do-list-8e130-default-rtdb.firebaseio.com",
  projectId: "to-do-list-8e130",
  storageBucket: "to-do-list-8e130.appspot.com",
  messagingSenderId: "446467789660",
  appId: "1:446467789660:web:5411cb0531ea25be09a799",
  measurementId: "G-SYRTVJYNS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");

window.login= function(e) {

  e.preventDefault();
  
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      console.log(success.user.uid);
      window.location.replace('home.html')
    })
    .catch(function (err) {
      console.log(err);
      alert(err);
    });

  console.log(obj);
}
