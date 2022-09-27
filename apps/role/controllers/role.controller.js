const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const RoleRepository = require("../repositories/role.repository");
const roleRepository = new RoleRepository();

const statusCode = require('http-status-codes');
const Role = require('../models/role.model');

class RoleController {
    getRoles = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const role = await roleRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, role);
            } else {
                const roles = await roleRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, roles);
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

            const role = await roleRepository.add(body, req.UserID);
            if (!role) {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, role);
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
            roleOld.name = body.name ?? roleOld.name;
            roleOld.description = body.description ?? roleOld.description;

            const role = await roleRepository.update(roleOld, req.UserID);
            if (!role)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, role);
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, role);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new RoleController();