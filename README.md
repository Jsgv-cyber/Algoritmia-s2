# 📚 Algoritmia — Semana 2 (`Algoritmia-s2`)

Repositorio de ejercicios y proyectos prácticos desarrollados en **JavaScript (Node.js)**, enfocados en manipulación de arreglos y objetos, estructuras de datos (`Set`, `Map`, colas FIFO y pilas LIFO), modularización y análisis de complejidad algorítmica (**Big O**).

## 🗂️ Estructura del repositorio

```text
Algoritmia-s2/
├── barberia/               # Proyecto 1: Barbería Hades - Motor del Barrio
│   └── motor.js
├── src/                    # Proyecto 2: Café Origen - Analítica de Ventas
│   ├── datos.js
│   ├── explorar.js
│   ├── analitica.js
│   ├── reporte.js
│   └── verificar.js
└── README.md               # Documentación general del repositorio
```

---

# 1. 💈 Barbería Hades — Motor del Barrio (`barberia/`)

* **Célula:** Hades
* **Negocio:** Barbería
* **Archivo principal:** `barberia/motor.js`

## 👥 Integrantes

* **Juan Sebastian Grisales Villa** *(Líder de la célula)*
* **Harlinson Ureña Remolina**
* **Valentina Ramirez Villada**

> **Nota sobre la participación:** Por diversos motivos personales/de fuerza mayor, Harlinson Ureña Remolina y Valentina Ramirez Villada no pudieron asistir durante el desarrollo de esta entrega, por lo que el proyecto fue desarrollado e implementado en su totalidad por el líder del equipo, **Juan Sebastian Grisales Villa**.

## 📋 Descripción del proyecto

`motor.js` implementa el sistema de gestión y análisis de datos para la **Barbería Hades**, estructurado por niveles de complejidad algorítmica y estructuras de datos en JavaScript:

1. **Nivel 1 · Datos:** Base de 24 registros de servicios realizados (cliente, categoría, día, valor, barbero y método de pago) junto con funciones de formateo y listado (`mostrarRegistro`, `listarTodo`).
2. **Nivel 2 · Reportes:** Cálculos estadísticos y filtros sobre los registros (`totalGeneral`, `promedio`, `registroMayor`, `filtrarPorCategoria`, `totalesPorCategoria`).
3. **Nivel 3 · Set y Map:** Consultas optimizadas mediante estructuras clave-valor y conjuntos (`personasUnicas`, `recurrentesLento`, `recurrentesRapido`, `categoriaEstrella`, `parQueSuma`).
4. **Nivel 4 · Cola y Pila:** Simulación de fila de atención FIFO (`llegar`, `atender`) e historial LIFO con opción de deshacer (`agregarRegistro`, `deshacer`).
5. **Nivel 5 · Costos y Big O:** Instrumentación con contadores de pasos (`recurrentesLentoConPasos`, `recurrentesRapidoConPasos`) y análisis de complejidad temporal.

## ▶️ Instrucciones de ejecución

1. Asegúrate de tener instalado **Node.js** (versión 14 o superior).
2. Abre una terminal en la raíz del repositorio (`Algoritmia-s2`) y ejecuta:

```bash
node barberia/motor.js
```

*(Si ya estás dentro de la carpeta `barberia/`, ejecuta `node motor.js`).*

Al ejecutarse, la consola mostrará el listado de servicios, los reportes con casos normales y arreglos vacíos, la comparación entre `recurrentesLento` y `recurrentesRapido`, las pruebas de cola y pila, y finalmente el conteo de pasos del Nivel 5.

## 📊 Análisis de costos (Big O)

Sea $n$ la cantidad de registros en el arreglo de entrada (`datos.length`):

| Función | Nivel | Complejidad (Big O) | Justificación |
| :--- | :---: | :---: | :--- |
| `totalGeneral(datos)` | Nivel 2 | $O(n)$ | Recorre el arreglo una sola vez mediante un ciclo `for` sumando la propiedad `valor` de cada registro. |
| `promedio(datos)` | Nivel 2 | $O(n)$ | Llama a `totalGeneral(datos)`, cuyo costo es $O(n)$, y luego ejecuta una división aritmética en tiempo constante $O(1)$. |
| `registroMayor(datos)` | Nivel 2 | $O(n)$ | Realiza una única pasada lineal sobre `datos` comparando el `valor` de cada elemento contra el máximo actual. |
| `filtrarPorCategoria(datos, categoria)` | Nivel 2 | $O(n)$ | Evalúa cada elemento de `datos` una sola vez y agrega los coincidentes al arreglo de salida en $O(1)$ amortizado. |
| `totalesPorCategoria(datos)` | Nivel 2 | $O(n)$ | Recorre `datos` una sola vez; consultar y acumular claves en el objeto `totales` toma $O(1)$ en promedio. |
| `personasUnicas(datos)` | Nivel 3 | $O(n)$ | Itera una vez sobre `datos` insertando cada nombre en un `Set`, cuya inserción tiene costo promedio $O(1)$. |
| `recurrentesLento(datos)` | Nivel 3 | $O(n^2)$ | Emplea bucles anidados: para cada registro recorre nuevamente todo el arreglo (`j`) para contar apariciones y recorre `recurrentes` (`k`) para evitar duplicados. |
| `recurrentesRapido(datos)` | Nivel 3 | $O(n)$ | Realiza un primer recorrido lineal para contabilizar visitas en un `Map` ($O(1)$ promedio por operación) y un segundo recorrido lineal sobre las entradas del `Map`. |
| `categoriaEstrella(datos)` | Nivel 3 | $O(n)$ | Recorre `datos` una vez para contar frecuencias por categoría en un `Map` y luego recorre el `Map` para determinar la categoría con mayor demanda. |
| `parQueSuma(datos, objetivo)` | Nivel 3 | $O(n^2)$ | Utiliza dos ciclos anidados (`i` y `j`) para evaluar combinaciones de pares hasta encontrar la suma objetivo o agotar las parejas posibles. |

## ⚡ Comparación de pasos: `recurrentesLento` vs `recurrentesRapido`

Al ejecutar ambas versiones instrumentadas con contador sobre los **24 registros** de `motor.js`, ambas obtienen exactamente el mismo resultado (`['Juan', 'Carlos', 'Sebastián', 'Miguel', 'Andrés', 'Daniel']`), pero con una diferencia significativa en operaciones:

| Versión | Complejidad | Pasos ejecutados ($n = 24$) |
| :--- | :---: | :---: |
| `recurrentesLentoConPasos(registros)` | $O(n^2)$ | **704 pasos** |
| `recurrentesRapidoConPasos(registros)` | $O(n)$ | **33 pasos** |
| **Diferencia** | — | **671 pasos menos (~95.3 % de reducción)** |

### Conclusión

El uso de `Map` en `recurrentesRapido` evita las búsquedas repetidas mediante bucles anidados, pasando de un crecimiento cuadrático $O(n^2)$ a uno lineal $O(n)$, lo que se traduce en una mejora drástica de rendimiento conforme aumenta el volumen de registros de la barbería.

---

# 2. ☕ Café Origen — Analítica de Ventas (`src/`)

* **Autor:** Juan Sebastian Grisales Villa
* **Negocio:** Tienda de café de especialidad y accesorios (**Café Origen**)
* **Carpeta:** `src/`

## 📋 Descripción de los módulos

Este proyecto está modularizado en cinco archivos usando CommonJS (`require` / `module.exports`) para separar los datos, la exploración, la lógica de negocio, la presentación de reportes y las pruebas:

* **`src/datos.js`:** Contiene el arreglo base de 12 registros de ventas (`id`, `fecha`, `cliente`, `producto`, `ciudad`, `cantidad`, `precio`), contemplando casos reales como variaciones de mayúsculas/minúsculas en ciudades (`"Medellín"` y `"medellín"`) y registros con `cantidad: 0`.
* **`src/explorar.js`:** Script de inspección inicial del dataset. Muestra cantidad de registros, acceso por índices (incluyendo posiciones fuera de rango), tablas con `console.table()`, listado de ciudades y clientes, filtrado de ventas sin unidades y agregación de un nuevo registro mediante `.push()`.
* **`src/analitica.js`:** Módulo principal con las funciones de cálculo y transformación:
  * `totalVendido(ventas)`: Calcula el ingreso total acumulado (`cantidad * precio`).
  * `unidadesVendidas(ventas)`: Suma el total de unidades vendidas.
  * `ventaMayor(ventas)`: Identifica la venta de mayor monto económico.
  * `normalizarCiudad(texto)`: Estandariza nombres de ciudad eliminando espacios y capitalizando la primera letra.
  * `ventasPorCiudad(ventas)`: Agrupa y suma ingresos por ciudad normalizada.
  * `unidadesPorProducto(ventas)`: Agrupa el total de unidades vendidas por producto.
  * `ticketPromedio(ventas)`: Calcula el valor promedio por venta efectiva (`cantidad > 0`).
  * `topProductosPorValor(ventas)`: Ordena los productos por ingresos generados y retorna el **Top 3**.
* **`src/reporte.js`:** Genera el reporte ejecutivo en consola (`CAFÉ ORIGEN - REPORTE V0.1`) formateando los valores monetarios en pesos colombianos (`es-CO`), desglosando ventas por ciudad, Top 3 de productos y un `reporteDiario(ventas, fecha)` por fecha específica.
* **`src/verificar.js`:** Banco de pruebas funcionales que valida los cálculos de `analitica.js` bajo tres escenarios: dataset completo, un solo registro (`[ventas[0]]`) y arreglo vacío (`[]`).

## ▶️ Instrucciones de ejecución

Desde la raíz del repositorio (`Algoritmia-s2`), puedes ejecutar cada script de `src/` de forma independiente con Node.js:

```bash
# 1. Explorar el dataset de ventas
node src/explorar.js

# 2. Generar el reporte formateado en consola
node src/reporte.js

# 3. Ejecutar las pruebas de verificación y casos borde
node src/verificar.js
```