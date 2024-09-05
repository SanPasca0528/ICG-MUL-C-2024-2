const formulario = document.getElementById('figura');
const canvas = document.getElementById('canvasfiguritas');
const ctx = canvas.getContext('2d');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const numlados = parseInt(document.getElementById('numlados').value);
    const lado = parseFloat(document.getElementById('lado').value);
    const xCoor = parseFloat(document.getElementById('x').value);
    const yCoor = parseFloat(document.getElementById('y').value);

    // Colocación en la posición deseada
    const centroX = xCoor + canvas.width / 2;
    const centroY = canvas.height / 2 - yCoor;

    // Calcular el radio usando la longitud del lado y el número de lados
    const radio = lado / (2 * Math.sin(Math.PI / numlados));

    // Calcular el ángulo entre los vértices (en radianes)
    const angulo = (2 * Math.PI) / numlados;

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Comenzar a dibujar el polígono
    ctx.beginPath();

    // Dibujar los vértices del polígono utilizando coordenadas polares
    for (let i = 0; i < numlados; i++) {
        const x = centroX + radio * Math.cos(i * angulo - Math.PI / 2);
        const y = centroY + radio * Math.sin(i * angulo - Math.PI / 2);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    // Cerrar el camino y dibujar el polígono
    ctx.closePath();
    ctx.stroke();
});
