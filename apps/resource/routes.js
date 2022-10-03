const resourceController = require("./controllers/resource.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication, InvalidId } = require('./middlewares');

const routes = [
  {
    url: "resources",
    method: "GET",
    controller: resourceController.getResources,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "add",
    method: "POST",
    controller: resourceController.createResource,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: resourceController.updateResource,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: resourceController.deleteResource,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  }
];

module.exports = routes;
