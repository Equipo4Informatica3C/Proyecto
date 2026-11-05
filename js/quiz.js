// ============================================================
// Trivia: ¿cuánto sabés de San Pompilio?
// Proyecto Web - Rostros de la Santidad Escolapia
// Taller de Informática - 3.º C - Fase 4: JavaScript
// Integrantes: Chierico Francisco y Rodríguez Valentino
// ============================================================

// 1) ELEMENTOS DEL HTML que vamos a usar
const formulario = document.getElementById("form-trivia");
const botonResultado = document.getElementById("btn-resultado");
const botonReiniciar = document.getElementById("btn-reiniciar");
const parrafoResultado = document.getElementById("resultado");

// 2) FUNCIÓN: devuelve true si el usuario eligió alguna opción de esa pregunta.
//    "nombre" es el name de los radio buttons (pregunta1, pregunta2, ...)
function hayRespuesta(nombre) {
  const elegida = formulario.querySelector('input[name="' + nombre + '"]:checked');
  if (elegida === null) {
    return false;
  } else {
    return true;
  }
}

// 3) FUNCIÓN: corrige UNA pregunta.
//    Recibe el name de la pregunta, el value correcto y una explicación.
//    Devuelve 1 si acertó y 0 si no (así después podemos sumar los puntos).
function corregirPregunta(nombre, correcta, explicacion) {
  const elegida = formulario.querySelector('input[name="' + nombre + '"]:checked');
  const fieldset = elegida.parentElement; // el fieldset que contiene la pregunta

  // Si ya había un comentario de una corrección anterior, lo borramos
  const viejo = fieldset.querySelector(".feedback");
  if (viejo !== null) {
    viejo.remove();
  }

  // Creamos un párrafo nuevo para el comentario
  const comentario = document.createElement("p");
  comentario.className = "feedback";

  if (elegida.value === correcta) {
    fieldset.className = "pregunta correcta"; // el CSS la pinta de verde
    comentario.textContent = "✔ Correcto. " + explicacion;
    fieldset.appendChild(comentario);
    return 1;
  } else {
    fieldset.className = "pregunta incorrecta"; // el CSS la pinta de rojo
    comentario.textContent = "✘ Incorrecto. " + explicacion;
    fieldset.appendChild(comentario);
    return 0;
  }
}

// 4) FUNCIÓN: deja una pregunta como estaba al principio
function limpiarPregunta(nombre) {
  const primera = formulario.querySelector('input[name="' + nombre + '"]');
  const fieldset = primera.parentElement;

  const viejo = fieldset.querySelector(".feedback");
  if (viejo !== null) {
    viejo.remove();
  }

  fieldset.className = "pregunta";
}

// 5) VER RESULTADO: se ejecuta cuando el usuario hace clic en "Ver resultado"
function verResultado() {
  // Primero contamos cuántas preguntas faltan responder
  let sinResponder = 0;

  if (hayRespuesta("pregunta1") === false) {
    sinResponder = sinResponder + 1;
  }
  if (hayRespuesta("pregunta2") === false) {
    sinResponder = sinResponder + 1;
  }
  if (hayRespuesta("pregunta3") === false) {
    sinResponder = sinResponder + 1;
  }
  if (hayRespuesta("pregunta4") === false) {
    sinResponder = sinResponder + 1;
  }
  if (hayRespuesta("pregunta5") === false) {
    sinResponder = sinResponder + 1;
  }
  if (hayRespuesta("pregunta6") === false) {
    sinResponder = sinResponder + 1;
  }

  // Si falta alguna, avisamos y cortamos (return) sin corregir
  if (sinResponder > 0) {
    parrafoResultado.textContent =
      "Te faltan responder " + sinResponder + " pregunta(s). Respondé todas para ver tu resultado.";
    return;
  }

  // Si respondió todo, corregimos las 6 preguntas y sumamos los puntos
  let puntaje = 0;
  puntaje = puntaje + corregirPregunta("pregunta1", "1710", "Nació el 29 de septiembre de 1710 en Montecalvo Irpino.");
  puntaje = puntaje + corregirPregunta("pregunta2", "mamma-bella", "Llamaba \"Mamma Bella\" a la Virgen María.");
  puntaje = puntaje + corregirPregunta("pregunta3", "1934", "Fue canonizado el 19 de marzo de 1934 por el papa Pío XI.");
  puntaje = puntaje + corregirPregunta("pregunta4", "campi-salentina", "Murió el 15 de julio de 1766 en Campi Salentina.");
  puntaje = puntaje + corregirPregunta("pregunta5", "calasanz", "Siguió el carisma de San José de Calasanz, fundador de las Escuelas Pías.");
  puntaje = puntaje + corregirPregunta("pregunta6", "pan", "En la hambruna de 1765 repartió pan entre los que más sufrían.");

  // Mensaje final según el puntaje
  let mensaje = "";
  if (puntaje === 6) {
    mensaje = "¡Excelente! Conocés muy bien a San Pompilio.";
  } else if (puntaje >= 4) {
    mensaje = "¡Muy bien! Sabés bastante sobre su vida.";
  } else if (puntaje >= 2) {
    mensaje = "Vas bien, pero podés repasar un poco más la página.";
  } else {
    mensaje = "Leé de nuevo la página y volvé a intentarlo.";
  }

  parrafoResultado.textContent = "Acertaste " + puntaje + " de 6. " + mensaje;
}

// 6) REINICIAR: deja todo como al principio
function reiniciar() {
  formulario.reset(); // desmarca todas las opciones

  limpiarPregunta("pregunta1");
  limpiarPregunta("pregunta2");
  limpiarPregunta("pregunta3");
  limpiarPregunta("pregunta4");
  limpiarPregunta("pregunta5");
  limpiarPregunta("pregunta6");

  parrafoResultado.textContent = "";
}

// 7) EVENTOS: conectamos los botones con las funciones
botonResultado.addEventListener("click", verResultado);
botonReiniciar.addEventListener("click", reiniciar);
