const favouriteController = require("./controllers/favourite.controller");
const { fetchQueryStringFromURL, getPostData, getHeaders, authentication, InvalidId } = require('./middlewares');

const routes = [
  {
    url: "favourites",
    method: "GET",
    controller: favouriteController.getFavourites,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "add",
    method: "POST",
    controller: favouriteController.createFavourite,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders],
  },
  {
    url: "update",
    method: "PUT",
    controller: favouriteController.updateFavourite,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  },
  {
    url: "delete",
    method: "DELETE",
    controller: favouriteController.deleteFavourite,
    middlewares: [authentication, fetchQueryStringFromURL, getHeaders, InvalidId],
  }
];

module.exports = routes;
