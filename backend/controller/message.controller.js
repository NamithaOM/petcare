const { Message } = require("../model/message.model");

// Send a message
exports.sendMessage = async (req, res) => {
  const { ticketId, customerId, supportId, message, sender } = req.body;

  if (!ticketId || !customerId || !supportId || !message || !sender) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newMessage = new Message({
      ticketId,
      customerId,
      supportId,
      message,
      sender,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({
      message: "Message sent successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error while sending message:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all messages for a specific ticket
exports.getMessagesByTicket = async (req, res) => {
  const { ticketId } = req.params;

  if (!ticketId) {
    return res.status(400).json({ error: "ticketId is required." });
  }

  try {
    const messages = await Message.find({ ticketId })
      .sort({ createdAt: 1 }) // oldest first
      .populate("customerId")
      .populate("supportId");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error while fetching messages:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
