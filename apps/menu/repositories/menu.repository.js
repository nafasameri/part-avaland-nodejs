const Menu = require("../models/menu.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class MenuRepository {
    async fetchAll() {
        return db.selcet('Menu', '*');
    }

    async fetchById(id) {
        return db.selcet('Menu', '*', `"MenuID"=${id}`);
    }

    async add(menu, userID) {
        const menuModel = new Menu(
            0,
            menu.MenuName,
            menu.MenuDesc,
            menu.MenuIcon,
            menu.MenuLink,
            menu.MenuOrder,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const menuRow = db.insert('Menu', '"MenuName", "MenuDesc", "MenuIcon", "MenuLink", "MenuOrder", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${menuModel.MenuName}', '${menuModel.MenuDesc}', '${menuModel.MenuIcon}', '${menuModel.MenuLink}', '${menuModel.MenuOrder}', ${menuModel.Creator}, '${menuModel.CreateTime}', ${menuModel.Modifier}, '${menuModel.ModifiTime}', ${menuModel.IsDelete}`);
        return menuRow;
    }

    async update(menu, userID) {
        menu.Modifier = userID;
        menu.ModifiTime = datetime();

        return db.update('Menu', `"MenuName"='${menu.MenuName}', "MenuDesc"='${menu.MenuDesc}', "MenuLink"='${menu.MenuLink}', "MenuIcon"='${menu.MenuIcon}', "MenuOrder"='${menu.MenuOrder}', "Modifier"=${menu.Modifier}, "ModifiTime"='${menu.ModifiTime}'`, 
            `"MenuID"=${menu.MenuID}`);
    }

    async delete(id, userID) {
        return db.update('Menu', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"MenuID"=${id}`);
    }
}

module.exports = MenuRepository;