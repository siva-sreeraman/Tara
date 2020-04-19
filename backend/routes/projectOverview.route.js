var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
var admin = require("firebase-admin");

router.get("/getusers", async function (req, res) {
  console.log("Inside  getusers ");

  const getcast = "SELECT * FROM users";
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

router.post("/addusergroup", async (request, response) => {
  try {
    console.log("Inside  addusergroup ");
    console.log("ugname is", request.body.ugname);
    const addug =
      "insert into `usergroups`(`UserGroup`) VALUES ('" +
      request.body.ugname +
      "')";

    await pool.query(addug, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send("UserGroup Added Successfully");
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

router.get("/getcast", async function (req, res) {
  console.log("Inside  getcast ");
  // const getcast = 'SELECT users.*, cast.* FROM users  JOIN cast ON cast.fk_userid=users.userid';

  // const getcast = 'select * from cast';
  const getcast =
    "SELECT users.*, cast.*,cast.name FROM users INNER JOIN cast ON cast.fk_userid=users.userid";

  pool.query(getcast, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      console.log("results", result);
      res.status(200).send(result);
    } else {
      console.log("cast does not exist");
      res.status(400).send("cast does not exist");
    }
  });
});

router.get("/getcharactertable", async function (req, res) {
  console.log("Inside  getcharactertable ");

  const getcharactertable = "select * from charactertable";
  pool.query(getcharactertable, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      console.log("characters", result);
      res.status(200).send(result);
    } else {
      console.log("user groups does not exist");
      res.status(400).send("user groups does not exist");
    }
  });
});

router.get("/getusergroups", async function (req, res) {
  console.log("Inside get all user groups ");

  const getallusergroups = "select * from usergroups";
  pool.query(getallusergroups, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      console.log("result", result);
      res.status(200).send(result);
    } else {
      console.log("user groups does not exist");
      res.status(400).send("user groups does not exist");
    }
  });
});

router.get("/getunits", async function (req, res) {
  console.log("Inside get all units ");

  const getallunits = "select * from units";
  pool.query(getallunits, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      console.log("results", result);
      res.status(200).send(result);
    } else {
      console.log("units does not exist");
      res.status(400).send("units does not exist");
    }
  });
});

router.get("/getalllocations", async function (req, res) {
  console.log("Inside get all locations ");

  const getalllocations = "select * from location ";
  pool.query(getalllocations, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      res.status(200).send(result);
    } else {
      console.log("student does not exist");
      res.status(400).send("student does not exist");
    }
  });
});

// router.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = router;
