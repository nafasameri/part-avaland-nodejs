const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const FavouriteRepository = require("../repositories/favourite.repository");
const favouriteRepository = new FavouriteRepository();

const statusCode = require('http-status-codes');
const Favourite = require('../models/favourite.model');

class FavouriteController {
    getFavourites = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const favourite = await favouriteRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, favourite);
            } else {
                const favourites = await favouriteRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, favourites);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createFavourite = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body["music-id"] || !body["user-id"])
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            let favourite = await favouriteRepository.fetchByUserMusic(body["music-id"], body["user-id"]);
            if (!favourite)
                favourite = await favouriteRepository.add(body, req.UserID);
            else {
                favourite["delete?"] = favourite["delete?"] == 0 ? 1 : 0;
                favourite = await favouriteRepository.update(favourite, req.UserID);
            }
            if (!favourite)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, favourite);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateFavourite = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body || !body["music-id"] || !body["user-id"])
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const favouriteOld = await favouriteRepository.fetchById(id);
            favouriteOld["user-id"] = body["user-id"] ?? favouriteOld["user-id"];
            favouriteOld["music-id"] = body["music-id"] ?? favouriteOld["music-id"];

            const favourite = await favouriteRepository.update(favouriteOld, req.UserID);
            if (!favourite)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, favourite);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteFavourite = async (req, res) => {
        try {
            const { id } = req.querystring;
            const favourite = await favouriteRepository.delete(id, req.UserID);
            if (!favourite)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, favourite);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    getFavouriteMusic = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const favourite = await favouriteRepository.fetchByMusic(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, favourite);
            } else {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found');
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    getFavouriteUser = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const favourite = await favouriteRepository.fetchByUser(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, favourite);
            } else {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found');
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new FavouriteController();