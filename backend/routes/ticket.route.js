var express = require("express");
var router = express.Router();

var ticketController = require("../controller/ticket.controller");

// Route for handling contact form submission
router.post("/uploadticket", ticketController.supportTicketHandle);
router.get("/getalltickets", ticketController.getAllTickets);
router.post("/accept", ticketController.acceptTicket);
router.post("/resolve", ticketController.resolveTicket);
router.post("/reject", ticketController.rejectTicket);
router.post("/returntopending", ticketController.returnTicketToPending);

module.exports = router;
