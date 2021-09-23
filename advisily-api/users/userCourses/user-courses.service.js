const { query } = require("../../helpers/mysql");

module.exports = {
  getUserCourses,
  addUserCourse,
  deleteUserCourse,
};

const baseUserCoursesQuery = "SELECT DISTINCT * from userCourses";

async function getUserCourses({ studentId }) {
  const sql = `${baseUserCoursesQuery} INNER JOIN courses ON userCourses.courseId= courses.courseId WHERE studentId=?`;
  const [data, err] = await query(sql, [studentId]);
  if (err) throw "Error getting user courses.";

  return data;
}

async function addUserCourse({ studentId, courseId }) {
  const sql = "INSERT IGNORE INTO userCourses SET ?";
  const [data, err] = await query(sql, { studentId, courseId });
  if (err) throw "Error adding user courses.";
}

async function deleteUserCourse({ studentId, courseId }) {
  const sql = "DELETE FROM userCourses WHERE studentId= ? AND courseId=?";

  const [data, err] = await query(sql, [studentId, courseId]);
  if (err) throw "Error deleting user courses.";
}
