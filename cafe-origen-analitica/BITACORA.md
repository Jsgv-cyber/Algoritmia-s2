# Bitácora de desarrollo — Café Origen

## Información general

- **Proyecto:** Café Origen — Analítica de ventas
- **Lenguaje:** JavaScript
- **Entorno de ejecución:** Node.js
- **Propósito:** analizar ventas y aplicar estrategias de resolución de problemas y complejidad algorítmica.
- **Fecha de elaboración de esta bitácora:** 24 de noviembre de 2026

> Esta bitácora resume las actividades realizadas y verificadas durante el desarrollo. Si el equipo trabajó en otras fechas o en sesiones adicionales, actualiza las fechas y agrega las actividades reales.

## Registro de actividades

### 1. Reconocimiento del proyecto y de los datos

**Actividad:** revisión de los archivos JavaScript existentes y del conjunto de datos de ventas de Café Origen.

**Trabajo realizado:**
- Se identificaron los módulos de datos, analítica, exploración, generación, medición, verificación y reporte.
- Se revisó la información de ventas y los indicadores que debía producir el reporte.
- Se identificaron los retos de clientes recurrentes, combos de productos y ventana de siete días.

**Resultado:** se estableció la estructura de trabajo y las funciones que debían completarse.

### 2. Construcción del catálogo de productos

**Archivo:** `catalogo.js`

**Actividad:** creación de un catálogo con los productos y precios usados en el ejercicio de búsqueda de combos.

**Resultado:** el catálogo permite evaluar parejas de productos frente a un precio objetivo. Para el objetivo de $87.000, la combinación esperada es Origen Huila 500 g ($42.000) y Origen Sierra 500 g ($45.000).

### 3. Implementación de estrategias algorítmicas

**Archivo:** `estrategias.js`

**Actividad:** implementación de las siguientes funciones:
- Búsqueda de combos por fuerza bruta.
- Búsqueda de combos usando `Map`.
- Producto estrella por ciudad.
- Primer cliente único.
- Mejor ventana de ventas de siete días mediante ventana deslizante.

**Resultado:** se reunieron las soluciones de los retos en un módulo reutilizable.

### 4. Creación de pruebas automatizadas

**Archivo:** `pruebas.js`

**Actividad:** incorporación de pruebas con `node:assert/strict` para comprobar resultados de analítica, clientes recurrentes, combos, primer cliente único y ventana de siete días.

**Verificación realizada:** se ejecutó:

```bash
node pruebas.js
```

**Resultado observado:**

```text
Todas las pruebas finalizaron correctamente.
```

### 5. Generación y revisión del reporte

**Archivo:** `reporte.js`

**Actividad:** ejecución del reporte consolidado y diario.

**Comando:**

```bash
node reporte.js
```

**Resultados observados:**
- Total vendido: $985.000.
- Unidades vendidas: 21.
- Ticket promedio: aproximadamente $89.545,45.
- Venta mayor: $168.000.
- Ciudad con mayor valor de ventas: Medellín, con $356.000.
- Producto con mayor valor vendido: Origen Huila 500 g, con $294.000.

El reporte diario consultado para el 7 de septiembre de 2026 presentó cero ventas porque no había registros para esa fecha en los datos utilizados.

### 6. Primera medición de rendimiento

**Archivo:** `medir.js`

**Actividad:** ejecución de las mediciones de operaciones y tiempos para clientes recurrentes.

**Comando:**

```bash
node medir.js
```

**Resultados observados antes de optimizar `recurrentes.js`:**

| Cantidad de ventas | Tiempo |
|---:|---:|
| 1.000 | 5,043 ms |
| 2.000 | 16,101 ms |
| 4.000 | 60,367 ms |
| 8.000 | 277,781 ms |
| 16.000 | 995,821 ms |

**Análisis:** al revisar `recurrentes.js`, se encontró una implementación con dos ciclos anidados y una búsqueda mediante `includes()`. Esta solución realiza comparaciones repetidas y tiene un crecimiento cuadrático en el peor caso.

### 7. Optimización de clientes recurrentes

**Archivo:** `recurrentes.js`

**Actividad:** reemplazo de la solución de fuerza bruta por una implementación con:
- `Map` para contar la frecuencia de cada cliente.
- `Set` para evitar agregar un mismo cliente más de una vez al resultado.

**Resultado esperado:** tiempo O(n) promedio y espacio adicional O(k), donde `n` es la cantidad de ventas y `k` la cantidad de clientes distintos.

**Pendiente de verificación:** volver a ejecutar `node pruebas.js` y `node medir.js` después del cambio. Registrar aquí los tiempos reales de la versión optimizada.

| Cantidad de ventas | Tiempo de la versión optimizada |
|---:|---:|
| 1.000 | Pendiente |
| 2.000 | Pendiente |
| 4.000 | Pendiente |
| 8.000 | Pendiente |
| 16.000 | Pendiente |
| 100.000 | Pendiente, si el script ejecuta este tamaño |

No reemplazar “Pendiente” por valores estimados. Copiar los resultados reales de la terminal.

## Comandos de verificación final

Ejecutar desde la carpeta donde se encuentran los archivos `.js`:

```bash
node pruebas.js
node reporte.js
node medir.js
node verificar.js
```

## Estado de entrega

- [x] Catálogo de productos creado.
- [x] Estrategias algorítmicas implementadas.
- [x] Pruebas automatizadas creadas.
- [x] `pruebas.js` ejecutado correctamente antes de la optimización final.
- [x] Reporte generado y revisado.
- [x] Implementación de clientes recurrentes optimizada con `Map` y `Set`.
- [ ] Volver a ejecutar las pruebas después de la optimización.
- [ ] Registrar los tiempos de la versión optimizada.
- [ ] Confirmar con la medición final si se cumple el objetivo de menos de un segundo para 100.000 ventas, si ese tamaño está incluido en el benchmark.
- [ ] Ejecutar `verificar.js` y guardar su resultado.

## Reflexión final

Durante el desarrollo se observó que una solución puede producir resultados correctos y, aun así, no ser suficientemente eficiente. La primera implementación de clientes recurrentes comparaba registros mediante ciclos anidados. Al utilizar `Map` para contar frecuencias y `Set` para controlar duplicados, se obtiene una estrategia con tiempo promedio lineal. La medición final es necesaria para comprobar el comportamiento real en el entorno de ejecución.

---
**Nota:** completa los apartados pendientes con los resultados que produzca la versión definitiva del proyecto.
