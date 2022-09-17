const menuController = require("./controllers/menu.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication, InvalidId } = require('./middlewares');

const routes = [
  {
    url: "menus",
    method: "GET",
    controller: menuController.getMenus,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "add",
    method: "POST",
    controller: menuController.createMenu,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: menuController.updateMenu,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: menuController.deleteMenu,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  }
];

module.exports = routes;
