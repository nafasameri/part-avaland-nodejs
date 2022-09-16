const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const CategoryRepository = require("../repositories/category.repository");
const categoryRepository = new CategoryRepository();


class CategoryController {

    #print = (categoryArr) => {
        const categoryData = []
        categoryArr.forEach(category => {
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
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
            } else {
                const categorys = await categoryRepository.fetchAll();

                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print(categorys)));
            }
        } catch (error) {
            logger.error('getAllCategorys: ' + error);
            throw error;
        }
    };

    createCategory = async (req, res) => {
        try {
            const { body } = req;
            const category = await categoryRepository.add(body, req.UserID);
            if (!category)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
        } catch (error) {
            logger.error('createCategory: ' + error);
            throw error;
        }
    };

    updateCategory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const categoryOld = await categoryRepository.fetchById(id);
            categoryOld.CategoryName = body.CategoryName ?? categoryOld.CategoryName;
            categoryOld.CategoryImg = body.CategoryImg ?? categoryOld.CategoryImg;


            const category = await categoryRepository.update(categoryOld, req.UserID);
            if (!category)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
        } catch (error) {
            logger.error('updateCategory: ' + error);
            throw error;
        }
    };

    deleteCategory = async (req, res) => {
        try {
            const { id } = req.querystring;
            const category = await categoryRepository.delete(id, req.UserID);
            if (!category)
                sendResponse(res, 404, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(this.#print([category])));
        } catch (error) {
            logger.error('deleteCategory: ' + error);
            throw error;
        }
    };
}


module.exports = new CategoryController();