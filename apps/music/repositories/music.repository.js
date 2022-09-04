const Music = require("../models/music.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class MusicRepository {
    async fetchAll() {
        const record = await db.selcet('Music', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('Music', '*', `"MusicID"=${id}`);
        return record.rows[0];
    }

    async add(music, userID) {
        let musicModel = new Music(
            0,
            music.AlbumName ?? '',
            music.CategoryID ?? null,
            music.MusicName ?? '',
            music.MusicTitle ?? '',
            music.MusicPoster ?? '',
            music.MusicURL ?? '',
            music.MusicDuration ?? '',
            music.MusicLyrics ?? '',
            music.MusicTags ?? '',
            music.MusicArtists ?? '',
            music.MusicReleaseTime ?? '',
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );

        const record = await db.insert('Music', `"AlbumName", "CategoryID", "MusicName", "MusicTitle", "MusicPoster", "MusicURL", 
            "MusicDuration", "MusicLyrics", "MusicTags", "MusicArtists", "MusicReleaseTime", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"`,
            `${musicModel.AlbumName}, ${musicModel.CategoryID},'${musicModel.MusicName}','${musicModel.MusicTitle}','${musicModel.MusicPoster}',
            '${musicModel.MusicURL}','${musicModel.MusicDuration}','${musicModel.MusicLyrics}','${musicModel.MusicTags}','${musicModel.MusicArtists}',
            '${musicModel.MusicReleaseTime}',${musicModel.Creator}, '${musicModel.CreateTime}', ${musicModel.Modifier}, '${musicModel.ModifiTime}', ${musicModel.IsDelete}`);
        return record.rows[0];
    }

    async update(music, userID) {
        music.Modifier = userID;
        music.ModifiTime = datetime();

        const record = await db.update('Music', `"AlbumName"=${music.AlbumName}, "CategoryID"=${music.CategoryID}, "MusicName"='${music.MusicName}',
            "MusicTitle"='${music.MusicTitle}', "MusicPoster"='${music.MusicPoster}',"MusicURL"='${music.MusicURL}', "MusicDuration"='${music.MusicDuration}',
            "MusicLyrics"='${music.MusicLyrics}', "MusicTags"='${music.MusicTags}',"MusicArtists"='${music.MusicArtists}', "MusicReleaseTime"='${music.MusicReleaseTime}',
            "Modifier"=${music.Modifier}, "ModifiTime"='${music.ModifiTime}'`, `"MusicID"=${music.MusicID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('Music', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"MusicID"=${id}`);
        return record.rows[0];
    }
}

module.exports = MusicRepository;