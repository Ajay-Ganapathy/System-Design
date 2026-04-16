const express = require("express");
const rateLimiter = require("../middlewares/rateLimiter");

/**
 * URL Routes Module
 *
 * Defines all HTTP routes related to URL shortening.
 *
 * Responsibilities:
 * - Map endpoints to controller methods
 * - Keep routing logic separate from business logic
 *
 * @param {UrlController} controller - Controller instance handling requests
 * @returns {express.Router} Configured router with URL routes
 *
 * Routes:
 * - POST   /shorten       → Create short URL
 * - GET    /info/:code    → Get URL details
 * - GET    /:code         → Redirect to original URL
 */
const urlRoutes = (controller) => {
    const router = express.Router();
    /**
     * Rate Limiter Middleware to Limit User Requests to 5 requests per minute per IP
     */
    router.use(rateLimiter);

    /**
     * Create short URL
     */
    router.post("/shorten", controller.create);

    /**
     * Get metadata for a short URL
     */
    router.get("/info/:code", controller.getInfo);

    /**
     * Redirect to original URL
     */
    router.get("/:code", controller.redirect);

    return router;
};

module.exports = urlRoutes;