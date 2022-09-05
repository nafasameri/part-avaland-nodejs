const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const FavouriteRepository = require("../repositories/favourite.repository");
const favouriteRepository = new FavouriteRepository();


class FavouriteController {
    #print = (favouriteArr) => {

        const favouriteData = []
        favouriteArr.forEach(favourite => {
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
        return favouriteData;
    }

    getFavourites = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const favourite = await favouriteRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([favourite]), null, 2));
            } else {
                const favourites = await favouriteRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print(favourites), null, 2));
            }
        } catch (error) {
            logger.error('getAllFavourites: ', error);
            throw error;
        }
    };

    createFavourite = async (req, res) => {
        try {
            const { body } = req;
            let favourite = await favouriteRepository.fetchByUserMusic(body.MusicID, body.UserID);
            if (favourite.length == 0)
                favourite = await favouriteRepository.add(body, req.UserID);
            else {
                favourite.IsDelete = favourite.IsDelete == 0 ? 1 : 0;
                favourite = await favouriteRepository.update(favourite, req.UserID);
            }
            if (!favourite)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(favourite));
        } catch (error) {
            logger.error('createFavourite: ', error);
            throw error;
        }
    };

    updateFavourite = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const favouriteOld = await favouriteRepository.fetchById(id);
            favouriteOld.UserID = body.UserID ?? favouriteOld.UserID;
            favouriteOld.MusicID = body.MusicID ?? favouriteOld.MusicID;

            const favourite = await favouriteRepository.update(favouriteOld, req.UserID);
            if (!favourite)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(favourite));
        } catch (error) {
            logger.error('updateFavourite: ', error);
            throw error;
        }
    };

    deleteFavourite = async (req, res) => {
        try {
            const { id } = req.querystring;
            const favourite = await favouriteRepository.delete(id, req.UserID);
            if (!favourite)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(favourite));
        } catch (error) {
            logger.error('deleteFavourite: ', error);
            throw error;
        }
    };
}


module.exports = new FavouriteController();