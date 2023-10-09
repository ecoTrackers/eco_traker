function validateLogup() {
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const date = document.getElementById('date').value;

    if (name.trim() === '' || lastname.trim() === '' || email.trim() === '' ||
        password.trim() === '' || confirmPassword.trim() === '' || date.trim() === '') {
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

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    redirectToHome();

    return false; 
}

function redirectToHome() {
    window.location.href = "../home/home.html"; 
}

const logupForm = document.getElementById('logupForm');
logupForm.addEventListener('submit', (event) => {
    if (!validateLogup()) {
        event.preventDefault();
    }
});
