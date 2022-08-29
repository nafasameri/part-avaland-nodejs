const http = require("http");
const logger = require('log4js').getLogger();
logger.level = 'debug';

class Server {
  constructor(config) {
    this.port = config.port;
    this.hostname = config.hostname;
    this.eventName = config.eventName;
  }

  start(eventEmitter) {
    http
      .createServer((req, res) => {
        eventEmitter.emit(this.eventName, req, res);
      })
      .listen(this.port, this.hostname, () => {
        logger.info(`Server is running at: ${this.hostname}:${this.port} `);
      });
  }
}

module.exports = Server;
