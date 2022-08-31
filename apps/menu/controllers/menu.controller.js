const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const MenuRepository = require("../repositories/menu.repository");
const menuRepository = new MenuRepository();


class MenuController {
    getMenus = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const menu = await menuRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(menu.rows, null, 2));
            } else {
                const menus = await menuRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(menus.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllMenus: ', error);
            throw error;
        }
    };

    createMenu = async (req, res) => {
        try {
            const { body } = req;
            const menu = await menuRepository.add(body, req.UserID);

            if (!menu) {
                sendResponse(res, 404, { "Content-Type": "application/json" }, JSON.stringify({ message: 'Could Not Create' }, null, 2));
            } else {
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(menu.rows));
            }
        } catch (error) {
            logger.error('createMenu: ', error);
            throw error;
        }
    };

    updateMenu = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await menuRepository.fetchById(id);
            const menuOld = row.rows[0];
            menuOld.MenuName = body.MenuName;
            menuOld.MenuDesc = body.MenuDesc;

            const menu = await menuRepository.update(menuOld, req.UserID);
            if (!menu) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(menu.rows));
            }
        } catch (error) {
            logger.error('updateMenu: ', error);
            throw error;
        }
    };

    deleteMenu = async (req, res) => {
        try {
            const { id } = req.querystring;
            const menu = await menuRepository.delete(id, req.UserID);
            if (!menu) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(menu.rows));
            }
        } catch (error) {
            logger.error('deleteMenu: ', error);
            throw error;
        }
    };
}


module.exports = new MenuController();