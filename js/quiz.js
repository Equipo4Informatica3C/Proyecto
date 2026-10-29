// ============================================================
// Quiz: ¿Cuánto sabés de San Pompilio María Pirrotti?
// Proyecto Web - Rostros de la Santidad Escolapia
// Taller de Informática - 3.º C - Fase 4: Funcionalidad con JavaScript
// Integrantes: Chierico Francisco y Rodríguez Valentino
// ============================================================

// 1) DATOS: cada pregunta es un objeto dentro de un arreglo (array).
//    - texto: la pregunta
//    - opciones: las respuestas posibles
//    - correcta: posición (empieza en 0) de la opción correcta
//    - explicacion: se muestra después de responder
const preguntas = [
  {
    texto: "¿En qué año nació San Pompilio María Pirrotti?",
    opciones: ["1650", "1710", "1766", "1890"],
    correcta: 1,
    explicacion: "Nació el 29 de septiembre de 1710 en Montecalvo Irpino, Italia."
  },
  {
    texto: "¿En qué país nació?",
    opciones: ["España", "Francia", "Italia", "Argentina"],
    correcta: 2,
    explicacion: "Nació en Montecalvo Irpino, en el sur de Italia."
  },
  {
    texto: "¿A qué orden religiosa ingresó?",
    opciones: [
      "Escuelas Pías (escolapios)",
      "Franciscanos",
      "Jesuitas",
      "Dominicos"
    ],
    correcta: 0,
    explicacion: "Ingresó en las Escuelas Pías, fundadas por San José de Calasanz, y tomó el nombre de Pompilio María."
  },
  {
    texto: "¿En qué año ingresó a las Escuelas Pías?",
    opciones: ["1726", "1700", "1750", "1766"],
    correcta: 0,
    explicacion: "Ingresó en 1726, cuando era joven."
  },
  {
    texto: "¿En qué ciudad murió?",
    opciones: ["Roma", "Campi Salentina", "Madrid", "Buenos Aires"],
    correcta: 1,
    explicacion: "Murió en Campi Salentina el 15 de julio de 1766."
  },
  {
    texto: "¿En qué año fue declarado santo (canonizado)?",
    opciones: ["1766", "1890", "1934", "2000"],
    correcta: 2,
    explicacion: "Fue canonizado en 1934 por el papa Pío XI (había sido beatificado en 1890)."
  },
  {
    texto: "¿Qué día se celebra su fiesta?",
    opciones: ["15 de julio", "25 de diciembre", "27 de agosto", "29 de septiembre"],
    correcta: 0,
    explicacion: "Su fiesta se celebra el 15 de julio, día de su muerte."
  }
];

// 2) VARIABLES DE ESTADO: guardan "en qué punto está" el juego.
let indiceActual = 0;   // número de la pregunta que se está mostrando
let puntaje = 0;        // cantidad de respuestas correctas
let respondida = false; // evita responder dos veces la misma pregunta

// 3) ELEMENTOS DEL HTML: los buscamos una sola vez con getElementById.
const elPregunta = document.getElementById("quiz-pregunta");
const elOpciones = document.getElementById("quiz-opciones");
const elFeedback = document.getElementById("quiz-feedback");
const elProgreso = document.getElementById("quiz-progreso");
const elBtnSiguiente = document.getElementById("quiz-siguiente");
const elJuego = document.getElementById("quiz-juego");
const elResultado = document.getElementById("quiz-resultado");
const elPuntaje = document.getElementById("quiz-puntaje");
const elMensaje = document.getElementById("quiz-mensaje");
const elBtnReiniciar = document.getElementById("quiz-reiniciar");

// 4) MOSTRAR UNA PREGUNTA
function mostrarPregunta() {
  respondida = false;
  const p = preguntas[indiceActual];

  elProgreso.textContent = "Pregunta " + (indiceActual + 1) + " de " + preguntas.length;
  elPregunta.textContent = p.texto;
  elFeedback.textContent = "";
  elFeedback.className = "";
  elBtnSiguiente.disabled = true;
  elOpciones.innerHTML = ""; // borra las opciones de la pregunta anterior

  // Por cada opción creamos un botón y le asignamos un evento click.
  p.opciones.forEach(function (textoOpcion, posicion) {
    const boton = document.createElement("button");
    boton.textContent = textoOpcion;
    boton.className = "quiz-opcion";
    boton.addEventListener("click", function () {
      responder(posicion, boton);
    });
    elOpciones.appendChild(boton);
  });

  // Texto del botón en la última pregunta
  elBtnSiguiente.textContent =
    indiceActual === preguntas.length - 1 ? "Ver resultado" : "Siguiente";
}

// 5) RESPONDER: compara lo elegido con la respuesta correcta.
function responder(posicionElegida, botonElegido) {
  if (respondida) return; // si ya respondió, no hace nada
  respondida = true;

  const p = preguntas[indiceActual];
  const botones = elOpciones.querySelectorAll("button");

  if (posicionElegida === p.correcta) {
    puntaje++;
    botonElegido.classList.add("correcta");
    elFeedback.textContent = "¡Correcto! " + p.explicacion;
    elFeedback.className = "feedback-ok";
  } else {
    botonElegido.classList.add("incorrecta");
    botones[p.correcta].classList.add("correcta"); // marca la correcta
    elFeedback.textContent = "Incorrecto. " + p.explicacion;
    elFeedback.className = "feedback-mal";
  }

  // Bloquea todos los botones y habilita "Siguiente"
  botones.forEach(function (b) {
    b.disabled = true;
  });
  elBtnSiguiente.disabled = false;
}

// 6) SIGUIENTE: avanza a la próxima pregunta o muestra el resultado.
function siguiente() {
  indiceActual++;
  if (indiceActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

// 7) RESULTADO FINAL
function mostrarResultado() {
  elJuego.hidden = true;
  elResultado.hidden = false;
  elPuntaje.textContent = puntaje + " / " + preguntas.length;

  let mensaje;
  if (puntaje === preguntas.length) {
    mensaje = "¡Excelente! Conocés muy bien a San Pompilio.";
  } else if (puntaje >= 5) {
    mensaje = "¡Muy bien! Sabés bastante sobre su vida.";
  } else if (puntaje >= 3) {
    mensaje = "Vas bien, pero podés repasar un poco más su historia.";
  } else {
    mensaje = "Leé de nuevo la página y volvé a intentarlo.";
  }
  elMensaje.textContent = mensaje;
}

// 8) REINICIAR
function reiniciar() {
  indiceActual = 0;
  puntaje = 0;
  elResultado.hidden = true;
  elJuego.hidden = false;
  mostrarPregunta();
}

// 9) EVENTOS FIJOS y ARRANQUE
elBtnSiguiente.addEventListener("click", siguiente);
elBtnReiniciar.addEventListener("click", reiniciar);
mostrarPregunta();
