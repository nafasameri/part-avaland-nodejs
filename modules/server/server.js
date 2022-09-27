const http = require("http");

const logger = require('../logger');

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
        const logServer = `Server is running at: ${this.hostname}:${this.port}`;
        logger.info(logServer);
      });
  }
}

module.exports = Server;
