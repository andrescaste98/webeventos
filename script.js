// script.js

// Generador de Texto Personalizado
document.getElementById("formularioGenerador").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos
    var fechaSeleccionada = new Date(document.getElementById("fechaGenerador").value + "T" + document.getElementById("horaGenerador").value);
    var nombre = document.getElementById("nombreGenerador").value;
    var alumno = document.getElementById("alumnoGenerador").value;
    var edad = document.getElementById("edad").value;
    var gradoEscolarTexto = document.getElementById("gradoEscolarTexto").value;
    var gradoEscolarSelect = document.getElementById("gradoEscolar").value;

    // Obtener día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
    var diaSemana = fechaSeleccionada.getDay();

    // Validar que no sea domingo (0)
    if (diaSemana === 0) {
        alert("No puedes seleccionar un evento para un domingo.");
        return; // Detener la ejecución del código
    }

    // Obtener valores de los checkboxes seleccionados
    var matematicas = document.getElementById("formularioGenerador").querySelector('input[name="matematicas"]').checked;
    var lectura = document.getElementById("formularioGenerador").querySelector('input[name="lectura"]').checked;
    var ingles = document.getElementById("formularioGenerador").querySelector('input[name="ingles"]').checked;
    var sesionInformativa = document.getElementById("formularioGenerador").querySelector('input[name="sesion_informativa"]').checked;
    var examenDiagnostico = document.getElementById("formularioGenerador").querySelector('input[name="examen_diagnostico"]').checked;
    var entregaResultados = document.getElementById("formularioGenerador").querySelector('input[name="entrega_resultados"]').checked;

    // Validar que al menos un checkbox esté seleccionado
    if (!sesionInformativa && !examenDiagnostico && !entregaResultados && !matematicas && !lectura && !ingles) {
        alert("Debes seleccionar al menos una opción (sesión informativa, examen diagnóstico, entrega de resultados o asignaturas).");
        return; // Detener la ejecución del código
    }

    // Validar que no se seleccionen los tres checkboxes al mismo tiempo
    if (sesionInformativa && examenDiagnostico && entregaResultados) {
        alert("No puedes seleccionar los tres checkboxes al mismo tiempo.");
        return; // Detener la ejecución del código
    }

    // Construir el texto generado
    var textoGenerado = `Hola ${nombre}, alumno ${alumno} de ${edad} años de edad y cursando ${gradoEscolarTexto}° de  ${gradoEscolarSelect}, tu evento está programado para el ${formatoFecha(fechaSeleccionada)} a las ${formatoHora(fechaSeleccionada)}.`;

    // Agregar las asignaturas seleccionadas al texto generado
    var asignaturas = [];
    if (matematicas) asignaturas.push("Matemáticas");
    if (lectura) asignaturas.push("Lectura");
    if (ingles) asignaturas.push("Inglés");

    if (asignaturas.length > 0) {
        textoGenerado += "<br>Asignaturas seleccionadas: " + asignaturas.join(", ");
    }

    // Agregar los checkboxes seleccionados al texto generado
    if (sesionInformativa && examenDiagnostico) {
        textoGenerado += "<br>Sesión Informativa y Examen Diagnóstico seleccionados.";
    } else {
        if (sesionInformativa) {
            textoGenerado += "<br>Sesión informativa seleccionada.";
        }
        if (examenDiagnostico) {
            textoGenerado += "<br>Examen Diagnóstico seleccionado.";
        }
        if (entregaResultados) {
            textoGenerado += "<br>Entrega de resultados seleccionada.";
        }
    }

    // Mostrar el texto generado en la página
    document.getElementById("resultadoGenerador").innerHTML = `<p>${textoGenerado}</p>`;

    // Copiar texto generado al portapapeles
    copiarTextoAlPortapapeles(textoGenerado);

    // Mostrar mensaje de copiado
    mostrarMensajeCopiado("resultadoGenerador");
});

// Reuniones de Avance
document.getElementById("formularioReuniones").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos
    var fecha = new Date(document.getElementById("fechaReuniones").value + "T" + document.getElementById("horaReuniones").value);
    var alumno = document.getElementById("alumno").value;

    // Obtener día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
    var diaSemana = fecha.getDay();

    // Validar que no sea domingo (0)
    if (diaSemana === 0) {
        alert("No puedes seleccionar un evento para un domingo.");
        return; // Detener la ejecución del código
    }

    // Construir el texto generado
    var textoGenerado = `Reunión de Avance para ${alumno} programada para el ${formatoFecha(fecha)} a las ${formatoHora(fecha)}.`;

    // Mostrar el texto generado en la página
    document.getElementById("resultadoReuniones").innerHTML = `<p>${textoGenerado}</p>`;

    // Copiar texto generado al portapapeles
    copiarTextoAlPortapapeles(textoGenerado);

    // Mostrar mensaje de copiado
    mostrarMensajeCopiado("resultadoReuniones");
});

// Función para formatear la fecha
function formatoFecha(fecha) {
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var nombreDia = diasSemana[fecha.getDay()];
    var numeroDia = fecha.getDate();
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var nombreMes = meses[fecha.getMonth()];
    return `${nombreDia} ${numeroDia} de ${nombreMes}`;
}

// Función para formatear la hora
function formatoHora(fecha) {
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var ampm = horas >= 12 ? 'pm' : 'am';
    horas = horas % 12;
    horas = horas ? horas : 12; // La hora '0' debe ser '12'
    return `${horas}:${minutos < 10 ? '0' + minutos : minutos}${ampm}`;
}

// Función para copiar texto al portapapeles
function copiarTextoAlPortapapeles(texto) {
    var textarea = document.createElement("textarea");
    textarea.value = texto.replace(/<br>/g, "\n").replace(/<\/?p>/g, ""); // Reemplazar <br> y <p> por saltos de línea
    textarea.style.position = "fixed"; // Evita que el textarea afecte el diseño de la página
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

// Función para mostrar mensaje de copiado
function mostrarMensajeCopiado(idResultado) {
    var mensajeCopiado = document.createElement("div");
    mensajeCopiado.textContent = "Texto generado copiado al portapapeles.";
    document.getElementById(idResultado).appendChild(mensajeCopiado);
}

// Configurar el botón para copiar el texto generado al portapapeles automáticamente
var btnCopiarGenerador = document.getElementById("btnCopiarGenerador");
btnCopiarGenerador.addEventListener("click", function() {
    copiarTextoAlPortapapeles(document.getElementById("resultadoGenerador").textContent);
});

var btnCopiarReuniones = document.getElementById("btnCopiarReuniones");
btnCopiarReuniones.addEventListener("click", function() {
    copiarTextoAlPortapapeles(document.getElementById("resultadoReuniones").textContent);
});

// Función para cambiar entre pestañas
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Establecer la primera pestaña activa al cargar la página
document.getElementsByClassName("tablinks")[0].click();

