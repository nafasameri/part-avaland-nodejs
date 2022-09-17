const PlaylistMusics = require("../models/playlist.musics.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PlaylistMusicsRepository {
    async fetchAll() {
        const record = await db.selcet('PlaylistMusics', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('PlaylistMusics', '*', `"PlaylistMusicID"=${id}`);
        return record.rows[0];
    }

    async fetchByPlaylistId(id) {
        const record = await db.selcet('PlaylistMusics', '*', `"PlaylistID"=${id}`);
        return record.rows;
    }

    async add(playlistMusics, userID) {
        const playlistMusicModel = new PlaylistMusics(
            0,
            playlistMusics.PlaylistID ?? null,
            playlistMusics.MusicID ?? null,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const record = await db.insert('PlaylistMusics', '"PlaylistID", "MusicID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${playlistMusicModel.PlaylistID}', '${playlistMusicModel.MusicID}', ${playlistMusicModel.Creator}, '${playlistMusicModel.CreateTime}', ${playlistMusicModel.Modifier}, '${playlistMusicModel.ModifiTime}', ${playlistMusicModel.IsDelete}`);
        return record.rows[0];
    }



    async delete(id, userID) {
        const record = await db.update('PlaylistMusics', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PlaylistMusicID"=${id}`);
        return record.rows[0];
    }
}

module.exports = PlaylistMusicsRepository;