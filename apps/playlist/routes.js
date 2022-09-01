const playlistController = require("./controllers/playlist.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "playlists",
    method: "GET",
    controller: playlistController.getPlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "playlist",
    method: "POST",
    controller: playlistController.createPlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "playlist",
    method: "PUT",
    controller: playlistController.updatePlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "playlist",
    method: "DELETE",
    controller: playlistController.deletePlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
