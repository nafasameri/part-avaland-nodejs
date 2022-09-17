const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const HistoryRepository = require("../repositories/History.repository");
const historyRepository = new HistoryRepository();

const statusCode = require('http-status-codes');
const History = require('../models/history.model');

class HistoryController {

    #print = (historyList) => {
        const historyData = []
        historyList.forEach(history => {
            const historyJson = {
                "history-id": history.HistoryID,
                "user-id": history.UserID,
                "music-id": history.MusicID,
                "creator": history.Creator,
                "creator-time": history.CreateTime,
                "modifier": history.Modifier,
                "modifi-time": history.ModifiTime,
                "delete-flag": history.IsDelete
            }
            historyData.push(historyJson)
        });
        return (historyData == 1) ? historyData[0] : historyData;
    }


    getHistories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const history = await historyRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([history])));
            } else {
                const historys = await historyRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(historys)));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createHistory = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body["music-id"] || !body["user-id"])
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const newHistory = new History(0, body["user-id"], body["music-id"]);
            const history = await historyRepository.add(newHistory, req.UserID);

            if (!history)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([history])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateHistory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body || !body["music-id"] || !body["user-id"])
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const historyOld = await historyRepository.fetchById(id);
            historyOld.UserID = body["user-id"] ?? historyOld.UserID;
            historyOld.MusicID = body["music-id"] ?? historyOld.MusicID;

            const history = await historyRepository.update(historyOld, req.UserID);
            if (!history)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([history])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteHistory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const history = await historyRepository.delete(id, req.UserID);
            if (!history)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([history])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new HistoryController();