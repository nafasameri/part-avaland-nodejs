const http = require("http");
const { json } = require("mocha/lib/reporters");
const { stringify } = require("querystring");
const SwaggerParser = require('swagger-parser');
const swaggerUi = require('swagger-ui-dist');
// import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist"
// const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath()

const logger = require('../logger');

class Server {
  constructor(config) {
    this.port = config.port;
    this.hostname = config.hostname;
    this.eventName = config.eventName;
  }

  start(eventEmitter) {
    SwaggerParser.validate('swagger.yaml', async (err, api) => {
      if (err) {
        console.error(`Error loading Swagger API: ${err}`);
        process.exit(1);
      }

      http
        .createServer((req, res) => {
          console.log(req.url);
          // if (req.url === '/swagger-ui.css') {
          //   res.setHeader('Content-Type', 'text/css');
          //   res.end(swaggerUi.getAbsoluteFSPath() + '/swagger-ui.css');
          // } else if (req.url === '/swagger-ui-bundle.js') {
          //   res.setHeader('Content-Type', 'application/javascript');
          //   res.end(swaggerUi.getAbsoluteFSPath() + '/swagger-ui-bundle.js');
          // } else if (req.url === '/swagger.yaml') {
          //   res.setHeader('Content-Type', 'application/x-yaml');
          //   res.end(stringify(api));
          // }

          eventEmitter.emit(this.eventName, req, res);
        })
        .listen(this.port, this.hostname, () => {
          const logServer = `Server is running at: ${this.hostname}:${this.port}`;
          logger.info(logServer);

          // Display the Swagger UI
          console.log(`Swagger UI available at http://${this.hostname}:${this.port}/index.html`);
        });
    });
  }
}

module.exports = Server;