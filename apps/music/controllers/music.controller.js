const formidable = require('formidable')
const fs = require('fs');
const statusCode = require('http-status-codes');

const logger = require('../../../modules/logger');
const sendResponse = require('../../../modules/handler/response.handler');
const MusicRepository = require("../repositories/music.repository");
const musicRepository = new MusicRepository();
const { date } = require('../../../modules/utility');


class MusicController {

    #print = (musicList) => {
        const musicData = []
        musicList.forEach(music => {
            const musicJson = {
                "music-id": music.MusicID,
                "album-name": music.AlbumName,
                "music-id": music.MusicID,
                "name": music.MusicName,
                "title": music.MusicTitle,
                "poster": music.MusicPoster,
                "url": music.MusicURL,
                "duration": music.MusicDuration,
                "lyrics": music.MusicLyrics,
                "tags": music.MusicTags,
                "artists": music.MusicArtists,
                "release-time": music.MusicReleaseTime,
                "creator": music.Creator,
                "create-time": music.CreateTime,
                "modifier": music.Modifier,
                "modifi-time": music.ModifiTime,
                "delete-flag": music.IsDelete
            }
            musicData.push(musicJson)
        });
        return (musicData == 1) ? musicData[0] : musicData;
    }

    getMusics = async (req, res) => {
        try {
            const { id } = req.querystring;
            if (id) {
                const music = await musicRepository.fetchById(id);
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([music])));
            } else {
                const musics = await musicRepository.fetchAll();
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print(musics)));
            }
        } catch (error) {
            logger.error('getMusics: ' + error);
            throw error;
        }
    };

    root = async (req, res) => {
        sendResponse(res, statusCode.OK, { 'Content-Type': 'text/html' },
            `<html><body>
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
                // sendResponse(res, statusCode.OK, { 'Content-Type': 'application/json' }, JSON.stringify({ fields, files }));
                this.createMusic(req, res);
            });

            return;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    };

    createMusic = async (req, res) => {
        try {
            const { body } = req;
            const { filepath, newFilename, originalFilename, mimetype } = body['multipleFiles'];
            
            if (!newFilename)
                return sendResponse(res, statusCode.BAD_REQUEST, { "Content-Type": "application/json" }, 'Invalid parameters!');
     
            const newMusic = {
                MusicURL: newFilename
                // MusicMimeType: mimetype
            };
            const music = await musicRepository.add(newMusic, req.UserID);
            if (!music)
                return sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Create');
            else
                return sendResponse(res, statusCode.OK, { 'Content-Type': 'application/json' }, JSON.stringify(this.#print([music])));
        } catch (error) {
            logger.error('createMusic: ' + error);
            throw error;
        }
    };

    updateMusic = async (req, res) => {
        try {
            const { id } = req.querystring;
            const { body } = req;
            const musicOld = await musicRepository.fetchById(id);
            musicOld.AlbumName = body.AlbumName ?? musicOld.AlbumName;
            musicOld.MusicID = body.MusicID ?? musicOld.MusicID;
            musicOld.MusicName = body.MusicName ?? musicOld.MusicName;
            musicOld.MusicTitle = body.MusicTitle ?? musicOld.MusicTitle;
            musicOld.MusicPoster = body.MusicPoster ?? musicOld.MusicPoster;
            musicOld.MusicURL = body.MusicURL ?? musicOld.MusicURL;
            musicOld.MusicDuration = body.MusicDuration ?? musicOld.MusicDuration;
            musicOld.MusicLyrics = body.MusicLyrics ?? musicOld.MusicLyrics;
            musicOld.MusicTags = body.MusicTags ?? musicOld.MusicTags;
            musicOld.MusicArtists = body.MusicArtists ?? musicOld.MusicArtists;
            musicOld.MusicReleaseTime = body.MusicReleaseTime ?? musicOld.MusicReleaseTime;

            const music = await musicRepository.update(musicOld, req.UserID);
            if (!music)
                sendResponse(res, statusCode.NOT_FOUND, { "Content-Type": "application/json" }, 'Could Not Update!');
            else
                sendResponse(res, statusCode.NO_CONTENT, { "Content-Type": "application/json" }, JSON.stringify(this.#print([music])));
        } catch (error) {
            logger.error('updateMusic: ' + error);
            throw error;
        }
    };

    deleteMusic = async (req, res) => {
        try {
            const { id } = req.querystring;
            const music = await musicRepository.delete(id, req.UserID);
            if (!music)
                sendResponse(res, statusCode.GONE, { "Content-Type": "application/json" }, 'Could Not Delete!');
            else
                sendResponse(res, statusCode.OK, { "Content-Type": "application/json" }, JSON.stringify(this.#print([music])));
        } catch (error) {
            logger.error('deleteMusic: ' + error);
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