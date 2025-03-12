// Navegación suave
document.addEventListener('DOMContentLoaded', () => {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Si estamos en móvil y el menú está abierto, lo cerramos
                const menuToggle = document.querySelector('.menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                const menuOverlay = document.querySelector('.menu-overlay');
                const body = document.body;

                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            }
        });
    });

    // Marcar enlace activo al hacer scroll
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Activar el enlace correspondiente al hacer scroll
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (menuToggle && navLinks && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Cerrar menú al hacer clic en el overlay
        menuOverlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        });

        // Cerrar menú al hacer clic en los enlaces
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // Inicializar el carrusel
    initializeCarousel();

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }

    // Animaciones de scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature, .project-card, .contact-form, .contact-info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
});

// Carrusel de proyectos
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    let currentSlide = 0;
    
    // Mostrar el primer slide
    slides[0].classList.add('active');

    // Función para actualizar slides
    function updateSlides() {
        // Remover clase active de todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Agregar clase active al slide actual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Event listener para el botón siguiente
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    });

    // Event listener para el botón anterior
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    });

    // Event listeners para los indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlides();
        });
    });

    // Auto avance cada 5 segundos
    let autoAdvance = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }, 5000);

    // Pausar auto avance cuando el mouse está sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }, 5000);
    });

    // Swipe para móviles
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe izquierda
                currentSlide = (currentSlide + 1) % slides.length;
            } else {
                // Swipe derecha
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            }
            updateSlides();
        }
    }
}

// Configuración de EmailJS
(function() {
    emailjs.init("dq8MsHqy30hfGETP_");
})();

// Función para manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Cambiar el texto del botón mientras se envía
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    // Preparar los datos del formulario
    const templateParams = {
        from_name: document.getElementById('nombre').value,
        reply_to: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        message: document.getElementById('mensaje').value
    };

    // Enviar el correo usando EmailJS
    emailjs.send('service_9u8t576', 'template_bddzt9i', templateParams)
        .then(function(response) {
            console.log('¡ÉXITO!', response.status, response.text);
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            form.reset();
        })
        .catch(function(error) {
            console.error('ERROR...', error);
            alert('Lo sentimos, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        })
        .finally(function() {
            // Restaurar el botón
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });

    return false;
} 