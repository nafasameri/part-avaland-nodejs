const Favourite = require("../models/favourite.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class FavouriteRepository {
    async fetchAll() {
        const record = await db.selcet('Favourite', '*');
        const favourites = [];
        record.rows.forEach((row) => {
            favourites.push(new Favourite(row).get());
        });
        return favourites;
    }

    async fetchById(id) {
        const record = await db.selcet('Favourite', '*', `"FavouriteID"=${id}`);
        return new Favourite(record.rows[0]).get();
    }

    async fetchByUser(id) {
        const record = await db.selcet('Favourite', '*', `"UserID"=${id}`, 1);
        const favourites = [];
        record.rows.forEach((row) => {
            favourites.push(new Favourite(row).get());
        });
        return favourites;
    }

    async fetchByMusic(id) {
        const record = await db.selcet('Favourite', '*', `"MusicID"=${id}`);
        const favourites = [];
        record.rows.forEach((row) => {
            favourites.push(new Favourite(row).get());
        });
        return favourites;
    }

    async fetchByUserMusic(musicId, userId) {
        const record = await db.selcet('Favourite', '*', `"MusicID"=${musicId} AND "UserID"=${userId}`, 1);
        return record.rows[0] ? new Favourite(record.rows[0]).get() : undefined;
    }

    async add(favourite, userID) {
        const favouriteModel = {
            UserID: favourite["user-id"] ?? null,
            MusicID: favourite["music-id"] ?? null,
            LikedTime: datetime(),
            Creator: userID,
            CreateTime: datetime(),
            Modifier: userID,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('Favourite', '"UserID", "MusicID", "LikedTime", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `${favouriteModel.UserID}, ${favouriteModel.MusicID}, '${favouriteModel.LikedTime}', ${favouriteModel.Creator}, '${favouriteModel.CreateTime}', ${favouriteModel.Modifier}, '${favouriteModel.ModifiTime}', ${favouriteModel.IsDelete}`);
        return new Favourite(record.rows[0]).get();
    }

    async update(favourite, userID) {
        const favouriteModel = {
            id: favourite["favourite-id"] ?? null,
            UserID: favourite["user-id"] ?? null,
            MusicID: favourite["music-id"] ?? null,
            LikedTime: favourite["liked-time"] ?? '',
            Modifier: userID,
            ModifiTime: datetime(),
            IsDelete: favourite["delete?"] ?? 0
        };

        const record = await db.update('Favourite', `"UserID"='${favouriteModel.UserID}', "MusicID"='${favouriteModel.MusicID}', "LikedTime"='${favouriteModel.LikedTime}', 
            "Modifier"=${favouriteModel.Modifier}, "ModifiTime"='${favouriteModel.ModifiTime}', "IsDelete" = ${favouriteModel.IsDelete}`, `"FavouriteID"=${favouriteModel.id}`);
        return new Favourite(record.rows[0]).get();
    }

    async delete(id, userID) {
        const record = await db.update('Favourite', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"FavouriteID"=${id}`);
        return new Favourite(record.rows[0]).get();
    }
}

module.exports = FavouriteRepository;