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


// Función para calcular la edad a partir de una fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  let fechaActual = new Date();
  let fechaNac = new Date(fechaNacimiento);
  // Calcular la diferencia en milisegundos
  let diferencia = fechaActual - fechaNac;
  // Convertir la diferencia de milisegundos a años
  let edadEnMilisegundos = diferencia;
  let edadEnAnios = edadEnMilisegundos / (1000 * 60 * 60 * 24 * 365.25);
  edad = Math.floor(edadEnAnios);
  return edad;
}

//funcion fToggle.
function fToggle(elementoID, clase) {
  document.getElementById(elementoID).classList.toggle(clase);
}

//capta los valores de la 1er parte
function enviarDatos() {

  nombre = document.getElementById(`nombre`).value;
  apellido = document.getElementById(`apellido`).value;
  let fechaNacimiento = document.getElementById("fechaNacimiento").value;
  email = document.getElementById(`email`).value;
  edad = calcularEdad(fechaNacimiento);

  //check
  console.log(`Datos del usuario:\n Nombre: ${nombre}\n Apellido:${apellido}\n Edad: ${edad}\n Email: ${email}`);
}

// genero un saludo insertando un parrafo antes del 2do formulario.
function saludar() {
  let parrafo = document.createElement('p');
  parrafo.textContent = `Gracias ${nombre} por esa informacion. \nAhora vamos a necesitar los datos del prestamo que solicitas.`;
  let agregoMain = document.getElementsByTagName("main")[0]; 
  agregoMain.insertBefore(parrafo, document.getElementById('generarPrestamo'));
} 



document
  .getElementById(`botonContinuar`)
  .addEventListener(`click`, function(event) {
  event.preventDefault();
  enviarDatos();
  // oculto formulario de datos personales y muestro el formulario para los datos del prestamo.
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



// funcion para mostrar/borrar mensaje en dom. orden de parametros: orden, IdInput, mensaje
function mostrarBorrarMensajeDOM(orden, IdInput, mensaje) {
  switch (orden) {
    case "mostrar":
      if (document.getElementById("mensajeError")) return;
      let mensajeError = document.createElement("p");
      mensajeError.id = 'mensajeError';
      mensajeError.style.color = 'red';
      mensajeError.textContent = mensaje;

      const nombreInput = document.getElementById(IdInput);
      nombreInput.insertAdjacentElement('afterend', mensajeError);
    break;
    case "borrar":
      let borrarMensajeError = document.getElementById("mensajeError");
      if (borrarMensajeError) {
        borrarMensajeError.remove();}
    break;
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
      console.log("Ahora 12.");//ahora 12
      meses = 12;
      interes = 0.2;
      prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
      cuotasValido= true
      break;
    case "2":
      console.log("Ahora 48.");
      interes = 0.6;
      meses = 48;
      prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
      console.log("Console de f cuotas case 2. valor del prestamoAprobado: " +prestamoAprobado);
      cuotasValido= true
      break;
    case "4":
      console.log("Seleccionaste la opción de ingresar la cantidad de meses personalizada.");
      let cuotasExtraInput = document.getElementById("cuotasExtra");
      cuotasExtraInput.addEventListener('input', () => {
      // Funcion para validar el input CUOTASeXTRA referido a "Quiero mas cuotas" del #cuotas 
      // function validarCuotasExtra() {  
        // Las cuotas son un numero mayor a uno y menor a la cantidad de meses teorica equivalentes al rango entre la edad y a la edad limite de acceso de 80 anios.
        meses = parseFloat(cuotasExtraInput.value);
        if (isNaN(meses) || meses <= 1 || meses > ((80-edad)*12)) {
          mostrarBorrarMensajeDOM("mostrar","cuotasExtra", `La cantidad de cuotas debe ser mayor a un mes. Y Ud puede pedir un prestamo de maximo ${((80-edad)*12)} meses. Por favor ingrese un dato valido.`);
        } else {
          mostrarBorrarMensajeDOM("borrar","cuotasExtra", " ");
          cuotasValido= true;
          console.log("Console de f cuotas case 4 en la verificacion de meses. valor meses: " + meses);
          interes = 2.45;
          prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
          console.log("Console de f cuotas case 4 prestamoAprobado" +prestamoAprobado);
          }
      });
      
      break;
    default:
      alert("Elija una opcion valida");
  }
  }







// Obtener el input de ingresos
let ingresosInput = document.getElementById('ingresos');

// Agregar un evento input al input de ingresos para llamar a la función de validación
ingresosInput.addEventListener('input', validarIngresos);

// Obtener el input de ingresos
let egresosInput = document.getElementById('egresos');

// Agregar un evento input al input de ingresos para llamar a la función de validación
egresosInput.addEventListener('input', validarEgresos);

// Obtener el input de ingresos
let montoInput = document.getElementById('monto');

// Agregar un evento input al input de ingresos para llamar a la función de validación
montoInput.addEventListener('input', validarMonto);






let cantidadCuotas = document.getElementById("cuotas");



cantidadCuotas.addEventListener("change", (event) => {
  event.preventDefault();
  seleccionCuota = event.target.value;
  if (seleccionCuota === "1" || seleccionCuota === "2") {
      document.getElementById("contenedor").classList.add("hide");
      // console.log(seleccionCuota);
      // console.log(typeof(seleccionCuota));
  } else if (seleccionCuota === "3") {
      document.getElementById("contenedor").classList.remove("hide");
      seleccionCuota = "4"
  }
  cuotas();
});




function generarPrestamo() {
  if ( ingresoValido === false || egresoValido === false || montoValido === false || cuotasValido === false) {
    mostrarBorrarMensajeDOM("mostrar", "solicitud", `Algunos de los datos no son validos. Por favor verifique y vuelva a intentar.`); 
    return ;
  }
  //redondeo la cuota a dos decimales
  let cuotaPrestamoMensualConInteresRedondeado = Math.round(cuotaPrestamoMensualConInteres * 100) / 100;
  if (prestamoAprobado) {
    mostrarBorrarMensajeDOM("mostrar", "solicitud",`El prestamo por $${monto} esta aprobado. El dinero de la cuota mensual ( $${cuotaPrestamoMensualConInteresRedondeado}) se debitara de tu cuenta automaticanmente desde el proximo mes y durante los proximos ${meses} meses.
    Gracias por elergirnos.`);

  } else {
    mostrarBorrarMensajeDOM("mostrar", "solicitud", "El prestamo no fue aprobado. No se encuentran dadas las condiciones para otorgarle el credito. Gracias por su consulta.");
  }
}


document
  .getElementById(`generarPrestamo`)
  .addEventListener(`submit`, function(event) {
  event.preventDefault();
  
});

