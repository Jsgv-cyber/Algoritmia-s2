# Patitas Motor v0.1 (`patitas-motor`)

Sistema de gestión de historiales clínicos para la clínica veterinaria **Patitas** (Envigado), desarrollado desde cero en JavaScript con Node.js como parte de la Sesión 7 (Listas enlazadas).

## Estructura del proyecto
- `src/Nodo.js`: Define la clase `Nodo` (`dato`, `siguiente`).
- `src/ListaEnlazada.js`: Implementa la lista simplemente enlazada con `cabeza`, `cola`, `tamanio`, inserciones `O(1)` al inicio y al final, recorrido con callbacks, `aArreglo()`, `buscar()`, `insertarDespuesDe()` y `eliminar()`.
- `src/RegistroClinico.js`: Administra un historial (`ListaEnlazada`) por mascota usando un `Map`.
- `src/reporte.js`: Carga los datos iniciales de Lola, Toby y Mía e imprime el reporte clínico, total por mascota y última vacunación.
- `pruebas/nodos.js`: Prueba de enlace manual y recorrido con `while`.
- `pruebas/lista.js`: Pruebas de casos borde para inserción, búsqueda, inserción intermedia y eliminación.
- `bitacora.md`: Diagramas de nodos y flechas, análisis de complejidad y tabla comparativa con arreglos.

## Cómo ejecutar
Asegúrate de tener **Node.js** instalado y ejecuta desde la raíz de `patitas-motor`:

```bash
node pruebas/nodos.js
node pruebas/lista.js
node src/reporte.js