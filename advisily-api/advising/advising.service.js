const {
  getPlanCourses,
  getCatCourses,
  getCatalog,
} = require("../catalog/catalog.service");
const { getUserCourses } = require("../users/userCourses/user-courses.service");
const { getUserMajors } = require("../users/userMajors/user-majors.service");
const { update, getUser } = require("../users/users.service");

const { query } = require("../helpers/mysql");

const logic = require("../logic/logic");
const _ = require("lodash");
module.exports = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisingResults,
  getAdvisingResultCourses,
  addAdvisingSession,
  updateAdvisingSession,
  generatePlan,
  getPaces,
};

const baseGetSessionQuery = "select * from advisingSessions";
async function getAdvisingSessions({ studentId }) {
  let sql = baseGetSessionQuery;
  if (studentId) sql += " WHERE studentId=?";

  const [sessions, err] = await query(sql, [studentId]);
  if (err) throw "Error getting advising session data.";

  return sessions;
}
async function getAdvisingSession({ advisingSessionId }) {
  const sql = `${baseGetSessionQuery} WHERE advisingSessionId=? LIMIT 1`;
  const [data, err] = await query(sql, [advisingSessionId]);

  if (err) throw "Error getting advising sessions.";

  return !data.length ? [] : data[0];
}

async function addAdvisingSession(advisingData) {
  advisingData.sessionDate = new Date();
  const { studentId } = advisingData;
  const session = await getAdvisingSessions({ studentId });
  if (session.length)
    //delete old session for this user.
    await deleteAdvisingSession(session[0]);

  //insert new session
  const sql = "INSERT INTO advisingSessions SET ?";
  const [data, err] = await query(sql, advisingData);
  if (err) throw "Error inserting advising data.";

  const advisingSessionId = data.insertId;
  update(studentId, { advisingSessionId });
  return { ...data, advisingSessionId };
}

async function updateAdvisingSession(advisingData) {
  const { advisingSessionId } = advisingData;
  advisingData.sessionDate = new Date(); //update date
  const sql = "UPDATE advisingSessions SET ? WHERE advisingSessionId=?";
  const [data, err] = await query(sql, [advisingData, advisingSessionId]);
  if (err) throw "Error updating advising session info.";

  return { advisingSessionId };
}

async function deleteAdvisingSession({ advisingSessionId }) {
  await clearAdvisingResults({ advisingSessionId });
  const sql = "DELETE from advisingSessions WHERE advisingSessionId=?";
  const [data, err] = await query(sql, [advisingSessionId]);
  if (err) throw "Error while deleteing advising session";

  return data;
}

async function getAdvisingResults({ advisingSessionId }) {}

async function addAdvisingResults(resultCourse) {
  resultCourse = _.pick(resultCourse, [
    "advisingSessionId",
    "courseId",
    "semesterNumber",
  ]);

  const sql = "INSERT INTO advisingResultCourses SET ?";
  const [data, err] = await query(sql, resultCourse);
  if (err) throw "Error while inserting advising results.";
  return data;
}
async function clearAdvisingResults({ advisingSessionId }) {
  let sql, data, err;
  sql = "delete from advisingResultCourses WHERE advisingSessionId=?";
  [data, err] = await query(sql, advisingSessionId);
  if (err) throw "Error while deleting old advising results.";
  return data;
}

async function getAdvisingResultCourses({ advisingSessionId }) {
  const sql =
    "select * from advisingResultCourses AS arc \
                          INNER JOIN courses AS c ON (c.courseId=arc.courseId)\
                         WHERE advisingSessionId=? ORDER BY semesterNumber";
  const [courses, err] = await query(sql, [advisingSessionId]);
  if (err) throw "Error getting advising results coursess.";

  return courses;
}

async function generatePlan({ advisingSessionId }) {
  try {
    const advisingSession = await getAdvisingSession({ advisingSessionId });
    if (!advisingSession)
      throw "Advising session not found while generating plan.";

    const { studentId } = advisingSession;
    const user = await getUser({ studentId });
    user.courses = await getUserCourses({ studentId });
    const userMajors = await getUserMajors({ studentId });

    const { catalogId } = userMajors[0];
    const planCourses = await getPlanCourses({ catalogId });
    const catalogCourses = await getCatCourses({ catalogId });
    const catalog = await getCatalog({ catalogId });
    catalog.courses = catalogCourses;
    let resultSemesters = logic.generatePlan({
      user,
      planCourses,
      advisingSession,
      catalog,
    });

    resultSemesters.forEach(({ resultCourses, semesterNumber }) => {
      resultCourses.forEach((course) =>
        addAdvisingResults({ ...course, advisingSessionId, semesterNumber })
      );
    });
  } catch (err) {
    console.log(err);
  }
}

async function getPaces() {
  const sql = "select * from paces";

  const [paces, err] = await query(sql);
  if (err) throw "Error getting paces.";
  return paces;
}
