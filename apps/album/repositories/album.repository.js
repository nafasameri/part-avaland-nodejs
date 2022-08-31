const Album = require("../models/album.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class AlbumRepository {
    async fetchAll() {
        return db.selcet('Album', '*');
    }

    async fetchById(id) {
        return db.selcet('Album', '*', `"AlbumID"=${id}`);
    }

    async add(album, userID) {
        let albumModel = new Album(
            0,
            album.AlbumName,
            album.AlbumImg,
            album.AlbumReleaseTime,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const albumRow = db.insert('Album', '"AlbumName", "AlbumImg", "AlbumReleaseTime", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${albumModel.AlbumName}', '${albumModel.AlbumImg}', '${albumModel.AlbumReleaseTime}', ${albumModel.Creator}, '${albumModel.CreateTime}', ${albumModel.Modifier}, '${albumModel.ModifiTime}', ${albumModel.IsDelete}`);
        return albumRow;
    }

    async update(album, userID) {
        console.log(album);
        
        album.Modifier = userID;
        album.ModifiTime = datetime();

        return db.update('Album', `"AlbumName"='${album.AlbumName}', "AlbumImg"='${album.AlbumImg}', "AlbumReleaseTime"='${album.AlbumReleaseTime}', "Modifier"=${album.Modifier}, "ModifiTime"='${album.ModifiTime}'`, `"AlbumID"=${album.AlbumID}`);
    }

    async delete(id, userID) {
        return db.update('Album', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"AlbumID"=${id}`);
    }
}

module.exports = AlbumRepository;