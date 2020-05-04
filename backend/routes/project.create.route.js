var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
const query = require("../helpers/query");

router.get("/production-types", async function (req, res) {
  const constructedQuery = `SELECT * FROM production_types`;
  result = await query(pool, constructedQuery).catch(console.log);
  console.log(result);
  res.status(200).send(result);
});

router.get("/core-functions", async function (req, res) {
  const constructedQuery = `SELECT * FROM core_functions`;
  result = await query(pool, constructedQuery).catch(console.log);
  console.log(result);
  res.status(200).send(result);
});

router.get("/dept-functions", async function (req, res) {
  const constructedQuery = `SELECT * FROM dept_functions`;
  result = await query(pool, constructedQuery).catch(console.log);
  console.log(result);
  res.status(200).send(result);
});

router.get("/all-templates/:companyId", async function (req, res) {
  const companyId = req.params.companyId;
  const constructedQuery = `SELECT * FROM templates where company_id = ${companyId}`;
  result = await query(pool, constructedQuery).catch(console.log);
  console.log(result);
  res.status(200).send(result);
});

router.get("/template-functions/:templateId", async function (req, res) {
  const templateId = req.params.templateId;
  let templateFunctions = {};
  let constructedQuery = `select c.id, c.name from
  template_core_functions as t, core_functions as c 
  where t.core_fun_id=c.id 
  AND  t.template_id=${templateId};`;
  result = await query(pool, constructedQuery).catch(console.log);
  templateFunctions["coreFunctions"] = result;

  constructedQuery = `select d.id, d.name from
  template_dept_functions as t, dept_functions as d 
  where t.dept_fun_id=d.id 
  AND  t.template_id=${templateId};`;
  result = await query(pool, constructedQuery).catch(console.log);
  templateFunctions["deptFunctions"] = result;
  console.log(result);
  res.status(200).send(templateFunctions);
});

router.get("/allprojects", async function (req, res) {
  const getallprojects = `SELECT name,id FROM projects`;
  result = await query(pool, getallprojects).catch(console.log);
  res.status(201).send(result);
});

router.get("/project_by_id/", async function (req, res) {
  console.log(req.params);
  console.log("the query", req.query.projectid);
  const getprojectbyid = `SELECT * FROM projects where id = ?`;
  result = await query(pool, getprojectbyid, [req.query.projectid]).catch(
    console.log
  );
  console.log("result from found project", result);
  res.status(201).send(result);
});

router.post("/template", async function (req, res) {
  const {
    companyId,
    templateName,
    description,
    productionId,
  } = req.body.template;
  const { coreFunIds, deptFunIds } = req.body;
  let constructedQuery, result;

  constructedQuery = `INSERT INTO templates (company_id, name, description, production_id) \
  VALUES (?, ?, ?, ?)`;
  result = await query(pool, constructedQuery, [
    companyId,
    templateName,
    description,
    productionId,
  ]).catch(console.log);

  const templateId = result.insertId;
  coreFunIds.map(async (coreFunId) => {
    constructedQuery = `INSERT INTO template_core_functions (template_id, core_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, constructedQuery, [
      templateId,
      coreFunId.id,
    ]).catch(console.log);
  });

  deptFunIds.map(async (deptFunId) => {
    constructedQuery = `INSERT INTO template_dept_functions (template_id, dept_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, constructedQuery, [
      templateId,
      deptFunId.id,
    ]).catch(console.log);
  });

  res.status(201).send("successfully stored template");
});

router.post("/project", async function (req, res) {
  const {
    companyId,
    projectName,
    description,
    productionId,
  } = req.body.project;
  const { coreFunIds, deptFunIds } = req.body;
  let constructedQuery, result;

  constructedQuery = `INSERT INTO projects (company_id, name, description, production_id) \
  VALUES (?, ?, ?, ?)`;
  result = await query(pool, constructedQuery, [
    companyId,
    projectName,
    description,
    productionId,
  ]).catch(console.log);

  const projectId = result.insertId;
  console.log("projectId before inserting:::", projectId);
  coreFunIds.map(async (coreFunId) => {
    constructedQuery = `INSERT INTO project_core_functions (project_id, core_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, constructedQuery, [projectId, coreFunId]).catch(
      console.log
    );
  });

  deptFunIds.map(async (deptFunId) => {
    constructedQuery = `INSERT INTO project_dept_functions (project_id, dept_fun_id) \
  VALUES (?, ?)`;
    result = await query(pool, constructedQuery, [projectId, deptFunId]).catch(
      console.log
    );
  });

  res.status(201).send("successfully stored project");
});

module.exports = router;
