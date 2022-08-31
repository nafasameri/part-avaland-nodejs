const favouriteController = require("./controllers/favourite.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication } = require('./middlewares');

const routes = [
  {
    url: "favourites",
    method: "GET",
    controller: favouriteController.getFavourites,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "favourite",
    method: "POST",
    controller: favouriteController.createFavourite,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "favourite",
    method: "PUT",
    controller: favouriteController.updateFavourite,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "favourite",
    method: "DELETE",
    controller: favouriteController.deleteFavourite,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
