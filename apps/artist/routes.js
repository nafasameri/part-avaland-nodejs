const artistController = require("./controllers/artist.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "artists",
    method: "GET",
    controller: artistController.getArtists,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "artist",
    method: "POST",
    controller: artistController.createArtist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "artist",
    method: "PUT",
    controller: artistController.updateArtist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "artist",
    method: "DELETE",
    controller: artistController.deleteArtist,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
