// Seleccionamos el contenedor de imágenes
const slider = document.querySelector('.screen__images');
const reveals = document.querySelectorAll('#proyectos .reveal');

//Menú hamburguesa
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const burgerNav = document.getElementById("burger-nav");
const links = burgerNav.querySelectorAll("a");

//constantes de animaciones de entrada
const elements = document.querySelectorAll(".reveal");
//constantes de animaciones de entrada

openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    burgerNav.classList.add("active");
});

closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    burgerNav.classList.remove("active");
});


links.forEach(link => {
    link.addEventListener("click", () => {
        burgerNav.classList.remove("active");
    });
});

// Menú hamburguesa

// Animaciones de entrada del contenido

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.2
});

elements.forEach(el => observer.observe(el));
// Animaciones de entrada del contenido
// Variables que guardan el estado del arrastre
let isDown = false;    // ¿está el botón del ratón pulsado?
let startX;            // posición X donde empezó el clic
let scrollLeft;        // cuánto estaba scrolleado el contenedor al empezar

// EVENTO 1: el usuario pulsa el botón del ratón
slider.addEventListener('mousedown', (e) => {
    isDown = true;                              // activamos el modo arrastre
    slider.style.cursor = 'grabbing';          // cambiamos el cursor a "agarrando"
    startX = e.pageX - slider.offsetLeft;      // guardamos la posición X del clic, restando el desplazamiento del propio contenedor para obtener coordenadas relativas
    scrollLeft = slider.scrollLeft;            // guardamos cuánto scroll llevaba el contenedor en ese momento
});

// EVENTO 2: el ratón sale del contenedor sin soltar
slider.addEventListener('mouseleave', () => {
    isDown = false;                            // desactivamos el arrastre para que no se quede "pegado"
    slider.style.cursor = 'grab';             // volvemos al cursor normal
});

// EVENTO 3: el usuario suelta el botón del ratón
slider.addEventListener('mouseup', () => {
    isDown = false;                            // desactivamos el arrastre
    slider.style.cursor = 'grab';             // volvemos al cursor normal
});

// EVENTO 4: el ratón se mueve (este es el que hace el scroll real)
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;                       // si no estamos arrastrando, ignoramos el movimiento
    e.preventDefault();                        // evitamos comportamientos por defecto del navegador (como seleccionar texto)
    const x = e.pageX - slider.offsetLeft;    // posición X actual del ratón, relativa al contenedor
    const walk = (x - startX) * 1.5;         // calculamos cuánto se ha movido el ratón desde el inicio (multiplicado por 1.5 para dar velocidad)
    slider.scrollLeft = scrollLeft - walk;    // aplicamos el desplazamiento al scroll: restamos porque arrastrar a la derecha debe mostrar contenido de la derecha
});


// animaciones de entrada

