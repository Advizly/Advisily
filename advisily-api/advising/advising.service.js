const { getPlanCourses } = require("../catalog/catalog.service");
const { query } = require("../helpers/mysql");
const { getUserCourses } = require("../users/userCourses/user-courses.service");
const { getUserMajors } = require("../users/userMajors/user-majors.service");

module.exports = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisingResults,
  addAdvisingSession,
  updateAdvisingSession,
  generatePlan,
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

  return !data.length ? [] : data[0];
}

async function getAdvisingResults({ sessionId }) {
  const sql =
    "select * from advisingResultCourses AS arc \
                          INNER JOIN courses AS c ON (c.courseId=arc.courseId)\
                         WHERE advisingSessionId=?";
  const [data, err] = await query(sql, [sessionId]);
  if (err) throw "Error getting advising results.";

  return !data.length ? [] : data[0];
}

async function addAdvisingSession(advisingData) {
  advisingData.sessionDate = new Date();

  const session = getAdvisingSessions({ studentId: advisingData.studentId });
  if (session) return await updateAdvisingSession(advisingData);

  //else
  const sql = "INSERT INTO advisingSessions SET ?";
  const [data, err] = await query(sql, advisingData);
  if (err) throw "Error inserting advising data.";
  console.log("add advising res: ", data);
  return data;
}

async function updateAdvisingSession(advisingData) {
  advisingData.sessionDate = new Date(); //update date
  const sql = "UPDATE advisingSessions SET ?";
  const [data, err] = await query(sql, advisingData);
  if (err) throw "Error updating advising session info.";
  console.log("add advising res: ", data);

  return data;
}

async function generatePlan({ sessionId }) {
  const session = await getAdvisingSession({ sessionId });
  if (!session) throw "Advising session not found while generating plan.";

  const { studentId } = session;
  const useCourses = await getUserCourses({ studentId });
  const useMajors = await getUserMajors({ studentId });
  const planCourses = await getPlanCourses({ studentId });

  console.log(
    `\nUser Courses: ${useCourses}\n\nUser majors: ${useMajors}\n\n Plan Courses: ${planCourses}`
  );
}

async function getPaces() {
  const sql = "select * from paces";

  const [paces, err] = await query(sql);
  if (err) throw "Error getting paces.";
  return paces;
}
