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

const redisConfig = {
  host: '127.0.0.1',
  port: 6379
};


// const databaseConfig = {
//   host: '192.168.5.121',
//   database: 'college',
//   user: '404',
//   password: '&6Tw3C0V4q@w',
//   port: '5432',
//   schema: '404'
// };

const databaseConfig = {
  host: '127.0.0.1',
  user: 'postgres',
  password: '1997Nafas',
  port: '5432',
  schema: 'public'
};

// const databaseConfig = {
//   host: '127.0.0.1',
//   user: 'postgres',
//   password: 'ars64334',
//   port: '5432',
//   schema: 'public'
// };

module.exports = {
  serverConfig,
  routerConfig,
  databaseConfig,
  redisConfig,
  appsDirectoriesPath,
};