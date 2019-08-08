/** 
 * Calcula el Maximo Comun Divisor entre dos numeros.
*/
exports.MCD = (num1, num2) => {
    let result = 0;

    let a = Math.max(num1, num2);
    let b = Math.min(num1, num2);

    do {
        result = b;
        b = a % b;
        a = result;
    } while (b != 0);

    return result;
}

/**
 * Calcula el Minimo Comun Multiplo entre dos numeros.
 */
exports.MCM = (num1, num2) => {
    let result = 0;

    let a = Math.max(num1, num2);
    let b = Math.min(num1, num2);

    result = (a / this.MCD(a, b)) * b;
    return result;
}

/**
 * Calcula el Minimo Comun Multiplo de N numeros en un array.
 */
exports.MCMfromArray = (numbers) => {
    return numbers.reduce(this.MCM);
}