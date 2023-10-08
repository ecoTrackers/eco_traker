function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email.trim() === '' || password.trim() === '') {
        alert('Todos los campos son obligatorios.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Ingrese un correo electrónico válido.');
        return false;
    }

    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return false;
    }

    redirectToHome();
    return false; 
}

function redirectToHome() {
    window.location.href = "../home/home.html"; 
}


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    if (validateLogin()) {
        redirectToHome(); 
    } else {
        event.preventDefault();
    }
});