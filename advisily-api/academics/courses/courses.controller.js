const coursesService = require("./courses.service");

module.exports = { getCourses };

function getCourses(req, res, next) {
  coursesService
    .getCourses(req.body)
    .then((courses) => res.send(courses))
    .catch(next);
}
