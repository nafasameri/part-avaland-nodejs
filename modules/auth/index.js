const client = require('../database/redis');

module.exports = async (req, res, next) => {
    const setCookie = req.headers['set-cookie'][0];
    // const key = setCookie.split(';')[0].split('=')[1].split('.')[2];
    const key = setCookie.split(/=([^;]+)/g)[1].split('.')[2];
    req.UserID = await client.get(key);
    return req;
}