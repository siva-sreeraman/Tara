var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
var admin = require("firebase-admin");
const query = require("../helpers/query");


router.get("/getusers", async function (req, res) {
  console.log("Inside  getusers ");

  const getcast = "SELECT * FROM users";
  pool.query(getcast, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      // console.log(result);
      res.status(200).send(result);
    } else {
      console.log("crew does not exist");
      res.status(400).send("crew does not exist");
    }
  });
});



router.post("/add_rolesto_project", async (request, response) => {
  try {
    console.log("Inside  add roles to project ");
    console.log("ugname is", request.body);
   var role = request.body.role[0].role
   console.log("role",role)
   var userid = request.body.userid
   console.log("userid",userid)
   var pid = request.body.project_id
   console.log("pid",pid)
   var sqlquery = `update  project_users set role = ? where user_Id = ? and project_Id = ?`;
// var sqlquery = "insert into `project_users`(`role`) VALUES ('" +role +"') where user_Id = '"+ userid +"' and project_Id = '" + pid +"' ";
    await pool.query(sqlquery ,[role,userid,pid],(err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send("UserGroup Added Successfully");
    });
  } catch (ex) {
    // return response.status(500).send(err);
  }
})

router.get("/getcrewlist", async function (req, res) {
  var users;
  console.log("Inside  getcrewlist ");
console.log(req.query,"in get crewlist")
  // const getcast = 'SELECT users.*, crew.* FROM users INNER JOIN crew ON crew.fk_userid=users.userid';
 const getprojectcrew = "select distinct user_Id,role from project_users where project_Id = ?"
var result;
var values = [];


 result = await query(pool,getprojectcrew, [req.query.projectid]).catch(console.log);

console.log("the results ",result[0].user_Id)

for(var i=0;i<result.length;i++)
{
  values.push(result[i].user_Id)
}
console.log("values are",values)

//    var sqlquery = 'select * from crew where fk_userid in '+ '(' + values + ')';

//    result = await query(pool, sqlquery).catch(console.log);
//    console.log("the crew results are",result)
// values = []
//    for(var i=0;i<result.length;i++)
// {
//   values.push(result[i].fk_userid)
// }

var sqlquery = 'select * from users where userid in '+ '(' + values + ')';

result = await query(pool, sqlquery).catch(console.log);
console.log("the users are",result)
res.status(200).send(result);


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



router.get("/getusergroups_project", async function (req, res) {
  console.log("Inside get user groups from project ");

  const sqlquery = "select * from usergroups where fk_project_id = ?";
  result = await query(pool, sqlquery,[req.query.projectid] ).catch(console.log);
// console.log("all users of given project" ,result)
res.status(201).send(result);
});



router.get("/getusers_fromproject", async function (req, res) {
  console.log("Inside get users from project ");

  const sqlquery = "select * from users where userid in (SELECT distinct user_Id FROM taradatabase.project_users where project_Id = ?)";
  result = await query(pool, sqlquery,[req.query.projectid] ).catch(console.log);
// console.log("all users of given project" ,result)
res.status(201).send(result);
});


router.get("/getaccessrights_forproject", async function (req, res) {
  console.log("Inside get users from project ");

  const sqlquery = "select * from accessrights";
  result = await query(pool, sqlquery).catch(console.log);
// console.log("all users of given project" ,result)
res.status(201).send(result);
});

router.post("/create_new_usergroup", async function (request, response) {
  console.log("Inside get users from project ");
console.log(request.body)
console.log(request.query.projectid)
    console.log("Inside  addusergroup ");
    console.log("ugname is", request.body.ugname);
    var sqlquery= 'insert into usergroups(UserGroup,description,fk_project_id) values (?,?,?)';
  result = await query(pool, sqlquery , [request.body.ugname, request.body.ugdescription,request.query.projectid]).catch(console.log);
var ugid = result.insertId
for(let i=0 ; i<request.body.accessdata.length;i++)
{
  var sqlquery = 'insert into usergroupswithar(fk_UserGroupID,fk_AccessRightId) values(?,?)';
  result = await query(pool, sqlquery , [ugid,request.body.accessdata[i].accessId]).catch(console.log);
}
for(let i=0 ; i<request.body.usernames.length;i++)
{
  sqlquery = 'insert into userwithusergroup(fk_UserGroupId,fk_UserId) values(?,?)';
  result = await query(pool, sqlquery , [ugid,  request.body.usernames[i].userid]).catch(console.log);
  console.log(result)
}

  response.status(201).send("successfully created usergroup");
});


router.get("/get_project_usergroup_details", async function (request, response) {
  console.log("in get project usergrp details")
console.log(request.query)
var sqlquery = 'select * from users where userid in (SELECT fk_UserId FROM userwithusergroup where fk_UserGroupId = ?)';
result = await query(pool, sqlquery , [request.query.ugid]).catch(console.log);
console.log(result)
sqlquery = 'select * from accessrights where accessId in (SELECT fk_AccessRightId FROM usergroupswithar where fk_UserGroupID = ?)';
  result2 = await query(pool, sqlquery , [request.query.ugid]).catch(console.log);
  console.log(result)
// response.status(201).send(result);
response.json({
  userdetails: (result) ,
  accessrights :(result2)
});
})


router.post("/update_project_usergroup_details", async function (request, response) {
  // console.log(request.body)
  console.log("Inside get users from project ");
  console.log(request.body)
  console.log(request.query.projectid)
      console.log("Inside  addusergroup ");
      console.log("ugname is", request.body.ugname);
      var sqlquery= 'update usergroups set UserGroup = ?,description = ? where  UserGroupId = ?';
    result = await query(pool, sqlquery , [request.body.ugname, request.body.ugdescription,request.body.ugid]).catch(console.log);
  // var ugid = result.insertId
  console.log(result)

  var sqlquery = 'delete from usergroupswithar where fk_UserGroupID = ?';
  result = await query(pool, sqlquery , [request.body.ugid]).catch(console.log);

  for(let i=0 ; i<request.body.accessdata.length;i++)
  {
    var sqlquery = 'insert into usergroupswithar(fk_UserGroupID,fk_AccessRightId) values(?,?)';
    result = await query(pool, sqlquery , [request.body.ugid,request.body.accessdata[i].accessId]).catch(console.log);
  }
  
  var sqlquery = 'delete from userwithusergroup where fk_UserGroupID = ?';
  result = await query(pool, sqlquery , [request.body.ugid] ).catch(console.log);

  for(let i=0 ; i<request.body.usernames.length;i++)
   {
  sqlquery = 'insert into userwithusergroup(fk_UserGroupId,fk_UserId) values(?,?)';
  result = await query(pool, sqlquery , [request.body.ugid ,  request.body.usernames[i].userid]).catch(console.log);
  console.log(result)
   }
    response.status(201).send("successfully edited usergroup");
  })




// router.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = router;
