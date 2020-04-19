var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
var admin = require("firebase-admin");

router.get("/alllocations", async (request, response) => {
  try {
    const dbquery = "select * from location ";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/allactors", async (request, response) => {
  try {
    const dbquery = "select * from cast";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/allcostumes", async (request, response) => {
  try {
    const dbquery = "select * from costume ";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/allusers", async (request, response) => {
  try {
    const dbquery = "select * from users ";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/getcrewlist", async function (req, res) {
  console.log("Inside  getcrewlist ");

  // const getcast = 'SELECT users.*, crew.* FROM users INNER JOIN crew ON crew.fk_userid=users.userid';
  const getcast =
    "SELECT users.*, crew.* FROM users INNER JOIN crew ON crew.fk_userid=users.userid";
  pool.query(getcast, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log("crew does not exist");
      res.status(400).send("crew does not exist");
    }
  });
});

module.exports = router;
