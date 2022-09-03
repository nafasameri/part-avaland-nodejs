const formidable = require('formidable')
const logger = require('log4js').getLogger();
const fs = require('fs');

const sendResponse = require('../../../modules/handler/response.handler');
const MusicRepository = require("../repositories/music.repository");
const musicRepository = new MusicRepository();
const { date } = require('../../../modules/utility');

logger.level = 'debug';


class MusicController {
    getMusics = async (req, res) => {
        try {
            const {
                id
            } = req.querystring;
            if (id) {
                const music = await musicRepository.fetchById(id);
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(music.rows, null, 2));
            } else {
                const musics = await musicRepository.fetchAll();
                sendResponse(res, 200, { "Content-Type": "application/json" }, JSON.stringify(musics.rows, null, 2));
            }
        } catch (error) {
            logger.error('getMusics: ', error);
            throw error;
        }
    };

    root = async (req, res) => {
        sendResponse(res, 200, { 'Content-Type': 'text/html' }, `<html><body>
            <h2>With Node.js <code>"http"</code> module</h2>
            <form action="/music/upload" enctype="multipart/form-data" method="post">
            <div>Text field title: <input type="text" name="title" /></div>
            <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
            <input type="submit" value="Upload" />
            </form>
            </body></html>`);
    };

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

                if (error) {
                    logger.error(error);
                    return sendResponse(res, error.httpCode || 400, { 'Content-Type': 'text/plain' }, error);
                }
                // sendResponse(res, 200, { 'Content-Type': 'application/json' }, JSON.stringify({ fields, files }, null, 2));
                this.createMusic(req, res);
            });

            return;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    };

    createMusic = async (req, res) => {
        const { body } = req;
        const { filepath, newFilename, originalFilename, mimetype } = body['multipleFiles'];
        const newMusic = {
            MusicURL: newFilename
            // MusicMimeType: mimetype
        };        
        const music = await musicRepository.add(newMusic, req.UserID);
        sendResponse(res, 200, { 'Content-Type': 'application/json' }, JSON.stringify(music.rows[0], null, 2));
    };

    updateMusic = async (req, res) => {
        const { body } = req;
        const music = await musicRepository.update(body, req.UserID);
        sendResponse(res, 200, { 'Content-Type': 'application/json' }, JSON.stringify(music.rows[0], null, 2));
    };


    load = async (req, res) => {
        sendResponse(res, 200, {
                'Content-Type': 'text/html'
            },
            fs.readFileSync('D:\\Development\\Work\\Part\\College\\session29\\30-session\\view\\range.html'));
    };

    range = async (req, res) => {
        sendResponse(res, 200, { 'Content-Type': 'text/html' }, null);
    };
}

module.exports = new MusicController();