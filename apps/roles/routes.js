const roleController = require("./controllers/role.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders } = require('./middlewares');

const routes = [
  {
    url: "role",
    method: "GET",
    controller: roleController.getAllRoles,
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
  }
];

module.exports = routes;
