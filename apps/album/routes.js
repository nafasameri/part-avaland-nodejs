const albumController = require("./controllers/album.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "albums",
    method: "GET",
    controller: albumController.getAlbums,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "album",
    method: "POST",
    controller: albumController.createAlbum,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "album",
    method: "PUT",
    controller: albumController.updateAlbum,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "album",
    method: "DELETE",
    controller: albumController.deleteAlbum,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
