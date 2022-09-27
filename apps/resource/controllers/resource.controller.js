const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const ResourceRepository = require("../repositories/resource.repository");
const resourceRepository = new ResourceRepository();

const statusCode = require('http-status-codes');
const Resource = require('../models/resource.model');

class ResourceController {
    getResources = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const resource = await resourceRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, resource);
            } else {
                const resources = await resourceRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, resources);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createResource = async (req, res) => {
        try {
            const { body } = req;
            if (!body || !body.name || !body.link)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const resource = await resourceRepository.add(body, req.UserID);
            if (!resource) {
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            } else {
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, resource);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateResource = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const resourceOld = await resourceRepository.fetchById(id);
            if (resourceOld) {
                resourceOld.name = body.name ?? resourceOld.name;
                resourceOld.desc = body.desc ?? resourceOld.desc;
                resourceOld.icon = body.icon ?? resourceOld.icon;
                resourceOld.link = body.link ?? resourceOld.link;
                resourceOld.order = body.order ?? resourceOld.order;

                const resource = await resourceRepository.update(resourceOld, req.UserID);
                if (!resource)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, resource);
            }
            else
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found!');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteResource = async (req, res) => {
        try {
            const { id } = req.querystring;
            const resource = await resourceRepository.delete(id, req.UserID);
            if (!resource)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, resource);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };
}


module.exports = new ResourceController();