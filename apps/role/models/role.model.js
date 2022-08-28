class Role {
    RoleID;
    RoleName;
    RoleDesc;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(RoleID, RoleName, RoleDesc, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.RoleID = RoleID;
        this.RoleName = RoleName;
        this.RoleDesc = RoleDesc;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Role;