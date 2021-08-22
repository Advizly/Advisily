const { query, parseConditions } = require("../../helpers/mysql");

module.exports = {
  getMajors,
};

const baseQuery = "SELECT * FROM majors ";

async function getMajors(conditions) {
  const { columns, values } = parseConditions(conditions);
  let sql = baseQuery;
  if (values.length) sql += ` WHERE ${columns} `;

  const [data, err] = await query(sql, values);
  if (err) throw "Error getting majors.";

  return data;
}
