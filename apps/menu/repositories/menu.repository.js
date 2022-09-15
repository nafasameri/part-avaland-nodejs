const Menu = require("../models/menu.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class MenuRepository {
    async fetchAll() {
        const record = await db.selcet('Menu', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('Menu', '*', `"MenuID"=${id}`);
        return record.rows[0];
    }

    async add(menu, userID) {
        const menuModel = new Menu(
            0,
            menu.MenuName ?? '',
            menu.MenuDesc ?? '',
            menu.MenuIcon ?? '',
            menu.MenuLink ?? '',
            menu.MenuOrder ?? 0,
            menu.IsMenu ?? 0,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const record = await db.insert('Menu', '"MenuName", "MenuDesc", "MenuIcon", "MenuLink", "MenuOrder", "IsMenu", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${menuModel.MenuName}', '${menuModel.MenuDesc}', '${menuModel.MenuIcon}', '${menuModel.MenuLink}', ${menuModel.MenuOrder}, ${menuModel.IsMenu}, ${menuModel.Creator}, '${menuModel.CreateTime}', ${menuModel.Modifier}, '${menuModel.ModifiTime}', ${menuModel.IsDelete}`);
        return record.rows[0];
    }

    async update(menu, userID) {
        menu.Modifier = userID;
        menu.ModifiTime = datetime();

        const record = await db.update('Menu', `"MenuName"='${menu.MenuName}', "MenuDesc"='${menu.MenuDesc}', "MenuLink"='${menu.MenuLink}', "MenuIcon"='${menu.MenuIcon}', "MenuOrder"=${menu.MenuOrder}, "IsMenu"=${menu.IsMenu}, "Modifier"=${menu.Modifier}, "ModifiTime"='${menu.ModifiTime}'`,
            `"MenuID"=${menu.MenuID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('Menu', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"MenuID"=${id}`);
        return record.rows[0];
    }
}

module.exports = MenuRepository;