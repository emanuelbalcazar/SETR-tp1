/**
 * @description Implementaciones para el trabajo practico N1 de Sistemas Embebidos de Tiempo Real.
 * @author Carlos Emanuel Balcazar
 * Septiembre 2018
 */
const systems = require('./tasks.json');

// resuelvo las tareas de cada sistema.
for (const key in systems) {
    if (systems.hasOwnProperty(key)) {
        const element = systems[key];
        resolve(key, element);
    }
}

// resuelvo para cada sistema sus tareas asociadas.
function resolve(taskName, tasks) {
    console.log('\nPUNTO: %s', taskName);
    console.log('\nHiperperiodo: %s', hyperperiod(tasks));
    console.log('\nFactor de Utilizacion: %s', FU(tasks));
    console.log('\nCota de Liu: %s', LIU(tasks));
    console.log('\nCota de Bini: %s', BINI(tasks));
    console.log('\n----------------------------------------------------------');
}

// 1 - calcula el hiperperiodo de las tareas.
function hyperperiod(tasks) {
    var result = tasks[0].t;

    for (let i = 1; i < tasks.length; i++) {
        result *= tasks[i].t;
    }

    return result;
}

// 2 - factor de utilizacion.
function FU(tasks) {
    var result = 0;

    for (let i = 0; i < tasks.length; i++) {
        let number = tasks[i].c / tasks[i].t;
        result += number;
    }

    return result.toString().substring(0, 5);
}

// 3 - cota de liu.
function LIU(tasks) {
    var result = tasks.length * (Math.pow(2, 1 / tasks.length) - 1);
    return result.toString().substring(0, 5);
}

// 4 - cota de bini.
function BINI(tasks) {
    var result = 1;

    for (let i = 0; i < tasks.length; i++) {
        let number = (tasks[i].c / tasks[i].t) + 1;
        result *= number;
    }

    return result.toString().substring(0, 5);
}

function RTA2(tasks) {

}