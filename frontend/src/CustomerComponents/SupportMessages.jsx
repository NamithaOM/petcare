import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/SupportMessages.css";

const SupportMessages = () => {
  const { state } = useLocation();
  const { ticketId, customerId, supportId } = state || {};

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch all past messages on mount (customer POV)
  useEffect(() => {
    const fetchMessages = async () => {
      if (!ticketId) {
        setError("No ticket ID provided");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:4000/messages/get/${ticketId}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          setError(`Error: ${errorData.error || res.statusText}`);
          return;
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          const formatted = data.map((msg) => ({
            text: msg.message,
            // For customer POV: customer's messages on right, support's on left
            side: msg.sender === "customer" ? "right" : "left",
          }));
          setMessages(formatted);
        } else {
          console.error("Unexpected response format:", data);
          setError("Unexpected response format from server");
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(`Failed to fetch messages: ${err.message}`);
      }
    };

    fetchMessages();
  }, [ticketId]);

  // Send a new message
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!ticketId || !customerId || !supportId) {
      setError(
        "Missing data for submission. Please check ticket, customer, and support IDs."
      );
      return;
    }

    const payload = {
      ticketId,
      customerId,
      supportId,
      message: inputValue,
      sender: "customer", // Explicitly set sender as customer
    };

    try {
      const res = await fetch("http://localhost:4000/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(
          `Failed to send message: ${errorData.error || res.statusText}`
        );
        return;
      }

      // Append locally as customer's own message (right)
      setMessages((prev) => [...prev, { text: inputValue, side: "right" }]);
      setInputValue("");
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error while sending message:", err);
      setError(`Error sending message: ${err.message}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat_window">
      <div className="top_menu">
        <div className="title text-black">Auto Lead Customer Support</div>
        {error && <div className="error text-red-500">{error}</div>}
      </div>

      <ul className="messages">
        {messages.map((msg, i) => (
          <li key={i} className={`message ${msg.side} appeared`}>
            <div className="text_wrapper">
              <div className="text text-black">{msg.text}</div>
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <div className="bottom_wrapper clearfix">
        <div className="message_input_wrapper">
          <input
            className="message_input"
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
        <div className="send_message" onClick={sendMessage}>
          <div className="icon" />
          <div className="text">Send</div>
        </div>
      </div>
    </div>
  );
};

export default SupportMessages;
