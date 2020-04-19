var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");

var admin = require("firebase-admin");

/* GET student test. */
router.get("/", function (req, res, next) {
  res.send("Hi from TARA login");
});

const validate = async (req, res, next) => {
  idToken = req.headers.accesstoken;
  await admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;
      responseData = decodedToken;
      // console.log("/verify decodedToken: " + JSON.stringify(decodedToken));
      req.decodedToken = decodedToken;
      next();
      // res.send("from validate: " + idToken);
    })
    .catch(function (error) {
      // Handle error
      responseData = error;
      // console.log("/verify error: " + JSON.stringify(error));
      console.log("validate: verifyIdToken ID Token verification failed");
      // next();
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    });
};

// /* POST student test. */
// router.post("/verify", validate, async (req, res) => {
//   let responseData = null;
//   res.send(req.decodedToken);
// });

router.route("/getalllocations").get((req, res) => {
  console.log("Inside get all locations ");

  const getalllocations = "select * from locations ";
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

module.exports = router;
