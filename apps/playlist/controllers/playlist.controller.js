const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistRepository = require("../repositories/playlist.repository");
const playlistRepository = new PlaylistRepository();


class PlaylistController {

    #print = (playlistArr) => {

        const playlistData = []
        playlistArr.forEach(playlist => {
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
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
            } else {
                const playlists = await playlistRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print(playlists)));
            }
        } catch (error) {
            logger.error('getAllPlaylist: ' + error);
            throw error;
        }
    };

    createPlaylist = async (req, res) => {
        try {
            const { body } = req;
            const playlist = await playlistRepository.add(body, req.UserID);

            if (!playlist) {
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
            }
        } catch (error) {
            logger.error('createPlaylist: ' + error);
            throw error;
        }
    };

    updatePlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const playlistOld = await playlistRepository.fetchById(id);
            playlistOld.PlaylistName = body.PlaylistName ?? playlistOld.PlaylistName;
            playlistOld.PlaylistDesc = body.PlaylistDesc ?? playlistOld.PlaylistDesc;

            const playlist = await playlistRepository.update(playlistOld, req.UserID);
            if (!playlist)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
        } catch (error) {
            logger.error('updatePlaylist: ', error);
            throw error;
        }
    };

    deletePlaylist = async (req, res) => {
        try {
            const { id } = req.querystring;
            const playlist = await playlistRepository.delete(id, req.UserID);
            if (!playlist)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlist])));
        } catch (error) {
            logger.error('deletePlaylist: ' + error);
            throw error;
        }
    };
}


module.exports = new PlaylistController();