class Punto {
    #x; // Coordenada x
    #y; // Coordenada y

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos para obtener las coordenadas
    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

const svg = document.getElementById('miSVG');
const numPuntosInput = document.getElementById('numPuntos');
const numPuntosValor = document.getElementById('numPuntosValor');
let puntos = [];

// Actualiza el valor mostrado del número de puntos
numPuntosInput.addEventListener('input', () => {
    numPuntosValor.textContent = numPuntosInput.value;
});

// Generar un punto aleatorio
function generarPuntoAleatorio() {
    const x = Math.floor(Math.random() * svg.clientWidth);
    const y = Math.floor(Math.random() * svg.clientHeight);
    return new Punto(x, y);
}

// Dibujar la figura en SVG (vectores)
function dibujarFiguraSVG(puntos) {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild); // Limpiar el contenido de SVG
    }

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = `M ${puntos[0].getX()},${puntos[0].getY()} `;

    for (let i = 1; i < puntos.length; i++) {
        d += `L ${puntos[i].getX()},${puntos[i].getY()} `;
    }

    d += "Z"; // Cerrar la figura
    path.setAttribute("d", d);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "none");

    svg.appendChild(path); // Añadir la ruta al SVG

    dibujarPuntosSVG(puntos);
}

// Dibujar los puntos en SVG
function dibujarPuntosSVG(puntos) {
    puntos.forEach(function (punto) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", punto.getX());
        circle.setAttribute("cy", punto.getY());
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", "black");
        svg.appendChild(circle);
    });
}

// Verificar si la figura es convexa
function productoCruzado(p1, p2, p3) {
    const dx1 = p2.getX() - p1.getX();
    const dy1 = p2.getY() - p1.getY();
    const dx2 = p3.getX() - p2.getX();
    const dy2 = p3.getY() - p2.getY();
    return dx1 * dy2 - dy1 * dx2;
}

function esConvexa(puntos) {
    let signoInicial = null;
    for (let i = 0; i < puntos.length; i
