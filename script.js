import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";  
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";  
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";  

// Your web app's Firebase configuration  
const firebaseConfig = {  
    apiKey: "AIzaSyAxbGQ_pRFpXN5CunUapm9MWjDhBYaCaT8",  
    authDomain: "database-sds.firebaseapp.com",  
    projectId: "database-sds",  
    storageBucket: "database-sds.firebasestorage.app",  
    messagingSenderId: "253016838659",  
    appId: "1:253016838659:web:a5a9d6c3a9b87ab2e4b436"  
};  

// Initialize Firebase  
const app = initializeApp(firebaseConfig);  
const auth = getAuth();  
const database = getDatabase();  

document.getElementById('add-student-form')?.addEventListener('submit', addStudent);  
document.getElementById('login-form')?.addEventListener('submit', loginStudent);  
document.getElementById('edit-student-form')?.addEventListener('submit', updateName);  

function addStudent(event) {  
    event.preventDefault();  
    const name = document.getElementById('student-name').value;  
    const rollNumber = document.getElementById('roll-number').value;  
    const email = document.getElementById('student-email').value;  
    const password = document.getElementById('student-password').value;  

    createUserWithEmailAndPassword(auth, email, password)  
        .then((userCredential) => {  
            const userId = userCredential.user.uid;  
            set(ref(database, 'students/' + userId), {  
                name: name,  
                rollNumber: rollNumber  
            });  
            alert('Student added successfully!');  
        })  
        .catch((error) => {  
            console.error('Error adding student:', error);  
            alert('Could not add student. Please try again.');  
        });  
}  

function loginStudent(event) {  
    event.preventDefault();  
    const email = document.getElementById('email').value;  
    const password = document.getElementById('password').value;  

    signInWithEmailAndPassword(auth, email, password)  
        .then((userCredential) => {  
            const userId = userCredential.user.uid;  
            get(ref(database, 'students/' + userId)).then((snapshot) => {  
                if (snapshot.exists()) {  
                    const studentDetails = snapshot.val();  
                    localStorage.setItem('studentDetails', JSON.stringify(studentDetails));  
                    window.location.href = 'student.html';  
                } else {  
                    alert('No data available for this user');  
                }  
            });
            alert('Login successful!');
        })  
        .catch((error) => {  
            console.error('Login failed:', error);  
            alert('Invalid email or password. Please try again.');  
        });  
}  

function updateName(event) {  
    event.preventDefault();  
    const updatedName = document.getElementById('display-name').value;  

    const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));  
    const userId = studentDetails.id; // Assume you saved user ID  

    set(ref(database, 'students/' + userId), {  
        name: updatedName,  
        rollNumber: studentDetails.rollNumber // Keep roll number unchanged  
    }).then(() => {  
        alert('Name updated successfully!');  
    }).catch((error) => {  
        console.error('Error updating name:', error);  
    });  
}  

window.onload = function() {  
    const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));  
    if (studentDetails) {  
        document.getElementById('display-name').value = studentDetails.name;  
        document.getElementById('display-roll-number').value = studentDetails.rollNumber;  
    }  
};