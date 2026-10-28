/**
 * Datos de los proyectos (ES / EN) para las páginas de detalle (project.html).
 * Nivel general: qué hace cada proyecto y con qué tecnologías, sin detalles internos.
 * Para añadir capturas: coloca imágenes en images/projects/<slug>/ y lístalas en "screens".
 * La arquitectura en la nube y el proyecto Siatidata están en js/projects-architecture.js.
 */
window.PROJECTS = [
    {
        slug: 'siativision',
        name: 'SiatiVision',
        cover: 'images/projects/siativision.svg',
        category: { es: 'IA · Comercio exterior', en: 'AI · Foreign trade' },
        tagline: {
            es: 'Plataforma inteligente de comercio exterior: clasificación arancelaria asistida por IA.',
            en: 'Intelligent foreign-trade platform: AI-assisted tariff classification.'
        },
        role: { es: 'Arquitectura, desarrollo e IA', en: 'Architecture, development and AI' },
        status: { es: 'En producción', en: 'In production' },
        description: {
            es: [
                'SiatiVision ayuda a los agentes aduaneros a procesar facturas comerciales. Recibe los documentos en PDF, extrae automáticamente los ítems con IA generativa, traduce las descripciones y sugiere la clasificación arancelaria de cada línea.',
                'El resultado se revisa en la plataforma y se exporta en el formato que exige la aduana, reduciendo horas de trabajo manual por declaración.'
            ],
            en: [
                'SiatiVision helps customs brokers process commercial invoices. It receives PDF documents, automatically extracts line items with generative AI, translates descriptions and suggests the tariff classification for each line.',
                'Results are reviewed in the platform and exported in the format required by customs, saving hours of manual work per declaration.'
            ]
        },
        features: {
            es: ['Lectura automática de facturas en PDF con IA', 'Traducción de descripciones', 'Sugerencia de clasificación arancelaria', 'Exportación en formato oficial', 'Procesamiento en segundo plano y despliegue continuo'],
            en: ['Automatic PDF invoice reading with AI', 'Description translation', 'Tariff classification suggestions', 'Export in the official format', 'Background processing and continuous deployment']
        },
        stack: ['Python', 'Django', 'IA generativa (Gemini)', 'PostgreSQL', 'Google Cloud'],
        screens: [
            { src: 'images/projects/siativision/01-login.jpg', caption: { es: 'Pantalla de acceso', en: 'Login screen' } }
        ]
    },
    {
        slug: 'siatisale',
        name: 'SiatiSale',
        cover: 'images/projects/siatisale.svg',
        category: { es: 'Datos · Comercial', en: 'Data · Sales' },
        tagline: {
            es: 'Inteligencia de mercado del comercio exterior y gestión comercial en una sola plataforma.',
            en: 'Foreign-trade market intelligence and sales management in one platform.'
        },
        role: { es: 'Arquitectura de datos, desarrollo y despliegue', en: 'Data architecture, development and deployment' },
        status: { es: 'En producción', en: 'In production' },
        description: {
            es: [
                'SiatiSale convierte los datos de importaciones y exportaciones del país en herramientas para el equipo comercial: cartera de clientes, prospectos, participación de mercado, precios y análisis por aduana, agente y modo de transporte.',
                'La analítica se apoya en la plataforma de datos Siatidata, e incluye asistentes con IA que resumen cuentas y sugieren acciones comerciales.'
            ],
            en: [
                'SiatiSale turns the country\'s import and export data into tools for the sales team: client portfolio, prospects, market share, pricing and analysis by customs office, agent and transport mode.',
                'Analytics are powered by the Siatidata platform, and AI assistants summarize accounts and suggest sales actions.'
            ]
        },
        features: {
            es: ['Cartera, prospectos y asignación de asesores', 'Participación y precios de mercado', 'Análisis por aduana, agente y transporte', 'Buscador de importadores y agentes', 'Asistentes con IA para el equipo comercial'],
            en: ['Portfolio, prospects and advisor assignment', 'Market share and pricing', 'Analysis by customs office, agent and transport', 'Importer and agent search', 'AI assistants for the sales team']
        },
        stack: ['Next.js', 'TypeScript', 'BigQuery', 'PostgreSQL', 'IA generativa (Gemini)', 'Google Cloud'],
        screens: [
            { src: 'images/projects/siatisale/01-cartera.jpg', caption: { es: 'Módulo de cartera con filtros', en: 'Portfolio module with filters' } }
        ]
    },
    {
        slug: 'siatifinance',
        name: 'SiatiFinance',
        cover: 'images/projects/siatifinance.svg',
        category: { es: 'Backend · Finanzas', en: 'Backend · Finance' },
        tagline: {
            es: 'Plataforma financiera interna. Primer módulo: control de activos fijos.',
            en: 'Internal finance platform. First module: fixed-asset control.'
        },
        role: { es: 'Arquitectura, desarrollo y despliegue', en: 'Architecture, development and deployment' },
        status: { es: 'En producción', en: 'In production' },
        description: {
            es: [
                'SiatiFinance es la plataforma financiera de las empresas del grupo. Su módulo de Activos Fijos cubre el ciclo completo: inventario con etiquetas, custodios, actas firmadas, depreciación, mantenimiento, toma física y un portal donde cada responsable consulta lo que tiene a cargo.',
                'Está construida como un monolito modular con una API para integraciones, de modo que nuevos módulos financieros se suman sin rehacer la base.'
            ],
            en: [
                'SiatiFinance is the finance platform for the group companies. Its Fixed Assets module covers the full cycle: labeled inventory, custodians, signed records, depreciation, maintenance, physical counts and a portal where each person checks what they are responsible for.',
                'It is built as a modular monolith with an API for integrations, so new finance modules can be added without rebuilding the core.'
            ]
        },
        features: {
            es: ['Inventario de activos con etiquetas y códigos QR', 'Actas de entrega y devolución', 'Depreciación y mantenimiento', 'Toma física de inventario', 'Portal del custodio y API para integraciones'],
            en: ['Asset inventory with labels and QR codes', 'Hand-over and return records', 'Depreciation and maintenance', 'Physical inventory counts', 'Custodian portal and integration API']
        },
        stack: ['Python', 'Django', 'API REST', 'PostgreSQL', 'Google Cloud'],
        screens: [
            { src: 'images/projects/siatifinance/01-login.jpg', caption: { es: 'Acceso a la plataforma', en: 'Platform login' } }
        ]
    },
    {
        slug: 'siatitracking',
        name: 'Siatitracking',
        cover: 'images/projects/siatitracking.svg',
        category: { es: 'Backend · Logística', en: 'Backend · Logistics' },
        tagline: {
            es: 'Tu envío, siempre visible: portal público de rastreo con línea de tiempo.',
            en: 'Your shipment, always visible: public tracking portal with a timeline.'
        },
        role: { es: 'Diseño, desarrollo y despliegue', en: 'Design, development and deployment' },
        status: { es: 'En producción', en: 'In production' },
        description: {
            es: [
                'Siatitracking permite a los clientes consultar el estado de sus envíos sin iniciar sesión. Con el número de guía ven una línea de tiempo con cada evento, desde la recepción en origen hasta la entrega en Ecuador.',
                'Los eventos se sincronizan automáticamente desde los sistemas operativos del grupo y el portal es rápido y ligero, pensado para usarse desde el teléfono.'
            ],
            en: [
                'Siatitracking lets customers check their shipment status without logging in. With the tracking number they see a timeline of every event, from reception at origin to delivery in Ecuador.',
                'Events are synced automatically from the group\'s operational systems and the portal is fast and lightweight, designed for use on the phone.'
            ]
        },
        features: {
            es: ['Consulta pública por número de guía', 'Línea de tiempo de eventos', 'Sincronización automática con los sistemas de origen', 'Instalable como app en el teléfono'],
            en: ['Public lookup by tracking number', 'Event timeline', 'Automatic sync with source systems', 'Installable as an app on the phone']
        },
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Google Cloud'],
        screens: [
            { src: 'images/projects/siatitracking/01-logo.png', caption: { es: 'Identidad del portal', en: 'Portal identity' } }
        ]
    },
    {
        slug: 'masmodul',
        name: 'MasModul',
        cover: 'images/projects/masmodul.svg',
        category: { es: 'Web · Manufactura', en: 'Web · Manufacturing' },
        tagline: {
            es: 'Modulación de muebles: de clientes y ambientes a piezas y listas de corte.',
            en: 'Furniture modulation: from clients and rooms to parts and cut lists.'
        },
        role: { es: 'Proyecto independiente: diseño, desarrollo y entrega', en: 'Independent project: design, development and delivery' },
        status: { es: 'Entregado', en: 'Delivered' },
        description: {
            es: [
                'MasModul organiza el trabajo de un taller de muebles modulares. Cada cliente tiene proyectos, cada proyecto ambientes y cada ambiente módulos con sus medidas y materiales.',
                'A partir de esa estructura la aplicación calcula las piezas de cada módulo y genera la lista de corte en Excel, lista para producción.'
            ],
            en: [
                'MasModul organizes the work of a modular-furniture workshop. Each client has projects, each project has rooms and each room has modules with their dimensions and materials.',
                'From that structure the app computes the parts of each module and generates the cut list in Excel, ready for production.'
            ]
        },
        features: {
            es: ['Clientes, proyectos, ambientes y módulos', 'Cálculo automático de piezas', 'Listas de corte en Excel', 'Catálogo de módulos con imágenes'],
            en: ['Clients, projects, rooms and modules', 'Automatic part calculation', 'Cut lists in Excel', 'Module catalog with images']
        },
        stack: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS'],
        screens: []
    },
    {
        slug: 'erp-decoral',
        name: 'ERP Decoral',
        cover: 'images/projects/erp-decoral.svg',
        category: { es: 'Cloud · ERP', en: 'Cloud · ERP' },
        tagline: {
            es: 'Migración del ERP de Decoral: del antiguo Dolibarr a Odoo en contenedores.',
            en: 'Decoral ERP migration: from the legacy Dolibarr to Odoo in containers.'
        },
        role: { es: 'Consultoría: análisis, migración, despliegue y puesta en marcha', en: 'Consulting: analysis, migration, deployment and go-live' },
        status: { es: 'Entregado', en: 'Delivered' },
        description: {
            es: [
                'Decoral, una empresa del sector decoración, operaba con un Dolibarr antiguo difícil de actualizar y respaldar. El proyecto lo reemplazó por Odoo como nuevo ERP del negocio.',
                'Se migraron terceros, productos, ventas, compras y facturación al nuevo sistema, desplegado en contenedores con un entorno reproducible para pruebas y producción.'
            ],
            en: [
                'Decoral, a company in the decoration sector, ran an old Dolibarr that was hard to upgrade and back up. The project replaced it with Odoo as the business\'s new ERP.',
                'Partners, products, sales, purchases and invoicing were migrated to the new system, deployed in containers with a reproducible environment for test and production.'
            ]
        },
        features: {
            es: ['Análisis del sistema heredado', 'Migración de datos a Odoo', 'Despliegue en contenedores', 'Entorno reproducible para pruebas y producción'],
            en: ['Legacy system analysis', 'Data migration to Odoo', 'Container deployment', 'Reproducible environment for test and production']
        },
        stack: ['Odoo', 'Python', 'PostgreSQL', 'Docker', 'Linux'],
        screens: []
    }
];
