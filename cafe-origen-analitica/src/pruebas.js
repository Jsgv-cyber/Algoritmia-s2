const assert = require('node:assert/strict');

const ventas = require('./datos');
const clientesRecurrentes = require('./recurrentes');

const {
  totalVendido,
  ticketPromedio,
  ventaMayor
} = require('./analitica');

const {
  buscarComboFuerzaBruta,
  buscarComboMap,
  primerClienteUnico,
  mejorVentana7Dias
} = require('./estratigias');

const catalogo = require('./catalogo');

// Pruebas de las funciones de analítica.
assert.equal(totalVendido([]), 0);
assert.equal(ticketPromedio([]), 0);
assert.equal(ventaMayor([]), null);

// Prueba de clientes recurrentes.
assert.deepEqual(
  clientesRecurrentes(ventas),
  ['C01', 'C02', 'C03']
);

// Prueba del primer cliente único.
assert.equal(
  primerClienteUnico(ventas),
  'C04'
);

// Pruebas de búsqueda de combos.
const combo1 = buscarComboFuerzaBruta(catalogo, 87000);
const combo2 = buscarComboMap(catalogo, 87000);

assert.ok(combo1 && combo2);

assert.equal(
  combo2[0].precio + combo2[1].precio,
  87000
);

assert.notEqual(
  combo2[0].producto,
  combo2[1].producto
);

assert.deepEqual(
  combo1.map(x => x.producto).sort(),
  combo2.map(x => x.producto).sort()
);

// Caso controlado para validar la ventana móvil.
// Comprueba que se reste correctamente el día que sale.
const ventasPrueba = [];

for (let dia = 1; dia <= 10; dia++) {
  ventasPrueba.push({
    fecha: `2026-09-${String(dia).padStart(2, '0')}`,
    cantidad: 1,
    precio: dia * 1000,
    cliente: 'X',
    producto: 'Prueba',
    ciudad: 'Medellín'
  });
}

const ventana = mejorVentana7Dias(
  ventasPrueba,
  2026,
  9
);

assert.equal(ventana.inicio, 4);
assert.equal(ventana.fin, 10);
assert.equal(ventana.total, 49000);

console.log('Todas las pruebas finalizaron correctamente.');