require("dotenv").config();
const config = require("config");

const express = require("express");

const app = express();
const advising = require("./routes/advising");
const auth = require("./routes/auth");
const catalogs = require("./routes/catalogs");
const courses = require("./routes/courses");
const cat_courses = require("./routes/cat_courses");
const home = require("./routes/home");
const majors = require("./routes/majors");
const minors = require("./routes/minors");
const students = require("./routes/students");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", home);
app.use("/api/catalogs", catalogs);
app.use("/api/courses", courses);
app.use("/api/cat_courses", cat_courses);
app.use("/api/majors", majors);
app.use("/api/minors", minors);
app.use("/api/students", students);
app.use("/api/advising", advising);
app.use("/api/auth", auth);

if (!config.get("jwtPrivateKey")) {
  console.error("Error private key");
} else console.log(config.get("jwtPrivateKey"));
app.listen(port, () => console.log(`App listening on port ${port}....`));
