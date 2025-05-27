/**
 * Animaciones interactivas y efectos visuales avanzados
 */

class InteractiveAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollIndicator();
        this.setupIntersectionObserver();
        this.setupParticleSystem();
        this.setupTypingEffect();
        this.setupSmoothScrolling();
        this.setupCursorFollower();
        this.setupSkillBarsAnimation();
        this.setupCounterAnimation();
    }

    // Indicador de progreso de scroll
    setupScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
        });
    }

    // Observer para animaciones al hacer scroll
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Observar elementos que necesitan animación
        const elementsToAnimate = document.querySelectorAll(
            '.service-item, .skill-item, .portfolio-item, .blog-item, .testimonial-item'
        );

        elementsToAnimate.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Sistema de partículas flotantes
    setupParticleSystem() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        heroSection.appendChild(particlesContainer);

        // Crear partículas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posición y tamaño aleatorios
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';

            particlesContainer.appendChild(particle);
        }
    }

    // Efecto de máquina de escribir
    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typewriter');

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };

        // Iniciar después de un pequeño delay
        setTimeout(typeWriter, 1000);
    }

    // Scroll suave mejorado
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Cursor personalizado que sigue el mouse
    setupCursorFollower() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Animación suave del cursor
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Efectos especiales en hover
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.backgroundColor = 'var(--accent-hover)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'var(--accent-color)';
            });
        });
    }

    // Animación de barras de habilidades
    setupSkillBarsAnimation() {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        const animateSkillBars = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('aria-valuenow') + '%';
                    
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 2s ease-in-out';
                        progressBar.style.width = targetWidth;
                    }, 200);
                }
            });
        };

        const skillObserver = new IntersectionObserver(animateSkillBars, {
            threshold: 0.5
        });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // Animación de contadores
    setupCounterAnimation() {
        const counters = document.querySelectorAll('.count');
        
        const animateCounters = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    let current = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 20);
                }
            });
        };

        const counterObserver = new IntersectionObserver(animateCounters, {
            threshold: 0.5
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Efecto de ondas en botones
    static addWaveEffect(button) {
        button.classList.add('wave-effect');
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Efecto parallax para elementos
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Efecto de glassmorphism dinámico
    setupGlassmorphism() {
        const glassElements = document.querySelectorAll('.glass-effect');
        
        glassElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.backdropFilter = 'blur(15px)';
                element.style.background = 'rgba(255, 255, 255, 0.15)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.backdropFilter = 'blur(10px)';
                element.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveAnimations();
    
    // Agregar efectos de onda a todos los botones
    document.querySelectorAll('.btn, button').forEach(btn => {
        InteractiveAnimations.addWaveEffect(btn);
    });
});

// Agregar estilos CSS para las animaciones
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .custom-cursor {
        pointer-events: none !important;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(animationStyles); 