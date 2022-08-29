class Favourite {
    FavouriteID;
    UserID;
    MusicID;
    LikedTime;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(FavouriteID, UserID, MusicID, LikedTime, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.FavouriteID = FavouriteID;
        this.UserID = UserID;
        this.MusicID = MusicID;
        this.LikedTime = LikedTime;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Favourite;