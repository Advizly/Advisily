require("dotenv").config();
const config = require("config");
const express = require("express");
const app = express();

const errorHandler = require("./middleware/errorHandler");
const headerConfig = require("./middleware/headersConfig");

const academics = require("./academics");
const advising = require("./advising/advising.route");
const catalogs = require("./catalog/catalogs.route");
const users = require("./users/users.route");

let port = 5000;
if (config.has("port")) port = config.get("port");

//app.get('/', function (req, res) { res.redirect('/build/index.html') });

app.use(express.json());
app.use(headerConfig);
// app.use((req, res, next) => {
//   console.log(`${req.method} req at: ${req.url}`);
//   next();
// });

//app.get("/", academics);

app.use("/api/academics", academics);
app.use("/api/catalogs", catalogs);
app.use("/api/users", users);
app.use("/api/advising", advising);

app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}....`));
