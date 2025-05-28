var express = require("express");
var router = express.Router();

var authController = require("../controller/auth.controller");

// Route for user registrations
router.post("/customerregister", authController.customerRegHandle);
router.post(
  "/customerserviceregister",
  authController.customerServiceRegHandle
);
router.post(
  "/salesrepresentativeregister",
  authController.salesRepresentativeRegHandle
);
router.post("/customerimageupload", authController.customerImageUploadHandle);

// Route for updating user status
router.post("/updateuserstatus", authController.updateStatus);

// Route for user login
router.post("/login", authController.loginHandle);

module.exports = router;
