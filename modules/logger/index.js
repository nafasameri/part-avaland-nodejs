const os = require("os");
const fs = require("fs");

class Logger {
    static #writeLog(txt) {
        const month = new Date(Date.now()).toISOString().split('T')[0].substring(0, 7);
        const FILE_PATH = `D:/Development/Work/Part/College/TeamWork/back-end/modules/logger/${month}.log`;
        fs.appendFile(FILE_PATH, txt + os.EOL, err => {
            if (err) console.error(err);
        });
    }

    static info(...txt) {
        const time = new Date(Date.now()).toISOString();
        this.#writeLog(`[${time}] [INFO]: ` + txt);
    }

    static warn(...txt) {
        const time = new Date(Date.now()).toISOString();
        this.#writeLog(`[${time}] [Warning]: ` + txt);
    }

    static error(...txt) {
        const time = new Date(Date.now()).toISOString();
        this.#writeLog(`[${time}] [ERROR]: ` + txt);
    }
}

module.exports = Logger;