const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const UserRepository = require("../repositories/user.repository");
const userRepository = new UserRepository();
const client = require('../../../modules/database/redis');


function generateToken(username, password) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_secret_key';
    const data = {
        time: Date.now(),
        username: username,
        password: password
    };

    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

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
            logger.error('getAllUsers: ' + error);
            throw error;
        }
    };

    signUp = async (req, res) => {
        try {
            const { body } = req;
            const passHash = crypto.createHash("md5").update(body.password + "hash").digest("hex");
            const userInfo = {
                UserName: body.username,
                Password: passHash,
                RoleID: 3
            }
            const user = await userRepository.add(userInfo);

            if (!user)
                sendResponse(res, 401, { "Content-Type": "application/json" }, 'Could Not Sign up');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([user])));
        } catch (error) {
            logger.error('signUp: ' + error);
            throw Error('Could Not Sign up');
        }
    };

    login = async (req, res) => {
        try {
            const { body } = req;
            const passHash = crypto.createHash("md5").update(body.password + "hash").digest("hex");
            const user = await userRepository.fetchByUserNamePassword(body.username, passHash);

            if (user) {
                const token = generateToken(body.username, body.password);
                const time = new Date(Date.now() + 10000);
                let setCookieCommand = 'token=' + token + '; Expires=' + time.toUTCString() + '; Path=/' + '; Domain=127.0.0.1';
                const key = token.split('.')[2];
                client.set(key, user.UserID);
        
                if (token)
                    return sendResponse(res, 200, { 'Set-Cookie': setCookieCommand, 'token': token }, 'Authorized');
                return sendResponse(res, 401, null, 'Un Authorized');
            }
            return sendResponse(res, 401, null, 'Un Authorized');
        } catch (error) {
            logger.error('Login: ' + error);
            throw Error('Could Not Login');
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
            logger.error('updateUser: ' + error);
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
            logger.error('deleteUser: ' + error);
            throw error;
        }
    };
}


module.exports = new UserController();