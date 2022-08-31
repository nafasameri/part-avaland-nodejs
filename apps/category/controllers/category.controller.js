const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const CategoryRepository = require("../repositories/category.repository");
const categoryRepository = new CategoryRepository();


class CategoryController {
    getCategories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const category = await categoryRepository.fetchById(id);
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(category.rows, null, 2));
            } else {
                const categorys = await categoryRepository.fetchAll();
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(categorys.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllCategorys: ', error);
            throw error;
        }
    };

    createCategory = async (req, res) => {
        try {
            const { body } = req;
            const category = await categoryRepository.add(body, req.UserID);

            if (!category) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Create'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(category.rows));
            }
        } catch (error) {
            logger.error('createCategory: ', error);
            throw error;
        }
    };

    updateCategory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await categoryRepository.fetchById(id);
            const categoryOld = row.rows[0];
            categoryOld.CategoryName = body.CategoryName;
            categoryOld.CategoryImg = body.CategoryImg;

            const category = await categoryRepository.update(categoryOld, req.UserID);
            if (!category) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(category.rows));
            }
        } catch (error) {
            logger.error('updateCategory: ', error);
            throw error;
        }
    };

    deleteCategory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const category = await categoryRepository.delete(id, req.UserID);
            if (!category) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Update!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(category.rows));
            }
        } catch (error) {
            logger.error('updateCategory: ', error);
            throw error;
        }
    };
}


module.exports = new CategoryController();