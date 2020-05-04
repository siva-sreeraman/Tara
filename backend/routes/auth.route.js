const fileUploadController = require("../controllers/file-upload.controller");
var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
const query = require("../helpers/query");
const Constants = require("../helpers/constants");

router.post("/registration", async function (req, res, next) {
  let status = "pending";
  let result = null;
  const { uid, name, email, password, companyName, persona } = req.body;

  constructedQuery = `select * from companies where name="${companyName}"`;
  companyResult = await query(pool, constructedQuery, [
    uid,
    name,
    email,
    password,
    companyName,
    status,
  ]).catch(console.log);

  if (Constants.Role.Admin === persona) {
    if (companyResult.length == 1) {
      status = "pendingByCompanyAdmin";
      constructedQuery = `INSERT INTO admin (uid, name, email, password, company_name, status, company_id) VALUES (?,?,?,?,?,?,?)`;
      result = await query(pool, constructedQuery, [
        uid,
        name,
        email,
        password,
        companyName,
        status,
        companyResult[0].id,
      ]).catch(console.log);
    } else {
      status = "pendingBySuperUser";
      constructedQuery = `INSERT INTO admin (uid, name, email, password, company_name, status) VALUES (?,?,?,?,?,?)`;
      result = await query(pool, constructedQuery, [
        uid,
        name,
        email,
        password,
        companyName,
        status,
      ]).catch(console.log);
    }
  } else {
    if (companyResult.length == 1) {
      constructedQuery = `INSERT INTO users (uid, name, email, password, company_name, status, company_id) VALUES (?,?,?,?,?,?,?)`;
      result = await query(pool, constructedQuery, [
        uid,
        name,
        email,
        password,
        companyName,
        status,
        companyResult[0].id,
      ]).catch(console.log);
    } else {
      res.status(200).send("This company does not exit");
    }
  }
  res.status(201).send(result);
});

router.post("/login", async function (req, res, next) {
  let result = null;
  const { uid, persona } = req.body;
  let tableName = "";
  if (Constants.Role.Admin === persona) {
    tableName = Constants.Role.Admin;
    constructedQuery = `select id as userid, uid, name, profile_pic, company_id, status from ${tableName} where uid="${uid}"`;
  } else {
    tableName = "users";
    constructedQuery = `select userid, uid, name, profile_pic, company_id, status from ${tableName} where uid="${uid}"`;
  }

  result = await query(pool, constructedQuery).catch(console.log);

  res.status(200).send(result);
});

module.exports = router;
