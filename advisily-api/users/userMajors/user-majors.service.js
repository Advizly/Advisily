const { query } = require("../../helpers/mysql");

module.exports = {
  getUserMajors,
  addUserMajor,
  deleteUserMajor,
};

const baseUserCoursesQuery = "SELECT DISTINCT * from userMajors";

async function getUserMajors({ userId }) {
  const sql = baseUserCoursesQuery + " WHERE userId=?";
  const [data, err] = await query(sql, [userId]);
  if (err) throw "Error getting user majors.";

  return data;
}

async function addUserMajor({ userId, majorId, catalogId }) {
  const sql = "INSERT IGNORE INTO userMajors SET ?";
  const [data, err] = await query(sql, { userId, majorId, catalogId });
  if (err) {
    console.error("Error:", err);
    throw "Error adding user major.";
  }
}

async function deleteUserMajor({ userId, majorId }) {
  const sql = "DELETE FROM userMajors WHERE userId= ? AND majorId=?";

  const [data, err] = await query(sql, [userId, majorId]);
  if (err) throw "Error deleting user major.";
  return data;
}
