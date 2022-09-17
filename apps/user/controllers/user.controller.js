const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');

const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const UserRepository = require("../repositories/user.repository");
const userRepository = new UserRepository();
const client = require('../../../modules/database/redis');
const User = require('../models/user.model');


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

    #print = (userList) => {
        const userData = []
        userList.forEach(user => {
            const userJson = {
                "user-id": user.UserID,
                "username": user.UserName,
                "phone": user.UserPhone,
                "email": user.UserEmail,
                "password": user.Password,
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([user])));
            } else {
                const users = await userRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(users)));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    signUp = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.username || !body.password)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
    
            const passHash = crypto.createHash("md5").update(body.password + "hash").digest("hex");
            const newUser = new User(0, body.username, null, null, passHash, 3);
            const user = await userRepository.add(newUser);

            if (!user)
                sendResponse(res, 401, { "Content-Type": "application/json" }, 'Could Not Sign up');
            else
                sendResponse(res, statusCode.CREATED, { "Content-Type": "application/json" }, JSON.stringify(this.#print([user])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw Error('Could Not Sign up');
        }
    };

    login = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.username || !body.password)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const passHash = crypto.createHash("md5").update(body.password + "hash").digest("hex");
            const user = await userRepository.fetchByUserNamePassword(body.username, passHash);

            if (user) {
                const token = generateToken(body.username, body.password);
                const time = new Date(Date.now() + 10000);
                let setCookieCommand = 'token=' + token + '; Expires=' + time.toUTCString() + '; Path=/' + '; Domain=127.0.0.1';
                const key = token.split('.')[2];
                client.set(key, user.UserID);
        
                if (token)
                    return sendResponse(res, statusCode.OK, { 'Set-Cookie': setCookieCommand, 'token': token }, 'Authorized');
                return sendResponse(res, 401, null, 'Un Authorized');
            }
            return sendResponse(res, 401, null, 'Un Authorized');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw Error('Could Not Login');
        }
    };

    updateUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const userOld = await userRepository.fetchById(id);
            userOld.UserName = body.username ?? userOld.UserName;
            userOld.UserPhone = body.phone ?? userOld.UserPhone;
            userOld.UserEmail = body.email ?? userOld.UserEmail;
            userOld.RoleID = body["role-id"] ?? userOld.RoleID;

            const user = await userRepository.update(userOld, req.UserID);
            if (!user)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([user])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            const user = await userRepository.delete(id, req.UserID);
            if (!user)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([user])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new UserController();