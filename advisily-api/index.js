require("dotenv").config();
const config = require("config");
const express = require("express");
const app = express();

const errorHandler = require("./middleware/errorHandler");

const academics = require("./academics");
const advising = require("./advising/advising.route");
const catalogs = require("./catalog/catalogs.route");
const users = require("./users/users.route");

let port = 5000;
if (config.has("port")) port = config.get("port");

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  next();
});

app.use("/api/academics", academics);
app.use("/api/catalogs", catalogs);
app.use("/api/users", users);
app.use("/api/advising", advising);

app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}....`));
