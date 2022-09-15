const premissionController = require("./controllers/premission.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "histories",
    method: "GET",
    controller: premissionController.getHistories,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "add",
    method: "POST",
    controller: premissionController.createPremission,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: premissionController.updatePremission,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: premissionController.deletePremission,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
