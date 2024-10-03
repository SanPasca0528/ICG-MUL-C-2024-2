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

// Variables globales
const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
const numPuntosInput = document.getElementById('numPuntos');
const numPuntosValor = document.getElementById('numPuntosValor');
let puntos = [];

// Actualiza el valor mostrado del número de puntos
numPuntosInput.addEventListener('input', () => {
    numPuntosValor.textContent = numPuntosInput.value;
});

// Generar un punto aleatorio
function generarPuntoAleatorio() {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    return new Punto(x, y);
}

// Calcular el centroide de los puntos
function calcularCentroide(puntos) {
    const sumaX = puntos.reduce((acc, punto) => acc + punto.getX(), 0);
    const sumaY = puntos.reduce((acc, punto) => acc + punto.getY(), 0);
    const centroideX = sumaX / puntos.length;
    const centroideY = sumaY / puntos.length;
    return new Punto(centroideX, centroideY);
}

// Ordenar los puntos en sentido horario respecto al centroide
function ordenarPuntos(puntos) {
    const centroide = calcularCentroide(puntos);
    return puntos.sort((a, b) => {
        const anguloA = Math.atan2(a.getY() - centroide.getY(), a.getX() - centroide.getX());
        const anguloB = Math.atan2(b.getY() - centroide.getY(), b.getX() - centroide.getX());
        return anguloA - anguloB; // Ordenar por ángulo
    });
}

// Dibujar la figura en el canvas
function dibujarFiguraCanvas(puntos) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Ordenar los puntos
    const puntosOrdenados = ordenarPuntos(puntos);

    // Dibujar la figura
    ctx.beginPath();
    ctx.moveTo(puntosOrdenados[0].getX(), puntosOrdenados[0].getY());

    for (let i = 1; i < puntosOrdenados.length; i++) {
        ctx.lineTo(puntosOrdenados[i].getX(), puntosOrdenados[i].getY());
    }

    ctx.closePath(); // Cerrar la figura
    ctx.stroke(); // Dibujar la línea

    // Dibujar los puntos
    dibujarPuntosCanvas(puntosOrdenados);
}

// Dibujar los puntos en el canvas
function dibujarPuntosCanvas(puntos) {
    puntos.forEach(function (punto) {
        ctx.beginPath();
        ctx.arc(punto.getX(), punto.getY(), 5, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
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
    for (let i = 0; i < puntos.length; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % puntos.length];
        const p3 = puntos[(i + 2) % puntos.length];
        const cruz = productoCruzado(p1, p2, p3);
        if (signoInicial === null) {
            signoInicial = Math.sign(cruz);
        } else if (Math.sign(cruz) !== signoInicial && Math.sign(cruz) !== 0) {
            return false; // Si el signo cambia, no es convexa
        }
    }
    return true;
}

// Generar puntos, dibujar figura y verificar convexidad
function generarYDibujar() {
    const numPuntos = parseInt(numPuntosInput.value, 10);
    puntos = [];
    for (let i = 0; i < numPuntos; i++) {
        puntos.push(generarPuntoAleatorio());
    }

    const convexa = esConvexa(puntos);
    const resultadoTexto = convexa ? 'La figura es convexa.' : 'La figura es concava.';
    document.getElementById('resultado').textContent = resultadoTexto;

    dibujarFiguraCanvas(puntos);
}

// Cambiar puntos al hacer clic en el botón
document.getElementById('btnCambiar').addEventListener('click', generarYDibujar);

// Dibujar al cargar la página
generarYDibujar();
