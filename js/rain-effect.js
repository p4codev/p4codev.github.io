/**
 * Efecto de lluvia para el fondo del sitio web
 * Genera gotas de lluvia animadas de forma dinámica
 */

class RainEffect {
    constructor(options = {}) {
        this.options = {
            intensity: options.intensity || 100, // Número de gotas
            speed: options.speed || 'medium', // Velocidad general
            wind: options.wind || 10, // Efecto de viento (grados de inclinación)
            cloudCount: options.cloudCount || 8, // Número de nubes
            treeCount: options.treeCount || 12, // Número de árboles
            animalCount: options.animalCount || 6, // Número de animales
            ...options
        };
        
        this.rainContainer = null;
        this.cloudsContainer = null;
        this.forestContainer = null;
        this.mistElement = null;
        this.drops = [];
        this.clouds = [];
        this.trees = [];
        this.animals = [];
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        this.createRainContainer();
        this.createCloudsContainer();
        this.createForestContainer();
        this.createMist();
        this.start();
        
        // Ajustar la intensidad según el tamaño de pantalla
        this.adjustForScreenSize();
        
        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            this.adjustForScreenSize();
        });
    }
    
    createRainContainer() {
        this.rainContainer = document.createElement('div');
        this.rainContainer.className = 'rain-container';
        document.body.appendChild(this.rainContainer);
    }
    
    createCloudsContainer() {
        this.cloudsContainer = document.createElement('div');
        this.cloudsContainer.className = 'clouds-container';
        document.body.appendChild(this.cloudsContainer);
    }
    
    createForestContainer() {
        this.forestContainer = document.createElement('div');
        this.forestContainer.className = 'forest-container';
        document.body.appendChild(this.forestContainer);
    }
    
    createMist() {
        this.mistElement = document.createElement('div');
        this.mistElement.className = 'rain-mist';
        document.body.appendChild(this.mistElement);
    }
    
    createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
        // Posición horizontal aleatoria
        const leftPosition = Math.random() * 100;
        drop.style.left = leftPosition + '%';
        
        // Retraso aleatorio para que no todas caigan al mismo tiempo
        const delay = Math.random() * 2;
        drop.style.animationDelay = delay + 's';
        
        // Velocidad aleatoria
        const speeds = ['slow', 'medium', 'fast', 'very-fast'];
        const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
        drop.classList.add(randomSpeed);
        
        // Agregar ligera variación en la inclinación por el viento
        const windVariation = (Math.random() - 0.5) * this.options.wind;
        drop.style.transform = `rotate(${windVariation}deg)`;
        
        return drop;
    }
    
    createCloud() {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Tamaños aleatorios
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        cloud.classList.add(randomSize);
        
        // Alturas aleatorias
        const heights = ['high', 'mid', 'low'];
        const randomHeight = heights[Math.floor(Math.random() * heights.length)];
        cloud.classList.add(randomHeight);
        
        // Algunos con efecto de resplandor
        if (Math.random() > 0.7) {
            cloud.classList.add('glow');
        }
        
        // Posición inicial (fuera de la pantalla a la izquierda)
        cloud.style.left = '-200px';
        
        // Retraso aleatorio
        const delay = Math.random() * 20;
        cloud.style.animationDelay = delay + 's';
        
        return cloud;
    }
    
    createTree() {
        const tree = document.createElement('div');
        tree.className = 'tree';
        
        // Tipos de árboles aleatorios
        const types = ['pine', 'oak', 'birch'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        tree.classList.add(randomType);
        
        // Tamaños aleatorios
        const sizes = ['small', 'medium', 'tall'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        tree.classList.add(randomSize);
        
        // Posición horizontal aleatoria
        const leftPosition = Math.random() * 100;
        tree.style.left = leftPosition + '%';
        
        // Retraso aleatorio para la animación de balanceo
        const delay = Math.random() * 8;
        tree.style.animationDelay = delay + 's';
        
        return tree;
    }
    
    createAnimal() {
        const animal = document.createElement('div');
        animal.className = 'animal';
        
        // Tipos de animales aleatorios
        const types = ['rabbit', 'deer', 'bird', 'squirrel'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        animal.classList.add(randomType);
        
        // Velocidades aleatorias
        const speeds = ['slow', 'fast'];
        if (Math.random() > 0.5) {
            const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
            animal.classList.add(randomSpeed);
        }
        
        // Posición inicial (fuera de la pantalla a la izquierda)
        animal.style.left = '-50px';
        
        // Retraso aleatorio
        const delay = Math.random() * 30;
        animal.style.animationDelay = delay + 's';
        
        return animal;
    }
    
    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        
        // Crear gotas iniciales
        for (let i = 0; i < this.options.intensity; i++) {
            const drop = this.createRainDrop();
            this.rainContainer.appendChild(drop);
            this.drops.push(drop);
        }
        
        // Crear nubes iniciales
        for (let i = 0; i < this.options.cloudCount; i++) {
            const cloud = this.createCloud();
            this.cloudsContainer.appendChild(cloud);
            this.clouds.push(cloud);
        }
        
        // Crear árboles iniciales
        for (let i = 0; i < this.options.treeCount; i++) {
            const tree = this.createTree();
            this.forestContainer.appendChild(tree);
            this.trees.push(tree);
        }
        
        // Crear animales iniciales
        for (let i = 0; i < this.options.animalCount; i++) {
            const animal = this.createAnimal();
            this.forestContainer.appendChild(animal);
            this.animals.push(animal);
        }
        
        // Crear nuevas gotas periódicamente para mantener el efecto
        this.rainInterval = setInterval(() => {
            if (this.drops.length < this.options.intensity * 1.5) {
                const drop = this.createRainDrop();
                this.rainContainer.appendChild(drop);
                this.drops.push(drop);
                
                // Remover gotas después de que terminen su animación
                setTimeout(() => {
                    if (drop.parentNode) {
                        drop.parentNode.removeChild(drop);
                        const index = this.drops.indexOf(drop);
                        if (index > -1) {
                            this.drops.splice(index, 1);
                        }
                    }
                }, 4000); // Tiempo máximo de animación
            }
        }, 100);
        
        // Crear nuevas nubes periódicamente
        this.cloudsInterval = setInterval(() => {
            if (this.clouds.length < this.options.cloudCount * 2) {
                const cloud = this.createCloud();
                this.cloudsContainer.appendChild(cloud);
                this.clouds.push(cloud);
                
                // Remover nubes después de que terminen su animación
                setTimeout(() => {
                    if (cloud.parentNode) {
                        cloud.parentNode.removeChild(cloud);
                        const index = this.clouds.indexOf(cloud);
                        if (index > -1) {
                            this.clouds.splice(index, 1);
                        }
                    }
                }, 120000); // 2 minutos para que crucen la pantalla
            }
        }, 15000); // Nueva nube cada 15 segundos
        
        // Crear nuevos animales periódicamente
        this.animalsInterval = setInterval(() => {
            if (this.animals.length < this.options.animalCount * 3) {
                const animal = this.createAnimal();
                this.forestContainer.appendChild(animal);
                this.animals.push(animal);
                
                // Remover animales después de que terminen su animación
                setTimeout(() => {
                    if (animal.parentNode) {
                        animal.parentNode.removeChild(animal);
                        const index = this.animals.indexOf(animal);
                        if (index > -1) {
                            this.animals.splice(index, 1);
                        }
                    }
                }, 50000); // 50 segundos para cruzar la pantalla
            }
        }, 8000); // Nuevo animal cada 8 segundos
    }
    
    stop() {
        if (!this.isActive) return;
        
        this.isActive = false;
        
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
        }
        
        if (this.cloudsInterval) {
            clearInterval(this.cloudsInterval);
        }
        
        if (this.animalsInterval) {
            clearInterval(this.animalsInterval);
        }
        
        // Remover todas las gotas
        this.drops.forEach(drop => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        });
        this.drops = [];
        
        // Remover todas las nubes
        this.clouds.forEach(cloud => {
            if (cloud.parentNode) {
                cloud.parentNode.removeChild(cloud);
            }
        });
        this.clouds = [];
        
        // Remover todos los árboles
        this.trees.forEach(tree => {
            if (tree.parentNode) {
                tree.parentNode.removeChild(tree);
            }
        });
        this.trees = [];
        
        // Remover todos los animales
        this.animals.forEach(animal => {
            if (animal.parentNode) {
                animal.parentNode.removeChild(animal);
            }
        });
        this.animals = [];
    }
    
    adjustForScreenSize() {
        const screenWidth = window.innerWidth;
        
        // Ajustar intensidad según el ancho de pantalla
        if (screenWidth < 768) {
            this.options.intensity = 50; // Menos gotas en móviles
        } else if (screenWidth < 1200) {
            this.options.intensity = 75; // Intensidad media en tablets
        } else {
            this.options.intensity = 100; // Intensidad completa en desktop
        }
    }
    
    setIntensity(intensity) {
        this.options.intensity = intensity;
        this.adjustForScreenSize();
    }
    
    destroy() {
        this.stop();
        
        if (this.rainContainer && this.rainContainer.parentNode) {
            this.rainContainer.parentNode.removeChild(this.rainContainer);
        }
        
        if (this.cloudsContainer && this.cloudsContainer.parentNode) {
            this.cloudsContainer.parentNode.removeChild(this.cloudsContainer);
        }
        
        if (this.forestContainer && this.forestContainer.parentNode) {
            this.forestContainer.parentNode.removeChild(this.forestContainer);
        }
        
        if (this.mistElement && this.mistElement.parentNode) {
            this.mistElement.parentNode.removeChild(this.mistElement);
        }
        
        window.removeEventListener('resize', this.adjustForScreenSize);
    }
}

// Inicializar el efecto de lluvia cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear el efecto de lluvia con configuración por defecto
    window.rainEffect = new RainEffect({
        intensity: 80,
        speed: 'medium',
        wind: 8,
        cloudCount: 6,
        treeCount: 15,
        animalCount: 8
    });
});

// Exportar la clase para uso externo si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RainEffect;
} 