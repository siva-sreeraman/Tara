var express = require("express");
var router = express.Router();

var admin = require("firebase-admin");

/* GET student test. */
router.get("/", function(req, res, next) {
  res.send("Hi from TARA login");
});

const validate = async (req, res, next) => {
  idToken = req.headers.accesstoken;
  await admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      responseData = decodedToken;
      // console.log("/verify decodedToken: " + JSON.stringify(decodedToken));
      req.decodedToken = decodedToken;
      next();
      // res.send("from validate: " + idToken);
    })
    .catch(function(error) {
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

/* POST student test. */
router.post("/verify", validate, async (req, res) => {
  let responseData = null;
  res.send(req.decodedToken);
});

module.exports = router;
