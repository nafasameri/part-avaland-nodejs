const METHODS = require("http").METHODS;
const statusCode = require('http-status-codes');

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
        const routeMethod = method.toUpperCase();
        if (!method || !METHODS.includes(routeMethod))
            throw new Error("must define HTTP method for route!");
        if (!(typeof route === "string"))
            throw new Error("Route must be type of string");

        let routeObject = new Route(route, handler, routeMethod);
        this.#routePool.set(`${routeObject.url}_${routeObject.method}`, routeObject );
        this.#addListeners(`${routeObject.url}_${routeObject.method}`);
        return routeObject;
    }

    async #execute(req, res) {
        try {
            const route = req.url.split("?")[0];
            const middlewares = this.#routePool.get(`${route}_${req.method}`)?.middlewares;
            const handler = this.#routePool.get(`${route}_${req.method}`).handler;

            const runMiddlewareForRoute = await this.#runMiddlewares(middlewares, req, res);
            if (runMiddlewareForRoute) await handler(req, res);
        } catch (e) {
            logger.error(req.url + ' - ' + e?.message);
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
        const route = req.url.split("?")[0];
        const url = `${route}_${req.method}`;
        if (this.#routePool.has(url))
            return this.#eventEmitter.emit(url, req, res);
        return sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, "URL NOT FOUND!");
    }
}

module.exports = Router;