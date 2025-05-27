/**
 * Controlador de cambio de idiomas
 * Maneja las traducciones entre español e inglés
 */

class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'es';
        this.translations = {};
        this.languageButtons = [];
        
        this.init();
    }
    
    init() {
        this.loadTranslations();
        this.loadSavedLanguage();
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupLanguageButtons();
                this.applyLanguage(this.currentLanguage);
            });
        } else {
            this.setupLanguageButtons();
            this.applyLanguage(this.currentLanguage);
        }
    }
    
    loadTranslations() {
        this.translations = {
            es: {
                // Header y navegación
                'inicio': 'Inicio',
                'sobre-mi': 'Sobre mí',
                'servicios': 'Servicios',
                'experiencia': 'Experiencia',
                'certificaciones': 'Certificaciones',
                'proyectos': 'Proyectos',
                'blog': 'Blog',
                'contacto': 'Contacto',
                
                // Perfil
                'software-engineer': 'Software Engineer',
                'disponible-proyectos': 'Disponible para proyectos',
                
                // Hero section
                'hero-title': 'Alexander Coral',
                'hero-description': 'Ingeniero de Software Full Stack especializado en desarrollo web moderno, arquitecturas escalables y soluciones cloud. Más de 5 años de experiencia creando aplicaciones robustas con React, Node.js, Python y AWS.',
                'ver-proyectos': 'Ver Mis Proyectos',
                'descargar-cv': 'Descargar CV',
                
                // Sobre mí
                'section-about': 'Sobre Mí',
                'about-greeting': '¡Hola! Soy Alexander 👋',
                'about-p1': 'Ingeniero de Software con más de 5 años de experiencia desarrollando soluciones tecnológicas innovadoras. Me especializo en arquitecturas full-stack, desde interfaces de usuario intuitivas hasta sistemas backend robustos y escalables.',
                'about-p2': 'Mi pasión por la tecnología me ha llevado a dominar múltiples lenguajes y frameworks, siempre manteniéndome actualizado con las últimas tendencias del desarrollo de software. Disfruto resolviendo problemas complejos y transformando ideas en productos digitales exitosos.',
                'nombre': 'Nombre',
                'experiencia': 'Experiencia',
                'especialidad': 'Especialidad',
                'ubicacion': 'Ubicación',
                'email': 'Email',
                'disponibilidad': 'Disponibilidad',
                'freelance-remoto': 'Freelance & Remoto',
                'contactame-btn': 'Contáctame',
                
                // Skills
                'section-skills': 'Stack Tecnológico',
                'skills-subtitle': 'Dominio completo del ciclo de desarrollo de software',
                'skills-description': 'Desde la conceptualización hasta el despliegue en producción, manejo las tecnologías más demandadas del mercado para crear soluciones robustas, escalables y de alto rendimiento.',
                
                // Servicios
                'section-services': 'Servicios Profesionales',
                'service-1-title': 'Desarrollo Web Full Stack',
                'service-1-desc': 'Aplicaciones web completas desde el frontend hasta el backend, con arquitecturas modernas y escalables.',
                'service-2-title': 'Aplicaciones Móviles',
                'service-2-desc': 'Desarrollo de apps nativas y híbridas para iOS y Android usando React Native y Flutter.',
                'service-3-title': 'Soluciones Cloud',
                'service-3-desc': 'Migración y despliegue en AWS, configuración de infraestructura como código y DevOps.',
                'service-4-title': 'APIs & Microservicios',
                'service-4-desc': 'Diseño e implementación de APIs RESTful y GraphQL, arquitecturas de microservicios escalables.',
                'service-5-title': 'Optimización & Performance',
                'service-5-desc': 'Auditorías de rendimiento, optimización de bases de datos y mejora de velocidad de carga.',
                'service-6-title': 'Consultoría Técnica',
                'service-6-desc': 'Asesoramiento en arquitectura de software, selección de tecnologías y mejores prácticas.',
                
                // Experiencia
                'section-experience': 'Experiencia & Certificaciones',
                'experiencia-profesional': '💼 Experiencia Profesional',
                'certificaciones-title': '🏆 Certificaciones',
                
                // Contacto
                'section-contact': 'Contáctame',
                'telefono': 'Teléfono',
                'enviar-mensaje': 'Enviar Mensaje',
                'tu-nombre': 'Ingresa tu Nombre',
                'tu-email': 'Ingresa tu Correo Electrónico',
                'asunto': 'Asunto',
                'tu-mensaje': 'Tu Mensaje'
            },
            en: {
                // Header y navegación
                'inicio': 'Home',
                'sobre-mi': 'About Me',
                'servicios': 'Services',
                'experiencia': 'Experience',
                'certificaciones': 'Certifications',
                'proyectos': 'Projects',
                'blog': 'Blog',
                'contacto': 'Contact',
                
                // Perfil
                'software-engineer': 'Software Engineer',
                'disponible-proyectos': 'Available for projects',
                
                // Hero section
                'hero-title': 'Alexander Coral',
                'hero-description': 'Full Stack Software Engineer specialized in modern web development, scalable architectures and cloud solutions. More than 5 years of experience creating robust applications with React, Node.js, Python and AWS.',
                'ver-proyectos': 'View My Projects',
                'descargar-cv': 'Download CV',
                
                // Sobre mí
                'section-about': 'About Me',
                'about-greeting': 'Hello! I\'m Alexander 👋',
                'about-p1': 'Software Engineer with more than 5 years of experience developing innovative technological solutions. I specialize in full-stack architectures, from intuitive user interfaces to robust and scalable backend systems.',
                'about-p2': 'My passion for technology has led me to master multiple languages and frameworks, always staying updated with the latest software development trends. I enjoy solving complex problems and transforming ideas into successful digital products.',
                'nombre': 'Name',
                'experiencia': 'Experience',
                'especialidad': 'Specialty',
                'ubicacion': 'Location',
                'email': 'Email',
                'disponibilidad': 'Availability',
                'freelance-remoto': 'Freelance & Remote',
                'contactame-btn': 'Contact Me',
                
                // Skills
                'section-skills': 'Technology Stack',
                'skills-subtitle': 'Complete mastery of the software development cycle',
                'skills-description': 'From conceptualization to production deployment, I handle the most demanded technologies in the market to create robust, scalable and high-performance solutions.',
                
                // Servicios
                'section-services': 'Professional Services',
                'service-1-title': 'Full Stack Web Development',
                'service-1-desc': 'Complete web applications from frontend to backend, with modern and scalable architectures.',
                'service-2-title': 'Mobile Applications',
                'service-2-desc': 'Development of native and hybrid apps for iOS and Android using React Native and Flutter.',
                'service-3-title': 'Cloud Solutions',
                'service-3-desc': 'Migration and deployment on AWS, infrastructure as code configuration and DevOps.',
                'service-4-title': 'APIs & Microservices',
                'service-4-desc': 'Design and implementation of RESTful and GraphQL APIs, scalable microservices architectures.',
                'service-5-title': 'Optimization & Performance',
                'service-5-desc': 'Performance audits, database optimization and loading speed improvement.',
                'service-6-title': 'Technical Consulting',
                'service-6-desc': 'Software architecture advice, technology selection and best practices.',
                
                // Experiencia
                'section-experience': 'Experience & Certifications',
                'experiencia-profesional': '💼 Professional Experience',
                'certificaciones-title': '🏆 Certifications',
                
                // Contacto
                'section-contact': 'Contact Me',
                'telefono': 'Phone',
                'enviar-mensaje': 'Send Message',
                'tu-nombre': 'Enter your Name',
                'tu-email': 'Enter your Email',
                'asunto': 'Subject',
                'tu-mensaje': 'Your Message'
            }
        };
    }
    
    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        } else {
            // Detectar idioma del navegador
            const browserLang = navigator.language.substring(0, 2);
            if (this.translations[browserLang]) {
                this.currentLanguage = browserLang;
            }
        }
    }
    
    setupLanguageButtons() {
        this.languageButtons = document.querySelectorAll('.language-btn');
        
        if (this.languageButtons.length === 0) {
            console.warn('No se encontraron botones de idioma');
            return;
        }
        
        this.languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });
        
        this.updateActiveButton();
    }
    
    changeLanguage(language) {
        if (!this.translations[language]) {
            console.warn(`Idioma no soportado: ${language}`);
            return;
        }
        
        this.currentLanguage = language;
        this.applyLanguage(language);
        this.saveLanguage(language);
        this.updateActiveButton();
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: language }
        }));
    }
    
    applyLanguage(language) {
        const translations = this.translations[language];
        
        // Aplicar traducciones por data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        // Aplicar traducciones por data-translate-placeholder
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.setAttribute('placeholder', translations[key]);
            }
        });
        
        // Aplicar traducciones por data-translate-title
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            if (translations[key]) {
                element.setAttribute('title', translations[key]);
            }
        });
        
        // Actualizar el idioma del documento
        document.documentElement.setAttribute('lang', language === 'es' ? 'es-ES' : 'en-US');
    }
    
    updateActiveButton() {
        this.languageButtons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    saveLanguage(language) {
        localStorage.setItem('language', language);
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getTranslation(key, language = null) {
        const lang = language || this.currentLanguage;
        return this.translations[lang] && this.translations[lang][key] || key;
    }
    
    // Método para agregar traducciones dinámicamente
    addTranslations(newTranslations) {
        Object.keys(newTranslations).forEach(lang => {
            if (!this.translations[lang]) {
                this.translations[lang] = {};
            }
            Object.assign(this.translations[lang], newTranslations[lang]);
        });
    }
}

// Inicializar el language switcher
const languageSwitcher = new LanguageSwitcher();

// Hacer disponible globalmente
window.languageSwitcher = languageSwitcher;

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
} 