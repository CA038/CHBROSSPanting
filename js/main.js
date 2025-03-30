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

    // Inicialización del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (menuToggle && navLinks && menuOverlay) {
        function toggleMenu() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        }

        function closeMenu() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }

        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        menuOverlay.addEventListener('click', closeMenu);

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    // Inicialización del carrusel
    const track = document.querySelector('.carousel-track');
    const slides = track ? Array.from(track.querySelectorAll('.carousel-slide')) : [];
    const nextButton = document.querySelector('.carousel-control.next');
    const prevButton = document.querySelector('.carousel-control.prev');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = dotsNav ? Array.from(dotsNav.querySelectorAll('.indicator')) : [];

    if (track && nextButton && prevButton && dotsNav && slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;

        // Asegurarse de que el primer slide esté activo
        slides[0].classList.add('active');
        dots[0].classList.add('active');

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });

            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentSlide) {
                    dot.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlides();
        }

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlides();
            });
        });

        // Autoplay
        let autoplayInterval = setInterval(nextSlide, 5000);

        track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        track.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });

        // Soporte para swipe en móviles
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }

    // Inicialización del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí puedes agregar la lógica para enviar el formulario
            alert('Mensaje enviado correctamente');
            contactForm.reset();
        });
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
    
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    // Cambiar el texto del botón mientras se envía
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    // Preparar los datos del formulario para EmailJS
    const templateParams = {
        from_name: nombre,
        reply_to: email,
        telefono: telefono,
        message: mensaje
    };

    // Enviar el correo usando EmailJS
    emailjs.send('service_9u8t576', 'template_bddzt9i', templateParams)
        .then(function(response) {
            console.log('¡ÉXITO!', response.status, response.text);
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            
            // Preparar mensaje para WhatsApp
            const whatsappMessage = `*Nuevo Mensaje de Contacto*%0A%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Teléfono:* ${telefono}%0A*Mensaje:* ${mensaje}`;
            const whatsappUrl = `https://wa.me/18644098256?text=${whatsappMessage}`;
            
            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappUrl, '_blank');
            
            // Limpiar el formulario
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