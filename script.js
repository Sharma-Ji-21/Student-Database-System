
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";  
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";  
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";  

// Firebase configuration
const firebaseConfig = {  
    apiKey: "AIzaSyAxbGQ_pRFpXN5CunUapm9MWjDhBYaCaT8",  
    authDomain: "database-sds.firebaseapp.com",  
    projectId: "database-sds",  
    storageBucket: "database-sds.appspot.com",  
    messagingSenderId: "253016838659",  
    appId: "1:253016838659:web:a5a9d6c3a9b87ab2e4b436",  
    databaseURL: "https://database-sds-default-rtdb.firebaseio.com/" // Corrected Realtime Database URL
};  

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// Add event listeners to forms
document.getElementById('add-student-form')?.addEventListener('submit', handleAddStudent);  
document.getElementById('login-form')?.addEventListener('submit', handleLogin);  
document.getElementById('edit-student-form')?.addEventListener('submit', handleUpdateName);

// Function to add a student
function handleAddStudent(event) {  
    event.preventDefault();  
    const name = document.getElementById('student-name').value;  
    const rollNumber = document.getElementById('roll-number').value;  
    const email = document.getElementById('student-email').value;  
    const password = document.getElementById('student-password').value;  

    // Create a user in Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)  
        .then(({ user }) => {  
            // Store the user's data in Realtime Database
            set(ref(database, `students/${user.uid}`), { name, rollNumber })  
                .then(() => {  
                    alert('Student added successfully!');  
                })
                .catch((error) => {  
                    console.error('Database error:', error);  
                    alert('Error saving student data to database.');  
                });  
        })  
        .catch((error) => {  
            console.error('Auth error:', error);  
            alert('Error creating user: ' + error.message);  
        });  
}  

function handleLogin(event) {  
    event.preventDefault();  
    const email = document.getElementById('email').value;  
    const password = document.getElementById('password').value;  

    // Authenticate user with Firebase Auth
    signInWithEmailAndPassword(auth, email, password)  
        .then(({ user }) => {  
            // Fetch the user's data from Realtime Database
            return get(ref(database, `students/${user.uid}`));
        })
        .then((snapshot) => {  
            if (snapshot.exists()) {  
                // User exists in the database
                localStorage.setItem('studentDetails', JSON.stringify(snapshot.val()));  
                alert('Login successful!');  
                window.location.href = 'student.html';  
            } else {  
                // User does not exist in the database
                alert('No data found for this user. Login not allowed.');  
            }  
        })  
        .catch((error) => {  
            console.error('Login error:', error);  
            alert('Invalid email or password. Please try again.');  
        });  
}

// Function to update student's name
function handleUpdateName(event) {  
    event.preventDefault();  
    const updatedName = document.getElementById('display-name').value;  
    const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));  

    if (!studentDetails) {  
        alert('No student details found. Please log in again.');  
        return;  
    }

    // Update the student's name in the database
    set(ref(database, `students/${studentDetails.id}`), {  
        name: updatedName,  
        rollNumber: studentDetails.rollNumber  
    })
        .then(() => {  
            alert('Name updated successfully!');  
        })
        .catch((error) => {  
            console.error('Update error:', error);  
            alert('Error updating name: ' + error.message);  
        });  
}

// Prepopulate the form with user details on page load
window.onload = function() {  
    const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));  
    if (studentDetails) {  
        document.getElementById('display-name').value = studentDetails.name;  
        document.getElementById('display-roll-number').value = studentDetails.rollNumber;  
    }  
};