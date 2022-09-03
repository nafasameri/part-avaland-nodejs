const statusCode = require('http-status-codes');

module.exports = (res, status, header, content) => {
    res.writeHead(status, header);
    res.end(JSON.stringify({ 
        statusCode: status,
        statusMessage: statusCode.getStatusText(status),
        timestamp: Date.now(),
        message: content
    }));
};