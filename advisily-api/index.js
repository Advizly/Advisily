const express = require("express");
const app = express();
const home = require("./routes/home");
const catalogs = require("./routes/catalogs");
const courses = require("./routes/courses");
const cat_courses = require("./routes/cat_courses");

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

app.listen(port, () => console.log(`App listening on port ${port}....`));
