const userController = require("./controllers/user.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication, InvalidId } = require('./middlewares');

const routes = [
  {
    url: "users",
    method: "GET",
    controller: userController.getUsers,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "login",
    method: "POST",
    controller: userController.login,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "signup",
    method: "POST",
    controller: userController.signUp,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: userController.updateUser,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: userController.deleteUser,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  }
];

module.exports = routes;
