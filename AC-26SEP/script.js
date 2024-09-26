// Clase Punto
class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Método para dibujar un punto
    dibujar(svgCanvas) {
        const punto = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        punto.setAttribute('cx', this.x);
        punto.setAttribute('cy', this.y);
        punto.setAttribute('r', 2);  // Radio pequeño para que sea un punto visible
        punto.setAttribute('fill', 'black');
        svgCanvas.appendChild(punto);
    }
}

// Clase SVGDrawer para manejar el dibujo
class SVGDrawer {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
    }

    // Dibujar una línea continua
    dibujarLinea(x1, y1, x2, y2) {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        linea.setAttribute('x1', x1);
        linea.setAttribute('y1', y1);
        linea.setAttribute('x2', x2);
        linea.setAttribute('y2', y2);
        linea.setAttribute('stroke', 'black');
        linea.setAttribute('stroke-width', 2);  // Ajusta el grosor de la línea
        this.svgCanvas.appendChild(linea);
    }

    // Dibujar una circunferencia continua
    dibujarCircunferencia(cx, cy, r) {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circunferencia.setAttribute('cx', cx);
        circunferencia.setAttribute('cy', cy);
        circunferencia.setAttribute('r', r);
        circunferencia.setAttribute('stroke', 'black');
        circunferencia.setAttribute('stroke-width', 2);  // Ajusta el grosor de la circunferencia
        circunferencia.setAttribute('fill', 'none');  // Para que no esté rellena
        this.svgCanvas.appendChild(circunferencia);
    }

    // Dibujar una elipse continua
    dibujarElipse(cx, cy, a, b) {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
        elipse.setAttribute('cx', cx);
        elipse.setAttribute('cy', cy);
        elipse.setAttribute('rx', a);
        elipse.setAttribute('ry', b);
        elipse.setAttribute('stroke', 'black');
        elipse.setAttribute('stroke-width', 2);  // Ajusta el grosor de la elipse
        elipse.setAttribute('fill', 'none');  // Para que no esté rellena
        this.svgCanvas.appendChild(elipse);
    }

    // Dibujar un solo punto
    dibujarPunto(x, y) {
        new Punto(x, y).dibujar(this.svgCanvas);
    }
}

// Crear el SVG
const svgCanvas = document.getElementById('svgCanvas');

// Instanciar la clase SVGDrawer
const drawer = new SVGDrawer(svgCanvas);

// Dibujar las primitivas usando líneas continuas y puntos
drawer.dibujarLinea(50, 50, 200, 200);  // Línea continua
drawer.dibujarCircunferencia(300, 100, 50);  // Circunferencia continua
drawer.dibujarElipse(400, 300, 80, 50);  // Elipse continua
drawer.dibujarPunto(400, 300);  // Punto

