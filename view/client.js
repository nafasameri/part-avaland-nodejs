const config = require("../config");
const http = require('http');
const fs = require('fs');
const logger = require('log4js').getLogger();
logger.level = 'debug';

// const url = require('url');
// console.log(url.parse('/users?id=3'));



// / POST roles
let req = http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/roles/role',
    headers: {
        'content-type': 'application/json'
    },
    method: 'POST'
}, (res) => {
    let buffer = '';
    res.on('data', (chunk) => {
        buffer += chunk;
    });
    res.on('end', () => {
        if (res.statusCode == 200)
            logger.info(buffer.toString());
        else
            logger.error(JSON.parse(buffer.toString()));
    });
});
req.write(JSON.stringify({
    RoleName: "Producer",
    RoleDesc: "تولید کننده"
}));
req.end();


/// GET roles
// http.request({
//     hostname: config.serverConfig.hostname,
//     port: config.serverConfig.port,
//     path: '/roles/role',
//     method: 'GET'
// }, (res) => {
//     let buffer = '';
//     res.on('data', (chunk) => {
//         console.log(chunk);

//         buffer += chunk;
//     });

//     res.on('end', () => {
//         const contentType = res.headers['content-type'];
//         if (res.statusCode == 200)
//             logger.info(buffer.toString());
//         // logger.info(JSON.parse(buffer.toString()));
//         else
//             logger.error(JSON.parse(buffer.toString()));
//     });
// }).end();