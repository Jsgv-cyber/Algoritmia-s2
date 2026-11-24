# Café Origen — Analítica de ventas

## 1. Descripción del proyecto

Café Origen es un proyecto de JavaScript que procesa registros de ventas para generar indicadores comerciales y practicar estrategias de resolución de problemas y análisis de complejidad.

El proyecto permite:
- Calcular el total vendido, las unidades y el ticket promedio.
- Identificar la venta de mayor valor.
- Agrupar ventas por ciudad y por producto.
- Identificar clientes recurrentes.
- Buscar combinaciones de dos productos que sumen un precio objetivo.
- Encontrar el primer cliente que aparece una sola vez.
- Calcular la mejor ventana de ventas de siete días consecutivos.
- Ejecutar pruebas y medir el comportamiento de los algoritmos.

## 2. Requisitos

- Node.js 18 o superior.
- No se requieren dependencias externas para las funciones descritas.

Comprueba la versión instalada:

```bash
node --version
```

## 3. Estructura del proyecto

La estructura puede variar según cómo se haya organizado el repositorio. En la entrega trabajada, los archivos JavaScript se encuentran dentro de `src/`:

```text
cafe-origen-analitica/
├── README.md
├── BITACORA.md
└── src/
    ├── analitica.js
    ├── catalogo.js
    ├── datos.js
    ├── estrategias.js
    ├── explorar.js
    ├── generador.js
    ├── instrumentadas.js
    ├── medir.js
    ├── recurrentes.js
    ├── reporte.js
    ├── verificar.js
    └── pruebas.js
```

Si tus archivos están directamente en la carpeta principal y no dentro de `src/`, ejecuta los comandos desde esa carpeta y ajusta las rutas de esta documentación.

## 4. Cómo ejecutar el proyecto

Abre una terminal en la carpeta `src`:

```bash
cd cafe-origen-analitica/src
```

Generar el reporte:

```bash
node reporte.js
```

Ejecutar las pruebas:

```bash
node pruebas.js
```

Medir el rendimiento:

```bash
node medir.js
```

Ejecutar las verificaciones de datos:

```bash
node verificar.js
```

## 5. Descripción de los archivos principales

| Archivo | Responsabilidad |
|---|---|
| `datos.js` | Contiene los datos de ejemplo de las ventas. |
| `analitica.js` | Calcula indicadores generales y agrupaciones de ventas. |
| `recurrentes.js` | Encuentra clientes con más de una compra mediante `Map` y `Set`. |
| `catalogo.js` | Define los productos y precios usados en el ejercicio de combos. |
| `estrategias.js` | Implementa búsqueda de combos, producto estrella por ciudad, primer cliente único y ventana de siete días. |
| `pruebas.js` | Comprueba resultados esperados mediante `node:assert/strict`. |
| `reporte.js` | Presenta un reporte consolidado y un reporte diario. |
| `medir.js` | Instrumenta operaciones y mide tiempos de ejecución. |
| `verificar.js` | Ejecuta validaciones adicionales del proyecto. |
| `instrumentadas.js` | Contiene versiones instrumentadas para contar operaciones. |
| `explorar.js` | Apoya la exploración de los datos. |
| `generador.js` | Genera datos para experimentar con distintos tamaños de entrada. |

## 6. Estrategias y complejidad

### Clientes recurrentes: `Map` y `Set`

La función `clientesRecurrentes(ventas)` recorre las ventas para contar las apariciones de cada cliente en un `Map`. Después recorre los registros para devolver, sin duplicados, los clientes cuyo conteo es mayor que uno. El tiempo esperado es **O(n) promedio** y el espacio adicional es **O(k)**, donde `k` es la cantidad de clientes distintos.

### Búsqueda de combos

- `buscarComboFuerzaBruta`: prueba parejas de productos. Complejidad temporal O(n²).
- `buscarComboMap`: busca el precio complementario con un `Map`. Complejidad temporal O(n) promedio.

### Producto estrella por ciudad

Agrupa unidades por ciudad y producto utilizando mapas anidados. El recorrido es lineal respecto al número de ventas, más el trabajo de revisar los grupos resultantes.

### Primer cliente único

Cuenta las frecuencias y luego devuelve el primer cliente cuyo conteo sea uno. Complejidad temporal O(n) promedio.

### Ventana deslizante de siete días

Calcula primero el total de los primeros siete días y luego desplaza la ventana sumando el día que entra y restando el que sale. Después de preparar los totales diarios, el desplazamiento es O(d), siendo `d` el número de días del mes.

## 7. Resultados de referencia del conjunto de datos de ejemplo

Al ejecutar `node reporte.js`, los datos de ejemplo produjeron:

- Total vendido: **$985.000**
- Unidades vendidas: **21**
- Ticket promedio: **$89.545,45** aproximadamente
- Venta mayor: **$168.000**
- Ventas por ciudad:
  - Medellín: $356.000
  - Bogotá: $276.000
  - Cali: $185.000
  - Pereira: $168.000
- Top 3 por valor:
  1. Origen Huila 500 g: $294.000
  2. Origen Sierra 500 g: $225.000
  3. Prensa francesa: $190.000

El reporte diario para el 7 de septiembre de 2026 mostró cero ventas. Esto significa que no había registros de ventas para esa fecha en el conjunto de datos utilizado; no implica por sí mismo un error.

Los resultados pueden cambiar si se modifican los datos de entrada.

## 8. Pruebas

Ejecuta:

```bash
node pruebas.js
```

El mensaje esperado cuando todas las aserciones pasan es:

```text
Todas las pruebas finalizaron correctamente.
```

Si aparece un error de aserción, revisa la función y los datos correspondientes. Si aparece `MODULE_NOT_FOUND`, comprueba que los archivos requeridos estén en la ruta esperada y que los nombres coincidan exactamente.

## 9. Medición de rendimiento

Ejecuta:

```bash
node medir.js
```

El programa compara contadores y tiempos para distintos tamaños de entrada. Los tiempos dependen del equipo, la versión de Node.js, la carga del sistema y la forma en que se generan los datos.

En una medición inicial, antes de reemplazar la implementación de clientes recurrentes por la versión optimizada, se observó:

| Ventas | Tiempo registrado |
|---:|---:|
| 1.000 | 5,043 ms |
| 2.000 | 16,101 ms |
| 4.000 | 60,367 ms |
| 8.000 | 277,781 ms |
| 16.000 | 995,821 ms |

Esos valores corresponden a la implementación anterior de fuerza bruta y **no deben presentarse como el rendimiento de la versión optimizada**. Después de actualizar `recurrentes.js`, vuelve a ejecutar `node medir.js` y registra los nuevos resultados en la bitácora.

No afirmes que se cumple el límite de un segundo para 100.000 ventas hasta que esa prueba se haya ejecutado con la versión final y se haya comprobado el resultado en el equipo utilizado para la entrega.

## 10. Errores frecuentes

- **No encuentra `./estrategias`:** verifica que `estrategias.js` esté junto a `pruebas.js`, o corrige la ruta relativa del `require`.
- **No encuentra otro módulo:** revisa los nombres de archivo, mayúsculas/minúsculas y ubicación.
- **El reporte diario muestra cero:** confirma si existen ventas para la fecha consultada.
- **Los tiempos varían:** ejecuta la medición más de una vez en condiciones similares y reporta el resultado real, sin inventar valores.

## 11. Conclusión

El proyecto integra análisis de datos de ventas con estrategias algorítmicas. La comparación entre fuerza bruta y estructuras como `Map` y `Set` permite estudiar cómo la elección de una estructura de datos afecta el tiempo de ejecución. Las pruebas automatizadas ayudan a comprobar que las funciones entreguen los resultados esperados.

---
Proyecto académico: Café Origen — Analítica de ventas.
