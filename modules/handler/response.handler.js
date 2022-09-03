module.exports = (res, status, header, content) => {
    res.writeHead(status, header);
    res.end(JSON.stringify({ 
        status: status,
        timestamp: Date.now(),
        message: content
    }));
};