const { Lead } = require("../model/leads.model");


exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, source, status, notes, assignedTo } = req.body;

    // Create the lead object
    const newLead = await Lead.create({
      name,
      email,
      phone,
      source,
      status,
      notes,
      assignedTo: assignedTo || null, // Optional field
    });

    res.status(201).json({
      message: "Lead created successfully",
      leadId: newLead._id,
    });
  } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({
      message: "Failed to create lead",
      error: err.message,
    });
  }
};