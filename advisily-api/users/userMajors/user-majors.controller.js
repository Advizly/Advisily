const userMajorsService = require("./user-majors.service");

module.exports = {
  getUserMajors,
  addUserMajor,
  deleteUserMajor,
};

function getUserMajors(req, res, next) {
  userMajorsService
    .getUserMajors(req.body)
    .then((majors) => res.send(majors))
    .catch(next);
}

function addUserMajor(req, res, next) {
  userMajorsService
    .addUserMajor(req.body)
    .then(() => res.json({ message: "Major addedd successfuly." }))
    .catch(next);
}

function deleteUserMajor(req, res, next) {
  userMajorsService
    .deleteUserMajor(req.body)
    .then(() => res.json({ message: "Major deleted successfuly." }))
    .catch(next);
}
