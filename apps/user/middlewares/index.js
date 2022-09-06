const { getPostData, fetchQueryStringFromURL, getHeaders } = require('../../../modules/parser');
const authentication = require('../../../modules/auth');

module.exports = {
    fetchQueryStringFromURL,
    getPostData,
    getHeaders,
    authentication
}