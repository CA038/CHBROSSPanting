document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover la clase expanded de todas las tarjetas
            projectCards.forEach(c => c.classList.remove('expanded'));
            
            // Añadir la clase expanded a la tarjeta clickeada
            this.classList.add('expanded');
            
            // Añadir overlay oscuro
            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            document.body.appendChild(overlay);
            
            // Cerrar al hacer clic en el overlay
            overlay.addEventListener('click', function() {
                card.classList.remove('expanded');
                overlay.remove();
            });
            
            // Cerrar con la tecla Escape
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    card.classList.remove('expanded');
                    overlay.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });
}); 