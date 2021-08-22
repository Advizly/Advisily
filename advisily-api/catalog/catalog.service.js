const _ = require("lodash");
const { query, parseConditions } = require("../helpers/mysql");

const baseQuery = "select * from catalogs";
const baseGetCoursesQuery =
  "SELECT c.courseTitle,c.courseCode,d.prefix,c.courseId,d.departmentId FROM catalogCourses as cc \
    INNER JOIN courses as c ON cc.courseId=c.courseId \
    INNER JOIN departments as d ON d.departmentId=c.departmentId";

module.exports = {
  getCatalogs,
  getCatalog,
  getCatCourses,
};

async function getCatalogs() {
  const [data, err] = await query(baseQuery);
  if (err) throw "Error getting catalogs";
  return data;
}
async function getCatCourses(conditions) {
  let sql = baseGetCoursesQuery;
  const { columns, values } = parseConditions(conditions);
  if (values.length) sql += ` WHERE ${columns}`;

  const [data, err] = await query(sql, values);
  if (err) throw "Error getting catalog courses.";

  return data;
}

async function getCatalog(catalogId) {
  const sql = baseQuery + " where catalogId=? LIMIT 1";

  const [data, err] = await query(sql, [catalogId]);
  if (err) throw "Error getting catalog.";

  return data.length ? data[0] : {};
}
