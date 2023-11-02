const coursesService = require("./courses.services");

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

function createCourse(req,res,next){
  coursesService
    .createCourse(req.body)
    .then((course) => res.send(course))
    .catch(next);
}

function getAllCourses(req, res, next) {
  coursesService
    .getAllCourses()
    .then((courses) => res.send(courses))
    .catch(next);
}

function getTypes(req, res, next) {
  coursesService
    .getTypes(req.query)
    .then((types) => res.send(types))
    .catch(next);
}

function getDistinctPrefixes(req, res, next) {
  coursesService
    .getDistinctPrefixes()
    .then((prefixes) => res.send(prefixes))
    .catch(next);
}

function getDistinctCoursesByPrefix(req, res, next) {
  const { prefix } = req.query;

  coursesService
    .getDistinctCoursesByPrefix(prefix)
    .then((courses) => res.send(courses))
    .catch(next);
}



function addCourseToPlan(req, res, next) {
  const { courseId, catalogId, semesterNumber } = req.body;

  coursesService
    .addCourseToPlan(courseId, catalogId, semesterNumber)
    .then((insertedRows) => res.send(insertedRows))
    .catch(next);
}


function removeCourseFromCatalog(req, res, next) {
  const { courseId, catalogId } = req.body;

  coursesService
    .removeCourseFromCatalog(courseId, catalogId)
    .then((deletedRows) => res.send(deletedRows))
    .catch(next);
}


function removeCourseFromPlan(req, res, next) {
  const { courseId, catalogId } = req.body;

  coursesService
    .removeCourseFromPlan(courseId, catalogId)
    .then((deletedRows) => res.send(deletedRows))
    .catch(next);
}
