const { query } = require("../helpers/mysql");

module.exports = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisingResults,
  addAdvisingSession,
  updateAdvisingSession,
  getPaces,
};

const baseGetSessionQuery = "select * from advisingSessions";
async function getAdvisingSessions({ studentId }) {
  let sql = baseGetSessionQuery;
  if (studentId) sql += "WHERE studentId=?";

  const [sessions, err] = await query(sql, [studentId]);
  if (err) throw "Error getting advising session data.";

  return sessions;
}
async function getAdvisingSession({ sessionId }) {
  const sql = `${baseGetSessionQuery} WHERE advisingSessionId=? LIMIT 1`;
  const [data, err] = await query(sql, [sessionId]);

  if (err) throw "Error getting advising sessions.";

  return !data.length ? {} : data[0];
}

async function getAdvisingResults({ sessionId }) {
  const sql =
    "select * from advisingResultCourses AS arc \
                          INNER JOIN courses AS c ON (c.courseId=arc.courseId)\
                          INNER JOIN departments AS d ON (d.departmentId=c.departmentId)\
                         WHERE advisingSessionId=?";
  const [data, err] = await query(sql, [sessionId]);
  if (err) throw "Error getting advising results.";

  return !data.length ? {} : data[0];
}

async function addAdvisingSession(advisingData) {
  advisingData.sessionDate = new Date();

  const sql = "INSERT INTO advisingSessions SET ?";
  const [data, err] = await query(sql, advisingData);
  if (err) throw "Error inserting advising data.";
  console.log("HERE: ", data);
  return data;
}

async function updateAdvisingSession(advisingData) {
  const sql = "UPDATE advisingSessions SET ?";

  const [data, err] = await query(sql, advisingData);
  if (err) throw "Error updating advising session info.";
  console.log("update respone:", data);
  return data;
}

async function getPaces() {
  const sql = "select * from paces";

  const [paces, err] = await query(sql);
  if (err) throw "Error getting paces.";
  return paces;
}
