const { Contact } = require("../model/contact.model");

exports.contactHandle = async (request, response) => {
  try {
    const contactData = {
      name: request.body.name,
      email: request.body.email,
      subject: request.body.subject,
      message: request.body.message,
    };

    await Contact.create(contactData);

    return response
      .status(201)
      .json({ message: "Contact message saved successfully" });
  } catch (err) {
    console.error("Contact Failed:", err);
    return response.status(500).json({ error: "Contact Failed" });
  }
};

exports.getAllContacts = async (request, response) => {
  try {
    let data = await Contact.find();

    console.log(data);

    response.json(data);
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
    return response.status(500).json({ error: "Failed to fetch contacts" });
  }
};

exports.acceptEnquiry = async (req, res) => {
  try {
    const { contactId, userId } = req.body;

    // Find the enquiry and update status and acceptedBy field
    const updatedEnquiry = await Contact.findByIdAndUpdate(
      contactId,
      {
        status: "accepted",
        acceptedBy: userId,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json(updatedEnquiry);
  } catch (error) {
    console.error("Error accepting enquiry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to handle resolving an enquiry
exports.resolveEnquiry = async (req, res) => {
  try {
    const { contactId } = req.body;

    // Find the enquiry and update status
    const updatedEnquiry = await Contact.findByIdAndUpdate(
      contactId,
      {
        status: "resolved",
      },
      { new: true } // Return the updated document
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json(updatedEnquiry);
  } catch (error) {
    console.error("Error resolving enquiry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to handle rejecting an enquiry
exports.rejectEnquiry = async (req, res) => {
  try {
    const { contactId } = req.body;

    // Find the enquiry and update status
    const updatedEnquiry = await Contact.findByIdAndUpdate(
      contactId,
      {
        status: "rejected",
      },
      { new: true } // Return the updated document
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json(updatedEnquiry);
  } catch (error) {
    console.error("Error rejecting enquiry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.returnEnquiryToPending = async (req, res) => {
  try {
    const { contactId, userId } = req.body;

    // Find the enquiry and update status and acceptedBy field
    const updatedEnquiry = await Contact.findByIdAndUpdate(
      contactId,
      {
        status: "pending",
        acceptedBy: null,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json(updatedEnquiry);
  } catch (error) {
    console.error("Error returning enquiry to pending:", error);
    res.status(500).json({ message: "Server error" });
  }
};
