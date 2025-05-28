const {
  Customer,
  CustomerService,
  Login,
  SalesRepresentative,
} = require("../model/auth.model");

const path = require("path");

exports.customerRegHandle = async (request, response) => {
  try {
    const register = {
      name: request.body.name,
      address: request.body.address,
      phone: request.body.phone,
      gender: request.body.gender,
      dob: request.body.dob,
    };

    // Create a new customer registration
    const newReg = await Customer.create(register);

    // Create a login entry with a reference to the customer registration
    const loginParam = {
      regId: newReg._id, // Reference to the customer registration document
      regType: "customerreg", // Specify the schema type
      email: request.body.email,
      password: request.body.password,
      usertype: 0, // Customer user type
    };

    await Login.create(loginParam);

    response.json({
      message: "Customer Registration Successful",
      customerId: newReg._id,
    });
  } catch (err) {
    console.error(err);
    response.status(500).json("Customer Registration Failed");
  }
};

exports.customerImageUploadHandle = async (req, res) => {
  try {
    // Check if the image is present in the request
    if (!req.files || !req.files.image) {
      return res.status(400).json("No image file uploaded.");
    }

    const file = req.files.image;
    const imageName = file.name;
    const imagePath = path.join(__dirname, "../asset/", imageName);

    // Move the image to the specified folder
    file.mv(imagePath, async (err) => {
      if (err) {
        return res.status(500).json("Error moving the image.");
      }

      // Update the customer's image in the database with just the image name
      const updatedCustomer = await Customer.findByIdAndUpdate(
        req.body.customerId, // Customer ID from the request body
        { image: imageName }, // Store only the image name
        { new: true } // Return the updated document
      );

      if (!updatedCustomer) {
        return res.status(404).json("Customer not found.");
      }

      // Respond with success and the image name (or file path if needed)
      res.json({ message: "Image uploaded successfully", imageName });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Error uploading image.");
  }
};

exports.customerServiceRegHandle = async (request, response) => {
  try {
    const register = {
      name: request.body.name,
      phone: request.body.phone,
      employeeId: request.body.employeeId,
      workLocation: request.body.workLocation,
      shiftTiming: request.body.shiftTiming,
      workType: request.body.workType,
      status: request.body.status,
    };

    // Create a new customer service registration
    const newReg = await CustomerService.create(register);

    // Create a login entry with a reference to the customer service registration
    const loginParam = {
      regId: newReg._id, // Reference to the customer service registration document
      regType: "customerservicereg", // Specify the schema type
      email: request.body.email,
      password: request.body.password,
      usertype: 1, // Customer service user type
    };

    await Login.create(loginParam);

    response.json("Customer Service Registration Successful");
  } catch (err) {
    console.error(err);
    response.status(500).json("Customer Service Registration Failed");
  }
};

exports.salesRepresentativeRegHandle = async (request, response) => {
  try {
    const register = {
      name: request.body.name,
      phone: request.body.phone,
      employeeId: request.body.employeeId,
      workLocation: request.body.workLocation,
      commissionRate: request.body.commissionRate,
      workType: request.body.workType,
      status: request.body.status || "approved", // Default status is 'approved'
    };

    // Create a new sales representative registration
    const newReg = await SalesRepresentative.create(register);

    // Create a login entry with a reference to the sales representative registration
    const loginParam = {
      regId: newReg._id, // Reference to the sales representative registration document
      regType: "salesrepresentativereg", // Specify the schema type
      email: request.body.email, // Email is stored only in the login schema
      password: request.body.password,
      usertype: 2, // Sales representative user type
    };

    await Login.create(loginParam);

    response.json("Sales Representative Registration Successful");
  } catch (err) {
    console.error(err);
    response.status(500).json("Sales Representative Registration Failed");
  }
};

exports.updateStatus = async (request, response) => {
  try {
    const { _id, status } = request.body;

    // Find the login document by ID
    const login = await Login.findById(_id).populate("regId");

    if (!login) {
      response.json("User not found");
      return;
    }

    // Update the status in the referenced collection based on regType
    if (login.regType === "customerservicereg") {
      await CustomerService.findByIdAndUpdate(login.regId._id, { status });
    } else if (login.regType === "salesrepresentativereg") {
      await SalesRepresentative.findByIdAndUpdate(login.regId._id, { status });
    } else if (login.regType === "customerreg") {
      await Customer.findByIdAndUpdate(login.regId._id, { status });
    } else {
      response.json("Invalid user type");
      return;
    }

    response.json("Status updated successfully");
  } catch (err) {
    console.error(err);
    response.json("Error updating status");
  }
};

exports.loginHandle = async (request, response) => {
  try {
    const param = {
      email: request.body.email,
      password: request.body.password,
    };

    // Find the user by email
    const user = await Login.findOne({ email: param.email }).populate("regId");

    if (user) {
      // Check if the password matches
      if (user.password === param.password) {
        // Check if the usertype is valid
        if (user.usertype === 0 || user.usertype === 1 || user.usertype === 2) {
          // For usertype 1 (Customer Service) and 2 (Sales Representative), check the status
          if (
            (user.usertype === 1 || user.usertype === 2) &&
            user.regId.status !== "approved"
          ) {
            return response.status(403).json("Your account is not approved.");
          }

          // Allow login for valid users
          request.session.user = user;
          return response.json(user);
        } else {
          console.log("Invalid Usertype");
          return response.status(403).json("Invalid Usertype");
        }
      } else {
        console.log("Invalid Password");
        return response.status(401).json("Invalid Password");
      }
    } else {
      console.log("Invalid Email");
      return response.status(401).json("Invalid Email");
    }
  } catch (err) {
    console.error("Login Failed:", err);
    return response.status(500).json("Login Failed");
  }
};
