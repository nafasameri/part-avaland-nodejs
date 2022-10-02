const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');

const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const UserRepository = require("../repositories/user.repository");
const userRepository = new UserRepository();
const client = require('../../../modules/database/redis');
const User = require('../models/user.model');
const config = require('../config');


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

function decodeToken(token) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || 'jwt_secret_key';
    const data = jwt.decode(token, jwtSecretKey);
    return data;
}

class UserController {
    getUsers = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const user = await userRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, user);
            } else {
                const users = await userRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, users);
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
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Invalid parameters!');

            const username = await userRepository.fetchByUserName(body.username);
            if (username)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'This username early exist!');

            const passHash = crypto.createHash(config.algorithm).update(body.password + config.hash).digest(config.encoding);
            const newUser = {
                username: body.username,
                password: passHash,
                roleID: 3
            };
            const user = await userRepository.add(newUser);
            if (!user)
                sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Could Not Sign up');
            else
                sendResponse(res, statusCode.CREATED, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, user);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw Error('Could Not Sign up');
        }
    };

    login = async (req, res) => {
        try {
            const { body } = req;
            console.log(body);
            if (!body || !body.username || !body.password)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Invalid parameters!');

            const username = await userRepository.fetchByUserName(body.username);
            if (!username)
                return sendResponse(res, statusCode.UNAUTHORIZED, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'This username does not exist!');

            const passHash = crypto.createHash(config.algorithm).update(body.password + config.hash).digest(config.encoding);
            const user = await userRepository.fetchByUserNamePassword(body.username, passHash);

            if (user) {
                const token = generateToken(body.username, body.password);
                const time = new Date(Date.now() + (5 * 60 * 1000));
                let setCookieCommand = 'token=' + token + '; Expires=' + time.toUTCString() + '; Path=/' + '; Domain=127.0.0.1';
                const key = token.split('.')[2];
                client.set(key, user.UserID);
        
                if (token) {
                    // document.cookie = setCookieCommand;
                    return sendResponse(res, statusCode.OK, { 'Set-Cookie': setCookieCommand, 'token': token }, 'Authorized');
                }
                return sendResponse(res, 401, null, 'Un Authorized');
            }
            return sendResponse(res, 401, null, 'The password is incorrect!');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw Error('Could Not Login');
        }
    };

    updatePassword = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body || !body.password)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Invalid parameters!');
            
            const passHash = crypto.createHash(config.algorithm).update(body.password + config.hash).digest(config.encoding);
            const userOld = await userRepository.fetchById(id);
            if (userOld) {
                userOld.password = passHash ?? userOld.password;
                const user = await userRepository.updatePassword(userOld, req.UserID);
                if (!user)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, user);
            }
            else
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Not Found!');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Invalid parameters!');

            const userOld = await userRepository.fetchById(id);
            if (userOld) {
                userOld.username = body.username ?? userOld.username;
                userOld.phone = body.phone ?? userOld.phone;
                userOld.email = body.email ?? userOld.email;
                userOld["role-id"] = body["role-id"] ?? userOld["role-id"];

                const user = await userRepository.update(userOld, req.UserID);
                if (!user)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, user);
            }
            else
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Not Found!');
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
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, user);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new UserController();