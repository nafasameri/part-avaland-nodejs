const categoryController = require("./controllers/category.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders } = require('./middlewares');

const routes = [
  {
    url: "categories",
    method: "GET",
    controller: categoryController.getCategories,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "category",
    method: "POST",
    controller: categoryController.createcategory,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "category",
    method: "PUT",
    controller: categoryController.updatecategory,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "category",
    method: "DELETE",
    controller: categoryController.deletecategory,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
