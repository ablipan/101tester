/*
 * @Author: Pan
 * @Date:   2016-03-15 13:03:46
 * @Last Modified by:   Pan
 * @Last Modified time: 2016-03-15 13:05:59
 */

/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        // named pipe
        return val
    }
    if (port >= 0) {
        // port number
        return port
    }
    return false
}

/**
 * 是否是偶数
 * @param val
 * @returns {boolean}
 */
export function isEven(val) {
    return +val % 2 === 0
}
/**
 * 是否是奇数
 * @param val
 * @returns {boolean}
 */
export function isOdd(val) {
    return +val % 2 !== 0
}