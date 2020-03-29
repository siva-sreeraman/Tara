var express = require("express");
var router = express.Router();

/* GET student test. */
router.get("/", function(req, res, next) {
  res.send("Hi from TARA login");
});

module.exports = router;
