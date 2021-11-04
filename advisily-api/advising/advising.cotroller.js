const advisingService = require("./advising.service");

module.exports = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisingResults,
  getAdvisingResultCourses,
  getUserAdvisingSessionId,
  addAdvisingSession,
  updateAdvisingSession,
  generateAllPlans,
  generatePlan,
  getPaces,
};

function generateAllPlans(req, res, next) {
  advisingService
    .generateAllPlans()
    .then((result) => res.json(result))
    .catch(next);
}

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

function getAdvisingResultCourses(req, res, next) {
  advisingService
    .getAdvisingResultCourses(req.body)
    .then((result) => res.json(result))
    .catch(next);
}

function updateAdvisingSession(req, res, next) {
  advisingService
    .updateAdvisingSession(req.body)
    .then((session) => res.json(session))
    .catch(next);
}

function generatePlan(req, res, next) {
  advisingService
    .generatePlan(req.body)
    .then((r) => res.send(r))
    .catch(next);
}

function getUserAdvisingSessionId(req, res, next) {
  advisingService
    .getUserAdvisingSessionId(req.body)
    .then((r) => res.send(r))
    .catch(next);
}
function getPaces(req, res, next) {
  advisingService
    .getPaces()
    .then((paces) => res.send(paces))
    .catch(next);
}
