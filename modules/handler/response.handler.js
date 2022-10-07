const statusCode = require('http-status-codes');
const { datetime } = require('../utility');

module.exports = (res, status, header, content) => {
    header['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    header['Access-Control-Allow-Credentials'] = true;
    header['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE';
    header['Access-Control-Allow-Headers'] = '*';
    res.writeHead(status, header);

    if (status >= 500)
        res.end(JSON.stringify({
            time: datetime(),
            status: status,
            message: statusCode.getStatusText(status)
        }));
    else
        res.end(JSON.stringify({
            statusCode: status,
            statusMessage: statusCode.getStatusText(status),
            time: datetime(),
            message: content
        }));
};