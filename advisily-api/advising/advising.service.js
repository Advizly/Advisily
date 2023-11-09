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
const { basicInfo, removeSensitive } = require("../helpers/account");
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
    verifyResults,
    getAdvisedUsers,
    getAllResults,
};
const baseGetSessionQuery = "select * from advisingSessions";

async function getAllResults() {
    let sql, users, results, err;

    sql =
        "SELECT * from users \
     	INNER JOIN advisily.advisingSessions ON users.userId = advisingSessions.userId\
      INNER JOIN advisingResults ON advisingResults.advisingSessionId = advisingSessions.advisingSessionId\
      INNER JOIN standings ON standings.standingId=users.standingId\
      ";

    const semesterSql =
        "SELECT * FROM advisingResultSemesters WHERE advisingSessionId = ?";
    const coursesSql =
        "SELECT * FROM advisingResultCourses\
         INNER JOIN courses on courses.courseId=advisingResultCourses.courseId\
         WHERE advisingSessionId = ?";
    const finishedCoursesSql =
        "SELECT * FROM userCourses\
              INNER JOIN courses on courses.courseId=userCourses.courseId\
              WHERE userId = ?";

    [results, err] = await query(sql);
    if (err) throw "Error getting results for all users";

    for (let i = 0; i < results.length; i++) {
        const { advisingSessionId, userId } = results[i];
        let [courses, err1] = await query(coursesSql, [advisingSessionId]);
        let [semesters, err2] = await query(semesterSql, [advisingSessionId]);
        let [finishedCourses, err3] = await query(finishedCoursesSql, [userId]);
        if (err1 || err2 || err3) throw "Error getting results for all users";

        semesters = semesters.map((semester) => {
            semester.courses = courses.filter(
                (course) => course.semesterNumber === semester.semesterNumber
            );
            return semester;
        });

        results[i].semesters = semesters;
        results[i].finishedCourses = finishedCourses;
    }

    return results.map((result) => removeSensitive(result));
}

async function getAdvisedUsers() {
    const sql =
        "SELECT * from users u INNER JOIN advisingSessions a on u.userId=a.userId  where DATE(sessionDate) > '2023-1-1 00:00:00' ";

    let [users, err] = await query(sql);
    if (err) throw "Error getting users list";

    
    return users.map((user) => removeSensitive(user));
}

async function verifyResults({ advisingSessionId }) {
    let data, err;
    let sql = "SELECT * from advisingResults WHERE advisingSessionId=? ";
    [data, err] = await query(sql, [advisingSessionId]);
    if (err || !data.length) {
        console.log("Error:", err);
        throw "Error finding advising results";
    }

    sql = "UPDATE advisingResults set isVerified= 1 WHERE advisingSessionId= ? ";
    [data, err] = await query(sql, [advisingSessionId]);
    if (err) {
        console.log("Error:", err);
        throw "Error verifying advising results";
    }
    return data;
}
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
    return {...data, advisingSessionId };
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
    return {...results[0], semesters };
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
    const {results1, results2, advisingSessionId} = resultData;
    const connection = getConnection();
    let data, err, sql;
    const { resultSemesters: resultSemesters1, isLate: isLate1, resultCourses: resultCourses1, planType: planType1 } = results1
    const { resultSemesters: resultSemesters2, isLate: isLate2, resultCourses: resultCourses2, planType: planType2 } = results2

    sql = "INSERT INTO advisingResults SET ?";
    [data, err] = await query(
        sql, { advisingSessionId, isLate: isLate1 },
        false,
        connection
    );
    if (err) throw "Error while inserting advising results.";

    sql = "INSERT INTO advisingResultSemesters SET ?";
    resultSemesters1.forEach(async(semester) => {
        [data, err] = await query(sql, {...semester, planType: planType1}, false, connection);
        if (err) throw "Error while inserting advising results semesters.";
    });

    resultSemesters2.forEach(async(semester) => {
        [data, err] = await query(sql, {...semester, planType: planType2}, false, connection);
        if (err) throw "Error while inserting advising results semesters.";
    });

    sql = "INSERT INTO advisingResultCourses SET ?";
    resultCourses1.forEach(async(course) => {
        [data, err] = await query(sql, {...course, planType: planType1}, false, connection);
        if (err) throw "Error while inserting advising results courses.";
    });

    
    resultCourses2.forEach(async(course) => {
        [data, err] = await query(sql, {...course, planType: planType2}, false, connection);
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
        semesterData.resultCourses.forEach(async({ courseId }) => {
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
        // const catalogId = 29;
        const planCourses = await getPlanCourses({ catalogId });

        const catalogCourses = await getCatCourses({ catalogId });
        const catalog = await getCatalog({ catalogId });
        catalog.courses = catalogCourses;
        let results1 = logic.generatePlanConOrPreAsCon({
            user,
            planCourses,
            advisingSession,
            catalog,
        });

        let results2 = logic.generatePlanConOrPreAsPre({
            user,
            planCourses,
            advisingSession,
            catalog,
        });
        
        await addAdvisingResults({ results1, results2, advisingSessionId });
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
    const users = (await getUsers()).filter((user) => user.isVerified); //.filter((user) => user.userId > 15);
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
    for (let i = 0; i < users.length; i++) {
        await addAdvisingSession({
                ...advisingData,
                userId: users[i].userId,
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
    }
    return { Success: 1 };
}

async function getUserAdvisingList() {
    const sql =
        "SELECT * from users where userId IN(select userId from advisingSessions)";

    let [users, err] = query(sql);
    if (err) throw "Error getting users list";

    return users;
}