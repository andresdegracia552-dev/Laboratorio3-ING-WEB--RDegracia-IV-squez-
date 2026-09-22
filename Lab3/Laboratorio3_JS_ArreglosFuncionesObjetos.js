/* ===========================================================
   Laboratorio: Arreglos, Funciones y Objetos
   Completa cada TODO. Prueba cada función con console.log
   antes de avanzar a la siguiente parte.
   =========================================================== */

/* ---------------- PARTE 1: ARREGLOS ---------------- */

const inventario = ["teclado", "mouse", "monitor", "audífonos"];

function agregarItems(arr, alInicio, alFinal) {
  // TODO: devolver un NUEVO arreglo con alInicio al principio y alFinal al final
  return [alInicio, ...arr, alFinal];
}

console.log(inventario[inventario.length - 1]);
console.log(agregarItems(inventario, "cable HDMI", "webcam"));


const temperaturas = [18, 22, 25, 30, 15, 19, 27];

function aFahrenheit(arr) {
  // TODO: usar map
  return arr.map(temp => (temp * 9 / 5) + 32);
}

function diasCalurosos(arr, umbral) {
  // TODO: usar filter
  return arr.filter(temp => temp > umbral);
}

function promedio(arr) {
  // TODO: usar reduce
  return arr.reduce((total, temp) => total + temp, 0) / arr.length;
}

function temperaturaMaxima(arr) {
  // TODO
  return Math.max(...arr);
}

function buscarPrimerMayorA(arr, valor) {
  // TODO: usar find
  return arr.find(temp => temp > valor);
}

function ordenarDescendente(arr) {
  // TODO: copiar el arreglo antes de ordenar
  return [...arr].sort((a, b) => b - a);
}

console.log(aFahrenheit(temperaturas));
console.log(diasCalurosos(temperaturas, 25));
console.log(promedio(temperaturas));
console.log(temperaturaMaxima(temperaturas));
console.log(buscarPrimerMayorA(temperaturas, 20));
console.log(ordenarDescendente(temperaturas));



/* ---------------- PARTE 2: FUNCIONES ---------------- */
function procesarLista(arr, accion) {
  // TODO: recorrer arr aplicando "accion" a cada elemento y devolver un nuevo arreglo
  const resultado = [];

  for (const elemento of arr) {
    resultado.push(accion(elemento));
  }

  return resultado;
}

console.log(procesarLista([1, 2, 3, 4, 5], numero => numero * 2));
console.log(procesarLista(["javascript", "html", "css"], palabra => palabra.toUpperCase()));

function crearMultiplicador(factor) {
  // TODO: devolver una arrow function que multiplique su argumento por "factor"
  return numero => numero * factor;
}

/*Closure:
Un closure ocurre cuando una funcion interna recuerda y puede utilizar
variables de la funcion externa incluso despues de que esta haya terminado.

En este caso, la funcion que devuelve crearMultiplicador recuerda
el valor de "factor".*/

const porTres = crearMultiplicador(3);
console.log(porTres(10));

function dividirSeguro(a, b) {
  // TODO: lanzar un Error si b === 0, si no devolver a / b
  if (b === 0) {
    throw new Error("No se puede dividir entre cero.");
  }

  return a / b;
}

try {
  console.log(dividirSeguro(10, 2));
} catch (error) {
  console.log(error.message);
}

try {
  console.log(dividirSeguro(10, 0));
} catch (error) {
  console.log(error.message);
}


/* ---------------- PARTE 3: OBJETOS ---------------- */


const producto = {

  nombre: "Teclado mecánico",

  precio: 45,

  stock: 12,

  aplicarDescuento(porcentaje) {

    // TODO: devolver el precio con descuento, sin modificar this.precio

    return this.precio - (this.precio * porcentaje / 100);

  },

};

const catalogo = [

  { nombre: "Teclado", precio: 45, categoria: "periféricos", stock: 12 },

  { nombre: "Monitor", precio: 180, categoria: "pantallas", stock: 5 },

  { nombre: "Mouse", precio: 20, categoria: "periféricos", stock: 30 },

  { nombre: "Silla", precio: 150, categoria: "mobiliario", stock: 0 },

];

function productosDisponibles(catalogo) {

  // TODO

  return catalogo.filter(producto => producto.stock > 0);

}

function nombresPorCategoria(catalogo, categoria) {

  // TODO: usar desestructuración en el callback

  return catalogo

    .filter(({ categoria: cat }) => cat === categoria)

    .map(({ nombre }) => nombre);

}

function valorTotalInventario(catalogo) {

  // TODO: usar reduce

  return catalogo.reduce((total, producto) => {

    return total + (producto.precio * producto.stock);

  }, 0);

}

function productoMasCaro(catalogo) {

  // TODO

  return catalogo.reduce((masCaro, producto) => {

    return producto.precio > masCaro.precio ? producto : masCaro;

  });

}

console.log(producto.aplicarDescuento(20));

console.log(productosDisponibles(catalogo));

console.log(nombresPorCategoria(catalogo, "periféricos"));

console.log(valorTotalInventario(catalogo));

console.log(productoMasCaro(catalogo));

// La desestructuración hace el código más legible porque permite
// acceder directamente a las propiedades que necesitamos del objeto.

/* ---------------- PARTE 4: RETO INTEGRADOR ---------------- */

const ventas = [
  { producto: "Teclado", cantidad: 3, precioUnitario: 45 },
  { producto: "Monitor", cantidad: 1, precioUnitario: 180 },
  { producto: "Mouse", cantidad: 5, precioUnitario: 20 },
  { producto: "Teclado", cantidad: 2, precioUnitario: 45 },
  { producto: "Silla", cantidad: 1, precioUnitario: 150 },
];

function generarReporte(ventas) {

  const agrupado = ventas.reduce((acumulador, venta) => {

    if (!acumulador[venta.producto]) {
      acumulador[venta.producto] = {
        producto: venta.producto,
        cantidadTotal: 0,
        ingresoTotal: 0
      };
    }

    acumulador[venta.producto].cantidadTotal += venta.cantidad;

    acumulador[venta.producto].ingresoTotal +=
      venta.cantidad * venta.precioUnitario;

    return acumulador;

  }, {});


  const resumenPorProducto = Object.values(agrupado);


  const productosOrdenados = [...resumenPorProducto];

  productosOrdenados.sort((a, b) => {
    return b.cantidadTotal - a.cantidadTotal;
  });


  const productoTopVentas = productosOrdenados[0].producto;


  const totalVendido = ventas.reduce((total, venta) => {
    return total + (venta.cantidad * venta.precioUnitario);
  }, 0);


  return {
    totalVendido: totalVendido,
    numeroTransacciones: ventas.length,
    productoTopVentas: productoTopVentas,
    resumenPorProducto: resumenPorProducto
  };
}

    console.log(JSON.stringify(generarReporte(ventas), null, 2));