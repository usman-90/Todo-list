// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onChildAdded,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrybfDgw98mOG-6uWetbQ9WzGLAmX-b-Q",
  authDomain: "to-do-list-8e130.firebaseapp.com",
  projectId: "to-do-list-8e130",
  storageBucket: "to-do-list-8e130.appspot.com",
  messagingSenderId: "446467789660",
  appId: "1:446467789660:web:5411cb0531ea25be09a799",
  measurementId: "G-SYRTVJYNS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();
var uid ;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    getData();
    // ...
  } else {
    // User is signed out
    // ...
    window.location.href = "index.html";
  }
});

var arr = [];


function sendData(obj) {
  const refKey = ref(database, `tasks/`);
  obj.id = push(refKey).key;
  const reference = ref(database, `tasks/${uid}/${obj.id}/`);
  set(reference, obj);
  // arr[arr.length] = obj;
}

var array = [];
var counter = 0;
function getData(){

  const datareference = ref(database,`tasks/${uid}/`)
  onChildAdded(datareference, function(data){
    parent.innerHTML += `<div class="cont"><li class="para">${data.val().todo}</li><div class="contchild"><button class="buttonn" onclick="del(this.nextSibling,'${data.val().id}')"><i class="fa-solid fa-trash-can"></i></button><button onclick="edit(this,'${data.val().id}')" class="buttonn"><i class="fa-solid fa-pen-to-square"></i></button></div></div>`;
 
    array[counter] = [{todo : data.val().todo , date : data.val().date , id : data.val().id}]
    counter++;

  })
}
console.log(array)

var inp = document.getElementById("inp");
var parent = document.getElementById("content");

window.del = function (param3 , id) {
  param3.parentNode.parentNode.remove();
  inp.value = "";
  const delRef = ref(database , `tasks/${uid}/${id}/`);
  remove(delRef);

};

function updatee(x , id){
  var entry ={}
  entry.todo = x;
  entry.date =JSON.stringify(new Date())
  entry.id = id;
  var updateRef = ref(database , `tasks/${uid}/${id}`);
  set(updateRef , entry );
}

window.done = function (param1, param2 , id) {
  param2.innerHTML = inp.value;
  var btn1 = document.createElement("BUTTON");

  btn1.setAttribute("onclick", "edit(this)");
  var a = param1.parentNode;
  a.appendChild(btn1);
  btn1.setAttribute("class", "buttonn");
  btn1.setAttribute("id", "edit");

  var emo = document.createElement("I");
  emo.setAttribute("class", "fa-solid fa-pen-to-square");
  btn1.appendChild(emo);
  param1.remove();
  updatee(inp.value, id);
  inp.value = "";
};

window.edit = function (param1 , id) {
  var b = param1.parentNode.parentNode.childNodes[0].innerHTML;

  inp.value = b;
  var btn1 = document.createElement("BUTTON");

  var a = param1.parentNode;
  btn1.setAttribute(
    "onclick",
    `done(this,this.parentNode.parentNode.childNodes[0],'${id}')`
  );
  a.appendChild(btn1);
  btn1.setAttribute("class", "buttonn");

  btn1.setAttribute("id", "confirm");
  var emo = document.createElement("I");
  emo.setAttribute("class", "fa-solid fa-check");
  btn1.appendChild(emo);
  var addbtn = document.getElementById('addbtn')
  addbtn.disabled = true;
  param1.remove();
};

window.logout = function () {
  signOut(auth)
    .then(function () {
      console.log("Logout Successfully");
      window.location.href = "index.html";
    })
    .catch(function (err) {
      console.log(err);
    });
};

// function render() {
//   parent.innerHTML = "";
//   for (var i = 0; i < array.length; i++) {
//     parent.innerHTML += `<div class="cont"><li class="para">${arr[i].todo}</li><div class="contchild"><button class="buttonn" onclick="del(this.nextSibling,'${arr[i].id}')"><i class="fa-solid fa-trash-can"></i></button><button onclick="edit(this,'${arr[i].id}')" class="buttonn"><i class="fa-solid fa-pen-to-square"></i></button></div></div>`;
//   }
// }

window.generateElement = function () {
  if (inp.value == "") {
    alert("Can't leave it empty!");
  } else {
    var s = inp.value;
    var date = new Date();
    var entry = { todo: s, date: JSON.stringify(date) };
    sendData(entry);
   
    parent.innerHTML="";
    inp.value = "";
    getData();
  }
};

// function dlt(){
//     var parent = document.getElementById('main')
//     var childs = parent.childNodes
//     childs[childs.length-1].remove()

// }
