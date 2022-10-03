const Music = require("../../music/models/music.model");
const PlaylistMusics = require("../models/playlist.musics.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PlaylistMusicsRepository {
    async fetchAll() {
        const record = await db.selcet('PlaylistMusics', '*');
        const playlistmusics = [];
        record.rows.forEach((row) => {
            playlistmusics.push(new PlaylistMusics(row).get());
        });
        return playlistmusics;
    }

    async fetchById(id) {
        const record = await db.selcet('PlaylistMusics', '*', `"PlaylistMusicID"=${id}`);
        return record.rows[0] ? new PlaylistMusics(record.rows[0]).get() : undefined;
    }

    async fetchByPlaylistId(id) {
        const record = await db.join('PlaylistMusics', 'Music', 'MusicID', '*', `"PlaylistMusics"."PlaylistID"=${id}`);
        const musics = [];
        record.rows.forEach((row) => {
            musics.push(new Music(row).get());
        });
        return musics;
    }

    async add(playlistMusics, userID) {
        const playlistMusicModel = {
            PlaylistID: playlistMusics["playlist-id"] ?? null,
            MusicID: playlistMusics["music-id"] ?? null,
            Creator: userID ?? null,
            CreateTime: datetime(),
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('PlaylistMusics', '"PlaylistID", "MusicID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${playlistMusicModel.PlaylistID}', '${playlistMusicModel.MusicID}', ${playlistMusicModel.Creator}, '${playlistMusicModel.CreateTime}', ${playlistMusicModel.Modifier}, '${playlistMusicModel.ModifiTime}', ${playlistMusicModel.IsDelete}`);
        return record.rows[0] ? new PlaylistMusics(record.rows[0]).get() : undefined;
    }

    async delete(id, userID) {
        const record = await db.update('PlaylistMusics', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PlaylistMusicID"=${id}`);
        return record.rows[0] ? new PlaylistMusics(record.rows[0]).get() : undefined;
    }
}

module.exports = PlaylistMusicsRepository;