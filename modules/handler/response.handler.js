module.exports = (res, status, header, content) => {
    res.writeHead(status, header);
    res.end(content);
};