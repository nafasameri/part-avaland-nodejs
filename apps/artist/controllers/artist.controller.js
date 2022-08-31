const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const ArtistRepository = require("../repositories/artist.repository");
const artistRepository = new ArtistRepository();


class ArtistController {
    getArtists = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const artist = await artistRepository.fetchById(id);
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(artist.rows, null, 2));
            } else {
                const artists = await artistRepository.fetchAll();
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(artists.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllArtists: ', error);
            throw error;
        }
    };

    createArtist = async (req, res) => {
        try {
            const { body } = req;
            const artist = await artistRepository.add(body, req.UserID);

            if (!artist) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Create'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(artist.rows));
            }
        } catch (error) {
            logger.error('createArtist: ', error);
            throw error;
        }
    };

    updateArtist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await artistRepository.fetchById(id);
            const artistOld = row.rows[0];
            artistOld.ArtistName = body.ArtistName;
            artistOld.ArtistImg = body.ArtistImg;

            const artist = await artistRepository.update(artistOld, req.UserID);
            if (!artist) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(artist.rows));
            }
        } catch (error) {
            logger.error('updateArtist: ', error);
            throw error;
        }
    };

    deleteArtist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const artist = await artistRepository.delete(id, req.UserID);
            if (!artist) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(artist.rows));
            }
        } catch (error) {
            logger.error('deleteArtist: ', error);
            throw error;
        }
    };
}


module.exports = new ArtistController();