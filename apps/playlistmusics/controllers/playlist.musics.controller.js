const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistMusicsRepository = require("../repositories/playlist.musics.repository");
const playlistMusicsRepository = new PlaylistMusicsRepository();


class PlaylistMusicsController {
    getPlaylistMusics = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const playlistMusics = await playlistMusicsRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(playlistMusics.rows, null, 2));
            } else {
                const playlistMusics = await playlistMusicsRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(playlistMusics.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllPlaylist: ', error);
            throw error;
        }
    };

    createPlaylistMusics = async (req, res) => {
        try {
            const { body } = req;
            const playlistMusics = await playlistMusicsRepository.add(body, req.UserID);

            if (!playlistMusics) {
                sendResponse(res, 404, { "Content-Type": "application/json" }, JSON.stringify({ message: 'Could Not Create' }, null, 2));
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(playlistMusics.rows));
            }
        } catch (error) {
            logger.error('createPlaylistMusics: ', error);
            throw error;
        }
    };

  

    deletePlaylistMusics= async (req, res) => {
        try {
            const { id } = req.querystring;
            const playlistMusics = await playlistMusicsRepository.delete(id, req.UserID);
            if (!playlistMusics) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(playlistMusics.rows));
            }
        } catch (error) {
            logger.error('deletePlaylistMusics: ', error);
            throw error;
        }
    };
}


module.exports = new PlaylistMusicsController();