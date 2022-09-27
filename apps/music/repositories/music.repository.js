const Music = require("../models/music.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class MusicRepository {
    async fetchAll() {
        const record = await db.selcet('Music', '*');
        const musics = [];
        record.rows.forEach((row) => {
            musics.push(new Music(row).get());
        });
        return musics;
    }

    async fetchById(id) {
        const record = await db.selcet('Music', '*', `"MusicID"=${id}`);
        return record.rows[0] ? new Music(record.rows[0]).get() : undefined;
    }

    async add(music, userID) {
        const musicModel = {
            AlbumName: music.album ?? '',
            CategoryID: music["category-id"] ?? null,
            MusicName: music.name ?? '',
            MusicTitle: music.title ?? '',
            MusicPoster: music.poster ?? '',
            MusicURL: music.url ?? '',
            MusicDuration: music.duration ?? '',
            MusicLyrics: music.lyrics ?? '',
            MusicTags: music.tags ?? '',
            MusicArtists: music.artists ?? '',
            MusicReleaseTime: music["release-time"] ?? '',
            Creator: userID ?? null,
            CreateTime: datetime(),
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };

        const record = await db.insert('Music', `"AlbumName", "CategoryID", "MusicName", "MusicTitle", "MusicPoster", "MusicURL", 
            "MusicDuration", "MusicLyrics", "MusicTags", "MusicArtists", "MusicReleaseTime", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"`,
            `'${musicModel.AlbumName}', ${musicModel.CategoryID},'${musicModel.MusicName}','${musicModel.MusicTitle}','${musicModel.MusicPoster}',
            '${musicModel.MusicURL}','${musicModel.MusicDuration}','${musicModel.MusicLyrics}','${musicModel.MusicTags}','${musicModel.MusicArtists}',
            '${musicModel.MusicReleaseTime}',${musicModel.Creator}, '${musicModel.CreateTime}', ${musicModel.Modifier}, '${musicModel.ModifiTime}', ${musicModel.IsDelete}`);
        return record.rows[0] ? new Music(record.rows[0]).get() : undefined;
    }

    async update(music, userID) {
        const musicModel = {
            MusicID: music["music-id"] ?? null,
            AlbumName: music.album ?? '',
            CategoryID: music["category-id"] ?? null,
            MusicName: music.name ?? '',
            MusicTitle: music.title ?? '',
            MusicPoster: music.poster ?? '',
            MusicURL: music.url ?? '',
            MusicDuration: music.duration ?? '',
            MusicLyrics: music.lyrics ?? '',
            MusicTags: music.tags ?? '',
            MusicArtists: music.artists ?? '',
            MusicReleaseTime: music["release-time"] ?? '',
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };

        const record = await db.update('Music', `"AlbumName"='${musicModel.AlbumName}', "CategoryID"=${musicModel.CategoryID}, "MusicName"='${musicModel.MusicName}',
            "MusicTitle"='${musicModel.MusicTitle}', "MusicPoster"='${musicModel.MusicPoster}',"MusicURL"='${musicModel.MusicURL}', "MusicDuration"='${musicModel.MusicDuration}',
            "MusicLyrics"='${musicModel.MusicLyrics}', "MusicTags"='${musicModel.MusicTags}',"MusicArtists"='${musicModel.MusicArtists}', "MusicReleaseTime"='${musicModel.MusicReleaseTime}',
            "Modifier"=${musicModel.Modifier}, "ModifiTime"='${musicModel.ModifiTime}'`, `"MusicID"=${musicModel.MusicID}`);
        return record.rows[0] ? new Music(record.rows[0]).get() : undefined;
    }

    async delete(id, userID) {
        const record = await db.update('Music', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"MusicID"=${id}`);
        return record.rows[0] ? new Music(record.rows[0]).get() : undefined;
    }
}

module.exports = MusicRepository;