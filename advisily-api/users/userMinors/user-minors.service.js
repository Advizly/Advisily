const { query } = require("../../helpers/mysql");

module.exports = {
  getUserMinors,
  addUserMinor,
  deleteUserMinor,
};

const baseUserCoursesQuery = "SELECT DISTINCT * from userMinors";

async function getUserMinors({ studentId }) {
  const sql = baseUserCoursesQuery + " WHERE studentId=?";
  const [data, err] = await query(sql, [studentId]);
  if (err) throw "Error getting user majors.";

  return data;
}

async function addUserMinor({ studentId, minorId, catalogId }) {
  const sql = "INSERT IGNORE INTO userMinors SET ?";
  const [, err] = await query(sql, { studentId, minorId, catalogId });
  if (err) throw "Error adding user major.";
}

async function deleteUserMinor({ studentId, minorId }) {
  const sql = "DELETE FROM userMinors WHERE studentId= ? AND minorId=?";

  const [, err] = await query(sql, [studentId, minorId]);
  if (err) throw "Error deleting user major.";
}
