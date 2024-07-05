// Generador de Texto Personalizado

document.getElementById("formularioGenerador").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    // Obtener valores de los campos
    var fechaSeleccionada = new Date(document.getElementById("fechaGenerador").value + "T" + document.getElementById("horaGenerador").value);
    var nombre = document.getElementById("nombreGenerador").value;
    var telefono = document.getElementById("telefonoGenerador").value;
    var alumno = document.getElementById("alumnoGenerador").value;
    var edad = document.getElementById("edad").value;
    var gradoEscolarTexto = document.getElementById("gradoEscolarTexto").value;
    var gradoEscolarSelect = document.getElementById("gradoEscolar").value;
    var modalidadGenerador = document.getElementById("modalidadGenerador").value;



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

    // Obtener valor de la lista desplegable para la modalidad
    // var modalidad = document.getElementById("modalidadGenerador").value;
 
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
    var textoGenerado = "";

    // Agregar los checkboxes seleccionados al inicio del texto generado
    if (sesionInformativa && examenDiagnostico) {
        textoGenerado += "ℹ 📝 *SESIÓN INFORMATIVA Y EXAMEN DIAGNÓSTICO* ℹ 📝<br>";
    } else {
        if (sesionInformativa) {
            textoGenerado += "ℹ *SESIÓN INFORMATIVA* ℹ<br>";
        }
        if (examenDiagnostico) {
            textoGenerado += "📝 *EXAMEN DIAGNÓSTICO* 📝<br>";
        }
        if (entregaResultados) {
            textoGenerado += "🔎 *ENTREGA DE RESULTADOS* 🔎<br>";
        }
    }

    // Agregar los checkboxes seleccionados de materias al inicio del texto generado
    if (matematicas) {
        textoGenerado += "Matemáticas ";
    }
    if (lectura) {
        textoGenerado += "Lectura ";
    }
    if (ingles) {
        textoGenerado += "Inglés";
    }

    if (modalidadGenerador === "") {
        alert("Debes seleccionar una modalidad.");
        return; // Detener la ejecución del código
    }

    // Agregar el texto principal después de los checkboxes
    textoGenerado += `<br><br>🧑🏻  *${nombre}*<br>📅  *${formatoFecha(fechaSeleccionada)}*<br>🕓  *${formatoHora(fechaSeleccionada)}*<br>📍 *${modalidadGenerador}*<br>☎  *${telefono}*<br>-------------------------<br>*Información del alumno:*<br><br>${alumno}, ${edad} años<br>${gradoEscolarTexto}° de ${gradoEscolarSelect}`;

    // Mostrar el texto generado en la página
    document.getElementById("resultadoGenerador").innerHTML = textoGenerado;

    // Copiar texto generado al portapapeles
    copiarTextoAlPortapapeles(textoGenerado);

    // Mostrar mensaje de copiado
    mostrarMensajeCopiado("resultadoGenerador");

//     {document.getElementById("btnResetGenerador").addEventListener("reset")
//     //     document.getElementById('formularioGenerador').reset();
//     //     document.getElementById("resultadoGenerador").innerHTML = "as";
//     alert("test");
// }



});

// Obtener el botón por su ID
var btnResetGenerador = document.getElementById('btnResetGenerador');

// Agregar un listener para el evento click
btnResetGenerador.addEventListener('click', function() {
    // Llamar a la función que deseas ejecutar al hacer clic en el botón
    limpiarGenerador(); // Esta función deberías definirla más abajo en tu archivo JS
});

// Definir la función que se ejecutará al hacer clic en el botón
function limpiarGenerador() {
    // Aquí puedes colocar el código para limpiar o resetear lo que necesites
    document.getElementById("resultadoGenerador").innerHTML = "";
    console.log('Se ha limpiado el generador'); // Ejemplo de mensaje en consola
}













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
    var textoGenerado = `Buenas tardes.<br><br>Nos gustaría agendar con usted una *Reunión de Avances*, en donde se tratarán temas relacionados con el desempeño de *${alumno}*, y también podremos solventar sus dudas o inquietudes.<br><br>Detalles de la reunión:<br>📅  *${formatoFecha(fecha)}*<br>🕓  *${formatoHora(fecha)}*<br><br>La reunión será llevada a cabo por *Zoom*.<br>Utilice el siguiente enlace para acceder a la reunión:<br>🔗  https://kumon.zoom.us/j/81600498243?pwd=TTk2Q1E3TW1PSVV1MXdJeXNvb2lJdz09<br><br>*¿Confirmamos la reunión o le gustaría agendar otro día?*`


    // Mostrar el texto generado en la página
    document.getElementById("resultadoReuniones").innerHTML = `<p>${textoGenerado}</p>`;

    // Copiar texto generado al portapapeles
    copiarTextoAlPortapapeles(textoGenerado);

    // Mostrar mensaje de copiado
    mostrarMensajeCopiado("resultadoReuniones");
});

// Manejar la lógica para mostrar/ocultar el tercer día en el formulario de Nuevo Ingreso
document.getElementById("tercerDia").addEventListener("change", function() {
    var tercerDiaContenido = document.getElementById("tercerDiaContenido");
    if (this.checked) {
        tercerDiaContenido.style.display = "block";
    } else {
        tercerDiaContenido.style.display = "none";
    }
});

function formatearHora(hora) {
    const [horaComponentes, minutoComponentes] = hora.split(":");
    let horaFormateada = parseInt(horaComponentes);
    let periodo = 'am';

    if (horaFormateada >= 12) {
        periodo = 'pm';
        if (horaFormateada > 12) {
            horaFormateada -= 12;
        }
    }
    if (horaFormateada === 0) {
        horaFormateada = 12;
    }

    return `${horaFormateada}:${minutoComponentes} ${periodo}`;
}


// Generar texto personalizado para el formulario de Nuevo Ingreso
document.getElementById("formularioNuevoIngreso").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos
    var alumno = document.getElementById("alumnoNuevoIngreso").value;
    var fechaSeleccionada = new Date(document.getElementById("fechaNuevoIngreso").value);
    var modalidad = document.getElementById("modalidadNuevoIngreso").value;
    var dia1 = document.getElementById("dia1").value;
    var hora1 = formatearHora(document.getElementById("hora1").value);
    var dia2 = document.getElementById("dia2").value;
    var hora2 = formatearHora(document.getElementById("hora2").value);
    var textoGenerado = `*. : | NUEVO INGRESO | : .*<br><br>*${alumno}* se incorpora a Kumon Coyoacán Oriente.<br>*Primera sesión: ${formatoFecha(fechaSeleccionada)}.*<br><br>Horarios:<br>${dia1} - ${hora1}<br>${dia2} - ${hora2}<br><br>Modalidad: ${modalidad}<br><br>Asistente: `;

        // Obtener día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
        var diaSemana = fechaSeleccionada.getDay();

        // Validar que no sea domingo (0)
        if (diaSemana === 6) {
            alert("No puedes seleccionar un evento para un domingo.");
            return; // Detener la ejecución del código
        }


    // Comprobar si el checkbox de Tercer día está seleccionado
    if (document.getElementById("tercerDia").checked) {
        var dia3 = document.getElementById("dia3").value;
        var hora3 = (document.getElementById("hora3").value);
        textoGenerado += `<br>Día 3: ${dia3} a las ${hora3}`;
    }

    // Mostrar el texto generado en la página
    document.getElementById("resultadoNuevoIngreso").innerHTML = textoGenerado;

    // Copiar texto generado al portapapeles
    copiarTextoAlPortapapeles(textoGenerado);
});

// Configurar el botón para copiar el texto generado al portapapeles automáticamente
var btnCopiarNuevoIngreso = document.getElementById("btnCopiarNuevoIngreso");
btnCopiarNuevoIngreso.addEventListener("click", function() {
    copiarTextoAlPortapapeles(document.getElementById("resultadoNuevoIngreso").innerHTML);
});

// Función para copiar texto al portapapeles
function copiarTextoAlPortapapeles(texto) {
    var textarea = document.createElement("textarea");
    textarea.value = texto.replace(/<br>/g, "\n");
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}








                // FALTAS

    document.getElementById("formularioFaltas").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
    
        // Obtener valores de los campos
        var alumno = document.getElementById("alumnoFaltas").value;
        var motivo = document.getElementById("motivoFaltas").value;
        var solicitaMaterial = document.getElementById("solicitaMaterial").checked;
        var cuandoPasan = document.getElementById("cuandoPasan").value;
    
        // Construir el texto generado
        var textoGenerado = `*. : | INCIDENCIA | : .*<br><br>El alumno *${alumno}* no asiste a la sesión de hoy.<br>*Motivo*: ${motivo}<br><br>`;
        textoGenerado += solicitaMaterial ? `✅ *Solicita material* ✅<br>Pasarán por el ${cuandoPasan}<br><br>` : `❌ *No solicita material* ❌<br><br>`;
    
        // Mostrar el texto generado en la página
        document.getElementById("resultadoFaltas").innerHTML = `<p>${textoGenerado}</p>`;
    
        // Copiar texto generado al portapapeles
        copiarTextoAlPortapapeles(textoGenerado);
    
        // Mostrar mensaje de copiado
        mostrarMensajeCopiado("resultadoFaltas");
    });

    // Mostrar u ocultar el campo "Cuando pasan" basado en el checkbox
document.getElementById("solicitaMaterial").addEventListener("change", function() {
    var cuandoPasanDiv = document.getElementById("cuandoPasanDiv");
    cuandoPasanDiv.style.display = this.checked ? "block" : "none";
});

function formatoFecha(fecha) {
    // Convertir la fecha a la zona horaria local
    var fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);

    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var nombreDia = diasSemana[fechaLocal.getDay()];
    var numeroDia = fechaLocal.getDate();
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var nombreMes = meses[fechaLocal.getMonth()];

    return `${nombreDia}, ${numeroDia} de ${nombreMes}`;
}



// Función para formatear la hora
function formatoHora(fecha) {
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var ampm = horas >= 12 ? 'pm' : 'am';
    horas = horas % 12;
    horas = horas ? horas : 12; // La hora '0' debe ser '12'
    return `${horas}:${minutos < 10 ? '0' + minutos : minutos} ${ampm}`;
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
    // mensajeCopiado.textContent = "Texto generado copiado al portapapeles.";
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
document.getElementsByClassName("tablinks")[3].click();