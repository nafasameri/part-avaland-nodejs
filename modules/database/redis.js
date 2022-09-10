const redis = require('redis');

const config = require('../../config').redisConfig;


class Redis {
    #instance = null;

    constructor(config) {
        if (!this.#instance) {
            this.#instance = redis.createClient(config.port, config.host, {});
            this.#instance.connect();
            this.#instance.select(2);
        }
    }

    getInstance() {
        return this.#instance;
    }
}

const connection = new Redis(config);
module.exports = connection.getInstance();
