document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuButton && navbarCollapse) {
        menuButton.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }
});