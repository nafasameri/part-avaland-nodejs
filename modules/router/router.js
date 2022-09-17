const METHODS = require("http").METHODS;

const Route = require("./Route");
const sendResponse = require('../../modules/handler/response.handler');
const logger = require('../logger');

class Router {
  #routePool;
  #eventEmitter;

  constructor(eventEmitter, requestEventName) {
    this.#routePool = new Map();
    this.#eventEmitter = eventEmitter;
    this.#eventEmitter.on(requestEventName, this.route.bind(this));
  }

  addRoute(route, handler, method) {
    let routeObject;
    const routeMethod = method.toUpperCase();
    if (!method || !METHODS.includes(routeMethod))
      throw new Error("must define HTTP method for route!");
    if (!(typeof route === "string"))
      throw new Error("Route must be type of string");

    routeObject = new Route(route, handler, routeMethod);
    this.#routePool.set(
      `${routeObject.url}_${routeObject.method}`,
      routeObject
    );
    this.#addListeners(`${routeObject.url}_${routeObject.method}`);
    return routeObject;
  }

  async #execute(req, res) {
    try {
      let route = req.url.split("?")[0];
      let middlewares = this.#routePool.get(`${route}_${req.method}`)?.middlewares;
      let handler = this.#routePool.get(`${route}_${req.method}`).handler;

      let runMiddlewareForRoute = await this.#runMiddlewares(middlewares, req, res);
      if (runMiddlewareForRoute) await handler(req, res);
    } catch (e) {
      logger.error(e?.message);
      sendResponse(res, res?.status ?? 500, { "Content-Type": "application/json" }, e?.message);
    }
  }

  async #runMiddlewares(middlewares, req, res) {
    return new Promise(async (resolve, reject) => {
      async function next(index) {
        if (middlewares?.length === index) return resolve(true);
        const middleware = middlewares[index];
        try {
          const result = await middleware(req, res, (err) => {
            if (err) {
              return reject(err);
            }
            return next(++index);
          });

          if (result) return await next(++index);
        } catch (error) {
          reject(error);
        }
      }
      await next(0);
    });
  }

  #addListeners(key) {
    this.#eventEmitter.on(key, async (req, res) => {
      await this.#execute(req, res);
    });
  }

  route(req, res) {
    let route = req.url.split("?")[0];
    if (!this.#routePool.has(`${route}_${req.method}`))
      return sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, JSON.stringify({ message: "URL NOT FOUND!" }));
    this.#eventEmitter.emit(`${route}_${req.method}`, req, res);
  }
}

module.exports = Router;