document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBox = document.getElementById('login-box');
    const signupBox = document.getElementById('signup-box');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');

    showSignup.addEventListener('click', function() {
        loginBox.classList.add('hidden');
        signupBox.classList.remove('hidden');
    });

    showLogin.addEventListener('click', function() {
        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    });

    popupClose.addEventListener('click', function() {
        popup.classList.add('hidden');
    });

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.classList.remove('hidden');
    }

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const result = await postData('/login', { username, password });

        if (result.success) {
            showPopup('Login successful');
        } else {
            showPopup(`Login failed: ${result.message}`);
        }
    });

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            showPopup('Passwords do not match');
            return;
        }

        const result = await postData('/signup', { username, email, phone, password });

        if (result.success) {
            showPopup('Signup successful');
        } else {
            showPopup(`Signup failed: ${result.message}`);
        }
    });
});
