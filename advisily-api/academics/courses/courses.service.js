const { query, parseConditions } = require("../../helpers/mysql");

module.exports = { getCourses };

const baseQuery =
  "SELECT *\
     FROM courses as c JOIN departments as d\
     ON c.departmentId=d.departmentId";

async function getCourses(conditions) {
  const { columns, values } = parseConditions(conditions);
  let sql = baseQuery;
  if (values.length) sql += ` WHERE ${columns} `;

  const [data, err] = await query(sql, values);
  if (err) throw "Error getting courses.";

  return data;
}
