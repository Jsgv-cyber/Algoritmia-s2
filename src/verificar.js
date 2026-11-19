
const ventas = require("./datos");

const {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ventasPorCiudad,
    unidadesPorProducto,
    ticketPromedio,
    topProductosPorValor
} = require("./analitica");

console.log("===== VERIFICACIÓN CAFÉ ORIGEN =====");

// Prueba con todos los registros
console.log("\nTotal vendido:", totalVendido(ventas));
console.log("Unidades vendidas:", unidadesVendidas(ventas));
console.log("Venta mayor:", ventaMayor(ventas));
console.log("Ticket promedio:", ticketPromedio(ventas));

console.log("\nVentas por ciudad:");
console.table(ventasPorCiudad(ventas));

console.log("\nUnidades por producto:");
console.table(unidadesPorProducto(ventas));

console.log("\nTop 3 productos por valor:");
console.table(topProductosPorValor(ventas));

// Prueba con un solo registro
console.log("\n===== PRUEBA DE UN REGISTRO =====");

const unaVenta = [ventas[0]];

console.log("Total:", totalVendido(unaVenta));
console.log("Unidades:", unidadesVendidas(unaVenta));
console.log("Ticket:", ticketPromedio(unaVenta));

// Prueba con un arreglo vacío
console.log("\n===== PRUEBA DE ARREGLO VACÍO =====");

const ventasVacias = [];

console.log("Total:", totalVendido(ventasVacias));
console.log("Unidades:", unidadesVendidas(ventasVacias));
console.log("Ticket:", ticketPromedio(ventasVacias));
console.log("Venta mayor:", ventaMayor(ventasVacias));
