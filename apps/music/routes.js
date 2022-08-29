const musicController = require("./controllers/music.controller");
const {
  fetchQueryStringFromURL,
  getPostData,
  getHeaders
} = require('./middlewares');

const routes = [
  {
    url: "musics",
    method: "GET",
    controller: musicController.getMusics,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
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
    middlewares: [fetchQueryStringFromURL],
  },
  {
    url: "saveInfo",
    method: "PUT",
    controller: musicController.updateMusic,
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