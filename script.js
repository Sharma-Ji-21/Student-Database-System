import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
    
    const firebaseConfig = {
      apiKey: "AIzaSyDTKs4Rbr582CNc5bFKsbxZ4UnoAAHp1WI",
      authDomain: "sds-project-51007.firebaseapp.com",
      projectId: "sds-project-51007",
      storageBucket: "sds-project-51007.firebasestorage.app",
      messagingSenderId: "514081088205",
      appId: "1:514081088205:web:2b59d85c3019712c84ff84"
    };
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const toggleToSignup = document.getElementById('toggle-to-signup');
    const toggleToLogin = document.getElementById('toggle-to-login');

    loginBtn.addEventListener('click', async () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
      } catch (error) {
        alert(error.message);
      }
    });

    signupBtn.addEventListener('click', async () => {
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
      } catch (error) {
        alert(error.message);
      }
    });

    toggleToSignup.addEventListener('click', () => {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    });

    toggleToLogin.addEventListener('click', () => {
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
    });