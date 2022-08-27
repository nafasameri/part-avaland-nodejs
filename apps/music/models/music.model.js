class Music {
    MusicID;
    AlbumID;
    ArtistID;
    CategoryID;
    MusicName;
    MusicTitle;
    MusicPoster;
    MusicURL;
    MusicDuration;
    MusicLyrics;
    MusicTags;
    MusicArtists;
    MusicReleaseTime;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(MusicID, AlbumID, ArtistID, CategoryID, MusicName, MusicTitle, MusicPoster, MusicURL, MusicDuration, MusicLyrics, MusicTags, MusicArtists, MusicReleaseTime, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.MusicID = MusicID;
        this.AlbumID = AlbumID;
        this.ArtistID = ArtistID;
        this.CategoryID = CategoryID;
        this.MusicName = MusicName;
        this.MusicTitle = MusicTitle;
        this.MusicPoster = MusicPoster;
        this.MusicURL = MusicURL;
        this.MusicDuration = MusicDuration;
        this.MusicLyrics = MusicLyrics;
        this.MusicTags = MusicTags;
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