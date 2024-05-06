let ingresos;
let egresos;
let monto;
let meses;
let cuotaPrestamoMensualConInteres;
let interes;
let maxCuotaMensual;
let interesMensual;


// array de objetos con los mensajes a utilizar
const mensajes = [
  { id: 1 , mensaje: "Bienvenidos al calculador de prestamos. \nVamos a necesitar cierta informacion para otorgarte el prestamo. Asi que tene a tu alcance los datos de tus ingresos y deudas. Para continuar ingrese su nombre"},
  { id: 2 , mensaje: "Por favor, introduzca el total sus ingresos mensuales.\nDebe ser en números, mayor de 0. \nEjemplo: 1200"},
  { id: 3 , mensaje: "Ingrese un valor valido."},
  { id: 4 , mensaje: "Ahora introduzca el total de deudas mensuales que tiene.\nPor ejemplo tarjetas de credito, prestamos, depositos judiciales, otros.\nDebe ser un número menor que tus ingresos y mayor o igual a 0. \nEjemplo: \n-12000 \n0"},
  { id: 5 , mensaje: "!Gracias por esa informacion¡. Ahora por favor introduzca el monto de dinero que desea pedir prestado."},
  { id: 6 , mensaje: `La información proporsionada es la siguiente: \nTotal de ingresos mensuales $${ingresos}. \nTotal de egresos mensuales $${egresos}. \nMonto del crédito solicitado $${monto}.`},
  { id: 7 , mensaje: "¿En cuántos meses quieres pagar? \nElige una de las siguientes opciones: \n1. Ahora 12 (C.F.T.: 20%) \n2. Ahora 48 (C.F.T.: 60%) \n3. Ingresar cantidad de meses personalizada (Interés anual: 245%) \nIngresa el número correspondiente a tu elección."},
  { id: 8 , mensaje: "Elegiste pagar en Ahora 12."},
  { id: 9 , mensaje: "El prestamo no puede ser concedido."},
  { id: 10 , mensaje: "El prestamo esta aprobado."},
  { id: 11 , mensaje: "Elegiste pagar en Ahora 48."},
  { id: 12 , mensaje: "Seleccionaste la opción de ingresar la cantidad de meses personalizada."},
  
];
// se genera funcion para acceder a los mensajes
function mensaje(id) {
  return mensajes[id-1].mensaje;
}

function cuotaPrestamo(ingresos, egresos, interes, meses) {
  maxCuotaMensual = (egresos - ingresos) * 0.3;
  interesMensual = interes / meses + 1;
  cuotaPrestamoMensualConInteres = interesMensual * (monto / meses);
  return cuotaPrestamoMensualConInteres <= maxCuotaMensual;
}


// // bienvenida al usario mas soliciud de nombre
// const nombre =  prompt(mensaje(1));

// // solicitud email
// const email = prompt("Por favor, ingrese su correo electrónico:");

// // validar si el correo electrónico tiene el símbolo "@"
// const validar = email.includes('@');

// // Mostrar el resultado de la validación
// if (validar) {
//   console.log("El correo electrónico es válido.");
// } else {
//   alert("El correo electrónico no es válido. Debe contener el símbolo '@'.");
// }

// solicitud de ingresos
ingresos =parseFloat(prompt(mensaje(2)));

// validacion dato ingresos
while (isNaN(ingresos) || ingresos <= 0) {
  alert(mensaje(3));
  ingresos = parseFloat(prompt(mensaje(2)));
}
// solicitud egresos
egresos = parseFloat(prompt(mensaje(4)));
// validacion dato egresos
while (isNaN(egresos) || egresos >= ingresos || egresos < 0) {
  alert(mensaje(3));
  egresos = parseFloat(prompt(mensaje(4)));
}

//solicitud cantidad de dinero a pedir prestado
monto = parseFloat(prompt(mensaje(5)));



console.log(mensaje(6));

// se solicita cantidad de cuotas
let consulta =parseInt(prompt(mensaje(7)));

switch (consulta) {
  case 1:
    console.log(mensaje(8));//ahora 12
    meses = 12;
    interes = 0.2;
    console.log(cuotaPrestamo(ingresos, egresos, interes, meses))
    if (cuotaPrestamo(ingresos, egresos, interes, meses)) {
      console.log(mensaje(10));//prestamo orotgado
    } else {
      console.log(mensaje(9));//prestamo rechazado
    }
    break;
  case 2:
    console.log(mensaje(11));
    interes = 0.6;
    meses = 48;
    if (cuotaPrestamo(ingresos, egresos, interes, meses)) {
      console.log(mensaje(10));//prestamo orotgado
    } else {
      console.log(mensaje(9));//prestamo rechazado
    }
    break;
  case 3:
    console.log(mensaje(12));
    meses = parseInt(prompt("¿En cuantos meses deseas pagar?"));
    interes = 2.45;
    if (cuotaPrestamo(ingresos, egresos, interes, meses)) {
      console.log(mensaje(10));//prestamo orotgado
    } else {
      console.log(mensaje(9));//prestamo rechazado
    }
    break;
  default:
    alert(mensaje(3)); // ingrese un valor valido
    break;
}
if (cuotaPrestamo(ingresos, egresos, interes, meses)) {
  mensajes.push({ id: 13 , mensaje: `El prestamo por $${monto} esta aprobado. El dinero de la cuota mensual ( $${cuotaPrestamoMensualConInteres}) se debitara de tu cuenta automaticanmente desde el proximo mes y durante los proximos ${meses} meses.`})

  alert(mensaje(13));

} else {
  alert("Gracias por elegirnos.");
}



