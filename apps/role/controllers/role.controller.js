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
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(role, null, 2));
            } else {
                const roles = await roleRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(roles, null, 2));
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
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(role));
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
            const roleOld = await roleRepository.fetchById(id);
            roleOld.RoleName = body.RoleName ?? roleOld.RoleName;
            roleOld.RoleDesc = body.RoleDesc ?? roleOld.RoleDesc;

            const role = await roleRepository.update(roleOld, req.UserID);
            if (!role)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(role));
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
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(role));
            }
        } catch (error) {
            logger.error('deleteRole: ', error);
            throw error;
        }
    };
}


module.exports = new RoleController();