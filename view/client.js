const config = require("../config");
const http = require('http');
const fs = require('fs');
const logger = require('log4js').getLogger();
logger.level = 'debug';

// const url = require('url');
// console.log(url.parse('/users?id=3'));


/// POST roles
let req = http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/user/add',
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
            logger.info(JSON.parse(buffer.toString()));
        else
            logger.error(JSON.parse(buffer.toString()));
    });
});
req.write(JSON.stringify({
    "UserName":"arsadeghi",
    "RoleID":1    	
}));
req.end();


/// GET roles
// http.request({
//     hostname: config.serverConfig.hostname,
//     port: config.serverConfig.port,
//     path: '/role/roles',
//     method: 'GET'
// }, (res) => {
//     let buffer = '';
//     res.on('data', (chunk) => {
//         buffer += chunk;
//     });

//     res.on('end', () => {
//         if (res.statusCode == 200)
//             logger.info(buffer.toString());
//         // logger.info(JSON.parse(buffer.toString()));
//         else
//             logger.error(JSON.parse(buffer.toString()));
//     });
// }).end();


/// delete roles
// http.request({
//     hostname: config.serverConfig.hostname,
//     port: config.serverConfig.port,
//     path: '/roles/role?id=1',
//     method: 'DELETE'
// }, (res) => {
//     let buffer = '';
//     res.on('data', (chunk) => {
//         buffer += chunk;
//     });

//     res.on('end', () => {
//         if (res.statusCode == 200)
//             logger.info(buffer.toString());
//         // logger.info(JSON.parse(buffer.toString()));
//         else
//             logger.error(JSON.parse(buffer.toString()));
//     });
// }).end();



//#region PUT roles
// let req = http.request({
//     hostname: config.serverConfig.hostname,
//     port: config.serverConfig.port,
//     path: '/role/role?id=1',
//     headers: {
//         'content-type': 'application/json'
//     },
//     method: 'PUT'
// }, (res) => {
//     let buffer = '';
//     res.on('data', (chunk) => {
//         buffer += chunk;
//     });
//     res.on('end', () => {
//         if (res.statusCode == 200)
//             logger.info(buffer.toString());
//         else
//             logger.error(JSON.parse(buffer.toString()));
//     });
// });
// req.write(JSON.stringify({
//     RoleName: "Admidsfgthyujkln",
//     RoleDesc: "ادمین"
// }));
// req.end();
//#endregion


// const req = http.request({
//     hostname: config.serverConfig.hostname,
//     port: config.serverConfig.port,
//     path: '/music/saveInfo',
//     headers: {
//         'content-type': 'application/json'
//     },
//     method: 'PUT'
// }, (res) => {
//     let buffer = '';
//     res.on('data', (chunk) => {
//         buffer += chunk;
//     });
//     res.on('end', () => {
//         if (res.statusCode == 200)
//             logger.info(buffer.toString());
//         else
//             logger.error(JSON.parse(buffer.toString()));
//     });
// });
// req.write(JSON.stringify({
//     MusicID: 10,
//     AlbumID: null,
//     ArtistID: null,
//     CategoryID: null,
//     MusicName: "In The Morning",
//     MusicTitle: "In The Morning",
//     MusicPoster: "null",
//     MusicURL: "1401-6-3 Itzy - In The Morning [ KohanMusic ] 720.mp4",
//     MusicDuration: "null",
//     MusicLyrics: "null",
//     MusicTags: "null",
//     MusicArtists: "Itzy",
//     MusicReleaseTime: "1401-6-3"
//   }));
// req.end();