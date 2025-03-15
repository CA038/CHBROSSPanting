document.addEventListener('DOMContentLoaded', function() {
    const carousel = {
        container: document.querySelector('.carousel-slides'),
        slides: Array.from(document.querySelectorAll('.carousel-slide')),
        controls: {
            prev: document.querySelector('.carousel-control.prev'),
            next: document.querySelector('.carousel-control.next')
        },
        indicators: Array.from(document.querySelectorAll('.indicator')),
        currentIndex: 0,
        isAnimating: false,
        autoplayInterval: null,

        init() {
            this.bindEvents();
            this.startAutoplay();
            this.updateSlides();
        },

        bindEvents() {
            // Controles de navegación
            this.controls.prev.addEventListener('click', () => this.navigate('prev'));
            this.controls.next.addEventListener('click', () => this.navigate('next'));

            // Indicadores
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });

            // Pausar autoplay en hover
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());

            // Soporte para touch
            let touchStartX = 0;
            let touchEndX = 0;

            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            this.container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.navigate('next');
                    } else {
                        this.navigate('prev');
                    }
                }
            });
        },

        navigate(direction) {
            if (this.isAnimating) return;

            this.isAnimating = true;
            const previousIndex = this.currentIndex;

            if (direction === 'next') {
                this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            } else {
                this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            }

            this.updateSlides();

            setTimeout(() => {
                this.isAnimating = false;
            }, 600);
        },

        goToSlide(index) {
            if (this.isAnimating || index === this.currentIndex) return;

            this.isAnimating = true;
            this.currentIndex = index;
            this.updateSlides();

            setTimeout(() => {
                this.isAnimating = false;
            }, 600);
        },

        updateSlides() {
            this.slides.forEach((slide, index) => {
                if (index === this.currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            this.indicators.forEach((indicator, index) => {
                if (index === this.currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        },

        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.navigate('next');
            }, 5000);
        },

        stopAutoplay() {
            clearInterval(this.autoplayInterval);
        }
    };

    carousel.init();
}); 