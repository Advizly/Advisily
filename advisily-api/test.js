const { query } = require("./helpers/mysql");

async function func() {
  const obj = { studentId: 900192237, email: "youssefagiza@aucegypt.edu" };
  const [data, err] = await query("SELECT * from users WHERE ?", obj);
  console.log(data, err);
}

func();
