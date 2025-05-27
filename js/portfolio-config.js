/**
 * Configuración del Portafolio
 * Personaliza fácilmente tu portafolio editando estos valores
 */

const PortfolioConfig = {
    // Información personal
    personal: {
        name: "Alexander Coral",
        title: "Ingeniero de Software Full Stack",
        email: "alex.coral.dev@gmail.com",
        phone: "+593 99 123 4567",
        location: "Quito, Ecuador",
        website: "https://p4codev.github.io",
        profileImage: "/images/Foto-Perfil.png"
    },

    // Redes sociales
    social: {
        github: "https://github.com/p4codev",
        linkedin: "https://www.linkedin.com/in/pacodev/",
        twitter: "https://x.com/PacoDev",
        facebook: "https://www.facebook.com/p4codev",
        stackoverflow: "https://stackoverflow.com/users/16920816/pacodev"
    },

    // Configuración de efectos visuales
    effects: {
        rainEffect: {
            enabled: true,
            intensity: 80,
            speed: 'medium'
        },
        particles: {
            enabled: true,
            count: 20
        },
        animations: {
            enabled: true,
            duration: 800
        },
        glassmorphism: {
            enabled: true,
            blur: 10
        }
    },

    // Configuración de temas
    theme: {
        defaultTheme: 'auto', // 'light', 'dark', 'auto'
        colors: {
            light: {
                primary: '#3b82f6',
                secondary: '#8b5cf6',
                background: '#f8fafc',
                text: '#1e293b'
            },
            dark: {
                primary: '#8b5cf6',
                secondary: '#3b82f6',
                background: '#0f172a',
                text: '#f1f5f9'
            }
        }
    },

    // Habilidades técnicas
    skills: [
        {
            category: "Frontend Development",
            technologies: "React.js, Vue.js, TypeScript, Next.js, Tailwind CSS, Material-UI",
            percentage: 92
        },
        {
            category: "Backend Development",
            technologies: "Node.js, Python, Express.js, Django, FastAPI, RESTful APIs, GraphQL",
            percentage: 88
        },
        {
            category: "Cloud & DevOps",
            technologies: "AWS, Docker, Kubernetes, CI/CD, Terraform, Jenkins, GitHub Actions",
            percentage: 85
        },
        {
            category: "Bases de Datos",
            technologies: "PostgreSQL, MongoDB, Redis, MySQL, Elasticsearch, DynamoDB",
            percentage: 90
        }
    ],

    // Servicios
    services: [
        {
            icon: "icon-screen-desktop",
            title: "Desarrollo Web Full Stack",
            description: "Aplicaciones web completas desde el frontend hasta el backend, con arquitecturas modernas y escalables."
        },
        {
            icon: "icon-phone",
            title: "Aplicaciones Móviles",
            description: "Desarrollo de apps nativas y híbridas para iOS y Android usando React Native y Flutter."
        },
        {
            icon: "icon-cloud-upload",
            title: "Soluciones Cloud",
            description: "Migración y despliegue en AWS, configuración de infraestructura como código y DevOps."
        },
        {
            icon: "icon-settings",
            title: "APIs & Microservicios",
            description: "Diseño e implementación de APIs RESTful y GraphQL, arquitecturas de microservicios escalables."
        },
        {
            icon: "icon-speedometer",
            title: "Optimización & Performance",
            description: "Auditorías de rendimiento, optimización de bases de datos y mejora de velocidad de carga."
        },
        {
            icon: "icon-graduation",
            title: "Consultoría Técnica",
            description: "Asesoramiento en arquitectura de software, selección de tecnologías y mejores prácticas."
        }
    ],

    // Proyectos destacados
    projects: [
        {
            title: "E-Commerce Platform",
            technologies: "React, Node.js, MongoDB",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://github.com/p4codev/ecommerce-platform",
            category: ["creative", "design"]
        },
        {
            title: "Task Management App",
            technologies: "Vue.js, Express, PostgreSQL",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://github.com/p4codev/task-management-app",
            category: ["branding", "video"]
        },
        {
            title: "Weather Dashboard",
            technologies: "React, TypeScript, API",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://github.com/p4codev/weather-dashboard",
            category: ["design", "creative"]
        }
    ],

    // Estadísticas
    stats: [
        {
            icon: "icon-briefcase",
            number: 50,
            label: "Proyectos Completados"
        },
        {
            icon: "icon-users",
            number: 25,
            label: "Clientes Satisfechos"
        },
        {
            icon: "icon-code",
            number: 100000,
            label: "Líneas de Código"
        },
        {
            icon: "icon-trophy",
            number: 5,
            label: "Años de Experiencia"
        }
    ],

    // Testimonios
    testimonials: [
        {
            name: "Carlos Mendoza",
            position: "CEO, TechCommerce",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
            text: "Alexander transformó completamente nuestra plataforma e-commerce. Su expertise en React y Node.js nos ayudó a aumentar las ventas en un 150%. Altamente recomendado."
        },
        {
            name: "María González",
            position: "CTO, InnovateApp",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
            text: "Trabajar con Alexander fue una experiencia excepcional. Su conocimiento en arquitecturas cloud y DevOps nos permitió escalar nuestra aplicación sin problemas."
        },
        {
            name: "Roberto Silva",
            position: "Fundador, StartupTech",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
            text: "La calidad del código y la atención al detalle de Alexander son impresionantes. Entregó nuestro proyecto antes del plazo y superó todas nuestras expectativas."
        },
        {
            name: "Ana Rodríguez",
            position: "Product Manager, DataFlow",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
            text: "Su expertise en Python y Django nos ayudó a crear una API robusta y escalable. Alexander es definitivamente un desarrollador de clase mundial."
        }
    ],

    // Artículos del blog
    blogPosts: [
        {
            title: "Arquitectura de Microservicios con Node.js",
            category: "Arquitectura",
            date: "15 Enero, 2024",
            author: "Alexander Coral",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://medium.com/@alex.coral.dev/microservices-architecture"
        },
        {
            title: "Optimización de Performance en React",
            category: "Frontend",
            date: "8 Diciembre, 2023",
            author: "Alexander Coral",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://dev.to/alexcoral/react-performance-optimization"
        },
        {
            title: "Guía Completa de Despliegue en AWS",
            category: "DevOps",
            date: "22 Noviembre, 2023",
            author: "Alexander Coral",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "https://hashnode.com/@alexcoral/aws-deployment-guide"
        }
    ],

    // Certificaciones
    certifications: [
        {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "Válida hasta 2025",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        },
        {
            name: "React Developer Certification",
            issuer: "Meta (Facebook)",
            date: "2023",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        },
        {
            name: "Python Professional Developer",
            issuer: "Python Institute",
            date: "2022",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        },
        {
            name: "Docker Certified Associate",
            issuer: "Docker Inc.",
            date: "2023",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        },
        {
            name: "Kubernetes Administrator (CKA)",
            issuer: "Cloud Native Computing Foundation",
            date: "2024",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        }
    ],

    // Configuración de SEO
    seo: {
        title: "Alexander Coral - Ingeniero de Software Full Stack",
        description: "Portafolio profesional de Alexander Coral, Ingeniero de Software Full Stack especializado en React, Node.js, Python y AWS. Más de 5 años de experiencia.",
        keywords: "desarrollador full stack, react, node.js, python, aws, ingeniero software, quito ecuador",
        author: "Alexander Coral",
        image: "https://p4codev.github.io/images/og-image.jpg"
    }
};

// Exportar configuración para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioConfig;
} else {
    window.PortfolioConfig = PortfolioConfig;
} 