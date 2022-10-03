class Playlist {
    #ID;
    #Name;
    #Img;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(playlist) {
        this.#ID = playlist.PlaylistID;
        this.#Name = playlist.PlaylistName;
        this.#Img = playlist.PlaylistImg;
        this.#Creator = playlist.Creator;
        this.#CreateTime = playlist.CreateTime;
        this.#Modifier = playlist.Modifier;
        this.#ModifiTime = playlist.ModifiTime;
        this.#IsDelete = playlist.IsDelete;
    }

    get() {
        return {
            "playlist-id": this.#ID,
            "name": this.#Name,
            "img": this.#Img,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = Playlist;