/**
 * Renderiza la página de detalle de un proyecto a partir de window.PROJECTS
 * usando el parámetro ?p=<slug>. Bilingüe (ES/EN) vía window.languageSwitcher.
 */
(function () {
    'use strict';

    var LABELS = {
        es: {
            role: 'Mi rol', status: 'Estado', stack: 'Stack tecnológico', features: 'Qué hace',
            screens: 'Capturas de pantalla', noScreens: 'Capturas próximamente.',
            arch: 'Arquitectura en la nube', archNote: 'Vista general de servicios y patrón de despliegue. No se muestran identificadores, credenciales ni nombres de recursos.',
            overview: 'Descripción', view: 'Ver proyecto', notFound: 'Proyecto no encontrado.',
            back: 'Volver a proyectos'
        },
        en: {
            role: 'My role', status: 'Status', stack: 'Tech stack', features: 'What it does',
            screens: 'Screenshots', noScreens: 'Screenshots coming soon.',
            arch: 'Cloud architecture', archNote: 'High-level view of services and deployment pattern. No identifiers, credentials or resource names are shown.',
            overview: 'Overview', view: 'View project', notFound: 'Project not found.',
            back: 'Back to projects'
        }
    };

    function lang() {
        return (window.languageSwitcher && window.languageSwitcher.getCurrentLanguage()) || 'es';
    }

    var LOGOS = { gemini: ['gemini-light', 'gemini-dark'], aws: ['aws', 'aws-dark'], github: ['github', 'github-dark'], django: ['django', 'django-dark'], ibm: ['ibm-light', 'ibm-dark'], odoo: ['odoo-light', 'odoo-dark'], clockify: ['clockify-light', 'clockify-dark'], transform: ['transform-light', 'transform-dark'] };
    function logoImg(key, alt) {
        var v = LOGOS[key] || [key];
        var h = '<img class="logo-light" src="images/logos/' + esc(v[0]) + '.png" alt="' + esc(alt) + '" loading="lazy">';
        if (v[1]) { h += '<img class="logo-dark" src="images/logos/' + esc(v[1]) + '.png" alt="" aria-hidden="true" loading="lazy">'; }
        return h;
    }

    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function getSlug() {
        var m = /[?&]p=([a-z0-9-]+)/i.exec(window.location.search);
        return m ? m[1] : null;
    }

    var project = null;
    var shots = [];
    var current = 0;

    function render() {
        var L = LABELS[lang()];
        var l = lang();
        var box = document.getElementById('project-content');
        var grid = document.getElementById('other-projects-grid');

        if (!project) {
            box.innerHTML = '<p>' + L.notFound + '</p>';
            return;
        }

        document.title = project.name + ' · Alexander Coral';

        var html = '';
        html += '<div class="project-hero">';
        html += '  <div class="project-hero-text">';
        html += '    <span class="project-category">' + esc(project.category[l]) + '</span>';
        html += '    <h1 class="project-title">' + esc(project.name) + '</h1>';
        html += '    <p class="project-tagline">' + esc(project.tagline[l]) + '</p>';
        html += '    <div class="project-meta">';
        html += '      <div><span class="meta-label">' + L.role + '</span><span class="meta-value">' + esc(project.role[l]) + '</span></div>';
        html += '      <div><span class="meta-label">' + L.status + '</span><span class="meta-value"><span class="status-dot"></span>' + esc(project.status[l]) + '</span></div>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="project-hero-cover"><img src="' + esc(project.cover) + '" alt="' + esc(project.name) + '"></div>';
        html += '</div>';

        html += '<div class="row project-body">';
        html += '  <div class="col-lg-8">';
        html += '    <h4 class="project-h">' + L.overview + '</h4>';
        project.description[l].forEach(function (p) { html += '<p>' + esc(p) + '</p>'; });
        html += '    <h4 class="project-h mt-4">' + L.features + '</h4>';
        html += '    <ul class="project-features">';
        project.features[l].forEach(function (f) { html += '<li><i class="icon-check"></i>' + esc(f) + '</li>'; });
        html += '    </ul>';
        html += '  </div>';
        html += '  <div class="col-lg-4">';
        html += '    <div class="project-stack-box">';
        html += '      <h4 class="project-h">' + L.stack + '</h4>';
        html += '      <div class="tech-stack">';
        project.stack.forEach(function (t) { html += '<span class="tech-tag">' + esc(t) + '</span>'; });
        html += '      </div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        if (project.architecture && project.architecture.flow) {
            var A = project.architecture;
            html += '<h4 class="project-h mt-5">' + L.arch + '</h4>';
            html += '<p class="arch-note">' + L.archNote + '</p>';
            html += '<div class="arch-flow">';
            A.flow.forEach(function (n, i) {
                html += '<div class="arch-node">';
                html += '  <span class="arch-step">' + (i + 1) + '</span>';
                html += '  <div class="arch-icon">' + logoImg(n.icon, n.label[l]) + '</div>';
                html += '  <div class="arch-label">' + esc(n.label[l]) + '</div>';
                if (n.detail) { html += '  <div class="arch-detail">' + esc(n.detail[l]) + '</div>'; }
                html += '</div>';
            });
            html += '</div>';
            if (A.notes && A.notes[l] && A.notes[l].length) {
                html += '<ul class="arch-notes">';
                A.notes[l].forEach(function (t) { html += '<li><i class="icon-info"></i>' + esc(t) + '</li>'; });
                html += '</ul>';
            }
        }

        html += '<h4 class="project-h mt-5">' + L.screens + '</h4>';
        shots = project.screens || [];
        if (shots.length) {
            html += '<div class="project-gallery">';
            shots.forEach(function (s, i) {
                html += '<figure class="project-shot" data-index="' + i + '">';
                html += '  <img src="' + esc(s.src) + '" alt="' + esc(s.caption ? s.caption[l] : project.name) + '" loading="lazy">';
                if (s.caption) { html += '  <figcaption>' + esc(s.caption[l]) + '</figcaption>'; }
                html += '</figure>';
            });
            html += '</div>';
        } else {
            html += '<p class="project-noscreens"><i class="icon-picture"></i> ' + L.noScreens + '</p>';
        }

        box.innerHTML = html;

        Array.prototype.forEach.call(box.querySelectorAll('.project-shot'), function (fig) {
            fig.addEventListener('click', function () { openLightbox(parseInt(fig.getAttribute('data-index'), 10)); });
        });

        // Otros proyectos
        var others = window.PROJECTS.filter(function (p) { return p.slug !== project.slug; });
        var g = '';
        others.forEach(function (p) {
            g += '<div class="col-md-4 col-sm-6 mb-4">';
            g += '  <a href="project.html?p=' + p.slug + '" class="other-card">';
            g += '    <img src="' + esc(p.cover) + '" alt="' + esc(p.name) + '" loading="lazy">';
            g += '    <div class="other-card-body"><span class="other-card-cat">' + esc(p.category[l]) + '</span><h5>' + esc(p.name) + '</h5><span class="other-card-link">' + L.view + ' →</span></div>';
            g += '  </a>';
            g += '</div>';
        });
        grid.innerHTML = g;

        if (window.ambientBg && typeof window.ambientBg.redraw === 'function') { window.ambientBg.redraw(); }
    }

    /* ---------- Lightbox ---------- */
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-img');
    var lbCap = document.getElementById('lightbox-caption');

    function showShot(i) {
        if (!shots.length) return;
        current = (i + shots.length) % shots.length;
        var s = shots[current];
        lbImg.src = s.src;
        lbImg.alt = s.caption ? s.caption[lang()] : project.name;
        lbCap.textContent = s.caption ? s.caption[lang()] : '';
        document.getElementById('lightbox-prev').style.display = shots.length > 1 ? '' : 'none';
        document.getElementById('lightbox-next').style.display = shots.length > 1 ? '' : 'none';
    }

    function openLightbox(i) {
        showShot(i);
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lb.classList.remove('open');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); showShot(current - 1); });
    document.getElementById('lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); showShot(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showShot(current - 1);
        if (e.key === 'ArrowRight') showShot(current + 1);
    });

    /* ---------- Init ---------- */
    var slug = getSlug();
    project = (window.PROJECTS || []).filter(function (p) { return p.slug === slug; })[0] || null;

    render();
    window.addEventListener('languageChanged', render);
})();
