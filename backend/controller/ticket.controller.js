const { Ticket } = require("../model/ticket.model");

exports.supportTicketHandle = async (request, response) => {
  try {
    const ticketData = {
      userId: request.body.userId,
      name: request.body.name,
      email: request.body.email,
      subject: request.body.subject,
      category: request.body.category,
      priority: request.body.priority,
      message: request.body.message,
      // Add any other fields like user details, if necessary
    };

    // Assuming you have a SupportTicket model
    await Ticket.create(ticketData);

    return response
      .status(201)
      .json({ message: "Support ticket submitted successfully" });
  } catch (err) {
    console.error("Support Ticket Submission Failed:", err);
    return response
      .status(500)
      .json({ error: "Failed to submit support ticket" });
  }
};

exports.getAllTickets = async (request, response) => {
  try {
    let data = await Ticket.find().populate("acceptedBy"); // Fetch all tickets from the database

    console.log(data);

    response.json(data); // Send the fetched tickets as a JSON response
  } catch (err) {
    console.error("Failed to fetch tickets:", err);
    return response.status(500).json({ error: "Failed to fetch tickets" });
  }
};

exports.acceptTicket = async (req, res) => {
  try {
    const { ticketId, userId } = req.body;

    // Find the enquiry and update status and acceptedBy field
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "accepted",
        acceptedBy: userId,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error accepting Ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resolveTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: "resolved" },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error resolving ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to handle rejecting a ticket
exports.rejectTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error rejecting ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to handle returning a ticket to pending status
exports.returnTicketToPending = async (req, res) => {
  try {
    const { ticketId } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "pending",
        acceptedBy: null,
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error returning ticket to pending:", error);
    res.status(500).json({ message: "Server error" });
  }
};
