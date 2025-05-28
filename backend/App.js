var express = require("express");
var cors = require("cors");
var session = require("express-session");
var fileUpload = require("express-fileupload");
var app = express();

// 1. CORS first
app.use(cors());

// 2. Session middleware (if needed)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// 3. Body parsers (replace body-parser with Express built-ins)
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded

// 4. File upload middleware
app.use(fileUpload()); // Add this for image uploads

// 5. Serve static files
app.use(express.static("asset"));

// 6. Database connection
var database = require("./config/database");
database();

// 7. Mount routers LAST
const authRouter = require("./routes/auth.route");
const fetchRouter = require("./routes/fetch.route");
const contactRouter = require("./routes/contact.route");
const ticketRouter = require("./routes/ticket.route");
const messageRouter = require("./routes/message.route");
const leadRouter = require ("./routes/leads.route");

app.use("/auth", authRouter);
app.use("/fetch", fetchRouter);
app.use("/contact", contactRouter);
app.use("/ticket", ticketRouter);
app.use("/messages", messageRouter);
app.use("/lead",leadRouter);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
