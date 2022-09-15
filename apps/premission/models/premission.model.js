class History {
    HistoryID;
    RoleID;
    MenuID;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(HistoryID, RoleID, MenuID, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.HistoryID = HistoryID;
        this.RoleID = RoleID;
        this.MenuID = MenuID;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = History;