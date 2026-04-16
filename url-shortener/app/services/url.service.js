const { encodeBase62 } = require("../utils/encodeBase62");

/**
 * Service layer for URL Shortener.
 *
 * Responsibilities:
 * - Generate unique short codes
 * - Interact with storage layer (Redis / DB / in-memory)
 * - Encapsulate business logic
 *
 * Note:
 * - Does NOT handle HTTP (no req/res)
 * - Storage is injected (supports multiple implementations)
 */
class UrlService {

    /**
     * @param {Object} storage - Storage implementation (must implement set, get, exists)
     */
    constructor(storage){
        this.storage = storage;

        /**
         * Counter used to generate unique IDs.
         */
        this.counter = 1;
    }

    /**
     * Creates a short URL for a given long URL.
     *
     * @param {string} longUrl - Original URL
     * @param {number|null} ttlSeconds - Optional expiry time in seconds
     * @returns {Promise<string>} Generated short code
     *
     * Flow:
     * 1. Generate unique ID using counter
     * 2. Encode ID using Base62
     * 3. Store mapping in storage layer
     */
    async createShortUrl(longUrl, ttlSeconds){
        const shortCode = encodeBase62(this.counter++);

        await this.storage.set(shortCode, longUrl, ttlSeconds);

        return shortCode;
    }

    /**
     * Retrieves the original long URL for a given short code.
     *
     * @param {string} shortCode
     * @returns {Promise<string|null>} Long URL or null if not found
     */
    async getLongUrl(shortCode){
        return await this.storage.get(shortCode);
    }

    /**
     * Checks if a short code exists in storage.
     *
     * @param {string} shortCode
     * @returns {Promise<boolean>}
     */
    async exists(shortCode){
        return await this.storage.exists(shortCode);
    }
}

module.exports = UrlService;