const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const UserRepository = require("../repositories/user.repository");
const userRepository = new UserRepository();


class UserController {
    getUsers = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const user = await userRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(user.rows, null, 2));
            } else {
                const users = await userRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(users.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllUsers: ', error);
            throw error;
        }
    };

    createUser = async (req, res) => {
        try {
            const { body } = req;
            const user = await userRepository.add(body, req.UserID);

            if (!user) {
                sendResponse(res, 404, { "Content-Type": "application/json" }, JSON.stringify({ message: 'Could Not Create' }, null, 2));
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(user.rows));
            }
        } catch (error) {
            logger.error('createUser: ', error);
            throw error;
        }
    };

    updateUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await userRepository.fetchById(id);
            const userOld = row.rows[0];
            userOld.UserName = body.UserName;
            userOld.UserDesc = body.UserDesc;

            const user = await userRepository.update(userOld, req.UserID);
            if (!user) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(user.rows));
            }
        } catch (error) {
            logger.error('updateUser: ', error);
            throw error;
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            const user = await userRepository.delete(id, req.UserID);
            if (!user) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(user.rows));
            }
        } catch (error) {
            logger.error('deleteUser: ', error);
            throw error;
        }
    };
}


module.exports = new UserController();