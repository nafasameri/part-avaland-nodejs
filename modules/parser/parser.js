const sendResponse = require('../handler/response.handler');
const logger = require('log4js').getLogger();
logger.level = 'debug';


function fetchQueryStringFromURL(req, res, next) {
  try {
    let q = req.url.split("?"),
      result = {};
    if (q.length >= 2) {
      q[1].split("&").forEach((item) => {
        try {
          result[item.split("=")[0]] = item.split("=")[1];
        } catch (e) {
          result[item.split("=")[0]] = "";
        }
      });
    }
    req.querystring = result;
    logger.warn('querystring: ' + JSON.stringify(req.querystring));
    return req;
  } catch (e) {
    sendResponse(res, 500, {
        "Content-Type": "application/json"
      },
      JSON.stringify({
        message: "oOps! Something went wrong!",
        addtionalInfo: e.message,
      })
    );
  }
}

async function getPostData(req, res, next) {
  try {
    let data = null;
    return new Promise((resolve, reject) => {
      let buffer = "";
      req.on("data", (chunk) => {
        buffer += chunk;
      });
      req.on("end", () => {
        try {
          data = JSON.parse(buffer);
        } catch (e) {
          data = buffer;
        }
        resolve(data);
      });
      // return req;
    });
  } catch (e) {
    sendResponse(res, 500, {
        "Content-Type": "application/json"
      },
      JSON.stringify({
        message: "oOps! Something went wrong!",
        addtionalInfo: e.message,
      })
    );
  }
}


async function getHeaders(req, res, next) {
  try {
    const contentType = req.headers['content-type'];

    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      switch (contentType) {
        case 'application/x-www-form-urlencoded':
          req.params = data;
          logger.warn('params: ' + req.params);
          break;
        case 'application/json':
          req.body = data;
          logger.warn('body: ' + req.body);
          break;
      }
    });
    return req;
  } catch (e) {
    sendResponse(res, 500, {
        "Content-Type": "application/json"
      },
      JSON.stringify({
        message: "oOps! Something went wrong!",
        addtionalInfo: e.message,
      })
    );
  }
}


module.exports = {
  getPostData,
  fetchQueryStringFromURL,
  getHeaders
};