const majorsService = require("./majors.service");

module.exports = { getMajors };

function getMajors(req, res, next) {
  majorsService
    .getMajors(req.body)
    .then((majors) => res.send(majors))
    .catch(next);
}
