import React, { useEffect, useState } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";

export default function Feedbacks() {
  const [feedback, setFeedback] = useState([]);
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetch(baseUrl + "feedback/view/")
      .then((res) => res.json())
      .then((data) => setFeedback(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);
  const handleReplySubmit = (id, index) => {
    fetch(`${baseUrl}feedback/reply/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include CSRF token if needed, depending on your setup
      },
      body: JSON.stringify({ reply: replyText }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Reply submitted successfully");
        // Update UI after reply
        const updatedFeedback = [...feedback];
        updatedFeedback[index].status = "1";
        updatedFeedback[index].reply = replyText;
        setFeedback(updatedFeedback);
        setReplyIndex(null);
        setReplyText("");
      })
      .catch((err) => {
        console.error("Error submitting reply:", err);
        alert("Failed to submit reply");
      });
  };
  

  return (
    <>
      <div id="wrapper">
        <Sidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Feedback List</h1>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Reply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedback.length > 0 ? (
                        feedback.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.subject}</td>
                            <td
                              style={{
                                maxWidth: "150px",  // control message box height
                                overflowY: "auto",   // scroll only if needed
                                wordWrap: "break-word",  // wrap long words
                              }}
                            >
                                {item.message}</td>
                            <td>
                              {item.status == 0 ? (
                                replyIndex === index ? (
                                  <>
                                    <textarea
                                      className="form-control mb-2"
                                      rows="2"
                                      value={replyText}
                                      onChange={(e) =>
                                        setReplyText(e.target.value)
                                      }
                                    />
                                    <button
                                      className="btn btn-success btn-sm"
                                      onClick={() =>
                                        handleReplySubmit(item.id, index)
                                      }
                                    >
                                      Send
                                    </button>
                                    <button
                                      className="btn btn-secondary btn-sm ml-2"
                                      onClick={() => {
                                        setReplyIndex(null);
                                        setReplyText("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      setReplyIndex(index);
                                      setReplyText(""); // or prefill with existing if needed
                                    }}
                                  >
                                    Reply
                                  </button>
                                )
                              ) : (
                               " Replied"
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No feedback found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
