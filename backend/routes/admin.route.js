var express = require("express");
var router = express.Router();

const pool = require("../dbConfig");
const fileUploadController = require("../controllers/file-upload.controller");

/* GET student test. */
router.get("/", function (req, res, next) {
  res.send("Hi from Admin router");
});

router.get("/get-projects", async function (req, res) {
  console.log("Inside  get-projects ");
  const sql = `SELECT p.name, dp.name AS dept_fun, cf.name AS core_fun 
    FROM
      projects p,
        dept_functions dp,
        project_dept_functions pdf,
        core_functions cf,
        project_core_functions pcf
    WHERE 
      p.id = pdf.project_id
        AND dp.id = pdf.dept_fun_id
         AND p.id = pcf.project_id
        AND cf.id = pcf.core_fun_id`;
  pool.query(sql, (err, result) => {
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

router.post("/file-upload", fileUploadController.uploadFile);

router.get("/create-upload-url", fileUploadController.createUploadUrl);

router.get("/get-presigned-url", fileUploadController.createPresignedGetUrl);

router.get("/get-files", fileUploadController.getFiles);

module.exports = router;
