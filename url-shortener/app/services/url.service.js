const {encodeBase62} = require("../utils/encodeBase62");

class UrlService{
    constructor(storage){
        this.storage = storage;
        this.counter = 1;
    }

    createShortUrl(longUrl){
        const shortCode = encodeBase62(this.counter++);
        this.storage.set(shortCode , longUrl);
        return shortCode;
    }

    getLongUrl(shortCode){
        return this.storage.get(shortCode);
    }

    exists(shortCode){
        return this.storage.exists(shortCode);
    }
}

module.exports = UrlService;