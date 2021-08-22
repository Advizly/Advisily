const { query, parseConditions } = require("../../helpers/mysql");

module.exports = {
  getMinors,
};

const baseQuery = "SELECT * FROM minors ";

async function getMinors(conditions) {
  const { columns, values } = parseConditions(conditions);
  let sql = baseQuery;
  if (values.length) sql += ` WHERE ${columns} `;

  const [data, err] = await query(sql, values);
  if (err) throw "Error getting minors.";

  return data;
}
