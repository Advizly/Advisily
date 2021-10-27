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
  getUserAdvisingSessionId,
  addAdvisingSession,
  updateAdvisingSession,
  generatePlan,
  getPaces,
};

const baseGetSessionQuery = "select * from advisingSessions";
async function getAdvisingSessions({ userId }) {
  let sql = baseGetSessionQuery;
  if (userId) sql += " WHERE userId=?";

  const [sessions, err] = await query(sql, [userId]);
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
  const { userId } = advisingData;
  const session = await getAdvisingSessions({ userId });
  if (session.length)
    //delete old session for this user.
    await deleteAdvisingSession(session[0]);

  //insert new session
  const sql = "INSERT INTO advisingSessions SET ?";
  const [data, err] = await query(sql, advisingData);
  if (err) throw "Error inserting advising data.";

  const advisingSessionId = data.insertId;
  update(userId, { advisingSessionId });
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

async function getAdvisingResults({ advisingSessionId }) {
  let err, semesters, courses, results;

  let sql = "SELECT * from advisingResults WHERE advisingSessionId=?";
  [results, err] = await query(sql, [advisingSessionId]);

  sql = "select * from advisingResultSemesters  Where advisingSessionId=?";
  [semesters, err] = await query(sql, [advisingSessionId]);
  if (err) throw "Error getting advising result semesters";

  sql =
    "select * from advisingResultCourses AS arc \
                          INNER JOIN courses AS c ON (c.courseId=arc.courseId)\
                         WHERE advisingSessionId=? ORDER BY semesterNumber";
  courses = await query(sql, [advisingSessionId]);
  if (err) throw "Error getting advising results coursess.";

  return courses;
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

async function addAdvisingResults(resultData) {
  const { resultSemesters, advisingSessionId, isLate } = _.pick(resultData, [
    "resultSemesters",
    "advisingSessionId",
    "isLate",
  ]);

  let sql = "INSERT INTO advisingResults SET ?";
  [data, err] = await query(sql, { advisingSessionId, isLate });
  if (err) throw "Error while inserting advising results.";

  try {
    resultSemesters.forEach(({ semesterNumber, resultCourses }) => {
      addAdvisingResultSemesters({
        semesterNumber,
        resultCourses,
        generalElecCredits: 0,
        advisingSessionId: resultData.advisingSessionId,
      }).catch((err) => console.error(err));
    });
  } catch (error) {
    console.log("Error adding result semesters: ", error);
    throw error;
  }

  return data;
}
async function addAdvisingResultSemesters(semesterData) {
  semesterData = _.pick(semesterData, [
    "semesterNumber",
    "advisingSessionId",
    "generalElecCredits",
    "resultCourses",
  ]);
  const { semesterNumber, advisingSessionId, generalElecCredits } =
    semesterData;
  const sql = "INSERT INTO advisingResultSemesters SET ?";
  const [data, err] = await query(sql, {
    semesterNumber,
    advisingSessionId,
    generalElecCredits,
  });
  console.log(err);
  if (err) throw "Error while inserting advising result semesters.";

  try {
    semesterData.resultCourses.forEach(async ({ courseId }) => {
      await addAdvisingResultCourses({ courseId, ...semesterData }).catch(
        (err) => console.error(err)
      );
    });
  } catch (error) {
    console.log("Error adding courses: ", error);
    throw error;
  }

  return data;
}
async function addAdvisingResultCourses(courseData) {
  courseData = _.pick(courseData, [
    "courseId",
    "advisingSessionId",
    "semesterNumber",
  ]);

  const sql = "INSERT INTO advisingResultCourses SET ?";
  const [data, err] = await query(sql, courseData);
  if (err) throw "Error while inserting advising result courses.";
  return data;
}

async function clearAdvisingResults({ advisingSessionId }) {
  let sql, data, err;
  sql = "delete from advisingResultCourses WHERE advisingSessionId=?";
  [data, err] = await query(sql, advisingSessionId);
  if (err) throw "Error while deleting old advising results.";
  return data;
}

async function generatePlan({ advisingSessionId }) {
  try {
    console.log("Generating plan");
    const advisingSession = await getAdvisingSession({ advisingSessionId });
    if (!advisingSession)
      throw "Advising session not found while generating plan.";

    const { userId } = advisingSession;
    const user = await getUser({ userId });
    user.courses = await getUserCourses({ userId });
    const userMajors = await getUserMajors({ userId });

    const { catalogId } = userMajors[0];
    const planCourses = await getPlanCourses({ catalogId });
    const catalogCourses = await getCatCourses({ catalogId });
    const catalog = await getCatalog({ catalogId });
    catalog.courses = catalogCourses;
    let results = logic.generatePlan({
      user,
      planCourses,
      advisingSession,
      catalog,
    });
    await addAdvisingResults({ ...results, advisingSessionId });
  } catch (err) {
    console.log(err);
    throw "Unexpected error while generating plan";
  }
}

async function getPaces() {
  const sql = "select * from paces";

  const [paces, err] = await query(sql);
  if (err) throw "Error getting paces.";
  return paces;
}

async function getUserAdvisingSessionId({ userId }) {
  const sql =
    "SELECT advisingSessionId from advisingSessions WHERE userId=? LIMIT 1";

  const [data, err] = await query(sql, [userId]);
  if (err) throw "Error getting user advising SessionId.";

  return data[0];
}
