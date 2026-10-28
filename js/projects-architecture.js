/**
 * Arquitectura en la nube de cada proyecto (nivel general: servicios y patrón,
 * sin identificadores de proyecto, buckets, instancias ni secretos).
 * También registra el proyecto Siatidata (plataforma de datos).
 *
 * Formato: architecture = { flow: [ { icon, label:{es,en}, detail:{es,en} } ], notes:{es:[],en:[]} }
 */
(function () {
    'use strict';

    var ARCH = {
        siativision: {
            flow: [
                { icon: 'gcp-cloud-build', label: { es: 'Cloud Build', en: 'Cloud Build' }, detail: { es: 'CI/CD: cada push construye la imagen y despliega', en: 'CI/CD: every push builds the image and deploys' } },
                { icon: 'gcp-cloud-run', label: { es: 'Cloud Run', en: 'Cloud Run' }, detail: { es: 'Django + Celery workers en contenedores', en: 'Django + Celery workers in containers' } },
                { icon: 'redis', label: { es: 'Redis', en: 'Redis' }, detail: { es: 'Cola de tareas de procesamiento', en: 'Processing task queue' } },
                { icon: 'gemini', label: { es: 'Gemini / Vertex AI', en: 'Gemini / Vertex AI' }, detail: { es: 'Extracción, traducción y clasificación', en: 'Extraction, translation and classification' } },
                { icon: 'postgresql', label: { es: 'Cloud SQL + pgvector', en: 'Cloud SQL + pgvector' }, detail: { es: 'Datos y búsqueda semántica', en: 'Data and semantic search' } }
            ],
            notes: {
                es: ['Los PDF se suben desde la app y se procesan de forma asíncrona; el usuario ve el avance en la plataforma.', 'Las credenciales viven en Secret Manager y los servicios se autentican entre sí con cuentas de servicio de GCP.', 'Cloud Run escala a cero fuera de horario y escala horizontalmente en picos de carga.'],
                en: ['PDFs are uploaded from the app and processed asynchronously; users follow progress in the platform.', 'Credentials live in Secret Manager and services authenticate with GCP service accounts.', 'Cloud Run scales to zero off-hours and scales out on load peaks.']
            }
        },
        siatisale: {
            flow: [
                { icon: 'github', label: { es: 'GitHub → Cloud Build', en: 'GitHub → Cloud Build' }, detail: { es: 'Typecheck, lint, imagen Docker y despliegue', en: 'Typecheck, lint, Docker image and deploy' } },
                { icon: 'gcp-cloud-run', label: { es: 'Cloud Run', en: 'Cloud Run' }, detail: { es: 'Next.js (App Router) en contenedor', en: 'Next.js (App Router) in a container' } },
                { icon: 'postgresql', label: { es: 'Cloud SQL (Postgres)', en: 'Cloud SQL (Postgres)' }, detail: { es: 'BD operativa: usuarios, cartera, asignaciones', en: 'Operational DB: users, portfolio, assignments' } },
                { icon: 'gcp-bigquery', label: { es: 'BigQuery (gold)', en: 'BigQuery (gold)' }, detail: { es: 'Marts de mercado y ventas desde Siatidata', en: 'Market and sales marts from Siatidata' } },
                { icon: 'gemini', label: { es: 'Gemini', en: 'Gemini' }, detail: { es: 'Asistentes de cliente y de mercado', en: 'Client and market assistants' } }
            ],
            notes: {
                es: ['La app solo lee la capa gold de BigQuery; nunca toca bronze ni silver.', 'Cloud Scheduler dispara tareas programadas (sincronización con el ERP) a través de un endpoint protegido.', 'Secretos en Secret Manager; BigQuery se consulta con credenciales por defecto de la aplicación, sin llaves JSON.'],
                en: ['The app only reads the gold layer in BigQuery; it never touches bronze or silver.', 'Cloud Scheduler triggers scheduled jobs (ERP sync) through a protected endpoint.', 'Secrets in Secret Manager; BigQuery is queried with application default credentials, no JSON keys.']
            }
        },
        siatidata: {
            flow: [
                { icon: 'gcp-cloud-storage', label: { es: 'Cloud Storage', en: 'Cloud Storage' }, detail: { es: 'Ingesta de archivos crudos, particionados por año/mes', en: 'Raw file ingestion, partitioned by year/month' } },
                { icon: 'gcp-bigquery', label: { es: 'Bronze', en: 'Bronze' }, detail: { es: 'Tablas externas sobre GCS, todo como texto', en: 'External tables over GCS, everything as text' } },
                { icon: 'transform', label: { es: 'Dataform', en: 'Dataform' }, detail: { es: 'SQLX versionado, dependencias y assertions', en: 'Versioned SQLX, dependencies and assertions' } },
                { icon: 'gcp-bigquery', label: { es: 'Silver', en: 'Silver' }, detail: { es: 'Tipado, deduplicado y particionado', en: 'Typed, deduplicated and partitioned' } },
                { icon: 'gcp-bigquery', label: { es: 'Gold', en: 'Gold' }, detail: { es: 'Marts de negocio y vistas autorizadas', en: 'Business marts and authorized views' } },
                { icon: 'powerbi', label: { es: 'Consumo', en: 'Consumption' }, detail: { es: 'SiatiSale, Power BI y asistentes con IA', en: 'SiatiSale, Power BI and AI assistants' } }
            ],
            notes: {
                es: ['Arquitectura medallion: bronze conserva el dato crudo tal cual llega; silver lo limpia y tipa; gold lo modela para negocio.', 'Cada transformación es un archivo SQLX en Dataform con sus dependencias explícitas y pruebas de calidad (no nulos, unicidad).', 'Las aplicaciones consumen solo gold mediante vistas autorizadas, de modo que los datos crudos nunca quedan expuestos.'],
                en: ['Medallion architecture: bronze keeps raw data as it arrives; silver cleans and types it; gold models it for the business.', 'Every transformation is a SQLX file in Dataform with explicit dependencies and quality assertions (not null, uniqueness).', 'Applications consume gold only through authorized views, so raw data is never exposed.']
            }
        },
        siatifinance: {
            flow: [
                { icon: 'github', label: { es: 'Repo → Cloud Build', en: 'Repo → Cloud Build' }, detail: { es: 'Pruebas con pytest, imagen y despliegue', en: 'pytest tests, image and deploy' } },
                { icon: 'gcp-cloud-run', label: { es: 'Cloud Run', en: 'Cloud Run' }, detail: { es: 'Django + DRF (API con JWT)', en: 'Django + DRF (JWT API)' } },
                { icon: 'redis', label: { es: 'Redis + Celery', en: 'Redis + Celery' }, detail: { es: 'Depreciación y tareas programadas', en: 'Depreciation and scheduled jobs' } },
                { icon: 'postgresql', label: { es: 'Cloud SQL (Postgres 17)', en: 'Cloud SQL (Postgres 17)' }, detail: { es: 'Datos de activos, actas y custodios', en: 'Assets, records and custodians' } },
                { icon: 'gcp-cloud-storage', label: { es: 'Cloud Storage', en: 'Cloud Storage' }, detail: { es: 'Actas firmadas y adjuntos', en: 'Signed records and attachments' } }
            ],
            notes: {
                es: ['Monolito modular: cada módulo (activos fijos, repuestos) es una app Django independiente dentro del mismo despliegue.', 'Las decisiones de arquitectura están documentadas como ADRs en el repositorio.', 'Dominio propio bajo el grupo y acceso restringido a usuarios internos.'],
                en: ['Modular monolith: each module (fixed assets, spare parts) is an independent Django app within the same deployment.', 'Architecture decisions are documented as ADRs in the repository.', 'Own domain under the group and access restricted to internal users.']
            }
        },
        siatitracking: {
            flow: [
                { icon: 'docker', label: { es: 'Docker', en: 'Docker' }, detail: { es: 'Imagen construida con Cloud Build', en: 'Image built with Cloud Build' } },
                { icon: 'gcp-cloud-run', label: { es: 'Cloud Run', en: 'Cloud Run' }, detail: { es: 'FastAPI + Jinja2 + HTMX', en: 'FastAPI + Jinja2 + HTMX' } },
                { icon: 'postgresql', label: { es: 'PostgreSQL', en: 'PostgreSQL' }, detail: { es: 'Envíos y eventos (SQLAlchemy async)', en: 'Shipments and events (async SQLAlchemy)' } },
                { icon: 'redis', label: { es: 'Redis', en: 'Redis' }, detail: { es: 'Caché de consultas públicas', en: 'Cache for public lookups' } },
                { icon: 'clockify', label: { es: 'APScheduler', en: 'APScheduler' }, detail: { es: 'Sincroniza eventos desde los sistemas origen', en: 'Syncs events from source systems' } }
            ],
            notes: {
                es: ['Portal público sin autenticación: las consultas se limitan por número de guía y se cachean para proteger la base de datos.', 'PWA instalable en el teléfono para seguimiento rápido.'],
                en: ['Public portal without authentication: lookups are limited by tracking number and cached to protect the database.', 'Installable PWA for quick tracking on the phone.']
            }
        },
        masmodul: {
            flow: [
                { icon: 'django', label: { es: 'Django 5.2', en: 'Django 5.2' }, detail: { es: 'Modelos cliente → proyecto → ambiente → módulo', en: 'Client → project → room → module models' } },
                { icon: 'tailwind', label: { es: 'Tailwind + Alpine.js', en: 'Tailwind + Alpine.js' }, detail: { es: 'Interfaz ligera sin build pesado', en: 'Lightweight UI without a heavy build' } },
                { icon: 'postgresql', label: { es: 'PostgreSQL / SQLite', en: 'PostgreSQL / SQLite' }, detail: { es: 'Según el tamaño del taller', en: 'Depending on the workshop size' } },
                { icon: 'python', label: { es: 'pandas + openpyxl', en: 'pandas + openpyxl' }, detail: { es: 'Cálculo de piezas y Excel de corte', en: 'Part calculation and cut-list Excel' } }
            ],
            notes: {
                es: ['Pensado para instalarse en un servidor del cliente o en una VM pequeña; no depende de servicios gestionados.'],
                en: ['Designed to run on the client\'s server or a small VM; no managed services required.']
            }
        },
        'erp-decoral': {
            flow: [
                { icon: 'php', label: { es: 'Dolibarr (legado)', en: 'Dolibarr (legacy)' }, detail: { es: 'Sistema antiguo: origen de los datos', en: 'Old system: data source' } },
                { icon: 'python', label: { es: 'Scripts de migración', en: 'Migration scripts' }, detail: { es: 'Extracción, limpieza y carga en Odoo', en: 'Extract, clean and load into Odoo' } },
                { icon: 'docker', label: { es: 'Docker Compose', en: 'Docker Compose' }, detail: { es: 'Orquesta Odoo y la base de datos', en: 'Orchestrates Odoo and the database' } },
                { icon: 'odoo', label: { es: 'Odoo', en: 'Odoo' }, detail: { es: 'Nuevo ERP: ventas, compras, inventario, facturación', en: 'New ERP: sales, purchases, inventory, invoicing' } },
                { icon: 'postgresql', label: { es: 'PostgreSQL', en: 'PostgreSQL' }, detail: { es: 'Volumen persistente con los datos migrados', en: 'Persistent volume with migrated data' } }
            ],
            notes: {
                es: ['Los datos viven en volúmenes separados de los contenedores: actualizar Odoo es cambiar la imagen.', 'El Dolibarr antiguo se conserva contenerizado y en modo lectura como respaldo histórico.'],
                en: ['Data lives in volumes separate from the containers: upgrading Odoo is just swapping the image.', 'The old Dolibarr is kept containerized in read-only mode as a historical backup.']
            }
        }
    };

    var SIATIDATA = {
        slug: 'siatidata',
        name: 'Siatidata',
        cover: 'images/projects/siatidata.svg',
        category: { es: 'Datos · Lakehouse', en: 'Data · Lakehouse' },
        tagline: {
            es: 'Plataforma de datos del grupo en BigQuery con arquitectura medallion y pipelines en Dataform.',
            en: 'The group\'s data platform on BigQuery with a medallion architecture and Dataform pipelines.'
        },
        role: { es: 'Arquitectura de datos, modelado y pipelines', en: 'Data architecture, modeling and pipelines' },
        status: { es: 'En producción', en: 'In production' },
        description: {
            es: [
                'Siatidata centraliza en BigQuery los datos del comercio exterior ecuatoriano y los datos propios del grupo, y los convierte en información lista para usar por aplicaciones, tableros y asistentes con IA.',
                'Los archivos se ingieren en Cloud Storage y pasan por tres capas: bronze (dato crudo), silver (limpio y tipado) y gold (modelado para negocio). Las transformaciones están versionadas en Dataform con pruebas de calidad, y las aplicaciones consumen solo la capa gold.'
            ],
            en: [
                'Siatidata centralizes Ecuadorian foreign-trade data and the group\'s own data in BigQuery, turning it into information ready to use by applications, dashboards and AI assistants.',
                'Files are ingested into Cloud Storage and flow through three layers: bronze (raw), silver (clean and typed) and gold (modeled for the business). Transformations are versioned in Dataform with quality tests, and applications consume only the gold layer.'
            ]
        },
        features: {
            es: ['Ingesta de archivos en Cloud Storage', 'Arquitectura medallion: bronze, silver y gold', 'Pipelines versionados en Dataform con pruebas de calidad', 'Marts de mercado, clientes y ventas', 'Consumo seguro desde apps y tableros mediante vistas autorizadas'],
            en: ['File ingestion into Cloud Storage', 'Medallion architecture: bronze, silver and gold', 'Versioned Dataform pipelines with quality tests', 'Market, client and sales marts', 'Secure consumption from apps and dashboards through authorized views']
        },
        stack: ['BigQuery', 'Dataform', 'Cloud Storage', 'SQL', 'Power BI', 'Google Cloud'],
        screens: []
    };

    var list = window.PROJECTS || [];
    if (!list.some(function (p) { return p.slug === 'siatidata'; })) {
        var idx = list.findIndex(function (p) { return p.slug === 'siatisale'; });
        list.splice(idx >= 0 ? idx + 1 : list.length, 0, SIATIDATA);
    }
    list.forEach(function (p) { if (ARCH[p.slug]) { p.architecture = ARCH[p.slug]; } });
})();
