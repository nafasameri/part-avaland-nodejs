class History {
    HistoryID;
    UserID;
    MusicID;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(HistoryID, UserID, MusicID, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.HistoryID = HistoryID;
        this.UserID = UserID;
        this.MusicID = MusicID;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = History;