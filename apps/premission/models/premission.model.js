class Premission {
    PremissionID;
    RoleID;
    MenuID;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(PremissionID, RoleID, MenuID, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.PremissionID = PremissionID;
        this.RoleID = RoleID;
        this.MenuID = MenuID;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Premission;