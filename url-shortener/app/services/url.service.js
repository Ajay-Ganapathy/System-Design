const {encodeBase62} = require("../utils/encodeBase62");

class UrlService{
    constructor(storage){
        this.storage = storage;
        this.counter = 1;
    }

    async createShortUrl(longUrl){
        const shortCode = encodeBase62(this.counter++);
        await this.storage.set(shortCode , longUrl);
        return shortCode;
    }

    async getLongUrl(shortCode){
        return await this.storage.get(shortCode);
    }

    async exists(shortCode){
        return await this.storage.exists(shortCode);
    }
}

module.exports = UrlService;