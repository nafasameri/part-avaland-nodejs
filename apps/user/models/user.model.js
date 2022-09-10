class User {
    UserID;
    UserName;
    UserPhone;
    UserEmail;
    Password;
    RoleID;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(UserID, UserName, UserPhone, UserEmail, Password, RoleID, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.UserID = UserID;
        this.UserName = UserName;
        this.UserPhone = UserPhone;
        this.UserEmail = UserEmail;
        this.Password = Password;
        this.RoleID = RoleID;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = User;