const categoryController = require("./controllers/category.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "categories",
    method: "GET",
    controller: categoryController.getCategories,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "category",
    method: "POST",
    controller: categoryController.createcategory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "category",
    method: "PUT",
    controller: categoryController.updatecategory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "category",
    method: "DELETE",
    controller: categoryController.deletecategory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
