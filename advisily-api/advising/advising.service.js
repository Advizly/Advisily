const {
  getPlanCourses,
  getCatCourses,
  getCatalog,
} = require("../catalog/catalog.service");
const { getUserCourses } = require("../users/userCourses/user-courses.service");
const { getUserMajors } = require("../users/userMajors/user-majors.service");
const { getUser, getUsers } = require("../users/users.service");

const { query, getConnection } = require("../helpers/mysql");

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
  generateAllPlans,
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
  console.error(err);
  if (err) throw "Error inserting advising data.";

  const advisingSessionId = data.insertId;
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

  [courses, err] = await query(sql, [advisingSessionId]);
  if (err) throw "Error getting advising results coursess.";

  // courses = courses.filter(({ semesterNumber }) => semesterNumber == 1);
  semesters = semesters.map((semester) => {
    return {
      ...semester,
      courses: courses.filter(
        ({ semesterNumber }) => semesterNumber == semester.semesterNumber
      ),
    };
  });
  return { ...results[0], semesters };
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
  const connection = getConnection();
  let data, err, sql;
  const { resultSemesters, advisingSessionId, isLate, resultCourses } = _.pick(
    resultData,
    ["resultSemesters", "advisingSessionId", "resultCourses", "isLate"]
  );

  sql = "INSERT INTO advisingResults SET ?";
  [data, err] = await query(
    sql,
    { advisingSessionId, isLate },
    false,
    connection
  );
  if (err) throw "Error while inserting advising results.";

  sql = "INSERT INTO advisingResultSemesters SET ?";
  resultSemesters.forEach(async (semester) => {
    [data, err] = await query(sql, semester, false, connection);
    if (err) throw "Error while inserting advising results semesters.";
  });

  sql = "INSERT INTO advisingResultCourses SET ?";
  resultCourses.forEach(async (course) => {
    [data, err] = await query(sql, course, false, connection);
    if (err) throw "Error while inserting advising results courses.";
  });

  connection.end();
  return data;
}
// async function addAdvisingResults(resultData) {
//   const { resultSemesters, advisingSessionId, isLate } = _.pick(resultData, [
//     "resultSemesters",
//     "advisingSessionId",
//     "isLate",
//   ]);

//   let sql = "INSERT INTO advisingResults SET ?";
//   [data, err] = await query(sql, { advisingSessionId, isLate });
//   if (err) throw "Error while inserting advising results.";

//   try {
//     resultSemesters.forEach(({ semesterNumber, resultCourses }) => {
//       addAdvisingResultSemesters({
//         semesterNumber,
//         resultCourses,
//         generalElecCredits: 0,
//         advisingSessionId: resultData.advisingSessionId,
//       }).catch((err) => console.error(err));
//     });
//   } catch (error) {
//     console.log("Error adding result semesters: ", error);
//     throw error;
//   }

//   return data;
// }
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
  if (err) {
    console.error(err);
    throw "Error while inserting advising .";
  }
  return data;
}

async function clearAdvisingResults({ advisingSessionId }) {
  const connection = getConnection();

  let sql, data, err;
  sql = "delete from advisingResults WHERE advisingSessionId=?";
  [data, err] = await query(sql, advisingSessionId, false, connection);
  if (err) throw "Error while deleting old advising results.";

  sql = "delete from advisingResultSemesters WHERE advisingSessionId=?";
  [data, err] = await query(sql, advisingSessionId, false, connection);
  if (err) throw "Error while deleting old advising result semesters.";

  sql = "delete from advisingResultCourses WHERE advisingSessionId=?";
  [data, err] = await query(sql, advisingSessionId, false, connection);
  if (err) throw "Error while deleting old advising result courses.";

  connection.end();
  return data;
}

async function testTime() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("AFTER some time...");
      resolve(true);
    }, [4000]);
  });
}

async function generatePlan({ advisingSessionId }) {
  try {
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
    console.log("HERE: ", catalogId, userMajors[0]);
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

async function generateAllPlans() {
  const users = await getUsers(); //.filter((user) => user.userId > 15);
  const advisingData = {
    overloadingCredits: 0,
    summerCredits: 0,
    winterCredits: 0,
    paceId: 1,
    semestersToPlan: 10,
    generalElecCredits: 0,
    exemptedCredits: 0,
  };
  // console.log("USER LENGTH:", users.length);
  let error = null;
  // for (let i = 20; i < 32; i++) {
  addAdvisingSession({
    ...advisingData,
    userId: 22, //users[i].userId,
  })
    .then(({ advisingSessionId }) =>
      generatePlan({ advisingSessionId }).catch((err) => (error = err))
    )
    .catch((err) => (error = err));
  // }
  if (error) {
    console.error("Error in generate all plans:", err);
    throw error;
  }
  return { Success: 1 };
}
