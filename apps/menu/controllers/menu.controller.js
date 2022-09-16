const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const MenuRepository = require("../repositories/menu.repository");
const menuRepository = new MenuRepository();


class MenuController {
    #print = (menuArr) => {
        const menuData = []
        menuArr.forEach(menu => {
            const menuJson = {
                "menu-id": menu.MenuID,
                "name": menu.MenuName,
                "desc": menu.MenuDesc,
                "icon": menu.MenuIcon,
                "link": menu.MenuLink,
                "order": menu.MenuOrder,
                "is-menu": menu.IsMenu,
                "creator": menu.Creator,
                "create-time": menu.CreateTime,
                "midifier": menu.Modifier,
                "modifi-time": menu.ModifiTime,
                "delete-flag": menu.IsDelete
            }
            menuData.push(menuJson)
        });
        return (menuData == 1) ? menuData[0] : menuData;
    }

    getMenus = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const menu = await menuRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
            } else {
                const menus = await menuRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print(menus)));
            }
        } catch (error) {
            logger.error('getAllMenus: ' + error);
            throw error;
        }
    };

    createMenu = async (req, res) => {
        try {
            const { body } = req;
            const menu = await menuRepository.add(body, req.UserID);

            if (!menu) {
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
            }
        } catch (error) {
            logger.error('createMenu: ' + error);
            throw error;
        }
    };

    updateMenu = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const menuOld = await menuRepository.fetchById(id);
            menuOld.MenuName = body.MenuName ?? menuOld.MenuName;
            menuOld.MenuDesc = body.MenuDesc ?? menuOld.MenuDesc;
            menuOld.MenuIcon = body.MenuIcon ?? menuOld.MenuIcon;
            menuOld.MenuLink = body.MenuLink ?? menuOld.MenuLink;
            menuOld.MenuOrder = body.MenuOrder ?? menuOld.MenuOrder;
            menuOld.IsMenu = body.IsMenu ?? menuOld.IsMenu;

            const menu = await menuRepository.update(menuOld, req.UserID);
            if (!menu)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
        } catch (error) {
            logger.error('updateMenu: ' + error);
            throw error;
        }
    };

    deleteMenu = async (req, res) => {
        try {
            const { id } = req.querystring;
            const menu = await menuRepository.delete(id, req.UserID);
            if (!menu)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
        } catch (error) {
            logger.error('deleteMenu: ' + error);
            throw error;
        }
    };
}


module.exports = new MenuController();