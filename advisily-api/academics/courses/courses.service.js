const { query, parseConditions } = require("../../helpers/mysql");
const { addCoursesRequisites } = require("../../helpers/coursesRequisites");

module.exports = { getCourses, getPrefixes };

const baseQuery = "SELECT * FROM courses ";

async function getCourses(conditions) {
  const { columns, values } = parseConditions(conditions);
  let sql = baseQuery;
  if (values.length) sql += ` WHERE ${columns} `;

  sql += " ORDER BY prefix, courseCode";
  let [courses, err] = await query(sql, values);
  if (err) throw "Error getting courses.";

  courses = addCoursesRequisites(courses);

  return courses;
}

async function getPrefixes() {
  const sql = "SELECT DISTINCT(prefix) from courses ORDER BY prefix";

  const [prefixes, err] = await query(sql);
  if (err) throw "Error while getting prefixes.";
  return prefixes.map((p) => p.prefix);
}
