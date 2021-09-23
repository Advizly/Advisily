const coursesService = require("./courses.service");

module.exports = { getCourses, getPrefixes };

function getCourses(req, res, next) {
  coursesService
    .getCourses(req.body)
    .then((courses) => res.json(courses))
    .catch(next);
}

function getPrefixes(req, res, next) {
  coursesService
    .getPrefixes()
    .then((prefixes) => res.json(prefixes))
    .catch(next);
}
