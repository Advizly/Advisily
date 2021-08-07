const express = require("express");
const app = express();
const home = require("./routes/home");
const plans = require("./routes/plans");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/", home);
app.use("/api/plans", plans);

app.listen(port, () => console.log(`App listening on port ${port}....`));
