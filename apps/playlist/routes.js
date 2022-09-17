const playlistController = require("./controllers/playlist.controller");
const playlistMusicsController = require("./controllers/playlist.musics.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication, InvalidId } = require('./middlewares');

const routes = [
  {
    url: "playlists",
    method: "GET",
    controller: playlistController.getPlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "add",
    method: "POST",
    controller: playlistController.createPlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: playlistController.updatePlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: playlistController.deletePlaylist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "musics",
    method: "GET",
    controller: playlistMusicsController.getPlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "addmusic",
    method: "POST",
    controller: playlistMusicsController.createPlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "updatemusic",
    method: "PUT",
    controller: playlistMusicsController.updatePlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "deletemusic",
    method: "DELETE",
    controller: playlistMusicsController.deletePlaylistMusics,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  }
];

module.exports = routes;
