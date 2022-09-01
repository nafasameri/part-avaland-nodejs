class Playlist {
    PlaylistID;
    PlaylistName;
    PlaylistDesc;

    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(PlaylistID, PlaylistName, PlaylistDesc, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.PlaylistName = PlaylistName;
        this.PlaylistID = PlaylistID;
        this.PlaylistDesc = PlaylistDesc;

        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;      
    }
}

module.exports = Playlist;