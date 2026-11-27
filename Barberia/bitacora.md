# Bitácora de desarrollo — Barbería

Durante este trabajo y debido a sus condiciones particulares, la creación del JavaScript de Barbería se realizó a base de ensayo y error, verificando los comandos necesarios que se pedían y acomodándolos para que funcionaran correctamente.

Inicialmente, este trabajo estaba pensado para ser realizado por un equipo de al menos tres personas, pero por diferentes circunstancias terminé haciéndolo individualmente. Por esta razón, tuve que encargarme de todas las partes del proyecto, avanzando poco a poco y tratando de comprender cómo funcionaba cada elemento antes de continuar con el siguiente.

## Nivel 1 · Datos

Lo primero que hice fue organizar los datos que iba a utilizar para representar el funcionamiento de una barbería. Para esto creé una lista de 24 registros con diferentes personas, sus cortes de pelo o servicios solicitados, los días en que fueron atendidos, los precios, los barberos encargados y los métodos de pago.

Después de tener organizada la información, comencé a trabajar en las primeras funciones de JavaScript. Primero hice `mostrarRegistro`, que permite organizar los datos de cada cliente para mostrarlos de una manera más entendible. Luego hice `listarTodo`, que recorre la lista y muestra todos los registros utilizando la función anterior.

Esta primera parte fue la base para poder trabajar con los datos en los siguientes niveles.

## Nivel 2 · Reportes

Una vez terminada la organización de los datos, comencé a trabajar con las cuentas y los resultados que se podían obtener de la información registrada.

Primero hice una función para sumar todos los valores de los servicios y conocer cuánto dinero se había generado en total. Después trabajé en el promedio de los servicios y en la búsqueda del registro que tuviera el precio más alto.

También agregué funciones para filtrar los servicios por categoría y calcular cuánto dinero se había generado con cada una.

De esta manera podía conocer cuánto costaban los diferentes servicios y cuáles representaban mayores ingresos para la barbería.

Durante esta parte fui comprobando los resultados con los datos que había creado, revisando que las sumas y divisiones se realizaran correctamente. También agregué pruebas con listas vacías para comprobar qué sucedía cuando no había información disponible.

## Nivel 3 · Set y Map

Después de terminar los reportes, comencé a trabajar con Set y Map.

Primero utilicé Set para identificar la cantidad de personas diferentes que habían utilizado los servicios de la barbería, evitando contar varias veces a un mismo cliente.

Luego trabajé con los clientes recurrentes. La idea era identificar quiénes habían visitado la barbería más de una vez y diferenciarlos de aquellos que solamente aparecían una vez en los registros.

Para esto hice dos funciones. La primera, `recurrentesLento`, utiliza varios ciclos para comparar los nombres de los clientes y encontrar cuáles se repiten. La segunda, `recurrentesRapido`, utiliza Map para guardar la cantidad de visitas de cada persona y posteriormente identificar a los clientes recurrentes.

También trabajé en la categoría estrella, que permite conocer cuál de los servicios fue solicitado más veces. Esto me permitió identificar cuál era el tipo de servicio más popular entre los clientes.

Por último, hice `parQueSuma`, una función que busca dos registros cuyos precios sumen una cantidad determinada. Para conseguirlo utilicé dos ciclos que comparan los valores de diferentes registros hasta encontrar una pareja que cumpla con la condición.

## Nivel 4 · Cola y Pila

En esta parte comencé a trabajar con las estructuras de datos Cola y Pila.

Primero hice la cola de atención, pensando en cómo funcionaría una fila de clientes esperando para ser atendidos en la barbería. Utilicé el principio FIFO, donde la primera persona que llega es la primera en ser atendida.

Para esto hice la función `llegar`, que agrega personas a la fila, y `atender`, que retira al primer cliente de la cola. También agregué una comprobación para evitar atender cuando no hay nadie esperando.

Después trabajé con la pila, utilizando un historial para guardar los registros que se fueran agregando.

Hice la función `agregarRegistro`, que permite incorporar un nuevo servicio a la lista y guardarlo en el historial. Luego hice `deshacer`, que permite retirar el último registro agregado utilizando el principio LIFO, donde el último elemento en entrar es el primero en salir.

En esta parte realicé pruebas agregando un nuevo servicio, comprobando que aumentara la cantidad de registros y posteriormente deshaciendo la operación para verificar que volviera a su estado anterior.

## Nivel 5 · Costos y Big O

Finalmente llegué a la parte de los costos y el análisis de Big O.

Para esta etapa retomé el trabajo que había hecho anteriormente con los clientes recurrentes, específicamente las funciones `recurrentesLento` y `recurrentesRapido`.

La intención era comparar cuánto trabajo necesitaba cada una para conseguir el mismo resultado. Para esto agregué contadores de pasos que permitieran registrar las operaciones realizadas durante los recorridos y las comparaciones.

Así creé `recurrentesLentoConPasos` y `recurrentesRapidoConPasos`, que además de encontrar los clientes recurrentes devuelven la cantidad de pasos contabilizados durante su ejecución.

Al comparar ambos resultados pude observar la diferencia entre utilizar varios ciclos anidados y utilizar Map para organizar las visitas de los clientes.

Esto me permitió relacionar el funcionamiento de las funciones con la complejidad temporal. La primera solución tiene un crecimiento cuadrático, mientras que la segunda tiene un crecimiento lineal, considerando las operaciones habituales de Map.

## Conclusiones

Al terminar el proyecto pude reunir diferentes conocimientos de JavaScript en un mismo trabajo. Comencé organizando datos y realizando operaciones básicas con ellos, pero poco a poco fui incorporando herramientas y estructuras que permitían resolver problemas más específicos.

Una de las partes que más me permitió comprender las diferencias entre algoritmos fue la comparación de los clientes recurrentes, porque pude observar que dos funciones pueden llegar al mismo resultado utilizando procedimientos y cantidades de operaciones diferentes.

También pude entender mejor el funcionamiento de Set, Map, las colas y las pilas, relacionando cada estructura con una situación que podría presentarse dentro de una barbería.

En general, fue un trabajo que requirió bastante tiempo de prueba y corrección, especialmente porque tuve que desarrollar individualmente todas las partes que inicialmente estaban pensadas para un equipo. Sin embargo, avanzar nivel por nivel me permitió terminar el proyecto y comprender mejor cómo se relacionan los diferentes conceptos de programación.

