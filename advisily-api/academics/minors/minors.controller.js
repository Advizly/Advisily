const minorsService = require("./minors.service");

module.exports = { getMinors };

function getMinors(req, res, next) {
  minorsService
    .getMinors(req.body)
    .then((courses) => res.send(courses))
    .catch(next);
}
