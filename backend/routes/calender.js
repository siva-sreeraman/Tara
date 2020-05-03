var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
const query = require("../helpers/query");
const path = require('path');
const fs = require('fs');
const multer = require('multer');







router.post('/event/:id', async (req, res) => {
    try {
        console.log("edit event")

        var dbquery = 'UPDATE Events SET  title=?,date=?,eventdescription = ?,eventlocation=?,time=? WHERE (eventid = ?)';
        result = await query(pool, dbquery, [req.body.title, req.body.date, req.body.description, req.body.location, req.body.time, req.params.id]).catch(console.log);
        res.status(200).send(result);

    }
    catch (ex) {
        return response.status(500).send(err);
    }
})


router.post('/task/:id', async (req, res) => {
    try {

        var dbquery = 'UPDATE Tasks SET  name=?,description=?,date = ?  WHERE (taskid = ?)';
        result = await query(pool, dbquery, [req.body.name, req.body.description,req.body.date, req.params.id]).catch(console.log);
        res.status(200).send(result);

    }
    catch (ex) {
        return response.status(500).send(err);
    }
})


router.post('/deleteevent/:id', async (req, res) => {
    try {

        var dbquery = 'delete  from Events where eventid=?';
        var dbquery = 'delete  from projectevents where eventid=?';
        result = await query(pool, dbquery, [req.params.id])
        result2 = await query(pool, dbquery, [req.params.id])
        res.status(200).send(result2);

    }
    catch (ex) {
        return res.status(500).send(err);
    }
})


router.post('/deletetask/:id', async (req, res) => {
    try {

        var dbquery = 'delete  from Tasks where taskid=?';
        var dbquery1 = 'delete  from projecttasks where taskid=?';

        result = await query(pool, dbquery, [req.params.id]).catch(console.log);
        result1 = await query(pool, dbquery1, [req.params.id]).catch(console.log);
        res.status(200).send(result1);

    }
    catch (ex) {
        return res.status(500).send(err);
    }
})


router.get('/allevents/:id', async (req, res) => {
    try {
        console.log("edit event")

        var dbquery = 'select * from Events where eventid in (select eventid from userevents where userid=?)';
        result = await query(pool, dbquery, [req.params.id]).catch(console.log);
        res.status(200).send(result);

    }
    catch (ex) {
        return response.status(500).send(err);
    }
})

router.get('/alltasks/:id', async (req, res) => {
    try {
        console.log("edit event")

        var dbquery = 'select * from Tasks where taskid in (select taskid from usertasks where userid=?)';
        result = await query(pool, dbquery, [req.params.id]).catch(console.log);
        res.status(200).send(result);

    }
    catch (ex) {
        return response.status(500).send(err);
    }
})

router.get('/admin/alltasks/:id', async (req, res) => {
    try {
        console.log("edit event")

        var dbquery = 'select id from projects  where company_id=?'
        result = await query(pool, dbquery, [req.params.id]).catch(console.log);
        let list=[]
        for(temp of result)
        { 
            const sqlquery = "select * from  Tasks where taskid in (SELECT distinct taskid FROM projecttasks where projectid = ?)";
            result1 = await query(pool, sqlquery,[temp.id] ).catch(console.log);
            for(temp1 of result1)
            {
                list.push(temp1)

            }
          
  
        }

        res.status(200).send(list);

    }
    catch (ex) {
        return response.status(500).send(err);
    }
})
router.get('/admin/allevents/:id', async (req, res) => {
    try {
        console.log("edit event")

        var dbquery = 'select id from projects  where company_id=?'
        result = await query(pool, dbquery, [req.params.id]).catch(console.log);
        console.log(result)
        let list=[]
        for(temp of result)
        { 
            const sqlquery = "select * from  Events where eventid in (SELECT distinct eventid FROM projectevents where projectid = ?)";
            result1 = await query(pool, sqlquery,[temp.id] ).catch(console.log);
            for(temp1 of result1)
            {
                list.push(temp1)

            }
          
  
            

        }

        res.status(200).send(list);

    }
    catch (ex) {
        return res.status(500).send(err);
    }
})

router.get('/projectcalender/:id', async (req, res) => {
    try {
        console.log("edit event")

        var dbquery = 'select * from Events where eventid in (select eventid from projectevents where projectid=?)';
        result = await query(pool, dbquery, [req.params.id]).catch(console.log);
        res.status(200).send(result);

    }
    catch (ex) {
        return response.status(500).send(err);
    }
})











module.exports = router;




