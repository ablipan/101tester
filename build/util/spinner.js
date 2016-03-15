import {format} from 'util'

// Make a console spinner.
// Code based on code from Mocha by Visionmedia/Tj
// https://github.com/visionmedia/mocha/blob/master/bin/_mocha
export default class {
    constructor(message) {
        this.spinnerMessage = message
    }

    start(opts) {
        opts = opts || {}
        let self = this
        let spinner = 'win32' == process.platform ? ['|', '/', '-', '\\'] : ['◜', '◠', '◝', '◞', '◡', '◟']

        const play = (arr, interval) => {
            let len = arr.length, i = 0
            interval = interval || 100

            const drawTick = () => {
                let str = arr[i++ % len]
                process.stdout.write('\u001b[0G' + str + '\u001b[90m' + this.spinnerMessage + '\u001b[0m')
            }

            self.timer = setInterval(drawTick, interval)
        }

        let frames = spinner.map((c) => {
            return format('  \u001b[96m%s ', c)
        })

        play(frames, opts.fps || 30)
    }

    message(message) {
        this.spinnerMessage = message
    }

    stop() {
        process.stdout.write('\u001b[0G\u001b[2K')
        clearInterval(this.timer)
    }
}