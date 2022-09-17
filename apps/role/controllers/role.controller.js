const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const RoleRepository = require("../repositories/role.repository");
const roleRepository = new RoleRepository();

const statusCode = require('http-status-codes');
const Role = require('../models/role.model');

class RoleController {

    #print = (roleList) => {
        const roleData = []
        roleList.forEach(role => {
            const roleJson = {
                "role-id": role.RoleID,
                "name": role.RoleName,
                "description": role.RoleDesc,
                "creator": role.Creator,
                "create-time": role.CreateTime,
                "modifier": role.Modifier,
                "modifi-time": role.ModifiTime,
                "delete-flag": role.IsDelete
            }
            roleData.push(roleJson)
        });
        return (roleData.length == 1) ? roleData[0] : roleData;
    }

    getRoles = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const role = await roleRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([role])));
            } else {
                const roles = await roleRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(roles)));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createRole = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.name || !body.description)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const newRole = new Role(0, body.name, body.description);
            const role = await roleRepository.add(newRole, req.UserID);

            if (!role) {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([role])));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateRole = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
        
            const roleOld = await roleRepository.fetchById(id);
            roleOld.RoleName = body.name ?? roleOld.RoleName;
            roleOld.RoleDesc = body.description ?? roleOld.RoleDesc;

            const role = await roleRepository.update(roleOld, req.UserID);
            if (!role)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([role])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteRole = async (req, res) => {
        try {
            const { id } = req.querystring;
            const role = await roleRepository.delete(id, req.UserID);
            if (!role) {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            } else {
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([role])));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new RoleController();