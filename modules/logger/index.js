const os = require("os");
const fs = require("fs");

class Logger {
    static #writeLog(txt) {
        const time = new Date(Date.now()).toISOString();
        const month = new Date(Date.now()).toISOString().split('T')[0].substring(0, 7);
        const FILE_PATH = `./${month}.log`;
        fs.appendFile(FILE_PATH, `[${time}] ${txt} ${os.EOL}`, err => {
            if (err) console.error(err);
        });
    }

    static info(...txt) {
        this.#writeLog(`[INFO]: ${txt}`);
        console.log(...txt);
    }

    static warn(...txt) {
        this.#writeLog(`[Warning]: ${txt}`);
        console.warn(...txt);
    }

    static error(...txt) {
        this.#writeLog(`[ERROR]: ${txt}`);
        console.error(...txt);
    }
}

module.exports = Logger;