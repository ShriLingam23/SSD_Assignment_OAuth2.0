"use strict";

var path = require("path"),
  bodyParser = require("body-parser"),
  express = require("express"),
  session = require("express-session"),
  morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// session
app.use(
  session({
    secret: "notasecret",
    resave: true,
    saveUninitialized: true,
  })
);

// drive authentication and upload api
var driveApi = require("./drive.controller.js");
app.use("/api", driveApi);

// joinin =g the frontend with the backend to run as one bundle
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// server start
app.listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  //  Print the port number where server is running.
  console.log("Server running on port " + port);
});
