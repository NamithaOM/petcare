const {
  Login,
  Customer,
  CustomerService,
  SalesRepresentative,
} = require("../model/auth.model");

const path = require("path");

exports.fetchCustomerRegData = async (request, response) => {
  try {
    let data = await Login.find({ usertype: 0 }).populate("regId");

    console.log(data);

    response.json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchCustomerServiceRegData = async (request, response) => {
  try {
    let data = await Login.find({ usertype: 1 }).populate("regId");

    console.log(data);

    response.json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchSalesRepresentativeRegData = async (request, response) => {
  try {
    let data = await Login.find({ usertype: 2 }).populate("regId");

    console.log(data);

    response.json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCustomer = async (request, response) => {
  try {
    const { regId } = request.body; // `regId` is the ID of the customer in the `customerreg` table

    // Delete the customer from the `customerreg` collection
    await Customer.findByIdAndDelete(regId);

    // Delete the corresponding login entry from the `login` collection
    await Login.findOneAndDelete({ regId: regId });

    response.json({ message: "Customer and login data deleted successfully" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to delete customer data" });
  }
};

exports.deleteCustomerService = async (request, response) => {
  try {
    const { regId } = request.body; // `regId` is the ID of the customer in the `customerreg` table

    // Delete the customer from the `customerreg` collection
    await CustomerService.findByIdAndDelete(regId);

    // Delete the corresponding login entry from the `login` collection
    await Login.findOneAndDelete({ regId: regId });

    response.json({
      message: "Customer Service and login data deleted successfully",
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to delete customer data" });
  }
};

exports.deleteSalesRepresentative = async (request, response) => {
  try {
    const { regId } = request.body; // `regId` is the ID of the customer in the `customerreg` table

    // Delete the customer from the `customerreg` collection
    await SalesRepresentative.findByIdAndDelete(regId);

    // Delete the corresponding login entry from the `login` collection
    await Login.findOneAndDelete({ regId: regId });

    response.json({
      message: "Customer Service and login data deleted successfully",
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to delete customer data" });
  }
};

exports.fetchApprovalUsers = async (request, response) => {
  try {
    // Fetch users with usertype 1 (Customer Service) and 2 (Sales Representative)
    const users = await Login.find({ usertype: { $in: [1, 2] } }).populate(
      "regId"
    );

    console.log(users); // Log the fetched data for debugging
    response.json(users); // Send the data as a JSON response
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Failed to fetch user data" });
  }
};

exports.updateCustomerServiceDetails = async (req, res) => {
  try {
    const { id, name, phone, workLocation, additionalField } = req.body;

    // Find the login document by ID and populate the regId
    const login = await Login.findById(id).populate("regId");

    if (!login || login.regType !== "customerservicereg") {
      return res
        .status(404)
        .json({ success: false, message: "Customer Service user not found" });
    }

    // Update the customer service details
    const updatedCustomerService = await CustomerService.findByIdAndUpdate(
      login.regId._id,
      { name, phone, workLocation, shiftTiming: additionalField }, // Map additionalField to shiftTiming
      { new: true } // Return the updated document
    );

    res.json({
      success: true,
      message: "Customer Service details updated successfully",
      data: updatedCustomerService,
    });
  } catch (err) {
    console.error("Error updating Customer Service details:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update Customer Service details",
    });
  }
};

exports.updateSalesRepresentativeDetails = async (req, res) => {
  try {
    const { id, name, phone, workLocation, additionalField } = req.body;

    // Find the login document by ID and populate the regId
    const login = await Login.findById(id).populate("regId");

    if (!login || login.regType !== "salesrepresentativereg") {
      return res.status(404).json({
        success: false,
        message: "Sales Representative user not found",
      });
    }

    // Update the sales representative details
    const updatedSalesRep = await SalesRepresentative.findByIdAndUpdate(
      login.regId._id,
      { name, phone, workLocation, commissionRate: additionalField }, // Map additionalField to commissionRate
      { new: true } // Return the updated document
    );

    res.json({
      success: true,
      message: "Sales Representative details updated successfully",
      data: updatedSalesRep,
    });
  } catch (err) {
    console.error("Error updating Sales Representative details:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update Sales Representative details",
    });
  }
};

exports.updateCustomerDetails = async (req, res) => {
  try {
    const { id, name, address, phone, gender, dob } = req.body;

    const login = await Login.findById(id).populate("regId");

    if (!login || login.regType !== "customerreg") {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      login.regId._id,
      { name, address, phone, gender, dob },
      { new: true }
    );

    res.json({
      success: true,
      message: "Customer details updated successfully",
      data: updatedCustomer,
    });
  } catch (err) {
    console.error("Error updating customer details:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update customer details",
    });
  }
};

exports.customerEditImageUploadHandle = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json("No image file uploaded.");
    }

    const file = req.files.image;
    const imageName = file.name;
    const imagePath = path.join(__dirname, "../asset/", imageName);

    file.mv(imagePath, async (err) => {
      if (err) {
        console.error("Error moving image:", err); // Add this for better logging
        return res.status(500).json("Error moving the image.");
      }

      try {
        const login = await Login.findById(req.body.loginId).populate("regId");

        if (!login || login.regType !== "customerreg") {
          return res.status(404).json("Customer login not found.");
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
          login.regId._id,
          { image: imageName },
          { new: true }
        );

        if (!updatedCustomer) {
          return res.status(404).json("Customer not found.");
        }

        return res.json({ message: "Image uploaded successfully", imageName });
      } catch (innerErr) {
        console.error("Database error during image update:", innerErr);
        return res.status(500).json("Failed to update customer image.");
      }
    });
  } catch (err) {
    console.error("Outer image upload error:", err);
    return res.status(500).json("Error uploading image.");
  }
};

exports.customerServiceEditImageUploadHandle = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json("No image file uploaded.");
    }

    const file = req.files.image;
    const imageName = file.name;
    const imagePath = path.join(__dirname, "../asset/", imageName);

    file.mv(imagePath, async (err) => {
      if (err) {
        console.error("Error moving image:", err);
        return res.status(500).json("Error moving the image.");
      }

      try {
        const login = await Login.findById(req.body.loginId).populate("regId");

        if (!login || login.regType !== "customerservicereg") {
          return res.status(404).json("Customer Service login not found.");
        }

        const updated = await CustomerService.findByIdAndUpdate(
          login.regId._id,
          { image: imageName },
          { new: true }
        );

        if (!updated) {
          return res.status(404).json("Customer Service not found.");
        }

        return res.json({ message: "Image uploaded successfully", imageName });
      } catch (innerErr) {
        console.error("Database error during image update:", innerErr);
        return res.status(500).json("Failed to update image.");
      }
    });
  } catch (err) {
    console.error("Outer image upload error:", err);
    return res.status(500).json("Error uploading image.");
  }
};

exports.salesRepresentativeEditImageUploadHandle = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json("No image file uploaded.");
    }

    const file = req.files.image;
    const imageName = file.name;
    const imagePath = path.join(__dirname, "../asset/", imageName);

    file.mv(imagePath, async (err) => {
      if (err) {
        console.error("Error moving image:", err);
        return res.status(500).json("Error moving the image.");
      }

      try {
        const login = await Login.findById(req.body.loginId).populate("regId");

        if (!login || login.regType !== "salesrepresentativereg") {
          return res.status(404).json("Sales Representative login not found.");
        }

        const updated = await SalesRepresentative.findByIdAndUpdate(
          login.regId._id,
          { image: imageName },
          { new: true }
        );

        if (!updated) {
          return res.status(404).json("Sales Representative not found.");
        }

        return res.json({ message: "Image uploaded successfully", imageName });
      } catch (innerErr) {
        console.error("Database error during image update:", innerErr);
        return res.status(500).json("Failed to update image.");
      }
    });
  } catch (err) {
    console.error("Outer image upload error:", err);
    return res.status(500).json("Error uploading image.");
  }
};
