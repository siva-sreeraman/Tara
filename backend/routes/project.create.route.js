var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
const query = require("../helpers/query");

router.get("/product-types", async function (req, res) {
  const getProductTypes = `SELECT * FROM production_types`;
  result = await query(pool, getProductTypes).catch(console.log);
  res.status(201).send(result);
});

router.post("/template", async function (req, res) {
  const { companyId, templateName, description, productId } = req.body.template;
  const { coreFunIds, deptFunIds } = req.body;
  let insertCoreQuery, insertDeptQuery, result;

  const insertTemplateQuery = `INSERT INTO templates (company_id, name, description, production_id) \
  VALUES (?, ?, ?, ?)`;
  result = await query(pool, insertTemplateQuery, [
    companyId,
    templateName,
    description,
    productId,
  ]).catch(console.log);

  const templateId = result.insertId;
  coreFunIds.map(async (coreFunId) => {
    insertCoreQuery = `INSERT INTO template_core_functions (template_id, core_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, insertCoreQuery, [templateId, coreFunId]).catch(
      console.log
    );
  });

  deptFunIds.map(async (deptFunId) => {
    insertDeptQuery = `INSERT INTO template_dept_functions (template_id, dept_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, insertDeptQuery, [templateId, deptFunId]).catch(
      console.log
    );
  });

  res.status(201).send("successfully stored template");
});

router.post("/project", async function (req, res) {
  const { companyId, templateName, description, productId } = req.body.template;
  const { coreFunIds, deptFunIds } = req.body;
  let insertCoreQuery, insertDeptQuery, result;

  const insertTemplateQuery = `INSERT INTO templates (company_id, name, description, production_id) \
  VALUES (?, ?, ?, ?)`;
  result = await query(pool, insertTemplateQuery, [
    companyId,
    templateName,
    description,
    productId,
  ]).catch(console.log);

  const templateId = result.insertId;
  coreFunIds.map(async (coreFunId) => {
    insertCoreQuery = `INSERT INTO template_core_functions (template_id, core_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, insertCoreQuery, [templateId, coreFunId]).catch(
      console.log
    );
  });

  deptFunIds.map(async (deptFunId) => {
    insertDeptQuery = `INSERT INTO template_dept_functions (template_id, dept_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, insertDeptQuery, [templateId, deptFunId]).catch(
      console.log
    );
  });

  res.status(201).send("successfully stored template");
});

module.exports = router;
