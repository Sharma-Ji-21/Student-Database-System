import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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

// DOM elements
const studentNameElem = document.getElementById("student-name");
const rollNumberElem = document.getElementById("roll-number");
const emailElem = document.getElementById("student-email");
const bioElem = document.getElementById("bio");
const avatarElem = document.getElementById("avatar");
const editButton = document.getElementById("edit-info-button");
const saveButton = document.getElementById("save-changes-button");

// Fetch user details on authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        const userRef = ref(db, "students/" + userId);

        // Fetch user data
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                studentNameElem.innerText = data.name || "No Name Set";
                rollNumberElem.innerText = data.rollNumber || "No Roll Number";
                emailElem.innerText = data.email || "No Email Set";
                bioElem.innerText = data.bio || "No Bio Set";

                // Update avatar
                avatarElem.src = data.profilePicture || avatarElem.src;
            } else {
                alert("No data found for this user.");
            }
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    } else {
        alert("No user is logged in.");
    }
});

// Enable editing
editButton.addEventListener("click", () => {
    [studentNameElem, emailElem, bioElem].forEach((field) => {
        field.contentEditable = true;
        field.style.border = "1px solid #ccc";
    });
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
});

// Save changes
saveButton.addEventListener("click", () => {
    const userId = auth.currentUser.uid;
    const userRef = ref(db, "students/" + userId);

    const updatedData = {
        name: studentNameElem.innerText.trim(),
        email: emailElem.innerText.trim(),
        bio: bioElem.innerText.trim(),
        profilePicture: avatarElem.src // Update this if the user changes the avatar
    };

    set(userRef, updatedData).then(() => {
        alert("Profile updated successfully!");
        [studentNameElem, emailElem, bioElem].forEach((field) => {
            field.contentEditable = false;
            field.style.border = "none";
        });
        saveButton.style.display = "none";
        editButton.style.display = "inline-block";
    }).catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
    });
});
