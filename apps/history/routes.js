const historyController = require("./controllers/history.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "histories",
    method: "GET",
    controller: historyController.getHistories,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "add",
    method: "POST",
    controller: historyController.createHistory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: historyController.updateHistory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: historyController.deleteHistory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
