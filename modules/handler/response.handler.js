const statusCode = require('http-status-codes');

module.exports = (res, status, header, content) => {
    res.writeHead(status, header);
    if (status >= 500)
        res.end(JSON.stringify({
            time: Date.now(),
            status: status,
            message: statusCode.getStatusText(status)
        }));
    else
        res.end(JSON.stringify({
            statusCode: status,
            statusMessage: statusCode.getStatusText(status),
            time: Date.now(),
            message: content
        }));
};