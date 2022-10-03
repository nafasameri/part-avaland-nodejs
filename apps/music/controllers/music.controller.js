const formidable = require('formidable')
const fs = require('fs');
const statusCode = require('http-status-codes');

const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const MusicRepository = require("../repositories/music.repository");
const musicRepository = new MusicRepository();
const { date } = require('../../../modules/utility');
const Music = require('../models/music.model');


class MusicController {
    getMusics = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const music = await musicRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, music);
            } else {
                const musics = await musicRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, musics);
            }
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    // root = async (req, res) => {
    //     const page = `<html><body>
    //     <h2>With Node.js <code>"http"</code> module</h2>
    //     <form action="/music/upload" enctype="multipart/form-data" method="post">
    //     <div>Text field title: <input type="text" name="title" /></div>
    //     <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
    //     <input type="submit" value="Upload" />
    //     </form>
    //     </body></html>`;
    //     res.writeHead(statusCode.OK, { 'Content-Type': 'text/html' });
    //     return res.end(page);
    //     // return sendResponse(res, statusCode.OK, { 'Content-Type': 'text/html' }, page);
    // };

    upload = async (req, res) => {
        try {
            const form = formidable({
                uploadDir: `uploads`,
                keepExtensions: true,
                filename(name, ext, part, form) {
                    return date() + ' ' + name + ext;
                }
            });

            form.parse(req, (error, fields, files) => {
                req.fields = fields;
                req.files = files;
                req.body = files;
                console.log(files);

                if (error) {
                    logger.error(`formidable: ${error}`);
                    return sendResponse(res, error.httpCode || 400, { 'Content-Type': 'text/plain' }, error);
                }
                return sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify({ fields, files }));
                // this.createMusic(req, res);
            });
            return sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could not upload');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    createMusic = async (req, res) => {
        try {
            const { body } = req;
            const { filepath, newFilename, originalFilename, mimetype } = body['multipleFiles'];
            
            if (!newFilename)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
     
            const music = await musicRepository.add({ url: newFilename }, req.UserID);
            if (!music)
                return sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                return sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, music);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    updateMusic = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            if (!id || !body)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const musicOld = await musicRepository.fetchById(id);
            if (musicOld) {
                musicOld.album = body.album ?? musicOld.album;
                musicOld.name = body.name ?? musicOld.name;
                musicOld.title = body.title ?? musicOld.title;
                musicOld.poster = body.poster ?? musicOld.poster;
                musicOld.url = body.url ?? musicOld.url;
                musicOld.duration = body.duration ?? musicOld.duration;
                musicOld.lyrics = body.lyrics ?? musicOld.lyrics;
                musicOld.tags = body.tags ?? musicOld.tags;
                musicOld.artists = body.artists ?? musicOld.artists;
                musicOld["release-time"] = body["release-time"] ?? musicOld["release-time"];
                musicOld["category-id"] = body["category-id"] ?? musicOld["category-id"];

                const music = await musicRepository.update(musicOld, req.UserID);
                if (!music)
                    sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
                else
                    sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, music);
            }
            else 
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Not Found!');
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    deleteMusic = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (!id)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');

            const music = await musicRepository.delete(id, req.UserID);
            if (!music)
                sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, music);
        } catch (error) {
            logger.error(`${req.url}: ${error}`);
            throw error;
        }
    };

    load = async (req, res) => {
        fs.createReadStream('D:\\Development\\Work\\Part\\College\\session29\\30-session\\view\\range.html').pipe(res);
        sendResponse(res, statusCode.OK, { 'Content-Type': 'text/html' });
    };

    range = async (req, res) => {
        sendResponse(res, statusCode.OK, { 'Content-Type': 'text/html' }, null);
    };
}

module.exports = new MusicController();