import chalk from 'chalk'
import {format} from 'util'

/**
 * Prefix.
 */
const prefix = 'Yo-101test'
const sep = chalk.gray('·')

export default {
    // Log a `message` to the console.
    log() {
        const msg = format.apply(format, arguments)
        console.log(chalk.white(prefix), sep, msg)
    },

    // Log an warn `message` to the console
    warning() {
        const msg = format.apply(format, arguments)
        console.log(chalk.yellow(prefix), sep, msg)
    },

    // Log an error `message` to the console and exit
    fatal() {
        const msg = format.apply(format, arguments)
        console.error(chalk.red(prefix), sep, msg)
        process.exit(0)
    },

    // Log a success `message` to the console
    success() {
        const msg = format.apply(format, arguments)
        console.log(chalk.green(prefix), sep, msg)
    }
}