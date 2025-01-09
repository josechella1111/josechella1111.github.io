let index = 0;
let correctas = [];
let preguntas = [];
let alternativas = [];
let rptas = [];
let explicaciones = [];
let imagenes = [];
let puntaje = 0;
let countdownfunction;

function empezarJuego() {
    cargarPreguntas();
}

function cargarPreguntas() {
    reiniciar();

    preguntas = [
        "1.- ¿Qué provoca el subviraje en un vehículo?",
        "2.- ¿Qué es el sobreviraje?",
        "3.- ¿Cuál es la función del control de estabilidad (ESP)?",
        "4.- ¿Qué papel juegan los neumáticos en el comportamiento dinámico?",
        "5.- ¿Qué sucede si el centro de gravedad de un vehículo es muy alto?",
        "6.- ¿Qué es la transferencia de carga en un vehículo?",
        "7.- ¿Cómo afecta la aceleración en un coche de tracción delantera durante una curva?",
        "8.- ¿Qué elemento del vehículo ayuda a reducir la inclinación en las curvas?",
        "9.- ¿Qué sistema de seguridad activa utiliza sensores para corregir la trayectoria del coche?",
        "10.- ¿Qué efecto puede tener un coche de tracción trasera si se acelera demasiado al salir de una curva?",
    ]
    
    alternativas = [
        ["Que las ruedas traseras pierdan adherencia.", "Que las ruedas delanteras pierdan adherencia.", "Que las ruedas no giren correctamente."],
        ["La pérdida de adherencia en las ruedas traseras.", "La pérdida de adherencia en las ruedas delanteras.", "La pérdida de frenada en una curva."],
        ["Evitar que las ruedas se bloqueen al frenar.", "Reducir el riesgo de subviraje y sobreviraje.", "Ayudar al motor a consumir menos."],
        ["Determinan el nivel de adherencia y estabilidad del coche.", "Solo afectan en frenadas fuertes.", "Mejoran la potencia del motor."],
        ["Mejora la estabilidad en curvas.", "Aumenta el riesgo de vuelco.", "No afecta al comportamiento dinámico."],
        ["El cambio de peso entre las ruedas al frenar, acelerar o girar.", "El cambio de marcha del motor.", "El transporte de peso extra en el maletero."],
        ["Puede causar subviraje.", "Puede causar sobreviraje.", "No afecta a la dinámica del coche."],
        ["El motor.", "La barra estabilizadora.", "Las llantas."],
        ["El ABS.", "El ESP.", "El control de tracción (TCS)."],
        ["Puede producir sobreviraje.", "Puede producir subviraje.", "Mejora la estabilidad."],
    ]
    
    rptas = [2, 1, 2, 1, 2, 1, 1, 2, 2, 1]
    
    explicaciones = [
        "El subviraje ocurre cuando las ruedas delanteras pierden adherencia, lo que hace que el coche no gire lo suficiente y se desplace hacia el exterior de la curva.",
        "El sobreviraje se produce cuando las ruedas traseras pierden adherencia, haciendo que el coche gire más de lo esperado y la parte trasera se desplace hacia afuera.",
        "El ESP utiliza sensores y frenos para corregir la trayectoria del coche y evitar derrapes causados por subviraje o sobreviraje, mejorando la estabilidad.",
        "Los neumáticos son el único punto de contacto del coche con la carretera. Su estado y diseño influyen directamente en la adherencia, la frenada y la capacidad de tomar curvas.",
        "Un centro de gravedad alto hace que el vehículo sea más inestable en curvas y maniobras bruscas, aumentando la probabilidad de vuelco.",
        "La transferencia de carga ocurre cuando el peso del vehículo se desplaza hacia adelante, atrás o a los lados, dependiendo de las fuerzas en juego al frenar, acelerar o girar.",
        "En coches de tracción delantera, acelerar en una curva puede hacer que las ruedas delanteras pierdan adherencia, causando subviraje y dificultando que el coche siga la trayectoria.",
        "La barra estabilizadora conecta las suspensiones de un mismo eje y reduce el balanceo del coche en curvas, mejorando la estabilidad.",
        "El ESP actúa sobre los frenos y la potencia del motor para mantener el coche en la trayectoria deseada, evitando derrapes y pérdidas de control.",
        "En coches de tracción trasera, acelerar bruscamente en una curva puede hacer que las ruedas traseras pierdan adherencia, provocando sobreviraje.",
    ]
    

    imagenes = [
        "primera.jpg",
        "segunda.jpg",
        "tercera.jpg",
        "cuarta.jpg",
        "quinta.jpg",
        "sexta.jpg",
        "septima.jpg",
        "octava.jpg",
        "novena.jpg",
        "decima.jpg"
    ];

    mostrarDiv('jugar');
    cargarPreguntasEnPantalla(index);
}

function siguiente() {
    if (!preguntaRespondida && !sinContestar.includes(index)) {
        sinContestar.push(index); 
    }

    document.getElementById('divrpta').style.display = 'none';
    index++;

    preguntaRespondida = false;

    clearInterval(countdownfunction);
    if (index <= preguntas.length - 1) {
        cargarPreguntasEnPantalla(index);
    }

    if (index === preguntas.length) {
        verResultados();
    }
}

function cargarPreguntasEnPantalla(indice) {
    document.getElementById('pregunta').innerHTML = preguntas[indice];
    let opciones = "";
    for (let j = 0; j < alternativas[indice].length; j++) {
        opciones += "<p>";
        opciones += "<label class='lblopc'><input type='radio' class='radios' onclick='checkRpta(" + j + ")' name='opc'>" + alternativas[indice][j] + "</label>";
        opciones += "</p>";
    }

    document.getElementById('alternativas').innerHTML = opciones;
}

function checkRpta(rpta) {
    document.getElementById('divrpta').style.display = 'block';
    let mensaje = "RESPUESTA INCORRECTA :(";
    let color = 'red';

    preguntaRespondida = true;


    let indexSinContestar = sinContestar.indexOf(index);
    if (indexSinContestar !== -1) {
        sinContestar.splice(indexSinContestar, 1);
    }

    if (rptas[index] === rpta) {
        mensaje = "RESPUESTA CORRECTA :)";
        correctas.push(index);
        puntaje += 10;
        color = 'green';
    } else {
        puntaje -= 5;
    }

    document.getElementById('puntaje').innerHTML = `Puntaje: ${puntaje}`;
    document.getElementById('divrpta').style.background = color;
    document.getElementById('divrpta').innerHTML = `${mensaje}<br>${explicaciones[index]}<br><img src="img/${imagenes[index]}" alt="Imagen relacionada" style="width:200px;">`;

    deshabilitarRadios('radios');
}

function verResultados() {
    mostrarDiv('resultados');
    let template = '';

    for (let i = 0; i < preguntas.length; i++) {
        template += '<p>';
        let estado = 'INCORRECTO';
        let classEstado = 'incorrecto';

        if (sinContestar.includes(i)) {
            estado = 'SIN CONTESTAR';
            classEstado = 'sincontestar';
        } else {
            for (let x of correctas) {
                if (x === i) {
                    estado = 'CORRECTO';
                    classEstado = 'correcto';
                    break;
                }
            }
        }

        template += `<h3>${preguntas[i]} <label class="${classEstado}">${estado}</label></h3>`;
        template += `<p>${explicaciones[i]}</p>`;
        template += `<img src="img/${imagenes[i]}" alt="Imagen relacionada" style="width:200px;">`;
        template += '</p>';
    }

    template += `<h2>Puntaje Final: ${puntaje}</h2>`;
    template += `<p><button class="btn blue" onclick="reiniciarJuego()">Reiniciar</button></p>`;
    document.getElementById('divresultado').innerHTML = template;
}

function mostrarDiv(div) {
    let ocultos = document.getElementsByClassName('box');
    for (let i = 0, len = ocultos.length; i < len; i++) {
        ocultos[i].style.display = 'none';
    }
    document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
    let rds = document.getElementsByClassName(radios);
    for (let i = 0, len = rds.length; i < len; i++) {
        rds[i].disabled = true;
    }
}

function reiniciar() {
    index = 0;
    correctas = [];
    sinContestar = [];
    preguntaRespondida = false;
    preguntas = [];
    alternativas = [];
    rptas = [];
    explicaciones = [];
    imagenes = [];
    puntaje = 0;
    document.getElementById('puntaje').innerHTML = `Puntaje: ${puntaje}`;
}


function reiniciarJuego() {
    reiniciar();
    mostrarDiv('inicio');
}
