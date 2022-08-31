class Album {
    AlbumID;
    AlbumName;
    AlbumImg;
    AlbumReleaseTime;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(AlbumID, AlbumName, AlbumImg, AlbumReleaseTime, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.AlbumID = AlbumID;
        this.AlbumName = AlbumName;
        this.AlbumImg = AlbumImg;
        this.AlbumReleaseTime= AlbumReleaseTime;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Album;