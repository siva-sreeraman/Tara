"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var loginRouter = require("./routes/login.route");
var admin = require("firebase-admin");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = 4000;

// const dbConfig = require("./dbConfig");

// const connection = require("./helpers/connection");
// const query = require("./helpers/query");

app.use("/login", loginRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
