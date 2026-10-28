/**
 * Controlador de cambio de idiomas (ES / EN)
 * Traduce todos los elementos con data-translate, data-translate-placeholder
 * y data-translate-title. Guarda la preferencia en localStorage.
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
                // Menú
                'inicio': 'Inicio',
                'sobre-mi': 'Sobre mí',
                'servicios': 'Servicios',
                'experiencia': 'Experiencia',
                'certificaciones': 'Certificaciones',
                'proyectos': 'Proyectos',
                'blog': 'Blog',
                'contacto': 'Contacto',

                // Perfil
                'profile-title': 'Solutions Architect · AI & Data',

                // Hero
                'hero-role': 'Solutions Architect · AI · Data Engineer',
                'hero-description': 'Diseño arquitecturas multi-cloud seguras y escalables, construyo plataformas de datos y llevo soluciones de IA generativa a producción. AWS · GCP · Azure, agnóstico a la nube por diseño.',
                'ver-proyectos': 'Ver Mis Proyectos',
                'ver-linkedin': 'Ver LinkedIn',
                'ver-github': 'Ver más en GitHub',
                'volver-proyectos': 'Volver a proyectos',
                'otros-proyectos': 'Otros proyectos',
                'ver-detalle': 'Ver detalle',

                // Sobre mí
                'section-about': 'Sobre Mí',
                'about-greeting': '¡Hola! Soy Alexander 👋',
                'about-p1': 'Soy Arquitecto de Soluciones, Ingeniero de IA e Ingeniero de Datos en Quito, Ecuador. Me describo como un entusiasta de la tecnología y aprendiz de por vida. Diseño arquitecturas multi-cloud seguras, conscientes del costo y construidas para escalar.',
                'about-p2': 'Construyo plataformas de datos de extremo a extremo (ingesta → lakehouse → warehouse → analítica), llevo a producción soluciones de IA (aplicaciones con LLM, RAG, agentes y pipelines de MLOps) y automatizo todo con infraestructura como código, CI/CD y patrones orientados a eventos. Mi foco actual: GenAI en la nube y el modern data stack (BigQuery · Databricks · Snowflake).',
                'nombre': 'Nombre',
                'roles': 'Roles',
                'nubes': 'Nubes',
                'ubicacion': 'Ubicación',
                'email': 'Email',
                'foco': 'Foco actual',
                'foco-valor': 'GenAI en la nube + modern data stack',
                'contactame-btn': 'Contáctame',

                // Skills
                'section-skills': 'Stack Tecnológico',
                'skills-subtitle': 'Mismo plano, tres proveedores: elige la caja, conserva el patrón.',
                'skills-description': 'Trabajo con las herramientas del modern data stack y el ecosistema de IA generativa, desplegadas en AWS, Google Cloud o Azure según lo que el problema necesite.',
                'skill-1': 'Ingeniería de Datos',
                'skill-2': 'IA · GenAI',
                'skill-3': 'Cloud Multi-Cloud',
                'skill-4': 'Plataforma · Backend',

                // Facts
                'fact-1': 'Nubes (AWS · GCP · Azure)',
                'fact-2': 'Proyectos en el portafolio',
                'fact-3': 'Plataformas en producción',
                'fact-4': 'Años de experiencia',

                // Servicios
                'section-services': 'Qué Hago',
                'service-1-title': 'Arquitectura Multi-Cloud',
                'service-1-desc': 'Diseño de arquitecturas en AWS, GCP y Azure que son seguras, conscientes del costo y construidas para escalar.',
                'service-2-title': 'Plataformas de Datos',
                'service-2-desc': 'Ingesta → lakehouse → warehouse → analítica. Pipelines con Airflow, Spark, dbt y BigQuery que escalan.',
                'service-3-title': 'Soluciones con IA Generativa',
                'service-3-desc': 'Aplicaciones con LLM, RAG, agentes y asistentes con Claude, Gemini y Azure OpenAI, listos para producción.',
                'service-4-title': 'MLOps',
                'service-4-desc': 'Entrenamiento, versionado y despliegue de modelos con MLflow, Vertex AI, SageMaker y Azure ML.',
                'service-5-title': 'Automatización & IaC',
                'service-5-desc': 'Infraestructura como código, CI/CD y patrones orientados a eventos con Terraform, Cloud Build y GitHub Actions.',
                'service-6-title': 'Revisión de Arquitectura',
                'service-6-desc': 'Revisiones de arquitectura, selección de tecnologías, FinOps y colaboración en problemas interesantes.',

                // Experiencia
                'section-experience': 'Experiencia Profesional',
                'exp-1-title': 'Arquitecto de Soluciones · IA & Datos',
                'exp-1-period': 'Actualidad',
                'exp-1-desc': 'Diseño y construcción del ecosistema de plataformas de Siati Group en Google Cloud: SiatiVision (procesamiento de facturas con Gemini), SiatiSale (inteligencia comercial sobre BigQuery), SiatiFinance y Siatitracking. Integración con el ERP Atlas y Magaya, y despliegue continuo con Cloud Build y Cloud Run.',
                'exp-2-title': 'Consultoría y proyectos independientes',
                'exp-2-company': 'Freelance',
                'exp-2-period': 'Varios clientes',
                'exp-2-desc': 'Migración del ERP de Decoral desde Dolibarr a Odoo en contenedores Docker, y desarrollo de MasModul, una plataforma Django para modulación de muebles con cálculo de piezas y listas de corte.',
                'exp-3-title': 'Integración y ERP',
                'exp-3-period': 'Mantenimiento y evolución',
                'exp-3-desc': 'Módulos del ERP Atlas (OpenERP): courier, integración con Magaya, CRM, helpdesk y localización contable para Ecuador. Middleware en Azure que sincroniza transacciones de Magaya Cloud (SOAP) hacia Atlas vía XML-RPC.',

                // Certificaciones y multicloud
                'section-certifications': 'Certificaciones & Multicloud',
                'certificaciones-title': 'Certificaciones',
                'cert-1-name': 'Desarrollador de IA de IBM',
                'cert-1-badge': 'Profesional',
                'cert-note': 'Actualmente profundizo en patrones de IA agéntica, Lakehouse (Iceberg / Delta) y FinOps. Las certificaciones de nube se irán sumando aquí conforme se obtengan.',
                'multicloud-title': 'Mapa Multicloud',
                'multicloud-subtitle': 'Mismo plano, tres proveedores: elige la caja, conserva el patrón.',
                'mc-layer': 'Capa',
                'mc-compute': 'Cómputo',
                'mc-storage': 'Almacenamiento & Lake',
                'mc-warehouse': 'Warehouse',
                'mc-etl': 'ETL & Orquestación',
                'mc-ai': 'IA / ML',
                'mc-iac': 'IaC & Seguridad',

                // Proyectos
                'section-projects': 'Proyectos',
                'filter-all': 'Todos',
                'filter-ia': 'IA & LLM',
                'filter-data': 'Datos',
                'filter-backend': 'Backend',
                'filter-cloud': 'Cloud & DevOps',
                'filter-frontend': 'Frontend',
                'proj-siativision': 'Plataforma de IA para agentes aduaneros: lee facturas en PDF, extrae los ítems, traduce descripciones y sugiere la clasificación arancelaria.',
                'proj-siatisale': 'Inteligencia de mercado del comercio exterior y gestión comercial: cartera, prospectos, participación de mercado y asistentes con IA.',
                'proj-siatidata': 'Plataforma de datos en BigQuery con arquitectura medallion (bronze, silver, gold), ingesta por Cloud Storage y pipelines versionados en Dataform con pruebas de calidad.',
                'proj-siatifinance': 'Plataforma financiera modular: activos fijos, actas, depreciación, mantenimiento, toma física y portal del custodio.',
                'proj-siatitracking': 'Portal público de rastreo de envíos con línea de tiempo de eventos, sincronizado con los sistemas operativos del grupo.',
                'proj-masmodul': 'Modulación de muebles: clientes, proyectos, ambientes y módulos, con cálculo de piezas y listas de corte en Excel.',
                'proj-decoral': 'Migración del ERP de Decoral desde el antiguo Dolibarr a Odoo, con los datos cargados y la plataforma desplegada en contenedores Docker.',

                // Blog
                'blog-title': 'Notas de cloud y datos en dev.to',
                'blog-desc': 'Escribo sobre arquitectura multi-cloud, plataformas de datos, IA agéntica, Lakehouse (Iceberg / Delta) y FinOps. Sígueme para recibir los próximos artículos.',

                // Contacto
                'section-contact': 'Contáctame',
                'telefono': 'Teléfono',
                'contact-open': 'Abierto a revisiones de arquitectura, colaboraciones y problemas interesantes. Al enviar, se abrirá tu cliente de correo con el mensaje listo.',
                'enviar-mensaje': 'Enviar Mensaje',
                'tu-nombre': 'Nombre Apellido',
                'tu-email': 'correo@email.com',
                'asunto': 'Asunto',
                'tu-mensaje': 'Mensaje a enviar'
            },
            en: {
                // Menu
                'inicio': 'Home',
                'sobre-mi': 'About Me',
                'servicios': 'Services',
                'experiencia': 'Experience',
                'certificaciones': 'Certifications',
                'proyectos': 'Projects',
                'blog': 'Blog',
                'contacto': 'Contact',

                // Profile
                'profile-title': 'Solutions Architect · AI & Data',

                // Hero
                'hero-role': 'Solutions Architect · AI · Data Engineer',
                'hero-description': 'I design secure, scalable multi-cloud architectures, build data platforms and ship generative AI solutions to production. AWS · GCP · Azure, cloud-agnostic by design.',
                'ver-proyectos': 'View My Projects',
                'ver-linkedin': 'View LinkedIn',
                'ver-github': 'See more on GitHub',
                'volver-proyectos': 'Back to projects',
                'otros-proyectos': 'Other projects',
                'ver-detalle': 'View details',

                // About
                'section-about': 'About Me',
                'about-greeting': 'Hi! I\'m Alexander 👋',
                'about-p1': 'I am a Solutions Architect, AI Engineer and Data Engineer based in Quito, Ecuador. I describe myself as a technology enthusiast and life-long learner. I design multi-cloud architectures that are secure, cost-aware and built to scale.',
                'about-p2': 'I build end-to-end data platforms (ingestion → lakehouse → warehouse → analytics), ship AI solutions to production (LLM apps, RAG, agents and MLOps pipelines) and automate everything with infrastructure as code, CI/CD and event-driven patterns. Current focus: GenAI on the cloud and the modern data stack (BigQuery · Databricks · Snowflake).',
                'nombre': 'Name',
                'roles': 'Roles',
                'nubes': 'Clouds',
                'ubicacion': 'Location',
                'email': 'Email',
                'foco': 'Current focus',
                'foco-valor': 'GenAI on the cloud + modern data stack',
                'contactame-btn': 'Contact Me',

                // Skills
                'section-skills': 'Tech Stack',
                'skills-subtitle': 'Same blueprint, three providers: pick the box, keep the pattern.',
                'skills-description': 'I work with the modern data stack and the generative AI ecosystem, deployed on AWS, Google Cloud or Azure depending on what the problem needs.',
                'skill-1': 'Data Engineering',
                'skill-2': 'AI · GenAI',
                'skill-3': 'Multi-Cloud',
                'skill-4': 'Platform · Backend',

                // Facts
                'fact-1': 'Clouds (AWS · GCP · Azure)',
                'fact-2': 'Projects in the portfolio',
                'fact-3': 'Platforms in production',
                'fact-4': 'Years of experience',

                // Services
                'section-services': 'What I Do',
                'service-1-title': 'Multi-Cloud Architecture',
                'service-1-desc': 'Architectures on AWS, GCP and Azure that are secure, cost-aware and built to scale.',
                'service-2-title': 'Data Platforms',
                'service-2-desc': 'Ingestion → lakehouse → warehouse → analytics. Pipelines with Airflow, Spark, dbt and BigQuery that scale.',
                'service-3-title': 'Generative AI Solutions',
                'service-3-desc': 'LLM apps, RAG, agents and assistants with Claude, Gemini and Azure OpenAI, ready for production.',
                'service-4-title': 'MLOps',
                'service-4-desc': 'Model training, versioning and deployment with MLflow, Vertex AI, SageMaker and Azure ML.',
                'service-5-title': 'Automation & IaC',
                'service-5-desc': 'Infrastructure as code, CI/CD and event-driven patterns with Terraform, Cloud Build and GitHub Actions.',
                'service-6-title': 'Architecture Reviews',
                'service-6-desc': 'Architecture reviews, technology selection, FinOps and collaboration on interesting problems.',

                // Experience
                'section-experience': 'Professional Experience',
                'exp-1-title': 'Solutions Architect · AI & Data',
                'exp-1-period': 'Present',
                'exp-1-desc': 'Design and build of the Siati Group platform ecosystem on Google Cloud: SiatiVision (invoice processing with Gemini), SiatiSale (commercial intelligence on BigQuery), SiatiFinance and Siatitracking. Integration with the Atlas ERP and Magaya, continuous deployment with Cloud Build and Cloud Run.',
                'exp-2-title': 'Consulting and independent projects',
                'exp-2-company': 'Freelance',
                'exp-2-period': 'Several clients',
                'exp-2-desc': 'Migration of the Decoral ERP from Dolibarr to Odoo in Docker containers, and development of MasModul, a Django platform for furniture modulation with parts and cut-list calculation.',
                'exp-3-title': 'Integration and ERP',
                'exp-3-period': 'Maintenance and evolution',
                'exp-3-desc': 'Atlas ERP (OpenERP) modules: courier, Magaya integration, CRM, helpdesk and Ecuadorian accounting localization. Azure middleware that syncs Magaya Cloud transactions (SOAP) into Atlas via XML-RPC.',

                // Certifications and multicloud
                'section-certifications': 'Certifications & Multicloud',
                'certificaciones-title': 'Certifications',
                'cert-1-name': 'IBM AI Developer',
                'cert-1-badge': 'Professional',
                'cert-note': 'Currently going deeper into agentic AI patterns, Lakehouse (Iceberg / Delta) and FinOps. Cloud certifications will be added here as they are earned.',
                'multicloud-title': 'Multicloud Map',
                'multicloud-subtitle': 'Same blueprint, three providers: pick the box, keep the pattern.',
                'mc-layer': 'Layer',
                'mc-compute': 'Compute',
                'mc-storage': 'Storage & Lake',
                'mc-warehouse': 'Warehouse',
                'mc-etl': 'ETL & Orchestration',
                'mc-ai': 'AI / ML',
                'mc-iac': 'IaC & Security',

                // Projects
                'section-projects': 'Projects',
                'filter-all': 'All',
                'filter-ia': 'AI & LLM',
                'filter-data': 'Data',
                'filter-backend': 'Backend',
                'filter-cloud': 'Cloud & DevOps',
                'filter-frontend': 'Frontend',
                'proj-siativision': 'AI platform for customs brokers: reads PDF invoices, extracts line items, translates descriptions and suggests the tariff classification.',
                'proj-siatisale': 'Foreign-trade market intelligence and sales management: portfolio, prospects, market share and AI assistants.',
                'proj-siatidata': 'Data platform on BigQuery with a medallion architecture (bronze, silver, gold), Cloud Storage ingestion and versioned Dataform pipelines with quality tests.',
                'proj-siatifinance': 'Modular finance platform: fixed assets, records, depreciation, maintenance, physical counts and custodian portal.',
                'proj-siatitracking': 'Public shipment-tracking portal with an event timeline, synced with the group\'s operational systems.',
                'proj-masmodul': 'Furniture modulation: clients, projects, rooms and modules, with part calculation and cut lists in Excel.',
                'proj-decoral': 'Migration of the Decoral ERP from the legacy Dolibarr to Odoo, with data loaded and the platform deployed in Docker containers.',

                // Blog
                'blog-title': 'Cloud & data notes on dev.to',
                'blog-desc': 'I write about multi-cloud architecture, data platforms, agentic AI, Lakehouse (Iceberg / Delta) and FinOps. Follow me to get the next articles.',

                // Contact
                'section-contact': 'Contact Me',
                'telefono': 'Phone',
                'contact-open': 'Open to architecture reviews, collaborations and interesting problems. On submit, your email client will open with the message ready to send.',
                'enviar-mensaje': 'Send Message',
                'tu-nombre': 'First Last name',
                'tu-email': 'email@example.com',
                'asunto': 'Subject',
                'tu-mensaje': 'Your message'
            }
        };
    }

    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        } else {
            const browserLang = (navigator.language || 'es').substring(0, 2);
            if (this.translations[browserLang]) {
                this.currentLanguage = browserLang;
            }
        }
    }

    setupLanguageButtons() {
        this.languageButtons = document.querySelectorAll('.language-btn');
        var toggle = document.getElementById('lang-toggle-btn');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeLanguage(this.currentLanguage === 'es' ? 'en' : 'es');
            });
        }
        this.updateActiveButton();
        if (this.languageButtons.length === 0) { return; }

        this.languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeLanguage(btn.getAttribute('data-lang'));
            });
        });

        this.updateActiveButton();
    }

    changeLanguage(language) {
        if (!this.translations[language]) { return; }
        this.currentLanguage = language;
        this.applyLanguage(language);
        this.saveLanguage(language);
        this.updateActiveButton();
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
    }

    applyLanguage(language) {
        const t = this.translations[language];

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key] !== undefined) { el.textContent = t[key]; }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (t[key] !== undefined) { el.setAttribute('placeholder', t[key]); }
        });

        document.querySelectorAll('[data-translate-title]').forEach(el => {
            const key = el.getAttribute('data-translate-title');
            if (t[key] !== undefined) { el.setAttribute('title', t[key]); }
        });

        document.documentElement.setAttribute('lang', language === 'es' ? 'es-ES' : 'en-US');
    }

    updateActiveButton() {
        document.documentElement.setAttribute('data-lang', this.currentLanguage);
        var toggle = document.getElementById('lang-toggle-btn');
        if (toggle) { toggle.setAttribute('aria-label', this.currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a español'); }
        this.languageButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLanguage);
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
        return (this.translations[lang] && this.translations[lang][key]) || key;
    }

    addTranslations(newTranslations) {
        Object.keys(newTranslations).forEach(lang => {
            if (!this.translations[lang]) { this.translations[lang] = {}; }
            Object.assign(this.translations[lang], newTranslations[lang]);
        });
    }
}

const languageSwitcher = new LanguageSwitcher();
window.languageSwitcher = languageSwitcher;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
}
