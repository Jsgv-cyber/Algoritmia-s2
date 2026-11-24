const { normalizarCiudad } = require('./analitica');

// Minireto 10A: fuerza bruta.
// Revisa cada pareja de productos distintos.
// Complejidad temporal O(n²).
function buscarComboFuerzaBruta(catalogo, objetivo) {
  for (let i = 0; i < catalogo.length; i++) {
    for (let j = i + 1; j < catalogo.length; j++) {
      if (catalogo[i].precio + catalogo[j].precio === objetivo) {
        return [catalogo[i], catalogo[j]];
      }
    }
  }

  return null;
}

// Minireto 10B: tabla hash (Map).
// Busca el complemento en tiempo O(n) promedio.
function buscarComboMap(catalogo, objetivo) {
  const vistos = new Map();

  for (let i = 0; i < catalogo.length; i++) {
    const producto = catalogo[i];
    const complemento = objetivo - producto.precio;

    if (vistos.has(complemento)) {
      const anterior = catalogo[vistos.get(complemento)];

      if (anterior.producto !== producto.producto) {
        return [anterior, producto];
      }
    }

    if (!vistos.has(producto.precio)) {
      vistos.set(producto.precio, i);
    }
  }

  return null;
}

// Minireto 10C: agrupa cantidades vendidas
// por ciudad y producto usando Map.
function productoEstrellaPorCiudad(ventas) {
  const agrupado = new Map();

  for (const venta of ventas) {
    const ciudad = normalizarCiudad(venta.ciudad);

    if (!agrupado.has(ciudad)) {
      agrupado.set(ciudad, new Map());
    }

    const porProducto = agrupado.get(ciudad);

    porProducto.set(
      venta.producto,
      (porProducto.get(venta.producto) || 0) + venta.cantidad
    );
  }

  const resultado = {};

  for (const [ciudad, productos] of agrupado) {
    let estrella = null;

    for (const [producto, unidades] of productos) {
      if (estrella === null || unidades > estrella.unidades) {
        estrella = { producto, unidades };
      }
    }

    resultado[ciudad] = estrella;
  }

  return resultado;
}

// Encuentra el primer cliente que aparece exactamente una vez.
function primerClienteUnico(ventas) {
  const frecuencias = new Map();

  for (const v of ventas) {
    frecuencias.set(
      v.cliente,
      (frecuencias.get(v.cliente) || 0) + 1
    );
  }

  for (const v of ventas) {
    if (frecuencias.get(v.cliente) === 1) {
      return v.cliente;
    }
  }

  return null;
}

// Minireto 11: suma móvil de 7 días consecutivos.
// Los días sin ventas tienen valor 0.
// Se suma el día que entra y se resta el día que sale.
function mejorVentana7Dias(ventas, anio = 2026, mes = 9) {
  const diasDelMes = new Date(anio, mes, 0).getDate();
  const totales = Array(diasDelMes).fill(0);

  for (const v of ventas) {
    const [y, m, d] = v.fecha.split('-').map(Number);

    if (
      y === anio &&
      m === mes &&
      d >= 1 &&
      d <= diasDelMes
    ) {
      totales[d - 1] += v.cantidad * v.precio;
    }
  }

  if (diasDelMes < 7) {
    return {
      inicio: null,
      fin: null,
      total: 0,
      totalesDiarios: totales
    };
  }

  let suma = 0;

  // Calcula la primera ventana de 7 días.
  for (let i = 0; i < 7; i++) {
    suma += totales[i];
  }

  let mejorSuma = suma;
  let mejorInicio = 0;

  // Desplaza la ventana un día a la vez.
  for (let fin = 7; fin < diasDelMes; fin++) {
    suma += totales[fin];
    suma -= totales[fin - 7];

    if (suma > mejorSuma) {
      mejorSuma = suma;
      mejorInicio = fin - 6;
    }
  }

  return {
    inicio: mejorInicio + 1,
    fin: mejorInicio + 7,
    total: mejorSuma,
    totalesDiarios: totales
  };
}

// Exportamos las funciones para utilizarlas
// desde otros archivos del proyecto.
module.exports = {
  buscarComboFuerzaBruta,
  buscarComboMap,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorVentana7Dias
};