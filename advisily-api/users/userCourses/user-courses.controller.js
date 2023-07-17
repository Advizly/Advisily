const userCoursesService = require("./user-courses.service");

module.exports = {
  getUserCourses,
  addUserCourse,
  deleteUserCourse,
};

function getUserCourses(req, res, next) {
  if(req.user.userId === req.body.userId || req.user.isAdmin){
  userCoursesService
    .getUserCourses(req.body)
    .then((courses) => res.send(courses))
    .catch(next);
  }else{
    res.status(403).json("NOT ALLOWED")
  }
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
