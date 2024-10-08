const mysql = require("mysql");
const promiseHandler = require("./promiseHandler");
const _ = require("lodash");
require("dotenv").config();
const config = require("config");

module.exports.query = query;
module.exports.getConnection = getConnection;
module.exports.parseConditions = parseConditions;

function getConnection() {
  const db = config.get("db");
  const con = mysql.createConnection(db);

  return con;
}

function getPool() {
  const host = config.get("host");
  const password = config.get("password");
  const database = config.get("database");
  const user = config.get("user");

  return mysql.createPool({
    host,
    password,
    database,
    user,
    connectionLimit: 10,
    chartset: "utf8",
  });
}

function query(query, values, endConnection = true, connection = null) {
  if (connection == null) connection = getConnection();

  const promise = new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
       } //res.status(400).send(err);

      return resolve(results);
    });
    if (endConnection) connection.end();
  });

  return promiseHandler(promise);
}

//conditions is an object where key is the column and value is the condition.
//return string of column names and array of values
//e.g. conditions = {email:"email@domain.com"}, returns {columns: "email = ?", values=["email@domain.com""]}
function parseConditions(conditions) {
  let columns = "",
    values = [];
  conditions = _.omitBy(conditions, _.isNil);
  if (!_.isEmpty(conditions)) {
    columns = _.keys(conditions).join("= ? AND ") + " = ?";
    values = _.values(conditions);
  }
  return {
    columns,
    values,
  };
}
