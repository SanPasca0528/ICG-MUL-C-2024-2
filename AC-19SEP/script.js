 // Función para crear un elemento SVG
 function crearElemento(tag, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}

// Dibujar una línea
function dibujarLinea(x1, y1, x2, y2) {
    const linea = crearElemento('line', {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: 'black',
        'stroke-width': 1
    });
    return linea;
}

// Dibujar una circunferencia
function dibujarCircunferencia(cx, cy, r) {
    const circunferencia = crearElemento('circle', {
        cx: cx,
        cy: cy,
        r: r,
        stroke: 'black',
        'stroke-width': 1,
        fill: 'none'
    });
    return circunferencia;
}

// Dibujar una elipse
function dibujarElipse(cx, cy, a, b) {
    const elipse = crearElemento('ellipse', {
        cx: cx,
        cy: cy,
        rx: a,
        ry: b,
        stroke: 'black',
        'stroke-width': 1,
        fill: 'none'
    });
    return elipse;
}

// Crear el SVG
const svgCanvas = document.getElementById('svgCanvas');

// Dibujar las primitivas
svgCanvas.appendChild(dibujarLinea(50, 50, 200, 200));
svgCanvas.appendChild(dibujarCircunferencia(300, 100, 50));
svgCanvas.appendChild(dibujarElipse(400, 300, 80, 50));