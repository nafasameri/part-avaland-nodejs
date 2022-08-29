var http = require("http");
var path = require("path");
var url = require('url');
var fs = require("fs");
const sendResponse = require('./modules/handler/response.handler');

var initFolder = __dirname;

http.createServer(httpListener).listen(8000);

function httpListener(request, response) {
    if (request.method != 'GET') {
        sendResponse(response, 405, {
            'Allow': 'GET'
        }, null);
        return null;
    }

    let filename = initFolder + url.parse(request.url, true, true).pathname.split('/').join(path.sep);

    if (!fs.existsSync(filename)) {
        sendResponse(response, 404, null, 'Not Found!');
    }

    let rangeRequest = readRangeHeader();

    if (rangeRequest == null) {
        //send full stream or file    
        sendResponse(response, 200, responseHeaders, fs.createReadStream(filename));
        return null;
    }

    if (start >= stat.size || end >= stat.size) {
        sendResponse(response, 416, null, 'Not satisfied');
    }
    // set headers and send range streams
    sendResponse(response, 206, responseHeaders, fs.createReadStream(filename, {
        start: start,
        end: end
    }));
}

function getMimeNameFromExt(ext) {
    let mimeNames = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.mp3': 'audio/mpeg',
        '.mp4': 'video/mp4',
        '.ogg': 'application/ogg',
        '.ogv': 'video/ogg',
        '.oga': 'audio/ogg',
        '.txt': 'text/plain',
        '.wav': 'audio/x-wav',
        '.webm': 'video/webm'
    };

    let result = mimeNames[ext.toLowerCase()];

    if (result == null)
        result = 'application/octet-stream';

    return result;
}

function readRangeHeader(range, totalLength) {
    return result;
}