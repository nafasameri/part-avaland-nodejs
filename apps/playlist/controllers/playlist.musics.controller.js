const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const PlaylistMusicsRepository = require("../repositories/playlist.musics.repository");
const playlistMusicsRepository = new PlaylistMusicsRepository();


class PlaylistMusicsController {

    #print = (playlistMusicsArr) => {

        const playlistMusicsData = []
        playlistMusicsArr.forEach(playlistMusics => {
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
                const playlistMusic = await playlistMusicsRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlistMusic])));
            } else {
                const playlistMusics = await playlistMusicsRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print(playlistMusics)));
            }
        } catch (error) {
            logger.error('getAllPlaylist: ' + error);
            throw error;
        }
    };

    createPlaylistMusics = async (req, res) => {
        try {
            const { body } = req;
            const playlistMusics = await playlistMusicsRepository.add(body, req.UserID);

            if (!playlistMusics)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlistMusics])));
        } catch (error) {
            logger.error('createPlaylistMusics: ' + error);
            throw error;
        }
    };

    deletePlaylistMusics = async (req, res) => {
        try {
            const { id } = req.querystring;
            const playlistMusics = await playlistMusicsRepository.delete(id, req.UserID);
            if (!playlistMusics)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([playlistMusics])));
        } catch (error) {
            logger.error('deletePlaylistMusics: ' + error);
            throw error;
        }
    };
}


module.exports = new PlaylistMusicsController();