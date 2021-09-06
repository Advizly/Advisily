const catalogService = require("./catalog.service");

module.exports = {
  getCatalogs,
  getCatalog,
  getCatCourses,
  getPlanCourses,
};

function getCatalogs(req, res, next) {
  catalogService
    .getCatalogs(req.body)
    .then((catalogs) => res.send(catalogs))
    .catch(next);
}
function getCatCourses(req, res, next) {
  catalogService
    .getCatCourses(req.body)
    .then((catCourses) => res.send(catCourses))
    .catch(next);
}

function getCatalog(req, res, next) {
  catalogService
    .getCatalog(req.body)
    .then((catalog) => res.send(catalog))
    .catch(next);
}

function getPlanCourses(req, res, next) {
  catalogService
    .getPlanCourses(req.body)
    .then((courses) => res.send(courses))
    .catch(next);
}
