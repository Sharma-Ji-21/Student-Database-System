// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, updatePassword, updateEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
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
const auth = getAuth(app);
const db = getDatabase(app);

// DOM Elements
const form = document.getElementById("edit-profile-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const bioInput = document.getElementById("bio");
const avatarInput = document.getElementById("avatar");

// Load existing data into the form
auth.onAuthStateChanged((user) => {
    if (user) {
        const userRef = ref(db, "students/" + user.uid);

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                nameInput.value = data.name || "";
                emailInput.value = data.email || "";
                bioInput.value = data.bio || "";
                avatarInput.value = data.profilePicture || "";
            } else {
                alert("No data found for this user.");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
            alert("An error occurred while fetching profile data.");
        });
    } else {
        alert("No user is logged in.");
        window.location.href = "index.html"; // Redirect to login or home page
    }
});

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("User is not logged in.");
        return;
    }

    const userId = user.uid;
    const userRef = ref(db, "students/" + userId);

    // Validate inputs
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert("Name and Email fields are required.");
        return;
    }

    // Prepare updated data
    const updatedData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        bio: bioInput.value.trim(),
        profilePicture: avatarInput.value.trim() || "https://example.com/default-avatar.png"
    };

    // Update in database
    set(userRef, updatedData)
        .then(() => {
            // Optionally update email and password
            const promises = [];

            if (user.email !== updatedData.email) {
                promises.push(updateEmail(user, updatedData.email));
            }

            if (passwordInput.value.trim()) {
                promises.push(updatePassword(user, passwordInput.value.trim()));
            }

            return Promise.all(promises);
        })
        .then(() => {
            alert("Profile updated successfully!");
            window.location.href = "index.html"; // Redirect back to profile page
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        });
});
