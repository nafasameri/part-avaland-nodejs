class PlaylistMusic {
    #ID;
    #PlaylistID;
    #MusicID;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(playlistMusic) {
        this.#ID = playlistMusic.PlaylistMusicID;
        this.#PlaylistID = playlistMusic.PlaylistID;
        this.#MusicID = playlistMusic.MusicID;
        this.#Creator = playlistMusic.Creator;
        this.#CreateTime = playlistMusic.CreateTime;
        this.#Modifier = playlistMusic.Modifier;
        this.#ModifiTime = playlistMusic.ModifiTime;
        this.#IsDelete = playlistMusic.IsDelete;
    }

    get() {
        return {
            "playlist-music-id": this.#ID,
            "playlist-id": this.#PlaylistID,
            "music-id": this.#MusicID,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = PlaylistMusic;