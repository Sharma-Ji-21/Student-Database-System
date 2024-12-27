import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


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


const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');


const studentRef = ref(database, `students/${studentId}`);


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

form.addEventListener('submit', (event) => {
    event.preventDefault();

    
    const updatedData = {
        name: form.name.value,
        rollNumber: form.rollNumber.value,
        email: form.email.value
    };

    
    const newPassword = form.password.value.trim();
    if (newPassword) {
        updatedData.password = newPassword;
    }

    
    update(studentRef, updatedData)
        .then(() => {
            alert('Student details updated successfully.');
            window.location.href = 'teacherHomePage.html';
        })
        .catch(error => {
            console.error(`Error updating student data: ${error}`);
        });
});
