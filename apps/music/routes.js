const musicController = require("./controllers/music.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders } = require('./middlewares');

const routes = [
  {
    url: "",
    method: "GET",
    controller: musicController.root,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "upload",
    method: "POST",
    controller: musicController.upload,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "load",
    method: "GET",
    controller: musicController.load,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "range",
    method: "POST",
    controller: musicController.range,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
];

module.exports = routes;
