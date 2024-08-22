Hola buenas tardes soy Santiago G Pascagaza Cuervo, código 6001027, voy a hablar de un poco de lo que entendí sobre los conceptos fundamentales de los sistemas de coordenadas y graficación  en canvas, en este caso el sistema de coordenadas se usa este sistema para convertir las coordenadas que nos dan polares en coordenadas X y Y:

	const r = parseFloat(document.getElementById('r').value);
        const theta = parseFloat(document.getElementById('theta').value);
        x = r * Math.cos(theta * Math.PI / 180);
        y = r * Math.sin(theta * Math.PI / 180);

como se ve, se obtienen los datos por medio de la digitación del usuario en el menú, donde se guardan en r y theta, donde posterior se convierten a X y Y multiplicando la distancia R que es recibida por coseno y seno respectivamente, donde se ubican en el canvas 

Cosas relevantes para entender canvas son el entender que hay un canvas en este caso para el estilo de la pagina y otro canvas el cual esta diseñade la manera:

 Canvas (<canvas id="canvas" width="600" height="600"></canvas>):

, donde se van a dibujar nuestras figuras geométricas,
aqui se puede ver que el canvas tiene un tamaño de 600x600 píxeles y un borde negro.
Todas las figuras geométricas que se van a dibujar en el canvas que creamos anteriormente se harán por medio de la lógica descripta en JavaScript.