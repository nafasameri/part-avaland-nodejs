exports.checkUrlSlash = function (url) {
  return url[0] !== "/" ? "/" + url : url;
};
