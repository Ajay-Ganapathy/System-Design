/**
 * Controller layer for URL Shortener.
 *
 * Responsibilities:
 * - Handle HTTP requests/responses
 * - Validate input
 * - Call service layer for business logic
 * - Format API responses
 *
 * Note:
 * - Does NOT contain business logic
 * - Delegates work to UrlService
 */
class UrlContoller {
    /**
     * @param {UrlService} service - Service layer instance
     */
    constructor(service){
        this.service = service;
    }

    /**
     * POST /shorten
     *
     * Creates a shortened URL for a given long URL.
     *
     * Request Body:
     * {
     *   "long_url": "https://example.com",
     *   "ttl": 60   // optional (seconds)
     * }
     *
     * Response:
     * {
     *   "short_code": "abc123",
     *   "short_url": "http://host/abc123"
     * }
     *
     * Errors:
     * - 400: Missing long_url
     */
    create = async (req, res) => {
        const { long_url, ttl } = req.body;

        if (!long_url) {
            return res.status(400).json({ error: "long_url required" });
        }

        // Convert TTL to seconds (if provided)
        const ttlSeconds = ttl ? parseInt(ttl) : null;

        // Generate short code via service layer
        const shortCode = await this.service.createShortUrl(long_url, ttlSeconds);

        // Construct base URL dynamically
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        return res.status(201).json({
            short_code: shortCode,
            short_url: `${baseUrl}/${shortCode}`
        });
    };


    /**
     * GET /:code
     *
     * Redirects a short URL to the original long URL.
     *
     * Path Params:
     * - code: Short URL identifier
     *
     * Response:
     * - 302 Redirect to original URL
     *
     * Errors:
     * - 404: If short URL does not exist
     */
    redirect = async (req, res) => {
        const { code } = req.params;

        // Check existence
        if (!(await this.service.exists(code))) {
            return res.status(404).send("Not Found");
        }

        const longUrl = await this.service.getLongUrl(code);

        // Perform HTTP redirect
        return res.redirect(longUrl);
    };


    /**
     * GET /info/:code
     *
     * Fetches details of a shortened URL.
     *
     * Path Params:
     * - code: Short URL identifier
     *
     * Response:
     * {
     *   "short_code": "abc123",
     *   "long_url": "https://example.com"
     * }
     *
     * Errors:
     * - 404: If short URL does not exist
     */
    getInfo = async (req, res) => {
        const { code } = req.params;

        // Check existence
        if (!(await this.service.exists(code))) {
            return res.status(404).send("Not Found");
        }

        const long_url = await this.service.getLongUrl(code);

        return res.json({
            short_code: code,
            long_url: long_url
        });
    };
}

module.exports = UrlContoller;