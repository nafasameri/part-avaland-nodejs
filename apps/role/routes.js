const roleController = require("./controllers/role.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders } = require('./middlewares');

const routes = [
  {
    url: "roles",
    method: "GET",
    controller: roleController.getRoles,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "role",
    method: "POST",
    controller: roleController.createRole,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "role",
    method: "PUT",
    controller: roleController.updateRole,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "role",
    method: "DELETE",
    controller: roleController.deleteRole,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
