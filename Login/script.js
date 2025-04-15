document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (email && password) {
      // Redirige a la URL proporcionada
      window.location.href = 'https://strong-chaja-14f729.netlify.app/';
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });
  
  document.getElementById('forgotPassword').addEventListener('click', function() {
    alert('Función de recuperación de contraseña no implementada.');
  });
  
  document.getElementById('createAccount').addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
  
    // Oculta el formulario de login
    document.querySelector('.login-container').innerHTML = `
      <h1>Create Account</h1>
      <form id="registerForm">
        <label for="newEmail">Email</label>
        <input type="email" id="newEmail" placeholder="Enter your email" required>
        
        <label for="newPassword">Password</label>
        <input type="password" id="newPassword" placeholder="Enter your password" required>
        
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" placeholder="Confirm your password" required>
        
        <button type="submit" id="registerButton">Register</button>
      </form>
      <div class="links">
        <a href="#" id="backToLogin">Back to Login</a>
      </div>
    `;
  
    // Agrega funcionalidad al botón "Back to Login"
    document.getElementById('backToLogin').addEventListener('click', function(event) {
      event.preventDefault();
      location.reload(); // Recarga la página para volver al formulario de login
    });
  
    // Agrega funcionalidad al formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const newEmail = document.getElementById('newEmail').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
      } else {
        alert('Account created successfully!');
        location.reload(); // Recarga la página para volver al formulario de login
      }
    });
  });