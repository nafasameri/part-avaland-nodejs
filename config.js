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

const databaseConfig = {
  host: '192.168.5.121',
  database: 'college',
  user: '404',
  password: '&6Tw3C0V4q@w',
  port: '5432',
  schema: '404'
};

module.exports = {
  serverConfig,
  routerConfig,
  databaseConfig,
  appsDirectoriesPath,
};