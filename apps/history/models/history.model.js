class History {
    #ID;
    #UserID;
    #MusicID;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(history) {
        this.#ID = history.HistoryID;
        this.#UserID = history.UserID;
        this.#MusicID = history.MusicID;
        this.#Creator = history.Creator;
        this.#CreateTime = history.CreateTime;
        this.#Modifier = history.Modifier;
        this.#ModifiTime = history.ModifiTime;
        this.#IsDelete = history.IsDelete;
    }

    get() {
        return {
            "history-id": this.#ID,
            "user-id": this.#UserID,
            "music-id": this.#MusicID,
            "creator": this.#Creator,
            "creator-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = History;