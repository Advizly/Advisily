const express = require("express");
const app = express();
const home = require("./routes/home");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/", home);

app.listen(port, () => console.log(`App listening on port ${port}....`));
