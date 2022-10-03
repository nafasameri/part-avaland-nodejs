const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistMusicsRepository = require("../repositories/playlist.musics.repository");
const playlistMusicsRepository = new PlaylistMusicsRepository();

const statusCode = require('http-status-codes');

class PlaylistMusicsController {
    getPlaylistMusics = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const playlistMusics = await playlistMusicsRepository.fetchByPlaylistId(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlistMusics);
            } else {
                const playlistMusics = await playlistMusicsRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlistMusics);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createPlaylistMusics = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body["playlist-id"] || !body["music-id"])
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const playlistMusics = await playlistMusicsRepository.add(body, req.UserID);

            if (!playlistMusics)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.CREATED, { "Content-Type": "application/json" }, playlistMusics);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deletePlaylistMusics = async (req, res) => {
        try {
            const { id } = req.querystring;
            const playlistMusics = await playlistMusicsRepository.delete(id, req.UserID);
            if (!playlistMusics)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, playlistMusics);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new PlaylistMusicsController();