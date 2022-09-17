const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const FavouriteRepository = require("../repositories/favourite.repository");
const favouriteRepository = new FavouriteRepository();

const statusCode = require('http-status-codes');
const Favourite = require('../models/favourite.model');

class FavouriteController {
    #print = (favouriteList) => {
        const favouriteData = []
        favouriteList.forEach(favourite => {
            const favouriteJson = {
                "favourite-id": favourite.FavouriteID,
                "user-id": favourite.UserID,
                "music-id": favourite.MusicID,
                "like-time": favourite.LikedTime,
                "creator": favourite.Creator,
                "create-time": favourite.CreateTime,
                "modifier": favourite.Modifier,
                "modifi-time": favourite.ModifiTime,
                "delete-flag": favourite.IsDelete
            }
            favouriteData.push(favouriteJson)
        });
        return (favouriteData == 1) ? favouriteData[0] : favouriteData;
    }

    getFavourites = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const favourite = await favouriteRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([favourite])));
            } else {
                const favourites = await favouriteRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(favourites)));
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

            const newFav = new Favourite(0, body["user-id"], body["music-id"]);
            let favourite = await favouriteRepository.fetchByUserMusic(newFav.MusicID, newFav.UserID);
            if (favourite.length == 0)
                favourite = await favouriteRepository.add(newFav, req.UserID);
            else {
                favourite.IsDelete = favourite.IsDelete == 0 ? 1 : 0;
                favourite = await favouriteRepository.update(favourite, req.UserID);
            }
            if (!favourite)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([favourite])));
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
            favouriteOld.UserID = body["user-id"] ?? favouriteOld.UserID;
            favouriteOld.MusicID = body["music-id"] ?? favouriteOld.MusicID;

            const favourite = await favouriteRepository.update(favouriteOld, req.UserID);
            if (!favourite)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([favourite])));
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([favourite])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new FavouriteController();