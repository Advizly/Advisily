const userCoursesService = require("./user-courses.service");

module.exports = {
  getUserCourses,
  addUserCourse,
  deleteUserCourse,
};

function getUserCourses(req, res, next) {
  userCoursesService
    .getUserCourses(req.body)
    .then((courses) => res.send(courses))
    .catch(next);
}

function addUserCourse(req, res, next) {
  userCoursesService
    .addUserCourse(req.body)
    .then(() => res.json({ message: "Course addedd successfuly." }))
    .catch(next);
}

function deleteUserCourse(req, res, next) {
  userCoursesService
    .deleteUserCourse(req.body)
    .then(() => res.json({ message: "Course deleted successfuly." }))
    .catch(next);
}
