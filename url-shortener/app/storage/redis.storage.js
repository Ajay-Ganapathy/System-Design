const Storage = require("./storage.interface");
const redis = require("../config/redis");

/**
 * Redis-based storage implementation
 *
 * Stores:
 * key   → shortCode
 * value → long_url
 */

class RedisStorage extends Storage{
    /**
   * Store key-value pair in Redis
   * @param {string} key
   * @param {string} value
   */

    async set(key ,value){
        await redis.set(key , value );
    }

    /**
   * Get value by key
   * @param {string} key
   * @returns {Promise<string|null>}
   */

    async get(key){
       
       return await redis.get(key);
    }

    /**
   * Check if key exists
   * @param {string} key
   * @returns {Promise<boolean>}
   */

    async exists(key){
        const result = await redis.exists(key);
        return result === 1;
    }
}

module.exports = RedisStorage;