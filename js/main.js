// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menú móvil
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Carrusel de proyectos
const projects = [
    // Aquí se agregarán los proyectos
    // Formato: { image: 'ruta/imagen.jpg', title: 'Título del proyecto', description: 'Descripción' }
];

const projectSlider = document.querySelector('.project-gallery');

function createProjectCard(project) {
    return `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        </div>
    `;
}

function initializeProjectSlider() {
    if (projects.length > 0) {
        projectSlider.innerHTML = projects.map(createProjectCard).join('');
    } else {
        // Crear 6 tarjetas de ejemplo con fondo gris
        const exampleCards = Array(6).fill().map((_, index) => `
            <div class="project-card">
                <div class="project-info">
                    <h3>Proyecto ${index + 1}</h3>
                    <p>Descripción del proyecto</p>
                </div>
            </div>
        `).join('');
        projectSlider.innerHTML = exampleCards;
    }
}

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí se agregará la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
});

// Animación de scroll
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

// Función para manejar el menú activo según la sección visible
function handleActiveMenu() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Función para verificar si una sección está visible
    const isSectionVisible = (section) => {
        const rect = section.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.5 &&
            rect.bottom >= window.innerHeight * 0.5
        );
    };

    // Función para actualizar el menú activo
    const updateActiveMenu = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            if (isSectionVisible(section)) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    // Actualizar el menú activo al hacer scroll
    window.addEventListener('scroll', updateActiveMenu);
    // Actualizar el menú activo al cargar la página
    window.addEventListener('load', updateActiveMenu);
}

// Función para manejar el menú móvil
function handleMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Función para manejar la galería de proyectos
function handleProjectGallery() {
    const projectGallery = document.querySelector('.project-gallery');
    
    if (projectGallery) {
        // Aquí puedes agregar la lógica para la galería de proyectos
        // Por ejemplo, cargar imágenes dinámicamente
    }
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    handleActiveMenu();
    handleMobileMenu();
    handleProjectGallery();
    initializeProjectSlider();
}); 