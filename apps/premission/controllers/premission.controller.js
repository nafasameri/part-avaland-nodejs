const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PremissionRepository = require("../repositories/premission.repository");
const premissionRepository = new PremissionRepository();

const statusCode = require('http-status-codes');

class PremissionController {
    getPremissions = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const premission = await premissionRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, premission);
            } else {
                const premissions = await premissionRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, premissions);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createPremission = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body["role-id"] || !body["menu-id"])
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
            
            const premission = await premissionRepository.add(body, req.RoleID);
            if (!premission)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, premission);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updatePremission = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const premissionOld = await premissionRepository.fetchById(id);
            if (premissionOld) {
                premissionOld["role-id"] = body["role-id"] ?? premissionOld["role-id"];
                premissionOld["menu-id"] = body["menu-id"] ?? premissionOld["menu-id"];

                const premission = await premissionRepository.update(premissionOld, req.UserID);
                if (!premission)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, premission);
            }
            else
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found!');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deletePremission = async (req, res) => {
        try {
            const { id } = req.querystring;
            const premission = await premissionRepository.delete(id, req.RoleID);
            if (!premission)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, premission);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new PremissionController();