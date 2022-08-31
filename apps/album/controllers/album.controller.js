const logger = require('log4js').getLogger();
logger.level = 'debug';

const sendResponse = require('../../../modules/handler/response.handler');
const AlbumRepository = require("../repositories/album.repository");
const albumRepository = new AlbumRepository();


class AlbumController {
    getAlbums = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const album = await albumRepository.fetchById(id);
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(album.rows, null, 2));
            } else {
                const albums = await albumRepository.fetchAll();
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(albums.rows, null, 2));
            }
        } catch (error) {
            logger.error('getAllAlbums: ', error);
            throw error;
        }
    };

    createAlbum = async (req, res) => {
        try {
            const { body } = req;
            const album = await albumRepository.add(body, req.UserID);

            if (!album) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({ message: 'Could Not Create' }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(album.rows));
            }
        } catch (error) {
            logger.error('createAlbum: ', error);
            throw error;
        }
    };

    updateAlbum = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const row = await albumRepository.fetchById(id);
            const albumOld = row.rows[0];
            albumOld.AlbumName = body.AlbumName;
            albumOld.AlbumImg = body.AlbumImg;

            const album = await albumRepository.update(albumOld, req.UserID);
            if (!album) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({ message: 'Could Not Update!' }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(album.rows));
            }
        } catch (error) {
            logger.error('updateAlbum: ', error);
            throw error;
        }
    };

    deleteAlbum = async (req, res) => {
        try {
            const {
                id
            } = req.querystring;
            const album = await albumRepository.delete(id, req.UserID);
            if (!album) {
                sendResponse(res, 404, {
                    "Content-Type": "application/json"
                }, JSON.stringify({
                    message: 'Could Not Delete!'
                }, null, 2));
            } else {
                sendResponse(res, 200, {
                    "Content-Type": "application/json"
                }, JSON.stringify(album.rows));
            }
        } catch (error) {
            logger.error('updateAlbum: ', error);
            throw error;
        }
    };
}


module.exports = new AlbumController();