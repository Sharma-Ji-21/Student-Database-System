import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration (reuse your existing config)
const firebaseConfig = {
    apiKey: "AIzaSyAxbGQ_pRFpXN5CunUapm9MWjDhBYaCaT8",
    authDomain: "database-sds.firebaseapp.com",
    projectId: "database-sds",
    storageBucket: "database-sds.appspot.com",
    messagingSenderId: "253016838659",
    appId: "1:253016838659:web:a5a9d6c3a9b87ab2e4b436",
    databaseURL: "https://database-sds-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get student ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Reference to the student data
const studentRef = ref(database, `students/${studentId}`);

// Populate form with current student data
const form = document.getElementById('edit-student-form');

get(studentRef).then(snapshot => {
    if (snapshot.exists()) {
        const studentData = snapshot.val();
        form.name.value = studentData.name || '';
        form.rollNumber.value = studentData.rollNumber || '';
        form.email.value = studentData.email || '';
    } else {
        alert('Student data not found.');
    }
}).catch(error => {
    console.error(`Error fetching student data: ${error}`);
});

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect updated data
    const updatedData = {
        name: form.name.value,
        rollNumber: form.rollNumber.value,
        email: form.email.value
    };

    // If a new password is provided, include it in the update
    const newPassword = form.password.value.trim();
    if (newPassword) {
        updatedData.password = newPassword;
    }

    // Update the database
    update(studentRef, updatedData)
        .then(() => {
            alert('Student details updated successfully.');
            window.location.href = 'teacherHomePage.html'; // Redirect back to the dashboard
        })
        .catch(error => {
            console.error(`Error updating student data: ${error}`);
        });
});
