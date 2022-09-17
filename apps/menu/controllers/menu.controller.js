const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const MenuRepository = require("../repositories/menu.repository");
const menuRepository = new MenuRepository();

const statusCode = require('http-status-codes');
const Menu = require('../models/menu.model');

class MenuController {
    #print = (menuList) => {
        const menuData = []
        menuList.forEach(menu => {
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
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
            } else {
                const menus = await menuRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(menus)));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createMenu = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.name || !body.link)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const newMenu = new Menu(0, body.name, body.desc, body.icon, body.link, body.order, body["is-menu"]);
            const menu = await menuRepository.add(newMenu, req.UserID);

            if (!menu) {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateMenu = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const menuOld = await menuRepository.fetchById(id);
            menuOld.MenuName = body.name ?? menuOld.MenuName;
            menuOld.MenuDesc = body.desc ?? menuOld.MenuDesc;
            menuOld.MenuIcon = body.icon ?? menuOld.MenuIcon;
            menuOld.MenuLink = body.link ?? menuOld.MenuLink;
            menuOld.MenuOrder = body.order ?? menuOld.MenuOrder;
            menuOld.IsMenu = body["is-menu"] ?? menuOld.IsMenu;

            const menu = await menuRepository.update(menuOld, req.UserID);
            if (!menu)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteMenu = async (req, res) => {
        try {
            const { id } = req.querystring;
            const menu = await menuRepository.delete(id, req.UserID);
            if (!menu)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([menu])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new MenuController();