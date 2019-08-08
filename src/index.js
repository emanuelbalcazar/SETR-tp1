/**
 * @description Implementaciones para el trabajo practico N1 de Sistemas Embebidos de Tiempo Real.
 * @author Carlos Emanuel Balcazar
 */
const helper = require('./helper');
const systems = require('./tasks.json');

// resuelvo las tareas de cada sistema.
for (const key in systems) {
    if (systems.hasOwnProperty(key)) {
        const element = systems[key];
        resolve(key, element);
    }
}

// resuelvo para cada sistema sus tareas asociadas.
function resolve(systemName, tasks) {
    console.log(`\nPunto: ${systemName}`);
    console.log(`\nHiperperiodo: ${hyperperiod(tasks)}`);
    console.log(`\nFactor de Utilizacion: ${FU(tasks)} %`);
    //console.log(`\nCota de Liu: ${LIU(tasks)}`);
    //console.log(`\nCota de Bini: ${BINI(tasks)}`);
    //console.log(`\nTiempo de Respuesta: ${RTA2(tasks)}`);
    console.log('\n----------------------------------------------------------');
}

/**
 * 1 - Calcula el Hiperperiodo de las tareas.
 * El Hiperperiodo es el minimo comun multiplo de los periodos (t) de las tareas.
 */
function hyperperiod(tasks) {
    let periods = tasks.map(task => { return task.t; });
    let result = helper.MCMfromArray(periods);
    return result;
}

/**
 * 2 - Calcula el Factor de Utilizacion del sistema.
 * Mide cuan utilizado se encuentra el recurso como la sumatoria
 * del peor tiempo de ejecucion (C) sobre el periodo de la tarea (T).
 */
function FU(tasks) {
    let result = 0;

    for (let i = 0; i < tasks.length; i++) {
        let number = tasks[i].c / tasks[i].t;
        result += number;
    }

    return Math.ceil(result * 100) / 100;
}

// 3 - cota de liu.
function LIU(tasks) {
    var result = tasks.length * (Math.pow(2, 1 / tasks.length) - 1);
    return Math.ceil(result * 100) / 100;
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

// Tiempo de respuesta con RTA2
function RTA2(tasks) {

    var time = 0;
    var response = [];

    for (let i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        time = time + task.c;

        while (true) {
            var w = task.c;

            for (let j = 0; j < i; j++) {
                w += Math.ceil(time / task.t) * task.c;
            }

            if (time == w)
                break;

            if (w > task.d)
                break;

            time = w;
        }

        response.push({ task: task, time: time });
    }

    return response;
}

