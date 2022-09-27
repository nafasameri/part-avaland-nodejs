const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistRepository = require("../repositories/playlist.repository");
const playlistRepository = new PlaylistRepository();

const statusCode = require('http-status-codes');

class PlaylistController {
    getPlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const playlist = await playlistRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlist);
            } else {
                const playlists = await playlistRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlists);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createPlaylist = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.name || !body.img)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
            
            const playlist = await playlistRepository.add(body, req.UserID);
            if (!playlist) {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlist);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updatePlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
            
            const playlistOld = await playlistRepository.fetchById(id);
            if (playlistOld) {
                playlistOld.name = body.name ?? playlistOld.name;
                playlistOld.img = body.img ?? playlistOld.img;

                const playlist = await playlistRepository.update(playlistOld, req.UserID);
                if (!playlist)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlist);
            }
            else
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found!');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deletePlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const playlist = await playlistRepository.delete(id, req.UserID);
            if (!playlist)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlist);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new PlaylistController();