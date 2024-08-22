const form = document.getElementById('formFiguras');
        const coordenadasDiv = document.getElementById('coordenadas');
        const polaresDiv = document.getElementById('polares');

        document.getElementById('coordenada').addEventListener('change', function() {
            if (this.value === 'cartesiana') {
                coordenadasDiv.style.display = 'block';
                polaresDiv.style.display = 'none';
            } else {
                coordenadasDiv.style.display = 'none';
                polaresDiv.style.display = 'block';
            }
        });

        function dibujarFigura() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas

    let x, y;

    const tipoCoordenada = document.getElementById('coordenada').value;
    if (tipoCoordenada === 'cartesiana') {
        x = parseFloat(document.getElementById('x').value);
        y = parseFloat(document.getElementById('y').value);
    } else if (tipoCoordenada === 'polar') {
        const r = parseFloat(document.getElementById('r').value);
        const theta = parseFloat(document.getElementById('theta').value);
        x = r * Math.cos(theta * Math.PI / 180);
        y = r * Math.sin(theta * Math.PI / 180);
    }

    const tipoFigura = document.getElementById('figura').value;
    const tamano = parseFloat(document.getElementById('tamano').value);
    const color = document.getElementById('color').value; // Obtener el color seleccionado

    // Trasladar el origen al centro del canvas
    const canvasX = x + canvas.width / 2;
    const canvasY = canvas.height / 2 - y;

    ctx.beginPath();
    ctx.strokeStyle = color; // Aplicar el color seleccionado a la figura
    ctx.fillStyle = color;   // Aplicar el color de relleno a la figura

    switch (tipoFigura) {
        case 'circulo':
            ctx.arc(canvasX, canvasY, tamano, 0, 2 * Math.PI);
            break;
        case 'cuadrado':
            ctx.rect(canvasX - tamano / 2, canvasY - tamano / 2, tamano, tamano);
            break;
        case 'triangulo':
            const altura = (Math.sqrt(3) / 2) * tamano;
            ctx.moveTo(canvasX, canvasY - 2 * altura / 3);
            ctx.lineTo(canvasX - tamano / 2, canvasY + altura / 3);
            ctx.lineTo(canvasX + tamano / 2, canvasY + altura / 3);
            ctx.closePath();
            break;
        case 'estrella':
            dibujarEstrella(ctx, canvasX, canvasY, tamano, 5); // 5 es el número de puntas de la estrella
            break;
    }
    ctx.fill();  // Rellenar la figura
    ctx.stroke(); // Dibujar los bordes de la figura
}

function dibujarEstrella(ctx, x, y, radius, puntos) {
    const step = Math.PI / puntos;
    ctx.moveTo(x + radius * Math.cos(0), y - radius * Math.sin(0));

    for (let i = 0; i < 2 * puntos; i++) {
        const rad = i * step;
        const r = (i % 2 === 0) ? radius : radius / 2;
        ctx.lineTo(x + r * Math.cos(rad), y - r * Math.sin(rad));
    }
    ctx.closePath();
}
