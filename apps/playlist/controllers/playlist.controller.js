const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistRepository = require("../repositories/playlist.repository");
const playlistRepository = new PlaylistRepository();


class PlaylistController {
    getPlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const playlist = await playlistRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(playlist.rows, null, 2));
            } else {
                const playlist = await playlistRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(playlist.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllPlaylist: ', error);
            throw error;
        }
    };

    createPlaylist = async (req, res) => {
        try {
            const { body } = req;
            const playlist = await playlistRepository.add(body, req.UserID);

            if (!playlist) {
                sendResponse(res, 404, { "Content-Type": "application/json" }, JSON.stringify({ message: 'Could Not Create' }, null, 2));
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(playlist.rows));
            }
        } catch (error) {
            logger.error('createPlaylist: ', error);
            throw error;
        }
    };

    updatePlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await playlistRepository.fetchById(id);
            const playlistOld = row.rows[0];
            playlistOld.PlaylistName = body.PlaylistName ?? playlistOld.PlaylistName;
            playlistOld.PlaylistDesc = body.PlaylistDesc ?? playlistOld.PlaylistDesc;

            const playlist = await playlistRepository.update(playlistOld, req.UserID);
            if (!playlist) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(playlist.rows));
            }
        } catch (error) {
            logger.error('updatePlaylist: ', error);
            throw error;
        }
    };

    deletePlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const playlist = await playlistRepository.delete(id, req.UserID);
            if (!playlist) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(playlist.rows));
            }
        } catch (error) {
            logger.error('deletePlaylist: ', error);
            throw error;
        }
    };
}


module.exports = new PlaylistController();