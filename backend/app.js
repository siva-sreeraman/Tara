"use strict";

const express = require("express");
var loginRouter = require("./routes/login.route");
var loginRouter = require("./routes/login.route");
var authRouter = require("./routes/auth.route");
var adminRouter = require("./routes/admin.route");
var admin = require("firebase-admin");
var companyDB = require("./routes/companyDB.route");
var projectOverview = require("./routes/projectOverview.route");
var projectCreateRoute = require("./routes/project.create.route");
const path = require('path');
const fs = require('fs');
var profile=require("./routes/profile");
var calender=require("./routes/calender");
var accessright=require("./routes/accessright");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.use(function (req, res, next) {
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
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/companydb", companyDB);
app.use("/project-overview", projectOverview);
app.use("/project-create", projectCreateRoute);
app.use("/profile",profile);
app.use("/calender",calender);
app.use("/accessright",accessright)

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
