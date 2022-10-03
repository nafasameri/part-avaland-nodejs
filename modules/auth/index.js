const client = require('../database/redis');
const sendResponse = require('../handler/response.handler');
const logger = require('../logger');
const db = require('../database');

module.exports = async (req, res, next) => {
    logger.info(`${req.url} ${req.method}`)
    let setCookie = req.headers['set-cookie'];

    if (setCookie) {
        setCookie = setCookie[0];
        const key = setCookie.split(/=([^;]+)/g)[1].split('.')[2];
        req.UserID = await client.get(key);
        if (!req.UserID)
            return sendResponse(res, 401, { "Content-Type": "application/json" }, 'Unauthorized');

        const acl = await db.query(`SELECT "Role"."RoleID", "Role"."RoleName", "Role"."RoleDesc",
            "Menu"."MenuID", "Menu"."MenuName", "Menu"."MenuDesc", "Menu"."MenuIcon", "Menu"."MenuLink", "Menu"."MenuOrder",
            "User"."UserID", "User"."UserName"
             FROM "Role"
             JOIN "Premission" ON "Role"."RoleID" = "Premission"."RoleID"
             JOIN "Menu" ON "Menu"."MenuID" = "Premission"."MenuID"
             JOIN "User" ON "User"."RoleID" = "Role"."RoleID" WHERE "User"."UserID"=${req.UserID}`);
        acl.rows.forEach(element => {
            if (element.MenuLink == req.url)
                return req;
            console.log(element.MenuLink == req.url);
        });
        return sendResponse(res, 403, { "Content-Type": "application/json" }, 'Dont Access');
    }
    // return sendResponse(res, 401, { "Content-Type": "application/json" }, 'Unauthorized');
    return req;
}