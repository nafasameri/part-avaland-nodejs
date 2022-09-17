const client = require('../database/redis');
const sendResponse = require('../handler/response.handler')
module.exports = async (req, res, next) => {
    let setCookie = req.headers['set-cookie'];
    if (setCookie) {
        setCookie = setCookie[0];
        const key = setCookie.split(/=([^;]+)/g)[1].split('.')[2];
        req.UserID = await client.get(key);
        if (!req.UserID)
            return sendResponse(res, 401, { "Content-Type": "application/json" }, 'Unauthorized');
        return req;
    }
    return sendResponse(res, 401, { "Content-Type": "application/json" }, 'Unauthorized');
}