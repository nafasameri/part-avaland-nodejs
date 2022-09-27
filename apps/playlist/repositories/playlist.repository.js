const Playlist = require("../models/playlist.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PlaylistRepository {
    async fetchAll() {
        const record = await db.selcet('Playlist', '*');
        const playlists = [];
        record.rows.forEach((row) => {
            playlists.push(new Playlist(row).get());
        });
        return playlists;
    }

    async fetchById(id) {
        const record = await db.selcet('Playlist', '*', `"PlaylistID"=${id}`);
        return record.rows[0] ? new Playlist(record.rows[0]).get() : undefined;
    }

    async add(playlist, userID) {
        const playlistModel = {
            PlaylistName: playlist.name ?? '',
            PlaylistImg: playlist.img ?? '',
            Creator: userID ?? null,
            CreateTime: datetime(),
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('Playlist', '"PlaylistName", "PlaylistImg", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${playlistModel.PlaylistName}', '${playlistModel.PlaylistImg}', ${playlistModel.Creator}, '${playlistModel.CreateTime}', ${playlistModel.Modifier}, '${playlistModel.ModifiTime}', ${playlistModel.IsDelete}`);
        return record.rows[0] ? new Playlist(record.rows[0]).get() : undefined;
    }

    async update(playlist, userID) {
        const playlistModel = {
            PlaylistID: playlist["playlist-id"] ?? null,
            PlaylistName: playlist.name ?? '',
            PlaylistImg: playlist.img ?? '',
            Modifier: userID ?? null,
            ModifiTime: datetime(),
        };

        const record = await db.update('Playlist', `"PlaylistName"='${playlistModel.PlaylistName}', "PlaylistImg"='${playlistModel.PlaylistImg}', "Modifier"=${playlistModel.Modifier}, "ModifiTime"='${playlistModel.ModifiTime}'`,
            `"PlaylistID"=${playlistModel.PlaylistID}`);
        return record.rows[0] ? new Playlist(record.rows[0]).get() : undefined;
    }

    async delete(id, userID) {
        const record = await db.update('Playlist', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PlaylistID"=${id}`);
        return record.rows[0] ? new Playlist(record.rows[0]).get() : undefined;
    }
}

module.exports = PlaylistRepository;