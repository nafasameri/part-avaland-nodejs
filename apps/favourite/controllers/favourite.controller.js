const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const FavouriteRepository = require("../repositories/favourite.repository");
const favouriteRepository = new FavouriteRepository();


class FavouriteController {
    getFavourites = async (req, res) => {
        try {
            const {
                id
            } = req.querystring;
            if (id) {
                const favourite = await favouriteRepository.fetchById(id);
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(favourite.rows, null, 2));
            } else {
                const favourites = await favouriteRepository.fetchAll();
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(favourites.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllFavourites: ', error);
            throw error;
        }
    };

    createFavourite = async (req, res) => {
        try {
            const { body } = req;
            const favourite = await favouriteRepository.add(body, req.UserID);

            if (!favourite) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Create'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(favourite.rows));
            }
        } catch (error) {
            logger.error('createFavourite: ', error);
            throw error;
        }
    };

    updateFavourite = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await favouriteRepository.fetchById(id);
            const favouriteOld = row.rows[0];
            favouriteOld.FavouriteName = body.FavouriteName;
            favouriteOld.FavouriteDesc = body.FavouriteDesc;

            const favourite = await favouriteRepository.update(favouriteOld, req.UserID);
            if (!favourite) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(favourite.rows));
            }
        } catch (error) {
            logger.error('updateFavourite: ', error);
            throw error;
        }
    };

    deleteFavourite = async (req, res) => {
        try {
            const { id } = req.querystring;
            const favourite = await favouriteRepository.delete(id, req.UserID);
            if (!favourite) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(favourite.rows));
            }
        } catch (error) {
            logger.error('updateFavourite: ', error);
            throw error;
        }
    };
}


module.exports = new FavouriteController();