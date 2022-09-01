class PlaylistMusic {
    PlaylistMusicID;
    PlaylistID;
    MusicID;

    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(PlaylistMusicID, PlaylistID, MusicID, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.PlaylistMusicID = PlaylistMusicID;
        this.PlaylistID = PlaylistID;
        this.MusicID = MusicID;

        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = PlaylistMusic;