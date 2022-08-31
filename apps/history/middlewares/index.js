const queryString = require('../../../modules/query-get-parser');
const { getPostData, fetchQueryStringFromURL, getHeaders } = require('../../../modules/parser');
const authentication = require('../../../modules/auth');

module.exports = {
    queryString,
    fetchQueryStringFromURL,
    getPostData,
    getHeaders,
    authentication
}