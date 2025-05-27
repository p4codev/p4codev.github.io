/**
 * Theme Switcher Simple y Funcional
 */

(function() {
    'use strict';
    
    // Elementos
    let toggleBtn;
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    
    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        toggleBtn = document.getElementById('theme-toggle-btn');
        
        if (!toggleBtn) {
            console.error('No se encontró el botón de cambio de tema');
            return;
        }
        
        // Configurar el estado inicial
        updateThemeUI(currentTheme);
        
        // Agregar event listener
        toggleBtn.addEventListener('click', toggleTheme);
    });
    
    function toggleTheme() {
        // Cambiar tema
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Aplicar tema
        document.documentElement.setAttribute('data-theme', currentTheme);
        document.body.setAttribute('data-theme', currentTheme);
        
        // Guardar preferencia
        localStorage.setItem('theme', currentTheme);
        
        // Actualizar UI
        updateThemeUI(currentTheme);
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: currentTheme }
        }));
    }
    
    function updateThemeUI(theme) {
        if (!toggleBtn) return;
        
        // El CSS maneja la visualización basándose en data-theme
        toggleBtn.setAttribute('aria-label', 
            theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
        );
    }
    
    // Hacer disponible globalmente
    window.themeSwitcher = {
        getCurrentTheme: () => currentTheme,
        setTheme: (theme) => {
            if (theme === 'light' || theme === 'dark') {
                currentTheme = theme;
                document.documentElement.setAttribute('data-theme', currentTheme);
                document.body.setAttribute('data-theme', currentTheme);
                localStorage.setItem('theme', currentTheme);
                updateThemeUI(currentTheme);
            }
        },
        toggle: toggleTheme
    };
})();

// Exportar para uso en módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCurrentTheme: () => currentTheme,
        setTheme: (theme) => {
            if (theme === 'light' || theme === 'dark') {
                currentTheme = theme;
                document.documentElement.setAttribute('data-theme', currentTheme);
                document.body.setAttribute('data-theme', currentTheme);
                localStorage.setItem('theme', currentTheme);
                updateThemeUI(currentTheme);
            }
        },
        toggle: toggleTheme
    };
} 