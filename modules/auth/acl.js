const client = require('../database/redis');
const sendResponse = require('../handler/response.handler');
const logger = require('../logger');
const db = require('../database');

module.exports = async (req, res, next) => {
    const acl = await db.query(`SELECT "Role"."RoleID", "Role"."RoleName", "Role"."RoleDesc",
        "Resource"."ResourceID", "Resource"."ResourceName", "Resource"."ResourceDesc", "Resource"."ResourceIcon", "Resource"."ResourceLink", "Resource"."ResourceOrder",
        "User"."UserID", "User"."UserName"
            FROM "Role"
            JOIN "Premission" ON "Role"."RoleID" = "Premission"."RoleID"
            JOIN "Resource" ON "Resource"."ResourceID" = "Premission"."ResourceID"
            JOIN "User" ON "User"."RoleID" = "Role"."RoleID" WHERE "User"."UserID"=${req.UserID}`);
    acl.rows.forEach(element => {
        if (element.ResourceLink == req.url)
            return req;
        console.log(element.ResourceLink == req.url);
    });
    return sendResponse(res, 403, { "Content-Type": "application/json" }, 'Dont Access');
}