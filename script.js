// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEUraVghVijN_gHHnoT5FHoDU7nuKGlNo",
  authDomain: "sdsproject-ba58c.firebaseapp.com",
  projectId: "sdsproject-ba58c",
  storageBucket: "sdsproject-ba58c.appspot.com",
  messagingSenderId: "936763662639",
  appId: "1:936763662639:web:4c2c84073f05f245bd81da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Reference to the signup button
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get email, password, and confirm password input values
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  if (password !== confirmPassword) {
    alert('Password and Confirm Password do not match');
    return;
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log('User signed up:', user);
      alert('User signed up successfully');
      signupForm.reset(); // Clear form after successful signup
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing up:', errorCode, errorMessage);
      alert('Error signing up: ' + errorMessage);
    });
});

