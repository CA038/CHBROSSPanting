document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover la clase expanded de todas las tarjetas
            projectCards.forEach(c => c.classList.remove('expanded'));
            
            // Añadir la clase expanded a la tarjeta clickeada
            this.classList.add('expanded');
            
            // Verificar si ya existe un botón de cierre
            let closeButton = this.querySelector('.close-button');
            
            // Si no existe, crear uno nuevo
            if (!closeButton) {
                closeButton = document.createElement('button');
                closeButton.className = 'close-button';
                closeButton.innerHTML = '×';
                closeButton.setAttribute('aria-label', 'Cerrar proyecto');
                this.appendChild(closeButton);
            }
            
            // Añadir overlay oscuro
            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            document.body.appendChild(overlay);
            
            // Función para cerrar la tarjeta
            const closeCard = () => {
                this.classList.remove('expanded');
                overlay.remove();
                if (closeButton) {
                    closeButton.remove();
                }
            };
            
            // Cerrar al hacer clic en el botón
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                closeCard();
            });
            
            // Cerrar al hacer clic en el overlay
            overlay.addEventListener('click', closeCard);
            
            // Cerrar con la tecla Escape
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    closeCard();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });
}); 