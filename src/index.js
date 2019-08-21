/**
 * @description Implementaciones para el trabajo practico N1 de Sistemas Embebidos de Tiempo Real.
 * @author Carlos Emanuel Balcazar
 */
const helper = require('./helper');
const systems = require('./tasks.json');

// resuelvo los todos los sistemas.
for (const key in systems) {
    if (systems.hasOwnProperty(key)) {
        const element = systems[key];
        resolve(key, element);
    }
}

/**
 * Resuelvo para cada sistema sus tareas asociadas.
 * @param {String} systemName
 * @param {Array} tasks
 */
function resolve(systemName, tasks) {
    let hiperperiodo = hyperperiod(tasks);
    let fu = FU(tasks);
    let liu = LIU(tasks);
    let bini = BINI(tasks);
    let rta = JSON.stringify(RTA(tasks));
    let planable = isPlanable(fu, liu);
    let slot = JSON.stringify(firstEmptySlot(tasks));

    console.log(`\nPunto: ${systemName}`);
    console.log(`\n1- Hiperperiodo: ${hiperperiodo}`);
    console.log(`\n2- Factor de Utilizacion: ${fu} %`);
    console.log(`\n3- Cota de Liu para RM: ${liu}`);
    console.log(`\n4- Cota de Bini: ${bini}`);
    console.log(`\n5- Tiempos de Respuesta: ${rta}`);
    console.log(`\n6- Es Planificable?: ${planable}`);
    console.log(`\n7- Primera ranura vacia: ${slot}`);
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

/**
 * 3 - La cota de Liu para RM.
 * Para un conjunto de n tareas ordenadas por prioridades 
 * fijas, la menor cota superior en la utilización de procesador es
 * condicion necesaria pero no suficiente.
 * FU <= LIU es planificable, en caso contrario no se sabe.
 */
function LIU(tasks) {
    let result = tasks.length * (Math.pow(2, 1 / tasks.length) - 1);
    return Math.ceil(result * 100) / 100;
}

/**
 *  4 - La cota de BINI.
 * Sea un conjunto de n tareas, donde cada tarea esta 
 * caracterizada por su factor de utilización FU i. Entonces, si el 
 * conjunto es planificable por RM cumple
 * */
function BINI(tasks) {
    let result = 1;

    for (let i = 0; i < tasks.length; i++) {
        let number = (tasks[i].c / tasks[i].t) + 1;
        result *= number;
    }

    return Math.ceil(result * 100) / 100;
}

/**
 * 5 - Tiempo de respuesta para cada tarea con RTA.
 */
function RTA(tasks) {
    let time = tasks[0].c;
    let response = [];

    response.push({ task: 1, time: time });

    for (let i = 1; i < tasks.length; i++) {
        const task = tasks[i];
        time = time + task.c;

        while (true) {
            let w = task.c;

            for (let j = 0; j < i; j++) {
                w += Math.ceil(time / tasks[j].t) * tasks[j].c;
            }

            if (time == w)
                break;

            if (w > task.d)
                break;

            time = w;
            w = 0;
        }

        response.push({ task: i + 1, time: time });
    }

    return response;
}

/**
 * 6 - Arma el texto indicando si el sistema es o no planificable
 * por RM y EDF en base a los calculos anteriores. 
 */
function isPlanable(fu, liu) {
    let result = (fu <= liu) ? "Es planificable por RM" : "No se sabe si es planificable por RM";
    result += " - ";
    result += (fu <= 1) ? "Es planificable por EDF" : "No se sabe si es planificable por EDF";

    return result;
}

function firstEmptySlot(tasks) {
    let slot = 1;
    let response = [];

    response.push({ task: 1, time: slot });

    for (let i = 1; i < tasks.length; i++) {
        const task = tasks[i];
        slot = slot + task.c;

        while (true) {
            let w = task.c;

            for (let j = 0; j < i; j++) {
                w += Math.ceil(slot / tasks[j].t) * tasks[j].c;
            }

            if (slot == w)
                break;

            if (w > task.d)
                break;

            slot = w;
            w = 0;
        }

        response.push({ task: i + 1, time: slot });
    }

    return response;
}
