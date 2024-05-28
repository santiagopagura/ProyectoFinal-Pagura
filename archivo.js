let ingresos;
let egresos;
let monto;
let meses;
let cuotaPrestamoMensualConInteres;
let interes;
let maxCuotaMensual;
let interesMensual;
let historialPrestamos = [];
let nombre;
let apellido;
let edad;
let email;
let datos = [];

// Función para cargar los datos desde el archivo JSON
async function cargarDatos() {
  try {
    const response = await fetch("blackList.json");
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    datos = await response.json();
    console.log('Datos cargados:', datos);
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
}

cargarDatos();

// Función para calcular la edad a partir de una fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  let fechaActual = new Date();
  let fechaNac = new Date(fechaNacimiento);
  let diferencia = fechaActual - fechaNac;
  let edadEnMilisegundos = diferencia;
  let edadEnAnios = edadEnMilisegundos / (1000 * 60 * 60 * 24 * 365.25);
  edad = Math.floor(edadEnAnios);
  return edad;
}

// fToggle cambia la clase del id indicado.
function fToggle(elementoID, clase) {
  document.getElementById(elementoID).classList.toggle(clase);
}

//capta los valores nombre, apellido, email, fecha nacimiento y devuelve la edad.
function captaDatos() {
  nombre = document.getElementById(`nombre`).value;
  apellido = document.getElementById(`apellido`).value;
  let fechaNacimiento = document.getElementById("fechaNacimiento").value;
  email = document.getElementById(`email`).value;
  edad = calcularEdad(fechaNacimiento);
}

// genero un saludo insertando un parrafo antes del 2do formulario.
function saludar() {
  let parrafo = document.createElement('p');
  parrafo.textContent = `Gracias ${nombre} por esa informacion. \nAhora vamos a necesitar los datos del prestamo que solicitas.`;
  let agregoMain = document.getElementsByTagName("main")[0]; 
  agregoMain.insertBefore(parrafo, document.getElementById('generarPrestamo'));
} 

document.getElementById("datos-personales").addEventListener("submit", function(event) {
  event.preventDefault();
  captaDatos();
  // oculto form datos-personales y muestro generarPrestamo.
  fToggle("datos-personales", "hide");
  fToggle("generarPrestamo", "hide");
  saludar();
});


//SEGUNDA PARTE - FORMULARIO generarPrestamo

let ingresoValido= false;
let egresoValido= false;
let montoValido= false
let cuotasValido= false;
let seleccionCuota;
let prestamoAprobado = false;

// funcion para mostrar/borrar mensaje en dom. orden de parametros: accion, IdInput, mensaje
function mostrarBorrarMensajeDOM(accion, idInput, mensaje) {
  let mensajeError = document.getElementById("mensajeError");
  if (!mensajeError && accion === "mostrar") {
    mensajeError = document.createElement("p");
    mensajeError.id = "mensajeError";
    mensajeError.style.color = "red";
    mensajeError.textContent = mensaje;
    const input = document.getElementById(idInput);
    input.insertAdjacentElement("afterend", mensajeError);
  } else if (mensajeError && accion === "borrar") {
    mensajeError.remove();
  }
}

// VERIFICO DATOS:

// Función para validar los INGRESOS
function validarIngresos() {
  let ingresosInput = document.getElementById('ingresos');
  ingresos = parseFloat(ingresosInput.value);
  if (isNaN(ingresos) || ingresos <= 0) {
    mostrarBorrarMensajeDOM("mostrar","ingresos", 'Los ingresos deben ser un número positivo y distinto de cero.');
  } else {
    mostrarBorrarMensajeDOM("borrar","ingresos", "mensaje");
    ingresoValido= true;
  }
}

// Función para validar los EGRESOS
function validarEgresos() {
  let egresosInput = document.getElementById('egresos');
  egresos = parseFloat(egresosInput.value);
  if (isNaN(egresos) || egresos < 0) {
    mostrarBorrarMensajeDOM("mostrar","egresos", 'Los egresos deben ser un número positivo o igual a cero.');
  } else {
    mostrarBorrarMensajeDOM("borrar","egresos", " ");
    egresoValido= true;
  }
}

// Función para validar los MONTO
function validarMonto() {
  let montoInput = document.getElementById('monto');
  monto = parseFloat(montoInput.value);
  if (isNaN(monto) || monto <= 100) {
    mostrarBorrarMensajeDOM("mostrar","monto", "El monto de dinero a solicitar debe ser superior a $100.");
  } else {
    mostrarBorrarMensajeDOM("borrar","monto", " ");
    montoValido= true;
  }
}

// Obtener el input de ingresos
let ingresosInput = document.getElementById('ingresos');
ingresosInput.addEventListener('input', validarIngresos);

// Obtener el input de ingresos
let egresosInput = document.getElementById('egresos');
egresosInput.addEventListener('input', validarEgresos);

// Obtener el input de ingresos
let montoInput = document.getElementById('monto');
montoInput.addEventListener('input', validarMonto);

// se calcula con buleano si se aprueba o no el prestamo
function cuotaPrestamo(ingresos, egresos, interes, meses) {
  maxCuotaMensual = (ingresos - egresos) ;
  interesMensual = interes / meses + 1;
  cuotaPrestamoMensualConInteres = interesMensual * (monto / meses);

  return cuotaPrestamoMensualConInteres <= maxCuotaMensual;
}

// se asignan valores a parametros: meses, interes y devuelve si el prestamo esta aprobado o no.
function cuotas(){
  switch (seleccionCuota) {
    case "1":
      meses = 12;
      interes = 0.2;
      cuotasValido= true
      break;
    case "2":
      interes = 0.6;
      meses = 48;
      cuotasValido= true
      break;
    case "3":
      let cuotasExtraInput = document.getElementById("cuotasExtra");
      cuotasExtraInput.addEventListener('input', () => {
        meses = parseFloat(cuotasExtraInput.value);
        if (isNaN(meses) || meses <= 1 || meses > ((80-edad)*12)) {
          mostrarBorrarMensajeDOM("mostrar","cuotasExtra", `La cantidad de cuotas debe ser mayor a un mes. Y Ud puede pedir un prestamo de maximo ${((80-edad)*12)} meses. Por favor ingrese un dato valido.`);
        } else {
          mostrarBorrarMensajeDOM("borrar","cuotasExtra", " ");
          cuotasValido= true;
          console.log("Console de f cuotas case 4 en la verificacion de meses. valor meses: " + meses);
          interes = 2.45;
        }
      });
      
      break;
    default:
      console.log("error en cuotas");
  }
  }

let cantidadCuotas = document.getElementById("cuotas");
cantidadCuotas.addEventListener("change", (event) => {
  event.preventDefault();
  seleccionCuota = event.target.value;
  if (seleccionCuota === "1" || seleccionCuota === "2") {
      document.getElementById("contenedor").classList.add("hide");
  } else if (seleccionCuota === "3") {
      document.getElementById("contenedor").classList.remove("hide");
  }
  cuotas();
});


function generarPrestamo() {
  if (ingresoValido === false || egresoValido === false || montoValido === false || cuotasValido === false) {
    Swal.fire({
      icon: 'error',
      title: 'Datos inválidos',
      text: 'Algunos de los datos no son válidos. Por favor, verifique y vuelva a intentar.',
      showConfirmButton: true
    });
    return;
  }

  prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
  let cuotaPrestamoMensualConInteresRedondeado = Math.round(cuotaPrestamoMensualConInteres * 100) / 100;

  let solicitudCompleta = () => {
    if (datos.some(d => d.nombre === nombre && d.apellido === apellido)) {
      Swal.fire({
        icon: 'info',
        title: '¿¡Profes!',
        text: 'Este préstamo no es un soborno.',
        showConfirmButton: true
      });
    }
  };

  if (prestamoAprobado) {
    Swal.fire({
      icon: 'success',
      title: 'Préstamo Aprobado',
      html: `El préstamo por $${monto} está aprobado. El dinero de la cuota mensual ($${cuotaPrestamoMensualConInteresRedondeado}) se debitará de tu cuenta automáticamente desde el próximo mes y durante los próximos ${meses} meses.<br>Gracias por elegirnos.`,
      showConfirmButton: true
    }).then(solicitudCompleta);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Préstamo Rechazado',
      text: 'El préstamo no fue aprobado. No se encuentran dadas las condiciones para otorgarle el crédito. Gracias por su consulta.',
      showConfirmButton: true
    });
  }
  
  guardarHistorial();
  actualizarHistorial();
}








function guardarHistorial() {
 
  let historialPrestamos = JSON.parse(localStorage.getItem('historialPrestamos')) || [];
//prestamoAprobado = prestamoAprobado ? "APROBADO" : "RECHAZADO"
  prestamoAprobado ? prestamoAprobado = "APROBADO" :prestamoAprobado = "RECHAZADO";

  historialPrestamos.push({
    nombre: nombre,
    apellido: apellido,
    email: email,
    edad: edad,
    ingresos: ingresos,
    egresos: egresos,
    monto: monto,
    meses: meses,
    aprobado: prestamoAprobado,
  });
  localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));
}

function actualizarHistorial() {

historialPrestamos = JSON.parse(localStorage.getItem('historialPrestamos')) || [];
let historialContenedor = document.getElementById('historial');
historialContenedor.innerHTML = '';
let lista = document.createElement('ul');
// Iterar sobre cada préstamo en el historial y agregarlo a la lista
historialPrestamos.forEach((prestamo) => {
  let listaFila = document.createElement('li');
  listaFila.textContent = `Simulación número ${historialPrestamos.indexOf(prestamo) + 1}. Solicitante: ${prestamo.nombre} ${prestamo.apellido}. Monto solicitado: $${prestamo.monto}, a pagar en ${prestamo.meses} meses. Resolucion: ${prestamo.aprobado}.`;
  lista.appendChild(listaFila);
});
historialContenedor.appendChild(lista);
}

document
  .getElementById(`generarPrestamo`)
  .addEventListener(`submit`, function(event) {
  event.preventDefault();
  generarPrestamo();

});

