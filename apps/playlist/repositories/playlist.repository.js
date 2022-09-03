const Playlist = require("../models/playlist.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PlaylistRepository {
    async fetchAll() {
        return db.selcet('Playlist', '*');
    }

    async fetchById(id) {
        return db.selcet('Playlist', '*', `"PlaylistID"=${id}`);
    }

    async add(playlist, userID) {
        const playlistModel = new Playlist(
            0,
            playlist.PlaylistName ?? '',
            playlist.PlaylistDesc ?? '',
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const playlistRow = db.insert('Playlist', '"PlaylistName", "PlaylistDesc", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${playlistModel.PlaylistName}', '${playlistModel.PlaylistDesc}', ${playlistModel.Creator}, '${playlistModel.CreateTime}', ${playlistModel.Modifier}, '${playlistModel.ModifiTime}', ${playlistModel.IsDelete}`);
        return playlistRow;
    }

    async update(playlist, userID) {
        playlist.Modifier = userID;
        playlist.ModifiTime = datetime();

        return db.update('Playlist', `"PlaylistName"='${playlist.PlaylistName}', "PlaylistDesc"='${playlist.PlaylistDesc}', "Modifier"=${playlist.Modifier}, "ModifiTime"='${playlist.ModifiTime}'`,
            `"PlaylistID"=${playlist.PlaylistID}`);
    }

    async delete(id, userID) {
        return db.update('Playlist', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PlaylistID"=${id}`);
    }
}

module.exports = PlaylistRepository;