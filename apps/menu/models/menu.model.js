class Menu {
    MenuID;
    MenuName;
    MenuDesc;
    MenuIcon;
    MenuLink;
    MenuOrder;
    IsMenu;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(MenuID, MenuName, MenuDesc, MenuIcon, MenuLink, MenuOrder, IsMenu, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.MenuID = MenuID;
        this.MenuName = MenuName;
        this.MenuDesc = MenuDesc;
        this.MenuIcon = MenuIcon;
        this.MenuLink = MenuLink;
        this.MenuOrder = MenuOrder;
        this.IsMenu = IsMenu;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Menu;