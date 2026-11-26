# Bitácora Técnica Completa — Motor Clínico Patitas (v0.1, v0.2 y v1.0)

---

## MiniRetos 1 a 4 (v0.1 — Historiales con ListaEnlazada)
* **Nodo (`src/estructuras/Nodo.js`):** Unidad enlazada con `dato` y `siguiente`. Si se pierde una referencia (`n1.siguiente = null`), los nodos posteriores quedan inalcanzables desde la cabeza y son recolectados si no tienen otras referencias.
* **ListaEnlazada (`src/estructuras/ListaEnlazada.js`):** Mantiene `cabeza`, `cola` y `tamanio` para lograr `agregarAlInicio` y `agregarAlFinal` en $O(1)$. Eliminar la cola en una lista simplemente enlazada requiere recorrer desde `cabeza` ($O(n)$) para ubicar el nodo anterior y reasignar `cola`.
* **RegistroClinico (`src/dominio/RegistroClinico.js`):** Asocia cada mascota a su propia `ListaEnlazada` mediante un `Map`.

---

## MiniRetos 5 a 8 (v0.2 — Colas, Prioridades, Pilas y Simulación)
* **Cola FIFO (`src/estructuras/Cola.js`):** `encolar` y `desencolar` operan en $O(1)$ mediante punteros `frente` y `final`. En un arreglo, `Array.prototype.shift()` desplaza todos los elementos restantes ($O(n)$ por operación; $O(n^2)$ al vaciar 100.000 elementos).
* **Recepcion (`src/dominio/Recepcion.js`):** Gestiona dos colas (`urgencias` y `generales`). Primero atiende `urgencias` (FIFO) y solo cuando está vacía atiende `generales` (FIFO).
* **Pila LIFO (`src/estructuras/Pila.js`) y Editor (`src/dominio/Editor.js`):** Implementada con nodos (`tope`) en $O(1)$ para soportar `deshacer` y `rehacer`. Toda acción nueva limpia `pilaRehacer`.

---

## MiniReto 9 — Catálogo Recursivo y Diseño de Funciones

### Diseño recursivo (caso base, reducción y combinación)
* **`contarServicios(categoria)`:**
  * *Caso base:* Categoría sin subcategorías o nula (suma solo sus servicios propios).
  * *Reducción:* Pasar cada subcategoría hija.
  * *Combinación:* Sumar servicios propios + totales devueltos por cada subcategoría.
* **`listarCatalogo(categoria, nivel)`:**
  * *Caso base:* Sin subcategorías ni servicios adicionales que imprimir.
  * *Reducción:* Invocar recursivamente en cada subcategoría incrementando `nivel + 1`.
  * *Combinación:* Imprimir la categoría actual con sangría `"  ".repeat(nivel)` y sus hijos indentados.
* **`profundidad(categoria)`:**
  * *Caso base:* Si no tiene subcategorías (`subcategorias.length === 0`), retorna `1`.
  * *Reducción:* Evaluar `profundidad(sub)` en cada subcategoría.
  * *Combinación:* Retornar `1 + max(profundidad de subcategorías)`.

### Traza de la pila de llamadas para `contarServicios` en `"Cirugías"`
1. `contarServicios(Cirugías)` -> servicios propios: `0`; llama a `Esterilización` y `Limpieza dental`.
2. `contarServicios(Esterilización)` -> servicios propios: `2` (`Gata`, `Perra`), sin subcategorías -> retorna `2`.
3. `contarServicios(Limpieza dental)` -> servicios propios: `1` (`Con anestesia`), sin subcategorías -> retorna `1`.
4. `contarServicios(Cirugías)` combina `0 + 2 + 1` -> retorna `3`.

---

## MiniReto 10 — Búsquedas, Rutas, Paquetes y Error del Descuento Repetido
* **`buscarServicio` y `rutaDeServicio`:** Usan retorno temprano (`return` en cuanto encuentran coincidencia) para evitar explorar ramas innecesarias.
* **`precioPaquete` y `serviciosEnRango`:** Separan la acumulación recursiva del cálculo final o filtrado.

### Por qué es un error aplicar el 10% de descuento en cada llamada recursiva
Supongamos la categoría `"Cirugías"` con `"Esterilización"` (`280.000 + 350.000 = 630.000`) y `"Limpieza dental"` (`150.000`). El total real sin descuento es **$780.000**, y con un **10% de descuento único** es **$702.000**.

Si se aplicara el 10% (`× 0.9`) en cada llamada recursiva:
* Subcategoría `Esterilización`: `630.000 × 0.9 = 567.000`.
* Subcategoría `Limpieza dental`: `150.000 × 0.9 = 135.000`.
* Si además se multiplicara por `0.9` al subir a `Cirugías`: `(567.000 + 135.000) × 0.9 = 631.800` (un **19% de descuento efectivo** en vez del 10%, alterando la regla comercial).

---

## MiniReto 11 — Historial Recursivo, Call Stack y Comparativa

### Por qué `imprimirAlReves()` invierte el orden sin arreglos ni pilas explícitas
Cada llamada recursiva `recorrerInverso(nodo.siguiente)` apila un marco en la **pila de llamadas (*call stack*)** del motor antes de ejecutar `console.log(nodo.dato)`. Al llegar al final (`nodo === null`), los marcos se desapilan en orden **LIFO**, imprimiendo primero el último nodo y al final la cabeza.

### Desbordamiento con 100.000 nodos
Al invocar `tamanioRecursivo()` sobre una lista de 100.000 nodos, cada llamada consume espacio en la pila de llamadas ($O(n)$ de memoria espacial). Al superar el límite del *call stack* de V8/Node.js, se lanza `RangeError: Maximum call stack size exceeded`.

### Tabla comparativa: Iterativo vs. Recursivo en `ListaEnlazada`

| Operación | Tiempo Iterativo | Memoria Iterativa | Tiempo Recursivo | Memoria Recursiva (*call stack*) | Decisión oficial y justificación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Tamaño / Conteo | $O(1)$ (`this.tamanio`) | $O(1)$ | $O(n)$ | $O(n)$ | **Iterativo / contador**: $O(1)$ en tiempo y espacio, sin riesgo de *stack overflow*. |
| Costo total | $O(n)$ | $O(1)$ | $O(n)$ | $O(n)$ | **Iterativo**: mismo tiempo $O(n)$ pero con memoria constante $O(1)$. |
| Búsqueda | $O(n)$ | $O(1)$ | $O(n)$ | $O(n)$ | **Iterativo**: evita marcos extra de pila en listas extensas. |
| Imprimir al revés | $O(n)$ (con pila/arreglo auxiliar) | $O(n)$ | $O(n)$ | $O(n)$ | **Recursivo en historiales acotados**: código limpio sin estructura auxiliar; vigilar profundidad. |

---

## MiniReto 12 — Cierre y Resumen de los 12 MiniRetos (Patitas v1.0)
1. **Consulta cero:** `Nodo` y enlace manual.
2. **Historial como lista:** `ListaEnlazada` con `cabeza` y `cola` en $O(1)$.
3. **Corregir historial:** `buscar`, `insertarDespuesDe` y `eliminar` con casos borde.
4. **Patitas v0.1:** `RegistroClinico` y reportes de atenciones/costos.
5. **Sala de espera:** `Cola` FIFO en $O(1)$ comparada con `Array.shift()`.
6. **Urgencias primero:** `Recepcion` con dos colas y simulación por tiempo.
7. **Deshacer y rehacer:** `Pila` LIFO y `Editor` con historial reversible.
8. **Patitas v0.2:** Integración de simulación, prioridades y registro clínico.
9. **Catálogo anidado:** Recorrido recursivo de jerarquías (`contarServicios`, `listarCatalogo`, `profundidad`).
10. **Rutas y paquetes:** `buscarServicio`, `rutaDeServicio`, `precioPaquete` y `serviciosEnRango`.
11. **Historial recursivo:** Métodos recursivos en `ListaEnlazada` y análisis de *call stack*.
12. **Patitas v1.0:** Reorganización en `estructuras/` y `dominio/`, `demo.js`, `pruebas/todo.js`, `README.md` y bitácora final.

**Elección de estructuras:** `ListaEnlazada` para secuencias con inserción/eliminación en extremos y orden cronológico; `Cola` para atención justa FIFO (y doble cola para prioridades); `Pila` para deshacer/rehacer LIFO; `Map` para acceso por nombre de mascota; y recursión para árboles/jerarquías de servicios (y `demo.js` / `pruebas/todo.js` para validar el producto completo).