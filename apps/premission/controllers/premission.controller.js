const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PremissionRepository = require("../repositories/premission.repository");
const premissionRepository = new PremissionRepository();

const statusCode = require('http-status-codes');
const Premission = require('../models/premission.model');

class PremissionController {

    #print = (premissionList) => {
        const premissionData = []
        premissionList.forEach(premission => {
            const premissionJson = {
                "premission-id": premission.PremissionID,
                "role-id": premission.RoleID,
                "music-id": premission.MenuID,
                "creator": premission.Creator,
                "creator-time": premission.CreateTime,
                "modifier": premission.Modifier,
                "modifi-time": premission.ModifiTime,
                "delete-flag": premission.IsDelete
            }
            premissionData.push(premissionJson)
        });
        return (premissionData == 1) ? premissionData[0] : premissionData;
    }


    getHistories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const premission = await premissionRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
            } else {
                const premissions = await premissionRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(premissions)));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createPremission = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body["role-id"] || !body["music-id"])
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
            
            const newPremission = new Premission(0, body["role-id"], body["music-id"]);
            const premission = await premissionRepository.add(newPremission, req.RoleID);

            if (!premission)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
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
            premissionOld.RoleID = body["role-id"] ?? premissionOld.RoleID;
            premissionOld.MenuID = body["music-id"] ?? premissionOld.MenuID;

            const premission = await premissionRepository.update(premissionOld, req.RoleID);
            if (!premission)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new PremissionController();