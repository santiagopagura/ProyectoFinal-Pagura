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
function calcularEdad(edad) {
  // Obtener la fecha actual
  let fechaActual = new Date();

  // Convertir la fecha de nacimiento a objeto Date
  let fechaNac = new Date(edad);

  // Calcular la diferencia en milisegundos entre las dos fechas
  let diferencia = fechaActual - fechaNac;

  // Convertir la diferencia de milisegundos a años
  let edadEnMilisegundos = diferencia;
  let edadEnAnios = edadEnMilisegundos / (1000 * 60 * 60 * 24 * 365.25); // 1 año en milisegundos considerando años bisiestos

  // Redondear la edad hacia abajo
  edad = Math.floor(edadEnAnios);

  return edad;
}



function enviarDatos() {
// bienvenida al usario mas soliciud de nombre
  nombre = document.getElementById(`nombre`).value;
  apellido = document.getElementById(`apellido`).value;
  edad = document.getElementById(`edad`).value;

// solicitud email
  email = document.getElementById(`email`).value;//prompt("Por favor, ingrese su correo electrónico:");

// // validar si el correo electrónico tiene el símbolo "@"
// const validar = email.includes('@');
// // Mostrar el resultado de la validación
// if (validar) {
//   console.log("El correo electrónico es válido.");
//   } else {
//   alert("El correo electrónico no es válido. Debe contener el símbolo '@'.");
// }
edad = calcularEdad(edad);

 // Mostrar los datos obtenidos en la consola
 console.log(`Nombre: ${nombre}`);
 console.log(`Apellido: ${apellido}`);
 console.log(`Edad: ${edad}`);
 console.log(`Email: ${email}`);

console.log(`Datos de la persona. \n Nombre: ${nombre}\n Apellido:${apellido}`);

}



// genero un saludo insertando un parrafo.
function saludar() {
  let parrafo = document.createElement('p');
  parrafo.textContent = `Gracias ${nombre} por esa informacion. \nAhora vamos a necesitar los datos del prestamo que solicitas.`;
  let agregoMain = document.getElementsByTagName("main")[0];
  agregoMain.insertBefore(parrafo, document.getElementById('generarPrestamo'));
}

document
  .getElementById(`datos-personales`)
  .addEventListener(`submit`, function(event) {
  event.preventDefault();
  enviarDatos();
  // oculto formulario de datos personales y muestro el formulario para los datos del prestamo.
  let transicion = document.getElementById("datos-personales");
  transicion.className= "hide";
  transicion = document.getElementById("generarPrestamo");
  transicion.className= "";
  saludar();

});




function cuotaPrestamo(ingresos, egresos, interes, meses) {
  console.log("ingresos funcion " + ingresos)
  maxCuotaMensual = (ingresos - egresos) ;
  console.log("max cuota funcion " +maxCuotaMensual)
  interesMensual = interes / meses + 1;
  console.log("interese mensual funcion " +interesMensual)
  cuotaPrestamoMensualConInteres = interesMensual * (monto / meses);
  console.log("cuota con interes funcion " + cuotaPrestamoMensualConInteres)
  return cuotaPrestamoMensualConInteres <= maxCuotaMensual;
}

let ingresoValido= false;
let egresoValido= false;
let montoValido= false;

// Función para validar los ingresos ingresados por el usuario
function validarIngresos() {
  // preventDefault();
  // Obtener el valor de los ingresos ingresados por el usuario
  let ingresosInput = document.getElementById('ingresos');
  ingresos = parseFloat(ingresosInput.value);

  // Obtener el elemento donde se mostrará el mensaje de validación
  let mensajeElement = document.getElementById('mensajeIngresos');

  // Verificar si los ingresos son un número positivo y distinto de cero
  if (isNaN(ingresos) || ingresos <= 0) {
      mensajeElement.textContent = 'Los ingresos deben ser un número positivo y distinto de cero.';
      ingresosInput.style.border = '2px solid red'; // Cambiar el borde del input a rojo border-color: 
      ingresoValido= true;
  } else {
      mensajeElement.textContent = ''; // Borrar el mensaje de validación si los ingresos son válidos
      ingresosInput.style.border = ''; // Restaurar el color del borde del input
  }
}

// Función para validar los EGRESOS ingresados por el usuario
function validarEgresos() {
  // preventDefault();
  // Obtener el valor de los ingresos ingresados por el usuario
  let egresosInput = document.getElementById('egresos');
  egresos = parseFloat(egresosInput.value);

  // Obtener el elemento donde se mostrará el mensaje de validación
  let mensajeElement = document.getElementById('mensajeEgresos');

  // Verificar si los ingresos son un número positivo igual de cero
  if (isNaN(egresos) || egresos < 0) {
      mensajeElement.textContent = 'Los egresos deben ser un número positivo o igual a cero.';
      egresosInput.style.border = '2px solid red'; // Cambiar el borde del input a rojo border-color: 
      egresoValido= true;
  } else {
      mensajeElement.textContent = ''; // Borrar el mensaje de validación si los ingresos son válidos
      egresosInput.style.border = ''; // Restaurar el color del borde del input
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




// Función para validar los MONTO ingresados por el usuario
function validarMonto() {
  // preventDefault();
  // Obtener el valor de los ingresos ingresados por el usuario
  let montoInput = document.getElementById('monto');
  monto = parseFloat(montoInput.value);

  // Obtener el elemento donde se mostrará el mensaje de validación
  let mensajeElement = document.getElementById('mensajeMonto');

  // Verificar si los ingresos son un número positivo igual de cero
  if (isNaN(monto) || monto <= 100) {
      mensajeElement.textContent = 'El monto de dinero a solicitar debe ser superior a $100.';
      montoInput.style.border = '2px solid red'; // Cambiar el borde del input a rojo border-color: 
      montoValido= true;
  } else {
      mensajeElement.textContent = ''; // Borrar el mensaje de validación si los ingresos son válidos
      montoInput.style.border = ''; // Restaurar el color del borde del input
  }
}


// Obtener el input de ingresos
let montoInput = document.getElementById('monto');

// Agregar un evento input al input de ingresos para llamar a la función de validación
montoInput.addEventListener('input', validarMonto);


let prestamoAprobado = false;
function cuotas(){

switch (consulta) {
  case "1":
    console.log("Elegiste pagar en Ahora 12.");//ahora 12
    meses = 12;
    interes = 0.2;
    prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    break;
  case "2":
    console.log("Elegiste pagar en Ahora 48.");
    interes = 0.6;
    meses = 48;
    prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    break;
  case "3":
    console.log("Seleccionaste la opción de ingresar la cantidad de meses personalizada.");
    meses = parseFloat(document.getElementById("cuotasExtra")).value;
    if (meses <= (edad*12)) {
      interes = 2.45;
      prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    } else {
      alert(`Ud puede medir un prestamo de maximo ${(edad*12)}meses. Por favor ingrese un dato valido.`)
    }
    break;
  default:
    alert("Ingrese un valor valido."); // ingrese un valor valido
    break;
}
}

let consulta = document.getElementById("cuotas");
let masCuotas = document.querySelector("#masCuotas");

consulta.addEventListener("change", (event) => {  
  event.preventDefault();
  consulta = event.target.value;
  if (consulta == "1" || consulta == "2") {
    consulta = consulta;
    // masCuotas.className ="hide"
  } else if (consulta == "3") {
    masCuotas.innerHTML= `<label for="monto">Indiquie durante cuantos meses desea pagar</label> <input type="number" id="cuotasExtra" placeholder="cantidad de meses">`;
  

  } else {
    alert("Debe seleccionar una opcion.")
  }
  cuotas();
})


function generarPrestamo() {
  /*
// solicitud de ingresos
ingresos = document.getElementById("ingresos").value;// parseFloat(prompt("Por favor, introduzca el total sus ingresos mensuales.\nDebe ser en números, mayor de 0. \nEjemplo: 1200"));

//convierto a numero. ¿Por que si defino esa variable en el input como number, aqui aparece como string?
ingresos = parseFloat(ingresos);
console.log("ingreso es un dato tipo" + typeof(ingresos));
// validacion dato ingresos
while (isNaN(ingresos) || ingresos <= 0) {
  alert("Ingrese un valor valido.");
  ingresos = parseFloat(prompt("Por favor, introduzca el total sus ingresos mensuales.\nDebe ser en números, mayor de 0. \nEjemplo: 1200"));
}
// solicitud egresos
egresos = document.getElementById("egresos").value;// parseFloat(prompt("Ahora introduzca el total de deudas mensuales que tiene.\nPor ejemplo tarjetas de credito, prestamos, depositos judiciales, otros.\nDebe ser un número menor que tus ingresos y mayor o igual a 0. \nEjemplo: \n-12000 \n0"));
egresos = parseFloat(egresos);
console.log("egresos es un dato tipo" + typeof(egresos));
// validacion dato egresos
while (isNaN(egresos) || egresos >= ingresos || egresos < 0) {
  alert("Ingrese un valor valido.");
  egresos = parseFloat(prompt("Ahora introduzca el total de deudas mensuales que tiene.\nPor ejemplo tarjetas de credito, prestamos, depositos judiciales, otros.\nDebe ser un número menor que tus ingresos y mayor o igual a 0. \nEjemplo: \n-12000 \n0"));
}


//solicitud cantidad de dinero a pedir prestado
monto = document.getElementById("monto").value;// parseFloat(prompt("!Gracias por esa informacion¡. Ahora por favor introduzca el monto de dinero que desea pedir prestado."));



console.log(`La información proporsionada es la siguiente: \nTotal de ingresos mensuales $${ingresos}. \nTotal de egresos mensuales $${egresos}. \nMonto del crédito solicitado $${monto}.`);

// se solicita cantidad de cuotas
let consulta = document.getElementById("tiempo").value;

console.log(typeof(consulta));

let prestamoAprobado = false;


switch (consulta) {
  case "1":
    console.log("Elegiste pagar en Ahora 12.");//ahora 12
    meses = 12;
    interes = 0.2;
    prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    break;
  case "2":
    console.log("Elegiste pagar en Ahora 48.");
    interes = 0.6;
    meses = 48;
    prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    break;
  case "3":
    console.log("Seleccionaste la opción de ingresar la cantidad de meses personalizada.");
    meses = parseInt(prompt("¿En cuantos meses deseas pagar?"));
    if (meses <= (edad*12)) {
      interes = 2.45;
      prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    } else {
      alert(`Ud puede medir un prestamo de maximo ${(edad*12)}meses. Por favor ingrese un dato valido.`)
    }
    break;
  default:
    alert("Ingrese un valor valido."); // ingrese un valor valido
    break;
}
*/
console.log("resultado del switch " +prestamoAprobado );

//redondeo la cuota a dos decimales
let cuotaPrestamoMensualConInteresRedondeado = Math.round(cuotaPrestamoMensualConInteres * 100) / 100;

if (prestamoAprobado) {
  alert(`El prestamo por $${monto} esta aprobado. El dinero de la cuota mensual ( $${cuotaPrestamoMensualConInteresRedondeado}) se debitara de tu cuenta automaticanmente desde el proximo mes y durante los proximos ${meses} meses.`);

} else {
  alert("Gracias por elegirnos.");
}


historialPrestamos.push({
  nombre: nombre,
  email: email,
  ingresos: ingresos,
  egresos: egresos,
  monto: monto,
  meses: meses,
  aprobado: prestamoAprobado,
});

// Función para mostrar el historial en la página
function mostrarHistorial() {
  // Recuperar historial del localStorage o inicializar como array vacío si no hay historial guardado
  let historial = JSON.parse(localStorage.getItem('historialPrestamos')) || [];

  // Obtener elemento donde se mostrará el historial
  let historialElement = document.getElementById('historial');

  // Limpiar el contenido actual del elemento
  historialElement.innerHTML = '';

  // Crear una lista desordenada (ul)
  let lista = document.createElement('ul');

  // Recorrer el historial y crear elementos de lista para cada préstamo
  historial.forEach(prestamo => {
      let elementoLista = document.createElement('li');
      elementoLista.textContent = `Nombre: ${prestamo.nombre}, Email: ${prestamo.email}, Monto: ${prestamo.monto}`;
      lista.appendChild(elementoLista);
  });

  // Agregar la lista al elemento del historial
  historialElement.appendChild(lista);
}

// Función para agregar un nuevo préstamo al historial y actualizar el localStorage
function agregarPrestamoAlHistorial(prestamo) {
  // Recuperar historial del localStorage o inicializar como array vacío si no hay historial guardado
  let historial = JSON.parse(localStorage.getItem('historialPrestamos')) || [];

  // Agregar el nuevo préstamo al historial
  historial.push(prestamo);

  // Guardar el historial actualizado en el localStorage
  localStorage.setItem('historialPrestamos', JSON.stringify(historial));

  // Mostrar el historial actualizado en la página
  mostrarHistorial();
}

// Llamar a la función para mostrar el historial cuando se cargue la página
mostrarHistorial();


}


document
  .getElementById(`generarPrestamo`)
  .addEventListener(`submit`, function(event) {
  event.preventDefault();
  generarPrestamo();
  // let conti = document.getElementById("datos-personales");
  // conti.className= "hide";
});