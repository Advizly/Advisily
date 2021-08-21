const catalogService = require("./catalog.service");

module.exports = {
  getCatalogs,
  getCatalog,
  getCatCourses,
};

function getCatalogs(req, res, next) {
  catalogService
    .getCatalogs()
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
  const { catalogId } = req.body;
  catalogService
    .getCatalog(catalogId)
    .then((catalog) => res.send(catalog))
    .catch(next);
}
