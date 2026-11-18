const ventas = require("./datos");

const promedio = ventas.redcue ((s, v) => s + v.cantidad * v.precio) / ventas.length;