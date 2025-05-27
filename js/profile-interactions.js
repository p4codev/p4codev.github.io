/**
 * Interacciones del Perfil Mejorado
 * Maneja las animaciones y efectos del perfil en el header
 */

class ProfileInteractions {
    constructor() {
        this.profileSection = null;
        this.profileImage = null;
        this.statusIndicator = null;
        this.badges = [];
        this.themeToggle = null;
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupStatusIndicator();
        this.setupThemeIntegration();
    }
    
    setupElements() {
        this.profileSection = document.querySelector('.compact-profile');
        this.profileImage = document.querySelector('.profile-image-wrapper');
        this.statusIndicator = document.querySelector('.status-indicator');
        this.themeToggle = document.querySelector('#theme-toggle');
        // Los badges ya no existen en el perfil compacto
        this.badges = [];
    }
    
    setupEventListeners() {
        if (this.profileImage) {
            this.profileImage.addEventListener('click', this.handleProfileClick.bind(this));
            this.profileImage.addEventListener('mouseenter', this.handleProfileHover.bind(this));
            this.profileImage.addEventListener('mouseleave', this.handleProfileLeave.bind(this));
        }
        
        // Los badges ya no existen en el perfil compacto, se omite esta funcionalidad
        
        // Efecto de typing en el título
        this.setupTypingEffect();
    }
    
    handleProfileClick() {
        // Efecto de "click" en la imagen de perfil
        if (this.profileImage) {
            this.profileImage.style.transform = 'scale(0.95) rotate(-2deg)';
            setTimeout(() => {
                this.profileImage.style.transform = '';
            }, 150);
        }
        
        // Mostrar mensaje de disponibilidad
        this.showAvailabilityMessage();
    }
    
    handleProfileHover() {
        // Efecto de partículas al hacer hover
        this.createHoverParticles();
    }
    
    handleProfileLeave() {
        // Limpiar efectos de hover
        this.clearHoverEffects();
    }
    
    setupStatusIndicator() {
        if (!this.statusIndicator) return;
        
        // Cambiar estado según la hora del día
        const hour = new Date().getHours();
        let status = 'online';
        let title = 'Disponible para proyectos';
        
        if (hour >= 22 || hour <= 6) {
            status = 'away';
            title = 'Fuera de horario - Responderé pronto';
            this.statusIndicator.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        } else if (hour >= 12 && hour <= 14) {
            status = 'busy';
            title = 'En reunión - Disponible pronto';
            this.statusIndicator.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        }
        
        this.statusIndicator.setAttribute('title', title);
        this.statusIndicator.setAttribute('data-status', status);
    }
    
    // Las funciones de badges se omiten en el perfil compacto
    
    setupTypingEffect() {
        const titleElement = document.querySelector('.profile-title');
        if (!titleElement) return;
        
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            titleElement.textContent += originalText[index];
            index++;
            
            if (index >= originalText.length) {
                clearInterval(typeInterval);
                // Agregar cursor parpadeante
                this.addBlinkingCursor(titleElement);
            }
        }, 100);
    }
    
    addBlinkingCursor(element) {
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        cursor.style.marginLeft = '2px';
        element.appendChild(cursor);
        
        // Remover cursor después de 3 segundos
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
        }, 3000);
    }
    
    createHoverParticles() {
        if (!this.profileImage) return;
        
        const rect = this.profileImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Crear más partículas con diferentes colores
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                this.createParticle(centerX, centerY, i);
            }, i * 30);
        }
        
        // Crear ondas concéntricas
        this.createRippleEffect(centerX, centerY);
    }
    
    createParticle(x, y, index) {
        const particle = document.createElement('div');
        const colors = [
            'rgba(247, 44, 91, 0.8)',
            'rgba(255, 255, 255, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)'
        ];
        
        const color = colors[index % colors.length];
        const size = Math.random() * 4 + 2;
        const angle = (index / 12) * 360;
        const distance = Math.random() * 80 + 40;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px ${color};
            animation: particleFloat${index} 2s ease-out forwards;
        `;
        
        // Crear animación única para cada partícula
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat${index} {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance}px) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(particle);
        
        // Remover partícula y estilo después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 2000);
    }
    
    createRippleEffect(x, y) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: fixed;
                    left: ${x - 25}px;
                    top: ${y - 25}px;
                    width: 50px;
                    height: 50px;
                    border: 2px solid rgba(247, 44, 91, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    animation: rippleExpand 1.5s ease-out forwards;
                `;
                
                document.body.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 1500);
            }, i * 200);
        }
    }
    
    clearHoverEffects() {
        // Limpiar partículas existentes
        const particles = document.querySelectorAll('[style*="particleFloat"]');
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
    }
    
    setupThemeIntegration() {
        if (!this.themeToggle) return;
        
        // Sincronizar con el theme switcher existente
        this.themeToggle.addEventListener('change', (e) => {
            if (window.themeSwitcher) {
                window.themeSwitcher.toggleTheme();
            }
        });
        
        // Actualizar estado del toggle según el tema actual
        this.updateThemeToggleState();
        
        // Escuchar cambios de tema
        document.addEventListener('themeChanged', () => {
            this.updateThemeToggleState();
        });
    }
    
    updateThemeToggleState() {
        if (!this.themeToggle) return;
        
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.themeToggle.checked = currentTheme === 'dark';
    }
    
    showAvailabilityMessage() {
        // Crear mensaje temporal de disponibilidad
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 0.9rem;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out forwards;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        message.textContent = '💼 ¡Disponible para nuevos proyectos!';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 2000);
    }
}

// Agregar estilos CSS para las animaciones
const profileStyles = document.createElement('style');
profileStyles.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes rippleExpand {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        100% {
            opacity: 0;
            transform: scale(4);
        }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes profileGlow {
        0%, 100% { 
            box-shadow: 0 0 20px rgba(247, 44, 91, 0.3);
        }
        50% { 
            box-shadow: 0 0 40px rgba(247, 44, 91, 0.6);
        }
    }
    
    /* Mejoras adicionales para el perfil */
    .profile-section:hover {
        animation: profileGlow 2s ease-in-out infinite;
    }
    
    [data-theme="dark"] .profile-section:hover {
        animation: profileGlowDark 2s ease-in-out infinite;
    }
    
    @keyframes profileGlowDark {
        0%, 100% { 
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);
        }
        50% { 
            box-shadow: 0 0 50px rgba(139, 92, 246, 0.7);
        }
    }
`;
document.head.appendChild(profileStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.profileInteractions = new ProfileInteractions();
});

// Exportar para uso externo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileInteractions;
} 