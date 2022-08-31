const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const HistoryRepository = require("../repositories/History.repository");
const HistoryRepository = new HistoryRepository();


class HistoryController {
    getHistories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const History = await HistoryRepository.fetchById(id);
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(History.rows, null, 2));
            } else {
                const Historys = await HistoryRepository.fetchAll();
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(Historys.rows, null, 2));
            }
        } catch (error) {
            logger.error('getHistories: ', error);
            throw error;
        }
    };

    createHistory = async (req, res) => {
        try {
            const { body } = req;
            const History = await HistoryRepository.add(body, req.UserID);

            if (!History) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Create'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(History.rows));
            }
        } catch (error) {
            logger.error('createHistory: ', error);
            throw error;
        }
    };

    updateHistory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await HistoryRepository.fetchById(id);
            const HistoryOld = row.rows[0];
            HistoryOld.HistoryName = body.HistoryName;
            HistoryOld.HistoryImg = body.HistoryImg;

            const History = await HistoryRepository.update(HistoryOld, req.UserID);
            if (!History) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(History.rows));
            }
        } catch (error) {
            logger.error('updateHistory: ', error);
            throw error;
        }
    };

    deleteHistory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const History = await HistoryRepository.delete(id, req.UserID);
            if (!History) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(History.rows));
            }
        } catch (error) {
            logger.error('deleteHistory: ', error);
            throw error;
        }
    };
}


module.exports = new HistoryController();