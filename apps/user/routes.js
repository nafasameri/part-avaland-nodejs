const userController = require("./controllers/user.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "users",
    method: "GET",
    controller: userController.getUsers,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "user",
    method: "POST",
    controller: userController.createUser,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "user",
    method: "PUT",
    controller: userController.updateUser,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "user",
    method: "DELETE",
    controller: userController.deleteUser,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
