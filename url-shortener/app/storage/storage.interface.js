// storage/storage.interface.js

/**
 * Interface for storage layer.
 * All storage implementations must follow this contract.
 */

class Storage{
    set(key , value){
        throw new Error("Not Implemented");
    }

    get(key){
        throw new Error("Not Implemented");
    }

    exists(key){
        throw new Error("Not Implemented");
    }
}

module.exports = Storage ;