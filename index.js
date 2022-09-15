const fs = require("fs");
const EventEmitter = require("events");

const Server = require("./modules/server");
const Router = require("./modules/router/router");

const config = require("./config");

const server = new Server(config.serverConfig);
const eventEmitter = new EventEmitter();
const router = new Router(eventEmitter, config.routerConfig.eventName);

const appsDirectories = fs.readdirSync(config.appsDirectoriesPath);

for (let appDir of appsDirectories) {
  const app = require(`./${config.appsDirectoriesPath}/${appDir}`);
  app.routes.forEach((route) => {
    router.addRoute(`/${appDir}/${route.url}`, route.controller, route.method).middleware(route.middlewares);
  });
}

server.start(eventEmitter);
