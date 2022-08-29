const Music = require("../models/music.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class MusicRepository {
    async fetchAll() {
        return db.selcet('Music', '*');
    }

    async fetchById(id) {
        return db.selcet('Music', '*', `"MusicID"=${id}`);
    }

    async add(music) {
        let musicModel = new Music(
            0,
            music.ArtistID ?? null,
            music.AlbumID ?? null,
            music.CategoryID ?? null,
            music.MusicName ?? null,
            music.MusicTitle ?? null,
            music.MusicPoster ?? null,
            music.MusicURL ?? null,
            music.MusicDuration ?? null,
            music.MusicLyrics ?? null,
            music.MusicTags ?? null,
            music.MusicArtists ?? null,
            music.MusicReleaseTime ?? null,
            1,
            datetime(),
            1,
            datetime(),
            0
        );

        const musicRow = db.insert('Music', `"AlbumID", "ArtistID", "CategoryID", "MusicName", "MusicTitle", "MusicPoster", "MusicURL", 
            "MusicDuration", "MusicLyrics", "MusicTags", "MusicArtists", "MusicReleaseTime", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"`,
            `${musicModel.AlbumID}, ${musicModel.ArtistID}, ${musicModel.CategoryID},'${musicModel.MusicName}','${musicModel.MusicTitle}','${musicModel.MusicPoster}',
            '${musicModel.MusicURL}','${musicModel.MusicDuration}','${musicModel.MusicLyrics}','${musicModel.MusicTags}','${musicModel.MusicArtists}',
            '${musicModel.MusicReleaseTime}',${musicModel.Creator}, '${musicModel.CreateTime}', ${musicModel.Modifier}, '${musicModel.ModifiTime}', ${musicModel.IsDelete}`);
        return musicRow;
    }

    async update(music) {
        music.Modifier = 1;
        music.ModifiTime = datetime();

        return db.update('Music', `"AlbumID"=${music.AlbumID}, "ArtistID"=${music.ArtistID},"CategoryID"=${music.CategoryID}, "MusicName"='${music.MusicName}',
            "MusicTitle"='${music.MusicTitle}', "MusicPoster"='${music.MusicPoster}',"MusicURL"='${music.MusicURL}', "MusicDuration"='${music.MusicDuration}',
            "MusicLyrics"='${music.MusicLyrics}', "MusicTags"='${music.MusicTags}',"MusicArtists"='${music.MusicArtists}', "MusicReleaseTime"='${music.MusicReleaseTime}',
            "Modifier"=${music.Modifier}, "ModifiTime"='${music.ModifiTime}'`, `"MusicID"=${music.MusicID}`);
    }

    async delete(id) {
        return db.update('Music', `"IsDelete" = 1`, `"MusicID"=${id}`);
    }
}

module.exports = MusicRepository;