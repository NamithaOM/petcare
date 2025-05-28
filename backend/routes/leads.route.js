
var express = require("express");
var router = express.Router();
var leadController = require("../controller/leads.controller");

router.post("/create", leadController.createLead);

module.exports = router;