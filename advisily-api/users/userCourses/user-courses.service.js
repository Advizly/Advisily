const { query } = require("../../helpers/mysql");

module.exports = {
  getUserCourses,
  addUserCourse,
  deleteUserCourse,
};

const baseUserCoursesQuery = "SELECT DISTINCT * from userCourses";

async function getUserCourses({ userId }) {
  const sql = `${baseUserCoursesQuery} INNER JOIN courses ON userCourses.courseId= courses.courseId WHERE userId=?`;
  const [data, err] = await query(sql, [userId]);
  if (err) throw "Error getting user courses.";

  return data;
}

async function addUserCourse({ userId, courseId }) {
  const sql = "INSERT IGNORE INTO userCourses SET ?";
  const [data, err] = await query(sql, { userId, courseId });
  if (err) throw "Error adding user courses.";
}

async function deleteUserCourse({ userId, courseId }) {
  const sql = "DELETE FROM userCourses WHERE userId= ? AND courseId=?";

  const [data, err] = await query(sql, [userId, courseId]);
  if (err) throw "Error deleting user courses.";
}
