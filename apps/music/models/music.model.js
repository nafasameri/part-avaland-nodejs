class Music {
    MusicID;
    AlbumName;
    CategoryID;
    MusicName;
    MusicTitle;
    MusicPoster;
    MusicURL;
    MusicDuration;
    MusicLyrics;
    MusicTags;
    MusicMimeType;
    MusicArtists;
    MusicReleaseTime;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(MusicID, AlbumName, CategoryID, MusicName, MusicTitle, MusicPoster, MusicURL, MusicDuration, MusicLyrics, MusicTags, MusicArtists, MusicReleaseTime, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.MusicID = MusicID;
        this.AlbumName = AlbumName;
        this.CategoryID = CategoryID;
        this.MusicName = MusicName;
        this.MusicTitle = MusicTitle;
        this.MusicPoster = MusicPoster;
        this.MusicURL = MusicURL;
        this.MusicDuration = MusicDuration;
        this.MusicLyrics = MusicLyrics;
        this.MusicTags = MusicTags;
        // this.MusicMimeType = MusicMimeType;
        this.MusicArtists = MusicArtists;
        this.MusicReleaseTime = MusicReleaseTime;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Music;