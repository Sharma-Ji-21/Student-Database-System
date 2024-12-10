// function toggleForm(formType) {
//     const signupForm = document.getElementById('signupForm');
//     const loginForm = document.getElementById('loginForm');

//     if (formType === 'signup') {
//       signupForm.classList.remove('hidden');
//       loginForm.classList.add('hidden');
//     } else {
//       signupForm.classList.add('hidden');
//       loginForm.classList.remove('hidden');
//     }
//   }

//   function register() {
//     const name = document.getElementById('signupName').value;
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;
//     const profilePicture = document.getElementById('uploadImage').files[0];

//     if (password !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     if (users.some(user => user.email === email)) {
//       alert('Email already registered! Use a different email.');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = function () {
//       const newUser = {
//         name,
//         email,
//         password,
//         profilePicture: reader.result,
//       };

//       users.push(newUser);
//       localStorage.setItem('users', JSON.stringify(users));

//       alert('Registration successful!');
//       toggleForm('login');
//     };

//     if (profilePicture) {
//       reader.readAsDataURL(profilePicture);
//     } else {
//       alert('Please upload a profile picture!');
//     }
//   }

//   function login() {
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;

//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const user = users.find(user => user.email === email && user.password === password);

//     if (user) {
//       alert(`Welcome back, ${user.name}!`);
//     } else {
//       alert('Invalid email or password!');
//     }
//   }
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTKs4Rbr582CNc5bFKsbxZ4UnoAAHp1WI",
  authDomain: "sds-project-51007.firebaseapp.com",
  projectId: "sds-project-51007",
  storageBucket: "sds-project-51007.firebasestorage.app",
  messagingSenderId: "514081088205",
  appId: "1:514081088205:web:2b59d85c3019712c84ff84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('Registration successful!');
      toggleForm('login');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  })