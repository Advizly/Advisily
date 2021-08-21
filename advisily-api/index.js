require("dotenv").config();
const config = require("config");

const express = require("express");

const app = express();
const advising = require("./routes/advising");
const auth = require("./routes/auth");
const catalogs = require("./catalog/catalogs.route");
const courses = require("./routes/courses");
const home = require("./routes/home");
const majors = require("./routes/majors");
const minors = require("./routes/minors");
const users = require("./users/users.route");
const errorHandler = require("./middleware/errorHandler");

let port = 5000;
if (config.has("port")) port = config.get("port");

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  next();
});

app.use("/", home);
app.use("/api/catalogs", catalogs);
app.use("/api/courses", courses);
app.use("/api/majors", majors);
app.use("/api/minors", minors);
app.use("/api/users", users);
app.use("/api/advising", advising);
app.use("/api/auth", auth);

app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}....`));
