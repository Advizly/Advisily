const { query } = require("../../helpers/mysql");

module.exports = {
  getUserMajors,
  addUserMajor,
  deleteUserMajor,
};

const baseUserCoursesQuery = "SELECT DISTINCT * from userMajors";

async function getUserMajors({ studentId }) {
  const sql = baseUserCoursesQuery + " WHERE studentId=?";
  const [data, err] = await query(sql, [studentId]);
  if (err) throw "Error getting user majors.";

  return data;
}

async function addUserMajor({ studentId, majorId, catalogId }) {
  console.log("studentId", studentId, majorId);
  const sql = "INSERT IGNORE INTO userMajors SET ?";
  const [data, err] = await query(sql, { studentId, majorId, catalogId });
  if (err) {
    console.log("Error:", err);
    throw "Error adding user major.";
  }
}

async function deleteUserMajor({ studentId, majorId }) {
  const sql = "DELETE FROM userMajors WHERE studentId= ? AND majorId=?";

  const [data, err] = await query(sql, [studentId, majorId]);
  if (err) throw "Error deleting user major.";
  return data;
}
