const roleController = require("./controllers/role.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "roles",
    method: "GET",
    controller: roleController.getRoles,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "role",
    method: "POST",
    controller: roleController.createRole,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "role",
    method: "PUT",
    controller: roleController.updateRole,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "role",
    method: "DELETE",
    controller: roleController.deleteRole,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
