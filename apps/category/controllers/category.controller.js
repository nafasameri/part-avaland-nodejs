const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const CategoryRepository = require("../repositories/category.repository");
const categoryRepository = new CategoryRepository();

const statusCode = require('http-status-codes');

class CategoryController {
    getCategories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const category = await categoryRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, category);
            } else {
                const categorys = await categoryRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, categorys);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createCategory = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.name)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Invalid parameters!');

            const category = await categoryRepository.add(body, req.UserID);
            if (!category)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Could Not Create');
            else
                sendResponse(res, statusCode.CREATED, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, category);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateCategory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Invalid parameters!');

            const categoryOld = await categoryRepository.fetchById(id);
            if (categoryOld) {
                categoryOld.name = body.name ?? categoryOld.name;
                categoryOld.img = body.img ?? categoryOld.img;

                const category = await categoryRepository.update(categoryOld, req.UserID);
                if (!category)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, category);
            }
            else
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Not Found!');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteCategory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const category = await categoryRepository.delete(id, req.UserID);
            if (!category)
                sendResponse(res, statusCode.GONE, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, category);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new CategoryController();