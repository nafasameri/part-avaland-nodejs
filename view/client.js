const config = require("../config");
const http = require('http');
const fs = require('fs');
const logger = require('../modules/logger');

// const url = require('url');
// console.log(url.parse('/users?id=3'));


/// POST roles
// let req = http.request({
//     hostname: config.serverConfig.hostname,
//     port: config.serverConfig.port,
//     path: '/user/login',
//     headers: {
//         'content-type': 'application/json'
//     },
//     method: 'POST'
// }, (res) => {
//     let buffer = '';
//     res.on('data', (chunk) => {
//         buffer += chunk;
//     });
//     res.on('end', () => {
//         if (res.statusCode == 200)
//             logger.info(JSON.parse(buffer.toString()));
//         else
//             logger.error(JSON.parse(buffer.toString()));
//     });
// });
// req.write(JSON.stringify({
//     "username": "test sign up",
//     "password": '11411'    	
// }));
// req.end();


/// GET
http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/music/musics',
    method: 'GET',
    headers: {
        'Set-Cookie': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjYyNzk3NDcwMzczLCJ1c2VybmFtZSI6InRlc3Qgc2lnbiB1cCIsInBhc3N3b3JkIjoiMTExMSIsImlhdCI6MTY2Mjc5NzQ3MH0.eBQr_JGRUJWCFt7itzsEu0x1LRGtJwTPBCelKuFrtt0; Expires=Sat, 10 Sep 2022 08:11:20 GMT; Path=/; Domain=127.0.0.1'
    }
}, (res) => {
    let buffer = '';
    res.on('data', (chunk) => {
        buffer += chunk;
    });

    res.on('end', () => {
        if (res.statusCode == 200)
            logger.info(buffer.toString());
        else
            logger.error(buffer.toString());
    });
}).end();
