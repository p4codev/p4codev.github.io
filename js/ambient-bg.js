/**
 * Fondo del sitio: "Bokeh flotante".
 *  - Luces suaves y desenfocadas que suben despacio, oscilan y se apartan del cursor.
 *  - Grano fino encima para dar textura.
 *  - Brillo de borde en las tarjetas que sigue al ratón (variables CSS --mx/--my).
 *
 * Sin dependencias. Respeta prefers-reduced-motion, se pausa con la pestaña
 * oculta y usa menos luces en pantallas pequeñas.
 */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;

    /* ---------- Capas ---------- */
    var ambient = document.createElement('div');
    ambient.className = 'ambient-bg';
    ambient.setAttribute('aria-hidden', 'true');
    ambient.innerHTML = '<canvas class="ambient-bokeh"></canvas><div class="ambient-grain"></div>';
    document.body.insertBefore(ambient, document.body.firstChild);

    var canvas = ambient.querySelector('.ambient-bokeh');
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var mouse = { x: -9999, y: -9999, active: false };
    var rafId = null;
    var lights = [];

    function isDark() {
        return (document.documentElement.getAttribute('data-theme') || 'light') === 'dark';
    }

    function count() {
        var area = W * H;
        var n = Math.round(area / 32000);          // ~60 en 1920x1080
        return Math.max(18, Math.min(W < 768 ? 26 : 64, n));
    }

    function makeLight(fromBottom) {
        return {
            x: Math.random() * W,
            y: fromBottom ? H + 120 : Math.random() * H,
            r: 26 + Math.random() * 110,            // radio: luces grandes y pequeñas
            v: 0.12 + Math.random() * 0.32,         // velocidad de subida
            ph: Math.random() * Math.PI * 2,        // fase de oscilación
            hue: [199, 212, 226, 250, 262][Math.floor(Math.random() * 5)], // cian → azul → índigo → violeta
            d: 0.5 + Math.random() * 0.5            // profundidad (brillo y tamaño)
        };
    }

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = count();
        lights = [];
        for (var i = 0; i < n; i++) lights.push(makeLight(false));
    }

    function draw(t) {
        var dark = isDark();
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < lights.length; i++) {
            var p = lights[i];

            // movimiento: sube despacio y oscila lateralmente
            p.y -= p.v * p.d;
            p.x += Math.sin(t * 0.00045 + p.ph) * 0.35;

            // el cursor las aparta suavemente
            if (mouse.active) {
                var dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 260 && dist > 0.001) {
                    var f = (260 - dist) * 0.025;
                    p.x += dx / dist * f;
                    p.y += dy / dist * f;
                }
            }

            if (p.y < -p.r) { var nl = makeLight(true); p.x = nl.x; p.y = nl.y; p.r = nl.r; p.v = nl.v; p.hue = nl.hue; p.d = nl.d; }
            if (p.x < -p.r) p.x = W + p.r;
            if (p.x > W + p.r) p.x = -p.r;

            var r = p.r * (0.75 + p.d * 0.5);
            var pulse = 1 + Math.sin(t * 0.0009 + p.ph) * 0.08;
            r *= pulse;

            // más pronunciado: núcleo visible + halo amplio
            var aCore = (dark ? 0.30 : 0.22) * p.d;
            var aMid = (dark ? 0.16 : 0.12) * p.d;
            var L = dark ? 66 : 52;
            var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
            g.addColorStop(0, 'hsla(' + p.hue + ',88%,' + (L + 10) + '%,' + aCore.toFixed(3) + ')');
            g.addColorStop(0.45, 'hsla(' + p.hue + ',88%,' + L + '%,' + aMid.toFixed(3) + ')');
            g.addColorStop(1, 'hsla(' + p.hue + ',88%,' + L + '%,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.fill();

        }
    }

    function loop(t) {
        draw(t);
        rafId = window.requestAnimationFrame(loop);
    }

    function start() { if (!rafId && !reduceMotion) rafId = window.requestAnimationFrame(loop); }
    function stop() { if (rafId) { window.cancelAnimationFrame(rafId); rafId = null; } }

    /* ---------- Brillo de borde en tarjetas ---------- */
    var glowTargets = [];
    function collectGlowTargets() {
        glowTargets = Array.prototype.slice.call(
            document.querySelectorAll('.white-bg, header.left, .service-item, .certification-card, .experience-content, .skill-item, .contact-info')
        );
        glowTargets.forEach(function (el) { el.classList.add('glow-card'); });
    }

    function updateGlow(x, y) {
        for (var i = 0; i < glowTargets.length; i++) {
            var el = glowTargets[i];
            var r = el.getBoundingClientRect();
            if (r.bottom < -200 || r.top > H + 200) continue;
            el.style.setProperty('--mx', (x - r.left) + 'px');
            el.style.setProperty('--my', (y - r.top) + 'px');
        }
    }

    /* ---------- Eventos ---------- */
    window.addEventListener('resize', resize);

    if (!isTouch) {
        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
            updateGlow(e.clientX, e.clientY);
        }, { passive: true });
        document.addEventListener('mouseleave', function () { mouse.active = false; });
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
    });

    resize();
    collectGlowTargets();
    draw(0);
    start();

    window.ambientBg = { start: start, stop: stop, redraw: function () { draw(performance.now()); } };
})();
