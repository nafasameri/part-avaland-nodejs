const roleController = require("./controllers/role.controller");

const routes = [
  {
    url: "role",
    method: "GET",
    controller: roleController.getAllRoles,
    middlewares: [],
  },
  {
    url: "role",
    method: "POST",
    controller: roleController.createRole,
    middlewares: [],
  },
];

module.exports = routes;
