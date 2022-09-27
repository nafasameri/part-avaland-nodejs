const { getPostData, fetchQueryStringFromURL, getHeaders, InvalidId } = require('../../../modules/parser');
const authentication = require('../../../modules/auth');

module.exports = {
    fetchQueryStringFromURL,
    getPostData,
    getHeaders,
    authentication,
    InvalidId
}