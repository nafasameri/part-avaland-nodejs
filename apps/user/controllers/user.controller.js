const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const UserRepository = require("../repositories/user.repository");
const userRepository = new UserRepository();


class UserController {

    #print = (userArr) => {
        const userData = []
        userArr.forEach(user => {
            const userJson = {
                "user-id": user.UserID,
                "name": user.UserName,
                "phone": user.UserPhone,
                "email": user.UserEmail,
                "role-id": user.RoleID,
                "creator": user.Creator,
                "create-time": user.CreateTime,
                "modifier": user.Modifier,
                "modifi-time": user.ModifiTime,
                "delete-flag": user.IsDelete
            }
            userData.push(userJson)
        });

        return (userData.length === 1) ? userData[0] : userData;
    }

    getUsers = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const user = await userRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([user]), null, 2));
            } else {
                const users = await userRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print(users), null, 2));
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

            if (!user)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(user));
        } catch (error) {
            logger.error('createUser: ', error);
            throw error;
        }
    };

    updateUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const userOld = await userRepository.fetchById(id);
            userOld.UserName = body.UserName ?? userOld.UserName;
            userOld.UserPhone = body.UserPhone ?? userOld.UserPhone;
            userOld.UserEmail = body.UserEmail ?? userOld.UserEmail;
            userOld.RoleID = body.RoleID ?? userOld.RoleID;

            const user = await userRepository.update(userOld, req.UserID);
            if (!user)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(user));
        } catch (error) {
            logger.error('updateUser: ', error);
            throw error;
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            const user = await userRepository.delete(id, req.UserID);
            if (!user)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(user));
        } catch (error) {
            logger.error('deleteUser: ', error);
            throw error;
        }
    };
}


module.exports = new UserController();