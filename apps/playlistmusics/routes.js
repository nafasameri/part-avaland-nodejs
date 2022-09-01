const playlistMusicsController = require("./controllers/playlist.musics.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "playlistMusics",
    method: "GET",
    controller: playlistMusicsController.getPlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "playlistMusics",
    method: "POST",
    controller: playlistMusicsController.createPlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "playlistMusics",
    method: "PUT",
    controller: playlistMusicsController.updatePlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "playlistMusics",
    method: "DELETE",
    controller: playlistMusicsController.deletePlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
