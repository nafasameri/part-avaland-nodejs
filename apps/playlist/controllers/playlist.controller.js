const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistRepository = require("../repositories/playlist.repository");
const playlistRepository = new PlaylistRepository();

const statusCode = require('http-status-codes');
const Playlist = require('../models/playlist.model');

class PlaylistController {

    #print = (playlistList) => {
        const playlistData = []
        playlistList.forEach(playlist => {
            const playlistJson = {
                "playlist-id": playlist.PlaylistID,
                "name": playlist.PlaylistName,
                "description": playlist.PlaylistDesc,
                "creator": playlist.Creator,
                "create-time": playlist.CreateTime,
                "modifier": playlist.Modifier,
                "modifi-time": playlist.ModifiTime,
                "delete-flag": playlist.IsDelete
            }
            playlistData.push(playlistJson)
        });
        return (playlistData == 1) ? playlistData[0] : playlistData;
    }


    getPlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const playlist = await playlistRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
            } else {
                const playlists = await playlistRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(playlists)));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createPlaylist = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.name || !body.description)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
            
            const newPlaylist = new Playlist(0, body.name, body.description);
            const playlist = await playlistRepository.add(newPlaylist, req.UserID);
            if (!playlist) {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
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
            playlistOld.PlaylistName = body.name ?? playlistOld.PlaylistName;
            playlistOld.PlaylistDesc = body.description ?? playlistOld.PlaylistDesc;

            const playlist = await playlistRepository.update(playlistOld, req.UserID);
            if (!playlist)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new PlaylistController();