class Music {
    #ID;
    #Name;
    #Title;
    #Poster;
    #URL;
    #Duration;
    #Lyrics;
    #Tags;
    #Artists;
    #CategoryID;
    #AlbumName;
    #ReleaseTime;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(music) {
        this.#ID = music.MusicID;
        this.#AlbumName = music.AlbumName;
        this.#CategoryID = music.CategoryID;
        this.#Name = music.MusicName;
        this.#Title = music.MusicTitle;
        this.#Poster = music.MusicPoster;
        this.#URL = music.MusicURL;
        this.#Duration = music.MusicDuration;
        this.#Lyrics = music.MusicLyrics;
        this.#Tags = music.MusicTags;
        this.#Artists = music.MusicArtists;
        this.#ReleaseTime = music.MusicReleaseTime;
        this.#Creator = music.Creator;
        this.#CreateTime = music.CreateTime;
        this.#Modifier = music.Modifier;
        this.#ModifiTime = music.ModifiTime;
        this.#IsDelete = music.IsDelete;
    }

    get() {
        return {
            "music-id": this.#ID,
            "album": this.#AlbumName,
            "name": this.#Name,
            "title": this.#Title,
            "poster": this.#Poster,
            "url": this.#URL,
            "duration": this.#Duration,
            "lyrics": this.#Lyrics,
            "tags": this.#Tags,
            "artists": this.#Artists,
            "category-id": this.#CategoryID,
            "release-time": this.#ReleaseTime,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = Music;