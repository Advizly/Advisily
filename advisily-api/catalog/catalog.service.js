const _ = require("lodash");
const { query, parseConditions } = require("../helpers/mysql");
const { addCoursesRequisites } = require("../helpers/coursesRequisites");

module.exports = {
  getCatalogs,
  getCatalog,
  getCatCourses,
  getPlanCourses,
};

const baseQuery = "select * from catalogs";
const baseGetCoursesQuery =
  "SELECT * FROM catalogCourses as cc \
    INNER JOIN courses as c ON cc.courseId=c.courseId ";

const baseGetPlanCoursesQuery =
  "select * from planCourses AS pc\
   INNER JOIN courses AS c  on pc.courseId=c.courseId";

async function getCatalogs(conditions) {
  let sql = baseQuery;
  const { columns, values } = parseConditions(conditions);
  if (values.length) sql += ` WHERE ${columns}`;

  const [data, err] = await query(sql, values);
  if (err) throw "Error getting catalogs";
  return data;
}

async function getCatCourses(conditions) {
  let sql = baseGetCoursesQuery;
  const { columns, values } = parseConditions(conditions);
  if (values.length) sql += ` WHERE ${columns}`;

  let [catCourses, err] = await query(sql, values);
  if (err) throw "Error getting catalog courses.";

  catCourses = addCoursesRequisites(catCourses);

  return catCourses;
}

async function getCatalog({ catalogId }) {
  const sql = baseQuery + " where catalogId=? LIMIT 1";

  const [data, err] = await query(sql, [catalogId]);
  if (err) throw "Error getting catalog.";

  return data.length ? data[0] : {};
}

async function getPlanCourses(conditions) {
  let sql = baseGetPlanCoursesQuery;
  const { values, columns } = parseConditions(conditions);
  if (values.length) sql += ` WHERE ${columns} `;

  let [planCourses, err] = await query(sql, values);
  if (err) throw "Error getting plan courses.";

  planCourses = addCoursesRequisites(planCourses);

  return planCourses;
}
