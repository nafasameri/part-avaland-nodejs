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
    req.params = result;
    return req;
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "oops! Something went wrong!",
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
    });
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "oops! Something went wrong!",
        addtionalInfo: e.message,
      })
    );
  }
}

module.exports = { getPostData, fetchQueryStringFromURL };
