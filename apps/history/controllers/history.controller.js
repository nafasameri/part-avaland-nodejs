const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const HistoryRepository = require("../repositories/History.repository");
const historyRepository = new HistoryRepository();


class HistoryController {

    #print = (historyArr) => {

        const historyData = []
        historyArr.forEach(history => {
            const historyJson = { }
            historyData.push(historyJson)
        });
        return historyData;
    }


    getHistories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const history = await historyRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(history, null, 2));
            } else {
                const historys = await historyRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(historys, null, 2));
            }
        } catch (error) {
            logger.error('getHistories: ', error);
            throw error;
        }
    };

    createHistory = async (req, res) => {
        try {
            const { body } = req;
            const history = await historyRepository.add(body, req.UserID);

            if (!history) 
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(history));
        } catch (error) {
            logger.error('createHistory: ', error);
            throw error;
        }
    };

    updateHistory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const historyOld = await historyRepository.fetchById(id);
            historyOld.UserID = body.UserID ?? historyOld.UserID;
            historyOld.MusicID = body.MusicID ?? historyOld.MusicID;

            const history = await historyRepository.update(historyOld, req.UserID);
            if (!history)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(history));
        } catch (error) {
            logger.error('updateHistory: ', error);
            throw error;
        }
    };

    deleteHistory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const history = await historyRepository.delete(id, req.UserID);
            if (!history)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(history));
        } catch (error) {
            logger.error('deleteHistory: ', error);
            throw error;
        }
    };
}


module.exports = new HistoryController();