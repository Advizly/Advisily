const { query, parseConditions } = require("../../helpers/mysql");
const { addCoursesRequisites } = require("../../helpers/coursesRequisites");

module.exports = { getCourses };

const baseQuery = "SELECT * FROM courses ";

async function getCourses(conditions) {
  const { columns, values } = parseConditions(conditions);
  let sql = baseQuery;
  if (values.length) sql += ` WHERE ${columns} `;

  let [courses, err] = await query(sql, values);
  if (err) throw "Error getting courses.";

  courses = addCoursesRequisites(courses);

  return courses;
}
