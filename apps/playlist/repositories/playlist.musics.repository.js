const PlaylistMusics = require("../models/playlist.musics.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PlaylistMusicsRepository {
    async fetchAll() {
        return db.selcet('PlaylistMusics', '*');
    }

    async fetchById(id) {
<<<<<<< HEAD
        return db.selcet('PlaylistMusics', '*', `"PlaylistMusicsID"=${id}`);
=======
        return db.selcet('PlaylistMusics', '*', `"PlaylistMusicID"=${id}`);
>>>>>>> 5caf6e9c609e47cd9c76fde78c9a3bb9bf1671d7
    }

    async add(playlistMusics, userID) {
        const playlistMusicModel = new PlaylistMusics(
            0,
            playlistMusics.PlaylistID,
            playlistMusics.MusicID,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const playlistMusicsRow = db.insert('PlaylistMusics', '"PlaylistID", "MusicID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${playlistMusicModel.PlaylistID}', '${playlistMusicModel.MusicID}', ${playlistMusicModel.Creator}, '${playlistMusicModel.CreateTime}', ${playlistMusicModel.Modifier}, '${playlistMusicModel.ModifiTime}', ${playlistMusicModel.IsDelete}`);
        return playlistMusicsRow;
    }



    async delete(id, userID) {
<<<<<<< HEAD
        return db.update('PlaylistMusics', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"RoleID"=${id}`);
=======
        return db.update('PlaylistMusics', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PlaylistMusicID"=${id}`);
>>>>>>> 5caf6e9c609e47cd9c76fde78c9a3bb9bf1671d7
    }
}

module.exports = PlaylistMusicsRepository;