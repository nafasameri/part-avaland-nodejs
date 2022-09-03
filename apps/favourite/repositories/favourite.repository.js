const Favourite = require("../models/favourite.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class FavouriteRepository {
    async fetchAll() {
        return db.selcet('Favourite', '*');
    }

    async fetchById(id) {
        return db.selcet('Favourite', '*', `"FavouriteID"=${id}`);
    }

    async fetchByUser(id) {
        return db.selcet('Favourite', '*', `"UserID"=${id}`, 1);
    }

    async fetchByMusic(id) {
        return db.selcet('Favourite', '*', `"MusicID"=${id}`);
    }

    async fetchByUserMusic(musicId, userId) {
        return db.selcet('Favourite', '*', `"MusicID"=${musicId} AND "UserID"=${userId}`, 1);
    }

    async add(favourite, userID) {
        let favouriteModel = new Favourite(
            0,
            favourite.UserID ?? null,
            favourite.MusicID ?? null,
            datetime(),
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const favouriteRow = db.insert('Favourite', '"UserID", "MusicID", "LikedTime", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `${favouriteModel.UserID}, ${favouriteModel.MusicID}, '${favouriteModel.LikedTime}', ${favouriteModel.Creator}, '${favouriteModel.CreateTime}', ${favouriteModel.Modifier}, '${favouriteModel.ModifiTime}', ${favouriteModel.IsDelete}`);
        return favouriteRow;
    }

    async update(favourite, userID) {
        favourite.Modifier = userID;
        favourite.ModifiTime = datetime();

        return db.update('Favourite', `"UserID"='${favourite.UserID}', "MusicID"='${favourite.MusicID}', "LikedTime"='${favourite.LikedTime}', 
            "Modifier"=${favourite.Modifier}, "ModifiTime"='${favourite.ModifiTime}', "IsDelete" = ${favourite.IsDelete}`, `"FavouriteID"=${favourite.FavouriteID}`);
    }

    async delete(id, userID) {
        return db.update('Favourite', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"FavouriteID"=${id}`);
    }
}

module.exports = FavouriteRepository;