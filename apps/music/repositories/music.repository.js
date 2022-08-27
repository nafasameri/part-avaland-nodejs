const Music = require("../models/music.model");
const musicsDataStore = require("./music.json");

class MusicRepository {
    async fetchAll() {
        const musics = [];
        for (let music of musicsDataStore) {
            let musicModel = new Music(1, 'test');
            musics.push(musicModel);
        }
        return musics;
    }
}

module.exports = MusicRepository;
