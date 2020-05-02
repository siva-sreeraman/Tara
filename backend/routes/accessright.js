var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
const query = require("../helpers/query");
const path = require('path');
const fs = require('fs');
const multer = require('multer');







router.get('/user/:id', async (req, res) => {
    try {
         var dbquery = 'select fk_UserId from userwithusergroup where  fk_UserGroupId  in (select UserGroupId from usergroups where UserGroup=?)';
         result = await query(pool, dbquery, [req.body.usergroup]).catch(console.log);
         for (temp of result) 
         {
             if(temp.fk_UserId==(req.params.id))
             {
                console.log(temp.fk_UserId)
                res.status(200).send("true");

             }

         }
         res.status(200).send("false");

    }
    catch (ex) {
        return res.status(500).send(ex);
    }
})





module.exports = router;




