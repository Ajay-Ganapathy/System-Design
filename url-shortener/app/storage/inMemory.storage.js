// storage/inMemory.storage.js

const Storage = require("./storage.interface.js");

/**
 * In-memory storage using Map
 */

class InMemoryStorage extends Storage{
    constructor(){
        super();
        this.map = new Map();
    }

    set(key , value){
        this.map.set(key,value);
    }
    
    get(key){
        return this.map.get(key);
    }

    exists(key){
        return this.map.has(key);
    }
}

module.exports = InMemoryStorage;