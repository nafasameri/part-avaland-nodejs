const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const RoleRepository = require("../repositories/role.repository");
const roleRepository = new RoleRepository();


class RoleController {
    getRoles = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const role = await roleRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(role.rows, null, 2));
            } else {
                const roles = await roleRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(roles.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllRoles: ', error);
            throw error;
        }
    };

    createRole = async (req, res) => {
        try {
            const { body } = req;
            const role = await roleRepository.add(body, req.UserID);

            if (!role) {
                sendResponse(res, 404, { "Content-Type": "application/json" }, JSON.stringify({ message: 'Could Not Create' }, null, 2));
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(role.rows));
            }
        } catch (error) {
            logger.error('createRole: ', error);
            throw error;
        }
    };

    updateRole = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await roleRepository.fetchById(id);
            const roleOld = row.rows[0];
            roleOld.RoleName = body.RoleName;
            roleOld.RoleDesc = body.RoleDesc;

            const role = await roleRepository.update(roleOld, req.UserID);
            if (!role) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(role.rows));
            }
        } catch (error) {
            logger.error('updateRole: ', error);
            throw error;
        }
    };

    deleteRole = async (req, res) => {
        try {
            const { id } = req.querystring;
            const role = await roleRepository.delete(id, req.UserID);
            if (!role) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(role.rows));
            }
        } catch (error) {
            logger.error('deleteRole: ', error);
            throw error;
        }
    };
}


module.exports = new RoleController();