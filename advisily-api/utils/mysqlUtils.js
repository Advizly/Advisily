const mysql = require("mysql");
require("dotenv").config();
const config = require("config").get("db");

const getConnection = () => {
  const host = config.get("host");
  const password = config.get("password");
  const database = config.get("database");
  const user = config.get("user");

  return mysql.createConnection({ host, password, database, user });
};
const getPool = () => {
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
  });
};
module.exports.getConnection = getConnection;
module.exports.getPool = getPool;
