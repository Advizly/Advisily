const advisingService = require("./advising.service");

module.exports = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisingResults,
  addAdvisingSession,
  updateAdvisingSession,
  getPaces,
};

function getAdvisingSessions(req, res, next) {
  advisingService
    .getAdvisingSessions(req.body)
    .then((sessions) => res.send(sessions))
    .catch(next);
}

function getAdvisingSession(req, res, next) {
  advisingService
    .getAdvisingSession(req.body)
    .then((session) => res.send(session))
    .catch(next);
}

function getAdvisingResults(req, res, next) {
  advisingService
    .getAdvisingResults(req.body)
    .then((results) => res.send(results))
    .catch(next);
}

function addAdvisingSession(req, res, next) {
  advisingService
    .addAdvisingSession(req.body)
    .then((session) => res.json(session))
    .catch(next);
}
function updateAdvisingSession(req, res, next) {
  advisingService
    .updateAdvisingSession(req.body)
    .then((session) => res.json(session))
    .catch(next);
}
function getPaces(req, res, next) {
  advisingService
    .getPaces()
    .then((paces) => res.send(paces))
    .catch(next);
}
