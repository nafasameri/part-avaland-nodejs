class Favourite {
    #ID;
    #MusicID;
    #UserID;
    #LikedTime;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(favourite) {
        if (favourite) {
            this.#ID = favourite.FavouriteID;
            this.#UserID = favourite.UserID;
            this.#MusicID = favourite.MusicID;
            this.#LikedTime = favourite.LikedTime;
            this.#Creator = favourite.Creator;
            this.#CreateTime = favourite.CreateTime;
            this.#Modifier = favourite.Modifier;
            this.#ModifiTime = favourite.ModifiTime;
            this.#IsDelete = favourite.IsDelete;
        }
    }

    get() {
        return {
            "favourite-id": this.#ID,
            "user-id": this.#UserID,
            "music-id": this.#MusicID,
            "liked-time": this.#LikedTime,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = Favourite;