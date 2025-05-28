var express = require("express");
var router = express.Router();

var contactController = require("../controller/contact.controller");

// Route for handling contact form submission
router.post("/addcontact", contactController.contactHandle);
router.get("/getallcontact", contactController.getAllContacts);
router.post("/accept", contactController.acceptEnquiry);
router.post("/resolve", contactController.resolveEnquiry);
router.post("/reject", contactController.rejectEnquiry);
router.post("/returntopending", contactController.returnEnquiryToPending);

module.exports = router;
