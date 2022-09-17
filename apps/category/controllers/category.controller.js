const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const CategoryRepository = require("../repositories/category.repository");
const categoryRepository = new CategoryRepository();
const Category = require('../models/category.model');

const statusCode = require('http-status-codes');

class CategoryController {

    #print = (categoryList) => {
        const categoryData = []
        categoryList.forEach(category => {
            const categoryJson = {
                "category-id": category.CategoryID,
                "name": category.CategoryName,
                "img": category.CategoryImg,
                "creator": category.Creator,
                "create-time": category.CreateTime,
                "midifier": category.Modifier,
                "modifi-time": category.ModifiTime,
                "delete-flag": category.IsDelete
            }
            categoryData.push(categoryJson)
        });
        return (categoryData == 1) ? categoryData[0] : categoryData;
    }

    getCategories = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const category = await categoryRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
            } else {
                const categorys = await categoryRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(categorys)));
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
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const newCategory = new Category(0, body.name, body.img);
            const category = await categoryRepository.add(newCategory, req.UserID);
            if (!category)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, statusCode.CREATED, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
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
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const categoryOld = await categoryRepository.fetchById(id);
            categoryOld.CategoryName = body.name ?? categoryOld.CategoryName;
            categoryOld.CategoryImg = body.img ?? categoryOld.CategoryImg;

            const category = await categoryRepository.update(categoryOld, req.UserID);
            if (!category)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.NO_CONTENT, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
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
                sendResponse(res, statusCode.GONE, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new CategoryController();