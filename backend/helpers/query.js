// query
module.exports = async (conn, q, params) =>

  new Promise((resolve, reject) => {
   handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    };
    qry = conn.query(q, params, handler);
    console.log("SQL Query qry: " + JSON.stringify(qry.sql));
  });
