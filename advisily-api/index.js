require("dotenv").config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});
const config = require("config");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/errorHandler");
const headerConfig = require("./middleware/headersConfig");
const corsConfig = require("./middleware/cors");

const academics = require("./academics");
const advising = require("./advising/advising.route");
const catalogs = require("./catalog/catalogs.route");
const users = require("./users/users.route");

const port = config.has("port") ? config.get("port") : 5000;

app.use(express.json());
app.use(headerConfig);
app.use(corsConfig);
app.use(cookieParser())

app.use((req, res, next) => {
  //dev environment
  if (process.env.NODE_ENV === "development")
    console.log(`${req.method} req at: ${req.url}\n`);
    
  next();
});

app.use("/api/academics", academics);
app.use("/api/catalogs", catalogs);
app.use("/api/users", users);
app.use("/api/advising", advising);

app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}....`));
