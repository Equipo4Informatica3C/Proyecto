// ============================================================
// Trivia: ¿cuánto sabés de San Pompilio?
// Proyecto Web - Rostros de la Santidad Escolapia
// Taller de Informática - 3.º C - Fase 4: JavaScript
// Integrantes: Chierico Francisco y Rodríguez Valentino
// ============================================================

// 1) DATOS: un arreglo (array) con un objeto por pregunta.
//    - nombre: el atributo name de los radio buttons de esa pregunta en el HTML
//    - correcta: el value de la opción correcta
//    - explicacion: se muestra después de corregir
const preguntas = [
  {
    nombre: "pregunta1",
    correcta: "1710",
    explicacion: "Nació el 29 de septiembre de 1710 en Montecalvo Irpino."
  },
  {
    nombre: "pregunta2",
    correcta: "mamma-bella",
    explicacion: "Llamaba \"Mamma Bella\" a la Virgen María."
  },
  {
    nombre: "pregunta3",
    correcta: "1934",
    explicacion: "Fue canonizado el 19 de marzo de 1934 por el papa Pío XI."
  },
  {
    nombre: "pregunta4",
    correcta: "campi-salentina",
    explicacion: "Murió el 15 de julio de 1766 en Campi Salentina."
  },
  {
    nombre: "pregunta5",
    correcta: "calasanz",
    explicacion: "Siguió el carisma de San José de Calasanz, fundador de las Escuelas Pías."
  },
  {
    nombre: "pregunta6",
    correcta: "pan",
    explicacion: "En la hambruna de 1765 repartió pan entre los que más sufrían."
  }
];

// 2) ELEMENTOS DEL HTML que vamos a usar
const formulario = document.getElementById("form-trivia");
const botonResultado = document.getElementById("btn-resultado");
const botonReiniciar = document.getElementById("btn-reiniciar");
const parrafoResultado = document.getElementById("resultado");

// 3) CORREGIR: se ejecuta cuando el usuario hace clic en "Ver resultado"
function verResultado() {
  // Primero revisamos que haya respondido todo
  let sinResponder = 0;
  preguntas.forEach(function (p) {
    const elegida = formulario.querySelector('input[name="' + p.nombre + '"]:checked');
    if (elegida === null) {
      sinResponder++;
    }
  });

  if (sinResponder > 0) {
    parrafoResultado.textContent =
      "Te faltan responder " + sinResponder + " pregunta(s). Respondé todas para ver tu resultado.";
    return; // corta la función: no corrige todavía
  }

  // Si respondió todo, corregimos pregunta por pregunta
  let puntaje = 0;

  preguntas.forEach(function (p) {
    const elegida = formulario.querySelector('input[name="' + p.nombre + '"]:checked');
    // El fieldset es el "contenedor" de esa pregunta
    const fieldset = elegida.closest("fieldset");

    // Evitamos duplicar el comentario si se corrige dos veces
    const viejo = fieldset.querySelector(".feedback");
    if (viejo) {
      viejo.remove();
    }

    const comentario = document.createElement("p");
    comentario.className = "feedback";

    if (elegida.value === p.correcta) {
      puntaje++;
      fieldset.classList.remove("incorrecta");
      fieldset.classList.add("correcta");
      comentario.textContent = "✔ Correcto. " + p.explicacion;
    } else {
      fieldset.classList.remove("correcta");
      fieldset.classList.add("incorrecta");
      comentario.textContent = "✘ Incorrecto. " + p.explicacion;
    }

    fieldset.appendChild(comentario);
  });

  // Mensaje final según el puntaje
  let mensaje;
  if (puntaje === preguntas.length) {
    mensaje = "¡Excelente! Conocés muy bien a San Pompilio.";
  } else if (puntaje >= 4) {
    mensaje = "¡Muy bien! Sabés bastante sobre su vida.";
  } else if (puntaje >= 2) {
    mensaje = "Vas bien, pero podés repasar un poco más la página.";
  } else {
    mensaje = "Leé de nuevo la página y volvé a intentarlo.";
  }

  parrafoResultado.textContent =
    "Acertaste " + puntaje + " de " + preguntas.length + ". " + mensaje;
}

// 4) REINICIAR: deja todo como al principio
function reiniciar() {
  formulario.reset(); // desmarca todas las opciones

  formulario.querySelectorAll(".feedback").forEach(function (f) {
    f.remove();
  });

  formulario.querySelectorAll("fieldset").forEach(function (f) {
    f.classList.remove("correcta", "incorrecta");
  });

  parrafoResultado.textContent = "";
}

// 5) EVENTOS: conectamos los botones con las funciones
botonResultado.addEventListener("click", verResultado);
botonReiniciar.addEventListener("click", reiniciar);
