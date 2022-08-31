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
    url: "history",
    method: "POST",
    controller: historyController.createHistory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "history",
    method: "PUT",
    controller: historyController.updateHistory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "history",
    method: "DELETE",
    controller: historyController.deleteHistory,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
