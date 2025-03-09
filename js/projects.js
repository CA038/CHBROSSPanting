document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Obtener el título del proyecto
            const title = this.querySelector('.project-info h3').textContent;
            // Crear un enlace a la página del proyecto
            const projectUrl = `proyectos/${title.toLowerCase().replace(/\s+/g, '-')}.html`;
            // Redirigir a la página del proyecto
            window.location.href = projectUrl;
        });
    });
}); 