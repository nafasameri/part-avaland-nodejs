class Artist {
    ArtistID;
    ArtistName;
    ArtistFamily;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(ArtistID, ArtistName, ArtistFamily, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.ArtistID = ArtistID;
        this.ArtistName = ArtistName;
        this.ArtistFamily = ArtistFamily;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Artist;