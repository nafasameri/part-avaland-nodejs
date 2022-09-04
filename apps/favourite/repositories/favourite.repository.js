const Favourite = require("../models/favourite.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class FavouriteRepository {
    async fetchAll() {
        const record = await db.selcet('Favourite', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('Favourite', '*', `"FavouriteID"=${id}`);
        return record.rows[0];
    }

    async fetchByUser(id) {
        const record = await db.selcet('Favourite', '*', `"UserID"=${id}`, 1);
        return record.rows[0];
    }

    async fetchByMusic(id) {
        const record = await db.selcet('Favourite', '*', `"MusicID"=${id}`);
        return record.rows[0];
    }

    async fetchByUserMusic(musicId, userId) {
        const record = await db.selcet('Favourite', '*', `"MusicID"=${musicId} AND "UserID"=${userId}`, 1);
        return record.rows[0];
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
        const record = await db.insert('Favourite', '"UserID", "MusicID", "LikedTime", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `${favouriteModel.UserID}, ${favouriteModel.MusicID}, '${favouriteModel.LikedTime}', ${favouriteModel.Creator}, '${favouriteModel.CreateTime}', ${favouriteModel.Modifier}, '${favouriteModel.ModifiTime}', ${favouriteModel.IsDelete}`);
        return record.rows[0];
    }

    async update(favourite, userID) {
        favourite.Modifier = userID;
        favourite.ModifiTime = datetime();

        const record = await db.update('Favourite', `"UserID"='${favourite.UserID}', "MusicID"='${favourite.MusicID}', "LikedTime"='${favourite.LikedTime}', 
            "Modifier"=${favourite.Modifier}, "ModifiTime"='${favourite.ModifiTime}', "IsDelete" = ${favourite.IsDelete}`, `"FavouriteID"=${favourite.FavouriteID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('Favourite', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"FavouriteID"=${id}`);
        return record.rows[0];
    }
}

module.exports = FavouriteRepository;