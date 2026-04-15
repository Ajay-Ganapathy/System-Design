/**
 * URL Shortener Service (In-Memory Version)
 *
 * Features:
 * - Create short URLs using Base62 encoding
 * - Redirect short URLs to original URLs
 * - Fetch URL details
 *
 * Note:
 * - Uses in-memory storage (Map)
 * - Data will be lost on server restart
 */

const express = require('express');
const app = express();

const { encodeBase62 } = require("./utils/encodeBase62");

app.use(express.json());

/**
 * Counter used to generate unique IDs for URLs.
 * Incremented for every new URL.
 */
let counter = 1;

/**
 * In-memory storage for URL mappings.
 * Key: shortCode
 * Value: long_url
 */
const urlMap = new Map();


/**
 * POST /shorten
 *
 * Creates a shortened URL for a given long URL.
 *
 * Request Body:
 * {
 *   "long_url": "https://example.com"
 * }
 *
 * Response:
 * {
 *   "short_code": "abc123",
 *   "short_url": "http://localhost:3000/abc123"
 * }
 *
 * Errors:
 * - 400: If long_url is missing
 */
app.post("/shorten", (req, res) => {
    const { long_url } = req.body;

    if (!long_url) {
        return res.status(400).json({ error: "long_url required" });
    }

    // Generate unique short code using Base62 encoding
    const shortCode = encodeBase62(counter++);

    // Store mapping in memory
    urlMap.set(shortCode, long_url);

    // Dynamically construct base URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return res.status(201).json({
        short_code: shortCode,
        short_url: `${baseUrl}/${shortCode}`
    });
});

/**
 * GET /info/:code
 *
 * Retrieves details of a shortened URL.
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
 * - 404: If short URL not found
 */
app.get("/info/:code", (req, res) => {
    const shortCode = req.params.code;

    if (!urlMap.has(shortCode)) {
        return res.status(404).send("URL Not Found");
    }

    const long_url = urlMap.get(shortCode);

    return res.status(200).json({
        short_code: shortCode,
        long_url: long_url
    });
});



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
 * - 404: If short URL not found
 */
app.get("/:code", (req, res) => {
    const shortCode = req.params.code;

    if (!urlMap.has(shortCode)) {
        return res.status(404).send("Not Found");
    }

    // Redirect to original URL
    return res.redirect(urlMap.get(shortCode));
});



/**
 * Start the server on port 3000
 */
app.listen(3000, () => {
    console.log("URL Shortener running on port 3000...");
});