const Playlist = require("../models/playlist.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PlaylistRepository {
    async fetchAll() {
        const record = await db.selcet('Playlist', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('Playlist', '*', `"PlaylistID"=${id}`);
        return record.rows[0];
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
        const record = await db.insert('Playlist', '"PlaylistName", "PlaylistDesc", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${playlistModel.PlaylistName}', '${playlistModel.PlaylistDesc}', ${playlistModel.Creator}, '${playlistModel.CreateTime}', ${playlistModel.Modifier}, '${playlistModel.ModifiTime}', ${playlistModel.IsDelete}`);
        return record.rows[0];
    }

    async update(playlist, userID) {
        playlist.Modifier = userID;
        playlist.ModifiTime = datetime();

        const record = await db.update('Playlist', `"PlaylistName"='${playlist.PlaylistName}', "PlaylistDesc"='${playlist.PlaylistDesc}', "Modifier"=${playlist.Modifier}, "ModifiTime"='${playlist.ModifiTime}'`,
            `"PlaylistID"=${playlist.PlaylistID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('Playlist', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PlaylistID"=${id}`);
        return record.rows[0];
    }
}

module.exports = PlaylistRepository;