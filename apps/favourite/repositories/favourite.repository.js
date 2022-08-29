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

    async add(favourite) {
        let favouriteModel = new Favourite(
            0,
            favourite.UserID,
            favourite.MusicID,
            datetime(),
            1,
            datetime(),
            1,
            datetime(),
            0
        );
        const favouriteRow = db.insert('Favourite', '"UserID", "MusicID", "LikedTime", Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${favouriteModel.UserID}', '${favouriteModel.MusicID}', '${favouriteModel.LikedTime}', ${favouriteModel.Creator}, '${favouriteModel.CreateTime}', ${favouriteModel.Modifier}, '${favouriteModel.ModifiTime}', ${favouriteModel.IsDelete}`);
        return favouriteRow;
    }

    async update(favourite) {
        favourite.Modifier = 1;
        favourite.ModifiTime = datetime();

        return db.update('Favourite', `"UserID"='${favourite.UserID}', "MusicID"='${favourite.MusicID}', "LikedTime"='${favourite.LikedTime}', "Modifier"=${favourite.Modifier}, "ModifiTime"='${favourite.ModifiTime}'`, `"FavouriteID"=${favourite.FavouriteID}`);
    }

    async delete(id) {
        return db.update('Favourite', `"IsDelete" = 1`, `"FavouriteID"=${id}`);
    }
}

module.exports = FavouriteRepository;