# Sistemas Embebidos y de Tiempo Real


## Trabajo Practico N1

Author: Carlos Emanuel Balcazar

## Consigna

Para los siguientes sistemas calcule:

1. El hiperperíodo (H) del sistema.

2. El factor de utilización (FU) del sistema.

3. La cota de Liu para RM.

4. La cota de Bini.

5. El tiempo de respuesta de cada tarea.

6. Dado los resultados de los puntos 2, 3, 4 y 5, verificar y justificar si el sistema es
planificable por RM y por EDF.

7. Determinar, para cada subsistema, el primer instante con una unidad de tiempo disponible.

8. Determinar, para cada subsistema, el máximo retraso admisible a partir del instante crítico.

9. Para los sistemas donde el tiempo de respuesta de la tarea de menor prioridad sea menor o
igual a 40 unidades de tiempo, graficar la planificación a partir del instante crítico para EDF
y RM.

Entregar un informe con los resultados. Para los ejercicios a) hasta el f), presentar el desarrollo
detallado de cada uno de los ejercicios, incluyendo el paso a paso de las formulas iterativas.
Se puede implementar los algoritmos en un programa (lenguaje a elección), como ayuda para
realizar los ejercicios. En ese caso, incluir también el código fuente del programa junto al
informe.

## Subsistemas

a) S(3) = {(1,3,3), (1,4,4),(1,6,6)} 

b) S(3) = {(2,4,4), (1,5,5), (1,7,7)}

c) S(4) = {(2,4,4), (1,5,5), (1,6,6), (1,12,12)}

d) S(4) = {(2,5,5), (1,7,7), (2,10,10), (2,17,17)}

e) S(4) = {(2,5,5), (1,8,8), (2,10,10), (2,15,15)}

f) S(5) = {(2,5,5), (1,6,6), (1,7,7), (2,10,10), (2,30,30)}

g) S(5) = {(6,40,40), (5,50,50), (10,60,60), (12,70,70), (10,80,80)}

h) S(6) = {(10,50,50), (6,60,60), (8,60,60), (12,80,80), (7,90,90), (10,100,100)}

i) S(8) = {(1,4,4), (1,6,6), (1,8,8), (1,10,10), (1,12,12), (1,20,20), (1,22,22), (2,24,24)}

j) S(10) = {(7,55,55), (3,66,66), (2,66,66), (4,66,66), (1,70,70), (11,77,77), (3,77,77),
(7,105,105), (6,110,110),(18,154,154)}

## Despliegue

Ejecutar `npm start` en la raiz del proyecto mediante la linea de comandos.
