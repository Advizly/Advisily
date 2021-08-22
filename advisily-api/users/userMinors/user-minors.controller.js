const userMinorsService = require("./user-minors.service");

module.exports = {
  getUserMinors,
  addUserMinor,
  deleteUserMinor,
};

function getUserMinors(req, res, next) {
  userMinorsService
    .getUserMinors(req.body)
    .then((majors) => res.send(majors))
    .catch(next);
}

function addUserMinor(req, res, next) {
  userMinorsService
    .addUserMinor(req.body)
    .then(() => res.json({ message: "Minor addedd successfuly." }))
    .catch(next);
}

function deleteUserMinor(req, res, next) {
  userMinorsService
    .deleteUserMinor(req.body)
    .then(() => res.json({ message: "Minor deleted successfuly." }))
    .catch(next);
}
