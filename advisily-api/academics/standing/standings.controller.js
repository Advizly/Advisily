const service = require("./standings.services");

module.exports = {
  getStandings,
};

function getStandings(req, res, next) {
  service
    .getStandings()
    .then((standings) => res.json(standings))
    .catch(next);
}
