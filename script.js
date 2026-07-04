let menuVisible = false;

function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

function efectoHabilidades() {
    const skills = document.getElementById("skills");
    if (!skills) return;

    const distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distanciaSkills >= 300) {
        const habilidades = document.getElementsByClassName("progreso");
        habilidades[0]?.classList.add("javascript");
        habilidades[1]?.classList.add("htmlcss");
        habilidades[2]?.classList.add("photoshop");
        habilidades[3]?.classList.add("wordpress");
        habilidades[4]?.classList.add("drupal");
        habilidades[5]?.classList.add("comunicacion");
        habilidades[6]?.classList.add("trabajo");
        habilidades[7]?.classList.add("creatividad");
        habilidades[8]?.classList.add("dedicacion");
        habilidades[9]?.classList.add("proyect");
    }
}

const modalProyecto = document.getElementById("modalProyecto");
const modalImagen = document.getElementById("modalImagen");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalEnlace = document.getElementById("modalEnlace");
const modalIndicador = document.getElementById("modalIndicador");
const modalCerrar = document.querySelector(".modal-cerrar");
const carruselAnterior = document.querySelector(".carrusel-control.prev");
const carruselSiguiente = document.querySelector(".carrusel-control.next");

let imagenesProyecto = [];
let indiceActual = 0;
let tituloProyecto = "";

function abrirModalProyecto(card) {
    tituloProyecto = card.dataset.title || "Proyecto";
    const descripcion = card.dataset.description || "Sin descripción disponible.";
    const enlace = card.dataset.link || "#";
    
    // ==========================================
    // NUEVA LÓGICA: GENERACIÓN DE RUTAS DINÁMICAS
    // ==========================================
    const folder = card.dataset.folder;
    const prefix = card.dataset.prefix || "";
    const ext = card.dataset.ext || ".png";
    const count = parseInt(card.dataset.count) || 0;

    imagenesProyecto = []; // Vaciamos el arreglo para el nuevo proyecto

    // Verificamos si el botón tiene configurado el método de carpetas (data-folder y data-count)
    if (folder && count > 0) {
        for (let i = 1; i <= count; i++) {
            imagenesProyecto.push(`${folder}${prefix}${i}${ext}`);
        }
    } else {
        // Fallback: Si no tiene método de carpeta, intentamos leer el antiguo data-images
        imagenesProyecto = JSON.parse(card.dataset.images || "[]");
    }
    // ==========================================

    indiceActual = 0;

    modalTitulo.textContent = tituloProyecto;
    modalDescripcion.textContent = descripcion;
    modalEnlace.href = enlace;
    modalEnlace.textContent = "Ver proyecto";

    mostrarImagenProyecto(0);
    modalProyecto.classList.add("is-open");
    modalProyecto.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function mostrarImagenProyecto(index) {
    if (!imagenesProyecto.length) {
        modalImagen.src = "";
        modalImagen.alt = tituloProyecto;
        modalIndicador.textContent = "0/0";
        return;
    }

    indiceActual = (index + imagenesProyecto.length) % imagenesProyecto.length;
    modalImagen.src = imagenesProyecto[indiceActual];
    modalImagen.alt = `${tituloProyecto} - imagen ${indiceActual + 1}`;
    modalIndicador.textContent = `${indiceActual + 1}/${imagenesProyecto.length}`;
}

function cerrarModalProyecto() {
    modalProyecto.classList.remove("is-open");
    modalProyecto.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll(".project-trigger").forEach((boton) => {
    boton.addEventListener("click", () => abrirModalProyecto(boton));
});

modalCerrar?.addEventListener("click", cerrarModalProyecto);
carruselAnterior?.addEventListener("click", () => mostrarImagenProyecto(indiceActual - 1));
carruselSiguiente?.addEventListener("click", () => mostrarImagenProyecto(indiceActual + 1));

modalProyecto?.addEventListener("click", (event) => {
    if (event.target === modalProyecto) {
        cerrarModalProyecto();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalProyecto?.classList.contains("is-open")) {
        cerrarModalProyecto();
    }

    if (event.key === "ArrowRight" && modalProyecto?.classList.contains("is-open")) {
        mostrarImagenProyecto(indiceActual + 1);
    }

    if (event.key === "ArrowLeft" && modalProyecto?.classList.contains("is-open")) {
        mostrarImagenProyecto(indiceActual - 1);
    }
});

window.onscroll = function () {
    efectoHabilidades();
};