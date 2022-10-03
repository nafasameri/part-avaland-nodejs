const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const HistoryRepository = require("../repositories/History.repository");
const historyRepository = new HistoryRepository();

const statusCode = require('http-status-codes');
const History = require('../models/history.model');

class HistoryController {
    getHistories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const history = await historyRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, history);
            } else {
                const historys = await historyRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, historys);
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

            const history = await historyRepository.add(body, req.UserID);
            if (!history)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, history);
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
            if (historyOld) {
                historyOld["user-id"] = body["user-id"] ?? historyOld["user-id"];
                historyOld["music-id"] = body["music-id"] ?? historyOld["music-id"];

                const history = await historyRepository.update(historyOld, req.UserID);
                if (!history)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, history);
            }
            else
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found!');
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, history);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    getHistoryMusic = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const history = await historyRepository.fetchByMusic(id);
                if (history.length > 0)
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, history);
                else
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found');
            } 
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    getHistoryUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const history = await historyRepository.fetchByUser(id);
                if (history.length > 0)
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, history);
                else
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found');
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new HistoryController();