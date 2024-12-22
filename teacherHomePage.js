import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Dynamically populate tasks for the teacher
window.onload = function () {
    const wrapper = document.querySelector('.wrapper');

    // Reference to students and their tasks
    const studentsRef = ref(database, 'students');
    onValue(studentsRef, (snapshot) => {
        if (snapshot.exists()) {
            const studentsData = snapshot.val();
            wrapper.innerHTML = ''; // Clear existing cards before appending new ones

            for (const studentId in studentsData) {
                const student = studentsData[studentId];
                const studentName = student.name || 'Unnamed';
                const tasks = student.tasks || {};

                // Create a card for each student
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${studentName}</h3>
                    <p>Roll Number: ${student.rollNumber}</p>
                    <div class="tasks">
                        <h4>Tasks:</h4>
                        ${Object.keys(tasks).length > 0 
                            ? Object.entries(tasks)
                                .map(([taskId, task]) => `<p>- ${task.task} (Assigned by: ${task.assignedBy})</p>`)
                                .join('') 
                            : '<p>No tasks assigned yet.</p>'}
                    </div>
                `;

                // Append card to wrapper
                wrapper.appendChild(card);
            }
        } else {
            wrapper.innerHTML = '<p>No student data found.</p>';
        }
    });
};
