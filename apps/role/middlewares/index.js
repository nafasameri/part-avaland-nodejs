const queryString = require('../../../modules/query-get-parser');
const { getPostData, fetchQueryStringFromURL, getHeaders } = require('../../../modules/parser');

module.exports = {
    queryString,
    fetchQueryStringFromURL,
    getPostData,
    getHeaders
}