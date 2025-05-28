var express = require("express");
var router = express.Router();

var fetchController = require("../controller/fetch.controller");

// Route for fetching registration data
router.get("/customerregister", fetchController.fetchCustomerRegData);
router.get(
  "/customerserviceregister",
  fetchController.fetchCustomerServiceRegData
);
router.get(
  "/salesrepresentativeregister",
  fetchController.fetchSalesRepresentativeRegData
);

// Route for fetching user approval data
router.get("/approvalusers", fetchController.fetchApprovalUsers);

// Route for deleting users
router.post("/deletecustomer", fetchController.deleteCustomer);
router.post("/deletecustomerservice", fetchController.deleteCustomerService);
router.post(
  "/deletesalesrepresentative",
  fetchController.deleteSalesRepresentative
);

// Route for updating users
router.post(
  "/updatecustomerservicedetails",
  fetchController.updateCustomerServiceDetails
);
router.post(
  "/updatesalesrepresentativedetails",
  fetchController.updateSalesRepresentativeDetails
);
router.post("/updatecustomerdetails", fetchController.updateCustomerDetails);
router.post(
  "/customereditimageupload",
  fetchController.customerEditImageUploadHandle
);
router.post(
  "/customerserviceeditimageupload",
  fetchController.customerServiceEditImageUploadHandle
);
router.post(
  "/salesrepresentativeeditimageupload",
  fetchController.salesRepresentativeEditImageUploadHandle
);

module.exports = router;
