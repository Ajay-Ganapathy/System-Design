const express = require("express");
const app = express();

const InMemoryStorage = require("./storage/inMemory.storage");
const RedisStorage = require("./storage/redis.storage");
const UrlService = require("./services/url.service");
const UrlController = require("./controllers/url.controller");
const urlRoutes = require("./routes/url.routes");

/**
 * Main application entry point.
 *
 * Responsibilities:
 * - Initialize Express app
 * - Configure middleware
 * - Wire up dependencies (storage → service → controller)
 * - Register routes
 * - Start HTTP server
 */

app.use(express.json());

/**
 * Dependency Injection Setup
 *
 * Choose storage implementation:
 * - InMemoryStorage → for testing / local development
 * - RedisStorage → for distributed, scalable setup
 *
 * This allows swapping storage without changing business logic.
 */
const storage = new RedisStorage();
// const storage = new InMemoryStorage(); // alternative

/**
 * Initialize service layer with storage dependency
 */
const service = new UrlService(storage);

/**
 * Initialize controller layer with service dependency
 */
const controller = new UrlController(service);

/**
 * Register routes
 *
 * All URL-related routes are mounted at root "/"
 */
app.use("/", urlRoutes(controller));

/**
 * Start server
 */
app.listen(3000, () => {
    console.log("URL Shortener is running successfully on port 3000...");
});