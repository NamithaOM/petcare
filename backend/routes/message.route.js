var express = require("express");
var router = express.Router();

var messageController = require("../controller/message.controller");

router.post("/send", messageController.sendMessage);
router.get("/get/:ticketId", messageController.getMessagesByTicket);

module.exports = router;
