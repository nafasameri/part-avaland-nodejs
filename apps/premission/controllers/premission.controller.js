const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PremissionRepository = require("../repositories/premission.repository");
const premissionRepository = new PremissionRepository();


class PremissionController {

    #print = (premissionArr) => {
        const premissionData = []
        premissionArr.forEach(premission => {
            const premissionJson = {
                "premission-id": premission.PremissionID,
                "role-id": premission.RoleID,
                "musid-id": premission.MenuID,
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
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
            } else {
                const premissions = await premissionRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print(premissions)));
            }
        } catch (error) {
            logger.error('getHistories: ' + error);
            throw error;
        }
    };

    createPremission = async (req, res) => {
        try {
            const { body } = req;
            const premission = await premissionRepository.add(body, req.RoleID);

            if (!premission)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
        } catch (error) {
            logger.error('createPremission: ' + error);
            throw error;
        }
    };

    updatePremission = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const premissionOld = await premissionRepository.fetchById(id);
            premissionOld.RoleID = body.RoleID ?? premissionOld.RoleID;
            premissionOld.MenuID = body.MenuID ?? premissionOld.MenuID;

            const premission = await premissionRepository.update(premissionOld, req.RoleID);
            if (!premission)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
        } catch (error) {
            logger.error('updatePremission: ' + error);
            throw error;
        }
    };

    deletePremission = async (req, res) => {
        try {
            const { id } = req.querystring;
            const premission = await premissionRepository.delete(id, req.RoleID);
            if (!premission)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([premission])));
        } catch (error) {
            logger.error('deletePremission: ' + error);
            throw error;
        }
    };
}


module.exports = new PremissionController();