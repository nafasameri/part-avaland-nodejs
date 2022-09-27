const statusCode = require('http-status-codes');
const { datetime } = require('../utility');

module.exports = (res, status, header, content) => {
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