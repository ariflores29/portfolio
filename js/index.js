/* ==========================================================================
   SELECTORES GENERALES
   ========================================================================== */
 
// Contenedor de imágenes arrastrable (proyectos)
const slider = document.querySelector('.screen__images');
const reveals = document.querySelectorAll('#proyectos .reveal');
 
// Menú hamburguesa
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const burgerNav = document.getElementById('burger-nav');
const links = burgerNav ? burgerNav.querySelectorAll('a') : [];
 
// Elementos con animación de entrada al hacer scroll
const elements = document.querySelectorAll('.reveal');
 
 
/* ==========================================================================
   MENÚ HAMBURGUESA
   ========================================================================== */
 
if (openBtn && closeBtn && burgerNav) {
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        burgerNav.classList.add('active');
    });
 
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        burgerNav.classList.remove('active');
    });
 
    links.forEach(link => {
        link.addEventListener('click', () => {
            burgerNav.classList.remove('active');
        });
    });
}
 
 
/* ==========================================================================
   ANIMACIONES DE ENTRADA (scroll reveal)
   ========================================================================== */
 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.2
});
 
elements.forEach(el => observer.observe(el));
 
 
/* ==========================================================================
   SLIDER ARRASTRABLE (proyectos)
   ========================================================================== */
 
// Solo ejecutamos este bloque si el slider existe en la página
if (slider) {
 
    // Variables que guardan el estado del arrastre
    let isDown = false;    // ¿está el botón del ratón pulsado?
    let startX;            // posición X donde empezó el clic
    let scrollLeft;        // cuánto estaba scrolleado el contenedor al empezar
 
    // El usuario pulsa el botón del ratón
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
 
    // El ratón sale del contenedor sin soltar
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
 
    // El usuario suelta el botón del ratón
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
 
    // El ratón se mueve (esto hace el scroll real)
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
}
 
 
/* ==========================================================================
   BANNER — REVELAR COLOR ALREDEDOR DEL CURSOR (foco que sigue al ratón)
 
   No pinta ni deja rastro: el color solo se ve en un círculo pequeño
   justo donde está el cursor. Al mover el ratón a otra zona, la anterior
   vuelve automáticamente a blanco y negro.
 
   Requiere en el HTML, dentro de <div class="banner" id="banner">:
     <picture><img class="img-bw" src="..." alt="..."></picture>
     <picture><img class="img-color" src="..." alt="..."></picture>
 
   Todo el efecto visual (círculo, blanco y negro, transición) lo hace
   el CSS con mask-image; este JS solo actualiza la posición del cursor
   en las variables --x / --y.
   ========================================================================== */
 
const banner = document.getElementById('banner');
 
if (banner) {
    function updateMask(x, y) {
        const rect = banner.getBoundingClientRect();
        const px = ((x - rect.left) / rect.width) * 100;
        const py = ((y - rect.top) / rect.height) * 100;
        banner.style.setProperty('--x', px + '%');
        banner.style.setProperty('--y', py + '%');
    }

    // Ratón (escritorio)
    banner.addEventListener('mousemove', (e) => updateMask(e.clientX, e.clientY));

    // Táctil (móvil)
    banner.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        updateMask(touch.clientX, touch.clientY);
        banner.classList.add('is-active');
    });

    banner.addEventListener('touchend', () => {
        banner.classList.remove('is-active');
    });
}
//foto-gris-color

