const musicController = require("./controllers/music.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication, InvalidId } = require('./middlewares');

const routes = [{
    url: "musics",
    method: "GET",
    controller: musicController.getMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "",
    method: "GET",
    controller: musicController.root,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "upload",
    method: "POST",
    controller: musicController.upload,
    middlewares: [authentication, fetchQueryStringFromURL],
  },
  {
    url: "saveInfo",
    method: "PUT",
    controller: musicController.updateMusic,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "update",
    method: "PUT",
    controller: musicController.updateMusic,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: musicController.deleteMusic,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "load",
    method: "GET",
    controller: musicController.load,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "range",
    method: "POST",
    controller: musicController.range,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
];

module.exports = routes;