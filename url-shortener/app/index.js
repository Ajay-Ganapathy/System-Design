const express = require("express");
const app = express();

const InMemoryStorage = require("./storage/inMemory.storage");
const UrlService = require("./services/url.service");
const UrlController = require("./controllers/url.controller");
const urlRoutes = require("./routes/url.routes");

app.use(express.json())

const storage = new InMemoryStorage();
const service = new UrlService(storage);
const controller = new UrlController(service);


app.use("/" , urlRoutes(controller));

app.listen(3000, () => {
    console.log("URL Shortener is running successfully...")
})