import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

// Fetch and populate student details on page load
window.onload = function () {
    const user = auth.currentUser;

    if (!user) {
        alert("No logged-in user found. Redirecting to login page.");
        window.location.href = "studentLogin.html"; // Redirect to login page if not logged in
        return;
    }

    // Fetch user details from Firebase Database
    get(ref(database, `students/${user.uid}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const studentDetails = snapshot.val();
                document.getElementById("student-name").textContent = studentDetails.name || "No Name Provided";
                document.getElementById("roll-number").textContent = `Roll Number: ${studentDetails.rollNumber || "N/A"}`;
                document.getElementById("student-email").textContent = studentDetails.email || "No Email Provided";
            } else {
                alert("No data found for this user.");
            }
        })
        .catch((error) => {
            console.error("Error fetching user details:", error);
            alert("Failed to load profile details.");
        });
};
