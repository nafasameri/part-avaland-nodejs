const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistMusicsRepository = require("../repositories/playlist.musics.repository");
const playlistMusicsRepository = new PlaylistMusicsRepository();

const statusCode = require('http-status-codes');
const PlaylistMusic = require('../models/playlist.musics.model');

class PlaylistMusicsController {

    #print = (playlistMusicsList) => {
        const playlistMusicsData = []
        playlistMusicsList.forEach(playlistMusics => {
            const playlistMusicsJson = {
                "playlist-music-id":playlistMusics.PlaylistMusicID,
                "playlist-id":playlistMusics.PlaylistID,
                "music-id":playlistMusics.MusicID,
                "creator":playlistMusics.Creator,
                "create-time":playlistMusics.CreateTime,
                "modifier":playlistMusics.Modifier,
                "modifi-time":playlistMusics.ModifiTime,
                "delete-flag":playlistMusics.IsDelete
            }
            playlistMusicsData.push(playlistMusicsJson)
        });
        return (playlistMusicsData == 1) ? playlistMusicsData[0] : playlistMusicsData;
    }

    getPlaylistMusics = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const playlistMusics = await playlistMusicsRepository.fetchByPlaylistId(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(playlistMusics)));
            } else {
                const playlistMusics = await playlistMusicsRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(playlistMusics)));
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

            const newPlaylistMusic = new PlaylistMusic(0, body["playlist-id"], body["music-id"]);
            const playlistMusics = await playlistMusicsRepository.add(newPlaylistMusic, req.UserID);

            if (!playlistMusics)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.CREATED, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlistMusics])));
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlistMusics])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new PlaylistMusicsController();