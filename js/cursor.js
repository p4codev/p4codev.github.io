/**
 * Cursor minimalista (punto + anillo con retardo), estilo sitios de producto actuales.
 * - CURSOR_MODE = 'minimal'  → punto + anillo, el anillo se expande sobre enlaces/botones.
 * - CURSOR_MODE = 'native'   → cursor del sistema sin adornos.
 * Se desactiva solo en pantallas táctiles y con prefers-reduced-motion.
 */
(function () {
    'use strict';

    var CURSOR_MODE = 'minimal';

    var isTouch = (window.matchMedia && (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches))
        || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    var isSmall = window.innerWidth < 992;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (CURSOR_MODE !== 'minimal' || isTouch || isSmall || reduceMotion) {
        document.querySelectorAll('[data-cursor-dot], [data-cursor-outline]').forEach(function (el) { el.remove(); });
        return;
    }

    var dot = document.querySelector('[data-cursor-dot]');
    var ring = document.querySelector('[data-cursor-outline]');
    if (!dot) { dot = document.createElement('div'); dot.className = 'cursor-dot'; dot.setAttribute('data-cursor-dot', ''); document.body.appendChild(dot); }
    if (!ring) { ring = document.createElement('div'); ring.className = 'cursor-outline'; ring.setAttribute('data-cursor-outline', ''); document.body.appendChild(ring); }
    // Sacarlos del site-wrapper para que no queden bajo las tarjetas
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    document.documentElement.classList.add('cursor-custom');

    var mx = -100, my = -100, rx = -100, ry = -100;
    var visible = false;
    var rafId = null;

    function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)';
        ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
        if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
            rafId = window.requestAnimationFrame(loop);
        } else {
            rafId = null;
        }
    }

    window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        if (!visible) { visible = true; rx = mx; ry = my; document.documentElement.classList.add('cursor-visible'); }
        if (!rafId) rafId = window.requestAnimationFrame(loop);
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
        visible = false;
        document.documentElement.classList.remove('cursor-visible');
    });

    window.addEventListener('mousedown', function () { document.documentElement.classList.add('cursor-down'); });
    window.addEventListener('mouseup', function () { document.documentElement.classList.remove('cursor-down'); });

    // Expandir el anillo sobre elementos interactivos
    var INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .portfolio-item, .project-shot, .portfolio-filter li, .other-card';
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest && e.target.closest(INTERACTIVE)) { document.documentElement.classList.add('cursor-hover'); }
    });
    document.addEventListener('mouseout', function (e) {
        if (e.target.closest && e.target.closest(INTERACTIVE)) { document.documentElement.classList.remove('cursor-hover'); }
    });
})();
