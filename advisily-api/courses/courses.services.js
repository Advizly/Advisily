const _ = require("lodash");
const { query, parseConditions } = require("../helpers/mysql");
const { addCoursesRequisites } = require("../helpers/coursesRequisites");
const c = require("config");
const { func } = require("joi");

module.exports = {
  createCourse,
  getAllCourses, 
  getTypes,
  addCourseToPlan,
  removeCourseFromCatalog,
  removeCourseFromPlan,
  getDistinctPrefixes,
  getDistinctCoursesByPrefix
};


   async function createCourse(course) {
    let insertCourseSql = "INSERT INTO courses SET ?";
    const [data, err] = await query(insertCourseSql, [course]);
    if (err) throw "Error adding course.";
  
    return { courseId: data.insertId, ...course };
  }

  async function getAllCourses() {
    try {
      let selectCoursesSql = "SELECT * FROM courses";
      const [courses, err] = await query(selectCoursesSql);
      if (err) {
        throw new Error("Error retrieving courses.");
      }
  
      return courses;
    } catch (error) {
      throw error;
    }
  }

  async function getTypes(conditions){
    let baseSql = "Select ct.courseTypeId, ct.courseType from courseTypes as ct"
    console.log(conditions)
    const { columns, values } = parseConditions(conditions);
    if (values.length) baseSql += ` Join catalogCourses cc ON ct.courseTypeId = cc.courseTypeId WHERE cc.${columns} LIMIT 1`;
    console.log(baseSql)

    const [data, err] = await query(baseSql, values);
    if (err) throw "Error getting courseTypes";
    return data;
  }

  async function addCourseToPlan(courseId, catalogId, semesterNumber) {
    const insertQuery = "INSERT INTO planCourses (courseId, catalogId, semesterNumber) VALUES (?, ?, ?)";
    const values = [courseId, catalogId, semesterNumber];
  
    const [insertedRows, err] = await query(insertQuery, values);
  
    if (err) {
      throw new Error("Error adding course to plan.");
    }
  
    return insertedRows;
  }

  async function removeCourseFromPlan(courseId, catalogId) {
    const deleteQuery = "DELETE FROM planCourses WHERE courseId = ? AND catalogId = ?";
    const values = [courseId, catalogId];
  
    const [deletedRows, err] = await query(deleteQuery, values);
  
    if (err) {
      throw new Error("Error removing course from plan.");
    }
  
    return deletedRows;
  }

  async function getDistinctCoursesByPrefix(prefix) {
    const sql = "SELECT DISTINCT courseId, courseCode, courseTitle, credits, prefix FROM courses WHERE prefix = ?";
    const [courses, err] = await query(sql, [prefix]);
    
    if (err) {
      throw new Error("Error fetching distinct courses by prefix.");
    }
  
    return courses;
  }

  async function getDistinctPrefixes() {
    const sql = "SELECT DISTINCT prefix FROM courses";
    const [prefixes, err] = await query(sql);
    
    if (err) {
      throw new Error("Error fetching distinct prefixes.");
    }
  
    return prefixes;
  }

  async function removeCourseFromCatalog(courseId, catalogId) {
    const deleteQuery = "DELETE FROM catalogCourses WHERE courseId = ? AND catalogId = ?";
    const values = [courseId, catalogId];
  
    const [deletedRows, err] = await query(deleteQuery, values);
  
    if (err) {
      throw new Error("Error removing course from catalog.");
    }
  
    return deletedRows;
  }

  


  