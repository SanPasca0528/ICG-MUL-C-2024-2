const formulario = document.getElementById('figura');
const canvas = document.getElementById('canvasfiguritas');
const ctx = canvas.getContext('2d');
const coordSystemSelect = document.getElementById('coordSystem');
const cartesianInputs = document.getElementById('cartesianInputs');
const polarInputs = document.getElementById('polarInputs');

// Mostrar u ocultar campos según el sistema de coordenadas seleccionado
coordSystemSelect.addEventListener('change', function () {
    const selectedSystem = coordSystemSelect.value;
    if (selectedSystem === 'cartesianas') {
        cartesianInputs.style.display = 'block';  // Mostrar coordenadas cartesianas
        polarInputs.style.display = 'none';       // Ocultar coordenadas polares
    } else {
        cartesianInputs.style.display = 'none';   // Ocultar coordenadas cartesianas
        polarInputs.style.display = 'block';      // Mostrar coordenadas polares
    }
});

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const numlados = parseInt(document.getElementById('numlados').value);
    const lado = parseFloat(document.getElementById('lado').value);
    const coordSystem = coordSystemSelect.value;

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let centroX, centroY, radio;

    if (coordSystem === 'cartesianas') {
        const xCoor = parseFloat(document.getElementById('x').value);
        const yCoor = parseFloat(document.getElementById('y').value);
        centroX = xCoor + canvas.width / 2;
        centroY = canvas.height / 2 - yCoor;
        radio = lado / (2 * Math.sin(Math.PI / numlados));
    } else {
        // Para coordenadas polares, usar el centro del canvas y el radio y ángulo inicial
        radio = parseFloat(document.getElementById('radio').value);
        const anguloInicialGrados = parseFloat(document.getElementById('angulo').value);
        const anguloInicial = (anguloInicialGrados * Math.PI) / 180; // Convertir a radianes
        centroX = canvas.width / 2;
        centroY = canvas.height / 2;
    }

    // Calcular el ángulo entre los vértices (en radianes)
    const angulo = (2 * Math.PI) / numlados;

    // Comenzar a dibujar el polígono
    ctx.beginPath();

    for (let i = 0; i < numlados; i++) {
        const currentAngle = angulo * i - Math.PI / 2; // Rotación de -90° para que el polígono se oriente correctamente
        const x = centroX + radio * Math.cos(currentAngle);
        const y = centroY + radio * Math.sin(currentAngle);
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
