const http = require('http');
const logger = require('log4js').getLogger();
logger.level = 'debug';
const config = require("../config");

const req = http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/roles/role',
    method: 'GET',
}, (res) => {
    res.on('data', (chunk) => {
        logger.info(JSON.parse(chunk.toString()));
    });
});
req.end();
