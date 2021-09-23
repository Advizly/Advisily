const express = require("express");
const router = express.Router();

const controller = require("./standings.controller");

router.get("/", controller.getStandings);

module.exports = router;
