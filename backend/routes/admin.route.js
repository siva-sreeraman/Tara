var express = require("express");
var router = express.Router();
const query = require("../helpers/query");

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

router.get("/pending-requests/:companyId", async function (req, res) {
  const companyId = req.params.companyId;
  const userQuery = `SELECT name, profile_pic, uid FROM users where company_id=${companyId} AND status="pending";`;
  const adminQuery = `SELECT name, profile_pic, uid FROM admin where company_id=${companyId} AND status="pendingByCompanyAdmin";`;
  const userRequests = await query(pool, userQuery).catch(console.log);
  const adminRequests = await query(pool, adminQuery).catch(console.log);
  let result = {
    userRequests,
    adminRequests,
  };
  res.status(200).send(result);
});

router.get("/super-user/pending-requests", async function (req, res) {
  const sql = `SELECT name, profile_pic, uid, company_name FROM admin WHERE status="pendingBySuperUser";`;
  const result = await query(pool, sql).catch(console.log);
  res.status(200).send(result);
});

router.put("/super-user/approve-requests", async function (req, res) {
  const { companyName, uid } = req.body;
  const createCompany = `INSERT INTO companies (name) VALUES ("${companyName}");`;
  const updateStatus = `UPDATE admin SET status = "accepted", company_id=? WHERE uid="${uid}";`;
  await query(pool, createCompany)
    .then(async (result) => {
      await query(pool, updateStatus, [result.insertId]);
      res.status(200).send(result);
    })
    .catch(console.log);
});

router.post("/file-upload", fileUploadController.uploadFile);

router.get("/create-upload-url", fileUploadController.createUploadUrl);

router.get("/get-presigned-url", fileUploadController.createPresignedGetUrl);

router.get("/get-files", fileUploadController.getFiles);

module.exports = router;
