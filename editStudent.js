import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxbGQ_pRFpXN5CunUapm9MWjDhBYaCaT8",
    authDomain: "database-sds.firebaseapp.com",
    projectId: "database-sds",
    storageBucket: "database-sds.appspot.com",
    messagingSenderId: "253016838659",
    appId: "1:253016838659:web:a5a9d6c3a9b87ab2e4b436",
    databaseURL: "https://database-sds-default-rtdb.firebaseio.com/"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// Wait for auth state to initialize
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, fetch student details
        const userRef = ref(database, `students/${user.uid}`);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const studentDetails = snapshot.val();
                    document.getElementById("student-name-input").value = studentDetails.name || "";
                    document.getElementById("roll-number-input").value = studentDetails.rollNumber || "";
                } else {
                    alert("No student data found for this user.");
                }
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
                alert("Failed to load student details.");
            });
    } else {
        // No user is logged in, redirect to login page
        alert("No logged-in user found. Redirecting to login page.");
        window.location.href = "studentLogin.html";
    }
});

// Save updated student details
document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("No logged-in user found. Please log in again.");
        window.location.href = "studentLogin.html";
        return;
    }

    const updatedName = document.getElementById("student-name-input").value;
    const updatedRollNumber = document.getElementById("roll-number-input").value;

    const userRef = ref(database, `students/${user.uid}`);
    update(userRef, { name: updatedName, rollNumber: updatedRollNumber })
        .then(() => {
            alert("Student details updated successfully!");
            window.location.href = "student.html"; // Redirect to profile page
        })
        .catch((error) => {
            console.error("Error updating student details:", error);
            alert("Failed to update student details.");
        });
});

// Cancel button functionality
document.getElementById("cancel-btn").addEventListener("click", () => {
    window.location.href = "student.html"; // Redirect to profile page
});
