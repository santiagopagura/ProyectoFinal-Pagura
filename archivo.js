let ingresos;
let egresos;
let monto;
let meses;
let cuotaPrestamoMensualConInteres;
let interes;
let maxCuotaMensual;
let interesMensual;
let historialPrestamos = [];


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

// bienvenida al usario mas soliciud de nombre
const nombre =  prompt("Bienvenidos al calculador de prestamos. \nVamos a necesitar cierta informacion para otorgarte el prestamo. Asi que tene a tu alcance los datos de tus ingresos y deudas. Para continuar ingrese su nombre");

// solicitud email
const email = prompt("Por favor, ingrese su correo electrónico:");

// validar si el correo electrónico tiene el símbolo "@"
const validar = email.includes('@');

// Mostrar el resultado de la validación
if (validar) {
  console.log("El correo electrónico es válido.");
  } else {
  alert("El correo electrónico no es válido. Debe contener el símbolo '@'.");
}

// solicitud de ingresos
ingresos = parseFloat(prompt("Por favor, introduzca el total sus ingresos mensuales.\nDebe ser en números, mayor de 0. \nEjemplo: 1200"));
console.log(ingresos);
// validacion dato ingresos
while (isNaN(ingresos) || ingresos <= 0) {
  alert("Ingrese un valor valido.");
  ingresos = parseFloat(prompt("Por favor, introduzca el total sus ingresos mensuales.\nDebe ser en números, mayor de 0. \nEjemplo: 1200"));
}
// solicitud egresos
egresos = parseFloat(prompt("Ahora introduzca el total de deudas mensuales que tiene.\nPor ejemplo tarjetas de credito, prestamos, depositos judiciales, otros.\nDebe ser un número menor que tus ingresos y mayor o igual a 0. \nEjemplo: \n-12000 \n0"));
// validacion dato egresos
while (isNaN(egresos) || egresos >= ingresos || egresos < 0) {
  alert("Ingrese un valor valido.");
  egresos = parseFloat(prompt("Ahora introduzca el total de deudas mensuales que tiene.\nPor ejemplo tarjetas de credito, prestamos, depositos judiciales, otros.\nDebe ser un número menor que tus ingresos y mayor o igual a 0. \nEjemplo: \n-12000 \n0"));
}

//solicitud cantidad de dinero a pedir prestado
monto = parseFloat(prompt("!Gracias por esa informacion¡. Ahora por favor introduzca el monto de dinero que desea pedir prestado."));



console.log(`La información proporsionada es la siguiente: \nTotal de ingresos mensuales $${ingresos}. \nTotal de egresos mensuales $${egresos}. \nMonto del crédito solicitado $${monto}.`);

// se solicita cantidad de cuotas
let consulta = parseInt(prompt("¿En cuántos meses quieres pagar? \nElige una de las siguientes opciones: \n1. Ahora 12 (C.F.T.: 20%) \n2. Ahora 48 (C.F.T.: 60%) \n3. Ingresar cantidad de meses personalizada (Interés anual: 245%) \nIngresa el número correspondiente a tu elección."));

let prestamoAprobado = false;


switch (consulta) {
  case 1:
    console.log("Elegiste pagar en Ahora 12.");//ahora 12
    meses = 12;
    interes = 0.2;
    prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    break;
  case 2:
    console.log("Elegiste pagar en Ahora 48.");
    interes = 0.6;
    meses = 48;
    prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    break;
  case 3:
    console.log("Seleccionaste la opción de ingresar la cantidad de meses personalizada.");
    meses = parseInt(prompt("¿En cuantos meses deseas pagar?"));
    interes = 2.45;
    prestamoAprobado = cuotaPrestamo(ingresos, egresos, interes, meses);
    break;
  default:
    alert("Ingrese un valor valido."); // ingrese un valor valido
    break;
}

console.log("resultado del switch " +prestamoAprobado );

if (prestamoAprobado) {
  alert(`El prestamo por $${monto} esta aprobado. El dinero de la cuota mensual ( $${cuotaPrestamoMensualConInteres}) se debitara de tu cuenta automaticanmente desde el proximo mes y durante los proximos ${meses} meses.`);

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
})

console.log(historialPrestamos);