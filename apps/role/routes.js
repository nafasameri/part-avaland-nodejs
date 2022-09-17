const roleController = require("./controllers/role.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication, InvalidId } = require('./middlewares');

const routes = [
  {
    url: "roles",
    method: "GET",
    controller: roleController.getRoles,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "add",
    method: "POST",
    controller: roleController.createRole,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: roleController.updateRole,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: roleController.deleteRole,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  }
];

module.exports = routes;
