const favouriteController = require("./controllers/favourite.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders } = require('./middlewares');

const routes = [
  {
    url: "favourites",
    method: "GET",
    controller: favouriteController.getFavourites,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "favourite",
    method: "POST",
    controller: favouriteController.createFavourite,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "favourite",
    method: "PUT",
    controller: favouriteController.updateFavourite,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "favourite",
    method: "DELETE",
    controller: favouriteController.deleteFavourite,
    middlewares: [fetchQueryStringFromURL, getHeaders],
  }
];

module.exports = routes;
