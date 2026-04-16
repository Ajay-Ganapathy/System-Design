const express = require("express");

const urlRoutes = (controller) => {
    const router = express.Router();
    router.post("/shorten", controller.create);
    router.get("/info/:code", controller.getInfo);
    router.get("/:code", controller.redirect);

  return router;
}

module.exports = urlRoutes;