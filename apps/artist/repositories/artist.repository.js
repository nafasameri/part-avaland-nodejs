const Artist = require("../models/artist.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class ArtistRepository {
    async fetchAll() {
        return db.selcet('Artist', '*');
    }

    async fetchById(id) {
        return db.selcet('Artist', '*', `"ArtistID"=${id}`);
    }

    async add(artist, userID) {
        let artistModel = new Artist(
            0,
            artist.ArtistName,
            artist.ArtistFamily,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const artistRow = db.insert('Artist', '"ArtistName", "ArtistFamily", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${artistModel.ArtistName}', '${artistModel.ArtistFamily}', ${artistModel.Creator}, '${artistModel.CreateTime}', ${artistModel.Modifier}, '${artistModel.ModifiTime}', ${artistModel.IsDelete}`);
        return artistRow;
    }

    async update(artist, userID) {
        artist.Modifier = userID;
        artist.ModifiTime = datetime();

        return db.update('Artist', `"ArtistName"='${artist.ArtistName}', "ArtistFamily"='${artist.ArtistFamily}', "Modifier"=${artist.Modifier}, "ModifiTime"='${artist.ModifiTime}'`, `"ArtistID"=${artist.ArtistID}`);
    }

    async delete(id, userID) {
        return db.update('Artist', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"ArtistID"=${id}`);
    }
}

module.exports = ArtistRepository;