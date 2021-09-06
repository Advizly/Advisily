const { query } = require("./mysql");

module.exports = { addCoursesRequisites, addCourseRequisites };

async function addCoursesRequisites(courses) {
  for (let i = 0; i < courses.length; i++) {
    const requisites = await addCourseRequisites(courses[i]);
    courses[i] = { ...courses[i], requisites };
  }

  return courses;
}

async function addCourseRequisites(course) {
  let sql = "SELECT setId from courseRequisites WHERE courseId =?";

  let [sets, err] = await query(sql, course.courseId);
  if (err) throw "error getting sets.";

  sql =
    "SELECT courseId,courseCode,courseTitle,credits,prefix,rs.requisiteTypeId,requisiteType\
     FROM requisiteSets AS rs\
     INNER JOIN courses AS c ON c.courseId=rs.requisiteId\
     INNER JOIN requisiteTypes as rt on rt.requisiteTypeId=rs.requisiteTypeId\
     WHERE setId =?";

  let requisiteSets = [];
  for (let i = 0; i < sets.length; i++) {
    let [requisites, err2] = await query(sql, sets[i].setId);
    if (err2) throw "error getting requisites";

    requisiteSets.push(requisites);
  }

  return requisiteSets;
}
