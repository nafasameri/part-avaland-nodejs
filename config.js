const requestEventName = "newReq";

const serverConfig = {
  port: process.env.PORT ?? 81,
  hostname: process.env.HOST ?? "127.0.0.1",
  eventName: requestEventName,
};

const routerConfig = {
  eventName: requestEventName,
};

const appsDirectoriesPath = "./apps";

module.exports = {
  serverConfig,
  routerConfig,
  appsDirectoriesPath,
};
