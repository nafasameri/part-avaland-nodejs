module.exports = (res, header, content) => {
    res.writeHead(header[0], header[1]);
    res.end(JSON.stringify(content));
};