const profileController = require("./controllers/profile.controller");
const parser = require("../../modules/parser");

const routes = [
  {
    url: "profiles",
    method: "GET",
    controller: profileController.getAllProfiles,
    middlewares: [],
  },
];

module.exports = routes;
