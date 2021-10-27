const { query } = require("../../helpers/mysql");

module.exports = {
  getUserMinors,
  addUserMinor,
  deleteUserMinor,
};

const baseUserCoursesQuery = "SELECT DISTINCT * from userMinors";

async function getUserMinors({ userId }) {
  const sql = baseUserCoursesQuery + " WHERE userId=?";
  const [data, err] = await query(sql, [userId]);
  if (err) throw "Error getting user majors.";

  return data;
}

async function addUserMinor({ userId, minorId, catalogId }) {
  const sql = "INSERT IGNORE INTO userMinors SET ?";
  const [, err] = await query(sql, { userId, minorId, catalogId });
  if (err) throw "Error adding user major.";
}

async function deleteUserMinor({ userId, minorId }) {
  const sql = "DELETE FROM userMinors WHERE userId= ? AND minorId=?";

  const [, err] = await query(sql, [userId, minorId]);
  if (err) throw "Error deleting user major.";
}
