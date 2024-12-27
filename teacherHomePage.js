import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAxbGQ_pRFpXN5CunUapm9MWjDhBYaCaT8",
    authDomain: "database-sds.firebaseapp.com",
    projectId: "database-sds",
    storageBucket: "database-sds.appspot.com",
    messagingSenderId: "253016838659",
    appId: "1:253016838659:web:a5a9d6c3a9b87ab2e4b436",
    databaseURL: "https://database-sds-default-rtdb.firebaseio.com/"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


function filterStudents(query, studentsData) {
    const filteredStudents = {};
    for (const studentId in studentsData) {
        const student = studentsData[studentId];
        const studentName = student.name || '';
        if (studentName.toLowerCase().includes(query.toLowerCase())) {
            filteredStudents[studentId] = student;
        }
    }
    return filteredStudents;
}


function populateStudents(studentsData) {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = ''; 

    for (const studentId in studentsData) {
        const student = studentsData[studentId];
        const studentName = student.name || 'Unnamed';
        const email = student.email || 'No Email Provided';

        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${studentName}</h3>
            <p>Roll Number: ${student.rollNumber}</p>
            <p>Email: ${email}</p>
            <button class="edit-btn" data-id="${studentId}">Edit</button>
            <button class="delete-btn" data-id="${studentId}">Delete</button>
        `;

      
        wrapper.appendChild(card);
    }

    
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const studentId = event.target.getAttribute('data-id');
            window.location.href = `teacherEditStudent.html?id=${studentId}`;
        });
    });

    
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const studentId = event.target.getAttribute('data-id');
            deleteStudent(studentId);
        });
    });
}


window.onload = function () {
    const wrapper = document.querySelector('.wrapper');
    const searchBar = document.getElementById('search-bar');

   
    const studentsRef = ref(database, 'students');
    onValue(studentsRef, (snapshot) => {
        if (snapshot.exists()) {
            const studentsData = snapshot.val();
            populateStudents(studentsData);

           
            searchBar.addEventListener('input', (event) => {
                const query = event.target.value;
                const filteredStudents = filterStudents(query, studentsData);
                populateStudents(filteredStudents);
            });
        } else {
            wrapper.innerHTML = '<p>No student data found.</p>';
        }
    });
};


function deleteStudent(studentId) {
    const studentRef = ref(database, `students/${studentId}`);
    remove(studentRef)
        .then(() => {
            alert(`Student has been deleted successfully.`);
        })
        .catch((error) => {
            console.error(`Error deleting student: ${error}`);
        });
}
